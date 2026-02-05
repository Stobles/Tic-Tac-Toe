import { getIdleGames } from "@/entities/game/server";
import { Layout } from "../ui/Layout";
import { GameCard } from "../ui/GameCard";
import { CreateButton } from "./CreateButton";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { routes } from "@/kernel/routes";

export async function GamesList() {
  const games = await getIdleGames();

  return (
    <Layout actions={<CreateButton />}>
      {games.map((game) => (
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
    </Layout>
  );
}
