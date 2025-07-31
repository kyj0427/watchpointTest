"use client";

import { users } from "@public/data/users";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ActiveMembers = () => {
  return (
    <div className="bg-b-neutral-3 rounded-12 px-32p py-24p">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-40p">
        <h4 className="heading-4 text-w-neutral-1 ">Active Members</h4>
        <Link
          href="./chat"
          className="inline-flex items-center gap-3 text-w-neutral-1 link-1"
        >
          View All
          <i className="ti ti-arrow-right"></i>
        </Link>
      </div>

      <Swiper
        loop={true}
        slidesPerView="auto"
        spaceBetween={16}
        centeredSlides={false}
        direction="horizontal"
        speed={1000}
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
        }}
        mousewheel={true}
        modules={[Autoplay, Mousewheel]}
        className="w-full"
      >
        {users?.slice(0, 8)?.map((item, idx) => (
          <SwiperSlide key={idx} className="!w-fit">
            <div>
              <Link href="#" className="avatar relative size-60p mb-3">
                <Image
                  className="size-60p rounded-full"
                  src={item?.avatar}
                  width={60}
                  height={60}
                  alt="avatar"
                />
                <span
                  className={`${
                    item?.status ? "online" : "offline"
                  } status-badge`}
                >
                  <IconCircleCheckFilled size={24} className="text-secondary" />
                </span>
              </Link>
              <span className="text-m-regular text-w-neutral-1 text-center w-15 overflow-hidden">
                {item?.name?.split(" ")[0]}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActiveMembers;
