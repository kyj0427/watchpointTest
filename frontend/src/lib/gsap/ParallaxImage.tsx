"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type parallaxType = {
  src: StaticImageData | string;
  containerStyle?: string;
  yPercent?: number;
};

const ParallaxImage = ({
  src,
  containerStyle = "h-auto",
  yPercent = -40,
}: parallaxType) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    if (imageRef.current && window.innerWidth >= 1200) {
      const ctx = gsap.context(() => {
        gsap.to(imageRef.current, {
          yPercent: yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, containerRef);
      return () => ctx.revert(); // Clean up animations on unmount
    }
  }, []);

  return (
    <div className={`${containerStyle}`}>
      <div
        ref={containerRef}
        className="h-screen w-full relative overflow-hidden"
      >
        <div ref={imageRef} className="w-full h-full relative">
          <Image
            src={src}
            alt="Parallax Image"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ParallaxImage;
