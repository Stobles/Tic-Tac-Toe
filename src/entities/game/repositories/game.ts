import { db } from "@/shared/lib/db";
import { GameEntity, GameIdleEntity, GameOverEntity } from "../domain";
import { Game, User } from "@/prisma/client";

import { z } from "zod";
import { GameWhereInput } from "@/prisma/models";
import { removePassword } from "@/shared/lib/password";

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & { players: User[]; winner?: User | null }
): GameEntity {
  const players = game.players.map(removePassword);
  switch (game.status) {
    case "idle":
      const [creator] = players;

      if (!creator) throw new Error("The game must have a creator");
      return {
        id: game.id,
        creator,
        status: game.status,
      } satisfies GameIdleEntity;
    case "inProgress":
    case "gameOverDraw":
      return {
        id: game.id,
        players: players,
        field: fieldSchema.parse(game.field),
        status: game.status,
      };
    case "gameOver":
      if (!game.winner) throw new Error("Winner should be in game over");
      return {
        id: game.id,
        players: players,
        field: fieldSchema.parse(game.field),
        status: game.status,
        winner: removePassword(game.winner),
      } satisfies GameOverEntity;
  }
}

async function gamesList(where?: GameWhereInput): Promise<GameEntity[]> {
  const games = await db.game.findMany({
    where,
    include: {
      winner: true,
      players: true,
    },
  });

  return games.map(dbGameToGameEntity);
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await db.game.create({
    data: {
      status: game.status,
      id: game.id,
      field: Array(9).fill(null),
      players: {
        connect: {
          id: game.creator.id,
        },
      },
    },
    include: {
      players: true,
      winner: true,
    },
  });

  return dbGameToGameEntity(createdGame);
}

export const gameRepository = {
  gamesList,
  createGame,
};
