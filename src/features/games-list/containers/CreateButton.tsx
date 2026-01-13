"use client";

import { Button } from "@/shared/ui/button";
import { createGameAction } from "../actions/createGame";
import { useActionState } from "@/shared/lib/react";
import { mapLeft, right } from "@/shared/lib/either";
import { startTransition, useEffect } from "react";
import { toast } from "sonner";

export function CreateButton() {
  const [data, dispatch, isPending] = useActionState(
    createGameAction,
    right(undefined)
  );

  useEffect(() => {
    const message = mapLeft(
      data,
      (e) =>
        ({
          "can-create-only-one-game": "Вы можете создавать только одну игру",
          "user-not-found": "Пользователь не найден",
        }[e])
    );

    if (message && message.type === "left") toast(message.error);
  }, [data]);
  return (
    <Button disabled={isPending} onClick={() => startTransition(dispatch)}>
      Создать игру
    </Button>
  );
}
