import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("demoUser")) || null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    // Demo credentials only. Not real authentication.
    if (email === "test@example.com" && password === "123456") {
      const loggedInUser = { email };

      setUser(loggedInUser);
      localStorage.setItem("demoUser", JSON.stringify(loggedInUser));

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("demoUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
