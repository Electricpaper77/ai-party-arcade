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
        description="Three games are playable as MVP demos. Mystery Room and Reaction Duel are visible as preview cards without pretending to be live production modes."
      />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {games.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </section>
    </SiteShell>
  );
}

