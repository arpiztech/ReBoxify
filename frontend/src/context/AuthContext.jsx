import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // MOCK LOGIN (works without backend)
  const login = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: "dummy-token-123",
          user: {
            name: "Demo User",
            email,
            role: email.includes("vendor") ? "vendor" : "customer",
          },
        });
      }, 700);
    });
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
