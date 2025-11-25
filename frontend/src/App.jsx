"use client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import MyRentals from "./pages/customer/MyRentals";
import BrowseContainers from "./pages/customer/BrowseContainers";
import WalletPage from "./pages/customer/WalletPage";
import CO2Stats from "./pages/customer/CO2Stats";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorContainers from "./pages/vendor/VendorContainers";
import AddContainer from "./pages/vendor/AddContainer";
import PendingReturns from "./pages/vendor/PendingReturns";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminRentals from "./pages/admin/AdminRentals";
import AdminReports from "./pages/admin/AdminReports";

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Customer Routes */}
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute requiredRole="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/rentals"
          element={
            <ProtectedRoute requiredRole="customer">
              <MyRentals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/containers"
          element={
            <ProtectedRoute requiredRole="customer">
              <BrowseContainers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/wallet"
          element={
            <ProtectedRoute requiredRole="customer">
              <WalletPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/co2-stats"
          element={
            <ProtectedRoute requiredRole="customer">
              <CO2Stats />
            </ProtectedRoute>
          }
        />

        {/* Vendor Routes */}
        <Route
          path="/vendor/dashboard"
          element={
            <ProtectedRoute requiredRole="vendor">
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/containers"
          element={
            <ProtectedRoute requiredRole="vendor">
              <VendorContainers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/add-container"
          element={
            <ProtectedRoute requiredRole="vendor">
              <AddContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/returns"
          element={
            <ProtectedRoute requiredRole="vendor">
              <PendingReturns />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vendors"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminVendors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rentals"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminRentals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminReports />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
