// Retirement corpus planning. All rates are annual percentages; amounts in rupees.

function fvLumpsum(amount, ratePercent, years) {
  return amount * Math.pow(1 + ratePercent / 100, years);
}

// Future value of a monthly SIP invested at annual rate for n years (end-of-month deposits).
function fvMonthlySip(monthly, ratePercent, years) {
  const i = ratePercent / 100 / 12;
  const n = Math.round(years * 12);
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i);
}

// Monthly SIP needed to reach a target in n years.
function sipForTarget(target, ratePercent, years) {
  const i = ratePercent / 100 / 12;
  const n = Math.round(years * 12);
  if (n <= 0) return target;
  if (i === 0) return target / n;
  return target / ((Math.pow(1 + i, n) - 1) / i);
}

// Corpus needed at retirement to fund inflation-growing yearly expenses until life
// expectancy, when the corpus itself earns postReturnPercent (growing annuity PV).
export function corpusForExpenses({ yearlyExpenseAtRetirement, inflationPercent, postReturnPercent, retirementYears }) {
  const r = postReturnPercent / 100;
  const g = inflationPercent / 100;
  const n = retirementYears;
  if (n <= 0) return 0;
  if (Math.abs(r - g) < 1e-9) return yearlyExpenseAtRetirement * n;
  const factor = (1 - Math.pow((1 + g) / (1 + r), n)) / (r - g);
  return yearlyExpenseAtRetirement * factor;
}

export function calculateRetirement({
  currentAge,
  retirementAge,
  lifeExpectancy = 85,
  monthlyExpenses,
  inflationPercent = 6,
  preReturnPercent = 10,
  postReturnPercent = 7,
  existingCorpus = 0,
}) {
  const yearsToRetire = Math.max(0, retirementAge - currentAge);
  const retirementYears = Math.max(0, lifeExpectancy - retirementAge);

  const monthlyExpensesAtRetirement = Math.round(fvLumpsum(monthlyExpenses, inflationPercent, yearsToRetire));
  const yearlyExpenseAtRetirement = monthlyExpensesAtRetirement * 12;

  const corpusNeeded = Math.round(
    corpusForExpenses({ yearlyExpenseAtRetirement, inflationPercent, postReturnPercent, retirementYears })
  );

  const fvExisting = Math.round(fvLumpsum(existingCorpus, preReturnPercent, yearsToRetire));
  const corpusGap = Math.max(0, corpusNeeded - fvExisting);

  const monthlySavingsNeeded = Math.round(sipForTarget(corpusGap, preReturnPercent, yearsToRetire));
  const yearlySavingsNeeded = monthlySavingsNeeded * 12;

  return {
    yearsToRetire,
    retirementYears,
    monthlyExpensesAtRetirement,
    yearlyExpenseAtRetirement,
    corpusNeeded,
    fvExisting,
    corpusGap,
    monthlySavingsNeeded,
    yearlySavingsNeeded,
  };
}

// Year-by-year accumulation path for the chart/table.
export function retirementTimeline({ currentAge, retirementAge, monthlySavings, preReturnPercent = 10, existingCorpus = 0 }) {
  const rows = [];
  let corpus = existingCorpus;
  for (let age = currentAge + 1; age <= retirementAge; age++) {
    corpus = corpus * (1 + preReturnPercent / 100) + fvMonthlySip(monthlySavings, preReturnPercent, 1);
    rows.push({ age, corpus: Math.round(corpus) });
  }
  return rows;
}

export { fvLumpsum, fvMonthlySip, sipForTarget };
