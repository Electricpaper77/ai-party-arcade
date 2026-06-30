"use client";

import { useMemo, useState } from "react";
import {
  fallbackJudgeResult,
  fallbackPromptRound,
  type AiResponse,
  type JudgeResult,
  type PromptRound,
} from "@/lib/aiSchemas";
import { addLeaderboardEntry } from "@/lib/storage";
import { AiMetricsPanel, emptyAiMetrics, mergeAiMetrics, type AiMetrics } from "./AiMetricsPanel";
import { GameDemoFrame } from "./GameDemoFrame";

export function PromptBattleDemo({ compact = false }: { compact?: boolean }) {
  const [player, setPlayer] = useState("Player 1");
  const [answer, setAnswer] = useState("A game where every rule card is generated from the loudest word in the room.");
  const [round, setRound] = useState<PromptRound>(fallbackPromptRound);
  const [roundSource, setRoundSource] = useState<"AI-generated" | "demo fallback">("demo fallback");
  const [judgeResult, setJudgeResult] = useState<JudgeResult | null>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [judging, setJudging] = useState(false);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState<AiMetrics>(emptyAiMetrics);

  const fallbackScore = useMemo(() => {
    const variety = new Set(answer.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean)).size;
    return Math.min(100, 35 + variety * 4 + Math.min(answer.length, 180) / 6);
  }, [answer]);
  const score = judgeResult?.score ?? fallbackScore;

  async function generatePrompt() {
    setLoadingPrompt(true);
    setError("");

    try {
      const response = await fetch("/api/generate-prompt", { method: "POST" });
      const payload = (await response.json()) as AiResponse<PromptRound>;
      setRound(payload.data);
      setRoundSource(payload.meta.source === "ai-generated" ? "AI-generated" : "demo fallback");
      setMetrics((current) => mergeAiMetrics(current, payload.meta));
      setJudgeResult(null);
      setLastScore(null);
      if (payload.meta.error_type) {
        setError(`Using demo fallback: ${payload.meta.error_type}`);
      }
    } catch {
      setRound(fallbackPromptRound);
      setRoundSource("demo fallback");
      setMetrics((current) => ({
        ...current,
        fallbackCount: current.fallbackCount + 1,
        errorCount: current.errorCount + 1,
      }));
      setError("AI prompt generation failed. Using demo fallback.");
    } finally {
      setLoadingPrompt(false);
    }
  }

  async function submitScore() {
    setJudging(true);
    setError("");

    let result = judgeResult;

    try {
      const response = await fetch("/api/judge-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: round.prompt, response: answer }),
      });
      const payload = (await response.json()) as AiResponse<JudgeResult>;
      result = payload.data;
      setJudgeResult(result);
      setMetrics((current) => mergeAiMetrics(current, payload.meta));
      if (payload.meta.error_type) {
        setError(`Using demo fallback judge: ${payload.meta.error_type}`);
      }
    } catch {
      result = fallbackJudgeResult;
      setJudgeResult(result);
      setMetrics((current) => ({
        ...current,
        fallbackCount: current.fallbackCount + 1,
        errorCount: current.errorCount + 1,
      }));
      setError("AI judging failed. Using demo fallback judge.");
    } finally {
      setJudging(false);
    }

    const rounded = Math.round(result?.score ?? score);
    addLeaderboardEntry({
      player: player.trim() || "Player 1",
      game: "Prompt Battle",
      score: rounded,
    });
    setLastScore(rounded);
  }

  const content = (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="border border-[#ff3df2]/40 bg-[#ff3df2]/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb8fa]">Prompt Battle round</p>
          <span className="rounded border border-white/20 px-2 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
            {roundSource}
          </span>
        </div>
        <p className="mt-3 text-2xl font-black leading-tight">{round.prompt}</p>
        <p className="mt-3 text-sm font-bold text-white/72">Difficulty: {round.difficulty}</p>
        <p className="mt-2 text-sm leading-6 text-white/62">Criteria: {round.criteria.join(", ")}</p>
        <p className="mt-4 text-sm leading-6 text-white/62">
          AI judging runs on the server when configured. Demo fallback is used when AI is unavailable or safety checks fail.
        </p>
        <button
          type="button"
          onClick={generatePrompt}
          disabled={loadingPrompt}
          className="mt-4 rounded bg-[#ff3df2] px-4 py-3 text-sm font-black text-white disabled:cursor-wait disabled:opacity-70"
        >
          {loadingPrompt ? "Generating..." : "Generate AI prompt"}
        </button>
      </div>
      <div className="space-y-4">
        <AiMetricsPanel metrics={metrics} />
        {error ? <p className="border border-[#ff8a3d]/40 bg-[#ff8a3d]/10 p-3 text-sm font-bold text-[#ffd0ad]">{error}</p> : null}
        <label className="block">
          <span className="text-sm font-bold text-white/72">Player name</span>
          <input
            value={player}
            onChange={(event) => setPlayer(event.target.value)}
            className="mt-2 w-full border border-white/14 bg-black/40 px-3 py-3 font-bold text-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-white/72">Your prompt response</span>
          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            rows={compact ? 4 : 6}
            className="mt-2 w-full resize-none border border-white/14 bg-black/40 px-3 py-3 text-white"
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={submitScore}
            disabled={judging}
            className="rounded bg-[#faff00] px-5 py-3 text-sm font-black text-[#111114] shadow-[4px_4px_0_#ff3df2]"
          >
            {judging ? "Judging..." : "Judge response"}
          </button>
          <span className="text-sm font-bold text-white/72">Score: {Math.round(score)}</span>
          {lastScore !== null ? <span className="text-sm font-black text-[#3cff87]">Saved {lastScore}</span> : null}
        </div>
        {judgeResult ? (
          <div className="border border-white/14 bg-white/[0.04] p-3 text-sm leading-6 text-white/72">
            <p className="font-black text-white">{judgeResult.reason}</p>
            <p className="mt-2">Badges: {judgeResult.badges.join(", ")}</p>
          </div>
        ) : null}
      </div>
    </div>
  );

  if (compact) {
    return content;
  }

  return (
    <GameDemoFrame
      title="Prompt Battle"
      description="Generate an AI prompt, answer it, and request server-side AI judging. Fallback content is labeled when used."
    >
      {content}
    </GameDemoFrame>
  );
}
