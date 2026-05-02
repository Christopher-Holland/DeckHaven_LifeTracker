"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DEFAULT_STARTING_LIFE,
  loadGameSession,
  loadPersistedGame,
  persistGameSnapshot,
  type GameSession,
} from "@/lib/game-session";
import GameBoard from "./GameBoard/GameBoard";

export default function GamePage() {
  const router = useRouter();
  const [session, setSession] = useState<GameSession | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persisted = loadPersistedGame();
    if (persisted) {
      setSession({
        names: persisted.names,
        startingLife: persisted.startingLife,
      });
      setScores(persisted.scores);
      setHydrated(true);
      return;
    }

    const loaded = loadGameSession();
    if (!loaded || loaded.names.length === 0) {
      router.replace("/setup");
      setHydrated(true);
      return;
    }

    setSession(loaded);
    const initial = Array.from(
      { length: loaded.names.length },
      () => loaded.startingLife,
    );
    setScores(initial);
    persistGameSnapshot(loaded.names, loaded.startingLife, initial);
    setHydrated(true);
  }, [router]);

  useEffect(() => {
    if (!hydrated || !session || scores.length !== session.names.length) {
      return;
    }
    persistGameSnapshot(session.names, session.startingLife, scores);
  }, [hydrated, session, scores]);

  const updateLife = (index: number, delta: number) => {
    setScores((prev) => {
      const next = [...prev];
      if (next[index] === undefined) return prev;
      next[index] = next[index] + delta;
      return next;
    });
  };

  if (!hydrated || !session || scores.length !== session.names.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-[#0f2a2c]">
        <p className="text-[#e8d5b8]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-4 font-sans dark:bg-[#0f2a2c]">
      <GameBoard
        players={session.names.map((name, i) => ({
          id: i,
          name,
          life: scores[i] ?? DEFAULT_STARTING_LIFE,
        }))}
        onLifeChange={updateLife}
      />
    </div>
  );
}
