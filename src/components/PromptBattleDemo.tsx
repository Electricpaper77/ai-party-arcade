"use client";

import { useMemo, useState } from "react";
import { addLeaderboardEntry } from "@/lib/storage";
import { GameDemoFrame } from "./GameDemoFrame";

const samplePrompt = "Pitch a party game where the rules change every 30 seconds.";

export function PromptBattleDemo({ compact = false }: { compact?: boolean }) {
  const [player, setPlayer] = useState("Player 1");
  const [answer, setAnswer] = useState("A game where every rule card is generated from the loudest word in the room.");
  const [lastScore, setLastScore] = useState<number | null>(null);

  const score = useMemo(() => {
    const variety = new Set(answer.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean)).size;
    return Math.min(100, 35 + variety * 4 + Math.min(answer.length, 180) / 6);
  }, [answer]);

  function submitScore() {
    const rounded = Math.round(score);
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
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb8fa]">Sample prompt</p>
        <p className="mt-3 text-2xl font-black leading-tight">{samplePrompt}</p>
        <p className="mt-4 text-sm leading-6 text-white/62">
          Placeholder scoring rewards length and word variety. It is intentionally labeled as simulated MVP behavior.
        </p>
      </div>
      <div className="space-y-4">
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
            className="rounded bg-[#faff00] px-5 py-3 text-sm font-black text-[#111114] shadow-[4px_4px_0_#ff3df2]"
          >
            Score demo round
          </button>
          <span className="text-sm font-bold text-white/72">Preview score: {Math.round(score)}</span>
          {lastScore !== null ? <span className="text-sm font-black text-[#3cff87]">Saved {lastScore}</span> : null}
        </div>
      </div>
    </div>
  );

  if (compact) {
    return content;
  }

  return (
    <GameDemoFrame
      title="Prompt Battle Demo"
      description="A local, single-browser demo of the Prompt Battle loop with placeholder scoring."
    >
      {content}
    </GameDemoFrame>
  );
}

