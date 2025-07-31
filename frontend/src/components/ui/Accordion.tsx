"use client";

import { useState } from "react";
import AnimateHeight from "react-animate-height";
import { faqType } from "@/config/types";
import { FadeUp } from "@/lib/framerMotion";
import React from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const Accordion = ({ faqItems }: { faqItems: faqType[] }) => {
  const [toggle, setToggle] = useState<number | null>(0);

  return (
    <>
      {faqItems?.map((item, idx) => (
        <FadeUp key={idx}>
          <div>
            <button
              onClick={() =>
                toggle !== idx ? setToggle(idx) : setToggle(null)
              }
              className={`${
                toggle == idx
                  ? "bg-primary text-b-neutral-4"
                  : "text-w-neutral-4"
              } px-20p py-4 rounded-12 border border-shap flex items-center justify-between gap-2.5 w-full transition-1`}
            >
              <span className="text-base text-left font-medium">
                {item?.question}
              </span>
              <span className="shrink-0 icon-24">
                {toggle == idx ? (
                  <IconChevronUp size={24} />
                ) : (
                  <IconChevronDown size={24} />
                )}
              </span>
            </button>
            <AnimateHeight
              height={toggle == idx ? "auto" : 0}
              duration={500}
              className="transition-1"
            >
              <p className="text-m-regular text-left text-w-neutral-4 pt-16p">
                Yes, winners of community tournaments are rewarded with exciting
                prizes. These prizes may include in-game rewards such as rare
                skins, exclusive items, or bonus currency. Additionally, some
                tournaments offer physical merchandise, gift cards, or
                recognition in the form of leaderboard features and shoutouts in
                the community. The prizes aim to incentivize fair competition
                and celebrate the achievements of skilled players.
              </p>
            </AnimateHeight>
          </div>
        </FadeUp>
      ))}
    </>
  );
};

export default Accordion;
