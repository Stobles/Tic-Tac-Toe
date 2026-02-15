import { freezeGame, getGameById, surrenderGame } from "@/entities/game/server";
import { GameId } from "@/kernel/ids";
import { createSseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";
import { gameEvents } from "../../../entities/game/services/gameEvents";
import { getCurrentUser } from "@/entities/user/server";
import { GameHelpers } from "@/entities/game";
import { revalidatePath } from "next/cache";

export async function getGameStream(
  req: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) {
  const { id } = await params;

  const game = await getGameById(id);
  const user = await getCurrentUser();

  if (!game || !user) {
    return new Response("Game not found", { status: 404 });
  }

  const { response, write, handleDisconnect } = createSseStream(req);

  write(game);

  const unwatch = await gameEvents.addGameChangedListener(
    game.id,
    (newGame) => {
      write(newGame.data);
    },
  );

  handleDisconnect(async () => {
    unwatch();

    const currentPlayer = GameHelpers.getPlayer(game, user.id);

    if (!currentPlayer) return;

    const result = await freezeGame(game.id, user, currentPlayer.connectionVer);

    setTimeout(async () => {
      const gameResult = await getGameById(game.id);

      if (
        gameResult?.status === "inProgress" &&
        GameHelpers.hasPlayerForfeited(gameResult)
      ) {
        const surrenderResult = await surrenderGame(game.id, user);

        if (surrenderResult.type === "right") {
          gameEvents.emit({
            type: "game-changed",
            data: surrenderResult.value,
          });
        }
      }
    }, 100000);

    if (result.type === "right") {
      gameEvents.emit({ type: "game-changed", data: result.value });
    }
  });

  return response;
}
