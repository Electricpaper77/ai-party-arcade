import type { MetadataRoute } from "next";

const baseUrl = "https://ai-party-arcade.vercel.app";

const routes = [
  "/",
  "/daily",
  "/games",
  "/games/prompt-battle",
  "/games/ai-trivia-duel",
  "/games/story-chain",
  "/create-room",
  "/leaderboard",
  "/terms",
  "/privacy",
  "/safety",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
