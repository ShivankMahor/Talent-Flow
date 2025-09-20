import db from "../../../db";
import axios from "axios";
import { jobSchema } from "../schemas/jobSchema";

/**
 * GET /jobs
 * Mirage simulates latency/errors, Dexie is the persistence
 */

export async function getJobs({
  page = 1,
  pageSize = 10,
  search = "",
  status = "",
  sort = "",
  tag = "",
} = {}) {
  console.log("[jobs.api] Fetching jobs (network + Dexie):", {
    page,
    pageSize,
    search,
    status,
    sort,
    tag,
  });
  // console.log(page = 1,
  // pageSize = 10,
  // search = "",
  // status = "",
  // sort = "",
  // tag = "",)
  try {
    // 1. Simulate network call (Mirage may inject delay/error)
    const res = await axios.get("/api/jobs", {
      params: { page, pageSize, search, status, sort, tag },
    });

    // 2. Dexie = real source of truth
    let jobs = await db.jobs.toArray();

    // 🔍 Search by title OR tags
    if (search) {
      const s = search.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(s) ||
          (j.tags && j.tags.some((t) => t.toLowerCase().includes(s)))
      );
    }

    // 🏷️ Filter by status
    if (status) {
      jobs = jobs.filter((j) => j.status === status);
    }

    // 🏷️ Filter by specific tag
    if (tag) {
      jobs = jobs.filter((j) => j.tags && j.tags.includes(tag));
    }

    // 🔀 Sorting
    if (sort === "title") {
      jobs = jobs.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === "order") {
      jobs = jobs.sort((a, b) => a.order - b.order);
    }

    // 📄 Pagination
    const total = jobs.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    if (page > totalPages) {
      page = 1; // reset if page exceeds total pages
    }

    const start = (page - 1) * pageSize;
    const paginated = jobs.slice(start, start + pageSize);

    // 🏷️ Collect all unique tags (for dropdowns)
    const tagsFromDB = await db.tags.toArray();
    const allTags = tagsFromDB.map((t) => t.name).sort();
    return {
      data: paginated,
      meta: { total, totalPages, page, pageSize },
      tags: allTags,
    };
  } catch (err) {
    if (err.response) {
      console.error(
        "[jobs.api] Mirage returned error:",
        err.response.status,
        err.response.data
      );
    } else {
      console.error("[jobs.api] Network error:", err.message);
    }
    throw err;
  }
}

/**
 * POST /jobs → create job
 */
export async function createJob(job) {
  console.log("[jobs.api] Creating job:", job);

  try {
    // 1. Validate basic fields with Zod
    const parsed = jobSchema.parse(job);
    console.log("JOB: ",job)
    // 4. Simulate API call
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });

    // 2. Ensure slug is unique
    const existing = await db.jobs.where("slug").equals(parsed.slug).first();
    if (existing) {
      throw new Error(`Slug "${parsed.slug}" already exists`);
    }

    // 3. Check unique order
    const existingOrder = await db.jobs.where("order").equals(parsed.order).first();
    if (existingOrder) {
      throw new Error(`Order "${parsed.order}" already exists`);
    }

    

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} while creating job`);
    }

    // 5. Persist to Dexie
    const id = await db.jobs.add(job);
    const storedJob = await db.jobs.get(id);

    console.log("[jobs.api] Job created:", storedJob);
    return storedJob;
  } catch (err) {
    console.error("[jobs.api] Failed to create job:", err);
    throw err; // propagate so UI can handle optimistic rollback
  }
}


/**
 * PATCH /jobs/:id → update job (e.g., archive/unarchive, edit)
 */
export async function updateJob(id, updates) {
  console.log("[jobs.api] updateJob called:", { id, updates });

  const res = await axios.patch(`/api/jobs/${id}`, updates);

  // 2. Get current job
  const job = await db.jobs.get(id);
  if (!job) throw new Error("Job not found in Dexie");

  // 3. Merge updates
  const updated = { ...job, ...updates };

  // 4. Persist to Dexie
  await db.jobs.put(updated);

  console.log("[jobs.api] Job updated (Dexie):", updated);
  return updated;
}

/**
 * PATCH /jobs/:id/reorder
 * Mock API only simulates latency/error, Dexie persists
 * Returns updated job objects
 */
export async function reorderJob(jobId, fromOrder, toOrder) {
  console.log("[jobs.api] Reordering job:", { jobId, fromOrder, toOrder });

  try {
    // 1️⃣ Mock API call (latency + error simulation)
    await axios.patch(`/api/jobs/${jobId}/reorder`, { fromOrder, toOrder });

    // 2️⃣ Get both jobs by their current order
    const fromJob = await db.jobs.where("order").equals(fromOrder).first();
    const toJob = await db.jobs.where("order").equals(toOrder).first();

    console.log("From job:", fromJob);
    console.log("To job:", toJob);

    if (!fromJob || !toJob) {
      throw new Error("Jobs not found for reorder");
    }

    // 3️⃣ Swap their order values using Dexie update
    await db.transaction("rw", db.jobs, async () => {
      await db.jobs.update(fromJob.id, { order: toOrder });
      await db.jobs.update(toJob.id, { order: fromOrder });
    });

    // 4️⃣ Re-fetch updated jobs
    const updatedFromJob = await db.jobs.get(fromJob.id);
    const updatedToJob = await db.jobs.get(toJob.id);

    console.log("[jobs.api] returning obj: ",{ fromJob: updatedFromJob, toJob: updatedToJob })
    return { updatedFromJob, updatedToJob };
  } catch (err) {
    console.error("[jobs.api] Reorder failed ❌", err);
    throw err; // let UI handle rollback
  }
}
/**
 * Candidate applies to job
 * For demo: just create a "candidate-job" entry in Dexie
 */
export async function applyToJob(jobId) {
  console.log("[jobs.api] Candidate applying to job:", jobId);

  try {
    const res = await fetch(`/api/candidates`, {
      method: "POST",
      body: JSON.stringify({
        name: "Demo Candidate",
        email: "demo@candidate.com",
        jobId,
        stage: "applied",
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const applied = await res.json();
    console.log("[jobs.api] Candidate applied (server):", applied);

    // Save in Dexie
    await db.candidates.add(applied);
    console.log("[jobs.api] Dexie candidate added:", applied);

    return applied;
  } catch (err) {
    console.error("[jobs.api] Failed to apply to job:", err);
    throw err;
  }
}