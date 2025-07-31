"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import { gaspProps } from "@/config/types";

const TextSplitLeft = ({
  as: Tag = "h2",
  children,
  className = "",
  ...props
}: gaspProps) => {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    let ctx = gsap.context(() => {
      if (
        typeof window !== "undefined" &&
        window.innerWidth >= 700 &&
        textRef.current
      ) {
        const splitText = new SplitType(textRef.current, {
          types: "words,chars",
          tagName: "span",
        });

        const chars = splitText.chars;

        if (chars) {
          chars.forEach((char, index) => {
            gsap.from(char, {
              duration: 0.8,
              x: 70,
              delay: index * 0.03,
              autoAlpha: 0,
              scrollTrigger: {
                trigger: char,
                start: "top 95%",
                end: "bottom 80%",
                toggleActions: "play none none none",
              },
            });
          });
        }

        gsap.to(textRef.current, {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 100%",
          },
        });
      }
    }, textRef);

    return () => ctx.revert(); // This will clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <Tag ref={textRef} className={`${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default TextSplitLeft;
