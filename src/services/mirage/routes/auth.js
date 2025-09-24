import db from '../../../db/index'
import { Response } from "miragejs";
export default function authRoutes(server){
      
  server.post("/login", async (_schema, request) => {
    try{
      const { email, password } = JSON.parse(request.requestBody);
      console.log(email,password)
      if (!email || !password) {
        return new Response(400, {}, { error: "Email and password are required" });
      }

      const user = await db.users.where("email").equals(email).first();
      
      console.log("User: ",user)
      if (!user || user.password !== password) {
        return new Response(401, {}, { error: "Invalid credentials" });
      }
      
      return {
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
        },
      };
    } catch (err) {
      console.error("[Mirage] /login error:", err);
      return new Response(500, {}, { error: "Server error, please try again" });
    }
  });

  // LOGOUT
  server.post( "/logout", async () => {
    try {
      return { success: true };
    } catch (err) {
      console.error("[Mirage] /logout error:", err);
      return new Response(500, {}, { error: "Server error, please try again" });
    }
  })
}