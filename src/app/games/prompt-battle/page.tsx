import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PromptBattleDemo } from "@/components/PromptBattleDemo";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Prompt Battle",
  description: "Play a local MVP demo of Prompt Battle, an AI-style party prompt game for quick browser rounds.",
  alternates: {
    canonical: "/games/prompt-battle",
  },
};

export default function PromptBattleGamePage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Prompt Battle"
        title="Win the room with the best prompt."
        description="A single-browser MVP demo with a sample prompt and placeholder scoring. Save a local score, then compare it on the leaderboard."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/create-room" className="rounded bg-[#faff00] px-5 py-3 text-sm font-black text-[#111114] shadow-[4px_4px_0_#ff3df2]">
            Create Prompt Battle room
          </Link>
          <Link href="/leaderboard" className="rounded border border-white/24 px-5 py-3 text-sm font-black text-white hover:bg-white/10">
            View Leaderboard
          </Link>
        </div>
      </PageHeader>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <PromptBattleDemo />
      </section>
    </SiteShell>
  );
}

