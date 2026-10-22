import { describe, it, expect } from "vitest";
import { simulateUlip, simulateMutualFund, compareUlipVsMf, DEFAULT_ULIP_CHARGES } from "./calcUlipVsMf";

describe("simulateUlip", () => {
  it("grows the fund over time and deducts charges", () => {
    const r = simulateUlip({ annualInvestment: 120000, years: 15, grossReturnPercent: 12 });
    expect(r.maturity).toBeGreaterThan(r.totalInvested);
    expect(r.rows).toHaveLength(15);
    expect(r.rows[14].fund).toBe(r.maturity);
  });

  it("is tax-free under 2.5L annual premium", () => {
    const r = simulateUlip({ annualInvestment: 120000, years: 15, grossReturnPercent: 12 });
    expect(r.taxFree).toBe(true);
    expect(r.tax).toBe(0);
    expect(r.postTax).toBe(r.maturity);
  });

  it("taxes gains above 2.5L annual premium", () => {
    const r = simulateUlip({ annualInvestment: 300000, years: 15, grossReturnPercent: 12 });
    expect(r.taxFree).toBe(false);
    expect(r.tax).toBeGreaterThan(0);
  });

  it("zero-charge ULIP beats charged ULIP", () => {
    const free = simulateUlip({
      annualInvestment: 120000, years: 10, grossReturnPercent: 12,
      charges: { ...DEFAULT_ULIP_CHARGES, allocationYear1Percent: 0, allocationLaterPercent: 0, policyAdminYearly: 0, mortalityPercentOfFund: 0 },
    });
    const charged = simulateUlip({ annualInvestment: 120000, years: 10, grossReturnPercent: 12 });
    expect(free.maturity).toBeGreaterThan(charged.maturity);
  });
});

describe("simulateMutualFund", () => {
  it("applies LTCG tax above the exemption", () => {
    const r = simulateMutualFund({ annualInvestment: 120000, years: 15, grossReturnPercent: 12 });
    expect(r.gains).toBeGreaterThan(125000);
    expect(r.tax).toBeGreaterThan(0);
    expect(r.postTax).toBe(r.maturity - r.tax);
  });

  it("small gains stay within exemption", () => {
    const r = simulateMutualFund({ annualInvestment: 12000, years: 3, grossReturnPercent: 8 });
    expect(r.tax).toBe(0);
  });
});

describe("compareUlipVsMf", () => {
  it("MF usually wins on pure post-tax corpus with default charges", () => {
    const r = compareUlipVsMf({ monthlyInvestment: 10000, years: 15, grossReturnPercent: 12 });
    expect(r.mf.postTax).toBeGreaterThan(0);
    expect(r.ulip.postTax).toBeGreaterThan(0);
    expect(["mf", "ulip", "tie"]).toContain(r.winner);
  });

  it("term premium reduces the MF side's investable amount", () => {
    const withTerm = compareUlipVsMf({ monthlyInvestment: 10000, years: 15, grossReturnPercent: 12, termPremiumYearly: 15000 });
    const without = compareUlipVsMf({ monthlyInvestment: 10000, years: 15, grossReturnPercent: 12 });
    expect(withTerm.mf.maturity).toBeLessThan(without.mf.maturity);
  });
});
