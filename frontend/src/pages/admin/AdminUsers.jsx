"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import api from "../../utils/api";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    try {
      const params = roleFilter ? { role: roleFilter } : {};
      const data = await api.get("/admin/users", { params });
      setUsers(data.users || []);
    } catch (error) {
      console.log("[v0] Users error:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await api.patch(`/admin/users/${id}/deactivate`);
      toast.success("User deactivated");
      fetchUsers();
    } catch (error) {
      console.log("[v0] Deactivate error:", error);
      toast.error("Failed to deactivate user");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
        <h1 className="fw-bold fs-2 mb-4">Manage Users</h1>

        <div className="mb-4">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="form-select w-auto"
          >
            <option value="">All Roles</option>
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="alert alert-info">No users found</div>
        ) : (
          <div className="table-responsive card shadow-sm">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="fw-bold">{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="badge bg-primary">{user.role}</span>
                    </td>
                    <td>{user.phone || "-"}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.isActive ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      {user.isActive && (
                        <button
                          onClick={() => handleDeactivate(user._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
