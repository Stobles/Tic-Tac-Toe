import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export function GameLayout({
  status,
  field,
  actions,
  players,
}: {
  status?: React.ReactNode;
  field?: React.ReactNode;
  players?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Крестики нолики</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {players}
        {status}
        <div className="flex items-center justify-center">{field}</div>
      </CardContent>
      <CardFooter>{actions}</CardFooter>
    </Card>
  );
}
