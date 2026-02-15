"use client";

import { GameId } from "@/kernel/ids";
import { GameLayout } from "../ui/GameLayout";
import { GamePlayers } from "../ui/GamePlayers";
import { GameStatus } from "../ui/GameStatus";
import { GameField } from "../ui/GameField";
import { useGame } from "../model/useGame";
import { GameEntity, PlayerEntity } from "@/entities/game";
import { TicTacField } from "@/shared/components/TicTacField";

export const GameClient = ({
  defaultGame,
  player,
}: {
  defaultGame: GameEntity;
  player: PlayerEntity;
}) => {
  const { game = defaultGame, step } = useGame(defaultGame.id, player);

  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<TicTacField size="md" board={game.field} onCellClick={step} />}
    />
  );
};
