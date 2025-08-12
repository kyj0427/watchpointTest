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
                이 커뮤니티 게시판은 모든 이용자가 서로 존중하며 소통할 수 있는
                공간입니다. 욕설, 비방, 차별적 표현, 불법 콘텐츠, 스팸 및
                광고성 게시물은 금지됩니다.  
                다른 사람의 개인정보를 포함한 글이나 사진은 올리지 말아주세요.  
                게시글은 주제와 맞는 게시판에 작성하며, 중복 글과 무분별한 도배는
                자제해주시기 바랍니다.  
                운영진은 규칙 위반 시 게시글 삭제, 경고, 이용 제한 등의 조치를
                취할 수 있으며, 모든 규칙은 공정한 운영과 건강한 커뮤니티 유지를
                위해 존재합니다.
              </p>
            </AnimateHeight>
          </div>
        </FadeUp>
      ))}
    </>
  );
};

export default Accordion;
