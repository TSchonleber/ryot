"use client";

// TODO: replace with a verified statistic from a citable source (e.g., ASPCA, HSUS, Best Friends).
// Until verified, STAKES_STAT must remain null so the pending marker renders instead of a fabricated number.
const STAKES_STAT = null as null | {
  number: string;  // display string, e.g. "3.9 million"
  unit: string;    // label below the number, e.g. "animals euthanized in U.S. shelters each year"
  source: string;  // e.g. "ASPCA, 2023"
  sourceUrl: string;
};

import { useEffect, useRef } from "react";
import { useReducedMotion, animate } from "framer-motion";
import { CHARITY } from "@/lib/charity";
import { Reveal } from "@/components/reveal";

export function Stakes() {
  const reducedMotion = useReducedMotion();
  const numberRef = useRef<HTMLSpanElement>(null);

  // Count-up animation — only runs when a real stat is wired in.
  // Parses the leading numeric portion of STAKES_STAT.number, animates 0 → value over 1.2s.
  // Skips entirely when reducedMotion is true, rendering the final value immediately instead.
  useEffect(() => {
    if (!STAKES_STAT || reducedMotion) return;

    const numeric = parseFloat(STAKES_STAT.number.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) return;

    const suffix = STAKES_STAT.number.replace(/^[0-9.,\s]+/, "").trim();
    const decimals = (STAKES_STAT.number.match(/\.(\d+)/) ?? ["", ""])[1].length;

    const controls = animate(0, numeric, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (!numberRef.current) return;
        numberRef.current.textContent =
          v.toFixed(decimals) + (suffix ? " " + suffix : "");
      },
    });

    return () => controls.stop();
  }, [reducedMotion]);

  const sectionPadding = STAKES_STAT
    ? "py-24 md:py-32 lg:py-40"
    : "py-20 md:py-24";

  return (
    <section
      data-section="stakes"
      className={`bg-bg-base ${sectionPadding}`}
    >
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        {STAKES_STAT ? (
          <>
            <Reveal duration={0.6} yOffset={20}>
              <div className="mb-10">
                <p className="font-display text-6xl leading-none tracking-tight text-text-primary sm:text-7xl lg:text-8xl">
                  <span ref={numberRef}>
                    {reducedMotion ? STAKES_STAT.number : "0"}
                  </span>
                </p>
                <p className="mt-3 font-body text-base text-text-secondary">
                  {STAKES_STAT.unit}
                </p>
                <p className="mt-1 font-mono text-xs text-text-muted">
                  Source:{" "}
                  <a
                    href={STAKES_STAT.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 transition-colors hover:text-text-secondary"
                  >
                    {STAKES_STAT.source}
                  </a>
                </p>
              </div>
            </Reveal>

            <Reveal duration={0.6} yOffset={20} delay={0.08}>
              <p className="font-body text-lg leading-relaxed text-text-secondary sm:text-xl">
                {CHARITY.name} is one of the rescues refusing to let a clock decide.
                $RYOT funds that fight.
              </p>
            </Reveal>
          </>
        ) : (
          <Reveal duration={0.6} yOffset={20}>
            <p className="font-display text-2xl leading-snug text-text-primary sm:text-3xl">
              {CHARITY.name} is one of the rescues refusing to let a clock decide
              whether an animal lives.{" "}
              <span className="text-text-secondary">$RYOT funds that fight.</span>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
