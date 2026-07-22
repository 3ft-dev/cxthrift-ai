import { NextResponse } from "next/server";
import { getDb } from "../../../lib/db";
import { getCurrentUser } from "../../../lib/auth";

export async function GET() {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const db = getDb();
  const rows = db.prepare("SELECT * FROM catalog_items WHERE user_id = ? ORDER BY id DESC").all(user.id);
  return NextResponse.json({ items: rows });
}

export async function POST(req) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const { name, price, size, grade, stock, note } = await req.json();
  if (!name || !price) {
    return NextResponse.json({ error: "Item needs at least a name and price." }, { status: 400 });
  }
  const db = getDb();
  const info = db
    .prepare(
      "INSERT INTO catalog_items (user_id, name, price, size, grade, stock, note) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(user.id, name, price, size || null, grade || null, stock || 1, note || null);
  const item = db.prepare("SELECT * FROM catalog_items WHERE id = ?").get(info.lastInsertRowid);
  return NextResponse.json({ item });
}
