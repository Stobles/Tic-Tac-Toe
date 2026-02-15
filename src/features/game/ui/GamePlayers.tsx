import { GameEntity } from "@/entities/game";
import { PlayerEntity, PlayerStatus } from "@/entities/game";
import React from "react";

export function GamePlayers({ game }: { game: GameEntity }) {
  const firstPlayer = game.status === "idle" ? game.creator : game.players[0];
  const secondPlayer = game.status === "idle" ? undefined : game.players[1];

  const getPlayerStatus = (player: PlayerEntity) => {
    const playerStatus: Record<PlayerStatus, React.ReactNode> = {
      connected: `${player.login} (${player.rating})`,
      disconnected: `${player.login} - Ждем...`,
      forfeited: `${player.login} - Сдался`,
    };

    return playerStatus[player.status!];
  };
  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="text-lg">X - {getPlayerStatus(firstPlayer)}</div>
      <div className="text-lg">
        O - {secondPlayer?.login ? getPlayerStatus(secondPlayer) : "Ожидание"}
      </div>
    </div>
  );
}
