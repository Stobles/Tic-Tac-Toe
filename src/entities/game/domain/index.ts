import { Either, left, right } from "@/shared/lib/either";
import { Field } from "@/shared/types";
import {
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
  PlayerEntity,
} from "./types";
import { getGameCurrentSymbol, getPlayerSymbol } from "./helpers";

export const doStep = ({
  game,
  index,
  player,
}: {
  game: GameInProgressEntity;
  index: number;
  player: PlayerEntity;
}): Either<
  "not-player-symbol" | "game-cell-has-symbol" | "waiting-for-player",
  GameInProgressEntity | GameOverEntity | GameOverDrawEntity
> => {
  const currentSymbol = getGameCurrentSymbol(game);

  if (currentSymbol !== getPlayerSymbol(player, game)) {
    return left("not-player-symbol" as const);
  }

  if (game.field[index]) {
    return left("game-cell-has-symbol" as const);
  }

  if (game.players.some((pl) => pl.status === "disconnected")) {
    return left("waiting-for-player" as const);
  }

  const newField = game.field.map((cell, i) =>
    i === index ? currentSymbol : cell,
  );

  if (calculateWinner(newField)) {
    return right({
      ...game,
      field: newField,
      winner: player,
      status: "gameOver",
    } satisfies GameOverEntity);
  }

  if (isDraw(newField)) {
    return right({
      ...game,
      field: newField,
      status: "gameOverDraw",
    } satisfies GameOverDrawEntity);
  }

  return right({
    ...game,
    field: newField,
  } satisfies GameInProgressEntity);
};

export const isDraw = (field: Field) => {
  const winner = calculateWinner(field);

  if (!winner) {
    return field.every((cell) => cell != null);
  }

  return false;
};

export const calculateWinner = (field: Field) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (field[a] && field[a] === field[b] && field[a] === field[c]) {
      return field[a];
    }
  }
  return null;
};
