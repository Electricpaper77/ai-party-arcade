import { PageHeader } from "@/components/PageHeader";
import { RoomClient } from "@/components/RoomClient";
import { SiteShell } from "@/components/SiteShell";

export default async function RoomPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Demo room"
        title="Invite link ready."
        description="This room route is shareable and uses the six-character code in the URL. Room state is stored locally for the MVP demo."
      />
      <RoomClient code={code} />
    </SiteShell>
  );
}

