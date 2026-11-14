"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiLoader, FiLogOut } from "react-icons/fi";

export function OAuthSignInButton({ callbackUrl, provider }: { callbackUrl: string; provider: "google" | "github" }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const name = provider === "google" ? "Google" : "GitHub";

  async function handleSignIn() {
    setPending(true);
    setError(false);
    try {
      await signIn(provider, { redirectTo: callbackUrl });
    } catch {
      setError(true);
      setPending(false);
    }
  }

  return (
    <div>
    <button
      type="button"
      onClick={handleSignIn}
      disabled={pending}
      className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? (
        <FiLoader className="animate-spin text-lg text-slate-500" />
      ) : (
        provider === "google" ? <FcGoogle className="text-xl" /> : <FaGithub className="text-xl" />
      )}
      {pending ? `Conectando con ${name}…` : `Continuar con ${name}`}
    </button>
    {error && <p role="alert" className="mt-2 text-sm text-rose-700">No se pudo iniciar sesión. Inténtalo de nuevo.</p>}
    </div>
  );
}

export function SignOutSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? (
        <FiLoader className="animate-spin" />
      ) : (
        <FiLogOut />
      )}
      {pending ? "Cerrando sesión…" : "Cerrar sesión"}
    </button>
  );
}
