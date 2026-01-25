"use client";

import { GameId } from "@/kernel/ids";
import { GameLayout } from "../ui/GameLayout";
import { GamePlayers } from "../ui/GamePlayers";
import { GameStatus } from "../ui/GameStatus";
import { GameField } from "../ui/GameField";
import { useGame } from "../model/useGame";

export const Game = ({ gameId }: { gameId: GameId }) => {
  const { game, isPending } = useGame(gameId);

  if (!game || isPending) {
    return <GameLayout status="Загрузка..." />;
  }

  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
};
