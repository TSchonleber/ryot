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
 * Single integration point for donation data. Today: returns the empty/zero
 * state because the coin just launched and donate.gg isn't wired yet.
 * Tomorrow: replace this function body with a fetch to donate.gg or a Solana
 * RPC reading the treasury wallet. The UI never changes.
 */
export async function getDonationStats(): Promise<DonationStats> {
  return {
    totalUsd: 0,
    lastUpdated: new Date().toISOString(),
    recentContributors: [],
  };
}
