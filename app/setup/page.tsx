export default function Setup() {
    
    type gameSetup = {
        numberOfPlayers: number;
        playerNames: string[];
        playerScores: number[];
        startingLife: 40;
    }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#0f2a2c]">
      <div />

      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-[#e8d5b8]">Number of players?

            </h1>
        </div>
      </div>
    </div>
  );
}