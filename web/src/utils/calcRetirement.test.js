import { describe, it, expect } from "vitest";
import { calculateRetirement, corpusForExpenses, fvLumpsum, sipForTarget, retirementTimeline } from "./calcRetirement";

describe("calculateRetirement", () => {
  const base = {
    currentAge: 30,
    retirementAge: 60,
    lifeExpectancy: 85,
    monthlyExpenses: 50000,
    inflationPercent: 6,
    preReturnPercent: 10,
    postReturnPercent: 7,
    existingCorpus: 0,
  };

  it("inflates expenses to retirement age", () => {
    const r = calculateRetirement(base);
    // 50000 × 1.06^30 ≈ 287,175
    expect(r.monthlyExpensesAtRetirement).toBeGreaterThan(280000);
    expect(r.monthlyExpensesAtRetirement).toBeLessThan(295000);
    expect(r.yearsToRetire).toBe(30);
    expect(r.retirementYears).toBe(25);
  });

  it("corpus needed is positive and gap equals corpus when no savings", () => {
    const r = calculateRetirement(base);
    expect(r.corpusNeeded).toBeGreaterThan(r.yearlyExpenseAtRetirement * 15);
    expect(r.corpusGap).toBe(r.corpusNeeded);
    expect(r.monthlySavingsNeeded).toBeGreaterThan(0);
  });

  it("existing corpus reduces the gap", () => {
    const withCorpus = calculateRetirement({ ...base, existingCorpus: 2000000 });
    const without = calculateRetirement(base);
    expect(withCorpus.corpusGap).toBeLessThan(without.corpusGap);
    expect(withCorpus.monthlySavingsNeeded).toBeLessThan(without.monthlySavingsNeeded);
  });

  it("gap never goes negative", () => {
    const r = calculateRetirement({ ...base, existingCorpus: 1e9 });
    expect(r.corpusGap).toBe(0);
    expect(r.monthlySavingsNeeded).toBe(0);
  });

  it("handles retirement at current age", () => {
    const r = calculateRetirement({ ...base, currentAge: 60, retirementAge: 60 });
    expect(r.yearsToRetire).toBe(0);
    expect(r.monthlyExpensesAtRetirement).toBe(50000);
  });
});

describe("corpusForExpenses", () => {
  it("equals expense × years when return equals inflation", () => {
    const c = corpusForExpenses({ yearlyExpenseAtRetirement: 100000, inflationPercent: 6, postReturnPercent: 6, retirementYears: 20 });
    expect(Math.round(c)).toBe(2000000);
  });

  it("is lower when post-retirement return beats inflation", () => {
    const high = corpusForExpenses({ yearlyExpenseAtRetirement: 100000, inflationPercent: 6, postReturnPercent: 9, retirementYears: 20 });
    const even = corpusForExpenses({ yearlyExpenseAtRetirement: 100000, inflationPercent: 6, postReturnPercent: 6, retirementYears: 20 });
    expect(high).toBeLessThan(even);
  });
});

describe("helpers", () => {
  it("fvLumpsum compounds annually", () => {
    expect(Math.round(fvLumpsum(100000, 10, 2))).toBe(121000);
  });

  it("sipForTarget inverts SIP future value", () => {
    const monthly = sipForTarget(1000000, 12, 10);
    expect(monthly).toBeGreaterThan(4000);
    expect(monthly).toBeLessThan(5000);
  });

  it("retirementTimeline grows and ends at retirement age", () => {
    const rows = retirementTimeline({ currentAge: 30, retirementAge: 35, monthlySavings: 10000, preReturnPercent: 10 });
    expect(rows).toHaveLength(5);
    expect(rows[4].age).toBe(35);
    expect(rows[4].corpus).toBeGreaterThan(rows[0].corpus);
  });
});
