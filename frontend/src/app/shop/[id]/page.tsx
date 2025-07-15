import { headerBannerType, NavLinkProps, PageProps } from "@/config/types";
import Breadcrumb from "@/components/shared/Breadcumb";
import { allProducts } from "@public/data/allProducts";
import ProductDetails from "@/components/sections/productDetails/ProductDetails";

// Generate static paths
export async function generateStaticParams() {
  return allProducts.map((item) => ({
    id: item.id.toString(),
  }));
}

// Page component
export default async function ShopDetailsPage({ params }: PageProps) {
  // Resolve the params promise to get the id
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Shop Details" },
  ];

  const headerData: headerBannerType = {
    title: "Shop Details",
    navLinks,
  };

  const product = allProducts.find((item) => item.id.toString() === id);

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      {product ? (
        <ProductDetails product={product} />
      ) : (
        <p className="text-base text-w-neutral-1 mt-32p">
          Library item not found.
        </p>
      )}
      {/* <RealatedProducts /> */}
    </main>
  );
}
