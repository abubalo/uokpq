import React from "react";
import { motion } from "framer-motion";

const HamburgerToCancel: React.FC<{ isOpen: boolean; onOpen: () => void }> = ({
  isOpen,
  onOpen,
}) => {
  // Variants for each path
  const topPathVariants = {
    closed: { d: "M3 6h18" }, // Hamburger top line
    open: { d: "M6 6l12 12" }, // Cross top line
  };

  const middlePathVariants = {
    closed: { opacity: 1 }, // Hamburger middle line
    open: { opacity: 0 }, // Hide middle line when open
  };

  const bottomPathVariants = {
    closed: { d: "M3 18h18" }, // Hamburger bottom line
    open: { d: "M6 18L18 6" }, // Cross bottom line
  };

  const handleClick = () => {
    onOpen();
  };

  return (
    <motion.svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width="24"
      height="24"
    >
      <motion.path
        variants={topPathVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={{ duration: 0.3 }}
      />
      <motion.path
        variants={middlePathVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 12h18"
        transition={{ duration: 0.3 }}
      />
      <motion.path
        variants={bottomPathVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={{ duration: 0.3 }}
      />
    </motion.svg>
  );
};

export default HamburgerToCancel;
