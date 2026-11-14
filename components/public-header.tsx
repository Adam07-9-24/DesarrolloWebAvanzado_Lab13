import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { Brand } from "@/components/brand";

export function PublicHeader() {
  return (
    <header className="relative z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Brand />
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a className="transition hover:text-slate-950" href="#producto">
            Producto
          </a>
          <a className="transition hover:text-slate-950" href="#seguridad">
            Seguridad
          </a>
          <a className="transition hover:text-slate-950" href="#tecnologia">
            Tecnología
          </a>
        </nav>
        <Link
          href="/login"
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Iniciar sesión
          <FiArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </header>
  );
}
