"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import { gaspProps } from "@/config/types";

gsap.registerPlugin(ScrollTrigger);

const TextSplitTop = ({
  as: Tag = "h2",
  children,
  className = "",
  ...props
}: gaspProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    let ctx = gsap.context(() => {
      if (containerRef.current) {
        const splitText = new SplitType(containerRef.current, {
          types: "words,chars",
          tagName: "span",
        });
        const chars = splitText.chars;

        if (chars) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 95%",
              end: "bottom 80%",
              toggleActions: "play none none none",
              // onEnter: () => tl.restart(),
              // onEnterBack: () => tl.restart(),
            },
          });

          tl.fromTo(
            chars,
            {
              y: -25,
              rotation: -3,
              opacity: 0,
              scale: 0.8,
              autoAlpha: 0,
            },
            {
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.05,
              ease: "elastic.out(1, 0.7)",
              autoAlpha: 1,
            }
          ).to(chars, {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
            delay: 2,
            autoAlpha: 1,
          });
        }
      }
    }, containerRef);

    return () => ctx.revert(); // This will clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <Tag ref={containerRef} className={`${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default TextSplitTop;
