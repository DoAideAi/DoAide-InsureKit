// Child education goal planning. Education inflation in India runs well above CPI
// (8-10%), so the default is deliberately higher than general inflation.
import { fvLumpsum, sipForTarget } from "./calcRetirement";

export const EDUCATION_PRESETS = [
  { id: "engineering", label: "Engineering (B.Tech, India)", cost: 1600000, atAge: 18 },
  { id: "medical", label: "Medical (MBBS, private)", cost: 8000000, atAge: 18 },
  { id: "mba", label: "MBA (top Indian B-school)", cost: 2800000, atAge: 22 },
  { id: "abroad", label: "Study Abroad (UG, USA/UK)", cost: 15000000, atAge: 18 },
  { id: "custom", label: "Custom goal", cost: 2000000, atAge: 18 },
];

export function calculateChildEducation({
  childAge,
  goalAge = 18,
  currentCost,
  educationInflationPercent = 9,
  returnPercent = 10,
  existingSavings = 0,
}) {
  const yearsToGoal = Math.max(0, goalAge - childAge);

  const futureCost = Math.round(fvLumpsum(currentCost, educationInflationPercent, yearsToGoal));
  const fvExisting = Math.round(fvLumpsum(existingSavings, returnPercent, yearsToGoal));
  const gap = Math.max(0, futureCost - fvExisting);

  const monthlySavingsNeeded = Math.round(sipForTarget(gap, returnPercent, yearsToGoal));
  const yearlySavingsNeeded = monthlySavingsNeeded * 12;

  // Rule-of-thumb sum assured so the goal survives the parent: at least the future
  // cost, rounded up to the next ₹5 lakh.
  const suggestedSumAssured = Math.ceil(futureCost / 500000) * 500000;

  return {
    yearsToGoal,
    futureCost,
    fvExisting,
    gap,
    monthlySavingsNeeded,
    yearlySavingsNeeded,
    suggestedSumAssured,
  };
}

// LIC plans agents typically position for child goals, with the role each plays.
export const CHILD_PLAN_OPTIONS = [
  {
    slug: "jeevan-lakshya-733",
    name: "Jeevan Lakshya (733)",
    role: "Goal protection — if the parent dies, LIC pays 10% of SA yearly till maturity plus the full maturity amount. The education goal survives.",
  },
  {
    slug: "jeevan-tarun-734",
    name: "Jeevan Tarun (734)",
    role: "Money-back for the child — survival benefits between age 20-24 line up with college fee instalments.",
  },
  {
    slug: "amritbaal-774",
    name: "Amritbaal (774)",
    role: "Guaranteed additions of ₹80 per 1000 SA yearly — a conservative, guaranteed base for the goal.",
  },
  {
    slug: "new-children-money-back-732",
    name: "New Children's Money Back (732)",
    role: "25% of SA paid at ages 18, 20 and 22 — staggered payouts matching UG and PG fees.",
  },
];
