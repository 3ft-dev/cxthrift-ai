import Link from "next/link";
import Logo from "../components/Logo";
import Pill from "../components/Pill";
import NodeFlow from "../components/NodeFlow";

const NAV_LINKS = [
  { href: "#product", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#manifesto", label: "Manifesto" },
];

const FEATURES = [
  {
    eyebrow: "AI sales agent",
    title: "Replies like you, sells while you sleep",
    body: "Trained on your past sales, voice, inventory, and grading. Answers fit, negotiates, measures, and closes without leaving DMs.",
    tag: "Voice clone · Playbook",
    accent: "from-teal to-blue",
  },
  {
    eyebrow: "Conversational checkout",
    title: "In-chat payments, no link hopping",
    body: "Collect EcoCash, Paystack, and Stripe inside WhatsApp & IG. Auto invoices, shipping quotes, and “where is my order?” handled.",
    tag: "Pay in DM · MPesa · Card · Cash",
    accent: "from-blue to-pink",
  },
  {
    eyebrow: "Hyper-personal",
    title: "Curated drops for every buyer",
    body: "Learns style, size, budget, and past likes. Each follower gets a different feed, drop alert, and price — like Take.app for thrift.",
    tag: "size M · linen · $20",
    accent: "from-pink to-amber",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Plug in IG & WhatsApp",
    body: "One-tap OAuth. Imports inventory, past DMs, and audience graph.",
  },
  {
    n: "02",
    title: "AI learns your shop",
    body: "Voice, sizing rules, thrift grading, pricing guardrails.",
  },
  {
    n: "03",
    title: "Conversations → checkout",
    body: "Auto-replies, curated drops, in-DM pay. No link-in-bio tax.",
  },
  {
    n: "04",
    title: "Re-engage on autopilot",
    body: "Restock alerts, fit feedback, loyalty. AI knows who loved what.",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "",
    tagline: "100 AI conversations / mo",
    features: [
      "Instagram DM automation",
      "Basic catalog import",
      "Manual checkout links",
      "Community support",
    ],
    cta: "Get started free",
    variant: "outline",
  },
  {
    name: "Growth",
    price: "$29",
    period: "/mo",
    tagline: "2,000 conversations • everything to sell",
    features: [
      "WhatsApp + IG comments + Stories",
      "In-DM payments (EcoCash, Card)",
      "Hyper-personalized drops",
      "AI pricing & inventory sync",
    ],
    cta: "Start Growth trial",
    variant: "grad",
    popular: true,
  },
  {
    name: "Scale",
    price: "$99",
    period: "/mo",
    tagline: "Unlimited • for teams",
    features: [
      "Team inbox + roles",
      "Custom AI voice & flows",
      "API + Zapier + Webhooks",
      "Priority onboarding",
    ],
    cta: "Contact sales",
    variant: "dark",
  },
];

export default function LandingPage() {
  return (
    <>
      <SiteNav />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </>
  );
}

function SiteNav() {
  return (
    <nav className="sticky top-0 z-30 border-b border-line bg-cloud/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-[5vw] py-3.5">
        <Logo />
        <div className="hidden gap-7 text-sm font-semibold text-inksoft md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Pill href="/signin" variant="outline" size="sm">
            Sign in
          </Pill>
          <Pill href="/signup" variant="grad" size="sm">
            Start Selling
          </Pill>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="product"
      className="relative overflow-hidden px-[5vw] pt-24 text-center"
      style={{
        background:
          "radial-gradient(circle at 82% 18%, rgba(255,77,141,.16), transparent 42%), radial-gradient(circle at 12% 82%, rgba(12,189,209,.18), transparent 46%)",
      }}
    >
      <p className="eyebrow justify-center">AI-native commerce for Instagram &amp; WhatsApp</p>
      <h1 className="mx-auto mt-5 max-w-[12.5ch] text-[clamp(40px,6.2vw,82px)] font-extrabold leading-[.96] tracking-tighter">
        Turn conversations into customers, <span className="grad-text">automatically</span>
      </h1>
      <p className="mx-auto mt-5 max-w-[54ch] text-lg font-medium text-inksoft">
        cxThrift is the Take.app-style platform that plugs into DMs, comments, and stories. AI
        handles discovery, qualification, and checkout so every follower gets a hyper-personalized
        shopping flow.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Pill href="/signup" variant="grad">
          Start free trial →
        </Pill>
        <Pill href="#how-it-works" variant="outline">
          See live demo
        </Pill>
      </div>

      <DemoMock />
    </section>
  );
}

function DemoMock() {
  return (
    <div className="relative mx-auto mt-14 max-w-[1020px] rounded-lg2 border border-line bg-white p-5 text-left shadow-[0_24px_60px_rgba(20,21,26,.08)] md:p-7">
      <div className="mono flex items-center gap-2 text-[11px] uppercase tracking-widest text-inksoft">
        <span className="h-1.5 w-1.5 rounded-full bg-teal" /> Instagram DMs • live sync
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-[1.1fr_1.4fr]">
        <div className="space-y-3">
          {[
            { i: "A", h: "amara.t", s: '“do you have my size?” • now' },
            { i: "J", h: "james.k", s: "paid $42 · 2 items" },
            { i: "S", h: "sara.m", s: "wants linen drop" },
          ].map((r) => (
            <div key={r.h} className="flex items-center gap-3 rounded-2xl border border-line p-3">
              <span className="grad-bg flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold text-white">
                {r.i}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{r.h}</p>
                <p className="truncate text-xs text-inksoft">{r.s}</p>
              </div>
            </div>
          ))}
          <p className="mono text-xs text-inksoft">
            +2k · 2,481 members joined from Instagram
            <br />
            Synced automatically — no manual invites
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-cloud p-4">
          <div className="mono flex items-center justify-between text-[11px] text-inksoft">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" /> live • AI handling
            </span>
            <span>AI confidence 94%</span>
          </div>
          <p className="mt-3 rounded-xl bg-white p-3 text-sm">
            Hi Amara! Saw you liked the linen edit. I saved 3 pieces in size M under $25 — all
            thrifted, steamed, measured. Want to see?
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-line bg-white p-2.5 text-xs">
              <p className="font-bold">Washed Linen Shirt — Sand</p>
              <p className="mt-0.5 font-extrabold text-blue">$18</p>
              <p className="mt-0.5 text-inksoft">M • AI measured fit ✓ • grade A</p>
            </div>
            <div className="rounded-xl border border-line bg-white p-2.5 text-xs">
              <p className="font-bold">Cropped Linen Pant — Oat</p>
              <p className="mt-0.5 font-extrabold text-blue">$22</p>
              <p className="mt-0.5 text-inksoft">M • pairs perfectly • 2 left</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Pill variant="grad" size="sm" className="flex-1">
              Add both to bag
            </Pill>
            <Pill variant="outline" size="sm" className="flex-1">
              Checkout in DM
            </Pill>
          </div>
          <p className="mono mt-3 text-[11px] text-teal">TYPING • AI is personalizing next drop for Amara...</p>
        </div>
      </div>
    </div>
  );
}

function Stats() {
  const items = [
    { v: "$18.2k", l: "revenue this week" },
    { v: "2,481", l: "members auto-synced" },
    { v: "68%", l: "faster checkout" },
    { v: "4.9/5", l: "seller love" },
  ];
  return (
    <section className="px-[5vw] py-14">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((s) => (
          <div key={s.l} className="text-center">
            <p className="text-3xl font-extrabold tracking-tight md:text-4xl">{s.v}</p>
            <p className="mono mt-1 text-[11px] uppercase tracking-widest text-inksoft">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="px-[5vw] py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="eyebrow justify-center">features — every DM is a storefront</p>
        <h2 className="mx-auto mt-4 max-w-[18ch] text-center text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight">
          Built where your audience already lives
        </h2>
        <p className="mx-auto mt-4 max-w-[56ch] text-center text-inksoft">
          A hybrid AI + commerce platform that feels native to the feeds it plugs into — familiar
          enough to trust instantly, sharp enough to feel powered by something more.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-lg2 border border-line bg-white p-6">
              <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${f.accent}`} />
              <p className="mono mt-4 text-[11px] uppercase tracking-widest text-inksoft">{f.eyebrow}</p>
              <h3 className="mt-2 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-inksoft">{f.body}</p>
              <p className="mono mt-4 text-[11px] text-teal">{f.tag}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center">
          <p className="eyebrow justify-center">signature element — node-line flow</p>
          <p className="mx-auto mt-3 max-w-[46ch] text-center text-sm text-inksoft">
            A recurring node-line motif — never decorative. Always tracing a real connection: a
            creator's account to their audience, a purchase to a member, an AI suggestion to the
            action it informs.
          </p>
          <NodeFlow className="mt-6 w-full max-w-[420px]" />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-[5vw] py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="eyebrow justify-center">how it works</p>
        <h2 className="mx-auto mt-4 max-w-[16ch] text-center text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight">
          Connect, train, sell, retain
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-lg2 border border-line p-5">
              <p className="mono text-xs text-blue">{s.n}</p>
              <h3 className="mt-2 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-inksoft">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="px-[5vw] py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="eyebrow justify-center">pricing — Take.app simple</p>
        <h2 className="mx-auto mt-4 max-w-[16ch] text-center text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight">
          Start free, scale when you sell
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-lg2 border p-7 ${
                p.popular ? "border-blue shadow-[0_16px_40px_rgba(10,92,255,.14)]" : "border-line"
              }`}
            >
              {p.popular && (
                <span className="mono absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-3 py-1 text-[10px] uppercase tracking-widest text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-bold">{p.name}</h3>
              <p className="mt-2">
                <span className="text-4xl font-extrabold">{p.price}</span>
                <span className="text-inksoft">{p.period}</span>
              </p>
              <p className="mono mt-1 text-xs text-inksoft">{p.tagline}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-teal">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Pill href="/signup" variant={p.variant} className="mt-6 w-full">
                {p.cta}
              </Pill>
            </div>
          ))}
        </div>
        <p className="mono mt-8 text-center text-xs text-inksoft">
          No listing fees. Cancel anytime. Built for thrift sellers first.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="manifesto" className="border-t border-line px-[5vw] py-14">
      <div className="mx-auto max-w-[1200px]">
        <Logo />
        <p className="mt-4 max-w-[50ch] text-sm text-inksoft">
          A Take.app style AI platform for thrift sellers. We automate sales and conversational
          flows for hyper-personalized customer experiences — where your audience already lives.
        </p>
        <div className="mt-8 flex flex-wrap justify-between gap-6 text-sm text-inksoft">
          <p className="mono text-xs">© 2026 cxThrift</p>
          <p className="mono text-xs">Masvingo • Harare • Remote</p>
        </div>
      </div>
    </footer>
  );
}
