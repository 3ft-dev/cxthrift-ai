import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "../../../../lib/db";
import { createSession, SESSION_COOKIE } from "../../../../lib/auth";

export async function POST(req) {
  const { shopName, email, password } = await req.json();
  if (!shopName || !email || !password) {
    return NextResponse.json({ error: "Shop name, email, and password are all required." }, { status: 400 });
  }
  const db = getDb();
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const info = db
    .prepare("INSERT INTO users (shop_name, email, password_hash) VALUES (?, ?, ?)")
    .run(shopName, email, passwordHash);
  const token = createSession(info.lastInsertRowid);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, { httpOnly: true, path: "/", sameSite: "lax" });
  return res;
}
