import { GameCard } from "@/components/GameCard";
import { PageHeader } from "@/components/PageHeader";
import { SiteShell } from "@/components/SiteShell";
import { games } from "@/lib/games";

export default function GamesPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Game shelf"
        title="Pick an instant party format."
        description="Prompt Battle, AI Trivia Duel, and AI Story Chain are playable as local MVP demos. Mystery Room and Reaction Duel are marked as coming soon."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {games.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </section>
    </SiteShell>
  );
}
