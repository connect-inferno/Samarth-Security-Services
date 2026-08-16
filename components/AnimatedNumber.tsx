'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface AnimatedNumberProps {
  value: string;
  className?: string;
  duration?: number;
}

export default function AnimatedNumber({
  value,
  className = '',
  duration = 1.6,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Extract leading digits and following suffix (e.g., "500+" -> 500 and "+")
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(match[1], 10);
    const suffix = match[2] || '';

    if (!isInView) {
      setDisplayValue(`0${suffix}`);
      return;
    }

    const controls = animate(0, targetNumber, {
      duration: Math.min(Math.max(duration, 1.2), 2.2),
      ease: [0.16, 1, 0.3, 1], // smooth exponential ease-out
      onUpdate: (latest) => {
        setDisplayValue(`${Math.round(latest)}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
