import ESportsBreadcrumb from "@/components/sections/eSports/ESportsBreadcumb";
import ESportsMatches from "@/components/sections/eSports/ESportsMatches";
import ESportsMatchesPast from "@/components/sections/eSports/ESportsMatchesPast";
import { headerBannerType, NavLinkProps, PageProps } from "@/config/types";
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

  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "홈" },
    { id: 2, url: "", label: "E-스포츠" },
  ];

  const headerData: headerBannerType = {
    title: "대회일정",
    navLinks,
  };

  return (
    <main>
      <ESportsBreadcrumb breadcrumb={headerData} />
      <ESportsMatches />
      <ESportsMatchesPast />
    </main>
  );
}
