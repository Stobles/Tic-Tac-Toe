import { sessionService } from "@/entities/user/server";
import { routes } from "@/kernel/routes";
import { Button } from "@/shared/ui/button";
import { redirect } from "next/navigation";
import { Header } from "./ui/Header";
import { User } from "lucide-react";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await sessionService.verifySession();
  return (
    <div className="flex flex-col grow">
      <Header
        actions={
          <>
            <Button variant="outline">
              <User className="mr-1.5 h-3.5 w-3.5" />
              {session.login}
            </Button>
            <form
              action={async () => {
                "use server";
                await sessionService.deleteSession();
                redirect(routes.signIn());
              }}
            >
              <Button>Выход</Button>
            </form>
          </>
        }
      />
      <main>{children}</main>
    </div>
  );
}
