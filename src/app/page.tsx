import { db } from "@/shared/lib/db";
import { Button } from "@/shared/ui/button";
import { Card, CardTitle } from "@/shared/ui/card";

export default async function Home() {
  const games = await db.game.findMany();

  console.log(games);
  return (
    <div>
      {games.map((item) => (
        <Card key={item.id}>
          <CardTitle>{item.name}</CardTitle>
        </Card>
      ))}
    </div>
  );
}
