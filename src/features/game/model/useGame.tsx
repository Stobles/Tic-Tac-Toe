import { GameEntity } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { routes } from "@/kernel/routes";
import { useEventsSource } from "@/shared/lib/sse/client";
import { useOptimistic, useTransition } from "react";
import { stepGameAction } from "../actions/stepGame";
import { doStep, PlayerEntity } from "@/entities/game/domain";
import { matchEither } from "@/shared/lib/either";

export function useGame(gameId: GameId, player: PlayerEntity) {
  const { data, isPending } = useEventsSource<GameEntity>(
    routes.gameStream(gameId),
  );

  const [isStepPending, startTransition] = useTransition();

  const [optimisticGame, dispatchOptimistic] = useOptimistic<
    GameEntity | undefined,
    number
  >(data, (game, index: number) => {
    if (!game || game.status != "inProgress") {
      return game;
    }
    return matchEither(doStep({ game, index, player }), {
      left: () => game,
      right: (value) => value,
    });
  });

  const step = (index: number) => {
    startTransition(async () => {
      dispatchOptimistic(index);
      await stepGameAction({}, { gameId, index });
    });
  };

  return {
    game: optimisticGame,
    step,
    isPending,
    isStepPending,
  };
}
