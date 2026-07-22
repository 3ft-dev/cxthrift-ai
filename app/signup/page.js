"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../../components/Logo";
import Pill from "../../components/Pill";

export default function SignUpPage() {
  const router = useRouter();
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shopName, email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong. Try again.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cloud px-[5vw] py-16">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-lg2 border border-line bg-white p-7">
          <h1 className="text-xl font-extrabold">Start selling</h1>
          <p className="mt-1 text-sm text-inksoft">Free on Starter — no card required.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field label="Shop name">
              <input
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="Thrifted by You"
                className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-blue"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-blue"
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-blue"
              />
            </Field>
            {error && <p className="text-sm font-medium text-pink">{error}</p>}
            <Pill type="submit" variant="grad" className="w-full" disabled={loading}>
              {loading ? "Creating shop…" : "Create my shop"}
            </Pill>
          </form>
        </div>
        <p className="mt-5 text-center text-sm text-inksoft">
          Already selling?{" "}
          <Link href="/signin" className="font-semibold text-blue">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-inksoft">
        {label}
      </span>
      {children}
    </label>
  );
}
