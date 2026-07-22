"use client";

import { useEffect, useState } from "react";

const EMPTY_FORM = { name: "", price: "", size: "", grade: "", stock: 1, note: "" };

export default function CatalogPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function load() {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setLoading(false);
      });
  }

  useEffect(load, []);

  async function handleAdd(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.price) {
      setError("Give it a name and a price at least.");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/catalog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) || 1 }),
    });
    setSaving(false);
    if (res.ok) {
      setForm(EMPTY_FORM);
      load();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Couldn't save that item.");
    }
  }

  return (
    <div>
      <p className="eyebrow">catalog</p>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight">What the AI has to sell</h1>
      <p className="mt-1 text-sm text-inksoft">
        Every field here is what the AI agent quotes buyers in DMs — size, grade, and what's left.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-inksoft">Loading catalog…</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-inksoft">No items yet — add your first piece to the right.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex items-center justify-between rounded-xl border border-line bg-white p-4">
                <div>
                  <p className="font-bold">{it.name}</p>
                  <p className="mono mt-1 text-[11px] text-inksoft">
                    {[it.size && `size ${it.size}`, it.grade && `grade ${it.grade}`, `${it.stock} in stock`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {it.note && <p className="mt-1 text-xs text-inksoft">{it.note}</p>}
                </div>
                <p className="text-lg font-extrabold text-blue">${it.price}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleAdd} className="h-fit rounded-lg2 border border-line bg-white p-5">
          <h2 className="font-bold">Add a piece</h2>
          <div className="mt-4 space-y-3">
            <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Washed Linen Shirt — Sand" />
            <Input label="Price ($)" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} placeholder="18" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Size" value={form.size} onChange={(v) => setForm({ ...form, size: v })} placeholder="M" />
              <Input label="Grade" value={form.grade} onChange={(v) => setForm({ ...form, grade: v })} placeholder="A" />
            </div>
            <Input label="Stock" type="number" value={form.stock} onChange={(v) => setForm({ ...form, stock: v })} />
            <Input label="Note" value={form.note} onChange={(v) => setForm({ ...form, note: v })} placeholder="pairs perfectly • 2 left" />
          </div>
          {error && <p className="mt-3 text-sm font-medium text-pink">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="grad-bg mt-4 w-full rounded-full py-2.5 text-sm font-bold text-white"
          >
            {saving ? "Adding…" : "Add to catalog"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-inksoft">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line px-3 py-2 text-sm outline-none focus:border-blue"
      />
    </label>
  );
}
