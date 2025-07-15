import GroupHeader from "@/components/sections/groupDetails/GroupHeader";
import RightAsideOne from "@/components/shared/RightAsideOne";
import { headerBannerType, NavLinkProps } from "@/config/types";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLinks: NavLinkProps[] = [
    { id: 1, url: "/", label: "Home" },
    { id: 2, url: "", label: "Tournament Details" },
  ];

  const headerData: headerBannerType = {
    title: "Tournament Details",
    navLinks,
  };

  return (
    <main>
      <section className="section-pb pt-30 overflow-visible">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-30p gap-y-10">
            <div className="4xl:col-span-9 xxl:col-span-8 col-span-12">
              <div>
                <GroupHeader />
                {children}
              </div>
            </div>
            <div className="4xl:col-span-3 xxl:col-span-4 col-span-12 relative">
              <div className="xxl:sticky xxl:top-30">
                <RightAsideOne />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
