"use client";

import { useMemo, useState } from "react";
import { addLeaderboardEntry } from "@/lib/storage";
import { GameDemoFrame } from "./GameDemoFrame";

const questions = [
  {
    question: "Which part of AI Party Arcade creates a shareable invite in this MVP?",
    options: ["A local 6-character room code", "A user account", "A tournament server"],
    answer: 0,
  },
  {
    question: "What should simulated features be labeled as?",
    options: ["Live beta", "MVP demo", "Ranked mode"],
    answer: 1,
  },
  {
    question: "Where does this demo leaderboard store scores?",
    options: ["Browser localStorage", "A production database", "A social graph"],
    answer: 0,
  },
];

export function TriviaDuelDemo({ compact = false }: { compact?: boolean }) {
  const [player, setPlayer] = useState("Trivia Ace");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [saved, setSaved] = useState(false);

  const score = useMemo(
    () => questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 100 : 0), 0),
    [answers],
  );

  function chooseAnswer(questionIndex: number, optionIndex: number) {
    setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }));
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
      <div className="grid gap-4">
        {questions.map((question, questionIndex) => (
          <article key={question.question} className="border border-white/14 bg-black/24 p-4">
            <p className="font-black">{question.question}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {question.options.map((option, optionIndex) => {
                const selected = answers[questionIndex] === optionIndex;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => chooseAnswer(questionIndex, optionIndex)}
                    className={`min-h-16 border px-3 py-3 text-left text-sm font-bold transition ${
                      selected
                        ? "border-[#3cff87] bg-[#3cff87]/16 text-white"
                        : "border-white/14 bg-white/[0.03] text-white/72 hover:border-white/40"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>
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
      title="AI Trivia Duel Demo"
      description="Sample questions for a local browser duel. Answers and scores do not leave this device."
    >
      {content}
    </GameDemoFrame>
  );
}

