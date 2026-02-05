import { GameId, UserId } from "@/kernel/ids";
import { Either, left, right } from "@/shared/lib/either";

export type GameEntity =
  | GameIdleEntity
  | GameInProgressEntity
  | GameOverEntity
  | GameOverDrawEntity;

export type GameIdleEntity = {
  id: GameId;
  creator: PlayerEntity;
  field: Field;
  status: "idle";
};

export type GameInProgressEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "inProgress";
};

export type GameOverEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "gameOver";
  winner: PlayerEntity;
};

export type GameOverDrawEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "gameOverDraw";
};

export type PlayerEntity = {
  id: UserId;
  login: string;
  rating: number;
};

export type Field = Cell[];

export type Cell = GameSymbol | null;
export type GameSymbol = string;

const GameSymbols = {
  X: "X",
  O: "O",
};

export const getGameCurrentSymbol = (
  game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity,
) => {
  const symbols = game.field.filter((s) => s != null).length;
  return symbols % 2 === 0 ? GameSymbols.X : GameSymbols.O;
};

export const getNextSymbol = (gameSymbol: GameSymbol) => {
  return gameSymbol === GameSymbols.X ? GameSymbols.O : GameSymbols.X;
};

export const getPlayerSymbol = (
  player: PlayerEntity,
  game: GameInProgressEntity | GameOverEntity,
) => {
  const index = game.players.findIndex((p) => p.id === player.id);

  return { 0: GameSymbols.X, 1: GameSymbols.O }[index];
};

export const doStep = ({
  game,
  index,
  player,
}: {
  game: GameInProgressEntity;
  index: number;
  player: PlayerEntity;
}): Either<
  "not-player-symbol" | "game-cell-has-symbol",
  GameInProgressEntity | GameOverEntity | GameOverDrawEntity
> => {
  const currentSymbol = getGameCurrentSymbol(game);

  if (currentSymbol !== getPlayerSymbol(player, game)) {
    return left("not-player-symbol" as const);
  }

  if (game.field[index]) {
    return left("game-cell-has-symbol" as const);
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
