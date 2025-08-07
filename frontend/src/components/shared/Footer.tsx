import Image from "next/image";
import Link from "next/link";
import logo from "@public/images/icons/watchpoint_logo_cut.png";
import footerIllustration from "@public/images/photos/footer-wrecking-bal.png";
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
    <footer className="relative section-pt overflow-hidden bg-b-neutral-3 mt-20">
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
          <div className="grid 4xl:grid-cols-12 3xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 4xl:gap-x-4 max-4xl:gap-20p border-y-2 border-dashed border-shap py-80p">
            <div className="4xl:col-start-1 4xl:col-end-3">
              <Image className="mb-16p" src={logo} alt="logo" />
              <p className="text-base text-w-neutral-3 mb-32p">
                오버워치 게임의 모든 것을 Watchpoint에서.
              </p>
              <div className="flex items-center gap-3 mb-32p">
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

              <div className="pt-16">
                <div className="flex items-center gap-24p mb-24p">
                  <h4 className="heading-4 text-w-neutral-1 whitespace-nowrap ">
                    Contact Us
                  </h4>
                  
                </div>
                <ul className="grid grid-cols-1 sm:gap-y-16p gap-y-2 *:flex *:items-center">
                  <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                    <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                    <Link
                      href="mailto:support@watchpoint.com"
                      className="text-m-regular text-w-neutral-3"
                    >
                      support@watchpoint.com
                    </Link>
                  </li>
                  <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                    <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                    <Link
                      href="tel:207555-0119"
                      className="text-m-regular text-w-neutral-3"
                    >
                      (207) 555-0119
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* 게임정보 & E-스포츠 */}
            <div className="4xl:col-start-4 4xl:col-end-6">
              <div className="flex items-center gap-24p mb-24p">
                <h4 className="heading-4 text-w-neutral-1 whitespace-nowrap ">
                  게임정보
                </h4>
                <span className="w-full max-w-[100px] h-0.5 bg-w-neutral-1"></span>
              </div>
              <ul className="grid grid-cols-1 sm:gap-y-16p gap-y-2 *:flex *:items-center mb-32p">
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/groups-two"
                    className="text-m-regular text-w-neutral-3"
                  >
                    영웅정보
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/maps"
                    className="text-m-regular text-w-neutral-3"
                  >
                    맵정보
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/userrank"
                    className="text-m-regular text-w-neutral-3"
                  >
                    유저랭킹
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/patchnotes"
                    className="text-m-regular text-w-neutral-3"
                  >
                    패치노트
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/marketplace-two"
                    className="text-m-regular text-w-neutral-3"
                  >
                    상점
                  </Link>
                </li>                
              </ul>

              <div className="flex items-center gap-24p mb-24p">
                <h4 className="heading-4 text-w-neutral-1 whitespace-nowrap ">
                  E-스포츠
                </h4>
                <span className="w-full max-w-[100px] h-0.5 bg-w-neutral-1"></span>
              </div>
              <ul className="grid grid-cols-1 sm:gap-y-16p gap-y-2 *:flex *:items-center">
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/tournaments/t1/matches"
                    className="text-m-regular text-w-neutral-3"
                  >
                    대회일정
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/tournaments/t1/brackets"
                    className="text-m-regular text-w-neutral-3"
                  >
                    승부예측
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/team-ranks"
                    className="text-m-regular text-w-neutral-3"
                  >
                    프로랭킹
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link href="/team-home" className="text-m-regular text-w-neutral-3">
                    프로선수정보
                  </Link>
                </li>                
              </ul>
            </div>

            {/* 게임강의 & 커뮤니티 */}
            <div className="4xl:col-start-7 4xl:col-end-9">
              <div className="flex items-center gap-24p mb-24p">
                <h4 className="heading-4 text-w-neutral-1 whitespace-nowrap ">
                  강의
                </h4>
                <span className="w-full max-w-[100px] h-0.5 bg-w-neutral-1"></span>
              </div>
              <ul className="grid grid-cols-1 sm:gap-y-16p gap-y-2 *:flex *:items-center mb-32p">
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/athena"
                    className="text-m-regular text-w-neutral-3"
                  >
                    코칭AI
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/mentor-menti"
                    className="text-m-regular text-w-neutral-3"
                  >
                    멘토/멘티 매칭
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/game-details-two"
                    className="text-m-regular text-w-neutral-3"
                  >
                    강사정보/후기
                  </Link>
                </li>
                <li className="invisible">
                  <span className="text-m-regular text-w-neutral-3">빈 공간</span>
                </li>
                <li className="invisible">
                  <span className="text-m-regular text-w-neutral-3">빈 공간</span>
                </li>                             
              </ul>

              <div className="flex items-center gap-24p mb-24p">
                <h4 className="heading-4 text-w-neutral-1 whitespace-nowrap ">
                  커뮤니티
                </h4>
                <span className="w-full max-w-[100px] h-0.5 bg-w-neutral-1"></span>
              </div>
              <ul className="grid grid-cols-1 sm:gap-y-16p gap-y-2 *:flex *:items-center">
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/community"
                    className="text-m-regular text-w-neutral-3"
                  >
                    인기글
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/trending"
                    className="text-m-regular text-w-neutral-3"
                  >
                    핫클립
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/blogs"
                    className="text-m-regular text-w-neutral-3"
                  >
                    공략
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/groups"
                    className="text-m-regular text-w-neutral-3"
                  >
                    듀오/스쿼드 조회
                  </Link>
                </li>
              </ul>
            </div>

            {/* 마이페이지 & 연락처 */}
            <div className="4xl:col-start-10 4xl:col-end-12">
              <div className="flex items-center gap-24p mb-24p">
                <h4 className="heading-4 text-w-neutral-1 whitespace-nowrap ">
                  마이페이지
                </h4>
                <span className="w-full max-w-[100px] h-0.5 bg-w-neutral-1"></span>
              </div>
              <ul className="grid grid-cols-1 sm:gap-y-16p gap-y-2 *:flex *:items-center mb-32p">
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/profile"
                    className="text-m-regular text-w-neutral-3"
                  >
                    내 프로필
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/saved"
                    className="text-m-regular text-w-neutral-3"
                  >
                    북마크
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/pricing-plan"
                    className="text-m-regular text-w-neutral-3"
                  >
                    구독/결제
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/chat"
                    className="text-m-regular text-w-neutral-3"
                  >
                    채팅방
                  </Link>
                </li>
                <li className="group hover:translate-x-2 -translate-x-2 inline-flex items-center gap-1 hover:text-primary transition-1 max-w-fit">
                  <i className="ti ti-chevron-right  group-hover:visible invisible text-primary group-hover:opacity-100 opacity-0 transition-1"></i>
                  <Link
                    href="/faq"
                    className="text-m-regular text-w-neutral-3"
                  >
                    고객문의
                  </Link>
                </li>
              </ul>
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
                href="/faq"
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
            className="3xl:w-[850px] xxl:w-[500px] xl:w-[400px] h-auto"
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
