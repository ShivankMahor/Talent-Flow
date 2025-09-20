import db from "../../../db";
import axios from "axios";

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
} = {}) {
  console.log("[jobs.api] Fetching jobs (network + Dexie):", {
    page,
    pageSize,
    search,
    status,
    sort,
  });

  try {
    // 1. Simulate network call (Mirage may inject delay/error)
    const res = await axios.get("/api/jobs", {
      params: { page, pageSize, search, status, sort },
    });

    // 2. Dexie = real source of truth
    let jobs = await db.jobs.toArray();

    if (search) {
      jobs = jobs.filter((j) =>
        j.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status) {
      jobs = jobs.filter((j) => j.status === status);
    }

    if (sort === "title") {
      jobs = jobs.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === "order") {
      jobs = jobs.sort((a, b) => a.order - b.order);
    }

    const total = jobs.length;
    const start = (page - 1) * pageSize;
    const paginated = jobs.slice(start, start + pageSize);

    return { data: paginated, meta: { total, page, pageSize } };
  } catch (err) {
    // Axios error handling
    if (err.response) {
      console.error("[jobs.api] Mirage returned error:", err.response.status, err.response.data);
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
    const res = await fetch("/api/jobs", {
      method: "POST",
      body: JSON.stringify(job),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const newJob = await res.json();
    console.log("[jobs.api] Job created (server):", newJob);

    // Save in Dexie
    await db.jobs.add(newJob);
    console.log("[jobs.api] Dexie job added:", newJob);

    return newJob;
  } catch (err) {
    console.error("[jobs.api] Failed to create job:", err);
    throw err;
  }
}

/**
 * PATCH /jobs/:id → update job (e.g., archive/unarchive, edit)
 */
export async function updateJob(id, updates) {
  console.log("[jobs.api] Updating job:", { id, updates });

  try {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const updated = await res.json();
    console.log("[jobs.api] Job updated (server):", updated);

    // Update Dexie
    await db.jobs.put(updated);
    console.log("[jobs.api] Dexie job updated:", updated);

    return updated;
  } catch (err) {
    console.error("[jobs.api] Failed to update job:", err);
    throw err;
  }
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
