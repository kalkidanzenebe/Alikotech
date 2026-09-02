import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds of delay before the reveal starts. */
  delay?: number;
  /** Direction of the entrance offset. */
  from?: "bottom" | "left" | "right" | "none";
  /** Render as a list item / other element instead of a div. */
  as?: "div" | "li" | "section" | "article" | "header";
}

/**
 * Subtle fade + short travel reveal. Falls back to a plain fade when the user
 * prefers reduced motion.
 */
const Reveal = ({ children, className, delay = 0, from = "bottom", as = "div" }: RevealProps) => {
  const reduced = useReducedMotion();
  const offset = reduced || from === "none" ? {} : from === "bottom" ? { y: 18 } : from === "left" ? { x: -18 } : { x: 18 };
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduced ? 0.2 : 0.55, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
};

/** Parent wrapper that staggers direct `RevealItem` children. */
export const RevealGroup = ({
  children,
  className,
  stagger = 0.07,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) => {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : stagger } },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
};

export const RevealItem = ({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) => {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.2 : 0.5, ease: EASE } },
  };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
};

export default Reveal;
