export type Left<L> = {
  type: "left";
  error: L;
};

export type Right<R> = {
  type: "right";
  value: R;
};

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L>(error: L): Left<L> => {
  return {
    type: "left",
    error,
  };
};

export const right = <R>(value: R): Right<R> => {
  return {
    type: "right",
    value,
  };
};

export const mapLeft = <L, L2, R>(
  either: Either<L, R>,
  fn: (error: L) => L2,
): Either<L2, R> => {
  if (either.type === "left") {
    return left(fn(either.error));
  }

  return either;
};

export const mapRight = <L, R, R2>(
  either: Either<L, R>,
  fn: (value: R) => R2,
): Either<L, R2> => {
  if (either.type === "right") {
    return right(fn(either.value));
  }

  return either;
};

export const matchEither = <L, R, V>(
  either: Either<L, R>,
  matchers: {
    left: (error: NoInfer<L>) => V;
    right: (value: NoInfer<R>) => V;
  },
): V => {
  if (either.type === "left") {
    return matchers.left(either.error);
  }

  return matchers.right(either.value);
};
