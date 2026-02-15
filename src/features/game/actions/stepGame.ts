"use server";

import { stepGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { GameId } from "@/kernel/ids";
import { left } from "@/shared/lib/either";
import { gameEvents } from "../../../entities/game/services/gameEvents";

export const stepGameAction = async (
  state: unknown,
  { gameId, index }: { gameId: GameId; index: number },
): Promise<unknown> => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return left("user-not-found" as const);
  }

  const result = await stepGame(gameId, currentUser, index);

  if (result.type === "right") {
    await gameEvents.emit({ type: "game-changed", data: result.value });

    return result;
  }

  return result;
};
