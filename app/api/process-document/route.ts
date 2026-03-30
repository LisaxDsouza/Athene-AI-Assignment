import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "chunks-db.json");

function chunkText(text: string): string[] {
  const words = text.trim().split(/\s+/);
  const chunks: string[] = [];
  let i = 0;
  while (i < words.length) {
    chunks.push(words.slice(i, i + 50).join(" "));
    i += 40; // 50 words - 10 overlap
  }
  return chunks;
}

export async function POST(req: NextRequest) {
  const { documentText } = await req.json();
  const { searchParams } = new URL(req.url);
  const task = searchParams.get("task");

  if (task === "chunk") {
    const chunks = chunkText(documentText);
    const saved = [];
    for (let i = 0; i < chunks.length; i++) {
      await new Promise((r) => setTimeout(r, 1000));
      saved.push({ id: i + 1, text: chunks[i] });
    }
    await fs.writeFile(DB_PATH, JSON.stringify(saved, null, 2));
    return NextResponse.json({ totalChunks: chunks.length, chunks });
  }

  if (task === "hitl") {
    // Simulate HITL/Email generation logic
    await new Promise((r) => setTimeout(r, 800));
    const email = {
      subject: "Rescheduled Lab Exam",
      body: "Please note the lab exam is moved to Friday at 10 AM.",
    };
    return NextResponse.json({ email });
  }

  return NextResponse.json({ error: "Invalid task" }, { status: 400 });
}
