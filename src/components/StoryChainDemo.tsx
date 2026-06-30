"use client";

import { useMemo, useState } from "react";
import { fallbackStoryContinuation, type AiResponse, type StoryContinuation } from "@/lib/aiSchemas";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { addLeaderboardEntry } from "@/lib/storage";
import { AiMetricsPanel, emptyAiMetrics, mergeAiMetrics, type AiMetrics } from "./AiMetricsPanel";
import { GameDemoFrame } from "./GameDemoFrame";

export function StoryChainDemo({ compact = false }: { compact?: boolean }) {
  const [player, setPlayer] = useState("Story Player");
  const [line, setLine] = useState("");
  const [lines, setLines] = useState([
    "The arcade cabinet blinked awake and asked for a room code.",
    "Someone typed ZAP42Q, and the floor turned into a trivia board.",
  ]);
  const [lastContinuation, setLastContinuation] = useState<StoryContinuation | null>(null);
  const [continuationSource, setContinuationSource] = useState<"AI-generated" | "demo fallback">("demo fallback");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [metrics, setMetrics] = useState<AiMetrics>(emptyAiMetrics);

  const score = useMemo(() => Math.min(100, 35 + lines.length * 10 + lines.join(" ").length / 18), [lines]);

  function addLine() {
    const nextLine = line.trim();
    if (!nextLine) {
      return;
    }
    setLines((current) => [...current, nextLine]);
    setLine("");
    setSaved(false);
  }

  async function continueWithAi() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/continue-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const payload = (await response.json()) as AiResponse<StoryContinuation>;
      setLastContinuation(payload.data);
      setContinuationSource(payload.meta.source === "ai-generated" ? "AI-generated" : "demo fallback");
      setLines((current) => [...current, payload.data.next_line]);
      setMetrics((current) => mergeAiMetrics(current, payload.meta));
      setSaved(false);
      trackAnalyticsEvent("story_continued", {
        source: payload.meta.source,
        fallback_used: payload.meta.fallback_used,
        latency_ms: payload.meta.latency_ms,
      });
      if (payload.meta.error_type) {
        trackAnalyticsEvent("fallback_used", { game: "ai-story-chain", error_type: payload.meta.error_type });
        setError(`Using demo fallback: ${payload.meta.error_type}`);
      }
    } catch {
      setLastContinuation(fallbackStoryContinuation);
      setContinuationSource("demo fallback");
      setLines((current) => [...current, fallbackStoryContinuation.next_line]);
      setMetrics((current) => ({
        ...current,
        fallbackCount: current.fallbackCount + 1,
        errorCount: current.errorCount + 1,
      }));
      setSaved(false);
      trackAnalyticsEvent("fallback_used", { game: "ai-story-chain", error_type: "client_fetch_error" });
      setError("AI story continuation failed. Using demo fallback.");
    } finally {
      setLoading(false);
    }
  }

  function saveScore() {
    addLeaderboardEntry({
      player: player.trim() || "Story Player",
      game: "AI Story Chain",
      score: Math.round(score),
    });
    setSaved(true);
  }

  const content = (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
      <div className="border border-white/14 bg-black/24 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb06b]">Shared local story</p>
          <span className="rounded border border-white/20 px-2 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
            {lastContinuation ? continuationSource : "demo fallback"}
          </span>
        </div>
        <ol className="mt-4 space-y-3">
          {lines.map((storyLine, index) => (
            <li key={`${storyLine}-${index}`} className="border-l-4 border-[#ff8a3d] bg-white/[0.04] p-3 text-sm leading-6 text-white/78">
              {storyLine}
            </li>
          ))}
        </ol>
        {lastContinuation ? (
          <div className="mt-4 border border-[#ff8a3d]/40 bg-[#ff8a3d]/10 p-3 text-sm leading-6 text-white/72">
            <p>
              <span className="font-black text-white">Twist:</span> {lastContinuation.twist}
            </p>
            <p>
              <span className="font-black text-white">Tone:</span> {lastContinuation.tone}
            </p>
          </div>
        ) : null}
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
          <span className="text-sm font-bold text-white/72">Add the next line</span>
          <textarea
            value={line}
            onChange={(event) => setLine(event.target.value)}
            rows={4}
            className="mt-2 w-full resize-none border border-white/14 bg-black/40 px-3 py-3 text-white"
            placeholder="Then the scoreboard started narrating everyone..."
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={addLine}
            className="rounded bg-[#ff8a3d] px-5 py-3 text-sm font-black text-[#160903] shadow-[4px_4px_0_#a96bff]"
          >
            Add line
          </button>
          <button
            type="button"
            onClick={continueWithAi}
            disabled={loading}
            className="rounded bg-[#a96bff] px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0_#ff8a3d] disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? "Generating..." : "Continue with AI"}
          </button>
          <button
            type="button"
            onClick={saveScore}
            className="rounded border border-white/24 px-5 py-3 text-sm font-black text-white hover:bg-white/10"
          >
            Save story score
          </button>
          <span className="text-sm font-bold text-white/72">Score: {Math.round(score)}</span>
          {saved ? <span className="text-sm font-black text-[#3cff87]">Saved locally</span> : null}
        </div>
      </div>
    </div>
  );

  if (compact) {
    return content;
  }

  return (
    <GameDemoFrame
      title="AI Story Chain"
      description="Continue the story with server-side AI. Demo fallback lines are labeled when AI is unavailable."
    >
      {content}
    </GameDemoFrame>
  );
}
