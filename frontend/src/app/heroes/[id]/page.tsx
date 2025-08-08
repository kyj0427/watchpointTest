import HeroDetails from "@/components/sections/heroDetails/HeroDetails";
import RelatedHero from "@/components/sections/heroDetails/RelatedHero";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";
import { hero } from "@public/data/hero";

// Define page props interface
interface PageProps {
  params: Promise<{ id: string }>;
  // searchParams도 Promise라면 마찬가지로
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static paths
export async function generateStaticParams() {
  return hero.map((item) => ({   
    id: item.key.toString(),
  }));
}

// Named function for the component (fixing the anonymous default export)
const HeroPage = async ({ params }: PageProps) => {
  // Resolve the params promise to get the id
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Hero Details" },
  ];

  const headerData: headerBannerType = {
    title: "Hero Details",
    bgImgClasses: "",
    navLinks,
  };

  // 해당 키와 일치하는 영웅 찾기
  const singleHero = hero.find(
    (item) => item.key.toString() === id
    //(item) => item.key === id
  );

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      {singleHero ? (
        <HeroDetails/>
      ) : (
        <p className="text-base text-w-neutral-1 mt-32p">
          Hero item not found.
        </p>
      )}
      {/* <RelatedHero /> */}
    </main>
  );
};

// Set the display name (if needed)
HeroPage.displayName = "HeroPage";

export default HeroPage;
