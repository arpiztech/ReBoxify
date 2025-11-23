import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Navbar />

      <main className="container py-4">
        <Outlet />
      </main>
    </div>
  );
}
