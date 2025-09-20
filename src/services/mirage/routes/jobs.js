import db from "../../../db";
import { withFailure } from "../utils/withFailure";

export default function jobsRoutes(server) {
  // GET /jobs
  server.get("/jobs", async (_schema, request) => {
    const { search = "", status = "", page = 1, pageSize = 10, sort = "" } =
      request.queryParams;

    return {
      params: {
        search,
        status,
        page,
        pageSize,
        sort
      },
    };
  });

  // POST /jobs
  server.post("/jobs", withFailure((_schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return { ...attrs, id: Date.now() };
  }));

  // PATCH /jobs/:id
  server.patch("/jobs/:id", withFailure((_schema, request) => {
    const id = Number(request.params.id);
    const attrs = JSON.parse(request.requestBody);
    return { id, ...attrs };
  }));

  // PATCH /jobs/:id/reorder
  server.patch("/jobs/:id/reorder", withFailure((_schema, request) => {
    const payload = JSON.parse(request.requestBody);
    return payload;
  }));
}
