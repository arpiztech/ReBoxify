import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const nav = useNavigate();
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("ecorent_user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("ecorent_user", JSON.stringify(user));
    else localStorage.removeItem("ecorent_user");
  }, [user]);

  const login = (token, userObj) => {
    localStorage.setItem("ecorent_token", token);
    setUser(userObj);
    nav("/app");
  };

  const logout = () => {
    localStorage.removeItem("ecorent_token");
    localStorage.removeItem("ecorent_user");
    setUser(null);
    nav("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
