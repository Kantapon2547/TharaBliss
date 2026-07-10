"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  style?: React.CSSProperties;
  className?: string;
  repeat?: boolean;
}

const OFFSETS: Record<NonNullable<RevealProps["direction"]>, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 28,
  style,
  className,
  repeat = false,
}: RevealProps) {
  const offset = OFFSETS[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x * distance,
        y: offset.y * distance,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: !repeat, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  baseDelay = 0,
  step = 0.1,
  direction = "up",
  distance = 28,
}: {
  children: ReactNode[];
  baseDelay?: number;
  step?: number;
  direction?: RevealProps["direction"];
  distance?: number;
}) {
  return (
    <>
      {children.map((child, i) => (
        <Reveal key={i} delay={baseDelay + i * step} direction={direction} distance={distance}>
          {child}
        </Reveal>
      ))}
    </>
  );
}
