import api from '../../../services/axios' ;
import { z } from "zod";

// ✅ Validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export async function loginUser(credentials) {
  try {
    // ✅ Validate input before sending
    const parsed = loginSchema.parse(credentials);

    const response = await api.post("/login", parsed);
    console.log("Response Recieved: ",response)
    return response.data.user;
  } catch (err) {
    console.error("[loginUser] error:", err);

    // Handle Zod validation errors
    if (err instanceof z.ZodError) {
      // Combine multiple messages into one string
      throw new Error(err.errors.map(e => e.message).join(", "));
    }

    // Handle API errors
    if (err.response?.status === 401) {
      throw new Error("Invalid credentials");
    }
    if (err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }

    throw new Error("Login failed. Please try again.");
  }
}

export async function logoutUser() {
  try {
    await api.post("/logout");
    return true;
  } catch (err) {
    console.error("[logoutUser] error:", err);

    if (err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }

    throw new Error("Logout failed. Please try again.");
  }
}
