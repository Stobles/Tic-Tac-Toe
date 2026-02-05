import { GameId } from "@/kernel/ids";
import { PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game";
import { left, right } from "@/shared/lib/either";

export async function surrenderGame(gameId: GameId, player: PlayerEntity) {
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

  return right(
    await gameRepository.saveGame({
      ...game,
      status: "gameOver",
      winner: game.players.find((pl) => pl.id != player.id)!,
    }),
  );
}
