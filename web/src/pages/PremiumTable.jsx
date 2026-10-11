import { useState, useMemo } from "react";
import { LIC_PLANS, MODE_LABELS, MODE_FACTORS, MODE_REBATES, GST_RATES, SA_REBATES } from "../data/licPlans";
import { formatINR } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";

const HOW_IT_WORKS = [
  { title: "Choose a plan", desc: "Select any LIC plan to view its premium grid" },
  { title: "Set Sum Assured", desc: "Enter SA to see actual premium amounts" },
  { title: "Read the table", desc: "Rows = entry age, columns = policy term" },
];

const FAQ_ITEMS = [
  { q: "What is a premium rate table?", a: "It shows the tabular premium rate per ₹1,000 of Sum Assured for every valid age-term combination. Multiply by your SA (in thousands) to get the annual premium before rebates." },
  { q: "Why are some cells empty?", a: "LIC restricts certain age-term combinations. For example, a 50-year-old cannot take a 35-year endowment because maturity age would exceed limits. Empty cells mean that combination is not available." },
  { q: "How do I use this to pitch a plan?", a: "Show the client the premium row for their age. They can see how premium changes with different terms, making it easy to pick the right option. Share via WhatsApp or print for offline use." },
  { q: "Are SA rebates included?", a: "When you set a Sum Assured ≥ ₹5L, the SA rebate is automatically applied. The table header shows the effective rate. Toggle 'Show rate per 1000' to see raw rates." },
];

const tablePlans = LIC_PLANS.filter(
  (p) => Object.keys(p.premiumRates).length > 0 && !p.fixedPremium,
);

function getSARebate(sumAssured) {
  for (const { minSA, rate } of SA_REBATES) {
    if (sumAssured >= minSA) return rate;
  }
  return 0;
}

export default function PremiumTable() {
  const [planId, setPlanId] = useState(tablePlans[0]?.id || "");
  const [sumAssured, setSumAssured] = useState(1000000);
  const [mode, setMode] = useState("yearly");
  const [showRates, setShowRates] = useState(false);

  const plan = useMemo(() => tablePlans.find((p) => p.id === planId), [planId]);

  const { ages, terms, grid } = useMemo(() => {
    if (!plan) return { ages: [], terms: [], grid: {} };

    const ageSet = new Set();
    const termSet = new Set();
    const g = {};

    for (const [ageStr, termsObj] of Object.entries(plan.premiumRates)) {
      const age = Number(ageStr);
      ageSet.add(age);
      g[age] = {};
      for (const [termStr, rate] of Object.entries(termsObj)) {
        const term = Number(termStr);
        termSet.add(term);
        g[age][term] = rate;
      }
    }

    return {
      ages: [...ageSet].sort((a, b) => a - b),
      terms: [...termSet].sort((a, b) => a - b),
      grid: g,
    };
  }, [plan]);

  const saRebate = getSARebate(sumAssured);
  const modeRebate = MODE_REBATES[mode] || 0;
  const modeFactor = MODE_FACTORS[mode] || 1;

  function computePremium(rate) {
    const effectiveRate = Math.max(0, rate - saRebate);
    const annual = Math.round((effectiveRate * sumAssured) / 1000 * (1 - modeRebate));
    return Math.round(annual * modeFactor);
  }

  const shareText = plan
    ? `LIC ${plan.name} (Table ${plan.tableNo}) — Premium Table\nSA: ${formatINR(sumAssured)} | Mode: ${MODE_LABELS[mode]}\n\n${ages.slice(0, 5).map(
        (age) => `Age ${age}: ${terms.filter((t) => grid[age]?.[t]).map((t) => `${t}yr=${showRates ? `₹${grid[age][t]}` : formatINR(computePremium(grid[age][t]))}`).join(", ")}`,
      ).join("\n")}\n${ages.length > 5 ? `...and ${ages.length - 5} more ages` : ""}\n\nFull table at insure.doaide.com/premium-table`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Age-Wise Premium Table</h1>
      <p className="text-white/40 text-sm mb-6">
        Complete premium grid for any LIC plan — show clients exact premiums for every age and term
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Plan</label>
            <select className="select-field" value={planId} onChange={(e) => setPlanId(e.target.value)}>
              {tablePlans.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.tableNo})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Sum Assured (₹)</label>
            <input type="number" className="input-field" min={100000} step={100000} value={sumAssured} onChange={(e) => setSumAssured(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Payment Mode</label>
            <select className="select-field" value={mode} onChange={(e) => setMode(e.target.value)}>
              {Object.entries(MODE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setShowRates(!showRates)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all w-full ${showRates ? "bg-signal text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}
            >
              {showRates ? "Showing rate/1000" : "Showing premium"}
            </button>
          </div>
        </div>

        {saRebate > 0 && (
          <div className="mt-3 text-xs text-good">
            SA rebate applied: −₹{saRebate}/1000 SA (SA ≥ {sumAssured >= 1000000 ? "₹10L" : "₹5L"})
          </div>
        )}
      </div>

      {plan && ages.length > 0 && (
        <div className="animate-fade-up">
          <div className="panel-inner p-3 mb-4">
            <div className="text-sm font-medium text-white">{plan.name} <span className="text-white/30">(Table {plan.tableNo})</span></div>
            <div className="text-xs text-white/40 mt-0.5">{plan.description}</div>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2.5 px-2 text-xs text-white/40 uppercase tracking-wide sticky left-0 bg-ink-900 z-10">
                    Age ↓ / Term →
                  </th>
                  {terms.map((t) => (
                    <th key={t} className="text-center py-2.5 px-2 text-xs text-signal font-semibold min-w-[80px]">
                      {t} yr
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ages.map((age, idx) => (
                  <tr key={age} className={`border-b border-white/5 ${idx % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                    <td className="py-2 px-2 text-white/50 font-medium sticky left-0 bg-ink-900 z-10 text-xs">
                      {age} yr
                    </td>
                    {terms.map((t) => {
                      const rate = grid[age]?.[t];
                      if (rate == null) {
                        return <td key={t} className="py-2 px-2 text-center text-white/10">—</td>;
                      }
                      return (
                        <td key={t} className="py-2 px-2 text-center text-white/70 text-xs font-mono">
                          {showRates ? `₹${rate}` : formatINR(computePremium(rate))}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel-inner p-3 mb-4 text-xs text-white/30 space-y-1">
            <p>Rates per ₹1,000 Sum Assured as per LIC published premium tables.</p>
            {!showRates && <p>Premiums shown include SA rebate and mode rebate. GST ({(GST_RATES.firstYear * 100).toFixed(1)}% first year / {(GST_RATES.renewal * 100).toFixed(1)}% renewal) not included.</p>}
            <p>Empty cells indicate that age-term combination is not available for this plan.</p>
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
