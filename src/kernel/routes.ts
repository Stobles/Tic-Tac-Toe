import { GameId } from "./ids";

export const routes = {
  home: () => `/`,
  signIn: () => `/sign-in`,
  signUp: () => `/sign-up`,
  game: (gameId: GameId) => `/game/${gameId}`,
  gameStream: (gameId: GameId) => `/game/${gameId}/stream`,
};
