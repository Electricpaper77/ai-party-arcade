export type GameCategory =
  | "AI Party"
  | "AI Trivia"
  | "AI Story"
  | "Prompt Battle"
  | "Puzzle"
  | "Reaction"
  | "Mystery"
  | "Classroom Safe"
  | "Streamer Friendly"
  | "Daily Challenge";

export type GameDataChunk = {
  slug: string;
  title: string;
  shortTitle: string;
  category: GameCategory;
  status: "live" | "demo" | "coming-soon";
  aiMode: "ai-generated" | "ai-assisted" | "non-ai" | "coming-soon";
  playerMode: "solo" | "local-room-demo" | "pass-and-play" | "future-realtime";
  sessionLength: "30-sec" | "1-min" | "3-min" | "5-min";
  href: string;
  replayHook: string;
  shareHook: string;
  retentionHook: string;
  safetyBoundary: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  competitorInspiredBy: string[];
  targetAudience: string[];
  kpis: string[];
};

export type SeoLandingPage = {
  slug: string;
  href: string;
  title: string;
  h1: string;
  description: string;
  audience: string;
  primaryCta: string;
  primaryHref: string;
  relatedGameSlugs: string[];
  safetyNote: string;
  keywords: string[];
};

export const gameDataChunks: GameDataChunk[] = [
  {
    slug: "prompt-battle",
    title: "Prompt Battle",
    shortTitle: "Prompt Battle",
    category: "Prompt Battle",
    status: "live",
    aiMode: "ai-generated",
    playerMode: "local-room-demo",
    sessionLength: "1-min",
    href: "/games/prompt-battle",
    replayHook: "Try a sharper answer and beat your previous score.",
    shareHook: "Share your AI-judged score card.",
    retentionHook: "Daily prompt challenge and weekly prompt themes.",
    safetyBoundary: "AI judging is fallback-safe and does not store global user data.",
    seoTitle: "Prompt Battle | Free AI Prompt Game",
    seoDescription: "Play Prompt Battle, a free AI-generated prompt challenge with local scoring and fallback-safe judging.",
    keywords: ["prompt battle", "AI prompt game", "AI party game", "prompt challenge", "free AI browser game"],
    competitorInspiredBy: ["party prompt games", "creative voting rounds", "browser party games"],
    targetAudience: ["friends", "streamers", "AI experimenters", "party game fans"],
    kpis: ["prompt_generated", "daily_challenge_completed", "share_score_clicked"],
  },
  {
    slug: "ai-trivia-duel",
    title: "AI Trivia Duel",
    shortTitle: "Trivia Duel",
    category: "AI Trivia",
    status: "live",
    aiMode: "ai-generated",
    playerMode: "solo",
    sessionLength: "30-sec",
    href: "/games/ai-trivia-duel",
    replayHook: "Generate a new category and retry instantly.",
    shareHook: "Share score and answer result.",
    retentionHook: "Daily trivia challenge and streak tracking.",
    safetyBoundary: "No account required; results stay in local browser state.",
    seoTitle: "AI Trivia Duel | Free Browser Trivia Game",
    seoDescription: "Generate fast AI trivia rounds in your browser with local-only scoring and no login.",
    keywords: ["AI trivia", "trivia duel", "AI quiz game", "free trivia game", "browser trivia"],
    competitorInspiredBy: ["quiz games", "trivia party formats", "daily quiz loops"],
    targetAudience: ["students", "friends", "classrooms", "party hosts"],
    kpis: ["trivia_generated", "daily_challenge_completed", "share_score_clicked"],
  },
  {
    slug: "ai-story-chain",
    title: "AI Story Chain",
    shortTitle: "Story Chain",
    category: "AI Story",
    status: "live",
    aiMode: "ai-generated",
    playerMode: "pass-and-play",
    sessionLength: "3-min",
    href: "/games/story-chain",
    replayHook: "Continue the story with a new twist.",
    shareHook: "Share the final story score.",
    retentionHook: "Daily story theme and weekly genre packs.",
    safetyBoundary: "Story content uses server-side fallback and local-only state.",
    seoTitle: "AI Story Chain | Creative Browser Story Game",
    seoDescription: "Build a collaborative local story with AI-generated continuations and clearly labeled fallback content.",
    keywords: ["AI story game", "story chain", "AI writing game", "AI party story", "creative browser game"],
    competitorInspiredBy: ["collaborative writing games", "improv story prompts", "party storytelling"],
    targetAudience: ["writers", "friends", "classrooms", "creative teams"],
    kpis: ["story_continued", "share_score_clicked", "leaderboard_view"],
  },
  {
    slug: "daily-challenge",
    title: "Daily Challenge",
    shortTitle: "Daily",
    category: "Daily Challenge",
    status: "live",
    aiMode: "ai-generated",
    playerMode: "solo",
    sessionLength: "1-min",
    href: "/daily",
    replayHook: "Return tomorrow to continue the streak.",
    shareHook: "Copy a daily score card.",
    retentionHook: "Local streak tracking and daily game rotation.",
    safetyBoundary: "Results and streaks are stored locally in the browser.",
    seoTitle: "Daily AI Challenge | AI Party Arcade",
    seoDescription: "Play one daily AI challenge, keep a local streak, and copy a shareable score card.",
    keywords: ["daily AI challenge", "AI daily game", "daily trivia challenge", "daily prompt game"],
    competitorInspiredBy: ["daily word games", "daily trivia loops", "score sharing cards"],
    targetAudience: ["daily game players", "AI experimenters", "friends", "reviewers"],
    kpis: ["daily_challenge_view", "daily_challenge_completed", "streak_updated"],
  },
  {
    slug: "mystery-room",
    title: "Mystery Room",
    shortTitle: "Mystery Room",
    category: "Mystery",
    status: "coming-soon",
    aiMode: "coming-soon",
    playerMode: "future-realtime",
    sessionLength: "5-min",
    href: "/create-room",
    replayHook: "New mystery rules each room.",
    shareHook: "Future shared room link.",
    retentionHook: "Rotating mystery packs.",
    safetyBoundary: "Not live yet; no realtime multiplayer claim.",
    seoTitle: "Mystery Room | Coming Soon AI Party Format",
    seoDescription: "Preview a future AI mystery room party format. Not live yet, with no realtime multiplayer claim.",
    keywords: ["AI mystery game", "browser mystery room", "party mystery game"],
    competitorInspiredBy: ["escape room formats", "hidden-role party games", "mystery prompt packs"],
    targetAudience: ["party game fans", "friends", "future room hosts"],
    kpis: ["create_room_click", "related_game_click"],
  },
  {
    slug: "reaction-duel",
    title: "Reaction Duel",
    shortTitle: "Reaction Duel",
    category: "Reaction",
    status: "coming-soon",
    aiMode: "coming-soon",
    playerMode: "future-realtime",
    sessionLength: "30-sec",
    href: "/create-room",
    replayHook: "Beat the flash and retry instantly.",
    shareHook: "Future reaction score share.",
    retentionHook: "Fast rematch loop.",
    safetyBoundary: "Not live yet; no live matchmaking claim.",
    seoTitle: "Reaction Duel | Coming Soon Browser Party Game",
    seoDescription: "Preview a future browser reaction duel format. No live matchmaking is included in the MVP.",
    keywords: ["reaction duel", "browser reaction game", "party reaction game"],
    competitorInspiredBy: ["reaction tests", "quick reflex games", "stream challenge formats"],
    targetAudience: ["streamers", "friends", "party game fans"],
    kpis: ["related_game_click", "create_room_click"],
  },
  {
    slug: "classroom-ai-games",
    title: "Classroom AI Games",
    shortTitle: "Classroom AI",
    category: "Classroom Safe",
    status: "demo",
    aiMode: "ai-assisted",
    playerMode: "solo",
    sessionLength: "3-min",
    href: "/classroom-ai-games",
    replayHook: "Try safe prompts and trivia for learning.",
    shareHook: "Share classroom-safe challenge results.",
    retentionHook: "Daily safe learning prompt.",
    safetyBoundary: "No login, no public student database, local browser state only.",
    seoTitle: "Classroom AI Games | Safe Browser AI Game Ideas",
    seoDescription: "Explore classroom-safe AI game formats using no-login, local browser state and fallback-safe generation.",
    keywords: ["classroom AI games", "school safe AI games", "AI trivia classroom", "AI learning games"],
    competitorInspiredBy: ["classroom quiz games", "learning prompt cards", "safe daily challenges"],
    targetAudience: ["teachers", "students", "clubs", "workshops"],
    kpis: ["seo_page_view", "related_game_click", "daily_challenge_started"],
  },
  {
    slug: "streamer-party-mode",
    title: "Streamer Party Mode",
    shortTitle: "Streamer Mode",
    category: "Streamer Friendly",
    status: "demo",
    aiMode: "ai-assisted",
    playerMode: "local-room-demo",
    sessionLength: "3-min",
    href: "/ai-party-games",
    replayHook: "Generate quick rounds for viewers.",
    shareHook: "Share challenge results after stream rounds.",
    retentionHook: "Daily challenge and future room packs.",
    safetyBoundary: "No public chat ingestion or live viewer database in MVP.",
    seoTitle: "Streamer Party Mode | AI Party Arcade",
    seoDescription: "Explore streamer-friendly AI party game ideas with local room demo behavior and no public viewer database.",
    keywords: ["streamer party games", "AI stream games", "browser party game", "AI party challenge"],
    competitorInspiredBy: ["stream party prompts", "viewer challenge games", "browser room formats"],
    targetAudience: ["streamers", "mods", "viewer communities", "party hosts"],
    kpis: ["seo_page_view", "create_room_click", "daily_challenge_started"],
  },
];

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "free-ai-games",
    href: "/free-ai-games",
    title: "Free AI Games | AI Party Arcade",
    h1: "Free AI games you can play in your browser.",
    description: "Explore no-login AI-generated party games, trivia, story rounds, and daily challenges built around local browser state.",
    audience: "For friends, students, streamers, and AI experimenters who want quick browser games without accounts.",
    primaryCta: "Play Daily Challenge",
    primaryHref: "/daily",
    relatedGameSlugs: ["daily-challenge", "prompt-battle", "ai-trivia-duel", "ai-story-chain"],
    safetyNote: "Gameplay is local/demo-only. AI output uses server-side routes with labeled fallback content when generation is unavailable.",
    keywords: ["free AI games", "AI browser games", "AI party games", "free AI trivia", "daily AI challenge"],
  },
  {
    slug: "ai-party-games",
    href: "/ai-party-games",
    title: "AI Party Games | Browser Party Games",
    h1: "AI party games for fast browser rounds.",
    description: "Create a local demo room, generate an AI challenge, and compare local scores without login or payments.",
    audience: "For casual groups, remote friends, stream hosts, and party game fans testing AI-generated rounds.",
    primaryCta: "Create Room",
    primaryHref: "/create-room",
    relatedGameSlugs: ["prompt-battle", "ai-trivia-duel", "ai-story-chain", "streamer-party-mode"],
    safetyNote: "Room sharing is route-based and local-demo only until realtime multiplayer is added.",
    keywords: ["AI party games", "browser party game", "AI multiplayer party game", "prompt party game"],
  },
  {
    slug: "ai-trivia-game",
    href: "/ai-trivia-game",
    title: "AI Trivia Game | Free Browser Trivia",
    h1: "Generate a quick AI trivia round.",
    description: "Play fast AI trivia with structured choices, local scoring, and fallback-safe generation.",
    audience: "For trivia players, classrooms, meeting warmups, and friends who want a quick quiz.",
    primaryCta: "Play AI Trivia Duel",
    primaryHref: "/games/ai-trivia-duel",
    relatedGameSlugs: ["ai-trivia-duel", "daily-challenge", "classroom-ai-games"],
    safetyNote: "Trivia can be wrong or playful. Do not rely on generated questions for high-stakes decisions.",
    keywords: ["AI trivia game", "AI quiz game", "free trivia game", "browser trivia"],
  },
  {
    slug: "prompt-battle-game",
    href: "/prompt-battle-game",
    title: "Prompt Battle Game | AI Prompt Challenge",
    h1: "Battle with the best AI prompt answer.",
    description: "Generate a party prompt, answer it, and request AI judging through server-side routes.",
    audience: "For AI prompt fans, streamers, creative teams, and party groups.",
    primaryCta: "Play Prompt Battle",
    primaryHref: "/games/prompt-battle",
    relatedGameSlugs: ["prompt-battle", "daily-challenge", "streamer-party-mode"],
    safetyNote: "AI judging is playful, fallback-safe, and stored only in local browser state.",
    keywords: ["prompt battle game", "AI prompt challenge", "AI prompt game", "prompt party game"],
  },
  {
    slug: "ai-story-game",
    href: "/ai-story-game",
    title: "AI Story Game | Story Chain Browser Game",
    h1: "Build a story one AI-assisted twist at a time.",
    description: "Use AI Story Chain to add local story lines, continue the scene, and save a local creativity score.",
    audience: "For writers, classrooms, friends, and anyone who likes collaborative story games.",
    primaryCta: "Play AI Story Chain",
    primaryHref: "/games/story-chain",
    relatedGameSlugs: ["ai-story-chain", "daily-challenge", "classroom-ai-games"],
    safetyNote: "Story lines are local-only in the MVP. Do not enter sensitive personal data.",
    keywords: ["AI story game", "story chain game", "AI writing game", "creative browser game"],
  },
  {
    slug: "classroom-ai-games",
    href: "/classroom-ai-games",
    title: "Classroom AI Games | School-Safe Browser Ideas",
    h1: "Classroom-safe AI game formats for quick learning rounds.",
    description: "Explore AI trivia, prompt, and story formats designed around no-login local browser state.",
    audience: "For teachers, clubs, workshops, and students looking for lightweight AI learning activities.",
    primaryCta: "Try Daily Challenge",
    primaryHref: "/daily",
    relatedGameSlugs: ["classroom-ai-games", "ai-trivia-duel", "ai-story-chain", "daily-challenge"],
    safetyNote: "No public student database is included. LocalStorage is not a secure vault, so avoid sensitive student data.",
    keywords: ["classroom AI games", "school safe AI games", "AI learning games", "AI trivia classroom"],
  },
  {
    slug: "browser-ai-games",
    href: "/browser-ai-games",
    title: "Browser AI Games | No-Login AI Game MVP",
    h1: "Browser AI games with no login required.",
    description: "Play AI-generated rounds directly in the browser with local scores, local streaks, and shareable score cards.",
    audience: "For players who want quick web games without downloads, accounts, payments, or ads.",
    primaryCta: "Browse Games",
    primaryHref: "/games",
    relatedGameSlugs: ["prompt-battle", "ai-trivia-duel", "ai-story-chain", "daily-challenge"],
    safetyNote: "AI generation runs server-side and falls back to labeled demo content when unavailable.",
    keywords: ["browser AI games", "no login AI games", "AI web games", "free browser AI game"],
  },
  {
    slug: "daily-ai-challenge",
    href: "/daily-ai-challenge",
    title: "Daily AI Challenge | AI Party Arcade",
    h1: "Play one daily AI challenge and keep your local streak.",
    description: "Complete a daily Prompt Battle or Trivia Duel, save a local streak, and copy a shareable score card.",
    audience: "For daily game players, AI fans, and reviewers testing the retention loop.",
    primaryCta: "Play Daily Challenge",
    primaryHref: "/daily",
    relatedGameSlugs: ["daily-challenge", "prompt-battle", "ai-trivia-duel"],
    safetyNote: "Daily results and streaks are stored locally in this browser, not in a global leaderboard.",
    keywords: ["daily AI challenge", "daily AI game", "daily prompt game", "daily trivia challenge"],
  },
];

export function getGameDataBySlug(slug: string) {
  return gameDataChunks.find((game) => game.slug === slug);
}

export function getLiveGames() {
  return gameDataChunks.filter((game) => game.status === "live");
}

export function getComingSoonGames() {
  return gameDataChunks.filter((game) => game.status === "coming-soon");
}

export function getGamesByCategory(category: GameCategory) {
  return gameDataChunks.filter((game) => game.category === category);
}

export function getSeoGamesForPage(pageSlug: string) {
  const page = seoLandingPages.find((item) => item.slug === pageSlug);
  return page ? page.relatedGameSlugs.map(getGameDataBySlug).filter((game): game is GameDataChunk => Boolean(game)) : [];
}

export function getSeoLandingPageBySlug(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
