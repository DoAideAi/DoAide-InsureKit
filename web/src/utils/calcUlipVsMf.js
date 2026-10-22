// ULIP vs Mutual Fund SIP: year-by-year simulation with realistic charges on both
// sides, and tax treatment at exit (10(10D) for ULIP, equity LTCG for MF).

export const DEFAULT_ULIP_CHARGES = {
  // Premium allocation charge by policy year (typical LIC SIIP-style online ULIPs
  // charge 0; offline/traditional ULIPs charge more in early years).
  allocationYear1Percent: 5,
  allocationLaterPercent: 2,
  policyAdminYearly: 3000, // flat ₹ deducted via units each year
  fmcPercent: 1.35, // fund management charge, capped at 1.35% by IRDAI
  mortalityPercentOfFund: 0.3, // approximation of mortality + rider charges
};

export const LTCG_EXEMPTION = 125000;
export const LTCG_RATE = 0.125;

export function simulateUlip({ annualInvestment, years, grossReturnPercent, charges = DEFAULT_ULIP_CHARGES }) {
  const growth = 1 + (grossReturnPercent - charges.fmcPercent) / 100;
  let fund = 0;
  const rows = [];
  for (let y = 1; y <= years; y++) {
    const allocPercent = y === 1 ? charges.allocationYear1Percent : charges.allocationLaterPercent;
    const invested = annualInvestment * (1 - allocPercent / 100);
    fund = (fund + invested) * growth;
    fund -= charges.policyAdminYearly;
    fund -= fund * (charges.mortalityPercentOfFund / 100);
    fund = Math.max(0, fund);
    rows.push({ year: y, fund: Math.round(fund) });
  }
  const totalInvested = annualInvestment * years;
  // Maturity tax-free under 10(10D) only if annual premium ≤ ₹2.5 lakh (post Feb-2021
  // rule). Above that, gains are taxed like equity LTCG.
  const taxFree = annualInvestment <= 250000;
  const gains = Math.max(0, fund - totalInvested);
  const tax = taxFree ? 0 : Math.max(0, (gains - LTCG_EXEMPTION) * LTCG_RATE);
  return {
    maturity: Math.round(fund),
    postTax: Math.round(fund - tax),
    totalInvested,
    gains: Math.round(gains),
    tax: Math.round(tax),
    taxFree,
    rows,
  };
}

export function simulateMutualFund({ annualInvestment, years, grossReturnPercent, expenseRatioPercent = 1.0 }) {
  const growth = 1 + (grossReturnPercent - expenseRatioPercent) / 100;
  let fund = 0;
  const rows = [];
  for (let y = 1; y <= years; y++) {
    fund = (fund + annualInvestment) * growth;
    rows.push({ year: y, fund: Math.round(fund) });
  }
  const totalInvested = annualInvestment * years;
  const gains = Math.max(0, fund - totalInvested);
  const tax = Math.max(0, (gains - LTCG_EXEMPTION) * LTCG_RATE);
  return {
    maturity: Math.round(fund),
    postTax: Math.round(fund - tax),
    totalInvested,
    gains: Math.round(gains),
    tax: Math.round(tax),
    rows,
  };
}

export function compareUlipVsMf({ monthlyInvestment, years, grossReturnPercent, ulipCharges = DEFAULT_ULIP_CHARGES, mfExpenseRatioPercent = 1.0, termPremiumYearly = 0 }) {
  const annualInvestment = monthlyInvestment * 12;
  const ulip = simulateUlip({ annualInvestment, years, grossReturnPercent, charges: ulipCharges });
  // "Term + MF" strategy: same outlay, minus a term premium, goes into the fund.
  const mfAnnual = Math.max(0, annualInvestment - termPremiumYearly);
  const mf = simulateMutualFund({ annualInvestment: mfAnnual, years, grossReturnPercent, expenseRatioPercent: mfExpenseRatioPercent });
  const diff = mf.postTax - ulip.postTax;
  return { ulip, mf, diff, winner: diff > 0 ? "mf" : diff < 0 ? "ulip" : "tie", annualInvestment };
}
