import PlayerCard from "./PlayerCard";

type Player = {
    id: number;
    name: string;
    life: number;
};

type GameBoardProps = {
    players: Player[];
    onLifeChange: (id: number, amount: number) => void;
};

export default function GameBoard({ players, onLifeChange }: GameBoardProps) {
    const playerCount = players.length;

    const boardClasses =
        playerCount <= 2
            ? "grid-cols-1"
            : playerCount <= 5
                ? "grid-cols-2"
                : "grid-cols-3";

    const getCardSpan = (index: number) => {
        if (playerCount === 3 && index === 2) {
            return "col-span-2 max-w-2xl justify-self-center";
        }

        if (playerCount === 5 && index === 4) {
            return "col-span-2 w-full";
        }

        return "";
    };

    const getRotation = (index: number) => {
        // Special tabletop layout for 5 players only:
        // 1 & 3 on left side, 2 & 4 on right side, 5 at head.
        if (playerCount === 5) {
            if (index === 0 || index === 2) return "rotate-90";
            if (index === 1 || index === 3) return "-rotate-90";
            return "";
        }

        if (playerCount <= 2) {
            return index === 0 ? "rotate-180" : "";
        }

        if (playerCount === 3 || playerCount === 4) {
            return index < 2 ? "rotate-180" : "";
        }

        if (playerCount === 6) {
            return index < 3 ? "rotate-180" : "";
        }

        return "";
    };

    return (
        <div
            className={`grid min-h-screen w-full place-items-center gap-8 p-4 ${boardClasses}`}
        >
            {players.map((player, index) => (
                <div
                    key={player.id}
                    className={`flex w-full items-center justify-center ${getCardSpan(index)}`}
                >
                    <PlayerCard
                        name={player.name}
                        life={player.life}
                        rotation={`${getRotation(index)} origin-center`}
                        onLifeChange={(amount) => onLifeChange(player.id, amount)}
                    />
                </div>
            ))}
        </div>
    );
}