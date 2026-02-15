import { routes } from "@/kernel/routes";
import Link from "next/link";
import { Grid3X3 } from "lucide-react";

export function Header({ actions }: { actions: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">
        <Link href={routes.home()} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Grid3X3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight font-sans text-foreground">
            TicTacToe
          </span>
        </Link>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
    </header>
  );
}
