import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoLandingPageBySlug } from "@/lib/gameData";
import { SiteShell } from "@/components/SiteShell";

const page = getSeoLandingPageBySlug("prompt-battle-game")!;

export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: page.href },
};

export default function PromptBattleGamePage() {
  return (
    <SiteShell>
      <SeoLandingPage page={page} />
    </SiteShell>
  );
}

