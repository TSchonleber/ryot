"use client";

import { useState } from "react";
import { CHARITY } from "@/lib/charity";
import { CONTRACT, PUMPFUN_URL, FEE_TO_CHARITY_PCT, TICKER } from "@/lib/token";

// Truncates a string to show the first `head` and last `tail` chars with an ellipsis.
// Used for the contract address on mobile.
function elide(str: string, head: number, tail: number): string {
  if (str.length <= head + tail + 3) return str;
  return `${str.slice(0, head)}...${str.slice(-tail)}`;
}

type CopyState = "idle" | "copied" | "failed";

function ContractAddress() {
  const [state, setState] = useState<CopyState>("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CONTRACT);
      setState("copied");
      setTimeout(() => setState("idle"), 1800);
    } catch {
      setState("failed");
      setTimeout(() => setState("idle"), 2400);
    }
  }

  const copyHint =
    state === "copied" ? "copied" : state === "failed" ? "select to copy" : "copy";

  return (
    <div className="flex flex-col gap-1">
      <p className="text-text-muted text-xs uppercase tracking-widest font-mono mb-1">
        Contract
      </p>
      <button
        onClick={handleCopy}
        title="Copy contract address"
        className="group flex items-center gap-2 text-left py-2 -my-2"
        aria-label={state === "copied" ? "Copied" : "Copy contract address"}
        aria-live="polite"
      >
        {/* Full address on sm+, elided on mobile. select-all lets users grab it manually if clipboard fails. */}
        <span className="font-mono text-xs text-text-secondary group-hover:text-text-primary transition-colors duration-150 hidden sm:inline select-all">
          {CONTRACT}
        </span>
        <span className="font-mono text-xs text-text-secondary group-hover:text-text-primary transition-colors duration-150 sm:hidden select-all">
          {elide(CONTRACT, 8, 8)}
        </span>
        <span
          className={`text-xs font-mono transition-colors duration-150 ${
            state === "copied"
              ? "text-accent"
              : state === "failed"
                ? "text-text-secondary"
                : "text-text-muted group-hover:text-text-secondary"
          }`}
        >
          {copyHint}
        </span>
      </button>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-bg-raised border-t border-hairline px-6 py-12 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        {/* Main footer row */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {/* Left: mark + tagline */}
          <div className="flex flex-col gap-1">
            <span className="font-display text-2xl text-text-primary leading-none">
              ${TICKER}
            </span>
            <span className="text-text-muted text-sm font-body mt-1">
              Funding {CHARITY.shortName}
            </span>
          </div>

          {/* Middle: contract address */}
          <div className="flex items-start">
            <ContractAddress />
          </div>

          {/* Right: links */}
          <div className="flex flex-col gap-3">
            <a
              href={PUMPFUN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary text-sm font-body transition-colors duration-150 py-2 -my-2"
            >
              Buy on pump.fun
            </a>
            <a
              href={CHARITY.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary text-sm font-body transition-colors duration-150 py-2 -my-2"
            >
              {CHARITY.name}
            </a>
            <a
              href={`https://solscan.io/token/${CONTRACT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary text-sm font-body transition-colors duration-150 py-2 -my-2"
            >
              View on Solscan
            </a>
            {/* TODO: add social links when handles are confirmed (X/Twitter, Telegram, etc.) */}
          </div>
        </div>

        {/* Bottom disclosure line */}
        <p className="mt-12 pt-6 border-t border-hairline text-text-muted text-xs font-body leading-relaxed max-w-xl">
          ${TICKER} is a community memecoin. {FEE_TO_CHARITY_PCT}% of pump.fun
          creator fees route to {CHARITY.name}. Not financial advice.
        </p>
      </div>
    </footer>
  );
}
