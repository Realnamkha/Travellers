"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const directionVariants = {
  up: { initial: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
};

const FadeInSection = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  repeat = false,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    triggerOnce: !repeat,
    amount: 0.2,
  });

  const { initial, visible } =
    directionVariants[direction] || directionVariants.up;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? visible : initial}
      transition={{
        duration,
        delay: delay / 1000, // convert ms to seconds
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
