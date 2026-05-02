export const GAME_SESSION_STORAGE_KEY = "deckhaven-game-session";

/** Survives refresh / browser restart (tablet & phone). */
export const PERSISTED_GAME_KEY = "deckhaven-persisted-game";

export const DEFAULT_STARTING_LIFE = 40;

export type GameSession = {
  names: string[];
  startingLife: number;
};

export type PersistedGameStateV1 = {
  v: 1;
  names: string[];
  startingLife: number;
  scores: number[];
  updatedAt: number;
};

export function saveGameSession(session: GameSession): void {
  try {
    sessionStorage.setItem(GAME_SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* private mode / quota */
  }
}

export function loadGameSession(): GameSession | null {
  try {
    const raw = sessionStorage.getItem(GAME_SESSION_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as unknown;
    if (!data || typeof data !== "object") return null;
    const rec = data as Record<string, unknown>;
    const names = rec.names;
    const startingLife = rec.startingLife;
    if (!Array.isArray(names) || names.some((n) => typeof n !== "string"))
      return null;
    if (typeof startingLife !== "number" || !Number.isFinite(startingLife))
      return null;
    return { names, startingLife };
  } catch {
    return null;
  }
}

function isPersistedGameStateV1(data: unknown): data is PersistedGameStateV1 {
  if (!data || typeof data !== "object") return false;
  const rec = data as Record<string, unknown>;
  if (rec.v !== 1) return false;
  const names = rec.names;
  const startingLife = rec.startingLife;
  const scores = rec.scores;
  if (!Array.isArray(names) || names.some((n) => typeof n !== "string"))
    return false;
  if (typeof startingLife !== "number" || !Number.isFinite(startingLife))
    return false;
  if (!Array.isArray(scores) || scores.some((s) => typeof s !== "number" || !Number.isFinite(s)))
    return false;
  if (names.length === 0 || names.length !== scores.length) return false;
  return true;
}

export function loadPersistedGame(): PersistedGameStateV1 | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PERSISTED_GAME_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as unknown;
    if (!isPersistedGameStateV1(data)) return null;
    return data;
  } catch {
    return null;
  }
}

export function persistGameSnapshot(
  names: string[],
  startingLife: number,
  scores: number[],
): void {
  if (typeof window === "undefined") return;
  if (names.length === 0 || names.length !== scores.length) return;
  const state: PersistedGameStateV1 = {
    v: 1,
    names,
    startingLife,
    scores,
    updatedAt: Date.now(),
  };
  try {
    localStorage.setItem(PERSISTED_GAME_KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode */
  }
}

export function clearPersistedGame(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(PERSISTED_GAME_KEY);
  } catch {
    /* ignore */
  }
}
