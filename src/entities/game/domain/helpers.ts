import { GameSymbol, GameSymbols } from "@/shared/types";
import {
  GameEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
  PlayerEntity,
} from "./types";

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

export const getPlayer = (game: GameEntity, userId: string) => {
  if (game.status === "idle") return game.creator;

  return game.players.find((pl) => pl.id === userId);
};

export const hasPlayerForfeited = (
  game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity,
) => {
  return game.players.some((pl) => pl.status === "disconnected");
};
