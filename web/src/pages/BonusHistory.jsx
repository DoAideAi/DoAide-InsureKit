import { useState, useMemo, useEffect } from "react";
import { getAllBonusPlans, getBonusHistory } from "../data/bonusHistory";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackEvent } from "../lib/analytics";

const allPlans = getAllBonusPlans();


const HOW_IT_WORKS = [
  { title: "Select plan", desc: "Choose from 15+ participating LIC plans" },
  { title: "View history", desc: "See SRB rates from 2015 to 2025" },
  { title: "Track trends", desc: "Compare bonus trends year over year" },
];

const FAQ_ITEMS = [
  { q: "What is Simple Reversionary Bonus (SRB)?", a: "SRB is a bonus declared annually by LIC on participating plans. It is expressed as ₹ per 1000 of Sum Assured and accrues every year. Once declared, the bonus is guaranteed and added to the policy." },
  { q: "How is the bonus calculated?", a: "Bonus = (SRB Rate / 1000) × Sum Assured × Number of years. For example, if SRB is ₹45/1000 SA and SA is ₹10,00,000 for 20 years, total bonus = ₹45 × 1000 × 20 = ₹9,00,000." },
  { q: "Are bonus rates guaranteed?", a: "No. LIC declares bonus rates annually based on the fund's performance. Past rates do not guarantee future rates. However, once declared for a year, that year's bonus is guaranteed." },
  { q: "What is FAB (Final Additional Bonus)?", a: "FAB is a one-time bonus added at maturity for policies with longer terms (typically 15+ years). It is calculated per ₹1000 of total accrued SRB, not Sum Assured." },
  { q: "Why have bonus rates been declining?", a: "LIC has gradually reduced bonus rates over the years as interest rates in the economy have declined. The bonus rates reflect the actual investment returns on the life fund." },
  { q: "Do all LIC plans get bonus?", a: "No. Only participating (with-profit) plans get SRB. Term plans, non-participating plans like Dhan Sanchay, and ULIP plans do not receive SRB." },
];

export default function BonusHistory() {
  const [selectedPlanId, setSelectedPlanId] = useState(allPlans[0]?.planId || "");

  const selectedPlan = useMemo(
    () => getBonusHistory(selectedPlanId),
    [selectedPlanId],
  );

  useEffect(() => {
    if (selectedPlan) trackEvent('lookup:bonus-history', { plan: selectedPlan.planName });
  }, [selectedPlan]);

  const shareText = selectedPlan
    ? `LIC Bonus History — ${selectedPlan.planName} (Table ${selectedPlan.tableNo})\n\n${selectedPlan.history.map((h) => `${h.year}: ₹${h.rate}/1000 SA`).join("\n")}\n\n— DoAide InsureKit (insure.doaide.com)`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">LIC Bonus History</h1>
      <p className="text-white/40 text-sm mb-6">
        Historical Simple Reversionary Bonus (SRB) rates by plan and year
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Select Plan</label>
        <select
          className="select-field"
          value={selectedPlanId}
          onChange={(e) => setSelectedPlanId(e.target.value)}
        >
          {allPlans.map((p) => (
            <option key={p.planId} value={p.planId}>
              {p.planName} (Table {p.tableNo})
            </option>
          ))}
        </select>
      </div>

      {selectedPlan && (
        <div className="animate-fade-up">
          <div className="panel-inner p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-medium text-white">{selectedPlan.planName}</div>
                <div className="text-xs text-white/40">Table No. {selectedPlan.tableNo} &mdash; SRB in ₹ per 1000 Sum Assured</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-signal">{selectedPlan.history[0]?.rate}</div>
                <div className="text-[10px] text-white/30 uppercase">Current Rate</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-wide">
                    <th className="text-left py-2 px-3">Year</th>
                    <th className="text-right py-2 px-3">SRB Rate (₹/1000 SA)</th>
                    <th className="text-right py-2 px-3">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPlan.history.map((h, i) => {
                    const prev = selectedPlan.history[i + 1];
                    const change = prev ? h.rate - prev.rate : 0;
                    return (
                      <tr key={h.year} className="border-b border-white/5">
                        <td className="py-2 px-3 text-white/60">{h.year}</td>
                        <td className="py-2 px-3 text-right text-white font-medium">₹{h.rate}</td>
                        <td className={`py-2 px-3 text-right text-xs ${change > 0 ? "text-good" : change < 0 ? "text-bad" : "text-white/30"}`}>
                          {change > 0 ? `+${change}` : change < 0 ? change : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel-inner p-4 mb-4">
            <div className="text-xs text-white/40 mb-2 uppercase tracking-wide">Bonus Trend</div>
            <div className="flex items-end gap-1 h-24">
              {[...selectedPlan.history].reverse().map((h) => {
                const max = Math.max(...selectedPlan.history.map((x) => x.rate));
                const min = Math.min(...selectedPlan.history.map((x) => x.rate));
                const range = max - min || 1;
                const height = ((h.rate - min) / range) * 80 + 20;
                return (
                  <div key={h.year} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-signal/40 rounded-t"
                      style={{ height: `${height}%` }}
                      title={`${h.year}: ₹${h.rate}`}
                    />
                    <div className="text-[8px] text-white/20 -rotate-45 origin-top-left whitespace-nowrap">
                      {h.year.slice(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="panel-inner p-3 mb-4 text-xs text-white/30">
            <p>Bonus rates are declared annually by LIC. Past performance does not guarantee future bonus.</p>
            <p className="mt-1">SRB = Simple Reversionary Bonus. Rates shown are per ₹1000 of Sum Assured per year.</p>
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
