import { GameIdleEntity } from "../domain/types";
import { gameRepository } from "../repositories/game";

export async function getIdleGames(): Promise<GameIdleEntity[]> {
  const games = await gameRepository.gamesList({ status: "idle" });
  return games as GameIdleEntity[];
}
