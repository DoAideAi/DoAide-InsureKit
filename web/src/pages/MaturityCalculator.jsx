import { useState, useMemo, useEffect } from "react";
import { LIC_PLANS, PLAN_TYPES, getSRBRate } from "../data/licPlans";
import { calculatePremium } from "../utils/calcPremium";
import {
  calculateMaturity,
  calculateTotalPremiumsPaid,
  calculateIRR,
  calculateSurvivalBenefits,
} from "../utils/calcMaturity";
import { formatINR, formatPercent } from "../utils/format";
import ResultCard from "../components/ResultCard";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackCalculation } from "../lib/analytics";


const HOW_IT_WORKS = [
  { title: "Select plan & SA", desc: "Pick your LIC plan and enter sum assured" },
  { title: "Set term & age", desc: "Enter policy term and age for premium calculation" },
  { title: "See maturity value", desc: "Get maturity with bonus, FAB, IRR, and premium paid" },
];

const FAQ_ITEMS = [
  { q: "How is LIC maturity value calculated?", a: "Maturity value = Sum Assured (× maturity multiplier if applicable) + Total SRB (Simple Reversionary Bonus) + FAB (Final Additional Bonus). Some plans like Jeevan Lakshya pay 110% of SA at maturity." },
  { q: "What is SRB (Simple Reversionary Bonus)?", a: "SRB is declared annually by LIC per ₹1000 of Sum Assured. It accrues each year and is paid along with maturity or death benefit. For example, SRB of ₹45/1000 on ₹10L SA = ₹45,000 per year bonus." },
  { q: "What is FAB (Final Additional Bonus)?", a: "FAB is a one-time bonus added at maturity for policies with longer terms (usually 15+ years). Unlike SRB which is per 1000 of SA, FAB is calculated per 1000 of total accrued SRB." },
  { q: "What is IRR?", a: "IRR (Internal Rate of Return) is the effective annual return on your premiums. It accounts for the time value of money — premiums paid early contribute more than later ones. For LIC endowments, IRR is typically 4-6%." },
  { q: "Are LIC maturity proceeds taxable?", a: "If annual premium is ≤ 10% of Sum Assured, maturity proceeds are fully exempt under Section 10(10D) of the Income Tax Act. If premium exceeds 10% of SA, the maturity amount may be taxable." },
  { q: "Can I use a custom bonus rate?", a: "Yes! Leave the SRB field blank to use the plan's default rate, or enter a custom rate if you want to estimate maturity with different bonus assumptions." },
];

const maturityPlans = LIC_PLANS.filter(
  (p) =>
    p.type !== PLAN_TYPES.TERM &&
    p.type !== PLAN_TYPES.PENSION &&
    p.type !== PLAN_TYPES.GOVT &&
    Object.keys(p.premiumRates).length > 0,
);

export default function MaturityCalculator() {
  const [planId, setPlanId] = useState(maturityPlans[0].id);
  const [age, setAge] = useState(30);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [term, setTerm] = useState(20);
  const [customBonus, setCustomBonus] = useState("");

  const plan = useMemo(() => maturityPlans.find((p) => p.id === planId), [planId]);

  const defaultSRB = useMemo(() => {
    if (!plan) return 0;
    return getSRBRate(plan, term);
  }, [plan, term]);

  const premResult = useMemo(() => {
    if (!plan) return null;
    return calculatePremium(plan, age, sumAssured, term, "yearly");
  }, [plan, age, sumAssured, term]);

  const matResult = useMemo(() => {
    if (!plan) return null;
    const srbRate = customBonus !== "" ? Number(customBonus) : null;
    return calculateMaturity(plan, sumAssured, term, srbRate);
  }, [plan, sumAssured, term, customBonus]);

  const totalPaid = useMemo(() => {
    if (!premResult) return 0;
    return calculateTotalPremiumsPaid(premResult.annualPremium, term);
  }, [premResult, term]);

  const irr = useMemo(() => {
    if (!premResult || !matResult) return null;
    return calculateIRR(premResult.annualPremium, matResult.maturityValue, term);
  }, [premResult, matResult, term]);

  const survivalBenefits = useMemo(() => {
    if (!plan) return [];
    return calculateSurvivalBenefits(plan, sumAssured);
  }, [plan, sumAssured]);

  useEffect(() => {
    if (matResult && premResult) trackCalculation('maturity-calculator', { plan: plan?.name, term, sumAssured });
  }, [matResult, premResult, plan?.name, term, sumAssured]);

  const shareText =
    matResult && premResult
      ? `LIC ${plan.name} (Table ${plan.tableNo}) — Maturity Analysis\nSA: ${formatINR(sumAssured)}, Term: ${term}yr\nSRB: ₹${matResult.srbRate}/1000 SA\nTotal Premiums: ${formatINR(totalPaid)}\nMaturity Value: ${formatINR(matResult.maturityValue)}\nIRR: ${irr !== null ? formatPercent(irr) : "N/A"}\n\nCalculated on DoAide InsureKit — insure.doaide.com`
      : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">LIC Maturity Calculator</h1>
      <p className="text-white/40 text-sm mb-6">
        Calculate maturity value with SRB (Simple Reversionary Bonus), FAB, and IRR
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Plan</label>
            <select className="select-field" value={planId} onChange={(e) => setPlanId(e.target.value)}>
              {maturityPlans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.tableNo})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Age</label>
            <input type="number" className="input-field" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Sum Assured (₹)</label>
            <input type="number" className="input-field" min={100000} step={100000} value={sumAssured} onChange={(e) => setSumAssured(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Term (years)</label>
            <input type="number" className="input-field" min={10} max={40} value={term} onChange={(e) => setTerm(Number(e.target.value))} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
              SRB Rate (₹/1000 SA) — leave blank for default ({plan?.isNonPar ? "Non-par plan" : `₹${defaultSRB}`})
            </label>
            <input
              type="number"
              className="input-field"
              placeholder={plan?.isNonPar ? "N/A" : String(defaultSRB)}
              value={customBonus}
              onChange={(e) => setCustomBonus(e.target.value)}
              disabled={plan?.isNonPar}
            />
          </div>
        </div>
      </div>

      {matResult && premResult ? (
        <div className="animate-fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <ResultCard
              label={matResult.maturityMultiplier > 1 ? `SA (×${matResult.maturityMultiplier})` : "Sum Assured"}
              value={formatINR(matResult.baseSA || matResult.sumAssured)}
            />
            {matResult.totalBonus > 0 && (
              <ResultCard
                label="Total SRB"
                value={formatINR(matResult.totalBonus)}
                sub={`₹${matResult.srbRate}/1000 SA × ${term}yr${matResult.saSlabBonus > 0 ? ` (incl. +₹${matResult.saSlabBonus} slab)` : ""}`}
              />
            )}
            {matResult.fab > 0 && (
              <ResultCard
                label="FAB"
                value={formatINR(matResult.fab)}
                sub={`₹${matResult.fabRate}/1000 of total SRB`}
              />
            )}
            {matResult.guaranteedAdditions > 0 && (
              <ResultCard label="Guaranteed Additions" value={formatINR(matResult.guaranteedAdditions)} />
            )}
            <ResultCard label="Maturity Value" value={formatINR(matResult.maturityValue)} accent />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <ResultCard label="Total Premiums Paid" value={formatINR(totalPaid)} />
            <ResultCard
              label="Profit"
              value={formatINR(matResult.maturityValue - totalPaid)}
              accent={matResult.maturityValue > totalPaid}
            />
            {irr !== null && (
              <ResultCard
                label="IRR (Annual Return)"
                value={formatPercent(irr)}
                sub="Compare with FD/PPF rates"
              />
            )}
          </div>

          {survivalBenefits.length > 0 && (
            <div className="panel-inner p-4 mb-4">
              <div className="text-xs text-white/40 mb-2 uppercase tracking-wide">Survival Benefits</div>
              <div className="space-y-1">
                {survivalBenefits.map((sb) => (
                  <div key={sb.year} className="flex justify-between text-sm">
                    <span className="text-white/50">Year {sb.year} ({sb.percent}% SA)</span>
                    <span className="text-white font-medium">{formatINR(sb.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="panel-inner p-4 mb-6">
            <div className="text-xs text-white/40 mb-2 uppercase tracking-wide">Breakdown</div>
            <div className="w-full h-6 rounded-full overflow-hidden flex">
              <div
                className="bg-signal h-full"
                style={{ width: `${((matResult.baseSA || matResult.sumAssured) / matResult.maturityValue) * 100}%` }}
                title="Sum Assured"
              />
              {matResult.totalBonus > 0 && (
                <div
                  className="bg-signal-soft h-full"
                  style={{ width: `${(matResult.totalBonus / matResult.maturityValue) * 100}%` }}
                  title="SRB"
                />
              )}
              {matResult.fab > 0 && (
                <div
                  className="bg-signal-dim h-full"
                  style={{ width: `${(matResult.fab / matResult.maturityValue) * 100}%` }}
                  title="FAB"
                />
              )}
              {matResult.guaranteedAdditions > 0 && (
                <div
                  className="bg-signal-soft h-full"
                  style={{ width: `${(matResult.guaranteedAdditions / matResult.maturityValue) * 100}%` }}
                  title="Guaranteed Additions"
                />
              )}
            </div>
            <div className="flex gap-4 mt-2 text-xs text-white/40">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-signal inline-block" /> SA</span>
              {matResult.totalBonus > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-signal-soft inline-block" /> SRB</span>}
              {matResult.fab > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-signal-dim inline-block" /> FAB</span>}
              {matResult.guaranteedAdditions > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-signal-soft inline-block" /> GA</span>}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <PrintButton />
            <ShareButtons text={shareText} />
          </div>
        </div>
      ) : (
        <div className="panel-inner p-6 text-center text-white/30 text-sm">
          Could not calculate maturity for this combination. Try adjusting inputs.
        </div>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
