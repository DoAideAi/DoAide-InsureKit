import { describe, it, expect } from "vitest";
import { calculateChildEducation, EDUCATION_PRESETS, CHILD_PLAN_OPTIONS } from "./calcChildEducation";

describe("calculateChildEducation", () => {
  const base = {
    childAge: 3,
    goalAge: 18,
    currentCost: 1600000,
    educationInflationPercent: 9,
    returnPercent: 10,
    existingSavings: 0,
  };

  it("inflates education cost to the goal year", () => {
    const r = calculateChildEducation(base);
    // 16L × 1.09^15 ≈ 58.3L
    expect(r.yearsToGoal).toBe(15);
    expect(r.futureCost).toBeGreaterThan(5500000);
    expect(r.futureCost).toBeLessThan(6100000);
  });

  it("gap equals future cost with no savings and monthly SIP is positive", () => {
    const r = calculateChildEducation(base);
    expect(r.gap).toBe(r.futureCost);
    expect(r.monthlySavingsNeeded).toBeGreaterThan(0);
    expect(r.yearlySavingsNeeded).toBe(r.monthlySavingsNeeded * 12);
  });

  it("existing savings reduce the required SIP", () => {
    const withSavings = calculateChildEducation({ ...base, existingSavings: 500000 });
    expect(withSavings.gap).toBeLessThan(calculateChildEducation(base).gap);
  });

  it("suggested SA covers the future cost rounded to 5L", () => {
    const r = calculateChildEducation(base);
    expect(r.suggestedSumAssured).toBeGreaterThanOrEqual(r.futureCost);
    expect(r.suggestedSumAssured % 500000).toBe(0);
  });

  it("handles goal already reached", () => {
    const r = calculateChildEducation({ ...base, childAge: 18 });
    expect(r.yearsToGoal).toBe(0);
    expect(r.futureCost).toBe(base.currentCost);
  });

  it("presets and plan options are well-formed", () => {
    expect(EDUCATION_PRESETS.length).toBeGreaterThanOrEqual(4);
    for (const p of EDUCATION_PRESETS) expect(p.cost).toBeGreaterThan(0);
    for (const p of CHILD_PLAN_OPTIONS) {
      expect(p.slug).toBeTruthy();
      expect(p.role.length).toBeGreaterThan(20);
    }
  });
});
