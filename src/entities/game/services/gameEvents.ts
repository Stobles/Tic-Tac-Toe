import { GameEntity } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { EventsChannel } from "@/shared/lib/rabbitmq";

type GameChanged = {
  type: "game-changed";
  data: GameEntity;
};

type GamesListChanged = {
  type: "games-list-changed";
};

type GameEvent = GameChanged | GamesListChanged;

type Listener<GameType> = (game: GameType) => void;

class GameEventService {
  events = new EventsChannel("game");

  addGameCreatedListener(listener: Listener<GamesListChanged>) {
    return this.events.consume("games-list-changed", (data) => {
      listener(data as GamesListChanged);
    });
  }

  addGameChangedListener(gameId: GameId, listener: Listener<GameChanged>) {
    return this.events.consume(gameId, (data) => {
      listener(data as GameChanged);
    });
  }

  emit(game: GameEvent) {
    if (game.type === "games-list-changed") {
      return this.events.emit("games-list-changed", {
        type: "games-list-changed",
      } satisfies GamesListChanged);
    }

    if (game.type === "game-changed") {
      return this.events.emit(game.data.id, {
        type: "game-changed",
        data: game.data,
      } satisfies GameChanged);
    }
  }
}

export const gameEvents = new GameEventService();
