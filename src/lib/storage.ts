import type { GameSlug } from "./games";

export type LeaderboardEntry = {
  id: string;
  player: string;
  game: string;
  score: number;
  createdAt: string;
};

export type DemoRoom = {
  code: string;
  host: string;
  game: GameSlug;
  createdAt: string;
};

const leaderboardKey = "ai-party-arcade:leaderboard";
const roomsKey = "ai-party-arcade:rooms";
const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateRoomCode() {
  return Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

export function readLeaderboard() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(leaderboardKey);
    return raw ? (JSON.parse(raw) as LeaderboardEntry[]) : [];
  } catch {
    return [];
  }
}

export function addLeaderboardEntry(entry: Omit<LeaderboardEntry, "id" | "createdAt">) {
  const nextEntry: LeaderboardEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const next = [nextEntry, ...readLeaderboard()].slice(0, 25);
  window.localStorage.setItem(leaderboardKey, JSON.stringify(next));
  window.dispatchEvent(new Event("ai-party-arcade:leaderboard"));
  return nextEntry;
}

export function clearLeaderboard() {
  window.localStorage.removeItem(leaderboardKey);
  window.dispatchEvent(new Event("ai-party-arcade:leaderboard"));
}

export function readRooms() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(roomsKey);
    return raw ? (JSON.parse(raw) as Record<string, DemoRoom>) : {};
  } catch {
    return {};
  }
}

export function saveRoom(room: DemoRoom) {
  const rooms = readRooms();
  rooms[room.code] = room;
  window.localStorage.setItem(roomsKey, JSON.stringify(rooms));
}

export function readRoom(code: string) {
  return readRooms()[code.toUpperCase()];
}

