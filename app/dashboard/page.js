import { getCurrentUser } from "../../lib/auth";
import { getDb } from "../../lib/db";

export default function DashboardOverview() {
  const user = getCurrentUser();
  const db = getDb();

  const convoCount = db
    .prepare("SELECT COUNT(*) as n FROM conversations WHERE user_id = ?")
    .get(user.id).n;
  const aiHandling = db
    .prepare("SELECT COUNT(*) as n FROM conversations WHERE user_id = ? AND status = 'ai_handling'")
    .get(user.id).n;
  const orders = db.prepare("SELECT * FROM orders WHERE user_id = ?").all(user.id);
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const itemCount = db
    .prepare("SELECT COUNT(*) as n FROM catalog_items WHERE user_id = ?")
    .get(user.id).n;

  const stats = [
    { label: "Conversations", value: convoCount },
    { label: "AI handling now", value: aiHandling },
    { label: "Orders", value: orders.length },
    { label: "Revenue", value: `$${revenue.toFixed(2)}` },
  ];

  return (
    <div>
      <p className="eyebrow">overview</p>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
        Welcome back, {user.shop_name}
      </h1>
      <p className="mt-1 text-sm text-inksoft">
        You're on the <span className="font-semibold capitalize text-ink">{user.plan}</span> plan
        with {itemCount} items live in your catalog.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg2 border border-line bg-white p-5">
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="mono mt-1 text-[11px] uppercase tracking-widest text-inksoft">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg2 border border-line bg-white p-6">
        <h2 className="font-bold">Next steps</h2>
        <ul className="mt-3 space-y-2 text-sm text-inksoft">
          <li>→ Head to <span className="font-semibold text-ink">Inbox</span> to see conversations your AI agent is handling.</li>
          <li>→ Add pieces in <span className="font-semibold text-ink">Catalog</span> so the AI has more to recommend.</li>
          <li>→ Tune tone and pricing rules under <span className="font-semibold text-ink">AI agent</span>.</li>
        </ul>
      </div>
    </div>
  );
}
