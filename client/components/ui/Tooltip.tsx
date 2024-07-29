import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  text: string;
  children: React.ReactNode;
  className?: string;
  offset?: number;
};

const ToolTip: React.FC<Props> = ({
  text,
  children,
  className = "",
  offset = 8,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [tooltipPlacement, setTooltipPlacement] = useState<
    "top" | "bottom" | "left" | "right"
  >("bottom");

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const showTooltip = () => {
    setIsVisible(true);
    updateTooltipPosition();
  };
  const hideTooltip = () => setIsVisible(false);

  const updateTooltipPosition = () => {
    if (!tooltipRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;
    let placement: "top" | "bottom" | "left" | "right" = "bottom";

    // Check if there's enough space below
    if (containerRect.bottom + tooltipRect.height + offset <= viewportHeight) {
      top = containerRect.height + offset;
      left = (containerRect.width - tooltipRect.width) / 2;
      placement = "bottom";
    }
    // Check if there's enough space above
    else if (containerRect.top - tooltipRect.height - offset >= 0) {
      top = -tooltipRect.height - offset;
      left = (containerRect.width - tooltipRect.width) / 2;
      placement = "top";
    }
    // Check if there's enough space to the right
    else if (
      containerRect.right + tooltipRect.width + offset <=
      viewportWidth
    ) {
      top = (containerRect.height - tooltipRect.height) / 2;
      left = containerRect.width + offset;
      placement = "right";
    }
    // Default to left if no other position works
    else {
      top = (containerRect.height - tooltipRect.height) / 2;
      left = -tooltipRect.width - offset;
      placement = "left";
    }

    // Adjust for viewport boundaries
    if (containerRect.left + left < 0) {
      left = -containerRect.left + 10;
    } else if (containerRect.left + left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - containerRect.left - tooltipRect.width - 10;
    }

    if (containerRect.top + top < 0) {
      top = -containerRect.top + 10;
    } else if (containerRect.top + top + tooltipRect.height > viewportHeight) {
      top = viewportHeight - containerRect.top - tooltipRect.height - 10;
    }

    setTooltipPosition({ top, left });
    setTooltipPlacement(placement);
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      ref={containerRef}
    >
      <div className="relative z-10">{children}</div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-neutral-600/30 backdrop-blur-md rounded-full p-2 -m-3 z-0"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            ref={tooltipRef}
            className={`
              absolute z-20 text-[12px] font-medium text-white bg-gray-900 rounded-md shadow-sm
              transition-opacity duration-300 pointer-events-none select-none
            `}
            style={{
              top: tooltipPosition.top,
              // left: tooltipPosition.left,
              padding: "8px 16px",
            }}
            data-placement={tooltipPlacement}
          >
            {text}
            <div className="tooltip-arrow" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolTip;
