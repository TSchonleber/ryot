import { CHARITY } from "@/lib/charity";
import { PUMPFUN_URL, TICKER } from "@/lib/token";
import { Reveal } from "@/components/reveal";

/**
 * Closing block of /story — final thesis line + three CTA links back to the
 * landing's tracker, the pump.fun buy, and the charity's site.
 */
export function StoryCta() {
  return (
    <section className="px-6 py-20 sm:py-28 border-t border-hairline">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="font-display text-2xl sm:text-3xl text-text-primary leading-snug mb-3">
            Ryot got the chance. Most don&apos;t.
          </p>
          <p className="font-display text-2xl sm:text-3xl text-text-secondary leading-snug mb-12">
            ${TICKER} exists so more do.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="font-body text-text-secondary leading-relaxed space-y-4 mb-12">
            <p>
              If you can buy a little, buy a little. If you can&apos;t, share
              this page or share the coin or just tell someone about{" "}
              {CHARITY.shortName}. If you&apos;ve never thought about what
              happens to a four-month-old dog with two strikes, now you have.
              That alone is worth something.
            </p>
            <p className="text-text-primary">It&apos;s worth what happens next.</p>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="/#tracker"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3 font-body text-sm font-semibold text-bg-base"
            >
              See the live tracker &rarr;
            </a>
            <a
              href={PUMPFUN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-hairline px-5 py-3 font-body text-sm font-semibold text-text-primary hover:border-accent/40 transition-colors duration-150"
            >
              Buy ${TICKER} on pump.fun
            </a>
            <a
              href={CHARITY.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-hairline px-5 py-3 font-body text-sm font-semibold text-text-primary hover:border-accent/40 transition-colors duration-150"
            >
              Visit {CHARITY.shortName}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
