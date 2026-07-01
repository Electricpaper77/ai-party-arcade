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

export type DailyChallengeKind = "prompt-battle" | "ai-trivia-duel";

export type DailyChallengeResult = {
  dateKey: string;
  game: DailyChallengeKind;
  score: number;
  source: "AI-generated" | "demo fallback";
  fallbackReason?: string;
  completedAt: string;
  shareText: string;
  streak: number;
};

export type DailyChallengeStats = {
  currentStreak: number;
  bestStreak: number;
  totalCompleted: number;
  shareClicks: number;
  lastCompletedDate?: string;
  results: Record<string, DailyChallengeResult>;
};

const leaderboardKey = "ai-party-arcade:leaderboard";
const roomsKey = "ai-party-arcade:rooms";
const dailyChallengeKey = "ai-party-arcade:daily-challenge";
const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const emptyDailyStats: DailyChallengeStats = {
  currentStreak: 0,
  bestStreak: 0,
  totalCompleted: 0,
  shareClicks: 0,
  results: {},
};

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
  window.dispatchEvent(new Event("ai-party-arcade:rooms"));
}

export function readRoom(code: string) {
  return readRooms()[code.toUpperCase()];
}

export function readRoomsSnapshot() {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    return window.localStorage.getItem(roomsKey) ?? "";
  } catch {
    return "";
  }
}

function daysBetween(previousDate: string, nextDate: string) {
  const previous = new Date(`${previousDate}T00:00:00.000Z`).getTime();
  const next = new Date(`${nextDate}T00:00:00.000Z`).getTime();

  if (!Number.isFinite(previous) || !Number.isFinite(next)) {
    return Number.POSITIVE_INFINITY;
  }

  return Math.round((next - previous) / 86_400_000);
}

export function readDailyChallengeStats(): DailyChallengeStats {
  if (typeof window === "undefined") {
    return emptyDailyStats;
  }

  try {
    const raw = window.localStorage.getItem(dailyChallengeKey);
    if (!raw) {
      return emptyDailyStats;
    }

    const parsed = JSON.parse(raw) as DailyChallengeStats;
    return {
      currentStreak: Number(parsed.currentStreak) || 0,
      bestStreak: Number(parsed.bestStreak) || 0,
      totalCompleted: Number(parsed.totalCompleted) || 0,
      shareClicks: Number(parsed.shareClicks) || 0,
      lastCompletedDate: parsed.lastCompletedDate,
      results: parsed.results && typeof parsed.results === "object" ? parsed.results : {},
    };
  } catch {
    return emptyDailyStats;
  }
}

export function readDailyChallengeResult(dateKey: string) {
  return readDailyChallengeStats().results[dateKey];
}

function writeDailyChallengeStats(stats: DailyChallengeStats) {
  window.localStorage.setItem(dailyChallengeKey, JSON.stringify(stats));
  window.dispatchEvent(new Event("ai-party-arcade:daily-challenge"));
}

export function saveDailyChallengeResult(result: Omit<DailyChallengeResult, "streak">) {
  const stats = readDailyChallengeStats();
  const alreadyCompleted = Boolean(stats.results[result.dateKey]);
  const gap = stats.lastCompletedDate ? daysBetween(stats.lastCompletedDate, result.dateKey) : Number.POSITIVE_INFINITY;
  const currentStreak = alreadyCompleted ? stats.currentStreak : gap === 1 ? stats.currentStreak + 1 : 1;
  const nextResult: DailyChallengeResult = {
    ...result,
    streak: currentStreak,
  };
  const nextResults = {
    ...stats.results,
    [result.dateKey]: nextResult,
  };
  const nextStats: DailyChallengeStats = {
    ...stats,
    currentStreak,
    bestStreak: Math.max(stats.bestStreak, currentStreak),
    totalCompleted: Object.keys(nextResults).length,
    lastCompletedDate: alreadyCompleted ? stats.lastCompletedDate : result.dateKey,
    results: nextResults,
  };

  writeDailyChallengeStats(nextStats);
  return { result: nextResult, stats: nextStats, streakChanged: !alreadyCompleted && currentStreak !== stats.currentStreak };
}

export function incrementDailyShareClicks() {
  const stats = readDailyChallengeStats();
  const nextStats = {
    ...stats,
    shareClicks: stats.shareClicks + 1,
  };

  writeDailyChallengeStats(nextStats);
  return nextStats;
}
