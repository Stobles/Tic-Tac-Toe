import { GameEntity } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { EventsChannel } from "@/shared/lib/rabbitmq";

type GameEventTypes = "game-changed" | "game-created";

type GameEvent = {
  type: GameEventTypes;
  data: GameEntity;
};

type Listener = (game: GameEvent) => void;

class GameEventService {
  events = new EventsChannel("game");

  addListener(gameId: GameId, listener: Listener) {
    return this.events.consume(gameId, (data) => {
      listener(data as GameEvent);
    });
  }

  emit(game: GameEntity) {
    return this.events.emit(game.id, {
      type: "game-changed",
      data: game,
    } satisfies GameEvent);
  }
}

export const gameEvents = new GameEventService();
