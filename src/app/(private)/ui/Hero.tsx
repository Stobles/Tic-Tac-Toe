import { Gamepad2, Trophy, Zap } from "lucide-react";

export function Hero({ actions }: { actions: React.ReactNode }) {
  return (
    <section className="flex justify-between items-center mb-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-balance font-sans text-foreground sm:text-5xl">
            Играйте в Крестики-Нолики
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Бросайте вызов друзьям или незнакомцам. Создавайте игру, заходите в
            открытое лобби или следите за ходом матчей.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Gamepad2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">24</p>
              <p>Games live</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground">128</p>
              <p>Players online</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">1,847</p>
              <p>Games today</p>
            </div>
          </div>
        </div>
      </div>
      <div>{actions}</div>
    </section>
  );
}
