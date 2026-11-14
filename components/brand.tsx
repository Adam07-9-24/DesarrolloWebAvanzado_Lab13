import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/15">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(94,234,212,0.9),transparent_38%)]" />
        <span className="relative text-sm font-black tracking-[-0.1em]">NX</span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-bold tracking-[-0.03em] text-slate-950">
            Nexa
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Workspace
          </span>
        </span>
      )}
    </Link>
  );
}
