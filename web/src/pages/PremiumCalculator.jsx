import { useState, useMemo } from "react";
import { LIC_PLANS, MODE_LABELS } from "../data/licPlans";
import { calculatePremium } from "../utils/calcPremium";
import { formatINR, formatPercent } from "../utils/format";
import ResultCard from "../components/ResultCard";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";


const HOW_IT_WORKS = [
  { title: "Select plan & age", desc: "Choose from 24+ LIC plans and enter your age" },
  { title: "Set SA & term", desc: "Enter sum assured, term, and payment mode" },
  { title: "Get exact premium", desc: "See premium with GST, rebates, and mode factor" },
];

const FAQ_ITEMS = [
  { q: "How is LIC premium calculated?", a: "LIC premium is calculated based on the tabular rate per ₹1000 of Sum Assured, which varies by plan, age, and term. The base premium gets a rebate for high SA (₹2.50/1000 for SA ≥5L, ₹4/1000 for SA ≥10L) and mode rebate (2% yearly, 1% half-yearly). GST is added at 4.5% first year and 2.25% renewal." },
  { q: "What is the difference between first year and renewal GST?", a: "First year GST on life insurance is 4.5% of the premium, while renewal year GST is 2.25%. This is because a portion of the first year premium goes towards agent commission and setup costs." },
  { q: "What is SA rebate?", a: "Sum Assured rebate is a discount on the tabular premium rate for higher SA amounts. SA ≥ ₹5 lakh gets ₹2.50/1000 rebate, SA ≥ ₹10 lakh gets ₹4/1000 rebate. This effectively reduces your per-unit premium cost." },
  { q: "How does payment mode affect premium?", a: "Yearly mode gets the best deal with a 2% rebate. Half-yearly has 1% rebate but factor 0.5131 (slightly more than half). Quarterly uses factor 0.2615 and monthly 0.0875 — both slightly higher than proportional, so yearly payment is most economical." },
  { q: "Which LIC plan has the lowest premium?", a: "Term plans like Tech Term (854) and Jeevan Amar (855) have the lowest premiums per lakh of cover since they offer pure protection without savings. Among savings plans, longer terms generally have lower premiums per year." },
  { q: "Can I change my payment mode after taking a policy?", a: "Yes, you can change the premium payment mode by contacting your LIC branch. The premium amount will be recalculated based on the new mode factor and rebate." },
];

const selectablePlans = LIC_PLANS.filter(
  (p) => Object.keys(p.premiumRates).length > 0 || p.fixedPremium,
);

export default function PremiumCalculator() {
  const [planId, setPlanId] = useState(selectablePlans[0].id);
  const [age, setAge] = useState(30);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [term, setTerm] = useState(20);
  const [mode, setMode] = useState("yearly");
  const [isFirstYear, setIsFirstYear] = useState(true);

  const plan = useMemo(() => selectablePlans.find((p) => p.id === planId), [planId]);

  const availableTerms = useMemo(() => {
    if (!plan || plan.fixedPremium) return [];
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
    return calculatePremium(plan, age, sumAssured, term, mode, isFirstYear);
  }, [plan, age, sumAssured, term, mode, isFirstYear]);

  const shareText = result
    ? `LIC ${plan.name} (Table ${plan.tableNo})\nAge: ${age}, SA: ${formatINR(sumAssured)}, Term: ${term}yr\nPremium (${MODE_LABELS[mode]}): ${formatINR(result.totalPremium)} (incl. GST)\n\nCalculated on DoAide InsureKit — insure.doaide.com`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">LIC Premium Calculator</h1>
      <p className="text-white/40 text-sm mb-6">
        Calculate exact premium for any LIC plan with GST
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Plan</label>
            <select
              className="select-field"
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
            >
              {selectablePlans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.tableNo || "Govt"})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Age</label>
            <input
              type="number"
              className="input-field"
              min={plan?.minAge || 0}
              max={plan?.maxAge || 70}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          {!plan?.fixedPremium && (
            <>
              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
                  Sum Assured (₹)
                </label>
                <input
                  type="number"
                  className="input-field"
                  min={plan?.minSA || 100000}
                  step={100000}
                  value={sumAssured}
                  onChange={(e) => setSumAssured(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
                  Policy Term (years)
                </label>
                {availableTerms.length > 0 ? (
                  <select
                    className="select-field"
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                  >
                    {availableTerms.map((t) => (
                      <option key={t} value={t}>{t} years</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    className="input-field"
                    min={plan?.minTerm || 10}
                    max={plan?.maxTerm || 40}
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                  />
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
                  Payment Mode
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(MODE_LABELS).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setMode(key)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        mode === key
                          ? "bg-signal text-white"
                          : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
                  GST Year
                </label>
                <div className="flex gap-2">
                  {[
                    { key: true, label: "1st Year (4.5%)" },
                    { key: false, label: "Renewal (2.25%)" },
                  ].map(({ key, label }) => (
                    <button
                      key={String(key)}
                      onClick={() => setIsFirstYear(key)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isFirstYear === key
                          ? "bg-signal text-white"
                          : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {plan && (
        <div className="panel-inner p-4 mb-6">
          <div className="text-xs text-white/40 mb-1 uppercase tracking-wide">About this plan</div>
          <div className="text-sm text-white/70">{plan.description}</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {plan.features.map((f, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-white/40">
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {result ? (
        <div className="animate-fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <ResultCard
              label={`Premium (${MODE_LABELS[mode]})`}
              value={formatINR(result.basePremium)}
            />
            <ResultCard
              label={`GST (${formatPercent(result.gstRate)})`}
              value={formatINR(result.gst)}
              sub={isFirstYear ? "First year rate" : "Renewal rate"}
            />
            <ResultCard
              label="Total Premium"
              value={formatINR(result.totalPremium)}
              accent
            />
            <ResultCard
              label="Annual Premium"
              value={formatINR(result.annualPremium)}
              sub={result.ratePerThousand ? `₹${result.ratePerThousand}/1000 SA` : null}
            />
          </div>

          {(result.saRebate > 0 || result.modeRebate > 0) && (
            <div className="panel-inner p-3 mb-4 space-y-1 text-xs">
              {result.saRebate > 0 && (
                <div className="flex justify-between text-white/40">
                  <span>SA rebate (SA ≥ {sumAssured >= 1000000 ? "₹10L" : "₹5L"})</span>
                  <span className="text-good">−₹{result.saRebate}/1000 SA → ₹{result.effectiveRate}/1000</span>
                </div>
              )}
              {result.modeRebate > 0 && (
                <div className="flex justify-between text-white/40">
                  <span>Mode rebate ({MODE_LABELS[mode]})</span>
                  <span className="text-good">−{formatPercent(result.modeRebate)}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <PrintButton />
            <ShareButtons text={shareText} />
          </div>
        </div>
      ) : (
        <div className="panel-inner p-6 text-center text-white/30 text-sm">
          Premium rate not available for this age/term combination.
          Try adjusting the inputs.
        </div>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
