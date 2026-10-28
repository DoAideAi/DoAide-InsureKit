import { useState, useMemo, useEffect } from "react";
import { LIC_PLANS, PLAN_TYPES, getSRBRate } from "../data/licPlans";
import { calculatePremium } from "../utils/calcPremium";
import { calculateSurrenderValue } from "../utils/calcSurrender";
import { formatINR, formatPercent } from "../utils/format";
import ResultCard from "../components/ResultCard";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackCalculation } from "../lib/analytics";


const HOW_IT_WORKS = [
  { title: "Select plan", desc: "Pick your LIC plan and enter policy details" },
  { title: "Enter years paid", desc: "How many years of premium completed" },
  { title: "See surrender value", desc: "Compare GSV vs SSV and loss on surrender" },
];

const FAQ_ITEMS = [
  { q: "What is surrender value?", a: "Surrender value is the amount you receive if you terminate your LIC policy before maturity. It becomes available after 3 full years of premium payment. There are two types — GSV (Guaranteed Surrender Value) and SSV (Special Surrender Value)." },
  { q: "What is the difference between GSV and SSV?", a: "GSV (Guaranteed Surrender Value) is a fixed percentage of total premiums paid, based on policy term and years completed. SSV (Special Surrender Value) is based on paid-up value × a multiplier factor. LIC pays the higher of the two." },
  { q: "When is surrender value available?", a: "Surrender value is available only after at least 3 full years of premium have been paid. If you surrender before 3 years, you get nothing." },
  { q: "Should I surrender my LIC policy?", a: "Surrendering an LIC policy usually results in significant loss. The surrender value is typically much less than total premiums paid, especially in early years. Consider making the policy paid-up instead, or taking a loan against it." },
  { q: "What is paid-up value?", a: "If you stop paying premiums after 3+ years, LIC converts the policy to 'paid-up' status. The paid-up SA = original SA × (premiums paid / total premiums due). You get this reduced amount at maturity along with vested bonus." },
  { q: "Is surrender value taxable?", a: "If the policy was taken after 1 April 2012 and annual premium exceeds 10% of SA, the surrender value is taxable under 'Income from Other Sources'. Otherwise, it is exempt under Section 10(10D)." },
];

const surrenderPlans = LIC_PLANS.filter(
  (p) =>
    p.type !== PLAN_TYPES.TERM &&
    p.type !== PLAN_TYPES.PENSION &&
    p.type !== PLAN_TYPES.GOVT &&
    Object.keys(p.premiumRates).length > 0,
);

export default function SurrenderCalculator() {
  const [planId, setPlanId] = useState(surrenderPlans[0].id);
  const [age, setAge] = useState(30);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [term, setTerm] = useState(20);
  const [yearsPaid, setYearsPaid] = useState(5);

  const plan = useMemo(() => surrenderPlans.find((p) => p.id === planId), [planId]);

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
    return calculateSurrenderValue(premResult.annualPremium, sumAssured, term, yearsPaid, srbRate);
  }, [premResult, sumAssured, term, yearsPaid, srbRate]);

  useEffect(() => {
    if (result?.eligible) trackCalculation('surrender-value', { plan: plan?.name, yearsPaid, term });
  }, [result, plan?.name, yearsPaid, term]);

  const shareText =
    result?.eligible
      ? `LIC Surrender Value — ${plan.name} (Table ${plan.tableNo})\nSA: ${formatINR(sumAssured)}, Term: ${term}yr\nYears Paid: ${yearsPaid}\nTotal Premiums: ${formatINR(result.totalPremiumsPaid)}\nGSV: ${formatINR(result.gsv)}\nSSV: ${formatINR(result.ssv)}\nSurrender Value: ${formatINR(result.surrenderValue)} (${result.recommended})\n\nCalculated on DoAide InsureKit — insure.doaide.com`
      : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">LIC Surrender Value Calculator</h1>
      <p className="text-white/40 text-sm mb-6">
        Calculate Guaranteed (GSV) and Special Surrender Value (SSV)
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Plan</label>
            <select className="select-field" value={planId} onChange={(e) => setPlanId(e.target.value)}>
              {surrenderPlans.map((p) => (
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
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
              Years Premiums Paid
            </label>
            <input
              type="number"
              className="input-field"
              min={0}
              max={term}
              value={yearsPaid}
              onChange={(e) => setYearsPaid(Number(e.target.value))}
            />
            <div className="text-xs text-white/30 mt-1">
              Surrender value available after 3+ years of premium payment
            </div>
          </div>
        </div>
      </div>

      {result && !result.eligible && (
        <div className="panel p-6 border-l-4 border-l-warn mb-6">
          <div className="text-sm font-medium text-warn">{result.reason}</div>
          <div className="text-xs text-white/30 mt-2">
            You have paid premiums for {result.yearsPaid} year{result.yearsPaid !== 1 ? "s" : ""}.
            Pay for {3 - result.yearsPaid} more year{3 - result.yearsPaid !== 1 ? "s" : ""} to be eligible for surrender value.
          </div>
        </div>
      )}

      {result?.eligible && premResult && (
        <div className="animate-fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <ResultCard
              label="Total Premiums Paid"
              value={formatINR(result.totalPremiumsPaid)}
            />
            <ResultCard
              label={`GSV (${formatPercent(result.gsvFactor)})`}
              value={formatINR(result.gsv)}
              accent={result.recommended === "GSV"}
            />
            <ResultCard
              label="SSV"
              value={formatINR(result.ssv)}
              accent={result.recommended === "SSV"}
              sub={`×${result.ssvMultiplier.toFixed(2)} multiplier`}
            />
            <ResultCard
              label="Surrender Value"
              value={formatINR(result.surrenderValue)}
              accent
              sub={`Higher of GSV/SSV (${result.recommended})`}
            />
          </div>

          <div className="panel-inner p-4 mb-4">
            <div className="text-xs text-white/40 mb-2 uppercase tracking-wide">GSV Calculation</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Total premiums paid ({yearsPaid} yr × {formatINR(premResult.annualPremium)})</span>
                <span className="text-white/70">{formatINR(result.totalPremiumsPaid)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">GSV factor ({yearsPaid}/{term} years paid)</span>
                <span className="text-white/70">{formatPercent(result.gsvFactor)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-1">
                <span className="text-white/70 font-medium">Guaranteed Surrender Value</span>
                <span className="text-white font-medium">{formatINR(result.gsv)}</span>
              </div>
            </div>
          </div>

          <div className="panel-inner p-4 mb-4">
            <div className="text-xs text-white/40 mb-2 uppercase tracking-wide">SSV Calculation</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Paid-up SA ({yearsPaid}/{term} × {formatINR(sumAssured)})</span>
                <span className="text-white/70">{formatINR(result.paidUpSA)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Vested bonus (₹{srbRate}/1000 × {yearsPaid} yr)</span>
                <span className="text-white/70">{formatINR(result.totalBonus)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">SSV multiplier ({result.remainingYears} yr remaining)</span>
                <span className="text-white/70">×{result.ssvMultiplier.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-1">
                <span className="text-white/70 font-medium">Special Surrender Value</span>
                <span className="text-white font-medium">{formatINR(result.ssv)}</span>
              </div>
            </div>
          </div>

          <div className="panel p-4 mb-6 border-l-4 border-l-bad">
            <div className="text-sm font-medium text-white mb-1">Loss on Surrender</div>
            <div className="text-sm text-bad">
              You will lose approximately {formatINR(result.lossOnSurrender)} ({formatPercent(result.lossOnSurrender / result.totalPremiumsPaid)}) of premiums paid
            </div>
            <div className="text-xs text-white/30 mt-2">
              Consider alternatives: make policy paid-up (get reduced maturity) or take a loan against the policy instead of surrendering.
            </div>
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
