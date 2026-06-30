import Image from "next/image";
import Link from "next/link";
import { GameCard } from "@/components/GameCard";
import { MvpBadge } from "@/components/MvpBadge";
import { SiteShell } from "@/components/SiteShell";
import { featuredGames, games } from "@/lib/games";

const howItWorks = ["Create a room", "Share the link", "Play an AI-generated challenge", "Compare scores"];
const builtFor = ["Friends", "Students", "Streamers", "Party game fans", "AI experimenters"];
const demoPath = [
  "Create a room",
  "Copy invite link",
  "Play Prompt Battle",
  "Try AI Trivia Duel",
  "Check Leaderboard",
];

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
              Free browser party games with AI-generated prompts, trivia, and story challenges. Create a room, share a link, and start a local demo round instantly.
            </p>
            <p className="mt-4 max-w-2xl border-l-4 border-[#faff00] bg-[#faff00]/10 p-4 text-sm font-bold leading-6 text-[#fffca8]">
              MVP demo - local-only gameplay until realtime multiplayer is added.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/create-room"
                className="rounded bg-[#faff00] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-[#111114] shadow-[5px_5px_0_#ff3df2] transition hover:-translate-y-0.5"
              >
                Create Room
              </Link>
              <Link
                href="/games"
                className="rounded border border-white/24 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white hover:bg-white/10"
              >
                Play Games
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
        <div className="mb-16 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#47f7ff]">How it works</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Four clicks to a party round.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {howItWorks.map((step, index) => (
              <div key={step} className="border border-white/14 bg-[#11111b]/86 p-5">
                <p className="font-mono text-3xl font-black text-[#faff00]">{index + 1}</p>
                <h3 className="mt-3 text-xl font-black">{step}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-16 border border-white/14 bg-[#10101a]/90 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff3df2]">Built for</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">People who want quick, weird, browser-native games.</h2>
            </div>
            <div className="flex max-w-2xl flex-wrap gap-3">
              {builtFor.map((audience) => (
                <span key={audience} className="rounded border border-white/16 bg-white/[0.04] px-4 py-3 text-sm font-black text-white">
                  {audience}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-16 border border-[#47f7ff]/30 bg-[#47f7ff]/10 p-5 sm:p-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#9afcff]">60-Second Demo Path</p>
          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {demoPath.map((step, index) => (
              <Link
                key={step}
                href={index === 0 || index === 1 ? "/create-room" : index === 2 ? "/games/prompt-battle" : index === 3 ? "/games/ai-trivia-duel" : "/leaderboard"}
                className="border border-white/14 bg-black/24 p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <span className="font-mono text-sm font-black text-[#faff00]">Step {index + 1}</span>
                <span className="mt-2 block text-lg font-black">{step}</span>
              </Link>
            ))}
          </div>
        </div>
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
