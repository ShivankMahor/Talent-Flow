import { createServer } from "miragejs";
import jobsRoutes from "./routes/jobs";
import candidatesRoutes from "./routes/candidates";
import assessmentsRoutes from "./routes/assessments";
import authRoutes from "./routes/auth";
import dashBoardRoutes from "./routes/dashboard";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    routes() {
      this.namespace = "api";
      authRoutes(this);
      jobsRoutes(this);
      candidatesRoutes(this);
      assessmentsRoutes(this);
      dashBoardRoutes(this);
    },
  });
}
