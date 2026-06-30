import type { ReactNode } from "react";
import { MvpBadge } from "./MvpBadge";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <MvpBadge />
          {eyebrow ? <span className="text-sm font-black uppercase tracking-[0.18em] text-[#47f7ff]">{eyebrow}</span> : null}
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-white/68">{description}</p>
      </div>
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}

