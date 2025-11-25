"use client";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const customerLinks = [
    { path: "/customer/dashboard", label: "Dashboard" },
    { path: "/customer/rentals", label: "My Rentals" },
    { path: "/customer/containers", label: "Browse Containers" },
    { path: "/customer/wallet", label: "Wallet" },
    { path: "/customer/co2-stats", label: "CO2 Stats" },
  ];

  const vendorLinks = [
    { path: "/vendor/dashboard", label: "Dashboard" },
    { path: "/vendor/containers", label: "My Containers" },
    { path: "/vendor/add-container", label: "Add Container" },
    { path: "/vendor/returns", label: "Pending Returns" },
  ];

  const adminLinks = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/vendors", label: "Vendors" },
    { path: "/admin/rentals", label: "Rentals" },
    { path: "/admin/reports", label: "Reports" },
  ];

  let links = [];
  if (user?.role === "customer") links = customerLinks;
  if (user?.role === "vendor") links = vendorLinks;
  if (user?.role === "admin") links = adminLinks;

  return (
    <aside className="sidebar">
      <h2 className="text-white fw-bold mb-4">ECOrent</h2>
      <nav className="d-flex flex-column gap-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link rounded px-3 py-2 ${
              location.pathname === link.path
                ? "bg-primary text-white"
                : "text-muted"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
