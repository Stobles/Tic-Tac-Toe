import { cn } from "../lib/css";
import { Field } from "../types";

interface TicTacBoardProps {
  board: Field;
  size?: "sm" | "md";
  className?: string;
  onCellClick?: (index: number) => void;
}

export function TicTacField({
  board,
  size = "sm",
  className,
  onCellClick,
}: TicTacBoardProps) {
  const cellSize = size === "sm" ? "h-8 w-8 text-sm" : "h-12 w-12 text-lg";

  return (
    <div
      className={cn("grid grid-cols-3 gap-1", className)}
      role="img"
      aria-label="Tic-tac-toe board"
    >
      {board.map((cell, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center justify-center rounded-md bg-secondary font-bold font-mono cursor-pointer",
            cellSize,
            cell === "X" && "text-primary",
            cell === "O" && "text-accent",
          )}
          onClick={() => onCellClick?.(i)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
}
