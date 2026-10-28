import { useState, useMemo, useEffect } from "react";
import { LIC_PLANS, PLAN_TYPES, getSRBRate } from "../data/licPlans";
import { calculatePremium } from "../utils/calcPremium";
import { calculateLoanAgainstPolicy } from "../utils/calcLoan";
import { formatINR, formatPercent } from "../utils/format";
import ResultCard from "../components/ResultCard";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import { trackCalculation } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Select your policy", desc: "Pick your LIC plan, enter age, SA, and term" },
  { title: "Enter years paid", desc: "How many years of premium have you completed" },
  { title: "Get loan amount", desc: "See max loan, interest, and bank comparison" },
];

const FAQ_ITEMS = [
  { q: "What is a loan against LIC policy?", a: "LIC allows you to borrow money against your policy's surrender value. The policy remains active — your bonuses and death benefit are unaffected. This is typically cheaper than a personal loan." },
  { q: "How much can I borrow?", a: "You can borrow up to 90% of the surrender value of your policy. The surrender value depends on years of premium paid, plan type, and bonus accrued." },
  { q: "What is the interest rate?", a: "LIC charges approximately 9% p.a. on policy loans. This is significantly lower than personal loan rates (12-18%) and credit card rates (24-36%)." },
  { q: "When can I take a loan?", a: "You can take a loan after paying premiums for at least 3 full years. The policy must have acquired a surrender value." },
  { q: "Do I need to repay the loan?", a: "Loan repayment is flexible — you can repay anytime. If not repaid, the outstanding loan with interest is deducted from the maturity or death claim amount." },
  { q: "Is loan better than surrendering?", a: "Almost always, yes. A loan preserves your policy benefits (bonus, death cover) while giving you liquidity. Surrendering loses the policy forever and often at a significant loss." },
];

const loanPlans = LIC_PLANS.filter(
  (p) =>
    p.type !== PLAN_TYPES.TERM &&
    p.type !== PLAN_TYPES.PENSION &&
    p.type !== PLAN_TYPES.GOVT &&
    Object.keys(p.premiumRates).length > 0,
);

export default function LoanCalculator() {
  const [planId, setPlanId] = useState(loanPlans[0].id);
  const [age, setAge] = useState(30);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [term, setTerm] = useState(20);
  const [yearsPaid, setYearsPaid] = useState(5);

  const plan = useMemo(() => loanPlans.find((p) => p.id === planId), [planId]);

  const srbRate = useMemo(() => {
    if (!plan) return 0;
    return getSRBRate(plan, term);
  }, [plan, term]);

  const premResult = useMemo(() => {
    if (!plan) return null;
    return calculatePremium(plan, age, sumAssured, term, "yearly");
  }, [plan, age, sumAssured, term]);

  const result = useMemo(() => {
    if (!premResult) return null;
    return calculateLoanAgainstPolicy(premResult.annualPremium, sumAssured, term, yearsPaid, srbRate);
  }, [premResult, sumAssured, term, yearsPaid, srbRate]);

  useEffect(() => {
    if (result?.eligible) trackCalculation('loan-against-policy', { plan: plan?.name, yearsPaid, term });
  }, [result, plan?.name, yearsPaid, term]);

  const shareText =
    result?.eligible
      ? `LIC Loan Against Policy — ${plan.name} (Table ${plan.tableNo})\nSA: ${formatINR(sumAssured)}, Term: ${term}yr, Paid: ${yearsPaid}yr\nSurrender Value: ${formatINR(result.surrenderValue)}\nMax Loan (90%): ${formatINR(result.maxLoanAmount)}\nInterest: ${formatPercent(result.loanInterestRate)} p.a. = ${formatINR(result.annualInterest)}/yr\n\nCalculated on DoAide InsureKit — insure.doaide.com`
      : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Loan Against Policy Calculator</h1>
      <p className="text-white/40 text-sm mb-6">
        Calculate max loan amount and compare interest rates
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Plan</label>
            <select className="select-field" value={planId} onChange={(e) => setPlanId(e.target.value)}>
              {loanPlans.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.tableNo})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Age at Entry</label>
            <input type="number" className="input-field" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Sum Assured (₹)</label>
            <input type="number" className="input-field" min={100000} step={100000} value={sumAssured} onChange={(e) => setSumAssured(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Policy Term (years)</label>
            <input type="number" className="input-field" min={10} max={40} value={term} onChange={(e) => setTerm(Number(e.target.value))} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Years Premiums Paid</label>
            <input type="number" className="input-field" min={0} max={term} value={yearsPaid} onChange={(e) => setYearsPaid(Number(e.target.value))} />
          </div>
        </div>
      </div>

      {result && !result.eligible && (
        <div className="panel p-6 border-l-4 border-l-warn mb-6">
          <div className="text-sm font-medium text-warn">{result.reason}</div>
        </div>
      )}

      {result?.eligible && (
        <div className="animate-fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <ResultCard label="Surrender Value" value={formatINR(result.surrenderValue)} />
            <ResultCard label="Max Loan (90%)" value={formatINR(result.maxLoanAmount)} accent />
            <ResultCard label={`Interest (${formatPercent(result.loanInterestRate)})`} value={formatINR(result.annualInterest)} sub="Per year" />
            <ResultCard label="Monthly Interest" value={formatINR(Math.round(result.annualInterest / 12))} />
          </div>

          <div className="panel-inner p-4 mb-4">
            <div className="text-xs text-white/40 mb-3 uppercase tracking-wide">Interest Rate Comparison</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-wide">
                    <th className="text-left py-2 px-3">Loan Amount</th>
                    <th className="text-right py-2 px-3">LIC Policy (9%)</th>
                    <th className="text-right py-2 px-3">Gold Loan (8.5%)</th>
                    <th className="text-right py-2 px-3">Personal Loan (12%)</th>
                    <th className="text-right py-2 px-3">You Save</th>
                  </tr>
                </thead>
                <tbody>
                  {result.interestComparison.map((row) => (
                    <tr key={row.loanAmount} className="border-b border-white/5">
                      <td className="py-2 px-3 text-white/60">{formatINR(row.loanAmount)}</td>
                      <td className="py-2 px-3 text-right text-signal font-medium">{formatINR(row.policyInterest)}/yr</td>
                      <td className="py-2 px-3 text-right text-white/50">{formatINR(row.goldInterest)}/yr</td>
                      <td className="py-2 px-3 text-right text-white/50">{formatINR(row.bankInterest)}/yr</td>
                      <td className="py-2 px-3 text-right text-good font-medium">{formatINR(row.savingsVsBank)}/yr</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel p-4 mb-6 border-l-4 border-l-good">
            <div className="text-sm font-medium text-white mb-1">Why Loan is Better Than Surrender</div>
            <div className="text-sm text-good">{result.note}</div>
          </div>

          <div className="flex justify-end gap-2">
            <PrintButton />
            <ShareButtons text={shareText} />
          </div>
        </div>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
