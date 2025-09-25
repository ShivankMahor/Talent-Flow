import db from "../../../db";
import { withFailure } from "../utils/WithFailure";
import { Response } from "miragejs"
import { jobSchema } from "../../../features/jobs/schemas/jobSchema";
export default function jobsRoutes(server) {
  // GET /jobs
  server.get("/jobs", async (_schema, request) => {
      let { search = "", status = "", page = 1, pageSize = 10, sort = "", tag = "" } = request.queryParams;

      page = Number(page);
      pageSize = Number(pageSize);

      // 1. Get all jobs from Dexie
      let jobs = await db.jobs.toArray();

      // 2. 🔍 Search by title or tags
      if (search) {
        const s = search.toLowerCase();
        jobs = jobs.filter(
          (j) =>
            j.title.toLowerCase().includes(s) ||
            (j.tags && j.tags.some((t) => t.toLowerCase().includes(s)))
        );
      }

      // 3. 🏷️ Filter by status
      if (status) {
        jobs = jobs.filter((j) => j.status === status);
      }

      // 4. 🏷️ Filter by specific tag
      if (tag) {
        jobs = jobs.filter((j) => j.tags && j.tags.includes(tag));
      }

      // 5. 🔀 Sorting
      if (sort === "title") {
        jobs = jobs.sort((a, b) => a.title.localeCompare(b.title));
      }
      if (sort === "order") {
        jobs = jobs.sort((a, b) => a.order - b.order);
      }

      // 6. 📄 Pagination
      const total = jobs.length;
      const totalPages = Math.max(1, Math.ceil(total / pageSize));
      const start = (page - 1) * pageSize;
      const paginated = jobs.slice(start, start + pageSize);

      // 7. 🏷️ Collect unique tags from DB
      const tagsFromDB = await db.tags.toArray();
      const allTags = tagsFromDB.map((t) => t.name).sort();
      console.log("Server response /jobs: ",{
        data: paginated,
        meta: { total, totalPages, page, pageSize },
        tags: allTags,
      })
      return {
        data: paginated,
        meta: { total, totalPages, page, pageSize },
        tags: allTags,
      };
    });
    
  /**
   * GET /jobs/:id → fetch job by ID
   */
  server.get("/jobs/:id", async (_schema, request) => {
    const id = Number(request.params.id);

    try {
      const job = await db.jobs.get(id);
      if (!job) {
        return new Response(
          404,
          { "Content-Type": "application/json" },
          { error: "Job not found" }
        );
      }
      console.log("Server response /jobs/:id GET:", job);
      return job;
    } catch (err) {
      console.error("[jobs.api] Failed to get job:", err);
      return new Response(
        500,
        { "Content-Type": "application/json" },
        { error: "Failed to fetch job" }
      );
    }
  });
// POST /jobs
  server.post("/jobs", withFailure(async (_schema, request) => {
    // return true
    try {
      const payload = JSON.parse(request.requestBody);

      // 1. Validate shape
      const parsed = jobSchema.parse(payload);
      console.log("parsed in back: ",parsed)
      // 2. Ensure slug is unique
      const existing = await db.jobs.where("slug").equals(parsed.slug).first();
      console.log("existing:",existing)
      if (existing) {
        console.log("existing inside:",existing)
        throw new Error(
          400,
          { "Content-Type": "application/json" },
          { error: `Slug "${parsed.slug}" already exists` }
        );
      }

      // 3. Ensure order is unique
      const existingOrder = await db.jobs.where("order").equals(parsed.order).first();
      if (existingOrder) {
        throw new Error(
          400,
          { "Content-Type": "application/json" },
          { error: `Order "${parsed.order}" already exists` }
        );
      }

      // 4. Persist to Dexie
      const id = await db.jobs.add(parsed);
      const storedJob = await db.jobs.get(id);

      console.log("Server response /jobs POST:", storedJob);

      // 5. Return created job
      return storedJob;
    } catch (err) {
      console.error("[server] Failed to create job:", err);
      return new Response(
        500,
        { "Content-Type": "application/json" },
        { error: "Failed to create job" }
      );
    }
  }));

  server.patch("/jobs/:id", withFailure(async (_schema, request) => {
    const id = Number(request.params.id);
    const updates = JSON.parse(request.requestBody);
    console.log("id:", id);

    try {
      // 1. Get current job
      const job = await db.jobs.get(id);
      console.log("found job:", job);

      if (!job) {
        return new Response(
          404,
          { "Content-Type": "application/json" },
          { error: "Job not found" }
        );
      }

      // 2. Merge updates
      const updated = { ...job, ...updates };

      // 3. Save back to Dexie
      await db.jobs.put(updated);

      console.log("Server response /jobs/:id PATCH:", updated);

      // 4. Return updated job
      return updated;
    } catch (err) {
      console.error("[server] Failed to patch job:", err);
      return new Response(
        500,
        { "Content-Type": "application/json" },
        { error: "Failed to update job" }
      );
    }
  }));


  // PATCH /jobs/:id/reorder
// PATCH /jobs/:id/reorder
server.patch("/jobs/:id/reorder", withFailure(async (_schema, request) => {
  console.log("backend reorder");

  try {
    const { fromOrder, toOrder } = JSON.parse(request.requestBody);
    const allJobs = await db.jobs.orderBy("order").toArray();

    // reorder in-memory
    const fromIndex = allJobs.findIndex((j) => j.order === fromOrder);
    const toIndex = allJobs.findIndex((j) => j.order === toOrder);
    if (fromIndex === -1 || toIndex === -1) {
      throw new Error("Jobs not found for reorder");
    }

    const [moved] = allJobs.splice(fromIndex, 1);
    allJobs.splice(toIndex, 0, moved);

    // reassign sequential order values
    const reordered = allJobs.map((j, idx) => ({ ...j, order: idx + 1 }));

    // persist to Dexie
    await db.transaction("rw", db.jobs, async () => {
      for (const job of reordered) {
        await db.jobs.update(job.id, { order: job.order });
      }
    });

    // 4️⃣ sort by order before sending
    const sorted = [...reordered].sort((a, b) => a.order - b.order);

    // 5️⃣ log outgoing payload
    console.log("[jobs.api] Returning reordered jobs:", sorted);

    return sorted;
  } catch (err) {
    console.error("[jobs.api] Reorder failed ❌", err);
    return new Response(500, { "Content-Type": "application/json" }, { error: "Failed to reorder job" });
  }
}));

}
