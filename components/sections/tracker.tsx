import { Suspense } from "react";
import { getDonationStats } from "@/lib/donations";
import { CHARITY } from "@/lib/charity";
import { DonationCounter } from "@/components/tracker/donation-counter";
import { TrackerEmptyState } from "@/components/tracker/empty-state";
import { RecentContributors } from "@/components/tracker/recent-contributors";

// Revalidation lives on the page segment (app/page.tsx) — exporting it here would be a no-op.

/** Format a UTC ISO string as a human-friendly relative timestamp, server-side. */
function relativeTime(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;

  if (diffMs < 0 || diffMs < 10_000) return "just now";
  if (diffMs < 60_000) return `${Math.floor(diffMs / 1000)}s ago`;
  if (diffMs < 3_600_000) return `${Math.floor(diffMs / 60_000)}m ago`;
  if (diffMs < 86_400_000) return `${Math.floor(diffMs / 3_600_000)}h ago`;
  return `${Math.floor(diffMs / 86_400_000)}d ago`;
}

/** Skeleton shown while the inner async component loads */
function TrackerSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      {/* Big number placeholder — matches the font-size of the counter */}
      <div className="h-20 w-52 rounded-md bg-bg-raised mb-4" />
      <div className="h-4 w-36 rounded bg-bg-raised mb-2" />
      <div className="h-3 w-24 rounded bg-bg-raised" />
    </div>
  );
}

/** Inner async server component — wrapped in Suspense by Tracker below */
async function TrackerContent() {
  let stats;

  try {
    stats = await getDonationStats();
  } catch {
    // getDonationStats failed — render empty state with an error note
    return (
      <div>
        <DonationCounter amountUsd={0} />
        <p className="font-body text-sm text-text-secondary mt-2">
          raised for {CHARITY.name}
        </p>
        <TrackerEmptyState />
        <p className="font-mono text-xs text-text-muted mt-6">
          data unavailable
        </p>
      </div>
    );
  }

  const { totalUsd, lastUpdated, recentContributors } = stats;
  const hasContributors = recentContributors.length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Big number */}
      <div>
        <DonationCounter amountUsd={totalUsd} />
        <p className="font-body text-base text-text-secondary mt-2">
          raised for {CHARITY.name}
        </p>
      </div>

      {/* Empty state or recent contributors */}
      {hasContributors ? (
        <RecentContributors contributors={recentContributors} />
      ) : (
        <TrackerEmptyState />
      )}

      {/* Last updated */}
      <p className="font-mono text-xs text-text-muted">
        updated {relativeTime(lastUpdated)}
      </p>
    </div>
  );
}

/** Section 5 — Live Tracker. Server component, async inner content, 60s revalidation. */
export function Tracker() {
  return (
    <section
      data-section="tracker"
      className="bg-bg-raised py-16 md:py-24 px-6"
    >
      <div className="max-w-2xl mx-auto">
        {/* Label */}
        <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-8">
          Live from the treasury
        </p>

        {/* Dynamic content — Suspense fires while the async inner component resolves */}
        <Suspense fallback={<TrackerSkeleton />}>
          <TrackerContent />
        </Suspense>
      </div>
    </section>
  );
}
