import { Suspense } from "react";
import Link from "next/link";
import { FiArrowLeft, FiLock, FiMail, FiShield } from "react-icons/fi";
import { Brand } from "@/components/brand";
import { OAuthSignInButton } from "@/components/submit-buttons";

type LoginSearchParams = Promise<{
  error?: string;
  callbackUrl?: string;
}>;

const errorMessages: Record<string, string> = {
  OAuthSignin: "No se pudo iniciar el acceso con el proveedor.",
  OAuthCallback: "El proveedor no pudo completar la autenticación.",
  OAuthAccountNotLinked:
    "Este correo ya está asociado a otro método de acceso.",
  AccessDenied: "El acceso fue cancelado o rechazado.",
  Configuration: "La autenticación necesita una revisión de configuración.",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: LoginSearchParams;
}) {
  return (
    <main className="grid min-h-screen bg-[#f6f8f7] lg:grid-cols-[0.92fr_1.08fr]">
      <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col xl:p-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.24),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.16),transparent_30%)]" />
        <div className="relative [&_span]:text-white">
          <Brand />
        </div>
        <div className="relative my-auto max-w-xl py-16">
          <div className="mb-8 grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/10 text-2xl text-teal-300 backdrop-blur">
            <FiShield />
          </div>
          <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.05em] xl:text-6xl">
            Bienvenido a tu espacio seguro.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
            Accede con una identidad verificada y continúa exactamente donde lo
            dejaste.
          </p>
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-300">
                Sesión
              </p>
              <p className="mt-3 font-semibold">JWT cifrado</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-300">
                Identidad
              </p>
              <p className="mt-3 font-semibold">Google y GitHub</p>
            </div>
          </div>
        </div>
        <p className="relative text-xs text-slate-500">
          Autenticación gestionada con Auth.js
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center justify-between lg:hidden">
            <Brand />
            <Link
              href="/"
              className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600"
              aria-label="Volver al inicio"
            >
              <FiArrowLeft />
            </Link>
          </div>
          <Link
            href="/"
            className="mb-10 hidden items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900 lg:inline-flex"
          >
            <FiArrowLeft /> Volver al inicio
          </Link>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/[0.06] sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
              Acceso a Nexa
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-slate-950">
              Inicia sesión
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Utiliza tu cuenta de Google o GitHub para acceder al dashboard.
            </p>

            <Suspense fallback={<LoginPanelFallback />}>
              <LoginPanel searchParams={searchParams} />
            </Suspense>
          </div>
          <p className="mx-auto mt-6 max-w-sm text-center text-xs leading-5 text-slate-400">
            Al continuar, el proveedor comparte la información básica de
            tu perfil necesaria para identificar tu cuenta.
          </p>
        </div>
      </section>
    </main>
  );
}

async function LoginPanel({ searchParams }: { searchParams: LoginSearchParams }) {
  const params = await searchParams;
  const callbackUrl =
    params.callbackUrl?.startsWith("/") && !params.callbackUrl.startsWith("//")
      ? params.callbackUrl
      : "/dashboard";
  const error = params.error
    ? (errorMessages[params.error] ?? "No se pudo completar el inicio de sesión.")
    : null;

  return (
    <div className="mt-8">
      {error && (
        <div
          role="alert"
          className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700"
        >
          {error}
        </div>
      )}
      <div className="space-y-3">
        <OAuthSignInButton callbackUrl={callbackUrl} provider="google" />
        <OAuthSignInButton callbackUrl={callbackUrl} provider="github" />
      </div>

      <div className="my-7 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Próximamente
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="space-y-3 opacity-60">
        <label className="relative block">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            disabled
            type="email"
            placeholder="Correo electrónico"
            className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none"
          />
        </label>
        <label className="relative block">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            disabled
            type="password"
            placeholder="Contraseña"
            className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none"
          />
        </label>
        <button
          type="button"
          disabled
          className="h-13 w-full rounded-2xl bg-slate-100 text-sm font-bold text-slate-500"
        >
          Continuar con correo
        </button>
      </div>
    </div>
  );
}

function LoginPanelFallback() {
  return <div className="mt-8 h-14 animate-pulse rounded-2xl bg-slate-100" />;
}
