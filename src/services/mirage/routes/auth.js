export default function authRoutes(server){
      
    server.post("/login", (schema, request) => {
    const { email, password } = JSON.parse(request.requestBody);

    if (email === "hr@talentflow.com" && password === "1234") {
        return { id: 100, name: "HR Manager", role: "hr" };
    }
    if (email === "alice@candidate.com" && password === "1234") {
        return { id: 101, name: "Alice Candidate", role: "candidate" };
    }

    return new Response(401, {}, { error: "Invalid credentials" });
    });
}