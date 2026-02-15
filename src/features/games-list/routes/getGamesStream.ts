import { getIdleGames } from "@/entities/game/server";
import { createSseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";
import { gameEvents } from "@/entities/game/services/gameEvents";
import { getCurrentUser } from "@/entities/user/server";

export async function getGamesStream(req: NextRequest) {
  const user = await getCurrentUser();
  const games = await getIdleGames();

  if (!games || !user) {
    return new Response("Games not found", { status: 404 });
  }

  const { response, write, handleDisconnect } = createSseStream(req);

  write(games);

  const unwatch = await gameEvents.addGameCreatedListener(async () => {
    const newGames = await getIdleGames();
    write(newGames);
  });

  handleDisconnect(async () => {
    unwatch();
  });

  return response;
}
