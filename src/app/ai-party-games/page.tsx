import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoLandingPageBySlug } from "@/lib/gameData";
import { SiteShell } from "@/components/SiteShell";

const page = getSeoLandingPageBySlug("ai-party-games")!;

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: page.href },
};

export default function AiPartyGamesPage() {
  return (
    <SiteShell>
      <SeoLandingPage page={page} />
    </SiteShell>
  );
}

