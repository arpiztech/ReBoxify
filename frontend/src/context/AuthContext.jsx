import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ecorent_user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("ecorent_user", JSON.stringify(user));
    else localStorage.removeItem("ecorent_user");
  }, [user]);

  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });
    localStorage.setItem("ecorent_token", data.token);
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await API.post("/auth/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("ecorent_token", data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("ecorent_token");
    localStorage.removeItem("ecorent_user");
    setUser(null);
  };

  const refreshProfile = async () => {
    try {
      const { data } = await API.get("/auth/me");
      setUser(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, register, logout, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
