"use client";

import { GameEntity } from "@/entities/game";
import { cn } from "@/shared/lib/css";

export function GameField({
  game,
  onCellClick,
}: {
  game: GameEntity;
  onCellClick?: (index: number) => void;
}) {
  return (
    <div className={cn("grid grid-cols-3 items-center relative")}>
      {game.field.map((symbol, index) => (
        <button
          key={index}
          onClick={() => onCellClick?.(index)}
          className="border border-primary w-10 h-10 flex justify-center items-center cursor-pointer z-0"
        >
          {symbol ?? ""}
        </button>
      ))}
    </div>
  );
}
