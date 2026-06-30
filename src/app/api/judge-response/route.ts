import {
  fallbackJudgeResult,
  isJudgeResult,
  judgeResultSchema,
  type JudgeResult,
} from "@/lib/aiSchemas";
import { generateStructuredAiResponse, hasUnsafeInput, loggedFallbackResponse } from "@/lib/aiServer";

export async function POST(request: Request) {
  const startedAt = Date.now();
  let body: { prompt?: string; response?: string };

  try {
    body = (await request.json()) as { prompt?: string; response?: string };
  } catch {
    return loggedFallbackResponse({
      gameType: "prompt_battle_judge",
      startedAt,
      fallback: fallbackJudgeResult,
      errorType: "invalid_request_json",
      status: 400,
    });
  }

  const prompt = (body.prompt || "").trim();
  const response = (body.response || "").trim();
  const unsafeText = `${prompt}\n${response}`;

  if (!response || response.length > 800 || hasUnsafeInput(unsafeText)) {
    return loggedFallbackResponse({
      gameType: "prompt_battle_judge",
      startedAt,
      fallback: fallbackJudgeResult,
      errorType: !response ? "missing_response" : response.length > 800 ? "response_too_long" : "unsafe_input",
    });
  }

  return generateStructuredAiResponse<JudgeResult>(request, {
    gameType: "prompt_battle_judge",
    schemaName: "prompt_battle_judge",
    schema: judgeResultSchema,
    fallback: fallbackJudgeResult,
    validate: isJudgeResult,
    unsafeText,
    system:
      "Judge a party-game prompt response. Be generous, safe, concise, and playful. Do not mention backend systems or make claims about real players.",
    user: `Prompt: ${prompt || "Party game challenge"}\nResponse: ${response}\nScore it from 0 to 100, explain why, and award short badges.`,
  });
}
