"use client";

import { AuthFormLayout } from "../ui/AuthFormLayout";
import { AuthFields } from "../ui/AuthFields";
import { SubmitButton } from "../ui/SubmitButton";
import { SignLink } from "../ui/SignLink";
import { ErrorMessage } from "../ui/ErrorMessage";
import { signUpAction, SignUpFormState } from "../actions/signUp";
import { useActionState } from "@/shared/lib/react";

export function SignUpForm() {
  const [state, action, isPending] = useActionState(
    signUpAction,
    {} as SignUpFormState,
  );

  return (
    <AuthFormLayout
      title="Регистрация"
      description="Создайте новый аккаунт"
      fields={<AuthFields formFields={state.formData} errors={state.errors} />}
      actions={
        <SubmitButton isPending={isPending}>Зарегистрироваться</SubmitButton>
      }
      error={<ErrorMessage error={state.errors?._errors} />}
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
