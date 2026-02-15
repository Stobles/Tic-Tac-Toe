import { GameId } from "@/kernel/ids";
import { GameClient } from "./GameClient";
import { getCurrentUser } from "@/entities/user/server";
import { getGameById, startGame } from "@/entities/game/server";
import { gameEvents } from "../../../entities/game/services/gameEvents";
import { routes } from "@/kernel/routes";
import { redirect } from "next/navigation";
import { reconnectToGame } from "@/entities/game/services/reconnectToGame";

export const Game = async ({ gameId }: { gameId: GameId }) => {
  const user = await getCurrentUser();

  let game = await getGameById(gameId);

  if (!game || !user) {
    redirect(routes.home());
  }

  if (user && game.status === "idle") {
    const startGameResult = await startGame(gameId, user);

    if (startGameResult.type === "right") {
      game = startGameResult.value;
      gameEvents.emit({ type: "game-changed", data: startGameResult.value });
      gameEvents.emit({ type: "games-list-changed" });
    }
  }

  if (user) {
    const connectToGameResult = await reconnectToGame(gameId, user);

    if (connectToGameResult.type === "right") {
      game = connectToGameResult.value;

      gameEvents.emit({
        type: "game-changed",
        data: connectToGameResult.value,
      });
    }
  }
  return <GameClient defaultGame={game} player={user} />;
};
