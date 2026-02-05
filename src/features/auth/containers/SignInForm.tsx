"use client";

import { AuthFormLayout } from "../ui/AuthFormLayout";
import { AuthFields } from "../ui/AuthFields";
import { SubmitButton } from "../ui/SubmitButton";
import { SignLink } from "../ui/SignLink";
import { ErrorMessage } from "../ui/ErrorMessage";
import { useActionState } from "@/shared/lib/react";
import { signInAction, SignInFormState } from "../actions/signIn";
import { routes } from "@/kernel/routes";

export function SignInForm() {
  const [state, action, isPending] = useActionState(
    signInAction,
    {} as SignInFormState,
  );
  return (
    <AuthFormLayout
      title="Авторизация"
      description="Войдите в свой аккаунт"
      fields={<AuthFields formFields={state.formData} errors={state.errors} />}
      actions={
        <SubmitButton isPending={isPending}>Авторизоваться</SubmitButton>
      }
      error={<ErrorMessage error={state.errors?._errors} />}
      link={
        <SignLink
          text="Нет аккаунта?"
          linkText="Зарегистрироваться"
          url={routes.signUp()}
        />
      }
      action={action}
    />
  );
}
