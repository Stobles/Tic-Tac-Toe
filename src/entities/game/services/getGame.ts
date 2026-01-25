import { GameId } from "@/kernel/ids";
import { gameRepository } from "../repositories/game";

export const getGameById = async (gameId: GameId) => {
  return gameRepository.getGame({ id: gameId });
};
