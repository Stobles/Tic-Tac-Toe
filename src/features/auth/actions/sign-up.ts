"use server";

import { createUser, sessionService } from "@/entities/user/server";
import { left, mapLeft } from "@/shared/lib/either";
import { redirect } from "next/navigation";

import { z } from "zod";

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signUpAction = async (state: unknown, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    return left(`${result.error.flatten().fieldErrors}` as const);
  }

  const createdUser = await createUser(result.data);

  if (createdUser.type === "right") {
    await sessionService.createSession(createdUser.value);

    redirect("/");
  }

  return mapLeft(
    createdUser,
    (e) =>
      ({
        "user-login-exists": "Пользователь с таким логином уже существует",
      }[e])
  );
};
