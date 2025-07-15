"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { gaspProps } from "@/config/types";

gsap.registerPlugin(ScrollTrigger);

const TextSplitBottom = ({
  as: Tag = "h2",
  children,
  className = "",
  ...props
}: gaspProps) => {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    let ctx = gsap.context(() => {
      if (textRef.current) {
        const splitText = new SplitType(textRef.current, {
          types: "words,chars",
          tagName: "span",
        });

        const chars = splitText.chars;

        if (chars) {
          gsap.fromTo(
            chars,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.05,
              ease: "elastic.out(1, 0.7)",
              scrollTrigger: {
                trigger: textRef.current,
                toggleActions: "play none none none",
                start: "top 95%",
                end: "bottom 80%",
              },
            }
          );

          gsap.to(chars, {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
            delay: 2, // Adjusted delay to account for the initial animation
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          });
        }
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

export default TextSplitBottom;
