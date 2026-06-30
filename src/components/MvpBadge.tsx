export function MvpBadge({ label = "MVP demo" }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#faff00]/50 bg-[#faff00]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#faff00]">
      {label}
    </span>
  );
}

