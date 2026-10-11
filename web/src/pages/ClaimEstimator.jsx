import { useState, useMemo } from "react";
import { LIC_PLANS, PLAN_TYPES, getSRBRate } from "../data/licPlans";
import { calculatePremium } from "../utils/calcPremium";
import { estimateClaimAmount } from "../utils/calcClaim";
import { formatINR, formatPercent } from "../utils/format";
import ResultCard from "../components/ResultCard";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";

const HOW_IT_WORKS = [
  { title: "Select plan & details", desc: "Pick your LIC plan, SA, term, and years paid" },
  { title: "Choose claim type", desc: "Maturity claim or death claim estimate" },
  { title: "See projections", desc: "Conservative, current, and optimistic scenarios" },
];

const FAQ_ITEMS = [
  { q: "How accurate is this estimate?", a: "This uses LIC's current bonus rates for projections. Actual claim amount depends on bonuses declared each year by LIC. Use this as a planning tool, not an exact prediction." },
  { q: "What is included in a maturity claim?", a: "Maturity claim = Sum Assured (× maturity multiplier if applicable) + Total accrued SRB + FAB (Final Additional Bonus). Some plans pay survival benefits during the term." },
  { q: "What is included in a death claim?", a: "Death claim = Higher of (Sum Assured + Bonus) or guaranteed minimum death benefit (e.g., 125% SA or 7× annual premium for Jeevan Anand). Plus any accrued bonus." },
  { q: "What are bonus projections?", a: "We show three scenarios: conservative (-5% from current rate), current rate, and optimistic (+5%). This gives you a range of possible claim amounts." },
  { q: "Are survival benefits included?", a: "Survival benefits (for money back plans) are paid during the term and reduce the final maturity payout proportionally. Use the maturity calculator for detailed breakdown." },
];

const claimPlans = LIC_PLANS.filter(
  (p) =>
    p.type !== PLAN_TYPES.PENSION &&
    p.type !== PLAN_TYPES.GOVT &&
    Object.keys(p.premiumRates).length > 0,
);

export default function ClaimEstimator() {
  const [planId, setPlanId] = useState(claimPlans[0].id);
  const [age, setAge] = useState(30);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [term, setTerm] = useState(20);
  const [yearsPaid, setYearsPaid] = useState(20);
  const [claimType, setClaimType] = useState("maturity");

  const plan = useMemo(() => claimPlans.find((p) => p.id === planId), [planId]);

  const premResult = useMemo(() => {
    if (!plan) return null;
    return calculatePremium(plan, age, sumAssured, term, "yearly");
  }, [plan, age, sumAssured, term]);

  const result = useMemo(() => {
    if (!plan) return null;
    return estimateClaimAmount(plan, sumAssured, term, yearsPaid, claimType === "death");
  }, [plan, sumAssured, term, yearsPaid, claimType]);

  const shareText = result
    ? `LIC Claim Estimate — ${plan.name} (Table ${plan.tableNo})\nType: ${claimType === "death" ? "Death Claim" : "Maturity Claim"}\nSA: ${formatINR(sumAssured)}, Term: ${term}yr\nEstimated Claim: ${formatINR(result.claimAmount || result.maturityValue)}\n\nCalculated on DoAide InsureKit — insure.doaide.com`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Claim Amount Estimator</h1>
      <p className="text-white/40 text-sm mb-6">
        Estimate maturity or death claim amount with bonus projections
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Plan</label>
            <select className="select-field" value={planId} onChange={(e) => setPlanId(e.target.value)}>
              {claimPlans.map((p) => (
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
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Years Completed</label>
            <input type="number" className="input-field" min={1} max={term} value={yearsPaid} onChange={(e) => setYearsPaid(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Claim Type</label>
            <div className="flex gap-2">
              {[
                { key: "maturity", label: "Maturity" },
                { key: "death", label: "Death Claim" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setClaimType(key)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    claimType === key
                      ? "bg-signal text-white"
                      : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {result && result.type === "death" && (
        <div className="animate-fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <ResultCard label="Sum Assured" value={formatINR(result.sumAssured)} />
            <ResultCard label="Accrued Bonus" value={formatINR(result.accruedBonus)} sub={`₹${result.srbRate}/1000 × ${yearsPaid}yr`} />
            <ResultCard label="SA + Bonus" value={formatINR(result.saWithBonus)} />
            <ResultCard label="Death Claim" value={formatINR(result.claimAmount)} accent />
          </div>
          <div className="panel-inner p-3 mb-4 text-xs text-white/30">
            <p>{result.note}</p>
          </div>
        </div>
      )}

      {result && result.type === "maturity" && (
        <div className="animate-fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <ResultCard label={result.maturityMultiplier > 1 ? `SA (×${result.maturityMultiplier})` : "Sum Assured"} value={formatINR(result.baseSA)} />
            <ResultCard label="Total SRB" value={formatINR(result.totalBonus)} sub={`₹${result.srbRate}/1000 × ${term}yr`} />
            {result.fab > 0 && <ResultCard label="FAB" value={formatINR(result.fab)} sub={`₹${result.fabRate}/1000 of SRB`} />}
            <ResultCard label="Maturity Value" value={formatINR(result.maturityValue)} accent />
          </div>

          <div className="panel-inner p-4 mb-4">
            <div className="text-xs text-white/40 mb-3 uppercase tracking-wide">Bonus Projections</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-wide">
                    <th className="text-left py-2 px-3">Scenario</th>
                    <th className="text-right py-2 px-3">SRB Rate</th>
                    <th className="text-right py-2 px-3">Total Bonus</th>
                    <th className="text-right py-2 px-3">FAB</th>
                    <th className="text-right py-2 px-3">Maturity</th>
                  </tr>
                </thead>
                <tbody>
                  {result.bonusProjections.map((proj) => (
                    <tr key={proj.scenario} className={`border-b border-white/5 ${proj.scenario === "Current Rate" ? "bg-signal/5" : ""}`}>
                      <td className="py-2 px-3 text-white/60">{proj.scenario}</td>
                      <td className="py-2 px-3 text-right text-white/50">₹{proj.srbRate}/1000</td>
                      <td className="py-2 px-3 text-right text-white/70">{formatINR(proj.totalBonus)}</td>
                      <td className="py-2 px-3 text-right text-white/50">{formatINR(proj.fab)}</td>
                      <td className={`py-2 px-3 text-right font-medium ${proj.scenario === "Current Rate" ? "text-signal" : "text-white/70"}`}>
                        {formatINR(proj.maturityValue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel-inner p-3 mb-4 text-xs text-white/30">
            <p>{result.note}</p>
            <p className="mt-1">Projections are estimates based on current bonus rates. Actual amounts depend on LIC's annual bonus declarations.</p>
          </div>
        </div>
      )}

      {result && (
        <div className="flex justify-end gap-2">
          <PrintButton />
          <ShareButtons text={shareText} />
        </div>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
