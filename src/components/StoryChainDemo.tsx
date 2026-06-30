"use client";

import { useMemo, useState } from "react";
import { addLeaderboardEntry } from "@/lib/storage";
import { GameDemoFrame } from "./GameDemoFrame";

export function StoryChainDemo({ compact = false }: { compact?: boolean }) {
  const [player, setPlayer] = useState("Story Player");
  const [line, setLine] = useState("");
  const [lines, setLines] = useState([
    "The arcade cabinet blinked awake and asked for a room code.",
    "Someone typed ZAP42Q, and the floor turned into a trivia board.",
  ]);
  const [saved, setSaved] = useState(false);

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
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb06b]">Shared local story</p>
        <ol className="mt-4 space-y-3">
          {lines.map((storyLine, index) => (
            <li key={`${storyLine}-${index}`} className="border-l-4 border-[#ff8a3d] bg-white/[0.04] p-3 text-sm leading-6 text-white/78">
              {storyLine}
            </li>
          ))}
        </ol>
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
      title="AI Story Chain Demo"
      description="A local collaborative writing loop with a demo score based on story length."
    >
      {content}
    </GameDemoFrame>
  );
}

