import { GameId } from "@/kernel/ids";
import { GameEntity, PlayerEntity } from "../domain/types";
import { gameRepository } from "../repositories/game";
import { left, right } from "@/shared/lib/either";

export async function reconnectToGame(gameId: GameId, player: PlayerEntity) {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left("game-not-found" as const);
  }

  if (game.status != "inProgress") {
    return left("game-not-in-progress" as const);
  }

  if (!game.players.some((pl) => pl.id != player.id)) {
    return left("player-is-not-in-the-game" as const);
  }

  await gameRepository.updatePlayer(gameId, { ...player, status: "connected" });

  return right((await gameRepository.getGame({ id: gameId })) as GameEntity);
}
