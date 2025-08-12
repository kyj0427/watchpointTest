import FaqHeader from "@/components/sections/faq/FaqHeader";
import { AllFaqs } from "@/components/shared";
import Breadcrumb from "@/components/shared/Breadcumb";
import { headerBannerType, NavLinkProps } from "@/config/types";
import Link from "next/link";
const Page = () => {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "홈" },
    { id: 2, url: "", label: "QnA" },
  ];

  const headerData: headerBannerType = {
    title: "QnA",
    navLinks,
  };

  
  return (
   <main>
  <Breadcrumb breadcrumb={headerData} />

  <AllFaqs />
  <section className="pt-20 pb-24 bg-neutral-900 text-center">
    <div className="container">
      <h2 className="text-3xl text-white font-semibold mb-4">Still have questions?</h2>
      <p className="text-neutral-300 mb-6">
        If your question isn’t listed above, feel free to contact us directly.
      </p>
      <Link
        href="/faq-details"
        className="inline-block px-8 py-3 bg-primary text-white rounded-xl text-lg hover:bg-primary-dark transition"
      >
        1:1 문의 바로가기
      </Link>
    </div>
  </section>
</main>
  );
};

export default Page;
