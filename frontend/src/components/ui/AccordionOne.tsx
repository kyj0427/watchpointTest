"use client";

import { useState } from "react";
import AnimateHeight from "react-animate-height";
import { faqType } from "@/config/types";
import React from "react";

const AccordionOne = ({ faqItems }: { faqItems: faqType[] }) => {
  const [toggle, setToggle] = useState<number | null>(0);

  return (
    <>
      {faqItems?.map((item, idx) => (
        <div key={idx}>
          <button
            onClick={() => (toggle !== idx ? setToggle(idx) : setToggle(null))}
            className="py-20p rounded-2xl flex items-center justify-between gap-2.5 w-full"
          >
            <span className="heading-5 text-left font-medium text-w-neutral-1">
              {item?.question}
            </span>
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
              {item?.answer}
            </p>
          </AnimateHeight>
        </div>
      ))}
    </>
  );
};

export default AccordionOne;
