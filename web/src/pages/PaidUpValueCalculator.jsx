import { useState, useMemo, useEffect } from "react";
import { LIC_PLANS, PLAN_TYPES } from "../data/licPlans";
import { calculatePaidUpValue } from "../utils/calcPaidUp";
import { formatINR, formatPercent, formatLakh } from "../utils/format";
import ResultCard from "../components/ResultCard";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackCalculation } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Select plan", desc: "Pick your LIC plan and enter policy details" },
  { title: "Enter years paid", desc: "How many full years of premium you've completed" },
  { title: "See paid-up value", desc: "Get paid-up SA, bonus accrued, and maturity estimate" },
];

const FAQ_ITEMS = [
  { q: "What is paid-up value?", a: "When you stop paying premiums after 3+ years, LIC converts your policy to 'paid-up' status. The paid-up SA = original SA × (premiums paid / total premiums due). You receive this reduced amount at maturity along with vested bonus." },
  { q: "What is the difference between paid-up and surrender?", a: "Paid-up means you stop paying but keep the policy — you'll get the reduced maturity at the end of the term. Surrender means you terminate the policy immediately and get a lump sum now (which is usually less than the paid-up maturity)." },
  { q: "When should I make a policy paid-up?", a: "Consider paid-up only if you cannot continue premiums. The paid-up maturity is always less than the original. If possible, take a policy loan instead to pay premiums, or reduce SA rather than stopping." },
  { q: "Do bonuses continue on a paid-up policy?", a: "No. Once a policy becomes paid-up, no further bonuses are added. Only the bonuses already accrued (vested) at the time of paid-up remain attached to the policy." },
  { q: "Can I revive a paid-up policy?", a: "Yes, within 5 years from the date of first unpaid premium. You'll need to pay all arrears with interest. After 2 years of lapse, a medical exam may be required." },
  { q: "Is paid-up maturity taxable?", a: "If annual premium is less than 10% of SA (policies after Apr 2012), the maturity is exempt under Section 10(10D). Otherwise, it's taxable as 'Income from Other Sources'." },
];

const eligiblePlans = LIC_PLANS.filter(
  (p) =>
    p.type !== PLAN_TYPES.TERM &&
    p.type !== PLAN_TYPES.PENSION &&
    p.type !== PLAN_TYPES.GOVT &&
    Object.keys(p.premiumRates).length > 0,
);

export default function PaidUpValueCalculator() {
  const [planId, setPlanId] = useState(eligiblePlans[0]?.id || "");
  const [age, setAge] = useState(30);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [term, setTerm] = useState(20);
  const [yearsPaid, setYearsPaid] = useState(5);

  const plan = useMemo(() => eligiblePlans.find((p) => p.id === planId), [planId]);

  const availableTerms = useMemo(() => {
    if (!plan) return [];
    const ages = Object.keys(plan.premiumRates).map(Number).sort((a, b) => a - b);
    let ageKey = ages[0];
    for (const a of ages) {
      if (a <= age) ageKey = a;
      else break;
    }
    return Object.keys(plan.premiumRates[ageKey] || {}).map(Number).sort((a, b) => a - b);
  }, [plan, age]);

  const result = useMemo(() => {
    if (!plan) return null;
    return calculatePaidUpValue(plan, age, sumAssured, term, yearsPaid);
  }, [plan, age, sumAssured, term, yearsPaid]);

  useEffect(() => {
    if (result?.eligible) trackCalculation('paid-up-value', { plan: plan?.name, yearsPaid, term });
  }, [result, plan?.name, yearsPaid, term]);

  const shareText = result?.eligible
    ? `LIC ${plan.name} — Paid-Up Value\nSA: ${formatINR(sumAssured)}, Term: ${term}yr, Paid: ${yearsPaid}yr\nPaid-Up SA: ${formatINR(result.paidUpSA)}\nBonus Accrued: ${formatINR(result.totalBonusAccrued)}\nPaid-Up Maturity: ${formatINR(result.paidUpMaturity)}\n\n— DoAide InsureKit (insure.doaide.com)`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Paid-Up Value Calculator</h1>
      <p className="text-sm text-white/50 mb-6">
        What happens to your LIC policy if you stop paying premiums? Calculate the reduced paid-up value.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-white/60 mb-1">LIC Plan</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={planId} onChange={(e) => setPlanId(e.target.value)}>
            {eligiblePlans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Table {p.tableNo})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Age at Entry</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={age} onChange={(e) => setAge(Number(e.target.value))} min={plan?.minAge || 18} max={plan?.maxAge || 65} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Sum Assured (₹)</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={sumAssured} onChange={(e) => setSumAssured(Number(e.target.value))} min={100000} step={100000} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Policy Term (years)</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={term} onChange={(e) => setTerm(Number(e.target.value))}>
            {availableTerms.map((t) => (
              <option key={t} value={t}>{t} years</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Years of Premium Paid</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={yearsPaid} onChange={(e) => setYearsPaid(Number(e.target.value))} min={0} max={term} />
        </div>
      </div>

      {result && !result.eligible && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-300">
          {result.reason}
        </div>
      )}

      {result?.eligible && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <ResultCard title="Paid-Up Sum Assured" value={formatINR(result.paidUpSA)} />
            <ResultCard title="Paid-Up Ratio" value={`${(result.paidUpRatio * 100).toFixed(0)}%`} />
            <ResultCard title="Bonus Accrued" value={formatINR(result.totalBonusAccrued)} />
            <ResultCard title="Paid-Up Maturity Value" value={formatINR(result.paidUpMaturity)} />
            <ResultCard title="GSV (if surrendered now)" value={formatINR(result.gsv)} />
            <ResultCard title="GSV Factor" value={`${(result.gsvFactor * 100).toFixed(0)}%`} />
          </div>

          {result.annualPremium > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Premium Analysis</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-white/50">Annual Premium</p>
                  <p className="text-white font-semibold">{formatINR(result.annualPremium)}</p>
                </div>
                <div>
                  <p className="text-white/50">Total Premium Paid ({yearsPaid} yrs)</p>
                  <p className="text-white font-semibold">{formatINR(result.totalPremiumPaid)}</p>
                </div>
                <div>
                  <p className="text-white/50">Premium Saved ({result.remainingYears} yrs)</p>
                  <p className="text-signal font-semibold">{formatINR(result.totalPremiumSaved)}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">What Should You Do?</h3>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex gap-2">
                <span className="text-signal font-bold">1.</span>
                <p><strong className="text-white">Continue paying</strong> — Get full maturity of SA + all bonuses. Best option if affordable.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-yellow-400 font-bold">2.</span>
                <p><strong className="text-white">Make it paid-up</strong> — Stop paying, get {formatINR(result.paidUpMaturity)} at maturity. No more bonuses added.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-orange-400 font-bold">3.</span>
                <p><strong className="text-white">Take a loan</strong> — Borrow against the policy to pay premiums. Keep full benefits alive.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-red-400 font-bold">4.</span>
                <p><strong className="text-white">Surrender</strong> — Get {formatINR(result.gsv)} now. Most loss. Avoid if possible.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <ShareButtons text={shareText} />
            <PrintButton />
          </div>
        </>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
