"use client";

import { useState } from "react";
import AnimateHeight from "react-animate-height";
import { faqType } from "@/config/types";
import Image from "next/image";
import React from "react";

const HeroSkills = ({ faqItems }: { faqItems: faqType[] }) => {
  const [toggle, setToggle] = useState<number | null>(0);

  return (
    <>
      {faqItems?.map((item, idx) => (
        <div key={idx}>
          <button
            onClick={() => (toggle !== idx ? setToggle(idx) : setToggle(null))}
            className="py-20p rounded-2xl flex items-center justify-between gap-2.5 w-full"
          >
            <div className="grid grid-cols-[64px_1fr] gap-10 items-start mt-10">
              <div className="w-24 h-24 overflow-hidden border-s-w-neutral-1">
                <Image                  
                  src={item?.icon} 
                  width={64}
                  height={64}
                  alt={item?.name} 
                  className="w-full object-cover" 
                  style={{ color: 'transparent' }}
                /> 
              </div>
              <div className="">
                <div className="heading-6 text-left font-medium ml-0">
                  {item?.name}
                </div>
                 <div className="text-left text-w-neutral-1">
                  {item?.description}
                </div>
              </div>             
            </div>
            <span
              className={`${
                toggle == idx ? "text-w-neutral-1" : ""
              }shrink-0 icon-24`}
            >
              <i
                className={`ti ${
                  toggle == idx
                    ? "rotate-180 ti-chevron-down"
                    : "rotate-0 ti-chevron-up"
                }`}
              ></i>
            </span>
          </button>
          <AnimateHeight
            height={toggle == idx ? "auto" : 0}
            duration={500}
            className="transition-1"
          >
            <p className="text-m-regular text-left text-w-neutral-4 pb-20p">
              {item?.description}
            </p>
          </AnimateHeight>
        </div>
      ))}
    </>
  );
};

export default HeroSkills;
