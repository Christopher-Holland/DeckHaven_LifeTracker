"use client";

import { useState } from "react";
import DeathModal from "./DeathModal";
import { Skull, Ghost, Flame } from "lucide-react";

type PlayerCardProps = {
    name: string;
    life: number;
    rotation?: string;
    onLifeChange: (amount: number) => void;
};

export default function PlayerCard({
    name,
    life,
    rotation = "",
    onLifeChange,
}: PlayerCardProps) {
    const [deathModalOpen, setDeathModalOpen] = useState(false);
    const [pendingDelta, setPendingDelta] = useState<number | null>(null);

    const tryChangeLife = (delta: number) => {
        if (delta >= 0) {
            onLifeChange(delta);
            return;
        }

        const nextLife = life + delta;

        if (nextLife > 0) {
            onLifeChange(delta);
            return;
        }

        setPendingDelta(delta);
        setDeathModalOpen(true);
    };

    const confirmLethalDamage = () => {
        if (pendingDelta !== null) {
            onLifeChange(pendingDelta);
        }

        setPendingDelta(null);
        setDeathModalOpen(false);
    };

    const cancelLethalDamage = () => {
        setPendingDelta(null);
        setDeathModalOpen(false);
    };

    const resultingLife = pendingDelta !== null ? life + pendingDelta : life;

    return (
        <div
            className={`relative flex min-h-72 w-full max-w-xl overflow-hidden rounded-2xl border border-[#e8d5b8]/20 bg-white/5 text-[#e8d5b8] shadow-lg ${rotation}`}
        >
            <DeathModal
                isOpen={deathModalOpen}
                playerName={name}
                resultingLife={resultingLife}
                onConfirm={confirmLethalDamage}
                onCancel={cancelLethalDamage}
            />

            <button
                type="button"
                onClick={() => tryChangeLife(-1)}
                className="flex flex-1 items-center justify-center bg-red-800/40 text-5xl font-bold transition hover:bg-white/10 active:bg-white/20"
            >
                -
            </button>

            <div className="flex w-44 flex-col items-center justify-center px-4 text-center">
                <h2 className="mb-3 text-xl font-semibold">{name}</h2>

                {life > 0 ? (
                    <p className="text-7xl font-bold leading-none tabular-nums">{life}</p>
                ) : (
                    <>
                        <Ghost className="w-12 h-12 text-red-400 opacity-80 animate-pulse" />
                        <p className="text-5xl font-bold leading-none tabular-nums">DEAD</p>
                    </>
                )}
            </div>

            <button
                type="button"
                onClick={() => tryChangeLife(1)}
                className="flex flex-1 items-center justify-center bg-green-800/40 text-5xl font-bold transition hover:bg-white/10 active:bg-white/20"
            >
                +
            </button>
        </div>
    );
}