// import db from "../../../db";
// import { withFailure } from "../utils/WithFailure";

// export default function assessmentsRoute(server) {
//   // GET /sample-assessments/:type
//   server.get("/sample-assessments/:type", withFailure(async (_schema, request) => {
//     const { type } = request.params;
//     console.log("type: ",type)
//     // Map type -> jobId (based on your seeding)
//     const map = {
//       frontend: 1,
//       backend: 2,
//       general: 3,
//     }
//     const jobId = map[type];
//     if (!jobId) {
//       return new Response(
//         404,
//         { "Content-Type": "application/json" },
//         { error: `Sample assessment not found for type: ${type}` }
//       );
//     }

//     // Query Dexie (your seeded DB)
//     const assessment = await db.assessments.where("jobId").equals(jobId).first();
//     // console.log("Loaded from backedn: ",assessment)
//     if (!assessment) {
//       return new Response(
//         404,
//         { "Content-Type": "application/json" },
//         { error: `No assessment seeded for jobId: ${jobId}` }
//       );
//     }

//     // Return form JSON (title + sections)
//     return assessment.form;
//   }));
// }


import db from "../../../db";
import { withFailure } from "../utils/WithFailure";

export default function assessmentsRoute(server) {
  // GET /sample-assessments/:type
  server.get(
    "/sample-assessments/:type",
    withFailure(async (_schema, request) => {
      const { type } = request.params;
      console.log("type: ", type);

      const map = {
        frontend: 1,
        backend: 2,
        general: 3,
      };

      const jobId = map[type];
      if (!jobId) {
        return new Response(
          404,
          { "Content-Type": "application/json" },
          { error: `Sample assessment not found for type: ${type}` }
        );
      }

      const assessment = await db.assessments
        .where("jobId")
        .equals(jobId)
        .first();

      if (!assessment) {
        return new Response(
          404,
          { "Content-Type": "application/json" },
          { error: `No assessment seeded for jobId: ${jobId}` }
        );
      }

      return assessment.form;
    })
  );

  // ✅ GET /assessments/:jobId
  server.get(
    "/assessments/:jobId",
    async (_schema, request) => {
      const { jobId } = request.params;
      console.log("Get assesment:", jobId)
      const assessment = await db.assessments
      .where("jobId")
      .equals(Number(jobId))
      .first();
      
      console.log("Get assesment: assesment",assessment)
      if (!assessment) {
        return new Response(
          404,
          { "Content-Type": "application/json" },
          { error: `Assessment not found for jobId: ${jobId}` }
        );
      }

      return assessment.form;
    })

  // PUT /assessments/:jobId
  server.put(
    "/assessments/:jobId",
    withFailure(async (_schema, request) => {
      const { jobId } = request.params;
      const data = JSON.parse(request.requestBody);

      console.log("[PUT /assessments] Incoming data:", jobId, data);

      // Check if an assessment already exists
      const existing = await db.assessments.where("jobId").equals(Number(jobId)).first();

      if (existing) {
        await db.assessments.update(existing.id, {
          form: data,
        });
        console.log("[PUT /assessments] Updated existing assessment:", existing.id);
      } else {
        await db.assessments.add({
          jobId: Number(jobId),
          form: data,
        });
        console.log("[PUT /assessments] Inserted new assessment");
      }

      const saved = await db.assessments.where("jobId").equals(Number(jobId)).first();
      console.log("[PUT /assessments] Final saved assessment:", saved);

      return { jobId: Number(jobId), form: data };
    })
  );

  server.post(
    "/assessments/:jobId/submit",
    withFailure(async (_schema, request) => {
      const { jobId } = request.params;
      const data = JSON.parse(request.requestBody);
      const jobIdNum = Number(jobId);

      // Check if a submission already exists for this job + candidate
      const existing = await db.submissions
        .where({ jobId: jobIdNum, candidateId: data.candidateId })
        .first();

      const submission = {
        jobId: jobIdNum,
        candidateId: data.candidateId,
        response: data.response,
        submittedAt: new Date().toISOString(),
      };

      if (existing) {
        await db.submissions.update(existing.id, submission);
        console.log(
          `[POST /assessments/${jobId}/submit] Updated submission for candidate ${data.candidateId}`
        );
      } else {
        await db.submissions.add(submission);
        console.log(
          `[POST /assessments/${jobId}/submit] Created new submission for candidate ${data.candidateId}`
        );
      }

      return {
        success: true,
        jobId: jobIdNum,
        candidateId: data.candidateId,
        submittedAt: submission.submittedAt,
      };
    })
  );
}
