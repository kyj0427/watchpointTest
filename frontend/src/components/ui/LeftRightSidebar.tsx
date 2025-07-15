"use client";

import { users } from "@public/data/users";
import {
  IconBookmark,
  IconDiamond,
  IconFlame,
  IconLayoutGrid,
  IconMessages,
  IconPlus,
  IconStar,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

const LeftRightSidebar = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 lg:translate-x-0 -translate-x-full h-screen z-30 bg-b-neutral-4 pt-30 px-[27px] transition-1">
        <div className="max-h-screen overflow-y-auto scrollbar-0">
          <div className="flex flex-col items-center xxl:gap-[30px] xl:gap-6 lg:gap-5 gap-4 h-[700px]">
            <button className="nav-toggole btn-c btn-c-3xl btn-primary icon-32 shrink-0">
              <IconLayoutGrid stroke={1.5} size={32} />
            </button>
            <div className="flex flex-col gap-2 rounded-full bg-b-neutral-1 w-fit p-2 shrink-0">
              <Link
                href="/trending"
                className="btn-c btn-c-3xl hover:bg-primary  text-white hover:text-b-neutral-4 transition-1"
              >
                <IconFlame stroke={1.5} size={32} />
              </Link>
              <Link
                href="/groups-two"
                className="btn-c btn-c-3xl hover:bg-primary  text-white hover:text-b-neutral-4 transition-1"
              >
                <IconUsersGroup stroke={1.5} size={32} />
              </Link>
              <Link
                href="/saved"
                className="btn-c btn-c-3xl hover:bg-primary  text-white hover:text-b-neutral-4 transition-1"
              >
                <IconBookmark stroke={1.5} size={32} />
              </Link>
              <Link
                href="/profile/achievements"
                className="btn-c btn-c-3xl hover:bg-primary  text-white hover:text-b-neutral-4 transition-1"
              >
                <IconStar stroke={1.5} size={32} />
              </Link>
            </div>
            <div className="flex flex-col gap-2 rounded-full w-fit p-2 shrink-0">
              <Link
                href="/marketplace-two"
                className="btn-c btn-c-3xl btn-neutral-4"
              >
                <IconDiamond stroke={1.5} size={32} />
              </Link>
              <Link href="/chat" className="btn-c btn-c-3xl btn-neutral-4">
                <IconMessages stroke={1.5} size={32} />
              </Link>
              <Link href="/profile" className="btn-c btn-c-3xl btn-neutral-4">
                <IconUser stroke={1.5} size={32} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed top-0 right-0 lg:translate-x-0 translate-x-full h-screen z-30 bg-b-neutral-4 pt-30 px-[27px] transition-1">
        <div className="flex flex-col items-center xxl:gap-[30px] xl:gap-6 lg:gap-5 gap-4">
          <div className="flex flex-col items-center gap-16p rounded-full w-fit p-2">
            <Swiper
              loop={true}
              slidesPerView={"auto"}
              spaceBetween={16}
              centeredSlides={false}
              direction="vertical"
              speed={100}
              mousewheel={true}
              className="infinity-slide-vertical messenger-carousel max-h-[288px] w-full"
            >
              {users?.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <Link href="/chat" className="avatar size-60p">
                    <Image
                      width={60}
                      height={60}
                      src={item?.avatar}
                      className="rounded-full"
                      alt="avatar"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <Link
              href="#"
              className="btn-c btn-c-xl bg-b-neutral-1 hover:bg-primary text-white hover:text-b-neutral-4 transition-1"
            >
              <IconPlus stroke={1.5} size={24} />
            </Link>
          </div>
          <div className="w-full h-1px bg-b-neutral-1"></div>
          <div className="flex flex-col items-center gap-16p rounded-full w-fit p-2">
            <div className="swiper infinity-slide-vertical messenger-carousel max-h-[136px] w-full">
              <Swiper
                loop={true}
                slidesPerView={"auto"}
                spaceBetween={16}
                centeredSlides={false}
                direction="vertical"
                speed={100}
                mousewheel={true}
                className="infinity-slide-vertical messenger-carousel max-h-[136px] w-full"
              >
                {users?.slice(4)?.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <Link href="/chat" className="avatar size-60p">
                      <Image
                        width={60}
                        height={60}
                        src={item?.avatar}
                        className="rounded-full"
                        alt="avatar"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftRightSidebar;
