import React, { useEffect, useState } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, refreshProfile } = React.useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.patch("/auth/me", { name, phone, address });
      await refreshProfile();
      alert("Profile updated");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded">
      <h2 className="text-xl mb-3">My Profile</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border"
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border"
        />
        <button className="p-2 bg-blue-600 text-white w-full">Save</button>
      </form>
    </div>
  );
}
