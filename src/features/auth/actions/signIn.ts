"use server";

import { sessionService, verifyUser } from "@/entities/user/server";
import { redirect } from "next/navigation";

import { z } from "zod";

export type SignInFormState = {
  formData?: FormDataType;
  errors?: {
    login?: string;
    password?: string;
    _errors?: string;
  };
};

const formDataSchema = z.object({
  login: z
    .string()
    .min(3, { error: "Логин должен содержать более 3 символов" }),
  password: z
    .string()
    .min(3, { error: "Пароль должен содержать более 3 символов" }),
});

type FormDataType = z.infer<typeof formDataSchema>;

export const signInAction = async (
  state: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> => {
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

  const verifiedUser = await verifyUser(result.data);

  if (verifiedUser.type === "right") {
    await sessionService.createSession(verifiedUser.value);

    redirect("/");
  }

  const errors = {
    "wrong-login-or-password": "Неверный логин или пароль",
  }[verifiedUser.error];

  return {
    formData: result.data,
    errors: {
      _errors: errors,
    },
  };
};
