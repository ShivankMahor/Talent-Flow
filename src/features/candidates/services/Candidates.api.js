// features/candidates/services/candidates.api.js
import axios from "axios";
import db from "../../../db";
import { CandidateSchema } from "../schema/CandidateSchema";
import api from '../../../services/axios'

// GET /candidates/:id
export async function getCandidateById(id) {
  try {
    const res = await api.get(`/candidates/${id}`);
    return res.data.candidate;
  } catch (err) {
    if (err.response) {
      console.error("[candidates.api] getCandidateById error:", err.response.status, err.response.data);
    } else {
      console.error("[candidates.api] Network error:", err.message);
    }
    throw err;
  }
}
/**
 * GET /candidates/:id/timeline
 */
export async function getCandidateTimeline(id) {
  try {
    console.log("calling getCandidateTimeline",id)
    const res = await api.get(`/candidates/${id}/timeline`);
    return res.data; // Expect [{ id, date, action, stage, by }]
  } catch (err) {
    if (err.response) {
      console.error("[candidates.api] Timeline error:", err.response.status, err.response.data);
    } else {
      console.error("[candidates.api] Timeline network error:", err.message);
    }
    throw err;
  }
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
export async function getCandidates( searchTerm = "", stage = "", page = 1, pageSize = 100 ) {
  console.log("[candidates.api] Fetching candidates:", {
    searchTerm,
    stage,
    page,
    pageSize,
  });

  try {
    const res = await api.get("/candidates", {
      params: { search:searchTerm, stage, page, pageSize },
    });
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error("[candidates.api] Error:", err.response.status, err.response.data);
    } else {
      console.error("[candidates.api] Network error:", err.message);
    }
    throw err;
  }
}

/**
 * GET /candidates?page=&pageSize=&search=&stage=
 * Returns candidates (server handles Dexie/db logic)
 */
export async function getCandidatesPage({
  page = 1,
  pageSize = 25,
  search = "",
  stage = "",
} = {}) {
  console.log("[candidates.api] Fetching candidates:", { page, pageSize, search, stage });

  try {
    const res = await api.get("/candidatesboard", {
      params: { page, pageSize, search, stage },
    });

    // API (route handler) is responsible for Dexie/db filtering + pagination
    console.log("res: ",res)
    return res.data;
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