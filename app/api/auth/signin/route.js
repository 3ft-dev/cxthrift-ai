import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "../../../../lib/db";
import { createSession, SESSION_COOKIE } from "../../../../lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();
  const db = getDb();
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user || !bcrypt.compareSync(password || "", user.password_hash)) {
    return NextResponse.json({ error: "That email and password don't match." }, { status: 401 });
  }
  const token = createSession(user.id);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, { httpOnly: true, path: "/", sameSite: "lax" });
  return res;
}
