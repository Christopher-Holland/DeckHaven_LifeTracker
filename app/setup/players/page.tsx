"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
    DEFAULT_STARTING_LIFE,
    persistGameSnapshot,
    saveGameSession,
} from "@/lib/game-session";
import { parsePlayerCountParam } from "@/lib/player-count";

const iconButtonClass =
    "flex h-10 w-10 items-center justify-center rounded-md bg-[#e8d5b8] text-[#0f2a2c] shadow-sm transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-40";

const primaryButtonClass =
    "rounded-md bg-[#e8d5b8] px-4 py-2 text-[#0f2a2c] transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-50";

const inputClass =
    "w-full max-w-xs rounded-md border border-[#e8d5b8] bg-white/90 px-3 py-2 text-[#0f2a2c] placeholder:text-[#0f2a2c]/50 dark:bg-[#0f2a2c]/80 dark:text-[#e8d5b8] dark:placeholder:text-[#e8d5b8]/50";

function PlayersForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const playerCount = parsePlayerCountParam(searchParams.get("count"));

    const [names, setNames] = useState<string[]>(() =>
        playerCount !== null ? Array(playerCount).fill("") : [],
    );

    useEffect(() => {
        if (playerCount === null) {
            router.replace("/setup");
            return;
        }

        setNames((prev) => {
            if (prev.length === playerCount) return prev;
            return Array.from({ length: playerCount }, (_, i) => prev[i] ?? "");
        });
    }, [playerCount, router]);

    const getSeatLabel = (index: number) => {
        if (playerCount === 2) {
            return index === 0 ? "Across from you" : "Your side";
        }

        if (playerCount === 3) {
            return ["Top left", "Top right", "Your side"][index];
        }

        if (playerCount === 4) {
            return ["Top left", "Top right", "Bottom left", "Bottom right"][index];
        }

        if (playerCount === 5) {
            return ["Top left", "Top center", "Top right", "Bottom left", "Bottom right"][index];
        }

        if (playerCount === 6) {
            return ["Top left", "Top center", "Top right", "Bottom left", "Bottom center", "Bottom right"][index];
        }

        return `Seat ${index + 1}`;
    };

    const handleNext = () => {
        setIsLoading(true);

        const displayNames = names.map(
            (n, i) => n.trim() || `Player ${i + 1}`,
        );

        saveGameSession({
            names: displayNames,
            startingLife: DEFAULT_STARTING_LIFE,
        });

        persistGameSnapshot(
            displayNames,
            DEFAULT_STARTING_LIFE,
            displayNames.map(() => DEFAULT_STARTING_LIFE),
        );

        router.push("/game");
    };

    if (playerCount === null) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-[#0f2a2c]">
                <p className="text-[#e8d5b8]">Redirecting…</p>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-[#0f2a2c]">
            <div className="absolute top-4 left-4">
                <button
                    type="button"
                    className={iconButtonClass}
                    onClick={() => router.back()}
                    aria-label="Back"
                >
                    <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
                </button>
            </div>

            <div className="flex w-full max-w-md flex-col items-center gap-6 px-4 text-center">
                <div>
                    <h1 className="text-4xl font-bold text-[#e8d5b8]">
                        Seating order
                    </h1>

                    <p className="mt-2 text-sm text-[#e8d5b8]/75">
                        Enter players based on where they are sitting around the table.
                    </p>
                </div>

                <div className="flex w-full flex-col gap-3">
                    {names.map((name, i) => {
                        const seatLabel = getSeatLabel(i);

                        return (
                            <label
                                key={i}
                                className="flex w-full flex-col items-center gap-1 text-left"
                            >
                                <span className="w-full max-w-xs text-sm font-semibold text-[#e8d5b8]/80">
                                    {seatLabel}
                                </span>

                                <input
                                    type="text"
                                    name={`player-${i + 1}`}
                                    autoComplete="off"
                                    value={name}
                                    onChange={(e) => {
                                        const v = e.target.value;

                                        setNames((prev) => {
                                            const next = [...prev];
                                            next[i] = v;
                                            return next;
                                        });
                                    }}
                                    placeholder={`Player ${i + 1}`}
                                    className={inputClass}
                                />
                            </label>
                        );
                    })}
                </div>

                <button
                    type="button"
                    className={primaryButtonClass}
                    disabled={isLoading}
                    onClick={handleNext}
                >
                    {isLoading ? "Loading..." : "Start Game"}
                </button>
            </div>
        </div>
    );
}

export default function PlayersPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PlayersForm />
        </Suspense>
    );
}