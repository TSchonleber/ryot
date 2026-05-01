import { CHARITY } from "@/lib/charity";
import { Reveal } from "@/components/reveal";

// Charity logo can be added at /public/charity-logo.svg once permission is confirmed.

export function Nhs() {
  return (
    <section
      data-section="nhs"
      className="bg-bg-warm px-6 py-24 sm:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-6">
            Where the fees go
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl sm:text-5xl text-text-primary leading-tight mb-8">
            {CHARITY.name}.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="space-y-5 text-text-secondary text-lg leading-relaxed font-body">
            <p>{CHARITY.mission}</p>
            <p>
              Based in {CHARITY.location}, they run mobile adoption units,
              transport animals out of overcrowded kill shelters across the
              country, and refuse to give up on dogs and cats other
              organizations consider unadoptable.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <a
            href={CHARITY.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 py-2 text-text-primary underline underline-offset-4 decoration-accent/50 hover:decoration-accent transition-colors duration-150 font-body text-base"
          >
            Visit {CHARITY.shortName} &rarr;
          </a>
        </Reveal>
      </div>
    </section>
  );
}
