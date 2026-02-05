"use client";

import { GameEntity } from "@/entities/game";

export function GameField({
  game,
  onCellClick,
}: {
  game: GameEntity;
  onCellClick?: (index: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 items-center">
      {game.field.map((symbol, index) => (
        <button
          key={index}
          onClick={() => onCellClick?.(index)}
          className="border border-primary w-10 h-10 flex justify-center items-center cursor-pointer"
        >
          {symbol ?? ""}
        </button>
      ))}
    </div>
  );
}
