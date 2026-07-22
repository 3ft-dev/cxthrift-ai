import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

const DB_PATH = path.join(process.cwd(), "data", "cxthrift.db");

function ensureDataDir() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

let db;

export function getDb() {
  if (db) return db;
  ensureDataDir();
  const isNew = !fs.existsSync(DB_PATH);
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  migrate(db);
  if (isNew) seed(db);
  return db;
}

function migrate(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      shop_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      plan TEXT NOT NULL DEFAULT 'starter',
      ai_voice TEXT DEFAULT 'Warm, direct, a little playful. Answers fast, never pushy.',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS catalog_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      size TEXT,
      grade TEXT,
      stock INTEGER DEFAULT 1,
      note TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      channel TEXT NOT NULL,
      handle TEXT NOT NULL,
      initial TEXT NOT NULL,
      ai_confidence INTEGER DEFAULT 90,
      status TEXT DEFAULT 'ai_handling',
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversation_id INTEGER NOT NULL,
      sender TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      buyer_handle TEXT NOT NULL,
      items_count INTEGER NOT NULL,
      subtotal REAL NOT NULL,
      shipping REAL NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'paid',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}

function seed(db) {
  const passwordHash = bcrypt.hashSync("demo1234", 10);
  const insertUser = db.prepare(`
    INSERT INTO users (shop_name, email, password_hash, plan, ai_voice)
    VALUES (@shop_name, @email, @password_hash, @plan, @ai_voice)
  `);
  const info = insertUser.run({
    shop_name: "Thrifted by Nyasha",
    email: "demo@cxthrift.app",
    password_hash: passwordHash,
    plan: "growth",
    ai_voice: "Warm, direct, a little playful. Answers fast, measures twice, never pushy.",
  });
  const userId = info.lastInsertRowid;

  const items = [
    { name: "Washed Linen Shirt — Sand", price: 18, size: "M", grade: "A", stock: 3, note: "AI measured fit ✓" },
    { name: "Cropped Linen Pant — Oat", price: 22, size: "M", grade: "A-", stock: 2, note: "pairs perfectly • 2 left" },
    { name: "Boxy Denim Jacket — Stonewash", price: 26, size: "S", grade: "B+", stock: 1, note: "vintage wash, slight fade" },
    { name: "Silk Slip Dress — Ivory", price: 24, size: "M", grade: "A", stock: 2, note: "cut on the bias" },
    { name: "Corduroy Trucker — Rust", price: 20, size: "L", grade: "A-", stock: 4, note: "heavyweight cord" },
  ];
  const insertItem = db.prepare(`
    INSERT INTO catalog_items (user_id, name, price, size, grade, stock, note)
    VALUES (@user_id, @name, @price, @size, @grade, @stock, @note)
  `);
  for (const it of items) insertItem.run({ user_id: userId, ...it });

  const insertConvo = db.prepare(`
    INSERT INTO conversations (user_id, channel, handle, initial, ai_confidence, status)
    VALUES (@user_id, @channel, @handle, @initial, @ai_confidence, @status)
  `);
  const insertMsg = db.prepare(`
    INSERT INTO messages (conversation_id, sender, body) VALUES (@conversation_id, @sender, @body)
  `);

  const c1 = insertConvo.run({
    user_id: userId, channel: "instagram", handle: "amara.t",
    initial: "do you have my size?", ai_confidence: 94, status: "ai_handling",
  }).lastInsertRowid;
  insertMsg.run({ conversation_id: c1, sender: "buyer", body: "do you have my size?" });
  insertMsg.run({ conversation_id: c1, sender: "ai", body: "Hi Amara! Saw you liked the linen edit. I saved 3 pieces in size M under $25 — all thrifted, steamed, measured. Want to see?" });
  insertMsg.run({ conversation_id: c1, sender: "ai", body: "Washed Linen Shirt — Sand ($18) and Cropped Linen Pant — Oat ($22), both M, both thrift grade A." });

  const c2 = insertConvo.run({
    user_id: userId, channel: "whatsapp", handle: "james.k",
    initial: "paid $42 · 2 items", ai_confidence: 97, status: "closed",
  }).lastInsertRowid;
  insertMsg.run({ conversation_id: c2, sender: "buyer", body: "I'll take both, how do I pay?" });
  insertMsg.run({ conversation_id: c2, sender: "ai", body: "You're set — paid via DM. Order #2841 confirmed, shipping out tomorrow." });

  const c3 = insertConvo.run({
    user_id: userId, channel: "instagram", handle: "sara.m",
    initial: "wants linen drop", ai_confidence: 88, status: "queued",
  }).lastInsertRowid;
  insertMsg.run({ conversation_id: c3, sender: "buyer", body: "omg is there more linen coming??" });
  insertMsg.run({ conversation_id: c3, sender: "ai", body: "Queued a story reply for you — linen drop restocks Friday, I'll ping you first." });

  db.prepare(`
    INSERT INTO orders (user_id, buyer_handle, items_count, subtotal, shipping, total, status)
    VALUES (@user_id, @buyer_handle, @items_count, @subtotal, @shipping, @total, @status)
  `).run({ user_id: userId, buyer_handle: "james.k", items_count: 2, subtotal: 40, shipping: 2, total: 42, status: "paid" });
}
