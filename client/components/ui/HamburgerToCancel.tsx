import React, { useState } from "react";
import { motion } from "framer-motion";

const HamburgerToCancel: React.FC<{ isOpen: boolean; onOpen: () => void }> = ({
  isOpen,
  onOpen,
}) => {
  const variants = {
    closed: {
      d: "M3 6h18M3 12h18M3 18h18", // Hamburger menu
    },
    open: [
      { d: "M6 6l12 12" }, 
      { d: "M6 18L18 6" }, 
    ],
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
        variants={variants}
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
