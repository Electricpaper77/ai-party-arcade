import {
  fallbackTriviaRound,
  isTriviaRound,
  triviaRoundSchema,
  type TriviaRound,
} from "@/lib/aiSchemas";
import { generateStructuredAiResponse } from "@/lib/aiServer";

export async function POST(request: Request) {
  return generateStructuredAiResponse<TriviaRound>(request, {
    gameType: "ai_trivia_duel",
    schemaName: "ai_trivia_duel_round",
    schema: triviaRoundSchema,
    fallback: fallbackTriviaRound,
    validate: isTriviaRound,
    system:
      "Generate safe, light trivia for a browser party game. Keep facts general, avoid sensitive topics, and ensure exactly one choice matches the answer.",
    user:
      "Create one AI Trivia Duel question about AI, internet culture, games, creativity, or general knowledge. Return four choices, one exact answer from those choices, a concise explanation, and a category.",
  });
}

