import React from "react";
import { motion } from "framer-motion";

const HamburgerToBackArrow: React.FC<{
  isFocused: boolean;
  onArrowClick: () => void;
}> = ({ isFocused, onArrowClick }) => {
  const variants = {
    closed: { d: "M3 12h18M3 6h18M3 18h18" },
    open: { d: "M19 12H5M12 19l-7-7 7-7" },
  };

  return (
    <motion.svg
      onClick={onArrowClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width="24"
      height="24"
    >
      <motion.path
        variants={variants}
        initial="closed"
        animate={isFocused ? "open" : "closed"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </motion.svg>
  );
};

export default HamburgerToBackArrow;
