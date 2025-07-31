"use client";

import { motionProps } from "@/config/types";
import { motion } from "framer-motion";

const AnimateCard = ({ children, i }: motionProps) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div key={i} variants={item} viewport={{ once: true, amount: 0.3 }}>
      {children}
    </motion.div>
  );
};
export default AnimateCard;
