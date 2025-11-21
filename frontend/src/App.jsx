import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/UI/Navbar";
import ProtectedRoute from "./components/UI/ProtectedRoute";

import AuthPage from "./pages/AuthPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import MyRentals from "./pages/MyRentals";
import WalletPage from "./pages/WalletPage";
import CO2Stats from "./pages/CO2Stats";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/app" replace />} />
            <Route path="/auth" element={<AuthPage />} />

            <Route
              path="/app/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route index element={<CustomerDashboard />} />
                    <Route path="customer" element={<CustomerDashboard />} />
                    <Route path="vendor" element={<VendorDashboard />} />
                    <Route path="rentals" element={<MyRentals />} />
                    <Route path="wallet" element={<WalletPage />} />
                    <Route path="co2" element={<CO2Stats />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={<div className="text-center py-20">Page not found</div>}
            />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </AuthProvider>
  );
}
