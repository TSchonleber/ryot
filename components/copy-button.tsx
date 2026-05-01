"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

// Inline SVGs — lucide-react is not installed.
function IconCopy() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * Middle-truncated address display.
 * Shows first 6 + last 6 chars on small screens, full string on sm+.
 * The visual truncation is purely presentational — copy always gets the full value.
 */
function AddressDisplay({ value }: { value: string }) {
  const prefix = value.slice(0, 6);
  const suffix = value.slice(-6);

  return (
    <>
      {/* Truncated: visible on <sm */}
      <span className="sm:hidden" aria-hidden="true">
        {prefix}
        <span className="text-text-muted">…</span>
        {suffix}
      </span>
      {/* Full address: visible on sm+ */}
      <span className="hidden sm:inline">{value}</span>
    </>
  );
}

export function CopyButton({ value, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API may be blocked in some contexts; fail silently.
    }
  }, [value]);

  const ariaLabel = label ?? `Copy ${value}`;

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      aria-label={ariaLabel}
      aria-live="polite"
      className={[
        "inline-flex items-center gap-2 rounded-sm px-3 py-2",
        "font-mono text-sm text-text-primary",
        "border border-hairline bg-bg-raised",
        "cursor-pointer select-all",
        "transition-colors hover:border-accent/30 hover:bg-bg-warm",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      ].join(" ")}
      /* Scale pulse on copy — suppressed when reduced-motion is preferred */
      animate={
        copied && !prefersReducedMotion
          ? { scale: [1, 1.04, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <span className="flex-1 truncate leading-none">
        <AddressDisplay value={value} />
      </span>

      <span
        className={[
          "flex-shrink-0 transition-colors",
          copied ? "text-accent" : "text-text-muted",
        ].join(" ")}
      >
        {copied ? <IconCheck /> : <IconCopy />}
      </span>
    </motion.button>
  );
}
