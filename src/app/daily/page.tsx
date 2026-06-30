import type { Metadata } from "next";
import { DailyChallengeClient } from "@/components/DailyChallengeClient";
import { PageHeader } from "@/components/PageHeader";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Daily Challenge",
  description:
    "Play one local daily AI Party Arcade challenge, save your streak, and copy a shareable score card without creating an account.",
  alternates: {
    canonical: "/daily",
  },
};

export default function DailyChallengePage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Daily challenge"
        title="Play one AI-generated round today."
        description="A no-login daily challenge for retention and sharing. Results, streaks, and metrics are stored locally in this browser."
      />
      <DailyChallengeClient />
    </SiteShell>
  );
}
