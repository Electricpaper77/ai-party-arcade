import Image from "next/image";
import Link from "next/link";
import { GameCard } from "@/components/GameCard";
import { MvpBadge } from "@/components/MvpBadge";
import { SiteShell } from "@/components/SiteShell";
import { featuredGames, games } from "@/lib/games";

export default function Home() {
  return (
    <SiteShell>
      <section className="relative">
        <div className="mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <MvpBadge />
              <span className="text-sm font-black uppercase tracking-[0.18em] text-[#47f7ff]">No login required</span>
            </div>
            <h1 className="text-5xl font-black leading-[0.94] tracking-tight text-white sm:text-7xl lg:text-8xl">
              AI Party Arcade
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-8 text-white/78">
              Create a room, invite friends, let AI generate the game, and play instantly in the browser.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/create-room"
                className="rounded bg-[#faff00] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-[#111114] shadow-[5px_5px_0_#ff3df2] transition hover:-translate-y-0.5"
              >
                Create room
              </Link>
              <Link
                href="/games"
                className="rounded border border-white/24 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white hover:bg-white/10"
              >
                Browse games
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 text-center">
              {["6-char codes", "Local demo state", "Instant rounds"].map((item) => (
                <div key={item} className="border border-white/14 bg-white/[0.04] px-3 py-4">
                  <p className="text-sm font-black text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden border border-white/14 bg-[#11111b] shadow-[10px_10px_0_rgba(71,247,255,0.16)] sm:min-h-[520px]">
            <Image
              src="/arcade-hero.png"
              alt="Neon arcade party room with AI-generated mini-game screens"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 border border-white/16 bg-black/55 p-4 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#faff00]">Core loop</p>
              <p className="mt-2 text-lg font-black">Room / Invite / Generate / Play</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff3df2]">Playable now</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">MVP game demos</h2>
          </div>
          <Link href="/games" className="rounded border border-white/24 px-4 py-3 text-sm font-black text-white hover:bg-white/10">
            View all {games.length}
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredGames.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
