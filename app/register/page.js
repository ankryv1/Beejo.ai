"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await register(email, password, name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-8">

        {/* Heading */}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Create Account 
          </h1>

          <p className="text-gray-300 mt-2">
            Join us and get started in seconds
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-lg p-3 mb-5 text-sm text-center">
            {error}
          </div>
        )}

        {/* Google Signup */}

        <button
          onClick={() => {
            window.location.href = "/api/auth/google";
          }}
          className="w-full bg-white hover:bg-gray-100 transition rounded-xl py-3 flex items-center justify-center gap-3 font-medium text-gray-800 shadow-md"
        >
          <FcGoogle size={24} />

          Continue with Google
        </button>

        {/* Divider */}

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-white/20"></div>

          <span className="mx-3 text-gray-400 text-sm">
            OR
          </span>

          <div className="flex-1 border-t border-white/20"></div>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">

          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Shri Ram"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Email Address
            </label>

            <input
              type="email"
              placeholder="ram@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-white font-semibold transition hover:scale-[1.02] hover:shadow-lg active:scale-100"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-gray-300 mt-7">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Login
          </Link>
        </p>

        <p className="text-center text-xs text-gray-500 mt-5">
          🔒 Your data is securely protected and encrypted.
        </p>

      </div>
    </div>
  );
}
 
