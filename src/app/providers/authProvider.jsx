import { createContext, useContext, useState } from "react";
import { loginUser, logoutUser } from "../../features/auth/services/auth.api";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);
  const [loading, setLoading] = useState(false); // ✅ global loading

  async function login(email, password) {
    setLoading(true);
    try {
      const loggedInUser = await loginUser({ email, password });
      setUser(loggedInUser);

      toast.success(
        "Welcome back " + (loggedInUser.name || "User") + " 👋",
        { autoClose: 2500 }
      );

      return loggedInUser;
    } catch (err) {
      console.error("[AuthProvider] Login failed:", err);
      toast.error("Login failed. Please check your credentials.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      toast.info("You have been logged out.");
    } catch (err) {
      console.error("[AuthProvider] Logout failed:", err);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
