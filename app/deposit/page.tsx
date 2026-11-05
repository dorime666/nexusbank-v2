"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy, Check, ShieldCheck, Coins } from "lucide-react";
import QRCode from "react-qr-code";

export default function DepositPage() {
  const router = useRouter();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const wallets = [
    {
      name: "Tether (USDT)",
      network: "TRC20 (Tron Network)",
      address: "TEBWnc2eURA1JcYgF7SNgbE5PX4Hy3hFnT",
      icon: "₮",
      color: "from-teal-500/20 to-emerald-500/20",
      borderColor: "border-teal-500/30",
      badgeColor: "bg-teal-500/10 text-teal-400"
    },
    {
      name: "Ethereum (ETH)",
      network: "ERC20 (Ethereum Network)",
      address: "0x691ea0f813de199c8349134f15da16b0b5e6aa94",
      icon: "Ξ",
      color: "from-purple-500/20 to-indigo-500/20",
      borderColor: "border-purple-500/30",
      badgeColor: "bg-purple-500/10 text-purple-400"
    }
  ];

  const handleCopy = (address: string, name: string) => {
    navigator.clipboard.writeText(address);
    setCopiedKey(name);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => router.push("/")}
          className="w-10 h-10 rounded-full bg-[#1B2235] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-extrabold text-white uppercase tracking-wider">
          Deposit & Crypto Funding
        </h1>
        <div className="w-10" />
      </div>

      {/* Meta Badge */}
      <div className="bg-[#1B2235] border border-white/10 rounded-2xl p-4 flex items-center justify-between text-xs text-[#8E9BAE]">
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-[#45C5AE]" />
          <span className="font-semibold text-white">Automated Account Credit</span>
        </div>
        <div className="flex items-center gap-1 text-[#45C5AE]">
          <ShieldCheck className="w-4 h-4" />
          <span>VERIFIED VAULT</span>
        </div>
      </div>

      {/* Wallet List with Real QR Codes */}
      <div className="space-y-4">
        {wallets.map((wallet, idx) => (
          <div
            key={idx}
            className={`bg-[#1B2235] border ${wallet.borderColor} rounded-2xl p-5 space-y-4 relative overflow-hidden shadow-xl`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${wallet.color} rounded-full blur-2xl pointer-events-none`} />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg font-bold text-white">
                  {wallet.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{wallet.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold inline-block mt-0.5 ${wallet.badgeColor}`}>
                    {wallet.network}
                  </span>
                </div>
              </div>
            </div>

            {/* Real Dynamic QR Code Container */}
            <div className="flex flex-col items-center justify-center bg-[#0B1020] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="p-3 bg-white rounded-xl shadow-inner">
                <QRCode
                  value={wallet.address}
                  size={140}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="H"
                />
              </div>
              <p className="text-[10px] text-[#8E9BAE] uppercase font-semibold tracking-wider pt-1">
                Scan with wallet camera to transfer
              </p>
            </div>

            {/* Wallet Address & Copy Button */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-[#8E9BAE] uppercase tracking-wider">
                Deposit Address
              </label>
              <div className="flex items-center justify-between bg-[#0B1020] border border-white/10 rounded-xl px-3.5 py-2.5 gap-2">
                <span className="text-xs font-mono text-gray-200 truncate select-all">
                  {wallet.address}
                </span>
                <button
                  onClick={() => handleCopy(wallet.address, wallet.name)}
                  className="shrink-0 flex items-center gap-1.5 bg-[#8275FF]/20 hover:bg-[#8275FF]/30 text-[#8275FF] px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                >
                  {copiedKey === wallet.name ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#45C5AE]" />
                      <span className="text-[#45C5AE]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}