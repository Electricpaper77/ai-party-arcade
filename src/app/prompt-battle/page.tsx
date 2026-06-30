import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PromptBattleDemo } from "@/components/PromptBattleDemo";
import { SiteShell } from "@/components/SiteShell";

export default function PromptBattlePage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Prompt Battle"
        title="Win the room with the best prompt."
        description="A single-browser MVP demo with server-side AI prompt generation and judging. Save a local score, then compare it on the leaderboard."
      >
        <Link href="/create-room" className="rounded bg-[#faff00] px-5 py-3 text-sm font-black text-[#111114] shadow-[4px_4px_0_#ff3df2]">
          Create Prompt Battle room
        </Link>
      </PageHeader>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <PromptBattleDemo />
      </section>
    </SiteShell>
  );
}
