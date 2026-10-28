import { useState, useMemo, useEffect } from "react";
import { getPlansForComparison, getSRBRate } from "../data/licPlans";
import { calculatePremium } from "../utils/calcPremium";
import { calculateMaturity, calculateTotalPremiumsPaid, calculateIRR } from "../utils/calcMaturity";
import { formatINR, formatPercent } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackCalculation } from "../lib/analytics";


const HOW_IT_WORKS = [
  { title: "Choose plans", desc: "Select 2-3 plans from preset comparison groups" },
  { title: "Set age, SA & term", desc: "Enter common parameters for fair comparison" },
  { title: "Compare side by side", desc: "See premium, maturity, IRR, and features together" },
];

const FAQ_ITEMS = [
  { q: "How do I choose the best LIC plan?", a: "Consider your goal (protection, savings, child's future, retirement), budget, and term. Pure term plans offer maximum cover at minimum cost. Endowment plans combine savings + insurance. Money back plans give periodic returns. Compare using our tool to see premiums, maturity, and IRR side by side." },
  { q: "What does IRR tell me about a plan?", a: "IRR (Internal Rate of Return) shows the effective annual return on your premiums accounting for time value of money. Higher IRR = better returns. Typical LIC endowment IRR is 4-6%. Compare this with FD (6-7%) and PPF (7.1%) rates." },
  { q: "What is the difference between endowment and term plans?", a: "Endowment plans combine life cover with savings — you get maturity benefit if you survive the term. Term plans offer only life cover — no maturity benefit, but premiums are 10-20× cheaper for the same cover." },
  { q: "Which plan is best for tax saving?", a: "All LIC plans qualify for Section 80C deduction up to ₹1.5 lakh. For pure tax saving with good returns, consider Jeevan Anand (715) or Jeevan Labh (736). Term plans give maximum cover per rupee of premium." },
  { q: "Can I compare more than 3 plans?", a: "Currently you can compare up to 3 plans at a time. For a broader comparison, run multiple comparisons and note down the key metrics (premium, maturity, IRR) for each plan." },
];

const comparablePlans = getPlansForComparison();

export default function PlanComparison() {
  const [plan1Id, setPlan1Id] = useState(comparablePlans[0]?.id || "");
  const [plan2Id, setPlan2Id] = useState(comparablePlans[1]?.id || "");
  const [plan3Id, setPlan3Id] = useState("");
  const [age, setAge] = useState(30);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [term, setTerm] = useState(20);

  const selectedIds = [plan1Id, plan2Id, plan3Id].filter(Boolean);
  const plans = useMemo(
    () => selectedIds.map((id) => comparablePlans.find((p) => p.id === id)).filter(Boolean),
    [plan1Id, plan2Id, plan3Id],
  );

  const results = useMemo(() => {
    return plans.map((plan) => {
      const prem = calculatePremium(plan, age, sumAssured, term, "yearly");
      const mat = calculateMaturity(plan, sumAssured, term);
      const totalPaid = prem ? calculateTotalPremiumsPaid(prem.annualPremium, term) : 0;
      const irr = prem && mat ? calculateIRR(prem.annualPremium, mat.maturityValue, term) : null;
      return { plan, prem, mat, totalPaid, irr };
    });
  }, [plans, age, sumAssured, term]);

  useEffect(() => {
    if (results.length > 0) trackCalculation('plan-comparison', { plans: results.map(r => r.plan.name).join(', ') });
  }, [results]);

  const shareText = results.length > 0
    ? `LIC Plan Comparison\n${results.map((r) => `${r.plan.name}: Premium ${formatINR(r.prem?.annualPremium || 0)}/yr, Maturity ${formatINR(r.mat.maturityValue)}, IRR ${r.irr ? formatPercent(r.irr) : "N/A"}`).join("\n")}\n\nCompared on DoAide InsureKit — insure.doaide.com`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">LIC Plan Comparison</h1>
      <p className="text-white/40 text-sm mb-6">Compare 2-3 plans side by side</p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {[
            { val: plan1Id, set: setPlan1Id, label: "Plan 1" },
            { val: plan2Id, set: setPlan2Id, label: "Plan 2" },
            { val: plan3Id, set: setPlan3Id, label: "Plan 3 (optional)" },
          ].map(({ val, set, label }) => (
            <div key={label}>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">{label}</label>
              <select className="select-field" value={val} onChange={(e) => set(e.target.value)}>
                {label.includes("optional") && <option value="">— none —</option>}
                {comparablePlans.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.tableNo})</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <input type="number" className="input-field" min={10} max={35} value={term} onChange={(e) => setTerm(Number(e.target.value))} />
          </div>
        </div>
      </div>

      {results.length >= 2 && (
        <div className="animate-fade-up">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wide">Feature</th>
                  {results.map((r) => (
                    <th key={r.plan.id} className="text-right py-3 px-3 text-white font-semibold">
                      {r.plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-white/70">
                <Row label="Table No." values={results.map((r) => String(r.plan.tableNo))} />
                <Row label="Type" values={results.map((r) => r.plan.type.replace("_", " "))} />
                <Row
                  label="Annual Premium"
                  values={results.map((r) => r.prem ? formatINR(r.prem.annualPremium) : "N/A")}
                />
                <Row
                  label="Total Premiums"
                  values={results.map((r) => formatINR(r.totalPaid))}
                />
                <Row
                  label="Maturity Value"
                  values={results.map((r) => formatINR(r.mat.maturityValue))}
                  highlight
                />
                <Row
                  label="SRB Rate"
                  values={results.map((r) => r.plan.isNonPar ? "Non-par" : `₹${r.mat.srbRate}/1000`)}
                />
                <Row
                  label="Profit"
                  values={results.map((r) => formatINR(r.mat.maturityValue - r.totalPaid))}
                />
                <Row
                  label="IRR"
                  values={results.map((r) => r.irr !== null ? formatPercent(r.irr) : "N/A")}
                  highlight
                />
                <Row
                  label="FAB Rate"
                  values={results.map((r) => r.mat.fabRate > 0 ? `₹${r.mat.fabRate}/1000` : "—")}
                />
                <Row
                  label="Death Benefit"
                  values={results.map((r) =>
                    r.plan.deathBenefit || (r.plan.type === "term" ? formatINR(sumAssured) : `SA + SRB (min ${formatINR(sumAssured)})`)
                  )}
                />
                <Row
                  label="PPT"
                  values={results.map((r) => r.plan.ppt === "limited" ? "Limited" : "Full term")}
                />
                <Row
                  label="Loan Available"
                  values={results.map((r) => r.plan.type === "term" ? "No" : "Yes (after 3 yrs)")}
                />
                <Row
                  label="Tax Benefit"
                  values={results.map(() => "80C + 10(10D)")}
                />
              </tbody>
            </table>
          </div>

          {results.length >= 2 && (() => {
            const best = [...results].sort((a, b) => {
              const irrA = a.irr ?? -1;
              const irrB = b.irr ?? -1;
              return irrB - irrA;
            })[0];
            return best.irr ? (
              <div className="panel-inner p-4 mt-4 border-l-4 border-l-signal">
                <div className="text-xs text-signal font-medium uppercase tracking-wide mb-1">Recommended</div>
                <div className="text-sm text-white/70">
                  <strong className="text-white">{best.plan.name}</strong> offers the best IRR of{" "}
                  <strong className="text-signal">{formatPercent(best.irr)}</strong> among the compared plans,
                  with a maturity value of <strong className="text-signal">{formatINR(best.mat.maturityValue)}</strong>.
                </div>
              </div>
            ) : null;
          })()}

          <div className="mt-6">
            {results.map((r) => (
              <div key={r.plan.id} className="panel-inner p-3 mb-2">
                <div className="text-xs text-signal font-medium">{r.plan.name}</div>
                <div className="text-xs text-white/40 mt-0.5">{r.plan.description}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <PrintButton />
            <ShareButtons text={shareText} />
          </div>
        </div>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}

function Row({ label, values, highlight = false }) {
  return (
    <tr className="border-b border-white/5">
      <td className="py-2.5 px-3 text-white/40 text-xs uppercase tracking-wide">{label}</td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`py-2.5 px-3 text-right font-medium ${highlight ? "text-signal" : "text-white/70"}`}
        >
          {v}
        </td>
      ))}
    </tr>
  );
}
