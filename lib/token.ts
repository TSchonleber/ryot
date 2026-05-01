export const TICKER = "RYOT" as const;
export const CONTRACT =
  "G4P6eVitre7JjcnfWDH5dcNcA86Wzn7XsFiCVaaSpump" as const;
export const PUMPFUN_URL =
  "https://pump.fun/coin/G4P6eVitre7JjcnfWDH5dcNcA86Wzn7XsFiCVaaSpump" as const;

/** 90% of pump.fun creator fees route to Northshore Humane Society. */
export const FEE_TO_CHARITY_PCT = 90 as const;
/** 10% covers Solana tx costs per donation, boosts, and DEX listings. Not founder profit. */
export const FEE_TO_OPS_PCT = 10 as const;
