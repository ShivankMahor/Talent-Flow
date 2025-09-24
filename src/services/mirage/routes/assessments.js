import db from "../../../db";
import { withFailure } from "../utils/WithFailure";

export default function assessmentsRoute(server) {
  // GET /sample-assessments/:type
  server.get("/sample-assessments/:type", withFailure(async (_schema, request) => {
    const { type } = request.params;
    console.log("type: ",type)
    // Map type -> jobId (based on your seeding)
    const map = {
      frontend: 1,
      backend: 2,
      general: 3,
    }
    const jobId = map[type];
    if (!jobId) {
      return new Response(
        404,
        { "Content-Type": "application/json" },
        { error: `Sample assessment not found for type: ${type}` }
      );
    }

    // Query Dexie (your seeded DB)
    const assessment = await db.assessments.where("jobId").equals(jobId).first();
    // console.log("Loaded from backedn: ",assessment)
    if (!assessment) {
      return new Response(
        404,
        { "Content-Type": "application/json" },
        { error: `No assessment seeded for jobId: ${jobId}` }
      );
    }

    // Return form JSON (title + sections)
    return assessment.form;
  }));
}
