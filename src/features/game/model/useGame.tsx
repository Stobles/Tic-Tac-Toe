import { GameEntity } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { useEventsSource } from "@/shared/lib/sse/client";

export function useGame(gameId: GameId) {
  const { data, isPending } = useEventsSource<GameEntity>(
    `/game/${gameId}/stream`,
  );

  return {
    game: data,
    isPending,
  };
}
