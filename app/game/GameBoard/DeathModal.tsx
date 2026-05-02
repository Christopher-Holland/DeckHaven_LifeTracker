"use client";

type DeathModalProps = {
  isOpen: boolean;
  playerName: string;
  resultingLife: number;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeathModal({
  isOpen,
  playerName,
  resultingLife,
  onConfirm,
  onCancel,
}: DeathModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-10 rounded-2xl p-2"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl bg-[#0f2a2c]/95 p-4 text-center text-[#e8d5b8] shadow-xl ring-1 ring-[#e8d5b8]/25"
        role="dialog"
        aria-modal="true"
        aria-labelledby="death-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="death-modal-title" className="text-xl font-bold leading-tight">
          Are you dead?
        </h2>
        <p className="max-w-[28ch] text-sm leading-relaxed">
          {playerName} would drop to{" "}
          <span className="font-semibold tabular-nums">{resultingLife}</span>{" "}
          life.
        </p>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-red-800/90 px-4 py-2 text-sm font-semibold text-[#e8d5b8] transition hover:opacity-90"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md bg-[#e8d5b8] px-4 py-2 text-sm font-semibold text-[#0f2a2c] transition hover:opacity-90"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
