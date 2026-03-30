"use client";

import { useState } from "react";

type Props = { subject: string; body: string };

export default function PendingActionCard({ subject, body }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "approved">("idle");

  function handleApprove() {
    setStatus("sending");
    setTimeout(() => setStatus("approved"), 2000);
  }

  return (
    <div className={`rounded-2xl border p-8 transition-all shadow-sm ${status === "approved" ? "border-green-300 bg-gradient-to-br from-green-50 to-green-100" : "border-slate-200 bg-white hover:shadow-md"}`}>
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">AI Draft</p>
        <p className={`text-xs font-semibold px-2 py-1 rounded-full ${status === "approved" ? "bg-green-200 text-green-700" : "bg-amber-100 text-amber-700"}`}>
          {status === "approved" ? "Approved ✓" : "Pending Review"}
        </p>
      </div>

      <div className="space-y-4 mb-6 bg-slate-50 rounded-xl p-4">
        <div className="text-sm">
          <p className="text-slate-500 mb-1">To:</p>
          <p className="font-medium text-slate-900">students@college.edu</p>
        </div>
        <div className="text-sm border-t border-slate-200 pt-4">
          <p className="text-slate-500 mb-1">Subject:</p>
          <p className="font-medium text-slate-900">{subject}</p>
        </div>
        <div className="text-sm border-t border-slate-200 pt-4">
          <p className="text-slate-500 mb-2">Body:</p>
          <p className="text-slate-700 leading-relaxed">{body}</p>
        </div>
      </div>

      <button
        onClick={handleApprove}
        disabled={status !== "idle"}
        className={`w-full rounded-xl py-3 text-sm font-semibold text-white transition ${
          status === "approved" ? "bg-green-500 cursor-default" : status === "sending" ? "bg-violet-400" : "bg-gradient-to-r from-violet-600 to-violet-700 hover:shadow-lg hover:from-violet-700 hover:to-violet-800"
        }`}
      >
        {status === "approved" ? "✓ Approved & Sent" : status === "sending" ? "Sending..." : "Approve & Send"}
      </button>
    </div>
  );
}