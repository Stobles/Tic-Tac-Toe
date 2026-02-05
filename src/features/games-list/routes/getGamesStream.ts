import { getGameById, surrenderGame } from "@/entities/game/server";
import { GameId } from "@/kernel/ids";
import { createSseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";
import { gameEvents } from "../services/gameEvents";
import { getCurrentUser } from "@/entities/user/server";

export async function getGamesStream(req: NextRequest) {
  const user = await getCurrentUser();

  if (!game || !user) {
    return new Response("Game not found", { status: 404 });
  }

  const { response, write, handleDisconnect } = createSseStream(req);

  write(game);

  const unwatch = await gameEvents.addListener(game.id, (newGame) => {
    write(newGame.data);
  });

  handleDisconnect(async () => {
    unwatch();

    const result = await surrenderGame(game.id, user);

    if (result.type === "right") {
      console.log(`${user.login} сдался`);
      gameEvents.emit(result.value);
    }
  });

  return response;
}
