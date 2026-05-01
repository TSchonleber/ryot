import Image from "next/image";
import { Reveal } from "@/components/reveal";

/**
 * Page hero for /story — smaller than the landing hero. Full-bleed photo with
 * a darker treatment, eyebrow + headline + subhead anchored bottom-left.
 */
export function StoryHero() {
  return (
    <section className="relative h-[70dvh] min-h-[480px] overflow-hidden">
      <Image
        src="/ryot/pond.jpg"
        alt="Ryot, a husky, standing at the edge of a pond"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "45% 28%" }}
      />

      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: [
            "linear-gradient(to top, rgba(26,22,18,0.92) 0%, rgba(26,22,18,0.55) 38%, transparent 65%)",
            "linear-gradient(to bottom, rgba(26,22,18,0.45) 0%, transparent 30%)",
          ].join(", "),
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 sm:pb-14 sm:px-10 md:px-14 lg:px-16">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">
              His story
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="font-display text-text-primary leading-[1.05] tracking-[-0.02em] mb-4"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)" }}
            >
              Four months old. Two strikes. One last chance.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p
              className="font-body text-text-secondary leading-relaxed max-w-xl"
              style={{ fontSize: "clamp(0.9375rem, 2.2vw, 1.125rem)" }}
            >
              Ryot got out. This is what that means, and why most don&apos;t.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
