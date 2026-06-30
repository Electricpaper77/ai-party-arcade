"use client";

import { useEffect, useState } from "react";
import { clearLeaderboard, readLeaderboard, type LeaderboardEntry } from "@/lib/storage";

const sampleScores: LeaderboardEntry[] = [
  {
    id: "sample-1",
    player: "Sample: Neon Host",
    game: "Prompt Battle",
    score: 92,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sample-2",
    player: "Sample: Trivia Spark",
    game: "AI Trivia Duel",
    score: 200,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sample-3",
    player: "Sample: Story Pilot",
    game: "AI Story Chain",
    score: 78,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

export function LeaderboardClient() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    function sync() {
      setEntries(readLeaderboard().sort((a, b) => b.score - a.score));
      setHydrated(true);
    }

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("ai-party-arcade:leaderboard", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("ai-party-arcade:leaderboard", sync);
    };
  }, []);

  function resetScores() {
    if (entries.length > 0 && !window.confirm("Reset all local AI Party Arcade leaderboard scores in this browser?")) {
      return;
    }

    clearLeaderboard();
    setEntries([]);
  }

  const displayEntries = entries.length > 0 ? entries : sampleScores;
  const showingSamples = hydrated && entries.length === 0;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden border border-white/14 bg-[#11111b]/92 shadow-[8px_8px_0_rgba(71,247,255,0.14)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-4 sm:p-5">
          <div>
            <h2 className="text-2xl font-black">Local scores</h2>
            <p className="mt-1 text-sm text-white/58">Saved in this browser only.</p>
          </div>
          <button
            type="button"
            onClick={resetScores}
            disabled={!hydrated}
            className="min-h-11 rounded border border-white/24 px-4 py-3 text-sm font-black text-white hover:bg-white/10"
          >
            Reset leaderboard
          </button>
        </div>
        {!hydrated ? (
          <div className="p-8 text-center text-white/62">
            Loading local scores...
          </div>
        ) : (
          <>
            {showingSamples ? (
              <div className="border-b border-white/10 bg-[#faff00]/10 p-4 text-sm font-bold leading-6 text-[#fffca8] sm:p-5">
                No real local scores yet. These rows are sample data so reviewers can see the leaderboard layout.
              </div>
            ) : null}
            <div className="divide-y divide-white/10">
              {displayEntries.map((entry, index) => (
              <article key={entry.id} className="grid gap-3 p-4 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:p-5">
                <div className="font-mono text-3xl font-black text-[#faff00]">#{index + 1}</div>
                <div>
                  <h3 className="text-xl font-black">
                    {entry.player}
                    {entry.id.startsWith("sample-") ? (
                      <span className="ml-3 inline-flex rounded border border-[#faff00]/40 px-2 py-1 align-middle text-xs font-black uppercase tracking-[0.14em] text-[#faff00]">
                        Sample data
                      </span>
                    ) : null}
                  </h3>
                  <p className="text-sm text-white/58">
                    {entry.game} / {entry.id.startsWith("sample-") ? "Demo example" : new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-3xl font-black text-[#47f7ff]">{entry.score}</div>
              </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
