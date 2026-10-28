"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Send, 
  Building2, 
  User, 
  CreditCard, 
  AlertTriangle, 
  ShieldAlert
} from "lucide-react";

export default function QuickTransferPage() {
  const router = useRouter();
  
  // Step State: 'form' | 'review' | 'result'
  const [step, setStep] = useState<"form" | "review" | "result">("form");

  // Form State
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!bank.trim()) {
      setError("Please enter a bank name.");
      return;
    }
    if (!accountNumber.trim() || accountNumber.length < 8) {
      setError("Please enter a valid account number (min. 8 digits).");
      return;
    }
    if (!recipientName.trim()) {
      setError("Please enter the recipient's name.");
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid transfer amount greater than 0.");
      return;
    }

    setStep("review");
  };

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("result");
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            if (step === "review") setStep("form");
            else router.push("/");
          }}
          className="w-10 h-10 rounded-full bg-[#1B2235] border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-bold text-white uppercase tracking-wider">
          {step === "result" ? "Transfer Result" : step === "review" ? "Review Transfer" : "Quick Transfer"}
        </h1>
        <div className="w-10" />
      </div>

      {/* STEP 1: FORM */}
      {step === "form" && (
        <form onSubmit={handleReview} className="bg-[#1B2235] border border-white/10 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-[#8275FF]" />
              Recipient Details
            </h2>
            <p className="text-xs text-[#8E9BAE] mt-1">Enter destination account info below</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#8E9BAE] mb-1.5 uppercase tracking-wider">
              Bank Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8E9BAE]">
                <Building2 className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                placeholder="Enter any bank name"
                className="w-full pl-10 pr-4 py-3 bg-[#0B1020] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8275FF] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8E9BAE] mb-1.5 uppercase tracking-wider">
              Account Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8E9BAE]">
                <CreditCard className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 0123456789"
                maxLength={12}
                className="w-full pl-10 pr-4 py-3 bg-[#0B1020] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8275FF] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8E9BAE] mb-1.5 uppercase tracking-wider">
              Recipient Account Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8E9BAE]">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full pl-10 pr-4 py-3 bg-[#0B1020] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8275FF] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8E9BAE] mb-1.5 uppercase tracking-wider">
              Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 bg-[#0B1020] border border-white/10 rounded-xl text-lg font-bold text-white placeholder-gray-500 focus:outline-none focus:border-[#E34A9B] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-[#8275FF] hover:bg-[#7264f0] active:scale-[0.99] text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-[#8275FF]/20"
          >
            Review Transfer Details
          </button>
        </form>
      )}

      {/* STEP 2: REVIEW */}
      {step === "review" && (
        <div className="bg-[#1B2235] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="text-center border-b border-white/10 pb-4">
            <span className="text-xs text-[#8E9BAE] uppercase tracking-wider font-semibold">Total Transfer Amount</span>
            <div className="text-3xl font-black text-white mt-1">
              ${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[#8E9BAE]">Destination Bank</span>
              <span className="font-semibold text-white">{bank}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[#8E9BAE]">Account Number</span>
              <span className="font-semibold text-white">{accountNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[#8E9BAE]">Recipient Name</span>
              <span className="font-semibold text-white">{recipientName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[#8E9BAE]">Fee</span>
              <span className="font-semibold text-[#45C5AE]">$0.00 (Free)</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setStep("form")}
              className="w-1/2 py-3 px-4 bg-[#0B1020] border border-white/10 text-[#8E9BAE] hover:text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Back to Form
            </button>
            <button
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
              className="w-1/2 py-3 px-4 bg-[#E34A9B] hover:opacity-90 text-white rounded-xl text-xs font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Confirm Send</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CUSTOM CLIENT ERROR RESULT */}
      {step === "result" && (
        <div className="bg-[#1B2235] border border-white/10 rounded-2xl p-6 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Transfer Validation Required</h2>
            <p className="text-xs text-red-400 font-medium mt-3 leading-relaxed px-2 bg-red-500/10 border border-red-500/20 py-3 rounded-xl">
              Contact your clearance officer Michael Smith to validate the transaction.
            </p>
          </div>

          <div className="bg-[#0B1020] border border-white/10 rounded-xl p-4 text-left text-xs space-y-2">
            <div className="flex justify-between text-[#8E9BAE]">
              <span>Destination Bank:</span>
              <span className="text-white font-medium">{bank}</span>
            </div>
            <div className="flex justify-between text-[#8E9BAE]">
              <span>Simulated Recipient:</span>
              <span className="text-white font-medium">{recipientName}</span>
            </div>
            <div className="flex justify-between text-[#8E9BAE]">
              <span>Attempted Amount:</span>
              <span className="text-white font-medium">${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-[#8E9BAE]">
              <span>Account Balance:</span>
              <span className="text-[#45C5AE] font-bold">Unchanged ($63,120.00)</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => router.push("/")}
              className="w-full py-3.5 px-4 bg-[#8275FF] hover:bg-[#7264f0] text-white font-semibold rounded-xl text-xs transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}