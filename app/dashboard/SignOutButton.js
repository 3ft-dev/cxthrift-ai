"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  }
  return (
    <button
      onClick={handleSignOut}
      className="text-sm font-semibold text-inksoft hover:text-pink"
    >
      Sign out
    </button>
  );
}
