"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { DonationContributor } from "@/lib/donations";

type Props = {
  contributors: DonationContributor[];
};

const MAX_DISPLAY = 7;

function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

function formatHandle(handle: string | null): string {
  return handle ?? "anonymous";
}

export function RecentContributors({ contributors }: Props) {
  const prefersReduced = useReducedMotion();

  if (contributors.length === 0) return null;

  const visible = contributors.slice(0, MAX_DISPLAY);

  return (
    <div className="w-full">
      <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">
        Recent contributions
      </p>
      <ul className="divide-y divide-hairline" aria-label="Recent contributors">
        <AnimatePresence initial={false}>
          {visible.map((c) => (
            <motion.li
              key={c.id}
              layout
              initial={prefersReduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative overflow-hidden"
            >
              {/* Highlight flash: bg animates from accent-muted to transparent */}
              {!prefersReduced && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ backgroundColor: "rgba(201,122,63,0.15)" }}
                  animate={{ backgroundColor: "rgba(201,122,63,0)" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  aria-hidden="true"
                />
              )}
              <div className="relative flex items-center justify-between py-3 px-1 gap-4">
                <span className="font-body text-sm text-text-secondary truncate">
                  {formatHandle(c.handle)}
                </span>
                <span className="font-mono text-sm text-text-primary shrink-0">
                  {formatUsd(c.amountUsd)}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
