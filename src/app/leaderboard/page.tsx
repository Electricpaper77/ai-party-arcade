import { LeaderboardClient } from "@/components/LeaderboardClient";
import { PageHeader } from "@/components/PageHeader";
import { SiteShell } from "@/components/SiteShell";

export default function LeaderboardPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Leaderboard"
        title="Local scores, arcade bragging rights."
        description="Scores saved by the playable demos appear here from browser localStorage. This is not a global or production leaderboard."
      />
      <LeaderboardClient />
    </SiteShell>
  );
}

