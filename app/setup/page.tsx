"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type GameSetup = {
  numberOfPlayers: number;
  minNumberOfPlayers: number;
  maxNumberOfPlayers: number;
  playerNames: string[];
  playerScores: number[];
  startingLife: number;
};

const iconButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-md bg-[#e8d5b8] text-[#0f2a2c] shadow-sm transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-40";

const primaryButtonClass =
  "rounded-md bg-[#e8d5b8] px-4 py-2 text-[#0f2a2c] transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50";

export default function Setup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    setIsLoading(true);
    router.push("/setup/players");
  };

  const [gameSetup, setGameSetup] = useState<GameSetup>({
    numberOfPlayers: 2,
    minNumberOfPlayers: 2,
    maxNumberOfPlayers: 6,
    playerNames: [],
    playerScores: [],
    startingLife: 40,
  });

  const { numberOfPlayers, minNumberOfPlayers, maxNumberOfPlayers } = gameSetup;
  const canDecrease = numberOfPlayers > minNumberOfPlayers;
  const canIncrease = numberOfPlayers < maxNumberOfPlayers;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-[#0f2a2c]">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold text-[#e8d5b8]">
          Number of players?
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center">
            {canDecrease ? (
              <button
                type="button"
                aria-label="Decrease number of players"
                className={iconButtonClass}
                onClick={() =>
                  setGameSetup((prev) => ({
                    ...prev,
                    numberOfPlayers: Math.max(
                      prev.minNumberOfPlayers,
                      prev.numberOfPlayers - 1,
                    ),
                  }))
                }
              >
                <Minus className="h-5 w-5" strokeWidth={2.5} />
              </button>
            ) : null}
          </div>

          <span
            className="min-w-[2ch] text-3xl font-semibold tabular-nums text-[#e8d5b8]"
            aria-live="polite"
          >
            {numberOfPlayers}
          </span>

          <div className="flex h-10 w-10 items-center justify-center">
            {canIncrease ? (
              <button
                type="button"
                aria-label="Increase number of players"
                className={iconButtonClass}
                onClick={() =>
                  setGameSetup((prev) => ({
                    ...prev,
                    numberOfPlayers: Math.min(
                      prev.maxNumberOfPlayers,
                      prev.numberOfPlayers + 1,
                    ),
                  }))
                }
              >
                <Plus className="h-5 w-5" strokeWidth={2.5} />
              </button>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          className={`${primaryButtonClass} mt-4`}
          disabled={isLoading}
          onClick={handleNext}
        >
          {isLoading ? "Loading..." : "Next"}
        </button>
      </div>
    </div>
  );
}
