import Image from "next/image";
import Link from "next/link";
import logo from "@public/images/icons/logo.png";
import footerIllustration from "@public/images/photos/footerIllustration.webp";
import { currentYear } from "@/utility/currentYear";
import {
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitch,
  IconBrandYoutube,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="relative section-pt overflow-hidden bg-b-neutral-3">
      <div className="container">
        <div className="relative z-10 lg:px-10">
          <div className="flex items-center justify-between gap-24p pb-60p">
            <div className="max-w-[530px]">
              <h2 className="display-4 text-w-neutral-1 mb-32p text-split-left">
                Subscribe to our
              </h2>
              <h2 className="display-lg mb-32p" data-aos="fade-up">
                Newsletter
              </h2>
            </div>
          </div>
          <div className="grid 4xl:grid-cols-12 3xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 4xl:gap-x-6 max-4xl:gap-40p border-y-2 border-dashed border-shap py-80p">
            <div className="4xl:col-start-1 4xl:col-end-4">
              <Image className="mb-16p" src={logo} alt="logo" />
              <p className="text-base text-w-neutral-3 mb-32p">
                Become visionary behind a sprawling metropolis in Metropolis
                Tycoon Plan empire progress.
              </p>
              <div className="flex items-center gap-3">
                <Link href="#" className="btn-socal-primary">
                  <IconBrandFacebook />
                </Link>
                <Link href="#" className="btn-socal-primary">
                  <IconBrandTwitch />
                </Link>
                <Link href="#" className="btn-socal-primary">
                  <IconBrandInstagram />
                </Link>
                <Link href="#" className="btn-socal-primary">
                  <IconBrandDiscord />
                </Link>
                <Link href="#" className="btn-socal-primary">
                  <IconBrandYoutube />
                </Link>
              </div>
            </div>
            <div className="4xl:col-start-5 4xl:col-end-7">
              <div className="flex items-center gap-24p mb-24p">
                <h4 className="heading-4 text-w-neutral-1 whitespace-nowrap ">
                  Main pages
                </h4>
                <span className="w-full max-w-[110px] h-0.5 bg-w-neutral-1"></span>
              </div>
              <ul className="grid grid-cols-2 sm:gap-y-16p gap-y-2 gap-x-32p *:flex *:items-center">
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/library"
                    className="text-m-regular text-w-neutral-3"
                  >
                    My Library
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/trending"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Trending
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/leaderboard"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Leaderboard
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/chat"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Chat
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/marketplace-two"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Marketplace
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/shop"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Shop
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/contact-us"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Support
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/blogs"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
            <div className="4xl:col-start-8 4xl:col-end-10">
              <div className="flex items-center gap-24p mb-24p">
                <h4 className="heading-4 text-w-neutral-1 whitespace-nowrap ">
                  Utility pages
                </h4>
                <span className="w-full max-w-[110px] h-0.5 bg-w-neutral-1"></span>
              </div>
              <ul className="grid grid-cols-2 sm:gap-y-16p gap-y-2 gap-x-32p *:flex *:items-center">
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/tournaments"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Tournaments
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/games"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Games
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/community"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Community
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/pricing-plan"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link href="#" className="text-m-regular text-w-neutral-3">
                    Notifications
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/not-found"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Not found
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/contact-us"
                    className="text-m-regular text-w-neutral-3"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="4xl:col-start-11 4xl:col-end-13">
              <h4 className="heading-4 text-w-neutral-1 whitespace-nowrap  mb-3">
                Email Us
              </h4>
              <Link
                href="mailto:debra.holt@example.com"
                className="text-base text-w-neutral-3 mb-32p"
              >
                debra.holt@example.com
              </Link>
              <h4 className="heading-5 whitespace-nowrap mb-3">Contact Us</h4>
              <Link
                href="tel:207555-0119"
                className="text-base text-w-neutral-3"
              >
                (207) 555-0119
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-24p py-30p">
            <div className="flex items-center flex-wrap">
              <p className="text-base text-w-neutral-3">
                Copyright ©
                <span className="currentYear span">{currentYear}</span>
              </p>
              <div className="w-1px h-4 bg-shap mx-24p"></div>
              <p className="text-base text-white">
                Designed By
                <Link
                  href="https://themeforest.net/user/uiaxis/portfolio"
                  className="text-primary hover:underline a"
                >
                  UIAXIS
                </Link>
              </p>
            </div>
            <div className="flex items-center text-base gap-24p text-white">
              <Link
                href="/faqs"
                className="hover:text-primary transition-1 block"
              >
                Privacy
              </Link>
              <Link
                href="/terms-conditions"
                className="hover:text-primary transition-1 block"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute right-0 top-0 xl:block hidden"
          data-aos="zoom-out-right"
          data-aos-duration="800"
        >
          <Image
            className="3xl:w-[580px] xxl:w-[500px] xl:w-[400px] h-auto"
            width={580}
            src={footerIllustration}
            alt="footer"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
