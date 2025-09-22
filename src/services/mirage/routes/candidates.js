import { withFailure }  from "../utils/WithFailure"
import db from '../../../db/index'
export default function candidatesRoutes(server) {
  // GET /candidates
  server.get("/candidates", (schema, request) => {
    const { search, stage, page = 1 } = request.queryParams;
    return { data: [] };
  });

 // POST /candidates
  server.post(
    "/candidates",
    withFailure(async (_schema, request) => {
      try {
        const attrs = JSON.parse(request.requestBody);

        console.log("[POST /candidates] Incoming:", attrs);

        // ✅ Insert into Dexie
        const id = await db.candidates.add(attrs);
        const candidate = await db.candidates.get(id);

        console.log("[POST /candidates] Created:", candidate);

        return candidate;
      } catch (err) {
        console.error("[POST /candidates] Error:", err);
        return new Response(500, {}, { error: "Failed to create candidate" });
      }
    })
  );
  // PATCH /candidates/:id
  server.patch("/candidates/:id", (schema, request) => {
    const id = request.params.id;
    const attrs = JSON.parse(request.requestBody);
    return { id, ...attrs };
  });

  // GET /candidates/:id/timeline
  server.get("/candidates/:id/timeline", (schema, request) => {
    return { events: [] };
  });
}
