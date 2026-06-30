"use client";

import { useState } from "react";
import { fallbackTriviaRound, type AiResponse, type TriviaRound } from "@/lib/aiSchemas";
import { addLeaderboardEntry } from "@/lib/storage";
import { AiMetricsPanel, emptyAiMetrics, mergeAiMetrics, type AiMetrics } from "./AiMetricsPanel";
import { GameDemoFrame } from "./GameDemoFrame";

export function TriviaDuelDemo({ compact = false }: { compact?: boolean }) {
  const [player, setPlayer] = useState("Trivia Ace");
  const [round, setRound] = useState<TriviaRound>(fallbackTriviaRound);
  const [roundSource, setRoundSource] = useState<"AI-generated" | "demo fallback">("demo fallback");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [saved, setSaved] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState<AiMetrics>(emptyAiMetrics);

  const score = answered && selectedChoice === round.answer ? 100 : 0;

  async function generateTrivia() {
    setLoading(true);
    setError("");
    setAnswered(false);
    setSelectedChoice("");
    setSaved(false);

    try {
      const response = await fetch("/api/generate-trivia", { method: "POST" });
      const payload = (await response.json()) as AiResponse<TriviaRound>;
      setRound(payload.data);
      setRoundSource(payload.meta.source === "ai-generated" ? "AI-generated" : "demo fallback");
      setMetrics((current) => mergeAiMetrics(current, payload.meta));
      if (payload.meta.error_type) {
        setError(`Using demo fallback: ${payload.meta.error_type}`);
      }
    } catch {
      setRound(fallbackTriviaRound);
      setRoundSource("demo fallback");
      setMetrics((current) => ({
        ...current,
        fallbackCount: current.fallbackCount + 1,
        errorCount: current.errorCount + 1,
      }));
      setError("AI trivia generation failed. Using demo fallback.");
    } finally {
      setLoading(false);
    }
  }

  function chooseAnswer(choice: string) {
    setSelectedChoice(choice);
    setAnswered(true);
    setSaved(false);
  }

  function saveScore() {
    addLeaderboardEntry({
      player: player.trim() || "Trivia Ace",
      game: "AI Trivia Duel",
      score,
    });
    setSaved(true);
  }

  const content = (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="block">
          <span className="text-sm font-bold text-white/72">Player name</span>
          <input
            value={player}
            onChange={(event) => setPlayer(event.target.value)}
            className="mt-2 w-full border border-white/14 bg-black/40 px-3 py-3 font-bold text-white"
          />
        </label>
        <div className="border border-[#47f7ff]/40 bg-[#47f7ff]/10 px-4 py-3">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9afcff]">Score</p>
          <p className="text-3xl font-black">{score}</p>
        </div>
      </div>
      <AiMetricsPanel metrics={metrics} />
      {error ? <p className="border border-[#ff8a3d]/40 bg-[#ff8a3d]/10 p-3 text-sm font-bold text-[#ffd0ad]">{error}</p> : null}
      <article className="border border-white/14 bg-black/24 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9afcff]">{round.category}</p>
          <span className="rounded border border-white/20 px-2 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
            {roundSource}
          </span>
        </div>
        <p className="mt-3 font-black">{round.question}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {round.choices.map((choice) => {
            const selected = selectedChoice === choice;
            const correct = answered && choice === round.answer;
            return (
              <button
                key={choice}
                type="button"
                onClick={() => chooseAnswer(choice)}
                className={`min-h-16 border px-3 py-3 text-left text-sm font-bold transition ${
                  selected || correct
                    ? "border-[#3cff87] bg-[#3cff87]/16 text-white"
                    : "border-white/14 bg-white/[0.03] text-white/72 hover:border-white/40"
                }`}
              >
                {choice}
              </button>
            );
          })}
        </div>
        {answered ? <p className="mt-4 text-sm leading-6 text-white/72">{round.explanation}</p> : null}
      </article>
      <button
        type="button"
        onClick={generateTrivia}
        disabled={loading}
        className="rounded border border-white/24 px-5 py-3 text-sm font-black text-white hover:bg-white/10 disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? "Generating..." : "Generate AI trivia"}
      </button>
      <button
        type="button"
        onClick={saveScore}
        className="rounded bg-[#47f7ff] px-5 py-3 text-sm font-black text-[#071014] shadow-[4px_4px_0_#3cff87]"
      >
        Save demo score
      </button>
      {saved ? <span className="ml-3 text-sm font-black text-[#3cff87]">Saved locally</span> : null}
    </div>
  );

  if (compact) {
    return content;
  }

  return (
    <GameDemoFrame
      title="AI Trivia Duel"
      description="Generate a server-side AI trivia round. Fallback questions are labeled when AI is unavailable."
    >
      {content}
    </GameDemoFrame>
  );
}
