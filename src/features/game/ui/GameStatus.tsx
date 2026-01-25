import { GameEntity } from "@/entities/game";
import { getGameCurrentStep } from "@/entities/game/domain";

export function GameStatus({ game }: { game: GameEntity }) {
  switch (game.status) {
    case "idle":
      return <div className="text-lg">Ожидание игрока</div>;
    case "inProgress": {
      const currentSymbol = getGameCurrentStep(game);
      return <div className="text-lg">Ход: {currentSymbol}</div>;
    }
    case "gameOver": {
      const currentSymbol = getGameCurrentStep(game);
      return <div className="text-lg">Победитель: {currentSymbol}</div>;
    }
    case "gameOverDraw":
      return <div className="text-lg">Ничья</div>;
  }
}
