"use client";

import { useEffect, useState } from "react";

export default function InboxPage() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch("/api/conversations")
      .then((r) => r.json())
      .then((data) => {
        setConversations(data.conversations || []);
        if (data.conversations?.length) setActiveId(data.conversations[0].id);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!activeId) return;
    fetch(`/api/conversations/${activeId}/messages`)
      .then((r) => r.json())
      .then((data) => setMessages(data.messages || []));
  }, [activeId]);

  async function sendReply(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    setSending(true);
    const res = await fetch(`/api/conversations/${activeId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: draft }),
    });
    setSending(false);
    if (res.ok) {
      const data = await res.json();
      setMessages(data.messages);
      setDraft("");
    }
  }

  const active = conversations.find((c) => c.id === activeId);

  return (
    <div>
      <p className="eyebrow">inbox</p>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight">Every DM is a storefront</h1>

      {loading ? (
        <p className="mt-6 text-sm text-inksoft">Loading conversations…</p>
      ) : conversations.length === 0 ? (
        <p className="mt-6 text-sm text-inksoft">
          No conversations yet — once IG or WhatsApp is connected, buyer DMs will show up here.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-[280px_1fr]">
          <div className="space-y-2">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`block w-full rounded-xl border p-3 text-left transition-colors ${
                  c.id === activeId ? "border-blue bg-blue/5" : "border-line bg-white hover:border-ink"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold">{c.handle}</p>
                  <span className="mono text-[10px] uppercase text-inksoft">{c.channel}</span>
                </div>
                <p className="mt-1 truncate text-xs text-inksoft">{c.initial}</p>
                <p className="mono mt-1 text-[10px] text-teal">
                  {c.status.replace("_", " ")} · AI {c.ai_confidence}%
                </p>
              </button>
            ))}
          </div>

          <div className="rounded-lg2 border border-line bg-white p-5">
            {active && (
              <>
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <div>
                    <p className="font-bold">{active.handle}</p>
                    <p className="mono text-[11px] text-inksoft">{active.channel}</p>
                  </div>
                  <span className="mono rounded-full bg-cloud px-2.5 py-1 text-[11px] text-inksoft">
                    AI confidence {active.ai_confidence}%
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                        m.sender === "buyer"
                          ? "bg-cloud"
                          : m.sender === "ai"
                          ? "grad-bg ml-auto text-white"
                          : "ml-auto bg-ink text-white"
                      }`}
                    >
                      {m.body}
                      <p className="mono mt-1 text-[10px] opacity-70">
                        {m.sender === "buyer" ? active.handle : m.sender === "ai" ? "AI agent" : "You"}
                      </p>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendReply} className="mt-4 flex gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Jump into the conversation…"
                    className="flex-1 rounded-full border border-line px-4 py-2.5 text-sm outline-none focus:border-blue"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="grad-bg rounded-full px-5 py-2.5 text-sm font-bold text-white"
                  >
                    Send
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
