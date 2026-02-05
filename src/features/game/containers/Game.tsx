import { GameId } from "@/kernel/ids";
import { GameClient } from "./GameClient";
import { getCurrentUser } from "@/entities/user/server";
import { getGameById, startGame } from "@/entities/game/server";
import { gameEvents } from "../../../entities/game/services/gameEvents";
import { routes } from "@/kernel/routes";
import { redirect } from "next/navigation";

export const Game = async ({ gameId }: { gameId: GameId }) => {
  const user = await getCurrentUser();

  let game = await getGameById(gameId);

  if (!game || !user) {
    redirect(routes.home());
  }

  if (user) {
    const startGameResult = await startGame(gameId, user);

    if (startGameResult.type === "right") {
      game = startGameResult.value;
      gameEvents.emit(startGameResult.value);
    }
  }
  return <GameClient defaultGame={game} player={user} />;
};
