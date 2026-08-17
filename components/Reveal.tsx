'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Lightweight scroll-in fade animation wrapper.
 * Smoothly fades and slides content into view when scrolling down.
 * Performance-first: animates once, respects prefers-reduced-motion, hardware-accelerated.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.65,
  y = 24,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'footer' | 'figure' | 'nav' | 'header';
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as 'div'];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1], // fluid cubic bezier ease-out
        delay,
      }}
    >
      {children}
    </MotionTag>
  );
}
