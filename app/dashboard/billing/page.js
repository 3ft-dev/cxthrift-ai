import { getCurrentUser } from "../../../lib/auth";
import PlanCard from "./PlanCard";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    tagline: "100 AI conversations / mo",
    features: ["Instagram DM automation", "Basic catalog import", "Manual checkout links"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$29/mo",
    tagline: "2,000 conversations",
    features: ["WhatsApp + IG comments + Stories", "In-DM payments", "Hyper-personalized drops"],
  },
  {
    id: "scale",
    name: "Scale",
    price: "$99/mo",
    tagline: "Unlimited, for teams",
    features: ["Team inbox + roles", "Custom AI voice & flows", "API + Zapier + Webhooks"],
  },
];

export default function BillingPage() {
  const user = getCurrentUser();

  return (
    <div>
      <p className="eyebrow">billing</p>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight">Start free, scale when you sell</h1>
      <p className="mt-1 text-sm text-inksoft">No listing fees. Cancel anytime.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {PLANS.map((p) => (
          <PlanCard key={p.id} plan={p} isCurrent={p.id === user.plan} />
        ))}
      </div>
    </div>
  );
}
