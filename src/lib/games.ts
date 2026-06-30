export type GameSlug =
  | "prompt-battle"
  | "ai-trivia-duel"
  | "ai-story-chain"
  | "mystery-room"
  | "reaction-duel";

export type Game = {
  slug: GameSlug;
  title: string;
  href: string;
  status: "Playable MVP demo" | "MVP demo preview";
  tagline: string;
  description: string;
  accent: string;
};

export const games: Game[] = [
  {
    slug: "prompt-battle",
    title: "Prompt Battle",
    href: "/prompt-battle",
    status: "Playable MVP demo",
    tagline: "Write the sharpest prompt before the timer burns out.",
    description:
      "Players respond to a shared prompt. This demo uses placeholder scoring and saves local scores only.",
    accent: "from-[#ff3df2] to-[#fff84a]",
  },
  {
    slug: "ai-trivia-duel",
    title: "AI Trivia Duel",
    href: "/ai-trivia-duel",
    status: "Playable MVP demo",
    tagline: "Fast answers, weird categories, instant rematches.",
    description:
      "Answer sample AI-themed questions in a local browser round. No backend or live opponents are simulated.",
    accent: "from-[#47f7ff] to-[#3cff87]",
  },
  {
    slug: "ai-story-chain",
    title: "AI Story Chain",
    href: "/ai-story-chain",
    status: "Playable MVP demo",
    tagline: "Build a chaotic story one line at a time.",
    description:
      "Add lines to a shared local story and save a demo creativity score to this browser.",
    accent: "from-[#a96bff] to-[#ff8a3d]",
  },
  {
    slug: "mystery-room",
    title: "Mystery Room",
    href: "/create-room",
    status: "MVP demo preview",
    tagline: "A secret ruleset revealed when the room opens.",
    description:
      "Preview card for a future instant AI game format. Create a room to reserve a local demo slot.",
    accent: "from-[#faff00] to-[#ff3d71]",
  },
  {
    slug: "reaction-duel",
    title: "Reaction Duel",
    href: "/create-room",
    status: "MVP demo preview",
    tagline: "Beat the flash, win the round.",
    description:
      "Preview card for a future browser reaction challenge. No live matchmaking is included.",
    accent: "from-[#39ff14] to-[#47f7ff]",
  },
];

export const featuredGames = games.slice(0, 3);

