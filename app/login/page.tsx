"use client";

import React, { useState } from "react";
import { Lock, User, ShieldCheck, AlertCircle } from "lucide-react";
import { setAuthenticated } from "@/lib/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (username.trim() === "Ravithabura" && password === "Habura4123") {
      setAuthenticated(true);
      window.location.assign("/");
    } else {
      setIsLoading(false);
      setError("Invalid credentials. Please check your username and password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-8">
      <div className="text-center mb-8 space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#8275FF] to-[#E34A9B] flex items-center justify-center mx-auto shadow-lg shadow-[#8275FF]/20">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">NEXUS BANK</h1>
        <p className="text-xs text-[#8E9BAE] uppercase tracking-widest font-semibold">
          Secure Portal Access
        </p>
      </div>

      <div className="bg-[#1B2235] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="border-b border-white/10 pb-3">
          <h2 className="text-sm font-bold text-white">Sign In to Your Account</h2>
          <p className="text-xs text-[#8E9BAE] mt-0.5">Enter account credentials below</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#8E9BAE] mb-1.5 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8E9BAE]">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#0B1020] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8275FF] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8E9BAE] mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8E9BAE]">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#0B1020] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8275FF] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#8275FF] to-[#E34A9B] hover:opacity-90 active:scale-[0.99] text-white font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}