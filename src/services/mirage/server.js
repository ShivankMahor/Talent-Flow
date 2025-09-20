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

      authRoutes(this);
      jobsRoutes(this);
      candidatesRoutes(this);
      assessmentsRoutes(this);
    },
  });
}
