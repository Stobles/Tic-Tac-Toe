"use client";

import { Layout } from "../ui/Layout";
import { GameCard } from "../ui/GameCard";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { routes } from "@/kernel/routes";
import { GameIdleEntity } from "@/entities/game";
import { useGamesList } from "../model/useGamesList";

export function GamesListClient({ games }: { games: GameIdleEntity[] }) {
  const { data = games } = useGamesList();
  return (
    <Layout>
      <>
        {data.map((game) => (
          <GameCard
            key={game.id}
            login={game.creator.login}
            rating={game.creator.rating}
            actions={
              <Button asChild>
                <Link href={routes.game(game.id)}>Подключиться</Link>
              </Button>
            }
          />
        ))}
      </>
    </Layout>
  );
}
