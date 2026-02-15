import { GameId } from "@/kernel/ids";
import { GameEntity, PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game";
import { left, right } from "@/shared/lib/either";

export async function freezeGame(
  gameId: GameId,
  player: PlayerEntity,
  connectionVer: number | undefined,
) {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left("game-not-found" as const);
  }

  if (game.status != "inProgress") {
    return left("game-not-in-progress" as const);
  }

  if (!game.players.some((pl) => pl.id === player.id) || !connectionVer) {
    return left("player-is-not-in-game" as const);
  }

  await gameRepository.updatePlayer(
    gameId,
    {
      ...player,
      status: "disconnected",
    },
    { connectionVer },
  );

  return right((await gameRepository.getGame({ id: gameId })) as GameEntity);
}
