"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { games, type GameSlug } from "@/lib/games";
import { readRoom, saveRoom, type DemoRoom } from "@/lib/storage";
import { PromptBattleDemo } from "./PromptBattleDemo";
import { StoryChainDemo } from "./StoryChainDemo";
import { TriviaDuelDemo } from "./TriviaDuelDemo";

function gameTitle(slug: GameSlug) {
  return games.find((game) => game.slug === slug)?.title ?? "Prompt Battle";
}

function fallbackRoom(code: string): DemoRoom {
  return {
    code,
    host: "Host",
    game: "prompt-battle",
    createdAt: new Date().toISOString(),
  };
}

export function RoomClient({ code }: { code: string }) {
  const normalizedCode = code.toUpperCase().slice(0, 6);
  const [room, setRoom] = useState<DemoRoom>(() => {
    if (typeof window === "undefined") {
      return fallbackRoom(normalizedCode);
    }

    return readRoom(normalizedCode) ?? fallbackRoom(normalizedCode);
  });
  const [copyState, setCopyState] = useState("Copy invite link");

  useEffect(() => {
    if (!readRoom(normalizedCode)) {
      saveRoom(room);
    }
  }, [normalizedCode, room]);

  const inviteUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }
    return `${window.location.origin}/room/${normalizedCode}`;
  }, [normalizedCode]);

  function updateGame(game: GameSlug) {
    const nextRoom = { ...room, game };
    saveRoom(nextRoom);
    setRoom(nextRoom);
  }

  async function copyInvite() {
    if (!inviteUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopyState("Copied");
      window.setTimeout(() => setCopyState("Copy invite link"), 1400);
    } catch {
      setCopyState("Copy unavailable");
      window.setTimeout(() => setCopyState("Copy invite link"), 1400);
    }
  }

  const selectedGame = room.game;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.5fr]">
        <aside className="border border-white/14 bg-[#11111b]/92 p-5 shadow-[8px_8px_0_rgba(250,255,0,0.12)] sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#47f7ff]">Shareable room code</p>
          <code className="mt-3 block font-mono text-5xl font-black tracking-[0.16em] text-[#faff00]">{normalizedCode}</code>
          <p className="mt-4 text-sm leading-6 text-white/62">
            Local demo room hosted by {room.host}. The invite link points to this browser-rendered route.
          </p>
          <button
            type="button"
            onClick={copyInvite}
            className="mt-5 w-full rounded bg-[#faff00] px-5 py-3 text-sm font-black text-[#111114] shadow-[4px_4px_0_#ff3df2]"
          >
            {copyState}
          </button>
          <div className="mt-6">
            <p className="mb-3 text-sm font-bold text-white/72">Room game</p>
            <div className="grid gap-2">
              {games
                .filter((game) => game.status === "Playable MVP demo")
                .map((game) => (
                  <button
                    key={game.slug}
                    type="button"
                    onClick={() => updateGame(game.slug)}
                    className={`border px-3 py-3 text-left text-sm font-black transition ${
                      selectedGame === game.slug ? "border-[#47f7ff] bg-[#47f7ff]/12" : "border-white/14 hover:bg-white/[0.08]"
                    }`}
                  >
                    {game.title}
                  </button>
                ))}
            </div>
          </div>
          <Link
            href="/create-room"
            className="mt-6 inline-flex rounded border border-white/24 px-4 py-3 text-sm font-black text-white hover:bg-white/10"
          >
            Create another room
          </Link>
        </aside>
        <div className="border border-white/14 bg-[#10101a]/92 p-4 sm:p-6">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff3df2]">Now playing</p>
            <h2 className="mt-2 text-3xl font-black">{gameTitle(selectedGame)}</h2>
          </div>
          {selectedGame === "prompt-battle" ? <PromptBattleDemo compact /> : null}
          {selectedGame === "ai-trivia-duel" ? <TriviaDuelDemo compact /> : null}
          {selectedGame === "ai-story-chain" ? <StoryChainDemo compact /> : null}
        </div>
      </div>
    </section>
  );
}
