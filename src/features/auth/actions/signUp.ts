"use server";

import { createUser, sessionService } from "@/entities/user/server";
import { left, mapLeft } from "@/shared/lib/either";
import { redirect } from "next/navigation";

import { z } from "zod";

export type SignUpFormState = {
  formData?: FormDataType;
  errors?: {
    login?: string;
    password?: string;
    _errors?: string;
  };
};

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

type FormDataType = z.infer<typeof formDataSchema>;

export const signUpAction = async (
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> => {
  const data = Object.fromEntries(formData.entries());

  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    const formatedErrors = result.error.format();
    return {
      formData: result.data,
      errors: {
        login: formatedErrors.login?._errors.join(", "),
        password: formatedErrors.password?._errors.join(", "),
        _errors: formatedErrors._errors.join(", "),
      },
    };
  }

  const createdUser = await createUser(result.data);

  if (createdUser.type === "right") {
    await sessionService.createSession(createdUser.value);

    redirect("/");
  }

  const errors = {
    "user-login-exists": "Логин уже занят",
  }[createdUser.error];

  return {
    formData: result.data,
    errors: {
      _errors: errors,
    },
  };
};
