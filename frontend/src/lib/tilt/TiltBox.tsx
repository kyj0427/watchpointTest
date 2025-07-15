"use client";

import React, { ReactNode } from "react";
import Tilt from "react-parallax-tilt";
import "./ReactParallaxTilt.css";

interface tiltStylesType {
  reverse: boolean;
  max: number;
  perspective: number;
  scale: number;
  speed: number;
  transition: boolean;
  axis: null;
  reset: boolean;
  easing: string;
  glare: boolean;
  "max-glare": number;
}

const TiltBox = ({
  children,
  tiltStyles,
}: {
  children: ReactNode;
  tiltStyles?: any;
}) => {
  return (
    <Tilt className="background-stripes parallax-effect" perspective={500}>
      <div className="inner-element">{children}</div>
    </Tilt>
  );
};

export default TiltBox;
