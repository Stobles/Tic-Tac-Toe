"use client";

import { AuthFormLayout } from "../ui/AuthFormLayout";
import { AuthFields } from "../ui/AuthFields";
import { SubmitButton } from "../ui/SubmitButton";
import { right } from "@/shared/lib/either";
import { SignLink } from "../ui/SignLink";
import { ErrorMessage } from "../ui/ErrorMessage";
import { signUpAction } from "../actions/sign-up";
import { useActionState } from "@/shared/lib/react";

export function SignUpForm() {
  const [state, action, isPending] = useActionState(
    signUpAction,
    right(undefined)
  );

  return (
    <AuthFormLayout
      title="Регистрация"
      description="Создайте новый аккаунт"
      fields={<AuthFields />}
      actions={
        <SubmitButton isPending={isPending}>Зарегистрироваться</SubmitButton>
      }
      error={<ErrorMessage error={state} />}
      link={
        <SignLink
          text="Уже есть аккаунт?"
          linkText="Авторизоваться"
          url="/sign-in"
        />
      }
      action={action}
    />
  );
}
