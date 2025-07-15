"use client";

import { motionProps } from "@/config/types";
import { motion } from "framer-motion";

const AnimateSpin = ({ children, className, onClick }: motionProps) => {
  return (
    <motion.div
      onClick={onClick}
      className={className}
      initial={{ opacity: 0, scale: 0, translateY: 60 }}
      whileInView={{
        opacity: 1,
        rotate: 360,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 280,
          damping: 80,
        },
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
export default AnimateSpin;
