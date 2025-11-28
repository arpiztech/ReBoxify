"use client";

import { createContext, useContext, useState, useEffect } from "react";
//import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // Fetch authenticated user profile
  // ------------------------------
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchUser();
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/profile");

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error("AuthContext: Failed to fetch user", err);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------
  // Register
  // ------------------------------
  const register = async (data) => {
    const res = await api.post("/auth/register", data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setToken(res.data.token);
    setUser(res.data.user);

    api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

    return res.data;
  };

  // ------------------------------
  // Login
  // ------------------------------
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setToken(res.data.token);
    setUser(res.data.user);

    api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

    return res.data;
  };

  // ------------------------------
  // Logout
  // ------------------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);

    delete api.defaults.headers.common["Authorization"];
  };

  // ------------------------------
  // Update Profile
  // ------------------------------
  const updateProfile = async (profileData) => {
    const res = await api.put("/auth/profile", profileData);

    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
