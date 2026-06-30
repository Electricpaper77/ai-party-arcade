"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { copyTextToClipboard } from "@/lib/clipboard";
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

function isValidRoomCode(code: string) {
  return /^[A-Z0-9]{6}$/.test(code);
}

export function RoomClient({ code }: { code: string }) {
  const normalizedCode = code.toUpperCase();
  const validRoomCode = isValidRoomCode(normalizedCode);
  const [room, setRoom] = useState<DemoRoom>(() => {
    if (!validRoomCode || typeof window === "undefined") {
      return fallbackRoom(normalizedCode);
    }

    return readRoom(normalizedCode) ?? fallbackRoom(normalizedCode);
  });
  const [copyState, setCopyState] = useState("Copy invite link");

  useEffect(() => {
    if (validRoomCode && !readRoom(normalizedCode)) {
      saveRoom(room);
    }
  }, [normalizedCode, room, validRoomCode]);

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

    const copied = await copyTextToClipboard(inviteUrl);
    trackAnalyticsEvent("copy_invite_link", { copied, location: "room", game: selectedGame });
    if (copied) {
      setCopyState("Copied");
      window.setTimeout(() => setCopyState("Copy invite link"), 1400);
      return;
    }

    setCopyState("Link ready");
    window.setTimeout(() => setCopyState("Copy invite link"), 1400);
  }

  const selectedGame = room.game;

  if (!validRoomCode) {
    return (
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="border border-[#ff3d71]/40 bg-[#ff3d71]/10 p-6 shadow-[8px_8px_0_rgba(255,61,113,0.14)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff9ab1]">Invalid room code</p>
          <h2 className="mt-3 text-3xl font-black">Room codes must be exactly 6 letters or numbers.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68">
            This MVP stores rooms locally in the browser. Create a new demo room to generate a valid shareable code.
          </p>
          <Link
            href="/create-room"
            className="mt-6 inline-flex rounded bg-[#faff00] px-5 py-3 text-sm font-black text-[#111114] shadow-[4px_4px_0_#ff3df2]"
          >
            Create a valid room
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.5fr]">
        <aside className="border border-white/14 bg-[#11111b]/92 p-5 shadow-[8px_8px_0_rgba(250,255,0,0.12)] sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#47f7ff]">Shareable room code</p>
          <code className="mt-3 block font-mono text-5xl font-black tracking-[0.16em] text-[#faff00]">{normalizedCode}</code>
          <p className="mt-4 text-sm leading-6 text-white/62">
            Local demo room hosted by {room.host}. The invite link points to this browser-rendered route; gameplay is not synchronized across devices yet.
          </p>
          <button
            type="button"
            onClick={copyInvite}
            className="mt-5 w-full rounded bg-[#faff00] px-5 py-3 text-sm font-black text-[#111114] shadow-[4px_4px_0_#ff3df2]"
          >
            {copyState}
          </button>
          <p className="mt-3 select-all break-all border border-white/10 bg-black/30 px-3 py-3 text-xs font-bold leading-5 text-white/58">
            Invite link: {inviteUrl || `/room/${normalizedCode}`}
          </p>
          <div className="mt-6">
            <p className="mb-3 text-sm font-bold text-white/72">Room game</p>
            <div className="grid gap-2">
              {games
                .filter((game) => game.status === "MVP demo")
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
        <div id="demo-round" className="border border-white/14 bg-[#10101a]/92 p-4 sm:p-6">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff3df2]">Now playing</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-3xl font-black">{gameTitle(selectedGame)}</h2>
              <a href="#demo-round" className="rounded bg-[#47f7ff] px-4 py-3 text-sm font-black text-[#071014] shadow-[4px_4px_0_#3cff87]">
                Start demo round
              </a>
            </div>
          </div>
          {selectedGame === "prompt-battle" ? <PromptBattleDemo compact /> : null}
          {selectedGame === "ai-trivia-duel" ? <TriviaDuelDemo compact /> : null}
          {selectedGame === "ai-story-chain" ? <StoryChainDemo compact /> : null}
        </div>
      </div>
    </section>
  );
}
