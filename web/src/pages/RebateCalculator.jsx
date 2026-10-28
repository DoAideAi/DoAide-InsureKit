import { useState, useMemo, useEffect } from "react";
import { LIC_PLANS, SA_REBATES, MODE_FACTORS, MODE_LABELS, MODE_REBATES, GST_RATES } from "../data/licPlans";
import { formatINR } from "../utils/format";
import ResultCard from "../components/ResultCard";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackCalculation } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Select plan & age", desc: "Choose your LIC plan and entry age" },
  { title: "Set SA & mode", desc: "Enter sum assured and payment mode" },
  { title: "See savings", desc: "View SA rebate + mode rebate savings" },
];

const FAQ_ITEMS = [
  { q: "What is SA rebate in LIC?", a: "Sum Assured rebate is a discount on the tabular premium rate. SA ≥ ₹5 lakh gets ₹2.50/1000 rebate, SA ≥ ₹10 lakh gets ₹4.00/1000 rebate. This reduces your per-unit premium cost." },
  { q: "What is mode rebate?", a: "Mode rebate is a discount for choosing annual or half-yearly payment. Yearly mode gets 2% rebate, half-yearly gets 1%. Quarterly and monthly modes get no mode rebate." },
  { q: "How much can I save with rebates?", a: "For a ₹10L SA policy at ₹50 tabular rate, SA rebate saves ₹4,000/year. Yearly mode saves another 2% (₹920/year). Combined: ₹4,920/year or ₹98,400 over a 20-year term." },
  { q: "Can I increase SA to get the rebate?", a: "Yes! If your SA is close to ₹5L or ₹10L, increasing it slightly to cross the threshold can actually reduce your effective premium rate. A smart agent always checks this." },
  { q: "Does SA rebate apply to all plans?", a: "SA rebate applies to most traditional LIC plans. Term plans, pension plans, and some fixed-premium plans may have different rebate structures. Check the plan brochure." },
  { q: "Which payment mode is cheapest overall?", a: "Yearly mode is cheapest: you get 2% rebate and no loading. Monthly SSS/ECS is most expensive — factor 0.0875 × 12 = 1.05, meaning you pay 5% more than the annual premium." },
];

const selectablePlans = LIC_PLANS.filter(
  (p) => Object.keys(p.premiumRates).length > 0 && !p.fixedPremium,
);

function getPremiumRate(plan, age, term) {
  if (!plan.premiumRates) return null;
  const ages = Object.keys(plan.premiumRates).map(Number).sort((a, b) => a - b);
  let ageKey = ages[0];
  for (const a of ages) {
    if (a <= age) ageKey = a;
    else break;
  }
  return plan.premiumRates[ageKey]?.[term] || null;
}

function getSARebate(sa) {
  for (const r of SA_REBATES) {
    if (sa >= r.minSA) return r.rate;
  }
  return 0;
}

export default function RebateCalculator() {
  const [planId, setPlanId] = useState(selectablePlans[0]?.id || "");
  const [age, setAge] = useState(30);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [term, setTerm] = useState(20);
  const [mode, setMode] = useState("yearly");

  const plan = useMemo(() => selectablePlans.find((p) => p.id === planId), [planId]);

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
    const tabularRate = getPremiumRate(plan, age, term);
    if (!tabularRate) return null;

    const saRebate = getSARebate(sumAssured);
    const effectiveRate = tabularRate - saRebate;
    const basePremiumNoRebate = Math.round((tabularRate / 1000) * sumAssured);
    const basePremiumWithSARebate = Math.round((effectiveRate / 1000) * sumAssured);
    const saRebateAmount = basePremiumNoRebate - basePremiumWithSARebate;

    const modeRebatePercent = MODE_REBATES[mode];
    const modeRebateAmount = Math.round(basePremiumWithSARebate * modeRebatePercent);
    const premiumAfterAllRebates = basePremiumWithSARebate - modeRebateAmount;

    const totalAnnualSaving = saRebateAmount + modeRebateAmount;
    const totalTermSaving = totalAnnualSaving * term;

    const modeComparison = Object.entries(MODE_LABELS).map(([m, label]) => {
      const factor = MODE_FACTORS[m];
      const rebate = MODE_REBATES[m];
      const afterSA = basePremiumWithSARebate;
      const afterMode = Math.round(afterSA * (1 - rebate));
      const perInstallment = Math.round(afterMode * factor);
      const annual = m === "yearly" ? perInstallment : m === "halfYearly" ? perInstallment * 2 : m === "quarterly" ? perInstallment * 4 : perInstallment * 12;
      return { mode: m, label, factor, rebate, perInstallment, annual };
    });

    const saComparison = [
      { sa: 300000, label: "₹3 Lakh" },
      { sa: 500000, label: "₹5 Lakh" },
      { sa: 1000000, label: "₹10 Lakh" },
      { sa: 2500000, label: "₹25 Lakh" },
    ].map((item) => {
      const reb = getSARebate(item.sa);
      const eff = tabularRate - reb;
      const prem = Math.round((eff / 1000) * item.sa);
      return { ...item, rebate: reb, effectiveRate: eff, premium: prem };
    });

    return {
      tabularRate,
      saRebate,
      effectiveRate,
      basePremiumNoRebate,
      basePremiumWithSARebate,
      saRebateAmount,
      modeRebatePercent,
      modeRebateAmount,
      premiumAfterAllRebates,
      totalAnnualSaving,
      totalTermSaving,
      modeComparison,
      saComparison,
    };
  }, [plan, age, sumAssured, term, mode]);

  useEffect(() => {
    if (result) trackCalculation('rebate', { plan: plan?.name, mode, sumAssured });
  }, [result, plan?.name, mode, sumAssured]);

  const shareText = result
    ? `LIC ${plan.name} — Rebate Analysis\nSA: ${formatINR(sumAssured)}, Age: ${age}, Term: ${term}yr\nTabular Rate: ₹${result.tabularRate}/1000\nSA Rebate: ₹${result.saRebate}/1000 (saves ${formatINR(result.saRebateAmount)}/yr)\nMode Rebate: ${(result.modeRebatePercent * 100).toFixed(0)}% (saves ${formatINR(result.modeRebateAmount)}/yr)\nTotal Saving: ${formatINR(result.totalTermSaving)} over ${term} years\n\n— DoAide InsureKit (insure.doaide.com)`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Rebate Calculator</h1>
      <p className="text-sm text-white/50 mb-6">
        Calculate SA rebate and mode rebate savings. Show clients how much they save by choosing the right SA and payment mode.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-white/60 mb-1">LIC Plan</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={planId} onChange={(e) => setPlanId(e.target.value)}>
            {selectablePlans.map((p) => (
              <option key={p.id} value={p.id}>{p.name} (Table {p.tableNo})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Age</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={age} onChange={(e) => setAge(Number(e.target.value))} min={plan?.minAge || 18} max={plan?.maxAge || 65} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Sum Assured (₹)</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={sumAssured} onChange={(e) => setSumAssured(Number(e.target.value))} min={100000} step={100000} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Term (years)</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={term} onChange={(e) => setTerm(Number(e.target.value))}>
            {availableTerms.map((t) => (
              <option key={t} value={t}>{t} years</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Payment Mode</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={mode} onChange={(e) => setMode(e.target.value)}>
            {Object.entries(MODE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <ResultCard title="Tabular Rate" value={`₹${result.tabularRate}/1000`} />
            <ResultCard title="SA Rebate" value={result.saRebate > 0 ? `₹${result.saRebate}/1000` : "None"} />
            <ResultCard title="Effective Rate" value={`₹${result.effectiveRate}/1000`} />
            <ResultCard title="SA Rebate Saving/Year" value={formatINR(result.saRebateAmount)} />
            <ResultCard title={`Mode Rebate (${(result.modeRebatePercent * 100).toFixed(0)}%)`} value={formatINR(result.modeRebateAmount)} />
            <ResultCard title="Total Saving Over Term" value={formatINR(result.totalTermSaving)} />
          </div>

          <div className="bg-signal/10 border border-signal/30 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Premium Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Premium without rebates</span>
                <span>{formatINR(result.basePremiumNoRebate)}</span>
              </div>
              <div className="flex justify-between text-signal">
                <span>− SA rebate (₹{result.saRebate}/1000)</span>
                <span>−{formatINR(result.saRebateAmount)}</span>
              </div>
              <div className="flex justify-between text-signal">
                <span>− Mode rebate ({(result.modeRebatePercent * 100).toFixed(0)}%)</span>
                <span>−{formatINR(result.modeRebateAmount)}</span>
              </div>
              <div className="flex justify-between text-white font-bold border-t border-white/10 pt-2">
                <span>Premium after rebates</span>
                <span>{formatINR(result.premiumAfterAllRebates)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Mode Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white/60">Mode</th>
                    <th className="text-right py-2 text-white/60">Rebate</th>
                    <th className="text-right py-2 text-white/60">Per Installment</th>
                    <th className="text-right py-2 text-white/60">Annual Outgo</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  {result.modeComparison.map((m) => (
                    <tr key={m.mode} className={`border-b border-white/5 ${m.mode === mode ? "bg-signal/5" : ""}`}>
                      <td className="py-2 font-medium">{m.label}</td>
                      <td className="text-right">{(m.rebate * 100).toFixed(0)}%</td>
                      <td className="text-right">{formatINR(m.perInstallment)}</td>
                      <td className="text-right">{formatINR(m.annual)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">SA Rebate Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white/60">Sum Assured</th>
                    <th className="text-right py-2 text-white/60">Rebate/1000</th>
                    <th className="text-right py-2 text-white/60">Effective Rate</th>
                    <th className="text-right py-2 text-white/60">Annual Premium</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  {result.saComparison.map((s) => (
                    <tr key={s.sa} className={`border-b border-white/5 ${s.sa === sumAssured ? "bg-signal/5" : ""}`}>
                      <td className="py-2 font-medium">{s.label}</td>
                      <td className="text-right">{s.rebate > 0 ? `₹${s.rebate}` : "None"}</td>
                      <td className="text-right">₹{s.effectiveRate.toFixed(2)}</td>
                      <td className="text-right">{formatINR(s.premium)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">LIC Rebate Rules — Quick Reference</h3>
            <div className="space-y-3 text-sm text-white/70">
              <div>
                <p className="text-white font-medium mb-1">Sum Assured Rebate</p>
                <p>SA ≥ ₹5,00,000: ₹2.50 per ₹1000 SA | SA ≥ ₹10,00,000: ₹4.00 per ₹1000 SA</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Mode Rebate</p>
                <p>Yearly: 2% rebate | Half-Yearly: 1% rebate | Quarterly: Nil | Monthly (SSS/ECS): Nil</p>
              </div>
              <div>
                <p className="text-white font-medium mb-1">Mode Loading Factors</p>
                <p>Yearly: 1.0 | Half-Yearly: 0.5131 | Quarterly: 0.2615 | Monthly: 0.0875</p>
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
