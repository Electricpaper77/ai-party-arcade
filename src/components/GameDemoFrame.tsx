import type { ReactNode } from "react";
import { MvpBadge } from "./MvpBadge";

export function GameDemoFrame({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-white/14 bg-[#10101a]/92 p-4 shadow-[8px_8px_0_rgba(71,247,255,0.14)] sm:p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">{description}</p>
        </div>
        <MvpBadge label="MVP demo" />
      </div>
      {children}
    </section>
  );
}

