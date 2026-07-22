"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../../components/Logo";
import Pill from "../../components/Pill";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@cxthrift.app");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
          <h1 className="text-xl font-extrabold">Sign in</h1>
          <p className="mt-1 text-sm text-inksoft">
            Demo account is pre-filled — just hit sign in.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-blue"
              />
            </Field>
            {error && <p className="text-sm font-medium text-pink">{error}</p>}
            <Pill type="submit" variant="grad" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Pill>
          </form>
        </div>
        <p className="mt-5 text-center text-sm text-inksoft">
          New to cxThrift?{" "}
          <Link href="/signup" className="font-semibold text-blue">
            Start selling
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
