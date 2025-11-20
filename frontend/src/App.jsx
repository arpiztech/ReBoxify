import React, { useState, useEffect } from "react";
import Notifications from "./component/common/Notifications";
import AuthPage from "./component/auth/AuthPage";
import CustomerApp from "./component/layouts/CustomerApp";
import VendorApp from "./component/layouts/VendorApp";
import { Leaf, LogOut } from "lucide-react";

export default function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      const u = JSON.parse(userData);
      setUser(u);
      setCurrentPage(
        u.role === "vendor" ? "vendor-dashboard" : "customer-dashboard"
      );
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCurrentPage("login");
  };

  const showMessage = (message, type = "success") => {
    if (type === "success") {
      setSuccess(message);
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError(message);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Notifications success={success} error={error} />

      {user && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Leaf className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">EcoRent</h1>
                <p className="text-sm text-gray-500">Sustainable Packaging</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6">
        {!user && currentPage === "login" && (
          <AuthPage
            onSuccess={(u) => {
              setUser(u);
              setCurrentPage(
                u.role === "vendor" ? "vendor-dashboard" : "customer-dashboard"
              );
            }}
            showMessage={showMessage}
          />
        )}

        {user && user.role === "customer" && (
          <CustomerApp
            user={user}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            showMessage={showMessage}
          />
        )}

        {user && user.role === "vendor" && (
          <VendorApp
            user={user}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            showMessage={showMessage}
          />
        )}
      </main>
    </div>
  );
}
