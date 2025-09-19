import { createServer, Response, Model } from "miragejs";
import db from "../../db";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    models: {
      job: Model,
      candidate: Model,
    },

    // seeds(server) {
    //   // You can seed Mirage too (for network simulation)
    //   server.create("job", { id: 1, title: "Frontend Developer", slug: "frontend-dev", status: "active", order: 1 });
    //   server.create("job", { id: 2, title: "Backend Developer", slug: "backend-dev", status: "active", order: 2 });

    //   server.create("candidate", { id: 1, name: "Alice Candidate", email: "alice@candidate.com", stage: "applied" });
    // },

    routes() {
      this.namespace = "api";
      this.timing = 600; // simulate latency

      // --- LOGIN ---
      this.post("/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        if (email === "hr@talentflow.com" && password === "1234") {
          return { id: 100, name: "HR Manager", role: "hr" };
        }
        if (email === "alice@candidate.com" && password === "1234") {
          return { id: 101, name: "Alice Candidate", role: "candidate" };
        }

        return new Response(401, {}, { error: "Invalid credentials" });
      });

      // --- JOBS ---
      this.get("/jobs", async () => {
        const jobs = await db.jobs.toArray();
        return { data: jobs };
      });

      this.post("/jobs", async (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        await db.jobs.add(attrs);
        return attrs;
      });

      // --- CANDIDATES ---
      this.get("/candidates", async () => {
        const candidates = await db.candidates.toArray();
        return { data: candidates };
      });

      this.post("/candidates", async (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        await db.candidates.add(attrs);
        return attrs;
      });
    },
  });
}
