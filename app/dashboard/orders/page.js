import { getCurrentUser } from "../../../lib/auth";
import { getDb } from "../../../lib/db";

export default function OrdersPage() {
  const user = getCurrentUser();
  const db = getDb();
  const orders = db
    .prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC")
    .all(user.id);

  return (
    <div>
      <p className="eyebrow">orders</p>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight">Conversational checkout, closed</h1>
      <p className="mt-1 text-sm text-inksoft">Paid in DM — no link-in-bio tax.</p>

      {orders.length === 0 ? (
        <p className="mt-6 text-sm text-inksoft">No orders yet.</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg2 border border-line bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-inksoft">
                <th className="p-4 font-semibold">Order</th>
                <th className="p-4 font-semibold">Buyer</th>
                <th className="p-4 font-semibold">Items</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-line last:border-0">
                  <td className="mono p-4">#{2840 + o.id}</td>
                  <td className="p-4 font-semibold">{o.buyer_handle}</td>
                  <td className="p-4">{o.items_count}</td>
                  <td className="p-4 font-bold text-blue">${o.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold capitalize text-teal">
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
