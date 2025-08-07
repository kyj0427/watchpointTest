import { StaticImageData } from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import ESportTab from "./ESportsTab";

export type BreadcrumbType = {
  title: string;
  className?: string | null;
  image?: string | StaticImageData | null;
  navLinks?: ItemsProps[];
  details?: string | null;
  description?: string | null;
};

export type ItemsProps = {
  id: string | number;
  label: string;
  url?: string;
};

const ESportsBreadcrumb = ({ breadcrumb }: { breadcrumb: BreadcrumbType }) => {
  return (
    <section className={twMerge("pt-30p", breadcrumb?.className)}>
      <div className="section-pt">
        <div className="relative bg-[url('/images/photos/overwatch_11.png')] bg-cover bg-no-repeat rounded-24 overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-12 gap-30p relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]">
              <div className="lg:col-start-2 lg:col-end-12 col-span-12">
                <h2 className="heading-2 text-w-neutral-1 mb-3">
                  {breadcrumb?.title}
                </h2>
                <ul className="breadcrumb">
                  {breadcrumb?.navLinks?.map((item, idx) => (
                    <li key={idx} className="breadcrumb-item">
                      {item?.url ? (
                        <Link
                          href={item?.url || "#"}
                          className="breadcrumb-link"
                        >
                          {item?.label}
                        </Link>
                      ) : (
                        <span className="breadcrumb-current">
                          {item?.label}
                        </span>
                      )}
                      {breadcrumb.navLinks &&
                        idx !== breadcrumb.navLinks?.length - 1 && (
                          <span className="breadcrumb-icon">
                            <i className="ti ti-chevrons-right"></i>
                          </span>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="overlay-11"></div>
        </div>
      </div>
      <div className="mb-10">
        <ESportTab/>
      </div>
    </section>
  );
};

export default ESportsBreadcrumb;
