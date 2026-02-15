import { GamesList } from "@/features/games-list/server";
import { Hero } from "./ui/Hero";
import { CreateButton } from "@/features/games-list/containers/CreateButton";
import { ActiveGame } from "@/features/games-list/containers/ActiveGame";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  return (
    <div className="flex flex-col max-w-7xl px-2 gap-8 mx-auto pt-[100px]">
      <Hero actions={<CreateButton size="lg" className="text-base" />} />
      <ActiveGame />
      <GamesList />
    </div>
  );
}
