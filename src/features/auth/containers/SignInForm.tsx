"use client";

import { AuthFormLayout } from "../ui/AuthFormLayout";
import { AuthFields } from "../ui/AuthFields";
import { SubmitButton } from "../ui/SubmitButton";
import { right } from "@/shared/lib/either";
import { SignLink } from "../ui/SignLink";
import { ErrorMessage } from "../ui/ErrorMessage";
import { useActionState } from "@/shared/lib/react";
import { signInAction } from "../actions/sign-in";

export function SignInForm() {
  const [state, action, isPending] = useActionState(
    signInAction,
    right(undefined)
  );
  return (
    <AuthFormLayout
      title="Авторизация"
      description="Войдите в свой аккаунт"
      fields={<AuthFields />}
      actions={
        <SubmitButton isPending={isPending}>Авторизоваться</SubmitButton>
      }
      error={<ErrorMessage error={state} />}
      link={
        <SignLink
          text="Нет аккаунта?"
          linkText="Зарегистрироваться"
          url="/sign-up"
        />
      }
      action={action}
    />
  );
}
