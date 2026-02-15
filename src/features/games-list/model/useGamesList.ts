import { GameIdleEntity } from "@/entities/game";
import { routes } from "@/kernel/routes";
import { useEventsSource } from "@/shared/lib/sse/client";

export const useGamesList = () => {
  const { data, isPending } = useEventsSource<GameIdleEntity[]>(
    routes.gamesStream(),
  );

  return { data, isPending };
};
