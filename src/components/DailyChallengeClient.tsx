"use client";

import { useEffect, useMemo, useState } from "react";
import {
  fallbackJudgeResult,
  fallbackPromptRound,
  fallbackTriviaRound,
  type AiResponse,
  type JudgeResult,
  type PromptRound,
  type TriviaRound,
} from "@/lib/aiSchemas";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { copyTextToClipboard } from "@/lib/clipboard";
import {
  incrementDailyShareClicks,
  readDailyChallengeResult,
  readDailyChallengeStats,
  saveDailyChallengeResult,
  type DailyChallengeKind,
  type DailyChallengeResult,
  type DailyChallengeStats,
} from "@/lib/storage";

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDailyKind(dateKey: string): DailyChallengeKind {
  const total = Array.from(dateKey).reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return total % 2 === 0 ? "prompt-battle" : "ai-trivia-duel";
}

function gameLabel(kind: DailyChallengeKind) {
  return kind === "prompt-battle" ? "Prompt Battle" : "AI Trivia Duel";
}

function fallbackPromptScore(answer: string) {
  const words = answer.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean);
  return Math.min(100, Math.round(36 + new Set(words).size * 4 + Math.min(answer.length, 180) / 7));
}

const emptyStats: DailyChallengeStats = {
  currentStreak: 0,
  bestStreak: 0,
  totalCompleted: 0,
  shareClicks: 0,
  results: {},
};

export function DailyChallengeClient() {
  const [todayKey, setTodayKey] = useState("");
  const [stats, setStats] = useState<DailyChallengeStats>(emptyStats);
  const [result, setResult] = useState<DailyChallengeResult | null>(null);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState<"AI-generated" | "demo fallback">("demo fallback");
  const [promptRound, setPromptRound] = useState<PromptRound>(fallbackPromptRound);
  const [triviaRound, setTriviaRound] = useState<TriviaRound>(fallbackTriviaRound);
  const [promptAnswer, setPromptAnswer] = useState("A lightning round where every answer has to include the room code.");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [shareState, setShareState] = useState("Copy/share score");

  const challengeKind = useMemo(() => (todayKey ? getDailyKind(todayKey) : "prompt-battle"), [todayKey]);
  const challengeName = gameLabel(challengeKind);
  const shareText = result?.shareText ?? "I scored X on AI Party Arcade Daily Challenge";

  useEffect(() => {
    function syncDailyChallenge() {
      const nextTodayKey = getTodayKey();
      setTodayKey(nextTodayKey);
      setStats(readDailyChallengeStats());
      setResult(readDailyChallengeResult(nextTodayKey) ?? null);
      trackAnalyticsEvent("daily_challenge_view", { date: nextTodayKey, game: getDailyKind(nextTodayKey) });
    }

    syncDailyChallenge();
  }, []);

  async function startChallenge() {
    setStarted(true);
    setLoading(true);
    setError("");
    setSelectedChoice("");
    trackAnalyticsEvent("daily_challenge_started", { date: todayKey, game: challengeKind });

    try {
      const response = await fetch(challengeKind === "prompt-battle" ? "/api/generate-prompt" : "/api/generate-trivia", {
        method: "POST",
      });
      const payload = (await response.json()) as AiResponse<PromptRound | TriviaRound>;
      const nextSource = payload.meta.source === "ai-generated" ? "AI-generated" : "demo fallback";
      setSource(nextSource);

      if (challengeKind === "prompt-battle") {
        setPromptRound(payload.data as PromptRound);
      } else {
        setTriviaRound(payload.data as TriviaRound);
      }

      if (payload.meta.error_type) {
        setError(`Using demo fallback: ${payload.meta.error_type}`);
        trackAnalyticsEvent("fallback_used", { game: challengeKind, error_type: payload.meta.error_type });
      }
    } catch {
      setSource("demo fallback");
      setPromptRound(fallbackPromptRound);
      setTriviaRound(fallbackTriviaRound);
      setError("AI generation failed. Using demo fallback.");
      trackAnalyticsEvent("fallback_used", { game: challengeKind, error_type: "client_fetch_error" });
    } finally {
      setLoading(false);
    }
  }

  function saveResult(score: number, resultSource: "AI-generated" | "demo fallback") {
    const nextShareText = `I scored ${score} on AI Party Arcade Daily Challenge`;
    const saved = saveDailyChallengeResult({
      dateKey: todayKey,
      game: challengeKind,
      score,
      source: resultSource,
      completedAt: new Date().toISOString(),
      shareText: nextShareText,
    });

    setResult(saved.result);
    setStats(saved.stats);
    trackAnalyticsEvent("daily_challenge_completed", {
      date: todayKey,
      game: challengeKind,
      score,
      source: resultSource,
    });

    if (saved.streakChanged) {
      trackAnalyticsEvent("streak_updated", {
        current_streak: saved.stats.currentStreak,
        best_streak: saved.stats.bestStreak,
      });
    }
  }

  async function completePromptChallenge() {
    setCompleting(true);
    setError("");

    try {
      const response = await fetch("/api/judge-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptRound.prompt, response: promptAnswer }),
      });
      const payload = (await response.json()) as AiResponse<JudgeResult>;
      const score = Math.round(payload.data.score);
      const resultSource = payload.meta.source === "ai-generated" ? source : "demo fallback";
      if (payload.meta.error_type) {
        setError(`Using demo fallback judge: ${payload.meta.error_type}`);
        trackAnalyticsEvent("fallback_used", { game: "daily-prompt-judge", error_type: payload.meta.error_type });
      }
      saveResult(score, resultSource);
    } catch {
      setError("AI judging failed. Using demo fallback score.");
      trackAnalyticsEvent("fallback_used", { game: "daily-prompt-judge", error_type: "client_fetch_error" });
      saveResult(fallbackPromptScore(promptAnswer) || fallbackJudgeResult.score, "demo fallback");
    } finally {
      setCompleting(false);
    }
  }

  function completeTriviaChallenge(choice: string) {
    setSelectedChoice(choice);
    saveResult(choice === triviaRound.answer ? 100 : 0, source);
  }

  async function shareScore() {
    const copied = await copyTextToClipboard(shareText);
    const nextStats = incrementDailyShareClicks();
    setStats(nextStats);
    setShareState(copied ? "Copied" : "Score text ready");
    trackAnalyticsEvent("share_score_clicked", { copied, score: result?.score, game: result?.game });
    window.setTimeout(() => setShareState("Copy/share score"), 1400);
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
      <div className="border border-white/14 bg-[#11111b]/92 p-5 shadow-[8px_8px_0_rgba(71,247,255,0.14)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#47f7ff]">{todayKey || "Today"}</p>
            <h2 className="mt-2 text-3xl font-black">{challengeName} Daily</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
              One no-login challenge per day. AI routes generate the round when available; demo fallback is labeled when used.
            </p>
          </div>
          <span className="rounded border border-[#faff00]/40 bg-[#faff00]/10 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#faff00]">
            {source}
          </span>
        </div>

        {result ? (
          <div className="mt-6 border border-[#3cff87]/40 bg-[#3cff87]/10 p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#a7ffc6]">Shareable score card</p>
            <div className="mt-4 border border-white/14 bg-black/32 p-5">
              <p className="text-sm font-bold text-white/62">{gameLabel(result.game)} / {result.dateKey}</p>
              <p className="mt-3 text-6xl font-black text-[#faff00]">{result.score}</p>
              <p className="mt-3 text-xl font-black">{result.shareText}</p>
              <p className="mt-3 text-sm font-bold text-white/62">
                Streak: {result.streak} day{result.streak === 1 ? "" : "s"} / Source: {result.source}
              </p>
            </div>
            <button
              type="button"
              onClick={shareScore}
              className="mt-4 rounded bg-[#faff00] px-5 py-3 text-sm font-black text-[#111114] shadow-[4px_4px_0_#ff3df2]"
            >
              {shareState}
            </button>
          </div>
        ) : (
          <div className="mt-6">
            {!started ? (
              <button
                type="button"
                onClick={startChallenge}
                className="rounded bg-[#faff00] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#111114] shadow-[5px_5px_0_#ff3df2] transition hover:-translate-y-0.5"
              >
                Start daily challenge
              </button>
            ) : null}

            {loading ? <p className="mt-5 border border-white/14 bg-white/[0.04] p-4 text-sm font-bold text-white/72">Generating today&apos;s round...</p> : null}
            {error ? <p className="mt-5 border border-[#ff8a3d]/40 bg-[#ff8a3d]/10 p-3 text-sm font-bold text-[#ffd0ad]">{error}</p> : null}

            {started && !loading && challengeKind === "prompt-battle" ? (
              <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <article className="border border-[#ff3df2]/40 bg-[#ff3df2]/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb8fa]">Prompt Battle daily</p>
                  <p className="mt-3 text-2xl font-black leading-tight">{promptRound.prompt}</p>
                  <p className="mt-3 text-sm font-bold text-white/72">Difficulty: {promptRound.difficulty}</p>
                  <p className="mt-2 text-sm leading-6 text-white/62">Criteria: {promptRound.criteria.join(", ")}</p>
                </article>
                <div>
                  <label className="block">
                    <span className="text-sm font-bold text-white/72">Your answer</span>
                    <textarea
                      value={promptAnswer}
                      onChange={(event) => setPromptAnswer(event.target.value)}
                      rows={6}
                      className="mt-2 w-full resize-none border border-white/14 bg-black/40 px-3 py-3 text-white"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={completePromptChallenge}
                    disabled={completing}
                    className="mt-4 rounded bg-[#ff3df2] px-5 py-3 text-sm font-black text-white disabled:cursor-wait disabled:opacity-70"
                  >
                    {completing ? "Scoring..." : "Complete challenge"}
                  </button>
                </div>
              </div>
            ) : null}

            {started && !loading && challengeKind === "ai-trivia-duel" ? (
              <article className="mt-5 border border-[#47f7ff]/40 bg-[#47f7ff]/10 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9afcff]">{triviaRound.category}</p>
                <p className="mt-3 text-2xl font-black leading-tight">{triviaRound.question}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {triviaRound.choices.map((choice) => {
                    const selected = selectedChoice === choice;
                    const correct = selectedChoice && choice === triviaRound.answer;
                    return (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => completeTriviaChallenge(choice)}
                        disabled={Boolean(result)}
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
                {selectedChoice ? <p className="mt-4 text-sm leading-6 text-white/72">{triviaRound.explanation}</p> : null}
              </article>
            ) : null}
          </div>
        )}
      </div>

      <aside className="space-y-5">
        <section className="border border-[#faff00]/30 bg-[#faff00]/10 p-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#fffca8]">Streak</p>
          <p className="mt-3 text-5xl font-black">{stats.currentStreak}</p>
          <p className="mt-2 text-sm font-bold text-white/62">Best streak: {stats.bestStreak} day{stats.bestStreak === 1 ? "" : "s"}</p>
        </section>
        <section className="border border-white/14 bg-[#10101a]/92 p-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#47f7ff]">Public metrics panel</p>
          <p className="mt-2 text-sm leading-6 text-white/62">
            Lightweight launch metrics for this browser only. No accounts, global rankings, or cross-device tracking are added.
          </p>
          <dl className="mt-5 grid gap-3">
            <div className="border border-white/10 bg-white/[0.03] p-3">
              <dt className="text-xs font-black uppercase tracking-[0.16em] text-white/52">Daily completions</dt>
              <dd className="mt-1 text-2xl font-black text-white">{stats.totalCompleted}</dd>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-3">
              <dt className="text-xs font-black uppercase tracking-[0.16em] text-white/52">Share clicks</dt>
              <dd className="mt-1 text-2xl font-black text-white">{stats.shareClicks}</dd>
            </div>
            <div className="border border-white/10 bg-white/[0.03] p-3">
              <dt className="text-xs font-black uppercase tracking-[0.16em] text-white/52">Last completed</dt>
              <dd className="mt-1 text-sm font-black text-white">{stats.lastCompletedDate ?? "Not yet"}</dd>
            </div>
          </dl>
        </section>
      </aside>
    </section>
  );
}
