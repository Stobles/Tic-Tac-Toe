export type Field = Cell[];

export type Cell = GameSymbol | null;
export type GameSymbol = string;

export const GameSymbols = {
  X: "X",
  O: "O",
};
