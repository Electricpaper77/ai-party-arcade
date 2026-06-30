import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SiteShell } from "@/components/SiteShell";
import { StoryChainDemo } from "@/components/StoryChainDemo";

export const metadata: Metadata = {
  title: "AI Story Chain",
  description: "Add story lines in a local AI-style party writing MVP demo.",
  alternates: {
    canonical: "/games/story-chain",
  },
};

export default function StoryChainGamePage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="AI Story Chain"
        title="Take turns extending the story."
        description="Add story lines in a local MVP demo and save a placeholder creativity score in this browser."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/create-room" className="rounded bg-[#ff8a3d] px-5 py-3 text-sm font-black text-[#160903] shadow-[4px_4px_0_#a96bff]">
            Create Story Chain room
          </Link>
          <Link href="/leaderboard" className="rounded border border-white/24 px-5 py-3 text-sm font-black text-white hover:bg-white/10">
            View Leaderboard
          </Link>
        </div>
      </PageHeader>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <StoryChainDemo />
      </section>
    </SiteShell>
  );
}

