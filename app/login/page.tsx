"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import { DEMO_CREDENTIALS, setAuthenticated } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (
        username.trim().toLowerCase() === DEMO_CREDENTIALS.username.toLowerCase() &&
        password === DEMO_CREDENTIALS.password
      ) {
        setAuthenticated(true);
        router.push("/");
      } else {
        setError("Invalid username or password.");
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="flex flex-col justify-center min-h-[80vh] px-2 py-4">
      <div className="bg-[#1B2235] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#8275FF]/10 border border-[#8275FF]/30 text-[#8275FF] mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Nexus Bank Portal</h1>
          <p className="text-xs text-[#8E9BAE] mt-1">Sign in to your account dashboard</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-3 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-medium text-[#8E9BAE] mb-1.5 uppercase tracking-wider">
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
            <label className="block text-xs font-medium text-[#8E9BAE] mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8E9BAE]">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full pl-10 pr-12 py-3 bg-[#0B1020] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8275FF] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8E9BAE] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-4 bg-[#8275FF] hover:bg-[#7264f0] active:scale-[0.99] transition-all text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}