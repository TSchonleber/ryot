export const TICKER = "RYOT" as const;
export const CONTRACT =
  "CgPu6x6oUs4hwkcNtDvENuBLPRuissJ7nns7rXXFpump" as const;
export const PUMPFUN_URL =
  "https://pump.fun/coin/CgPu6x6oUs4hwkcNtDvENuBLPRuissJ7nns7rXXFpump" as const;

/** 90% of pump.fun creator fees route to North Shore Animal League America. */
export const FEE_TO_CHARITY_PCT = 90 as const;
/** 10% covers Solana tx costs per donation, boosts, and DEX listings. Not founder profit. */
export const FEE_TO_OPS_PCT = 10 as const;
