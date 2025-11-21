import React, { useState } from "react";
import { authApi } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function AuthPage() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = isLogin
        ? await authApi.login({ email: form.email, password: form.password })
        : await authApi.register(form);
      toast.success(res.data.message || "Success");
      login(res.data.token, res.data.user);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? "Login" : "Register"}
      </h2>
      <form onSubmit={submit} className="space-y-3">
        {!isLogin && (
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            className="w-full p-3 border rounded"
            required
          />
        )}
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          type="email"
          className="w-full p-3 border rounded"
          required
        />
        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          type="password"
          className="w-full p-3 border rounded"
          required
        />
        {!isLogin && (
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full p-3 border rounded"
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>
        )}
        <button
          disabled={loading}
          className="w-full py-3 bg-green-500 text-white rounded"
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
      <div className="text-sm text-center mt-3">
        <button className="text-green-600" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create an account" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
