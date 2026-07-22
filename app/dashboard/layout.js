import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth";
import Logo from "../../components/Logo";
import SignOutButton from "./SignOutButton";
import DashboardNav from "./DashboardNav";

export default function DashboardLayout({ children }) {
  const user = getCurrentUser();
  if (!user) redirect("/signin");

  return (
    <div className="min-h-screen bg-cloud md:flex">
      <aside className="border-b border-line bg-white px-5 py-5 md:min-h-screen md:w-[240px] md:border-b-0 md:border-r">
        <Logo size={28} />
        <p className="mono mt-4 truncate text-xs text-inksoft">{user.shop_name}</p>
        <DashboardNav />
        <div className="mt-8 border-t border-line pt-4">
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 px-[5vw] py-8 md:px-10">{children}</main>
    </div>
  );
}
