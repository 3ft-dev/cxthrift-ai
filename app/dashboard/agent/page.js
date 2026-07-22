"use client";

import { useState } from "react";

export default function AgentPage() {
  const [voice, setVoice] = useState(
    "Warm, direct, a little playful. Answers fast, measures twice, never pushy."
  );
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aiVoice: voice }),
    });
    setSaving(false);
    setSaved(true);
  }

  return (
    <div>
      <p className="eyebrow">AI agent</p>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight">Trained on your shop</h1>
      <p className="mt-1 text-sm text-inksoft">
        Voice, sizing rules, thrift grading, pricing guardrails — this is what the agent uses in
        every DM.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <form onSubmit={handleSave} className="rounded-lg2 border border-line bg-white p-6">
          <h2 className="font-bold">Voice &amp; tone</h2>
          <p className="mt-1 text-xs text-inksoft">
            How the agent should sound when it replies for you.
          </p>
          <textarea
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            rows={5}
            className="mt-3 w-full rounded-xl border border-line p-3 text-sm outline-none focus:border-blue"
          />
          <div className="mt-3 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="grad-bg rounded-full px-5 py-2.5 text-sm font-bold text-white"
            >
              {saving ? "Saving…" : "Save voice"}
            </button>
            {saved && <span className="text-xs font-semibold text-teal">Saved</span>}
          </div>
        </form>

        <div className="rounded-lg2 border border-line bg-white p-6">
          <h2 className="font-bold">Connected channels</h2>
          <p className="mt-1 text-xs text-inksoft">One-tap OAuth imports inventory, DMs, and your audience graph.</p>
          <div className="mt-4 space-y-3">
            <ChannelRow name="Instagram" status="Connected" />
            <ChannelRow name="WhatsApp" status="Connected" />
            <ChannelRow name="TikTok Shop" status="Not connected" pending />
          </div>
        </div>

        <div className="rounded-lg2 border border-line bg-white p-6 md:col-span-2">
          <h2 className="font-bold">Pricing guardrails</h2>
          <p className="mt-1 text-xs text-inksoft">
            The agent negotiates within these bounds and never quotes outside them.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Stat label="Max discount" value="15%" />
            <Stat label="Min margin" value="30%" />
            <Stat label="Bundle discount" value="10%" />
            <Stat label="Auto-approve under" value="$50" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelRow({ name, status, pending }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line p-3">
      <p className="text-sm font-semibold">{name}</p>
      <span
        className={`mono rounded-full px-2.5 py-1 text-[11px] ${
          pending ? "bg-cloud text-inksoft" : "bg-teal/10 text-teal"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-cloud p-3">
      <p className="text-lg font-extrabold">{value}</p>
      <p className="mono mt-0.5 text-[10px] uppercase tracking-widest text-inksoft">{label}</p>
    </div>
  );
}
