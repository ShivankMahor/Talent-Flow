import { withFailure }  from "../utils/WithFailure"
import db from '../../../db/index'
export default function candidatesRoutes(server) {
  // GET /candidates
  server.get("/candidates", async (schema, request) => {
    try {
      let { search = "", stage = "", page = 1, pageSize = 100 } = request.queryParams;
      console.log("recieved params:",search,stage)
      page = Number(page);
      pageSize = Number(pageSize);

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

      console.log("[/candidates] Sending response:", {
        data: paginated,
        meta: { total, totalPages, page, pageSize },
      });

      return {
        data: paginated,
        meta: { total, totalPages, page, pageSize },
      };
    } catch (err) {
      console.error("[/candidates] Handler error:", err);
      return new Response(
        500,
        { "Content-Type": "application/json" },
        { error: "Failed to fetch candidates" }
      );
    }
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
  server.get("/candidates/:id/timeline", async (schema, request) => {
    try {
      const id = Number(request.params.id);

      // fetch candidate record from Dexie or Mirage schema
      const candidate = await db.candidates.get(id);
      if (!candidate) {
        return new Response(
          404,
          { "Content-Type": "application/json" },
          { error: "Candidate not found" }
        );
      }

      const stageOrder = ["applied", "screen", "tech", "offer", "hired", "rejected"];

      // get index of current stage
      const stageIndex = stageOrder.indexOf(candidate.stage);
      if (stageIndex === -1) {
        return { events: [] };
      }

      // helper to generate past ISO dates
      const today = new Date();
      const daysAgo = (n) => {
        const d = new Date(today);
        d.setDate(today.getDate() - n);
        return d.toISOString();
      };

      // base actions
      const actions = {
        applied: "Applied for the role",
        screen: "Screening interview completed",
        tech: "Technical interview completed",
        offer: "Offer discussion",
        hired: "Candidate hired 🎉",
        rejected: "Candidate rejected ❌",
      };

      // build events dynamically up to candidate.stage
      const events = [];
      let offset = (stageIndex + 1) * 5; // start further back for earlier stages
      for (let i = 0; i <= stageIndex; i++) {
        const stage = stageOrder[i];
        events.push({
          id: `${id}-${i}`,
          candidateId: id,
          stage,
          action: actions[stage],
          date: daysAgo(offset),
          by: i === 0 ? "system" : stage === "offer" ? "hr" : "recruiter",
        });
        offset -= 3; // move closer to today for next stage
      }

      return { events, stage:candidate.stage};
    } catch (err) {
      console.error("[/candidates/:id/timeline] Handler error:", err);
      return new Response(
        500,
        { "Content-Type": "application/json" },
        { error: "Failed to fetch candidate timeline" }
      );
    }
  });


  server.get("/candidatesboard", async (schema, request) => {
    let { page = 1, pageSize = 25, search = "", stage = "" } = request.queryParams;
    page = Number(page);
    pageSize = Number(pageSize);

    // Load from Dexie or Mirage schema
    let candidates = await db.candidates.toArray();

    // Apply filters
    if (search) {
      const q = search.toLowerCase();
      candidates = candidates.filter(
        (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      );
    }
    if (stage) {
      candidates = candidates.filter((c) => c.stage === stage);
    }

    // Sort + paginate
    const total = candidates.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const slice = candidates.slice(start, start + pageSize);

    // Group by stage (for Board view)
    const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];
    const grouped = stages.reduce((acc, s) => {
      acc[s] = slice.filter((c) => c.stage === s);
      return acc;
    }, {});
  
    return {
      data: grouped,
      meta: { total, totalPages, page, pageSize },
    };
  });

}
