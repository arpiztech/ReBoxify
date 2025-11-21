import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Leaf, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/app" className="flex items-center gap-3">
          <div className="bg-green-500 text-white p-2 rounded-md">
            <Leaf size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg">EcoRent</h1>
            <p className="text-xs text-slate-500">Reusable packaging rentals</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {!user ? (
            <Link
              to="/auth"
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Login / Register
            </Link>
          ) : (
            <>
              <div className="text-sm text-slate-700">Hi, {user.name}</div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-500 text-white"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
