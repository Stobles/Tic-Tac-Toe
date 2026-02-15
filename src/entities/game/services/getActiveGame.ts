import { GameInProgressEntity } from "../domain/types";
import { gameRepository } from "../repositories/game";

export async function getActiveGame(
  userId: string,
): Promise<GameInProgressEntity> {
  const game = await gameRepository.getGame({
    players: { some: { userId } },
    status: "inProgress",
  });

  console.log(game);
  return game as GameInProgressEntity;
}
