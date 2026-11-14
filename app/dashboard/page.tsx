import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import {
  FiActivity,
  FiArrowUpRight,
  FiCheckCircle,
  FiKey,
  FiLock,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { auth } from "@/auth";
import { AppShell } from "@/components/app-shell";
import { UserAvatar } from "@/components/user-avatar";
import { SignOutSubmitButton } from "@/components/submit-buttons";
import { signOutUser } from "@/app/actions/auth";

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  await connection();
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const firstName = session.user.name?.split(" ")[0] ?? "bienvenido";
  const provider = session.provider === "github" ? "GitHub" : session.provider === "google" ? "Google" : "OAuth";

  return (
    <AppShell current="dashboard" user={session.user}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Sesión activa
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Hola, {firstName}.
            </h1>
            <p className="mt-3 text-base text-slate-500">
              Tu espacio personal está listo y protegido.
            </p>
          </div>
          <div className="w-full sm:w-48 lg:hidden">
            <form action={signOutUser}>
              <SignOutSubmitButton />
            </form>
          </div>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: FiShield,
              label: "Estado",
              value: "Protegido",
              detail: "Verificación del servidor",
              accent: "bg-emerald-100 text-emerald-700",
            },
            {
              icon: FiKey,
              label: "Sesión",
              value: "JWT",
              detail: "Firmada con Auth.js",
              accent: "bg-violet-100 text-violet-700",
            },
            {
              icon: FiUser,
              label: "Proveedor",
              value: provider,
              detail: "Cuenta conectada",
              accent: "bg-sky-100 text-sky-700",
            },
          ].map(({ icon: Icon, label, value, detail, accent }) => (
            <article
              key={label}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className={`grid size-11 place-items-center rounded-2xl ${accent}`}>
                  <Icon className="text-lg" />
                </span>
                <FiArrowUpRight className="text-slate-300" />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {label}
              </p>
              <p className="mt-2 text-2xl font-black tracking-[-0.03em]">{value}</p>
              <p className="mt-1 text-sm text-slate-500">{detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="relative overflow-hidden rounded-[1.75rem] bg-slate-950 p-7 text-white sm:p-8">
            <div className="absolute right-0 top-0 size-56 translate-x-1/3 -translate-y-1/3 rounded-full bg-teal-300/20 blur-3xl" />
            <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center">
              <UserAvatar
                name={session.user.name}
                image={session.user.image}
                size="lg"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
                  Perfil conectado
                </p>
                <h2 className="mt-3 truncate text-2xl font-black tracking-[-0.035em]">
                  {session.user.name ?? "Usuario"}
                </h2>
                <p className="mt-2 truncate text-sm text-slate-300">
                  {session.user.email}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200">
                  <FiCheckCircle className="text-teal-300" /> Identidad verificada
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-amber-100 text-amber-700">
                <FiActivity />
              </span>
              <div>
                <p className="text-sm font-bold">Actividad de sesión</p>
                <p className="text-xs text-slate-400">Estado actual</p>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <div className="flex flex-col items-center">
                <span className="mt-1 size-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                <span className="mt-2 h-full w-px bg-slate-200" />
              </div>
              <div className="pb-6">
                <p className="text-sm font-bold">Inicio de sesión correcto</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {provider} confirmó tu identidad y Auth.js emitió la sesión.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <FiLock className="shrink-0 text-teal-700" />
              Los tokens del proveedor permanecen en el servidor.
            </div>
          </article>
        </section>
      </div>
    </AppShell>
  );
}

function DashboardFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f4f7f6]">
      <div className="text-center">
        <div className="mx-auto size-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-500" />
        <p className="mt-4 text-sm font-semibold text-slate-500">Validando sesión…</p>
      </div>
    </div>
  );
}
