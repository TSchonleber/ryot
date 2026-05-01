// Owned by the Tracker agent. Stub.
import type { DonationContributor } from "@/lib/donations";
export function RecentContributors({
  contributors,
}: {
  contributors: DonationContributor[];
}) {
  return <ul>{contributors.length}</ul>;
}
