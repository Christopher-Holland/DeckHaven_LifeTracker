export const GAME_SESSION_STORAGE_KEY = "deckhaven-game-session";

export const DEFAULT_STARTING_LIFE = 40;

export type GameSession = {
  names: string[];
  startingLife: number;
};

export function saveGameSession(session: GameSession): void {
  sessionStorage.setItem(GAME_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function loadGameSession(): GameSession | null {
  const raw = sessionStorage.getItem(GAME_SESSION_STORAGE_KEY);
  if (!raw) return null;
  try {
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
