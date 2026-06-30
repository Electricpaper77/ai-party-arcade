import { CreateRoomClient } from "@/components/CreateRoomClient";
import { PageHeader } from "@/components/PageHeader";
import { SiteShell } from "@/components/SiteShell";

export default function CreateRoomPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Create room"
        title="Generate a code, invite friends, start the demo."
        description="Create a random six-character room code and store the demo room locally in this browser. No login is required."
      />
      <CreateRoomClient />
    </SiteShell>
  );
}

