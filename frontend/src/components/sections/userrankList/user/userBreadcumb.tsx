// 유저랭킹 메인상단 컴포넌트

// 유저랭킹 메인상단 컴포넌트 (헤더+빵꾸)
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export type ItemsProps = {
  id: string | number;
  label: string;
  url?: string;
};

export type BreadcrumbHeader = {
  portraitUrl: string;
  name: string;
  title?: string;
  lastUpdatedText?: string; // "최근 업데이트 : 32시간 전"
  platform?: "pc" | "console" | string;
  bgUrl?: string;
};

export type BreadcrumbType = {
  title: string;
  className?: string | null;
  image?: string | StaticImageData | null;
  navLinks?: ItemsProps[];
  details?: string | null;
  description?: string | null;
  header?: BreadcrumbHeader; // ⬅️ 추가
};

const UserBreadcrumb = ({ breadcrumb }: { breadcrumb: BreadcrumbType }) => {
  const bgUrl =
    breadcrumb?.header?.bgUrl ||
    "/images/game_hero/hero_portrait_bg/Tracer_heroImage_3.jpg";

  return (
    <section className={twMerge("pt-30p", breadcrumb?.className || "")}>
      <div className="section-pt">
        <div
          className="relative bg-cover bg-no-repeat rounded-24 overflow-hidden"
          style={{ backgroundImage: `url(${bgUrl})` }}
        >
          <div className="container">
            <div className="grid grid-cols-12 gap-30p relative xl:py-[100px] md:py-30 sm:py-25 py-20 z-[2]">
              <div className="lg:col-start-2 lg:col-end-12 col-span-12">
                {/* Title */}
                <h2 className="heading-2 text-w-neutral-1 mb-3">
                  {breadcrumb?.title}
                </h2>

                {/* Breadcrumb */}
                {breadcrumb?.navLinks?.length ? (
                  <ul className="breadcrumb">
                    {breadcrumb.navLinks.map((item, idx) => (
                      <li key={item.id} className="breadcrumb-item">
                        {item.url ? (
                          <Link href={item.url} className="breadcrumb-link">
                            {item.label}
                          </Link>
                        ) : (
                          <span className="breadcrumb-current">{item.label}</span>
                        )}
                        {idx !== breadcrumb.navLinks.length - 1 && (
                          <span className="breadcrumb-icon">
                            <i className="ti ti-chevrons-right" />
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* Player Header (선택) */}
                {breadcrumb?.header && (
                  <div className="mt-6 flex items-end gap-4 text-white">
                    <div className="shrink-0">
                      <Image
                        src={breadcrumb.header.portraitUrl}
                        alt="portrait"
                        width={72}
                        height={72}
                        className="rounded-xl bg-white/10 p-1"
                        unoptimized
                      />
                      {breadcrumb.header.platform && (
                        <div className="mt-2 text-center text-xs text-white/80">
                          {String(breadcrumb.header.platform).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="text-white">
                      <div className="text-2xl font-semibold flex items-center gap-2">
                        <span>{breadcrumb.header.name}</span>
                      </div>
                      {breadcrumb.header.title && (
                        <div className="text-sm opacity-90">
                          {breadcrumb.header.title}
                        </div>
                      )}
                      {breadcrumb.header.lastUpdatedText && (
                        <div className="mt-1 text-xs text-white/70">
                          {breadcrumb.header.lastUpdatedText}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overlay-11" />
        </div>
      </div>
    </section>
  );
};

export default UserBreadcrumb;
