"use client";

import { motionProps } from "@/config/types";
import { motion } from "framer-motion";

const FadeDown = ({ children, className, onClick }: motionProps) => {
  return (
    <motion.div
      onClick={onClick}
      className={className}
      initial={{ opacity: 0, translateY: -60 }}
      whileInView={{
        opacity: 1,
        translateY: -0,
        transition: { duration: 0.8 },
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
export default FadeDown;
