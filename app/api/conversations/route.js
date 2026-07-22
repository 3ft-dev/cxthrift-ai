import { NextResponse } from "next/server";
import { getDb } from "../../../lib/db";
import { getCurrentUser } from "../../../lib/auth";

export async function GET() {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM conversations WHERE user_id = ? ORDER BY updated_at DESC")
    .all(user.id);
  return NextResponse.json({ conversations: rows });
}
