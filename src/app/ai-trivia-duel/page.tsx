import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SiteShell } from "@/components/SiteShell";
import { TriviaDuelDemo } from "@/components/TriviaDuelDemo";

export default function AiTriviaDuelPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="AI Trivia Duel"
        title="Sample trivia for instant party rounds."
        description="Answer sample questions, score the round locally, and keep the demo transparent: no real-time opponents or backend are implied."
      >
        <Link href="/create-room" className="rounded bg-[#47f7ff] px-5 py-3 text-sm font-black text-[#071014] shadow-[4px_4px_0_#3cff87]">
          Create Trivia Duel room
        </Link>
      </PageHeader>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <TriviaDuelDemo />
      </section>
    </SiteShell>
  );
}

