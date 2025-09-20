import { createServer } from "miragejs";
import jobsRoutes from "./routes/jobs";
import candidatesRoutes from "./routes/candidates";
import assessmentsRoutes from "./routes/assessments";
import authRoutes from "./routes/auth";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    routes() {
      this.namespace = "api";
      // this.timing = Math.floor(Math.random() * 1000) + 200;
      this.timing = 500


      // this.pretender.handledRequest = (verb, path, request) => {
      //   const failRate = Math.random();
      //   if (failRate < 0.8) { // ~8% failure rate
      //     console.error(`[Mirage] Simulated network error on ${verb} ${path}`);
      //     request.respond(500, {}, JSON.stringify({ error: "Simulated server error" }));
      //     return false;
      //   }
      // };

      authRoutes(this);
      jobsRoutes(this);
      candidatesRoutes(this);
      assessmentsRoutes(this);
    },
  });
}
