"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginUser(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Welcome Back 
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-300">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-700 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}