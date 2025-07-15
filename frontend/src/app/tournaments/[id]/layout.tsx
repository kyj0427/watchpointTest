import TournamentHeader from "@/components/sections/tournamentsDetails/TournamentHeader";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TournamentHeader />
      {children}
    </>
  );
}
