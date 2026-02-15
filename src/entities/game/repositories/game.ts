import { db } from "@/shared/lib/db";
import {
  GameEntity,
  GameIdleEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
  PlayerEntity,
} from "../domain/types";
import { Game, GamePlayer, User } from "@/prisma/client";

import { z } from "zod";
import { GamePlayerWhereUniqueInput, GameWhereInput } from "@/prisma/models";
import { GameId } from "@/kernel/ids";

const fieldSchema = z.array(z.union([z.string(), z.null()]));

const gameInclude = {
  winner: { include: { user: true } },
  players: { include: { user: true } },
};

function dbGameToGameEntity(
  game: Game & {
    players: Array<GamePlayer & { user: User }>;
    winner?: (GamePlayer & { user: User }) | null;
  },
): GameEntity {
  const players = game.players
    .sort((a, b) => a.index - b.index)
    .map(dbPlayerToPlayer);
  switch (game.status) {
    case "idle":
      const [creator] = players;

      if (!creator) throw new Error("The game must have a creator");
      return {
        id: game.id,
        creator,
        field: Array(9).fill(null),
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
        winner: dbPlayerToPlayer(game.winner),
      } satisfies GameOverEntity;
  }
}

async function gamesList(where?: GameWhereInput): Promise<GameEntity[]> {
  const games = await db.game.findMany({
    where,
    include: gameInclude,
  });

  return games.map(dbGameToGameEntity);
}

async function getGame(where?: GameWhereInput) {
  const game = await db.game.findFirst({
    where,
    include: gameInclude,
  });

  if (game) {
    return dbGameToGameEntity(game);
  }

  return undefined;
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await db.game.create({
    data: {
      status: game.status,
      id: game.id,
      field: game.field,
      players: {
        create: {
          index: 0,
          userId: game.creator.id,
          status: "connected",
        },
      },
    },
    include: gameInclude,
  });

  return dbGameToGameEntity(createdGame);
}

async function startGame(
  gameId: GameId,
  player: PlayerEntity,
): Promise<GameEntity> {
  return dbGameToGameEntity(
    await db.game.update({
      where: { id: gameId },
      data: {
        players: {
          create: {
            index: 1,
            userId: player.id,
            status: "connected",
          },
        },
        status: "inProgress",
      },
      include: gameInclude,
    }),
  );
}

async function saveGame(
  game: GameInProgressEntity | GameOverDrawEntity | GameOverEntity,
): Promise<GameEntity> {
  const winnerId =
    game.status === "gameOver"
      ? await db.gamePlayer
          .findFirstOrThrow({
            where: { userId: game.winner?.id },
          })
          .then((value) => value.id)
      : undefined;
  return dbGameToGameEntity(
    await db.game.update({
      where: { id: game.id },
      data: {
        status: game.status,
        field: game.field,
        winnerId: winnerId,
      },
      include: gameInclude,
    }),
  );
}

async function updatePlayer(
  gameId: GameId,
  player: PlayerEntity,
  where?: GamePlayerWhereUniqueInput,
) {
  await db.gamePlayer.update({
    where: { gameId_userId: { gameId, userId: player.id }, ...where },
    data: {
      status: player.status,
      connectionVer: { increment: 1 },
    },
  });
}

export const dbPlayerToPlayer = (
  db: GamePlayer & { user: User },
): PlayerEntity => {
  return {
    id: db.user.id,
    login: db.user.login,
    rating: db.user.rating,
    status: db.status,
    connectionVer: db.connectionVer,
  };
};

export const gameRepository = {
  gamesList,
  createGame,
  getGame,
  startGame,
  saveGame,
  updatePlayer,
};
