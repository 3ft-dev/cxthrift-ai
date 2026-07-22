"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/inbox", label: "Inbox" },
  { href: "/dashboard/catalog", label: "Catalog" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/agent", label: "AI agent" },
  { href: "/dashboard/billing", label: "Billing" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav className="mt-6 flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
      {LINKS.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
              active ? "bg-ink text-white" : "text-inksoft hover:bg-line/50 hover:text-ink"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
