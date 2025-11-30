"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
//import api from "../../utils/api";
import toast from "react-hot-toast";

const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const data = await api.get("/admin/users", {
        params: { role: "vendor" },
      });
      setVendors(data.users);
    } catch (error) {
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Manage Vendors
        </h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : vendors.length === 0 ? (
          <p className="text-center text-gray-600">No vendors found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vendors.map((vendor) => (
              <div
                key={vendor._id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {vendor.name}
                </h3>
                <p className="text-gray-600 mb-1">Email: {vendor.email}</p>
                <p className="text-gray-600 mb-1">
                  Phone: {vendor.phone || "N/A"}
                </p>
                <div className="mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      vendor.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {vendor.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVendors;
