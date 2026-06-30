import {
  fallbackPromptRound,
  isPromptRound,
  promptRoundSchema,
  type PromptRound,
} from "@/lib/aiSchemas";
import { generateStructuredAiResponse } from "@/lib/aiServer";

export async function POST(request: Request) {
  return generateStructuredAiResponse<PromptRound>(request, {
    gameType: "prompt_battle",
    schemaName: "prompt_battle_round",
    schema: promptRoundSchema,
    fallback: fallbackPromptRound,
    validate: isPromptRound,
    system:
      "Generate safe, playful party-game prompts for a browser party game. Avoid adult content, hateful content, private data requests, gambling, and claims about real multiplayer.",
    user:
      "Create one Prompt Battle round. The prompt should be short, funny, and answerable by friends in under one minute. Return only the requested JSON shape.",
  });
}

