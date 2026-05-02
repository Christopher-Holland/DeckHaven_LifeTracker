"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DEFAULT_STARTING_LIFE,
  loadGameSession,
  type GameSession,
} from "@/lib/game-session";
import PlayerCard from "./GameBoard/PlayerCard";

export default function GamePage() {
  const router = useRouter();
  const [session, setSession] = useState<GameSession | null>(null);
  const [scores, setScores] = useState<number[]>([]);

  useEffect(() => {
    const loaded = loadGameSession();
    if (!loaded || loaded.names.length === 0) {
      router.replace("/setup");
      return;
    }
    setSession(loaded);
    setScores(
      Array.from({ length: loaded.names.length }, () => loaded.startingLife),
    );
  }, [router]);

  const updateLife = (index: number, delta: number) => {
    setScores((prev) => {
      const next = [...prev];
      if (next[index] === undefined) return prev;
      next[index] = next[index] + delta;
      return next;
    });
  };

  if (!session || scores.length !== session.names.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-[#0f2a2c]">
        <p className="text-[#e8d5b8]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-4 font-sans dark:bg-[#0f2a2c]">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {session.names.map((name, i) => (
          <PlayerCard
            key={i}
            name={name}
            life={scores[i] ?? DEFAULT_STARTING_LIFE}
            onLifeChange={(amount) => updateLife(i, amount)}
            rotation="rotate-0"
          />
        ))}
      </div>
    </div>
  );
}
