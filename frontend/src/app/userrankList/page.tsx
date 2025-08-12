// src/app/userrankList/page.tsx (서버 컴포넌트)
import UserrankListBreadcrumb from "@/components/sections/userrankList/userrankListBreadcumb";
import UserrankListComp from "@/components/sections/userrankList/userrankListComp";
import { headerBannerType, NavLinkProps } from "@/config/types";

type Search = { q?: string | string[]; search?: string | string[] };

export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const qRaw = sp?.q ?? sp?.search ?? "";
  const q = Array.isArray(qRaw) ? qRaw[0] : qRaw;

  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/home", label: "홈" },
    { id: 2, url: "/userrankList", label: "검색결과" },
  ];
  const headerData: headerBannerType = { title: "전적검색", navLinks };

  return (
    <main >
      <UserrankListBreadcrumb breadcrumb={headerData} />
      {/* q를 클라이언트 컴포넌트로 내려보냄 */}
      <UserrankListComp initialQuery={q} />
    </main>
  );
}
