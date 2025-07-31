"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { gaspProps } from "@/config/types";
import SplitType from "split-type";

// Register the plugins
gsap.registerPlugin(ScrollTrigger);

const TextSplitBottomLines = ({
  as: Tag = "h2",
  children,
  className = "",
  ...props
}: gaspProps) => {
  const textRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    let ctx = gsap.context(() => {
      if (textRef.current) {
        try {
          const mySplitText = new SplitType(textRef.current, {
            types: "words,lines,chars",
            tagName: "span",
          });

          gsap.from(mySplitText.lines, {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: "back.inOut",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 95%",
              end: "bottom 80%",
              toggleActions: "play none none none",
            },
          });

          gsap.to(mySplitText.lines, {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
            delay: 2.2, // Adjusted delay to account for the initial animation
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          });
        } catch (error) {
          console.error("Error creating SplitText:", error);
        }
      }
    }, textRef);

    return () => ctx.revert(); // This will clean up the GSAP animations when the component unmounts
  }, []);

  return (
    <Tag ref={textRef} className={`reveal-text ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default TextSplitBottomLines;
