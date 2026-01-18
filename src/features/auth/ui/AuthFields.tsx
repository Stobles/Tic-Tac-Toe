import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useId } from "react";

export function AuthFields({
  formFields,
  errors,
}: {
  formFields?: {
    login: string;
    password: string;
  };
  errors?: {
    login?: string;
    password?: string;
  };
}) {
  const loginId = useId();
  const passwordId = useId();
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>Логин</Label>
        <Input
          id={loginId}
          defaultValue={formFields?.login}
          name="login"
          type="text"
          placeholder="Введите свой логин"
        />
        {errors?.login && <div className="text-red-600">{errors?.login}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Пароль</Label>
        <Input
          id={passwordId}
          defaultValue={formFields?.password}
          name="password"
          type="password"
          placeholder="Введите свой пароль"
        />
        {errors?.password && (
          <div className="text-red-600">{errors?.password}</div>
        )}
      </div>
    </>
  );
}
