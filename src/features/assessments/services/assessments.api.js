import api from "../../../services/axios";

// ✅ Fetch assessment for a job
export async function getAssessment(jobId) {
  try {
    const response = await api.get(`/assessments/${jobId}`);
    return response.data;
  } catch (err) {
    console.error("[getAssessment] error:", err);

    if (err.response?.status === 404) {
      throw new Error("Assessment not found");
    }
    throw new Error("Failed to fetch assessment");
  }
}

// ✅ Save (create or update) assessment for a job
export async function saveAssessment(jobId, data) {
  try {
    // const response = await api.put(`/assessments/${jobId}`, data);
    //saving assesments on localStorage as mentioned in the requiremnts 
    return true
    // return response.data
  } catch (err) {
    console.error("[saveAssessment] error:", err);

    if (err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Failed to save assessment");
  }
}

export async function loadSampleAssessment(type) {
  console.log("Fetching sample assessment:", type);

  try {
    const res = await fetch(`/api/sample-assessments/${type}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch sample assessment: ${res.status}`);
    }
    const data = await res.json();
    console.log("Sample assessment loaded from API:", data);
    return data;
  } catch (err) {
    console.error("Error loading sample assessment from API:", err);
    throw dexieErr;
    
  }
}
