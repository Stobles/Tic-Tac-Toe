import { getIdleGames } from "@/entities/game/server";
import { GamesListClient } from "./GamesListClient";
import { db } from "@/shared/lib/db";
import { getCurrentUser } from "@/entities/user/server";
import { routes } from "@/kernel/routes";
import { redirect } from "next/navigation";

export async function GamesList() {
  const games = await getIdleGames();

  const user = await getCurrentUser();

  if (!user) {
    redirect(routes.signIn());
  }

  const game = await db.game.findFirst({
    where: {
      status: "inProgress",
      players: { some: { userId: user.id } },
    },
    include: { players: true },
  });

  return <GamesListClient games={games} />;
}
