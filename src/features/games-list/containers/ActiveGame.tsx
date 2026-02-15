import { getActiveGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user/server";
import { routes } from "@/kernel/routes";
import { redirect } from "next/navigation";
import { ActiveGameCard } from "../ui/ActiveGameCard";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export async function ActiveGame() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(routes.home());
  }

  const activeGame = await getActiveGame(user?.id);

  if (!activeGame) return;

  return (
    <ActiveGameCard
      game={activeGame}
      user={user}
      actions={
        <Button asChild>
          <Link href={routes.game(activeGame.id)}>Подключиться</Link>
        </Button>
      }
    />
  );
}
