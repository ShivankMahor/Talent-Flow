import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getCurrentUser, logoutUser } from "../../features/auth/services/auth.api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore session on first render
  useEffect(() => {
    getCurrentUser().then((savedUser) => {
      console.log("[AuthProvider] Restoring session:", savedUser);
      setUser(savedUser);
    });
  }, []);

  const login = async (email, password) => {
    console.log("[AuthProvider] Attempting login with:", email);
    try {
      const loggedInUser = await loginUser({ email, password });
      console.log("[AuthProvider] Login successful:", loggedInUser);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      console.error("[AuthProvider] Login failed:", err);
      throw err;
    }
  };

  const logout = async () => {
    console.log("[AuthProvider] Logging out:", user);
    await logoutUser();
    setUser(null);
    console.log("[AuthProvider] User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
