import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

import useUserStore from "../store/userStore.js";


export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useUserStore();
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", formData);
      console.log(res.data.user);
      setCurrentUser(res.data.user);
      toast.success("Login successful!, Navigating to menu ...");  
      setTimeout(() => navigate("/menu"), 2000);
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 pt-20">
        <div className="w-full max-w-md bg-slate-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-orange-500 mb-1">Login to FoodieHub</h2>
          <p className="text-sm text-center text-gray-400 mb-4">Enjoy delicious meals at your Table!</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="w-full px-3 py-2 rounded bg-slate-700 text-white focus:outline-none"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-4 text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-orange-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
