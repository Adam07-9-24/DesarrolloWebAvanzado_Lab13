import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import {
  FiCalendar,
  FiCheckCircle,
  FiKey,
  FiMail,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AppShell } from "@/components/app-shell";
import { UserAvatar } from "@/components/user-avatar";

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileFallback />}>
      <ProfileContent />
    </Suspense>
  );
}

async function ProfileContent() {
  await connection();
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/profile");
  }

  const [account, user] = await Promise.all([
    prisma.account.findFirst({
      where: { userId: session.user.id, ...(session.provider ? { provider: session.provider } : {}) },
      select: { provider: true, type: true },
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { emailVerified: true },
    }),
  ]);

  const verifiedAt = user?.emailVerified
    ? new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(user.emailVerified)
    : "Pendiente";

  return (
    <AppShell current="profile" user={session.user}>
      <div className="mx-auto max-w-5xl">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            Configuración de cuenta
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
            Mi perfil
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Información compartida por tu proveedor de identidad.
          </p>
        </div>

        <section className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <div className="relative bg-slate-950 px-6 py-10 text-white sm:px-10">
            <div className="absolute right-0 top-0 size-64 translate-x-1/3 -translate-y-1/2 rounded-full bg-teal-300/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <UserAvatar
                name={session.user.name}
                image={session.user.image}
                size="lg"
              />
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-bold text-emerald-300">
                  <FiCheckCircle /> Cuenta activa
                </div>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">
                  {session.user.name ?? "Usuario"}
                </h2>
                <p className="mt-2 text-sm text-slate-300">{session.user.email}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
            {[
              {
                icon: FiUser,
                label: "Nombre",
                value: session.user.name ?? "Sin nombre",
              },
              {
                icon: FiMail,
                label: "Correo",
                value: session.user.email ?? "Sin correo",
              },
              {
                icon: FiKey,
                label: "Proveedor",
                value:
                  account?.provider === "google"
                    ? "Google"
                    : account?.provider === "github" ? "GitHub"
                    : (account?.provider ?? "No disponible"),
              },
              {
                icon: FiShield,
                label: "Tipo de acceso",
                value: account?.type?.toUpperCase() ?? "OAuth",
              },
              {
                icon: FiCalendar,
                label: "Correo verificado",
                value: verifiedAt,
              },
              {
                icon: FiCheckCircle,
                label: "Estado",
                value: "Sesión protegida",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-slate-100 text-slate-600">
                    <Icon />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                      {label}
                    </p>
                    <p className="mt-2 break-words text-sm font-bold text-slate-900">
                      {value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-5 flex items-start gap-4 rounded-[1.5rem] border border-teal-200 bg-teal-50 p-5 text-teal-950 sm:p-6">
          <FiShield className="mt-0.5 shrink-0 text-xl text-teal-700" />
          <div>
            <p className="text-sm font-bold">Privacidad de la cuenta</p>
            <p className="mt-1 text-sm leading-6 text-teal-900/70">
              Esta vista no expone tokens OAuth ni secretos. Solo presenta los
              datos básicos necesarios para reconocer tu cuenta.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ProfileFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f4f7f6]">
      <div className="text-center">
        <div className="mx-auto size-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-500" />
        <p className="mt-4 text-sm font-semibold text-slate-500">Cargando perfil…</p>
      </div>
    </div>
  );
}
