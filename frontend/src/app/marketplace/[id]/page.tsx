import MarketplaceDetails from "@/components/sections/marketplaceDetails/MarketplaceDetails";
import RelatedMarketplace from "@/components/sections/marketplaceDetails/RelatedMarketplace";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";
import { marketplace } from "@public/data/marketplace";

// Define page props interface
interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static paths
export async function generateStaticParams() {
  return marketplace.map((item) => ({
    id: item.id.toString(),
  }));
}

// Named function for the component (fixing the anonymous default export)
const MarketplacePage = async ({ params }: PageProps) => {
  // Resolve the params promise to get the id
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Marketplace Details" },
  ];

  const headerData: headerBannerType = {
    title: "Marketplace Details",
    bgImgClasses: "",
    navLinks,
  };

  const singleMarketplace = marketplace.find(
    (item) => item.id.toString() === id
  );

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      {singleMarketplace ? (
        <MarketplaceDetails />
      ) : (
        <p className="text-base text-w-neutral-1 mt-32p">
          Library item not found.
        </p>
      )}
      <RelatedMarketplace />
    </main>
  );
};

// Set the display name (if needed)
MarketplacePage.displayName = "MarketplacePage";

export default MarketplacePage;
