import api from "../../../services/axios"

/**
 * GET /jobs
 */
export async function getJobs({page = 1,pageSize = 10,search = "",status = "",sort = "",tag = "",} = {}) {
  console.log("[jobs.api] Fetching jobs via API:", {page,pageSize,search,status,sort,tag,});

  try {
    const res = await api.get("/jobs", {
      params: { page, pageSize, search, status, sort, tag },
    });

    // API expected to return { data, meta, tags }
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error(
        "[jobs.api] API returned error:",
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
  try {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} while creating job`);
    }
    return res.data;
  } catch (err) {
    console.error("[jobs.api] Failed to create job:", err);
    throw err;
  }
}


/**
 * PATCH /jobs/:id → update job (e.g., archive/unarchive, edit)
 */
export async function updateJob(id, updates) {
  try {
    const res = await api.patch(`/jobs/${id}`, updates);

    return res.data;
  } catch (err) {
    if (err.response) {
      console.error(
        "[jobs.api] API returned error:",
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
 * PATCH /jobs/:id/reorder
 * Mock API only simulates latency/error, Dexie persists
 * Returns updated job objects
 */
export async function reorderJob(jobId, fromOrder, toOrder) {
  console.log("[jobs.api] Reordering job:", { jobId, fromOrder, toOrder });

  try {
    const res = await api.patch(`/jobs/${jobId}/reorder`, { fromOrder, toOrder });
    return res.data
  } catch (err) {
    console.error("[jobs.api] Reorder failed ❌", err);
    throw err;
  }
}
/**
 * GET /jobs/:id → fetch job by ID
 */
export async function getJobById(id) {
  console.log("[jobs.api] Fetching job by ID:", id);

  try {
    const res = await api.get(`/jobs/${id}`);
    return res.data; // expected: { id, title, ... }
  } catch (err) {
    if (err.response) {
      console.error(
        "[jobs.api] Failed to fetch job ❌",
        err.response.status,
        err.response.data
      );
    } else {
      console.error("[jobs.api] Network error ❌", err.message);
    }
    throw err;
  }
}