"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { CopyButton } from "@/components/copy-button";
import {
  TICKER,
  CONTRACT,
  PUMPFUN_URL,
  FEE_TO_CHARITY_PCT,
  FEE_TO_OPS_PCT,
} from "@/lib/token";
import { CHARITY } from "@/lib/charity";

// Horizontal bar proportions for the 90/10 fee split.
const CHARITY_PCT = FEE_TO_CHARITY_PCT; // 90
const OPS_PCT = FEE_TO_OPS_PCT; // 10

export function Coin() {
  return (
    <section
      data-section="coin"
      className="bg-bg-base py-24 md:py-32"
      aria-label="About the $RYOT coin"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10">

        {/* ── Heading + portrait (2-col on md+) ──────────────────── */}
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16">
          <Reveal delay={0}>
            <div>
              {/* Eyebrow label */}
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-secondary mb-4">
                The coin
              </p>

              {/* Ticker with entrance pop — fires once on first reveal */}
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-text-primary md:text-5xl">
                <motion.span
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-accent"
                >
                  ${TICKER},
                </motion.span>{" "}
                plainly.
              </h2>

              {/* Body — cause-centered, no founder framing */}
              <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-[17px]">
                {TICKER} is a Solana memecoin. Every time it trades, pump.fun
                collects a small creator fee.{" "}
                <strong className="font-medium text-text-primary">
                  {CHARITY_PCT}% of those fees go directly to{" "}
                  {CHARITY.name}
                </strong>
                . The rest covers the cost of making those donations happen.
              </p>
            </div>
          </Reveal>

          {/* Anime portrait of Ryot — character beat next to the headline.
              Slight rotation + warm card treatment + caption. */}
          <Reveal delay={0.08}>
            <motion.figure
              initial={{ rotate: -2.5 }}
              whileHover={{ rotate: 0, scale: 1.015 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-fit md:ml-auto"
              style={{
                filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.45))",
              }}
            >
              <div className="border border-hairline bg-bg-warm p-3">
                <Image
                  src="/ryot/anime.png"
                  alt="Ryot, illustrated in anime style, sitting on grass"
                  width={768}
                  height={1280}
                  sizes="(max-width: 768px) 280px, (max-width: 1200px) 360px, 400px"
                  priority={false}
                  className="block h-auto w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]"
                />
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  <span>Ryot, age 4</span>
                  <span className="text-text-primary">saved</span>
                </figcaption>
              </div>
            </motion.figure>
          </Reveal>
        </div>

        {/* ── 90/10 split bar ──────────────────────────────────────── */}
        <Reveal delay={0.1} className="mt-16 md:mt-24">
          {/* Labels row */}
          <div className="flex justify-between mb-2 font-mono text-xs text-text-secondary">
            <span>{CHARITY_PCT}% → {CHARITY.name}</span>
            <span>{OPS_PCT}% Operations</span>
          </div>

          {/* The bar — 5px tall, hairline-separated segments */}
          <div className="relative flex h-[5px] w-full overflow-hidden rounded-full">
            {/* Charity fill */}
            <div
              className="h-full bg-accent"
              style={{ width: `${CHARITY_PCT}%` }}
              aria-label={`${CHARITY_PCT}% Northshore Humane Society`}
            />
            {/* Ops fill */}
            <div
              className="h-full flex-1 bg-bg-raised border border-hairline"
              aria-label={`${OPS_PCT}% operations`}
            />
          </div>

          {/* Transparency note — non-negotiable per spec */}
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-text-muted">
            The {OPS_PCT}% covers the Solana transaction cost of every
            donation, plus boosts and DEX listings. Not founder profit.
          </p>
        </Reveal>

        {/* ── Contract address + buy CTA ───────────────────────────── */}
        {/* Slight left offset from the heading column — asymmetric composition */}
        <Reveal delay={0.2} className="mt-14 md:mt-20 md:ml-8">
          <div className="max-w-xl">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-text-secondary">
              Contract address
            </p>

            {/* CopyButton renders the contract address with middle-truncation on mobile */}
            <CopyButton
              value={CONTRACT}
              label="Copy contract address"
              className="w-full"
            />

            {/* Buy CTA */}
            <div className="mt-8">
              <motion.a
                href={PUMPFUN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "inline-flex items-center gap-2 rounded-sm",
                  "bg-accent px-6 py-3",
                  "font-body text-sm font-semibold text-bg-base",
                  "cursor-pointer select-none",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                ].join(" ")}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 32px rgba(201,122,63,0.35)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                Buy ${TICKER} on pump.fun
                {/* External link indicator — small arrow, no emoji */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="opacity-70"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </motion.a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
