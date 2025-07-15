import TournamentsPrize from "@/components/sections/tournamentsDetails/TournamentsPrize";
import { PageProps } from "@/config/types";
import { tournaments } from "@public/data/tournaments";

// Generate static paths
export async function generateStaticParams() {
  return tournaments.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function TournamentsParticipantsPage({
  params,
}: PageProps) {
  // Resolve the params promise to get the id
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const singlePrize = tournaments.find((item) => item.id.toString() === id);

  return (
    <main>
      <section className="section-pb">
        <div className="container">
          <div className="overflow-visible relative grid 4xl:grid-cols-12 grid-cols-1 gap-30p">
            <div className="4xl:col-start-2 4xl:col-end-12">
              <TournamentsPrize />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
