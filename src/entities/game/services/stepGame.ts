import { GameId } from "@/kernel/ids";
import { doStep, PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game";
import { left, right } from "@/shared/lib/either";

export async function stepGame(
  gameId: GameId,
  player: PlayerEntity,
  index: number,
) {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left("game-not-found" as const);
  }

  if (game.status != "inProgress") {
    return left("game-not-in-progress" as const);
  }

  if (!game.players.some((pl) => pl.id === player.id)) {
    return left("player-is-not-in-game" as const);
  }

  const stepResult = doStep({ game, index, player });

  if (stepResult.type === "left") {
    return stepResult;
  }

  return right(await gameRepository.saveGame(stepResult.value));
}
