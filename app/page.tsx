"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Bell, 
  ShieldCheck, 
  CreditCard, 
  Wallet, 
  RefreshCw, 
  ExternalLink, 
  RotateCcw, 
  CheckCircle2, 
  Coins,
  LogOut,
  X,
  ArrowDownLeft
} from "lucide-react";
import { checkIsAuthenticated, setAuthenticated } from "@/lib/auth";
import { initialUserData } from "@/data/mockData";

export default function DashboardPage() {
  const router = useRouter();
  const [userData] = useState(initialUserData);
  const [isMounted, setIsMounted] = useState(false);

  // Converter Modal State
  const [showConverter, setShowConverter] = useState(false);
  const [usdtAmount, setUsdtAmount] = useState("100");

  // Real-time counter for Transaction 1 (2 months, 2 weeks ago)
  const [elapsedTx1, setElapsedTx1] = useState(74 * 24 * 60 * 60 + 14 * 60);
  
  // Real-time counter for Transaction 2 (Starting at 5 minutes = 300 seconds ago)
  const [elapsedTx2, setElapsedTx2] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTx1((prev) => prev + 1);
      setElapsedTx2((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatBackdatedTime = (totalSeconds: number, isShort: boolean = false) => {
    if (isShort && totalSeconds < 3600) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}m ${seconds}s ago`;
    }

    const months = Math.floor(totalSeconds / (30 * 24 * 60 * 60));
    const remainderAfterMonths = totalSeconds % (30 * 24 * 60 * 60);
    const weeks = Math.floor(remainderAfterMonths / (7 * 24 * 60 * 60));
    const remainderAfterWeeks = remainderAfterMonths % (7 * 24 * 60 * 60);
    const days = Math.floor(remainderAfterWeeks / (24 * 60 * 60));
    const hours = Math.floor((remainderAfterWeeks % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((remainderAfterWeeks % 3600) / 60);
    const seconds = remainderAfterWeeks % 60;

    let parts = [];
    if (months > 0) parts.push(`${months}m`);
    if (weeks > 0) parts.push(`${weeks}w`);
    if (months === 0 && weeks === 0 && days > 0) parts.push(`${days}d`);
    parts.push(`${hours}h ${minutes}m ${seconds}s`);

    return `${parts.join(' ')} ago`;
  };

  useEffect(() => {
    setIsMounted(true);
    if (!checkIsAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    setAuthenticated(false);
    router.replace("/login");
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-6 pb-12 relative">
      
      {/* Top Header / Profile Bar */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-[#1B2235] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#E34A9B]" />
          </button>
        </div>

        <div className="text-right">
          <h2 className="text-xs font-semibold text-[#8E9BAE] uppercase tracking-wider flex items-center justify-end gap-1">
            WONDERFUL WEEK,
          </h2>
          <div className="flex items-center justify-end gap-1.5 mt-0.5">
            <span className="text-lg font-extrabold text-white tracking-wide">👋 {userData.name}</span>
          </div>
        </div>

        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-[#8275FF] p-0.5 relative">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-600 to-indigo-400 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
              <span className="text-base">👤</span>
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#45C5AE] border-2 border-[#0B1020]" />
          </div>
        </div>
      </div>

      {/* Account Status Meta Bar */}
      <div className="flex items-center justify-between text-xs text-[#8E9BAE] px-1">
        <span>Updated Now</span>
        <div className="flex items-center gap-1.5 text-[#45C5AE] font-medium">
          <span>SECURE ACCOUNT</span>
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>

      {/* Primary Cards Grid (Row 1) */}
      <div className="grid grid-cols-2 gap-3.5">
        
        {/* Card 1: Today's Card Expenses */}
        <div className="bg-[#1B2235] border border-white/10 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between min-h-[140px] shadow-lg">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#8275FF]/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8E9BAE]">
            <div className="w-7 h-7 rounded-lg bg-[#8275FF]/15 text-[#8275FF] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="leading-tight uppercase">TODAY'S EXPENSES</span>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-bold text-white flex items-baseline gap-1">
              {userData.currencySymbol}{userData.expensesToday.toFixed(2)}
            </div>
            <p className="text-[11px] text-[#8E9BAE] mt-1">No charges today</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8275FF] to-transparent" />
        </div>

        {/* Card 2: Currently In My Account */}
        <div className="bg-[#1B2235] border border-white/10 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between min-h-[140px] shadow-lg">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#E34A9B]/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8E9BAE]">
            <div className="w-7 h-7 rounded-lg bg-[#E34A9B]/15 text-[#E34A9B] flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="leading-tight uppercase">ACCOUNT BALANCE</span>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-bold text-white flex items-baseline gap-1">
              {userData.currencySymbol}{userData.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-[#8E9BAE] mt-1">{userData.accountType}</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E34A9B] to-transparent" />
        </div>

      </div>

      {/* Quick Action Controls */}
      <div className="grid grid-cols-3 gap-2.5">
        <button 
          onClick={() => setShowConverter(true)}
          className="bg-[#1B2235] border border-white/10 hover:border-[#8275FF]/50 text-white rounded-xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 text-[11px] font-semibold transition-all active:scale-[0.98]"
        >
          <RefreshCw className="w-4 h-4 text-[#8275FF]" />
          <span>Converter</span>
        </button>

        <button 
          onClick={() => router.push("/deposit")}
          className="bg-[#1B2235] border border-white/10 hover:border-[#45C5AE]/50 text-white rounded-xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 text-[11px] font-semibold transition-all active:scale-[0.98]"
        >
          <Coins className="w-4 h-4 text-[#45C5AE]" />
          <span>Fund Crypto</span>
        </button>

        <button 
          onClick={() => router.push("/transfer")}
          className="bg-[#1B2235] border border-[#8275FF]/40 hover:border-[#8275FF] text-white rounded-xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 text-[11px] font-semibold transition-all active:scale-[0.98] shadow-md shadow-[#8275FF]/10"
        >
          <ExternalLink className="w-4 h-4 text-[#E34A9B]" />
          <span>Transfer</span>
        </button>
      </div>

      {/* Recent Transactions Section with Real-Time Backdated Counters */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>RECENT TRANSACTIONS</span>
            <RotateCcw className="w-3.5 h-3.5 text-[#E34A9B]" />
          </h3>
        </div>

        {/* Transaction 1: Primary Account Credit */}
        <div className="bg-[#1B2235] border border-white/10 rounded-2xl p-4 flex items-center justify-between relative shadow-lg">
          <div className="space-y-1">
            <p className="text-[10px] font-semibold text-[#8E9BAE] uppercase tracking-wider flex items-center gap-1">
              <ArrowDownLeft className="w-3 h-3 text-[#45C5AE]" />
              PAYMENT RECEIVED
            </p>
            <div className="text-2xl font-black text-white flex items-baseline gap-1">
              $63,120.00
            </div>
            <div className="flex items-center gap-2 text-[11px] pt-1">
              <span className="text-[#45C5AE] flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confirmed
              </span>
              <span className="text-[#8E9BAE] font-mono text-[10px]">
                {formatBackdatedTime(elapsedTx1)}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between self-stretch">
            <div className="w-10 h-10 rounded-full bg-[#E7B83D]/20 border border-[#E7B83D]/40 flex items-center justify-center text-[#E7B83D]">
              <Coins className="w-5 h-5" />
            </div>

            <span className="text-[10px] bg-[#45C5AE]/10 border border-[#45C5AE]/30 text-[#45C5AE] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
              CHECKING ACTIVITY
            </span>
          </div>
        </div>

        {/* Transaction 2: Incoming $1k Crypto Deposit (Starts at 5 mins ago and counts up) */}
        <div className="bg-[#1B2235] border border-white/10 rounded-2xl p-4 flex items-center justify-between relative shadow-lg">
          <div className="space-y-1">
            <p className="text-[10px] font-semibold text-[#8E9BAE] uppercase tracking-wider flex items-center gap-1">
              <ArrowDownLeft className="w-3 h-3 text-[#45C5AE]" />
              INCOMING CRYPTO DEPOSIT
            </p>
            <div className="text-2xl font-black text-white flex items-baseline gap-1">
              $1,000.00
            </div>
            <div className="flex items-center gap-2 text-[11px] pt-1">
              <span className="text-[#45C5AE] flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Network Settled
              </span>
              <span className="text-[#8E9BAE] font-mono text-[10px]">
                {formatBackdatedTime(elapsedTx2, true)}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between self-stretch">
            <div className="w-10 h-10 rounded-full bg-[#45C5AE]/20 border border-[#45C5AE]/40 flex items-center justify-center text-[#45C5AE]">
              <span className="text-base font-bold">₮</span>
            </div>

            <span className="text-[10px] bg-[#45C5AE]/10 border border-[#45C5AE]/30 text-[#45C5AE] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
              TRC20 VAULT
            </span>
          </div>
        </div>

      </div>

      {/* Session Controls */}
      <div className="pt-6 text-center">
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 text-xs text-[#8E9BAE] hover:text-red-400 transition-colors py-2 px-4 rounded-xl border border-white/5 hover:border-red-500/20"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* USDT - USD CONVERTER MODAL */}
      {showConverter && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1B2235] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#8275FF]" />
                USDT to USD Converter
              </h3>
              <button 
                onClick={() => setShowConverter(false)}
                className="text-[#8E9BAE] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8E9BAE] mb-1.5 uppercase">USDT Amount</label>
              <input
                type="number"
                value={usdtAmount}
                onChange={(e) => setUsdtAmount(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B1020] border border-white/10 rounded-xl text-white font-bold text-base focus:outline-none focus:border-[#8275FF]"
                placeholder="100"
              />
            </div>

            <div className="bg-[#0B1020] border border-white/10 rounded-xl p-4 text-center">
              <span className="text-xs text-[#8E9BAE] uppercase">Equivalent USD Value (1 USDT ≈ $1.00 USD)</span>
              <div className="text-2xl font-black text-[#45C5AE] mt-1">
                ${(parseFloat(usdtAmount) || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
              </div>
            </div>

            <button
              onClick={() => setShowConverter(false)}
              className="w-full py-3 bg-[#8275FF] hover:bg-[#8275FF]/90 text-white font-semibold rounded-xl text-xs transition-colors"
            >
              Close Converter
            </button>
          </div>
        </div>
      )}

    </div>
  );
}