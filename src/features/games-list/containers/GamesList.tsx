import { getIdleGames } from "@/entities/game/server";
import { Layout } from "../ui/Layout";
import { GameCard } from "../ui/GameCard";
import { CreateButton } from "./CreateButton";

export async function GamesList() {
  const games = await getIdleGames();

  return (
    <Layout actions={<CreateButton />}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          login={game.creator.login}
          rating={game.creator.rating}
        />
      ))}
    </Layout>
  );
}
