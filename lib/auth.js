import crypto from "crypto";
import { cookies } from "next/headers";
import { getDb } from "./db";

const COOKIE_NAME = "cx_session";

export function createSession(userId) {
  const token = crypto.randomBytes(32).toString("hex");
  const db = getDb();
  db.prepare("INSERT INTO sessions (token, user_id) VALUES (?, ?)").run(token, userId);
  return token;
}

export function destroySession(token) {
  const db = getDb();
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

export function getCurrentUser() {
  const store = cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const db = getDb();
  const row = db
    .prepare(
      `SELECT users.* FROM sessions
       JOIN users ON users.id = sessions.user_id
       WHERE sessions.token = ?`
    )
    .get(token);
  if (!row) return null;
  delete row.password_hash;
  return row;
}

export const SESSION_COOKIE = COOKIE_NAME;
