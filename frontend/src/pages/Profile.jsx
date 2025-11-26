"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: { ...formData.address, [name]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow:1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
        <h1 className="fw-bold fs-2 mb-4">My Profile</h1>

        <form
          onSubmit={handleSubmit}
          className="card shadow-sm p-4"
          style={{ maxWidth: "700px" }}
        >
          <div className="mb-3">
            <label className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <h5 className="fw-bold mb-3">Address</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small">Street</label>
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={formData.address.street}
                  onChange={handleAddressChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small">State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={formData.address.zipCode}
                  onChange={handleAddressChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small">Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.address.country}
                  onChange={handleAddressChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
