"use client";

import { useEffect, useState } from "react";
import { clearLeaderboard, readLeaderboard, type LeaderboardEntry } from "@/lib/storage";

export function LeaderboardClient() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    function sync() {
      setEntries(readLeaderboard().sort((a, b) => b.score - a.score));
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
    clearLeaderboard();
    setEntries([]);
  }

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
            className="rounded border border-white/24 px-4 py-2 text-sm font-black text-white hover:bg-white/10"
          >
            Reset
          </button>
        </div>
        {entries.length === 0 ? (
          <div className="p-8 text-center text-white/62">
            No demo scores yet. Play Prompt Battle, AI Trivia Duel, or AI Story Chain to add one.
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {entries.map((entry, index) => (
              <article key={entry.id} className="grid gap-3 p-4 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:p-5">
                <div className="font-mono text-3xl font-black text-[#faff00]">#{index + 1}</div>
                <div>
                  <h3 className="text-xl font-black">{entry.player}</h3>
                  <p className="text-sm text-white/58">
                    {entry.game} / {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-3xl font-black text-[#47f7ff]">{entry.score}</div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
