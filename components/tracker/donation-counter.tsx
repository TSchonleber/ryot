"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

type Props = {
  amountUsd: number;
};

export function DonationCounter({ amountUsd }: Props) {
  const [display, setDisplay] = useState(0);
  const prefersReduced = useReducedMotion();
  const hasAnimated = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (amountUsd === 0 || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          if (prefersReduced) {
            setDisplay(amountUsd);
            return;
          }

          const controls = animate(0, amountUsd, {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setDisplay(Math.floor(v)),
            onComplete: () => setDisplay(amountUsd),
          });

          return () => controls.stop();
        }
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [amountUsd, prefersReduced]);

  const formatted = `$${display.toLocaleString("en-US")}`;

  return (
    <div ref={containerRef} className="flex items-baseline gap-3 flex-wrap justify-center md:justify-start">
      <span
        className="font-display text-6xl sm:text-7xl md:text-8xl leading-none text-text-primary tabular-nums"
        aria-label={`${formatted} raised`}
      >
        {formatted}
      </span>
    </div>
  );
}
