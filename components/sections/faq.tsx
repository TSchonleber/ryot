"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CHARITY } from "@/lib/charity";
import {
  FEE_TO_CHARITY_PCT,
  FEE_TO_OPS_PCT,
  PUMPFUN_URL,
} from "@/lib/token";
import { Reveal } from "@/components/reveal";

type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

const FAQS: FaqItem[] = [
  {
    question: "Is this real? Who runs $RYOT?",
    answer: (
      <>
        <p>
          Yes. $RYOT is a real memecoin on pump.fun with a real donation
          mechanism. It was built and is maintained by a long-time{" "}
          {CHARITY.shortName} supporter who wanted to put the community energy
          of memecoins toward something that matters.
          {/* TODO: confirm exact handle / name for public attribution */}
        </p>
        <p className="mt-3">
          The contract is public, the fee split is hardcoded into how pump.fun
          creator fees work, and the donation cadence will be posted here as
          it happens.
        </p>
      </>
    ),
  },
  {
    question: "Where do the fees go?",
    answer: (
      <>
        <p>
          {FEE_TO_CHARITY_PCT}% of all pump.fun creator fees route directly to{" "}
          {CHARITY.name}.
        </p>
        <p className="mt-3">
          The remaining {FEE_TO_OPS_PCT}% covers the actual cost of running
          this: Solana charges a transaction fee on every on-chain donation
          transfer, and keeping the coin visible requires occasional paid
          boosts and DEX listings. That {FEE_TO_OPS_PCT}% is operational
          expense, not founder income.
        </p>
        <p className="mt-3">
          No salary. No profit margin. The split exists because the
          alternative is fewer donations reaching NHS, not more.
        </p>
      </>
    ),
  },
  {
    question: `How does ${CHARITY.name} actually receive the money?`,
    answer: (
      <>
        <p>
          Pump.fun creator fees accrue in SOL. They get converted to USD and
          donated to {CHARITY.name} on a regular frequency as fees accumulate.
          The more the coin trades, the more often donations land.
        </p>
        <p className="mt-3">
          A donate.gg integration is in progress. Once live, every donation
          will be visible on-chain through the tracker on this page. Until
          then, donation receipts will be shared publicly as they happen.
        </p>
      </>
    ),
  },
  {
    question: "Is donate.gg live yet?",
    answer: (
      <p>
        Not yet. The coin just launched and the donate.gg setup is in
        progress. The tracker on this page shows $0 right now — that&apos;s
        accurate, not a bug. You&apos;re early. When donations start moving
        and the integration is live, this page updates automatically.
      </p>
    ),
  },
  {
    question: "How do I help if I don't buy the coin?",
    answer: (
      <>
        <p>
          Donate directly to {CHARITY.name} at{" "}
          <a
            href={CHARITY.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary underline underline-offset-4 decoration-accent/50 hover:decoration-accent transition-colors duration-150"
          >
            northshorehumane.org
          </a>
          . Every dollar goes straight to them.
        </p>
        <p className="mt-3">
          If you want to help the coin side without buying: share this page,
          share the{" "}
          <a
            href={PUMPFUN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary underline underline-offset-4 decoration-accent/50 hover:decoration-accent transition-colors duration-150"
          >
            pump.fun link
          </a>
          , or just tell someone about NHS. The cause matters more than the
          buy.
        </p>
      </>
    ),
  },
];

function AccordionRow({
  item,
  isOpen,
  onToggle,
  index,
  isLast,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isLast: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const animationProps = shouldReduceMotion
    ? {
        initial: false,
        animate: { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 },
        transition: { duration: 0 },
      }
    : {
        initial: false,
        animate: {
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        },
        transition: { duration: 0.22, ease },
      };

  return (
    <div className={!isLast ? "border-b border-hairline" : undefined}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="font-body font-medium text-text-primary text-base sm:text-lg leading-snug">
          {item.question}
        </span>
        {/* Chevron: rotates 90deg when open */}
        <svg
          className={`shrink-0 w-4 h-4 text-text-muted transition-transform duration-200 ease-out group-hover:text-accent ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <motion.div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        ref={contentRef}
        className="overflow-hidden"
        {...animationProps}
      >
        <div className="pb-5 text-text-secondary text-base leading-relaxed font-body">
          {item.answer}
        </div>
      </motion.div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section
      data-section="faq"
      className="bg-bg-base px-6 py-24 sm:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-6">
            Questions
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="font-display text-4xl sm:text-5xl text-text-primary leading-tight mb-12">
            FAQ.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="border-t border-hairline">
            {FAQS.map((item, i) => (
              <AccordionRow
                key={item.question}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                isLast={i === FAQS.length - 1}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
