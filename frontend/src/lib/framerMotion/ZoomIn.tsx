"use client";

import { motionProps } from "@/config/types";
import { motion } from "framer-motion";
const ZoomIn = ({ children, className, onClick }: motionProps) => {
  return (
    <motion.div
      onClick={onClick}
      viewport={{ once: true }}
      className={className}
      initial={{ opacity: 0, scale: 0.5, translateY: 40 }}
      whileInView={{
        opacity: 1,
        translateY: 0,
        scale: 1,
        transition: { duration: 0.7 },
      }}
    >
      {children}
    </motion.div>
  );
};
export default ZoomIn;
