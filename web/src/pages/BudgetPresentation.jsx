import { useState, useMemo, useEffect } from "react";
import { LIC_PLANS } from "../data/licPlans";
import { calculatePremium } from "../utils/calcPremium";
import { calculateMaturity } from "../utils/calcMaturity";
import { formatINR, formatLakh } from "../utils/format";
import PrintButton from "../components/PrintButton";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackEvent } from "../lib/analytics";

const TABS = [
  { id: "premium", label: "Budget-wise", desc: "Find plans that fit a monthly/annual budget" },
  { id: "sa", label: "SA-wise", desc: "Find plans for a target sum assured" },
  { id: "maturity", label: "Maturity-wise", desc: "Find plans for a target maturity amount" },
];

const HOW_IT_WORKS = [
  { title: "Choose mode", desc: "Select Budget-wise, SA-wise, or Maturity-wise" },
  { title: "Set target", desc: "Enter your budget, target SA, or desired maturity" },
  { title: "Compare plans", desc: "See which LIC plans fit your criteria best" },
];

const FAQ_ITEMS = [
  { q: "What is a Budget-wise presentation?", a: "It shows all LIC plans that fit within a client's annual or monthly premium budget — sorted by coverage and maturity value, so you can recommend the best option for their spending power." },
  { q: "What is SA-wise presentation?", a: "Given a target coverage (sum assured), it shows which plans offer that SA and compares their premiums, maturity values, and features — helping pick the most cost-effective plan." },
  { q: "What is Maturity-wise presentation?", a: "Given a target maturity amount (e.g., ₹50 lakh at retirement), it reverse-calculates which plans can reach that goal and what premium/SA is needed for each — great for goal-based selling." },
  { q: "Are all LIC plans included?", a: "All plans with published premium rates are shown. Some plans may not appear if they don't have rates for the selected age or term." },
];

const presentablePlans = LIC_PLANS.filter(
  (p) => Object.keys(p.premiumRates).length > 0 && !p.fixedPremium,
);

function getPremiumRate(plan, age, term) {
  const ages = Object.keys(plan.premiumRates).map(Number).sort((a, b) => a - b);
  let ageKey = ages[0];
  for (const a of ages) {
    if (a <= age) ageKey = a;
    else break;
  }
  return plan.premiumRates[ageKey]?.[term] || null;
}

export default function BudgetPresentation() {
  const [tab, setTab] = useState("premium");
  const [age, setAge] = useState(30);
  const [term, setTerm] = useState(20);
  const [budget, setBudget] = useState(50000);
  const [targetSA, setTargetSA] = useState(1000000);
  const [targetMaturity, setTargetMaturity] = useState(2500000);
  const [clientName, setClientName] = useState("");
  const [agentName, setAgentName] = useState("");

  const premiumResults = useMemo(() => {
    if (tab !== "premium") return [];
    return presentablePlans
      .map((plan) => {
        const rate = getPremiumRate(plan, age, term);
        if (!rate) return null;
        const saForBudget = Math.floor((budget / rate) * 1000 / 10000) * 10000;
        if (saForBudget < (plan.minSA || 100000)) return null;
        const premium = calculatePremium(plan, age, saForBudget, term, "yearly", true);
        if (!premium || premium.annualPremium > budget * 1.05) return null;
        const maturity = calculateMaturity(plan, saForBudget, term);
        return { plan, sa: saForBudget, premium, maturity };
      })
      .filter(Boolean)
      .sort((a, b) => (b.maturity?.maturityValue || 0) - (a.maturity?.maturityValue || 0));
  }, [tab, age, term, budget]);

  const saResults = useMemo(() => {
    if (tab !== "sa") return [];
    return presentablePlans
      .map((plan) => {
        const rate = getPremiumRate(plan, age, term);
        if (!rate) return null;
        const premium = calculatePremium(plan, age, targetSA, term, "yearly", true);
        if (!premium) return null;
        const maturity = calculateMaturity(plan, targetSA, term);
        return { plan, sa: targetSA, premium, maturity };
      })
      .filter(Boolean)
      .sort((a, b) => a.premium.annualPremium - b.premium.annualPremium);
  }, [tab, age, term, targetSA]);

  const maturityResults = useMemo(() => {
    if (tab !== "maturity") return [];
    return presentablePlans
      .map((plan) => {
        const rate = getPremiumRate(plan, age, term);
        if (!rate) return null;
        const testSA = 1000000;
        const testMaturity = calculateMaturity(plan, testSA, term);
        if (!testMaturity?.maturityValue || testMaturity.maturityValue <= 0) return null;
        const ratio = targetMaturity / testMaturity.maturityValue;
        const neededSA = Math.ceil((testSA * ratio) / 10000) * 10000;
        if (neededSA < (plan.minSA || 100000)) return null;
        const premium = calculatePremium(plan, age, neededSA, term, "yearly", true);
        if (!premium) return null;
        const actualMaturity = calculateMaturity(plan, neededSA, term);
        return { plan, sa: neededSA, premium, maturity: actualMaturity };
      })
      .filter(Boolean)
      .sort((a, b) => a.premium.annualPremium - b.premium.annualPremium);
  }, [tab, age, term, targetMaturity]);

  const currentResults = tab === "premium" ? premiumResults : tab === "sa" ? saResults : maturityResults;

  const targetLabel = tab === "premium" ? `Budget: ${formatINR(budget)}/yr` : tab === "sa" ? `Target SA: ${formatINR(targetSA)}` : `Target Maturity: ${formatINR(targetMaturity)}`;

  useEffect(() => {
    if (currentResults.length > 0) trackEvent('presentation:generate', { tool: 'budget-presentation', mode: tab });
  }, [currentResults, tab]);

  const shareText = `📊 ${TABS.find((t) => t.id === tab)?.label} Plan Comparison\n${clientName ? `Client: ${clientName}, ` : ""}Age: ${age}, Term: ${term}yr\n${targetLabel}\n\n${currentResults.slice(0, 5).map((r, i) => `${i + 1}. ${r.plan.name}: SA ${formatINR(r.sa)}, Premium ${formatINR(r.premium.annualPremium)}/yr${r.maturity?.maturityValue ? `, Maturity ${formatLakh(r.maturity.maturityValue)}` : ""}`).join("\n")}\n\n— DoAide InsureKit (insure.doaide.com)`;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Budget & Goal-wise Presentations</h1>
      <p className="text-sm text-white/50 mb-6">
        Find the right LIC plan by budget, coverage target, or maturity goal.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="flex gap-1 mb-6 bg-white/5 p-1 rounded-lg print:hidden">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition ${tab === t.id ? "bg-signal text-white" : "text-white/50 hover:text-white"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 print:hidden">
        <div>
          <label className="block text-sm text-white/60 mb-1">Client Age</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={age} onChange={(e) => setAge(Number(e.target.value))} min={0} max={65} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Term (years)</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={term} onChange={(e) => setTerm(Number(e.target.value))} min={5} max={40} />
        </div>
        {tab === "premium" && (
          <div>
            <label className="block text-sm text-white/60 mb-1">Annual Budget (₹)</label>
            <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={budget} onChange={(e) => setBudget(Number(e.target.value))} min={5000} step={5000} />
          </div>
        )}
        {tab === "sa" && (
          <div>
            <label className="block text-sm text-white/60 mb-1">Target Sum Assured (₹)</label>
            <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={targetSA} onChange={(e) => setTargetSA(Number(e.target.value))} min={100000} step={100000} />
          </div>
        )}
        {tab === "maturity" && (
          <div>
            <label className="block text-sm text-white/60 mb-1">Target Maturity (₹)</label>
            <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={targetMaturity} onChange={(e) => setTargetMaturity(Number(e.target.value))} min={500000} step={100000} />
          </div>
        )}
        <div>
          <label className="block text-sm text-white/60 mb-1">Client Name</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Optional" />
        </div>
      </div>

      <div className="presentation-output">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4 print:border-none print:p-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs text-signal font-medium uppercase tracking-wide mb-1">{TABS.find((t) => t.id === tab)?.label} Comparison</div>
              <h2 className="text-xl font-bold text-white print:text-black">{targetLabel}</h2>
              <div className="text-sm text-white/50">{clientName ? `${clientName} · ` : ""}Age {age} · Term {term} years · {currentResults.length} plans found</div>
            </div>
          </div>

          {currentResults.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              <p className="text-lg mb-2">No plans found for this criteria</p>
              <p className="text-sm">Try adjusting the age, term, or target amount</p>
            </div>
          ) : (
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white/60 px-2">#</th>
                    <th className="text-left py-2 text-white/60 px-2">Plan</th>
                    <th className="text-left py-2 text-white/60 px-2">Type</th>
                    <th className="text-right py-2 text-white/60 px-2">Sum Assured</th>
                    <th className="text-right py-2 text-white/60 px-2">Annual Premium</th>
                    <th className="text-right py-2 text-white/60 px-2">Est. Maturity</th>
                    {tab === "premium" && <th className="text-right py-2 text-white/60 px-2">Maturity/Premium</th>}
                  </tr>
                </thead>
                <tbody>
                  {currentResults.map((r, i) => {
                    const ppt = typeof r.plan.ppt === "number" ? r.plan.ppt : term;
                    const totalPaid = r.premium.annualPremium * ppt;
                    const ratio = r.maturity?.maturityValue ? (r.maturity.maturityValue / totalPaid).toFixed(2) : "—";
                    return (
                      <tr key={r.plan.id} className={`border-b border-white/5 ${i === 0 ? "bg-signal/5" : ""}`}>
                        <td className="py-2 px-2 text-white/40">{i + 1}</td>
                        <td className="py-2 px-2">
                          <div className="text-white font-medium">{r.plan.name}</div>
                          <div className="text-white/40 text-[10px]">Table {r.plan.tableNo}</div>
                        </td>
                        <td className="py-2 px-2 text-white/50 text-xs">{r.plan.type}</td>
                        <td className="py-2 px-2 text-right">{formatINR(r.sa)}</td>
                        <td className="py-2 px-2 text-right">{formatINR(r.premium.annualPremium)}</td>
                        <td className="py-2 px-2 text-right">{r.maturity?.maturityValue ? formatLakh(r.maturity.maturityValue) : "—"}</td>
                        {tab === "premium" && <td className="py-2 px-2 text-right text-signal font-medium">{ratio}x</td>}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {currentResults.length > 0 && (
            <div className="bg-signal/10 border border-signal/30 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-semibold text-white mb-2">Top Recommendation</h3>
              <div className="text-sm text-white/70">
                <span className="text-signal font-semibold">{currentResults[0].plan.name}</span> offers
                {tab === "premium" && currentResults[0].maturity?.maturityValue
                  ? ` the highest estimated maturity of ${formatLakh(currentResults[0].maturity.maturityValue)} within your ${formatINR(budget)} budget.`
                  : tab === "sa"
                    ? ` the lowest premium of ${formatINR(currentResults[0].premium.annualPremium)}/year for ${formatINR(targetSA)} coverage.`
                    : ` a path to ${formatINR(targetMaturity)} maturity with a premium of ${formatINR(currentResults[0].premium.annualPremium)}/year.`}
              </div>
            </div>
          )}

          <div className="text-xs text-white/30 border-t border-white/5 pt-4 print:text-gray-400">
            <p>Disclaimer: Figures are based on LIC's published rates and bonus history. Actual values may vary.</p>
            {agentName && <p className="mt-2 font-medium text-white/50">Presented by: {agentName}</p>}
            <p className="mt-1">Generated on DoAide InsureKit — insure.doaide.com</p>
          </div>
        </div>

        <div className="flex items-center gap-3 print:hidden">
          <PrintButton />
          <ShareButtons text={shareText} />
        </div>
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
