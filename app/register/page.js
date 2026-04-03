"use client";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-green-300 to-green-200 px-4">
      {/* Glass Card */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {/* Form */}
        <form className="space-y-5">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-cyan-300"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-cyan-300"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-cyan-300"
          />

          {/* Button */}
          <button className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-blue-500 mt-6 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-indigo-900 font-bold cursor-pointer hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
