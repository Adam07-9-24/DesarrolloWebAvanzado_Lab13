import Link from "next/link";
import {
  FiArrowRight,
  FiCheck,
  FiDatabase,
  FiLock,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { PublicHeader } from "@/components/public-header";

const stack = ["Next.js 16", "Auth.js", "Prisma 7", "Supabase"];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f9f7] text-slate-950">
      <PublicHeader />
      <main>
        <section className="relative isolate border-b border-slate-200/80">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(45,212,191,0.18),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(56,189,248,0.10),transparent_28%)]" />
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-32">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-teal-800">
                <span className="size-1.5 rounded-full bg-teal-500" />
                Acceso simple. Seguridad real.
              </div>
              <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
                Tu espacio de trabajo, seguro desde el primer acceso.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                Una experiencia de identidad clara y moderna, construida para
                entrar con Google y llegar directo a lo importante.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-slate-950 px-7 text-sm font-bold text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Comenzar ahora
                  <FiArrowRight className="transition group-hover:translate-x-1" />
                </Link>
                <a
                  href="#producto"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                >
                  Explorar la experiencia
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <FiCheck className="text-teal-600" /> OAuth con Google
                </span>
                <span className="inline-flex items-center gap-2">
                  <FiCheck className="text-teal-600" /> Sesiones JWT
                </span>
                <span className="inline-flex items-center gap-2">
                  <FiCheck className="text-teal-600" /> Verificación en servidor
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-teal-200/60 via-cyan-100/40 to-transparent blur-2xl" />
              <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur">
                <div className="rounded-[1.55rem] bg-slate-950 p-6 text-white sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
                        Vista previa
                      </p>
                      <p className="mt-2 text-xl font-bold">Panel personal</p>
                    </div>
                    <div className="grid size-11 place-items-center rounded-full bg-white/10">
                      <FiShield className="text-xl text-teal-300" />
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-slate-400">Estado</p>
                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                        <span className="size-2 rounded-full bg-emerald-400" />
                        Protegido
                      </div>
                    </div>
                    <div className="rounded-2xl bg-teal-300 p-4 text-slate-950">
                      <p className="text-xs font-medium text-teal-950/70">Proveedor</p>
                      <p className="mt-4 text-sm font-black">Google OAuth</p>
                    </div>
                  </div>
                  <div className="mt-3 rounded-2xl bg-white p-5 text-slate-950">
                    <div className="flex items-center gap-4">
                      <div className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-teal-200 to-cyan-100 font-black">
                        NX
                      </div>
                      <div>
                        <p className="text-sm font-bold">Tu identidad, conectada</p>
                        <p className="mt-1 text-xs text-slate-500">
                          Perfil sincronizado de forma segura
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-4/5 rounded-full bg-teal-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                    <FiLock />
                  </span>
                  <div>
                    <p className="text-xs text-slate-400">Sesión</p>
                    <p className="text-sm font-bold text-slate-900">Verificada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tecnologia" className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:justify-between lg:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Arquitectura del laboratorio
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {stack.map((item) => (
                <span key={item} className="text-sm font-bold text-slate-600">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="producto" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                Una experiencia enfocada
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] sm:text-5xl">
                Menos fricción. Más claridad.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">
              Desde el acceso hasta la gestión del perfil, cada pantalla deja
              claro qué ocurre con tu sesión y qué información se utiliza.
            </p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: FiZap,
                title: "Acceso directo",
                text: "Google OAuth conecta tu identidad sin formularios innecesarios.",
              },
              {
                icon: FiShield,
                title: "Protección en capas",
                text: "Proxy y componentes de servidor verifican cada ruta privada.",
              },
              {
                icon: FiDatabase,
                title: "Datos consistentes",
                text: "Prisma conecta la aplicación con PostgreSQL de forma tipada.",
              },
            ].map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-xl text-teal-300">
                    <Icon />
                  </span>
                  <span className="text-xs font-bold text-slate-300">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-xl font-bold tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="seguridad" className="bg-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-28">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
                Seguridad por diseño
              </p>
              <h2 className="mt-4 max-w-lg text-4xl font-black tracking-[-0.045em] sm:text-5xl">
                La sesión se valida donde realmente importa.
              </h2>
            </div>
            <div className="space-y-6">
              {[
                "Google valida la identidad del usuario.",
                "Auth.js firma y verifica la sesión JWT.",
                "Next.js comprueba el acceso nuevamente en el servidor.",
              ].map((text, index) => (
                <div key={text} className="flex gap-5 border-b border-white/10 pb-6">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-teal-300/40 text-xs font-bold text-teal-300">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-base leading-7 text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>Laboratorio 13 · Desarrollo de Aplicaciones Web Avanzado</p>
          <p>Next.js + Auth.js + Prisma + Supabase</p>
        </div>
      </footer>
    </div>
  );
}
