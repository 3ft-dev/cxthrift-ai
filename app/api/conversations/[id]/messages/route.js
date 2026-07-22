import { NextResponse } from "next/server";
import { getDb } from "../../../../../lib/db";
import { getCurrentUser } from "../../../../../lib/auth";

export async function GET(req, { params }) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const db = getDb();
  const convo = db
    .prepare("SELECT * FROM conversations WHERE id = ? AND user_id = ?")
    .get(params.id, user.id);
  if (!convo) return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  const messages = db
    .prepare("SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC")
    .all(params.id);
  return NextResponse.json({ conversation: convo, messages });
}

export async function POST(req, { params }) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const { body } = await req.json();
  if (!body || !body.trim()) {
    return NextResponse.json({ error: "Message can't be empty." }, { status: 400 });
  }
  const db = getDb();
  const convo = db
    .prepare("SELECT * FROM conversations WHERE id = ? AND user_id = ?")
    .get(params.id, user.id);
  if (!convo) return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  db.prepare("INSERT INTO messages (conversation_id, sender, body) VALUES (?, 'seller', ?)").run(params.id, body);
  db.prepare("UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(params.id);
  const messages = db
    .prepare("SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC")
    .all(params.id);
  return NextResponse.json({ messages });
}
