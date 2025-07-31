import Maches from "@/components/sections/tournamentsDetails/Maches";
import { PageProps } from "@/config/types";
import { tournaments } from "@public/data/tournaments";

// Generate static paths
export async function generateStaticParams() {
  return tournaments.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function TournamentsMatchsPage({ params }: PageProps) {
  // Resolve the params promise to get the id
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const singleMatch = tournaments.find((item) => item.id.toString() === id);

  return (
    <main>
      <Maches />
    </main>
  );
}
