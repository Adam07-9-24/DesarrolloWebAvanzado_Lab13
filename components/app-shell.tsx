import type { ReactNode } from "react";
import Link from "next/link";
import { FiGrid, FiShield, FiUser } from "react-icons/fi";
import { Brand } from "@/components/brand";
import { UserAvatar } from "@/components/user-avatar";
import { SignOutSubmitButton } from "@/components/submit-buttons";
import { signOutUser } from "@/app/actions/auth";

type AppShellProps = {
  children: ReactNode;
  current: "dashboard" | "profile";
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: FiGrid, id: "dashboard" },
  { href: "/profile", label: "Mi perfil", icon: FiUser, id: "profile" },
] as const;

export function AppShell({ children, current, user }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#f4f7f6] text-slate-950">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-slate-200/80 bg-white p-6 lg:flex lg:flex-col">
          <Brand />
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <UserAvatar name={user.name} image={user.image} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {user.name ?? "Usuario"}
                </p>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
          </div>
          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.id === current;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon className="text-lg" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto space-y-4">
            <div className="rounded-2xl bg-teal-50 p-4 text-sm text-teal-950">
              <FiShield className="mb-3 text-xl text-teal-700" />
              <p className="font-bold">Sesión protegida</p>
              <p className="mt-1 text-xs leading-5 text-teal-800/80">
                Identidad verificada con Auth.js.
              </p>
            </div>
            <form action={signOutUser}>
              <SignOutSubmitButton />
            </form>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-[#f4f7f6]/90 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="flex items-center justify-between gap-4">
              <div className="lg:hidden">
                <Brand compact />
              </div>
              <nav className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 lg:hidden">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      aria-label={item.label}
                      className={`grid size-10 place-items-center rounded-lg ${
                        item.id === current
                          ? "bg-slate-950 text-white"
                          : "text-slate-500"
                      }`}
                    >
                      <Icon />
                    </Link>
                  );
                })}
              </nav>
              <div className="ml-auto flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-bold text-slate-900">
                    {user.name ?? "Usuario"}
                  </p>
                  <p className="text-xs text-slate-500">Cuenta conectada</p>
                </div>
                <UserAvatar name={user.name} image={user.image} size="sm" />
              </div>
            </div>
          </header>
          <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
