import Brackets from "@/components/sections/tournamentsDetails/Brackets";
import { PageProps } from "@/config/types";
import { tournaments } from "@public/data/tournaments";

export async function generateStaticParams() {
  return tournaments.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function TournamentsBracketsPage({ params }: PageProps) {
  // Resolve the params promise to get the id
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const singleTournament = tournaments.find(
    (item) => item.id.toString() === id
  );

  return (
    <main>
      <Brackets />
    </main>
  );
}
