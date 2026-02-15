"use client";

import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { TicTacField } from "@/shared/components/TicTacField";
import { ArrowRight, Clock, Zap } from "lucide-react";
import { GameHelpers, GameInProgressEntity } from "@/entities/game";
import { UserEntity } from "@/entities/user/domain";
import { GameSymbols } from "@/shared/types";

interface ActiveGameCardProps {
  game: GameInProgressEntity;
  user: UserEntity;
  actions: React.ReactNode;
}

export function ActiveGameCard({ game, user, actions }: ActiveGameCardProps) {
  const playerSymbol = GameHelpers.getPlayerSymbol(user, game);

  const isPlayerTurn = GameHelpers.getGameCurrentSymbol(game) === playerSymbol;

  return (
    <Card className="w-full border-primary/30 bg-card overflow-hidden">
      <div className="h-1 w-full bg-primary" />
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <TicTacField board={game.field} size="md" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold font-sans text-card-foreground">
                  {"vs "}
                  Stoble
                </h3>

                {isPlayerTurn ? (
                  <Badge className="bg-accent text-accent-foreground border-transparent">
                    <Zap className="mr-1 h-3 w-3" />
                    Your turn
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="border-transparent">
                    <Clock className="mr-1 h-3 w-3" />
                    Waiting
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {"Playing as "}
                <span
                  className={
                    playerSymbol === GameSymbols.X
                      ? "text-primary font-bold"
                      : "text-accent font-bold"
                  }
                >
                  {playerSymbol}
                </span>
                {" \u00b7 Started "}
              </p>
            </div>
          </div>
          {actions}
        </div>
      </CardContent>
    </Card>
  );
}
