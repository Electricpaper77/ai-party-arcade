export type PromptRound = {
  prompt: string;
  difficulty: "easy" | "medium" | "hard";
  criteria: string[];
};

export type TriviaRound = {
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
  category: string;
};

export type JudgeResult = {
  score: number;
  reason: string;
  badges: string[];
};

export type StoryContinuation = {
  next_line: string;
  twist: string;
  tone: "funny" | "mystery" | "fantasy" | "sci-fi";
};

export type AiResponse<T> = {
  data: T;
  meta: {
    source: "ai-generated" | "demo fallback";
    latency_ms: number;
    fallback_used: boolean;
    error_type?: string;
  };
};

export const fallbackPromptRound: PromptRound = {
  prompt: "Invent a party game where the room code becomes part of the rules.",
  difficulty: "easy",
  criteria: ["creativity", "clarity", "humor"],
};

export const fallbackTriviaRound: TriviaRound = {
  question: "Which feature keeps AI Party Arcade safe to review before multiplayer is added?",
  choices: ["Local browser state", "A paid account", "A hidden ranking server", "A public user database"],
  answer: "Local browser state",
  explanation: "The MVP stores room and leaderboard data locally, so no synchronized multiplayer backend is implied.",
  category: "MVP safety",
};

export const fallbackJudgeResult: JudgeResult = {
  score: 72,
  reason: "Demo fallback score based on a playful, clear answer. AI judging was not available for this request.",
  badges: ["clear idea", "party-ready"],
};

export const fallbackStoryContinuation: StoryContinuation = {
  next_line: "Then the arcade lights blinked twice, and the next challenge appeared on every screen.",
  twist: "The room code started acting like a magic password.",
  tone: "funny",
};

export const promptRoundSchema = {
  type: "object",
  additionalProperties: false,
  required: ["prompt", "difficulty", "criteria"],
  properties: {
    prompt: { type: "string" },
    difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
    criteria: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: { type: "string" },
    },
  },
};

export const triviaRoundSchema = {
  type: "object",
  additionalProperties: false,
  required: ["question", "choices", "answer", "explanation", "category"],
  properties: {
    question: { type: "string" },
    choices: {
      type: "array",
      minItems: 4,
      maxItems: 4,
      items: { type: "string" },
    },
    answer: { type: "string" },
    explanation: { type: "string" },
    category: { type: "string" },
  },
};

export const judgeResultSchema = {
  type: "object",
  additionalProperties: false,
  required: ["score", "reason", "badges"],
  properties: {
    score: { type: "number", minimum: 0, maximum: 100 },
    reason: { type: "string" },
    badges: {
      type: "array",
      minItems: 1,
      maxItems: 4,
      items: { type: "string" },
    },
  },
};

export const storyContinuationSchema = {
  type: "object",
  additionalProperties: false,
  required: ["next_line", "twist", "tone"],
  properties: {
    next_line: { type: "string" },
    twist: { type: "string" },
    tone: { type: "string", enum: ["funny", "mystery", "fantasy", "sci-fi"] },
  },
};

function isStringArray(value: unknown, length?: number) {
  return Array.isArray(value) && (length === undefined || value.length === length) && value.every((item) => typeof item === "string");
}

export function isPromptRound(value: unknown): value is PromptRound {
  const item = value as PromptRound;
  return (
    typeof item?.prompt === "string" &&
    ["easy", "medium", "hard"].includes(item.difficulty) &&
    isStringArray(item.criteria, 3)
  );
}

export function isTriviaRound(value: unknown): value is TriviaRound {
  const item = value as TriviaRound;
  return (
    typeof item?.question === "string" &&
    isStringArray(item.choices, 4) &&
    typeof item.answer === "string" &&
    item.choices.includes(item.answer) &&
    typeof item.explanation === "string" &&
    typeof item.category === "string"
  );
}

export function isJudgeResult(value: unknown): value is JudgeResult {
  const item = value as JudgeResult;
  return (
    typeof item?.score === "number" &&
    item.score >= 0 &&
    item.score <= 100 &&
    typeof item.reason === "string" &&
    isStringArray(item.badges) &&
    item.badges.length > 0 &&
    item.badges.length <= 4
  );
}

export function isStoryContinuation(value: unknown): value is StoryContinuation {
  const item = value as StoryContinuation;
  return (
    typeof item?.next_line === "string" &&
    typeof item.twist === "string" &&
    ["funny", "mystery", "fantasy", "sci-fi"].includes(item.tone)
  );
}

