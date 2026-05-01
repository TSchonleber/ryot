"use client";

import { useReducedMotion, motion } from "framer-motion";
import { Reveal } from "@/components/reveal";

export function Story() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      data-section="story"
      className="bg-bg-warm py-24 md:py-36 lg:py-40"
    >
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        {/* Beat 1 */}
        <Reveal duration={0.6} yOffset={20}>
          <p className="font-display text-4xl leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Four months old. Two families had said no. The breeder&rsquo;s clock
            was running out.
          </p>
        </Reveal>

        {/* Beat 2 — with hairline accent line above */}
        <Reveal duration={0.6} yOffset={20} delay={0.05} className="mt-16 md:mt-20">
          {/* Hairline: draws left-to-right when the beat enters view */}
          <motion.div
            className="mb-6 h-px bg-accent"
            style={{ maxWidth: 96, transformOrigin: "left center" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: "easeOut" }
            }
          />
          <p className="font-display text-4xl leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            He got out. He&rsquo;s four now.
          </p>
        </Reveal>

        {/* Beat 3 — deliberate weight: slower duration, larger yOffset */}
        <Reveal duration={0.9} yOffset={28} delay={0.05} className="mt-16 md:mt-20">
          <p className="font-display text-4xl leading-tight tracking-tight text-text-secondary sm:text-5xl lg:text-6xl">
            Tens of thousands of animals don&rsquo;t.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
