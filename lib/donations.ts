export type DonationContributor = {
  id: string;
  handle: string | null;
  amountUsd: number;
  at: string;
};

export type DonationStats = {
  totalUsd: number;
  lastUpdated: string;
  recentContributors: DonationContributor[];
};

/**
 * Manual donation log. Each entry is one disbursement to NSAL America.
 * Update this list when a new donation is sent and the site reflects reality
 * on next deploy. Will be replaced by automated source (Solana RPC reading
 * the treasury wallet, or donate.gg public API if/when one exists).
 */
const DONATIONS: DonationContributor[] = [
  {
    id: "2026-05-02-1",
    handle: "first donation",
    amountUsd: 36,
    at: "2026-05-02T00:00:00Z",
  },
];

/**
 * Single integration point for donation data. Components import the typed
 * result, never the source — swap the implementation when automated source
 * is wired (Solana RPC of treasury wallet recommended).
 */
export async function getDonationStats(): Promise<DonationStats> {
  const totalUsd = DONATIONS.reduce((sum, d) => sum + d.amountUsd, 0);
  const lastUpdated =
    DONATIONS.length > 0
      ? DONATIONS[DONATIONS.length - 1]!.at
      : new Date().toISOString();

  return {
    totalUsd,
    lastUpdated,
    recentContributors: [...DONATIONS].reverse(),
  };
}
