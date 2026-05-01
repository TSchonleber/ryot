"use client";

import { useId } from "react";
import { useReducedMotion } from "framer-motion";

type WaterRippleProps = {
  className?: string;
};

/**
 * Subtle CSS/SVG water ripple overlaid on the pond surface.
 * Uses an SVG feTurbulence displacement filter at ~3% intensity.
 * Disabled on small screens (<640px) and under prefers-reduced-motion.
 * Positioned by the parent via className.
 */
export function WaterRipple({ className }: WaterRippleProps) {
  const reduceMotion = useReducedMotion();
  const filterId = `pond-ripple-${useId().replace(/:/g, "")}`;

  // Disable on reduced-motion and small screens (handled via CSS class in parent)
  if (reduceMotion) return null;

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      {/* SVG filter definition — referenced by the displacement layer */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.012 0.008"
              numOctaves="3"
              seed="4"
              result="turbulence"
            >
              {/* Slowly drift the turbulence — simulates water movement */}
              <animate
                attributeName="baseFrequency"
                values="0.012 0.008;0.014 0.009;0.012 0.008"
                dur="8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="seed"
                values="4;8;4"
                dur="12s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>

      {/*
       * The ripple layer: a transparent rect that applies the displacement filter
       * over the pond surface only. mix-blend-mode soft-light adds the water shimmer
       * without inverting or washing out the photo underneath.
       */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          // Very subtle gradient mask: fade out on the bottom (where land/grass is)
          // and on the right edge where Ryot stands near the shore
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
          filter: `url(#${filterId})`,
          // Blend mode: soft-light subtly modulates brightness to look like
          // light refracting on water without adding color contamination
          mixBlendMode: "soft-light" as const,
          opacity: 0.18,
          // Slow drift on the layer itself for an organic feel
          animation: "ripple-drift 16s ease-in-out infinite",
          willChange: "transform",
          backgroundImage:
            "linear-gradient(135deg, rgba(201,122,63,0.05) 0%, rgba(245,233,212,0.08) 50%, rgba(201,122,63,0.03) 100%)",
        }}
      />

      <style>{`
        @keyframes ripple-drift {
          0%   { transform: translate3d(0, 0, 0) scaleX(1); }
          33%  { transform: translate3d(1px, -1px, 0) scaleX(1.002); }
          66%  { transform: translate3d(-1px, 1px, 0) scaleX(0.998); }
          100% { transform: translate3d(0, 0, 0) scaleX(1); }
        }
      `}</style>
    </div>
  );
}
