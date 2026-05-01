"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { WaterRipple } from "@/components/water-ripple";

const HEADLINE_WORDS = ["He", "made", "it.", "Most", "don't."];

export function Hero() {
  const reduceMotion = useReducedMotion();

  // Word-by-word stagger container variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.3,
      },
    },
  };

  const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

  const wordVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.5,
        ease: EASE,
      },
    },
  };

  const subheadVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : 0.85,
        ease: EASE,
      },
    },
  };

  const storyLinkVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : 1.15,
        ease: EASE,
      },
    },
  };

  const scrollCueVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.8,
        delay: reduceMotion ? 0 : 1.4,
      },
    },
  };

  return (
    <section
      data-section="hero"
      className="relative h-dvh min-h-[560px] overflow-hidden"
    >
      {/* ── Photo layer ── */}
      <div className="absolute inset-0">
        <Image
          src="/ryot/pond.jpg"
          alt="Ryot, a husky, standing at the edge of a pond"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
          /*
           * Portrait photo (768×1024) cropped to wide viewport.
           * object-position anchors at 45% horizontal (Ryot is left of center)
           * and 28% vertical (keeps his head and body in frame at 16:9 crop).
           */
          style={{ objectPosition: "45% 28%" }}
        />
      </div>

      {/* ── Cinematic gradient overlay ──
          Not a flat dark wash — a directional gradient that:
          - Darkens the bottom where copy lives (legibility)
          - Pulls left-to-right vignette to isolate Ryot against the water
          - Keeps the upper pond area relatively open (for the ripple to read)
          Three-layer composite for depth without flatness.
      */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            // Bottom gradient: dark base for text legibility
            "linear-gradient(to top, rgba(26,22,18,0.92) 0%, rgba(26,22,18,0.6) 28%, transparent 52%)",
            // Top vignette: slight darkening so sky edge doesn't blow out
            "linear-gradient(to bottom, rgba(26,22,18,0.35) 0%, transparent 25%)",
            // Left vignette: anchors Ryot, adds depth to his silhouette
            "linear-gradient(to right, rgba(26,22,18,0.4) 0%, transparent 45%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />

      {/* ── Water ripple — pond surface only, upper portion of frame ──
          Hidden on small screens (sm: breakpoint) for perf.
          Clipped to upper ~55% where the pond is.
      */}
      <WaterRipple className="absolute inset-x-0 top-0 h-[55%] hidden sm:block" />

      {/* ── Copy block — bottom-left, off-grid ──
          Positioned to sit beside Ryot rather than on top of him.
          The left vignette provides the text backdrop.
          Max-width constrains line length; right side stays open.
      */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 sm:pb-16 sm:px-10 md:px-14 lg:px-16">
        <div className="max-w-xl">
          {/* Headline: display serif, word-by-word entrance */}
          <motion.h1
            className="font-display text-text-primary leading-[1.05] tracking-[-0.02em] mb-4"
            style={{
              fontSize: "clamp(2.75rem, 8vw, 5.5rem)",
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-label="He made it. Most don't."
          >
            {HEADLINE_WORDS.map((word, i) => (
              <motion.span
                key={word}
                variants={wordVariants}
                style={{ display: "inline-block" }}
                className={i > 0 ? "ml-[0.28em]" : ""}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subhead */}
          <motion.p
            className="font-body text-text-secondary leading-relaxed"
            style={{ fontSize: "clamp(0.9375rem, 2.2vw, 1.125rem)" }}
            variants={subheadVariants}
            initial="hidden"
            animate="visible"
          >
            Meet Ryot. $RYOT exists so more animals get the chance he got.
          </motion.p>

          {/* Story link — secondary, lands after subhead */}
          <motion.p
            className="mt-4 font-body text-sm sm:text-base"
            variants={storyLinkVariants}
            initial="hidden"
            animate="visible"
          >
            <a
              href="/story"
              className="inline-block py-1 text-text-primary underline underline-offset-4 decoration-accent/50 hover:decoration-accent transition-colors duration-150"
            >
              Read his story &rarr;
            </a>
          </motion.p>
        </div>
      </div>

      {/* ── Scroll cue — thin animated hairline ──
          A quiet vertical line that "draws down" to indicate more below.
          Positioned bottom-center, keeps it subtle.
      */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        variants={scrollCueVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        <ScrollLine reduceMotion={!!reduceMotion} />
      </motion.div>
    </section>
  );
}

/** Thin animated vertical line scroll cue */
function ScrollLine({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      style={{
        width: "1px",
        height: "40px",
        position: "relative",
        overflow: "hidden",
        background: "rgba(245,233,212,0.08)",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1px",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(201,122,63,0.8), rgba(245,233,212,0.3))",
          originY: 0,
        }}
        animate={
          reduceMotion
            ? { scaleY: 1 }
            : {
                scaleY: [0, 1, 1, 0],
                y: ["0%", "0%", "100%", "100%"],
              }
        }
        transition={
          reduceMotion
            ? {}
            : {
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 0.6,
                ease: "easeInOut",
                times: [0, 0.4, 0.6, 1],
              }
        }
      />
    </div>
  );
}
