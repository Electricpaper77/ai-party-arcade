import {
  fallbackStoryContinuation,
  isStoryContinuation,
  storyContinuationSchema,
  type StoryContinuation,
} from "@/lib/aiSchemas";
import { generateStructuredAiResponse, hasUnsafeInput, loggedFallbackResponse } from "@/lib/aiServer";

export async function POST(request: Request) {
  const startedAt = Date.now();
  let body: { lines?: string[] };

  try {
    body = (await request.json()) as { lines?: string[] };
  } catch {
    return loggedFallbackResponse({
      gameType: "ai_story_chain",
      startedAt,
      fallback: fallbackStoryContinuation,
      errorType: "invalid_request_json",
      status: 400,
    });
  }

  const lines = Array.isArray(body.lines) ? body.lines.map((line) => line.trim()).filter(Boolean).slice(-8) : [];
  const unsafeText = lines.join("\n");

  if (unsafeText.length > 1600 || hasUnsafeInput(unsafeText)) {
    return loggedFallbackResponse({
      gameType: "ai_story_chain",
      startedAt,
      fallback: fallbackStoryContinuation,
      errorType: unsafeText.length > 1600 ? "story_too_long" : "unsafe_input",
    });
  }

  return generateStructuredAiResponse<StoryContinuation>(request, {
    gameType: "ai_story_chain",
    schemaName: "ai_story_chain_continuation",
    schema: storyContinuationSchema,
    fallback: fallbackStoryContinuation,
    validate: isStoryContinuation,
    unsafeText,
    system:
      "Continue a safe, playful group story for a browser party game. Keep it general-audience, short, and imaginative.",
    user: `Story so far:\n${lines.join("\n") || "The arcade cabinet blinked awake and asked for a room code."}\nWrite the next line, a twist, and a tone.`,
  });
}
