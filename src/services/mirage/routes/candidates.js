export default function candidatesRoutes(server) {
  // GET /candidates
  server.get("/candidates", (schema, request) => {
    const { search, stage, page = 1 } = request.queryParams;
    return { data: [] };
  });

  // POST /candidates
  server.post("/candidates", (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    return { ...attrs, id: Date.now() };
  });

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
