import { NextResponse } from "next/server";
import type { AiResponse } from "./aiSchemas";

type GenerateArgs<T> = {
  gameType: string;
  schemaName: string;
  schema: Record<string, unknown>;
  system: string;
  user: string;
  fallback: T;
  validate: (value: unknown) => value is T;
  unsafeText?: string;
};

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();
const blockedTerms = ["slur-placeholder", "explicit-violence-placeholder", "adult-content-placeholder"];

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export function checkRateLimit(request: Request) {
  const ip = getClientIp(request);
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);

  if (!bucket || bucket.resetAt < now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + 60_000 });
    return { allowed: true, remaining: 29 };
  }

  bucket.count += 1;
  return { allowed: bucket.count <= 30, remaining: Math.max(0, 30 - bucket.count) };
}

export function hasUnsafeInput(text: string) {
  const normalized = text.toLowerCase();
  return blockedTerms.some((term) => normalized.includes(term));
}

function extractJsonText(payload: unknown) {
  const item = payload as {
    output_text?: string;
    output?: Array<{ content?: Array<{ text?: string }> }>;
    choices?: Array<{ message?: { content?: string } }>;
  };

  return item.output_text || item.output?.flatMap((output) => output.content || []).find((content) => content.text)?.text || item.choices?.[0]?.message?.content || "";
}

function logAiEvent(event: {
  gameType: string;
  latencyMs: number;
  success: boolean;
  fallbackUsed: boolean;
  errorType?: string;
}) {
  console.info(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      game_type: event.gameType,
      latency_ms: event.latencyMs,
      status: event.success ? "success" : "failure",
      fallback_used: event.fallbackUsed,
      error_type: event.errorType,
    }),
  );
}

export function loggedFallbackResponse<T>(args: {
  gameType: string;
  startedAt: number;
  fallback: T;
  errorType: string;
  status?: number;
}) {
  const latencyMs = Date.now() - args.startedAt;
  logAiEvent({
    gameType: args.gameType,
    latencyMs,
    success: false,
    fallbackUsed: true,
    errorType: args.errorType,
  });

  return NextResponse.json(
    {
      data: args.fallback,
      meta: {
        source: "demo fallback",
        latency_ms: latencyMs,
        fallback_used: true,
        error_type: args.errorType,
      },
    } satisfies AiResponse<T>,
    { status: args.status ?? 200 },
  );
}

export async function generateStructuredAiResponse<T>(request: Request, args: GenerateArgs<T>) {
  const startedAt = Date.now();

  if (args.unsafeText && hasUnsafeInput(args.unsafeText)) {
    return loggedFallbackResponse({
      gameType: args.gameType,
      startedAt,
      fallback: args.fallback,
      errorType: "unsafe_input",
    });
  }

  const rateLimit = checkRateLimit(request);
  if (!rateLimit.allowed) {
    return loggedFallbackResponse({
      gameType: args.gameType,
      startedAt,
      fallback: args.fallback,
      errorType: "rate_limited",
      status: 429,
    });
  }

  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    return loggedFallbackResponse({
      gameType: args.gameType,
      startedAt,
      fallback: args.fallback,
      errorType: "missing_api_key",
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "gpt-4.1-mini",
        input: [
          { role: "system", content: args.system },
          { role: "user", content: args.user },
        ],
        text: {
          format: {
            type: "json_schema",
            name: args.schemaName,
            schema: args.schema,
            strict: true,
          },
        },
      }),
    });

    if (!response.ok) {
      return loggedFallbackResponse({
        gameType: args.gameType,
        startedAt,
        fallback: args.fallback,
        errorType: `provider_${response.status}`,
      });
    }

    const payload = (await response.json()) as unknown;
    const jsonText = extractJsonText(payload);
    const parsed = JSON.parse(jsonText) as unknown;

    if (!args.validate(parsed)) {
      return loggedFallbackResponse({
        gameType: args.gameType,
        startedAt,
        fallback: args.fallback,
        errorType: "invalid_json_shape",
      });
    }

    const latencyMs = Date.now() - startedAt;
    logAiEvent({
      gameType: args.gameType,
      latencyMs,
      success: true,
      fallbackUsed: false,
    });

    return NextResponse.json({
      data: parsed,
      meta: {
        source: "ai-generated",
        latency_ms: latencyMs,
        fallback_used: false,
      },
    } satisfies AiResponse<T>);
  } catch (error) {
    return loggedFallbackResponse({
      gameType: args.gameType,
      startedAt,
      fallback: args.fallback,
      errorType: error instanceof SyntaxError ? "json_parse_error" : "provider_error",
    });
  }
}
