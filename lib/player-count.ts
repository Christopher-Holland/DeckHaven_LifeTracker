export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 6;

export function parsePlayerCountParam(raw: string | null): number | null {
  if (raw === null || raw === "") return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return null;
  if (n < MIN_PLAYERS || n > MAX_PLAYERS) return null;
  return n;
}
