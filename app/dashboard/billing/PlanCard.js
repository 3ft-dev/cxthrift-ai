"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlanCard({ plan, isCurrent }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function switchPlan() {
    setLoading(true);
    await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: plan.id }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className={`rounded-lg2 border p-6 ${isCurrent ? "border-blue" : "border-line"}`}>
      <h2 className="font-bold">{plan.name}</h2>
      <p className="mt-2 text-3xl font-extrabold">{plan.price}</p>
      <p className="mono mt-1 text-xs text-inksoft">{plan.tagline}</p>
      <ul className="mt-4 space-y-1.5 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-teal">✓</span> {f}
          </li>
        ))}
      </ul>
      <button
        onClick={switchPlan}
        disabled={isCurrent || loading}
        className={`mt-5 w-full rounded-full py-2.5 text-sm font-bold ${
          isCurrent ? "bg-cloud text-inksoft" : "grad-bg text-white"
        }`}
      >
        {isCurrent ? "Current plan" : loading ? "Switching…" : `Switch to ${plan.name}`}
      </button>
    </div>
  );
}
