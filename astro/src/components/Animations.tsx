"use client";

import type { Variants } from "framer-motion";
import { motion} from "framer-motion";
import type { ReactNode } from "react";

// ── 1. FADE UP — general purpose scroll reveal
// Usage: wrap any element, it fades + slides up when scrolled into view
export function FadeUp({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── 2. STAGGER CONTAINER — animates children one by one
// Usage: wrap a list/grid of items
export function StaggerContainer({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── 3. STAGGER ITEM — must be a child of StaggerContainer
export function StaggerItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── 4. SPLIT LINES — each line of a heading slides up on load
// Usage: hero headings, big section titles
export function SplitLines({
  lines,
  style,
  lineStyle,
}: {
  lines: (string | ReactNode)[];
  style?: React.CSSProperties;
  lineStyle?: React.CSSProperties;
}) {
  return (
    <div style={style}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={lineStyle}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ── 5. FADE IN — simple opacity only, no movement
// Usage: subtitles, body text, trust bar items
export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  style,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── 6. SLIDE IN — slides in from left or right
// Usage: brand strip text/image, two-column sections
export function SlideIn({
  children,
  from = "left",
  delay = 0,
  style,
  className,
}: {
  children: ReactNode;
  from?: "left" | "right";
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}