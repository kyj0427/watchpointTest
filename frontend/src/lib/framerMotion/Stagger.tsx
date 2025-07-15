"use client";
import { motionProps } from "@/config/types";
import { motion } from "framer-motion";

const variable = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99], // Custom easing function
    },
  }),
};

const Stagger = ({ i, children, className }: motionProps) => {
  return (
    <motion.div
      className={className}
      key={i}
      variants={variable}
      initial="initial"
      whileInView="animate"
      custom={i}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Stagger;
