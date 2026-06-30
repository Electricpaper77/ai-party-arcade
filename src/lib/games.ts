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
  status: "MVP demo" | "Demo mode" | "Coming soon";
  aiStatus: "Live" | "Demo" | "Coming soon";
  difficulty: "Easy" | "Medium" | "Fast";
  playerMode: string;
  bestUseCase: string;
  tagline: string;
  description: string;
  accent: string;
};

export const games: Game[] = [
  {
    slug: "prompt-battle",
    title: "Prompt Battle",
    href: "/games/prompt-battle",
    status: "MVP demo",
    aiStatus: "Live",
    difficulty: "Easy",
    playerMode: "Local room demo",
    bestUseCase: "Friends, streams, warmups",
    tagline: "Write the sharpest prompt before the timer burns out.",
    description:
      "Generate a server-side AI prompt, answer it, and request AI judging. Scores are saved locally only.",
    accent: "from-[#ff3df2] to-[#fff84a]",
  },
  {
    slug: "ai-trivia-duel",
    title: "AI Trivia Duel",
    href: "/games/ai-trivia-duel",
    status: "MVP demo",
    aiStatus: "Live",
    difficulty: "Easy",
    playerMode: "Solo / local room demo",
    bestUseCase: "Classrooms, parties, quick breaks",
    tagline: "Fast answers, weird categories, instant rematches.",
    description:
      "Generate an AI trivia question in a local browser round. No live opponents are simulated.",
    accent: "from-[#47f7ff] to-[#3cff87]",
  },
  {
    slug: "ai-story-chain",
    title: "AI Story Chain",
    href: "/games/story-chain",
    status: "MVP demo",
    aiStatus: "Live",
    difficulty: "Medium",
    playerMode: "Local pass-and-play demo",
    bestUseCase: "Friends, classrooms, improv games",
    tagline: "Build a chaotic story one line at a time.",
    description:
      "Add lines to a shared local story, continue it with AI, and save a local creativity score.",
    accent: "from-[#a96bff] to-[#ff8a3d]",
  },
  {
    slug: "mystery-room",
    title: "Mystery Room",
    href: "/create-room",
    status: "Coming soon",
    aiStatus: "Coming soon",
    difficulty: "Medium",
    playerMode: "Future realtime",
    bestUseCase: "Party mystery rounds",
    tagline: "A secret ruleset revealed when the room opens.",
    description:
      "Preview card for a future instant AI game format. Not playable in this MVP.",
    accent: "from-[#faff00] to-[#ff3d71]",
  },
  {
    slug: "reaction-duel",
    title: "Reaction Duel",
    href: "/create-room",
    status: "Coming soon",
    aiStatus: "Coming soon",
    difficulty: "Fast",
    playerMode: "Future realtime",
    bestUseCase: "Streams, friends, head-to-head play",
    tagline: "Beat the flash, win the round.",
    description:
      "Preview card for a future browser reaction challenge. No live matchmaking is included.",
    accent: "from-[#39ff14] to-[#47f7ff]",
  },
];

export const featuredGames = games.slice(0, 3);
