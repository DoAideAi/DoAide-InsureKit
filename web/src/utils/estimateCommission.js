// Estimates commission earned from policies tracked in the Policy Tracker, where
// the plan is free text and only premium/mode/term/startDate are known.
import { COMMISSION_RATES_BY_PPT, COMMISSION_OVERRIDES } from "../data/licPlans";
import { BONUS_COMMISSION_SLABS } from "./calcCommission";

const INSTALMENTS_PER_YEAR = { yearly: 1, "half-yearly": 2, halfyearly: 2, quarterly: 4, monthly: 12 };

export function annualizePremium(premium, mode = "yearly") {
  return (premium || 0) * (INSTALMENTS_PER_YEAR[(mode || "yearly").toLowerCase()] || 1);
}

// Infer the commission category from a free-text plan name.
export function inferPlanType(planName = "") {
  const n = planName.toLowerCase();
  if (/pmjjby|pmsby|aam aadmi/.test(n)) return "govt";
  if (/pension|shanti|vay|annuity|saral pension/.test(n)) return "pension";
  if (/term|amar|kiran|tech[- ]?term|jeevan suraksha/.test(n)) return "term";
  return "endowment";
}

export function ratesFor(planName, term) {
  const type = inferPlanType(planName);
  const override = COMMISSION_OVERRIDES[type];
  if (override) return { ...override, type };
  const ppt = Number(term) || 20;
  for (const bracket of COMMISSION_RATES_BY_PPT) {
    if (ppt >= bracket.minPPT) return { firstYear: bracket.firstYear, renewal: bracket.renewal, type };
  }
  return { firstYear: 0.05, renewal: 0.03, type };
}

export function isFirstPolicyYear(startDate, now = new Date()) {
  if (!startDate) return false;
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) return false;
  const days = (now - start) / (24 * 60 * 60 * 1000);
  return days >= 0 && days < 365;
}

// Portfolio-level commission estimate from tracked policies. Active policies in
// their first policy year earn the first-year rate; the rest earn the renewal rate.
export function estimatePortfolioCommission(policies, now = new Date()) {
  let fyc = 0;
  let renewal = 0;
  let annualPremium = 0;
  const details = [];

  for (const p of policies) {
    if ((p.status || "active") !== "active") continue;
    const annual = annualizePremium(p.premium, p.mode);
    const rates = ratesFor(p.planName, p.term);
    const firstYear = isFirstPolicyYear(p.startDate, now);
    const rate = firstYear ? rates.firstYear : rates.renewal;
    const commission = Math.round(annual * rate);
    annualPremium += annual;
    if (firstYear) fyc += commission;
    else renewal += commission;
    details.push({ id: p.id, planName: p.planName, annual, rate, commission, firstYear, type: rates.type });
  }

  const total = fyc + renewal;

  // Club progress is based on first-year commission.
  const slabs = [...BONUS_COMMISSION_SLABS].sort((a, b) => a.minFYC - b.minFYC);
  const current = [...slabs].reverse().find((s) => fyc >= s.minFYC) || slabs[0];
  const next = slabs.find((s) => s.minFYC > fyc) || null;
  const progressPercent = next ? Math.min(100, Math.round((fyc / next.minFYC) * 100)) : 100;
  const amountToNext = next ? Math.max(0, next.minFYC - fyc) : 0;

  return {
    fyc: Math.round(fyc),
    renewal: Math.round(renewal),
    total: Math.round(total),
    annualPremium: Math.round(annualPremium),
    currentSlab: current,
    nextSlab: next,
    progressPercent,
    amountToNext,
    details,
  };
}
