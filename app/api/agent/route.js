import { NextResponse } from "next/server";
import { getDb } from "../../../lib/db";
import { getCurrentUser } from "../../../lib/auth";

export async function POST(req) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const { aiVoice, plan } = await req.json();
  const db = getDb();
  if (typeof aiVoice === "string") {
    db.prepare("UPDATE users SET ai_voice = ? WHERE id = ?").run(aiVoice, user.id);
  }
  if (typeof plan === "string") {
    db.prepare("UPDATE users SET plan = ? WHERE id = ?").run(plan, user.id);
  }
  return NextResponse.json({ ok: true });
}
