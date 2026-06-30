import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SiteShell } from "@/components/SiteShell";
import { StoryChainDemo } from "@/components/StoryChainDemo";

export default function AiStoryChainPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="AI Story Chain"
        title="Take turns extending the story."
        description="Add story lines in a local MVP demo and save a placeholder creativity score in this browser."
      >
        <Link href="/create-room" className="rounded bg-[#ff8a3d] px-5 py-3 text-sm font-black text-[#160903] shadow-[4px_4px_0_#a96bff]">
          Create Story Chain room
        </Link>
      </PageHeader>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <StoryChainDemo />
      </section>
    </SiteShell>
  );
}

