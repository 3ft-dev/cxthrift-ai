# cxThrift

AI-native commerce for Instagram & WhatsApp — scaffolded full-stack from the
original landing-page MVP. Sellers get an AI agent that chats with buyers in
DMs, curates personalized drops from their catalog, and closes conversational
checkout, plus a real dashboard to run all of it.

## Stack

- **Next.js 14** (App Router) — one framework for both frontend and backend
- **React** + **Tailwind CSS** — UI, using the original MVP's brand tokens
  (colors, fonts, node-line motif) carried over from the static HTML
- **SQLite** via `better-sqlite3` — zero-config database, file-based
- **bcryptjs** + signed cookie sessions — auth, no third-party service needed

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The database is created automatically on
first run at `data/cxthrift.db`, seeded with a demo shop and the same
conversations/orders shown in the original mock (Amara, James, Sara).

**Demo login:**
- Email: `demo@cxthrift.app`
- Password: `demo1234`

Or sign up fresh from the landing page — new shops start on Starter with an
empty catalog and inbox.

## What's implemented

- **Landing page** (`/`) — hero, live-DM mock, stats, features, how-it-works,
  pricing, footer. Same copy and brand system as the original MVP, now real
  React components with your logo as the favicon and nav mark.
- **Auth** (`/signin`, `/signup`) — session-based, backed by `users` table.
- **Dashboard** (`/dashboard`, auth-gated):
  - **Overview** — live stats pulled from the database
  - **Inbox** — conversation list + thread view, reply as the seller
  - **Catalog** — thrift items with size/grade/stock, add new pieces
  - **Orders** — order history with totals and status
  - **AI agent** — voice/tone settings, connected-channel status, pricing
    guardrails
  - **Billing** — the three pricing tiers, switch plans

## Project structure

```
app/
  page.js                 landing page
  signin/, signup/         auth pages
  dashboard/                dashboard shell + pages
  api/                       backend routes (auth, conversations, catalog, orders, agent)
lib/
  db.js                      SQLite schema + seed data
  auth.js                    session helpers
components/                  shared UI (Logo, Pill, NodeFlow)
```

## Next steps toward production

- Swap the OAuth stubs on the AI agent page for real Instagram/WhatsApp
  Business API connections
- Replace the cookie-session auth with a hardened auth provider if this
  ever handles real payments
- Wire the "AI sales agent" replies to an actual LLM call instead of the
  seeded demo messages
