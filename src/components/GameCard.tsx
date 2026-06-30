import Link from "next/link";
import type { Game } from "@/lib/games";
import { MvpBadge } from "./MvpBadge";

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="group flex h-full flex-col justify-between border border-white/14 bg-[#11111b]/86 p-5 shadow-[8px_8px_0_rgba(255,255,255,0.08)] transition hover:-translate-y-1 hover:border-white/28">
      <div>
        <div className={`mb-5 h-2 w-24 bg-gradient-to-r ${game.accent}`} />
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <h3 className="text-2xl font-black tracking-tight">{game.title}</h3>
          <MvpBadge label={game.status} />
        </div>
        <p className="text-base font-bold text-white">{game.tagline}</p>
        <p className="mt-3 text-sm leading-6 text-white/62">{game.description}</p>
      </div>
      <Link
        href={game.href}
        className="mt-7 inline-flex w-fit items-center rounded bg-white px-4 py-2 text-sm font-black text-[#111114] transition group-hover:bg-[#faff00]"
      >
        Open game
      </Link>
    </article>
  );
}

