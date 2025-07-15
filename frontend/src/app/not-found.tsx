import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";
import Link from "next/link";

const NotFound = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Not Found" },
  ];

  const headerData: headerBannerType = {
    title: "Not Found",
    navLinks,
  };

  return (
    <main>
      <Breadcrumb breadcrumb={headerData} />
      <section className="section-py">
        <div className="container">
          <div className="flex-col-c text-center">
            <h1 className="lg:text-[160px] md:text-[140px] sm:text-[120px] text-7xl font-borda text-w-neutral-1 mb-3">
              404
            </h1>
            <h1 className="heading-1 text-w-neutral-1 mb-24p">
              Looks Like You are Lost
            </h1>
            <p className="text-l-medium text-w-neutral-4 mb-40p">
              We can’t seem to find the page you’re looking for.
            </p>
            <Link href="/" className="btn btn-xl py-3 btn-primary rounded-12">
              BACK TO HOME
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
