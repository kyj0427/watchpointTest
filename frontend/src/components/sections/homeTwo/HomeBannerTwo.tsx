import Image from "next/image";
import Link from "next/link";
import HomeTwoBannerSlider from "./HomeTwoBannerSlider";
import matchLogo1 from "@public/images/games/matchLogo1.png";
import matchLogo2 from "@public/images/games/matchLogo2.png";
import { IconPlus } from "@tabler/icons-react";

const HomeBannerTwo = () => {
  return (
    <section className="section-pt overflow-visible">
      <div className="container relative pt-[30px]">
        <div className="grid grid-cols-12 items-center gap-30p">
          <div className="3xl:col-span-9 xxl:col-span-8 col-span-12 h-full">
            <div className="relative">
              <HomeTwoBannerSlider />
            </div>
          </div>
          <div className="3xl:col-span-3  xxl:col-span-4 col-span-12">
            <div className="grid xxl:grid-cols-1 lg:grid-cols-2">
              <div className="flex-col-c text-center w-full mb-30p">
                <button className="flex-c size-80p bg-primary rounded-full icon-32 text-b-neutral-4">
                  <IconPlus size={32} />
                </button>
                <div className="bg-[url('/images/icons/card-shape1.svg')] bg-center bg-cover bg-no-repeat rounded-24 p-40p px-40p pb-40p pt-[67px] w-full overflow-hidden">
                  <h4 className="heading-4 text-w-neutral-1 mb-16p">
                    Create a Tournament?
                  </h4>
                  <p className="text-l-regular text-w-neutral-4">
                    Create if you are a
                    <Link href="/sign-in" className="text-primary inline">
                      premium account
                    </Link>
                  </p>
                </div>
              </div>
              <div className="bg-b-neutral-3 rounded-12 py-24p px-30p">
                <div className="flex-y justify-between gap-30p mb-28p">
                  <div>
                    <h4 className="heading-4 text-w-neutral-1 mb-2">
                      League of Lends
                    </h4>
                    <p className="text-base text-w-neutral-1">
                      Group stage - Day 1 of 7
                    </p>
                  </div>
                  <span className="badge badge-sm bg-danger/20 text-danger">
                    Live
                  </span>
                </div>
                <div className="flex-y justify-between gap-20p gap-2 mb-28p">
                  <div>
                    <Image
                      className="w-[67px] mb-2"
                      src={matchLogo1}
                      alt="lends"
                    />
                    <span className="text-l-medium text-w-neutral-1">
                      Butterfly
                    </span>
                  </div>
                  <div className="flex-y gap-3 text-lead-medium text-w-neutral-1">
                    <span>2</span>
                    <span className="text-w-neutral-4">:</span>
                    <span className="text-w-neutral-4">0</span>
                  </div>
                  <div>
                    <Image className="mb-2" src={matchLogo2} alt="lends" />
                    <span className="w-[67px] text-l-medium text-w-neutral-1">
                      Peacock
                    </span>
                  </div>
                </div>
                <div className="flex-y gap-16p mb-28p">
                  <Link
                    href="/tournaments/t1"
                    className="btn btn-md btn-primary rounded-12 w-full"
                  >
                    Watch
                  </Link>
                  <Link
                    href="/tournaments/t1/brackets"
                    className="btn btn-lg py-3 btn-neutral-2 rounded-12 outline-none"
                  >
                    Info
                  </Link>
                </div>
                <div className="flex-y flex-wrap justify-between gap-16p mb-20p">
                  <h4 className="heading-4 text-w-neutral-1">Next match</h4>
                  <span className="text-base text-w-neutral-1">
                    June 01, 2023
                  </span>
                </div>
                <div className="text-base text-w-neutral-4 mb-28p">
                  <div className="flex-y gap-24p mb-16p">
                    <div className="flex-y gap-24p">
                      <span>10:50</span>
                      <span className="badge badge-circle badge-dot bg-w-neutral-4"></span>
                    </div>
                    <div className="flex-y gap-20p">
                      <span>Brazil</span>
                      <span>vs</span>
                      <span>Czech Republic</span>
                    </div>
                  </div>
                  <div className="flex-y gap-24p mb-16p">
                    <div className="flex-y gap-24p">
                      <span>11:30</span>
                      <span className="badge badge-circle badge-dot bg-w-neutral-4"></span>
                    </div>
                    <div className="flex-y gap-20p">
                      <span>China</span>
                      <span>vs</span>
                      <span>Germany</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/tournaments"
                  className="btn btn-md btn-primary rounded-12 w-full"
                >
                  View All Match
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBannerTwo;
