// features/candidates/services/candidates.api.js
import axios from "axios";
import db from "../../../db";
import { CandidateSchema } from "../schema/CandidateSchema";
import api from '../../../services/axios'
// Get one candidate
export async function getCandidateById(id) {
  return await db.candidates.get(Number(id));
}

// Get candidate timeline
export async function getCandidateTimeline(id) {
  // In real backend, fetch from /candidates/:id/timeline
  // For now, simulate with Dexie or seed fake history
  return [
    { stage: "applied", date: "2025-01-01" },
    { stage: "screen", date: "2025-01-03" },
    { stage: "tech", date: "2025-01-05" },
  ];
}

// Update candidate
export async function updateCandidate(id, updates) {
  
  const candidate = await db.candidates.get(Number(id));
  const updated = { ...candidate, ...updates };
  await db.candidates.put(updated);
  return updated;
}

/**
 * GET /candidates?search=&stage=&page=
 */
export async function getCandidates({
  search = "",
  stage = "",
  page = 1,
  pageSize = 100,
} = {}) {
  console.log("[candidates.api] Fetching candidates:", {
    search,
    stage,
    page,
    pageSize,
  });

  try {
    await axios.get("/api/candidates", { params: { search, stage, page } });

    let candidates = await db.candidates.toArray();

    if (search) {
      const q = search.toLowerCase();
      candidates = candidates.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      );
    }

    if (stage) {
      candidates = candidates.filter((c) => c.stage === stage);
    }

    const total = candidates.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (page > totalPages) page = totalPages;

    const start = (page - 1) * pageSize;
    const paginated = candidates.slice(start, start + pageSize);
    
    console.log("Sending response: ",{
      data: paginated,
      meta: { total, totalPages, page, pageSize },
    })
    return {
      data: paginated,
      meta: { total, totalPages, page, pageSize },
    };
  } catch (err) {
    if (err.response) {
      console.error("[candidates.api] Mirage error:", err.response.status, err.response.data);
    } else {
      console.error("[candidates.api] Network error:", err.message);
    }
    throw err;
  }
}

/**
 * GET /candidates?page=
 * Returns 50 candidates per page, grouped by stage
 */
export async function getCandidatesPage({
  page = 1,
  pageSize = 25,
} = {}) {
  console.log("[candidates.api] Fetching candidates by page:", { page, pageSize });

  try {
    // still ping Mirage/MSW for latency simulation
    await axios.get("/api/candidates", { params: { page } });

    // load from IndexedDB
    let candidates = await db.candidates.toArray();

    // sort by id or name to keep stable order
    candidates = candidates.sort((a, b) => a.id - b.id);

    const total = candidates.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (page > totalPages) page = totalPages;

    // slice page
    const start = (page - 1) * pageSize;
    const pageSlice = candidates.slice(start, start + pageSize);

    // group into stages
    const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];
    const grouped = stages.reduce((acc, stage) => {
      acc[stage] = pageSlice.filter((c) => c.stage === stage);
      return acc;
    }, {});

    console.log("Sending response:", {
      data: grouped,
      meta: { total, totalPages, page, pageSize },
    });

    return {
      data: grouped,
      meta: { total, totalPages, page, pageSize },
    };
  } catch (err) {
    if (err.response) {
      console.error("[candidates.api] Mirage error:", err.response.status, err.response.data);
    } else {
      console.error("[candidates.api] Network error:", err.message);
    }
    throw err;
  }
}


export async function createCandidate(data) {
  try {
    console.log("[createCandidate] incoming data:", data);

    // ✅ Validate with Zod before hitting Mirage
    const parsed = CandidateSchema.parse(data);

    console.log("[createCandidate] validated data:", parsed);

    const response = await api.post("/candidates", parsed);

    console.log("[createCandidate] server response:", response.data);

    return response.data;
  } catch (err) {
    // Handle Zod validation errors separately
    if (err.name === "ZodError") {
      console.error("[createCandidate] validation error:", err.errors);
      throw new Error(err.errors.map((e) => e.message).join(", "));
    }

    console.error("[createCandidate] request error:", err);

    throw new Error("Failed to create candidate");
  }
}