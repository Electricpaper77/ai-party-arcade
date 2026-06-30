"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { copyTextToClipboard } from "@/lib/clipboard";
import { games, type GameSlug } from "@/lib/games";
import { generateRoomCode, saveRoom } from "@/lib/storage";

export function CreateRoomClient() {
  const router = useRouter();
  const [host, setHost] = useState("Host");
  const [selectedGame, setSelectedGame] = useState<GameSlug>("prompt-battle");
  const [code, setCode] = useState(() => generateRoomCode());
  const [copyState, setCopyState] = useState("Copy invite link");

  const playableGames = useMemo(() => games.filter((game) => game.status === "MVP demo"), []);
  const invitePath = `/room/${code}`;

  async function copyInvite() {
    const url = typeof window === "undefined" ? invitePath : `${window.location.origin}${invitePath}`;
    const copied = await copyTextToClipboard(url);
    if (copied) {
      setCopyState("Copied");
      window.setTimeout(() => setCopyState("Copy invite link"), 1400);
      return;
    }

    setCopyState("Link ready");
    window.setTimeout(() => setCopyState("Copy invite link"), 1400);
  }

  function createRoom() {
    saveRoom({
      code,
      host: host.trim() || "Host",
      game: selectedGame,
      createdAt: new Date().toISOString(),
    });
    router.push(`/room/${code}`);
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div className="border border-white/14 bg-[#11111b]/90 p-5 shadow-[8px_8px_0_rgba(255,61,242,0.14)] sm:p-6">
        <h2 className="text-2xl font-black">Room setup</h2>
        <p className="mt-2 text-sm leading-6 text-white/62">
          This creates a browser-local demo room. No login, no server, and no live players are created.
        </p>
        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-bold text-white/72">Host display name</span>
            <input
              value={host}
              onChange={(event) => setHost(event.target.value)}
              className="mt-2 w-full border border-white/14 bg-black/40 px-3 py-3 font-bold text-white"
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-white/72">Game</span>
            <select
              value={selectedGame}
              onChange={(event) => setSelectedGame(event.target.value as GameSlug)}
              className="mt-2 w-full border border-white/14 bg-black/40 px-3 py-3 font-bold text-white"
            >
              {playableGames.map((game) => (
                <option key={game.slug} value={game.slug} className="bg-[#11111b]">
                  {game.title}
                </option>
              ))}
            </select>
          </label>
          <div>
            <span className="text-sm font-bold text-white/72">Room code</span>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <code className="border border-[#faff00]/40 bg-[#faff00]/10 px-4 py-3 font-mono text-3xl font-black tracking-[0.16em] text-[#faff00]">
                {code}
              </code>
              <button
                type="button"
                onClick={() => setCode(generateRoomCode())}
                className="rounded border border-white/24 px-4 py-3 text-sm font-black text-white hover:bg-white/10"
              >
                Reroll
              </button>
            </div>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="select-all break-all border border-white/10 bg-black/32 px-3 py-3 text-sm font-bold text-white/62">
                Invite preview: {invitePath}
              </span>
              <button
                type="button"
                onClick={copyInvite}
                className="rounded border border-white/24 px-4 py-3 text-sm font-black text-white hover:bg-white/10"
              >
                {copyState}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={createRoom}
            className="w-full rounded bg-[#47f7ff] px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#071014] shadow-[5px_5px_0_#ff3df2] transition hover:-translate-y-0.5"
          >
            Create demo room
          </button>
          <p className="text-xs font-bold leading-5 text-white/52">
            MVP demo note: invite links open the same local room route, but gameplay is not synchronized between devices yet.
          </p>
        </div>
      </div>
      <div className="grid gap-4">
        {playableGames.map((game) => (
          <button
            key={game.slug}
            type="button"
            onClick={() => setSelectedGame(game.slug)}
            className={`border p-5 text-left transition ${
              selectedGame === game.slug
                ? "border-[#47f7ff] bg-[#47f7ff]/12"
                : "border-white/14 bg-white/[0.03] hover:border-white/36"
            }`}
          >
            <div className={`mb-4 h-2 w-20 bg-gradient-to-r ${game.accent}`} />
            <h3 className="text-xl font-black">{game.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">{game.tagline}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
