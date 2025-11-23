import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, AuthContext } from "./context/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import MyRentals from "./pages/MyRentals";
import WalletPage from "./pages/WalletPage";
import BrowseContainers from "./pages/BrowseContainers";
import RentContainer from "./pages/RentContainer";
import Profile from "./pages/Profile";

// COMPONENT for Checking Login
function RequireAuth({ children }) {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

const root = createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Redirect home to browse */}
          <Route index element={<Navigate to="/browse" replace />} />

          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="browse" element={<BrowseContainers />} />
          <Route path="rent/:id" element={<RentContainer />} />

          {/* Protected Routes */}
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <CustomerDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="rentals"
            element={
              <RequireAuth>
                <MyRentals />
              </RequireAuth>
            }
          />
          <Route
            path="wallet"
            element={
              <RequireAuth>
                <WalletPage />
              </RequireAuth>
            }
          />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

<RequireAuth>{children}</RequireAuth>;
