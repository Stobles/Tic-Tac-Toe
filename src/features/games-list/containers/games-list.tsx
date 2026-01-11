import { getIdleGames } from "@/entities/game/server";
import { RootLayout } from "../ui/RootLayout";
import { GameCard } from "../ui/GameCard";

export async function GamesList() {
  const games = await getIdleGames();

  return (
    <RootLayout>
      {games.map((game) => (
        <GameCard
          key={game.id}
          login={game.creator.login}
          rating={game.creator.rating}
        />
      ))}
    </RootLayout>
  );
}
