"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);
    router.push("/setup");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-between bg-zinc-50 font-sans dark:bg-[#0f2a2c]">
      <div />

      <div className="flex flex-col items-center justify-center text-center">
        <Image
          src="/images/Deckhaven-Shield.png"
          alt="Logo"
          width={200}
          height={200}
        />

        <h1 className="text-4xl font-bold text-[#e8d5b8]">
          Life Tracker
        </h1>

        <p className="text-lg text-[#e8d5b8]">
          Control the game. Track the chaos.
        </p>

        <button
          onClick={handleGetStarted}
          disabled={isLoading}
          className="bg-[#e8d5b8] text-[#0f2a2c] px-4 py-2 rounded-md mt-4"
        >
          {isLoading ? "Loading..." : "Get Started"}
        </button>
      </div>

      <div className="pb-4">
        <p className="text-lg text-[#e8d5b8]">Powered by DeckHaven</p>
      </div>
    </div>
  );
}