import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type StorySectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

/**
 * Numbered section wrapper for the longform /story page.
 * Eyebrow numbering in mono, headline in display serif, body in sans with
 * generous reading width and line-height.
 */
export function StorySection({ number, title, children }: StorySectionProps) {
  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">
            {number}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="font-display text-3xl sm:text-4xl text-text-primary leading-tight tracking-tight mb-8">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="space-y-5 font-body text-base sm:text-lg leading-relaxed text-text-secondary">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
