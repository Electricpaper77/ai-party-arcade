import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SiteShell } from "@/components/SiteShell";

export default function MissingRoomCodePage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Missing room code"
        title="Create a room to get a 6-character code."
        description="Room links need a six-character code, like /room/ABC123. This MVP stores room state locally in your browser."
      />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Link
          href="/create-room"
          className="inline-flex rounded bg-[#faff00] px-5 py-3 text-sm font-black text-[#111114] shadow-[4px_4px_0_#ff3df2]"
        >
          Create Room
        </Link>
      </section>
    </SiteShell>
  );
}

