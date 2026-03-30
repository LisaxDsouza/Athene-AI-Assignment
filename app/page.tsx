"use client";

import { useState } from "react";
import PendingActionCard from "@/components/PendingActionCard";

type Result = {
  totalChunks: number;
  chunks: string[];
  email: { subject: string; body: string };
};

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function handleProcess() {
    setLoading(true);
    setResult(null); // Clear previous results

    // 1. Task: Chunk Document
    const chunkRes = await fetch("/api/process-document?task=chunk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentText: text }),
    });
    const chunkData = await chunkRes.json();
    
    // Partially update result to show chunks immediately
    setResult({
      ...chunkData,
      email: { subject: "", body: "" }, // Placeholder for HITL result
    });

    // 2. Task: HITL Email Generation
    const hitlRes = await fetch("/api/process-document?task=hitl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentText: text }),
    });
    const hitlData = await hitlRes.json();

    // Final update with email draft
    setResult({
      ...chunkData,
      email: hitlData.email,
    });

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-12">Athene AI — Syllabus to Email</h1>

        <div className={`grid gap-8 ${result ? "grid-cols-3" : "grid-cols-1"}`}>
          <div className={`${result ? "col-span-2" : ""}`}>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full flex flex-col">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">Step 1 · Syllabus Text</h2>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the syllabus copy here..."
                className="flex-grow w-full border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent placeholder-slate-400 min-h-[400px]"
              />
              
              <button
                onClick={handleProcess}
                disabled={!text.trim() || loading}
                className="w-full mt-6 bg-gradient-to-r from-violet-600 to-violet-700 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:from-violet-700 hover:to-violet-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Processing..." : "Process & Draft Email"}
              </button>
            </div>
          </div>

          {result && (
            <div className="col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full flex flex-col sticky top-8">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">
                  {result.totalChunks} Chunks
                </h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {result.chunks.map((chunk, i) => (
                    <div key={i} className="text-xs bg-white border border-slate-100 rounded-lg p-4 text-slate-600 hover:border-violet-200 transition-all shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded text-[10px]">CHUNK #{i + 1}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-tighter">50 words</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{chunk}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {result && result.email.subject && (
          <div className="mt-8">
            <PendingActionCard subject={result.email.subject} body={result.email.body} />
          </div>
        )}
      </div>
    </main>
  );
}