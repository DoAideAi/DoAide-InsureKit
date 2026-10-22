import { describe, it, expect } from "vitest";
import { annualizePremium, inferPlanType, ratesFor, isFirstPolicyYear, estimatePortfolioCommission } from "./estimateCommission";

const NOW = new Date("2026-06-15");

describe("annualizePremium", () => {
  it("multiplies by instalments per year", () => {
    expect(annualizePremium(10000, "yearly")).toBe(10000);
    expect(annualizePremium(5000, "half-yearly")).toBe(10000);
    expect(annualizePremium(2500, "quarterly")).toBe(10000);
    expect(annualizePremium(1000, "monthly")).toBe(12000);
  });

  it("defaults to yearly", () => {
    expect(annualizePremium(10000)).toBe(10000);
    expect(annualizePremium(10000, "unknown")).toBe(10000);
  });
});

describe("inferPlanType", () => {
  it("detects term, pension, govt and endowment plans", () => {
    expect(inferPlanType("Tech Term 854")).toBe("term");
    expect(inferPlanType("Jeevan Amar")).toBe("term");
    expect(inferPlanType("Saral Pension")).toBe("pension");
    expect(inferPlanType("New Jeevan Shanti")).toBe("pension");
    expect(inferPlanType("PMJJBY")).toBe("govt");
    expect(inferPlanType("Jeevan Anand 715")).toBe("endowment");
  });
});

describe("ratesFor", () => {
  it("endowment with long PPT gets 25% first year", () => {
    const r = ratesFor("Jeevan Anand", 20);
    expect(r.firstYear).toBe(0.25);
    expect(r.renewal).toBe(0.075);
  });

  it("term plans get the 28% override", () => {
    expect(ratesFor("Tech Term", 30).firstYear).toBe(0.28);
  });

  it("govt plans earn nothing", () => {
    expect(ratesFor("PMJJBY", 1).firstYear).toBe(0);
  });
});

describe("isFirstPolicyYear", () => {
  it("true within 365 days, false after", () => {
    expect(isFirstPolicyYear("2026-01-01", NOW)).toBe(true);
    expect(isFirstPolicyYear("2024-01-01", NOW)).toBe(false);
    expect(isFirstPolicyYear("", NOW)).toBe(false);
    expect(isFirstPolicyYear("2027-01-01", NOW)).toBe(false);
  });
});

describe("estimatePortfolioCommission", () => {
  const policies = [
    { id: 1, planName: "Jeevan Anand 715", premium: 50000, mode: "yearly", term: 20, startDate: "2026-02-01", status: "active" },
    { id: 2, planName: "Jeevan Labh 736", premium: 25000, mode: "half-yearly", term: 16, startDate: "2023-05-01", status: "active" },
    { id: 3, planName: "Tech Term 854", premium: 1000, mode: "monthly", term: 30, startDate: "2026-03-01", status: "active" },
    { id: 4, planName: "Old Lapsed Plan", premium: 99999, mode: "yearly", term: 20, startDate: "2026-01-01", status: "lapsed" },
  ];

  it("splits FYC and renewal, skipping non-active policies", () => {
    const r = estimatePortfolioCommission(policies, NOW);
    // FYC: 50000×25% + 12000×28% = 12500 + 3360 = 15860
    expect(r.fyc).toBe(15860);
    // Renewal: 50000×7.5% = 3750
    expect(r.renewal).toBe(3750);
    expect(r.total).toBe(19610);
    expect(r.details).toHaveLength(3);
  });

  it("reports club progress toward the next slab", () => {
    const r = estimatePortfolioCommission(policies, NOW);
    expect(r.currentSlab.label).toBe("No Club");
    expect(r.nextSlab.minFYC).toBe(300000);
    expect(r.amountToNext).toBe(300000 - 15860);
    expect(r.progressPercent).toBeGreaterThan(0);
  });

  it("handles an empty portfolio", () => {
    const r = estimatePortfolioCommission([], NOW);
    expect(r.total).toBe(0);
    expect(r.progressPercent).toBe(0);
  });
});
