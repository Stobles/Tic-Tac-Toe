"use server";

import { createUser, sessionService, verifyUser } from "@/entities/user/server";
import { left, mapLeft } from "@/shared/lib/either";
import { redirect } from "next/navigation";

import { z } from "zod";

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signInAction = async (state: unknown, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    return left(`${result.error.flatten().fieldErrors}` as const);
  }

  const verifiedUser = await verifyUser(result.data);

  if (verifiedUser.type === "right") {
    await sessionService.createSession(verifiedUser.value);

    redirect("/");
  }

  return mapLeft(
    verifiedUser,
    (e) =>
      ({
        "wrong-login-or-password": "Неправильный логин или пароль",
      }[e])
  );
};
