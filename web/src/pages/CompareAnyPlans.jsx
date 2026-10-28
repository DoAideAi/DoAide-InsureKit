import { useState, useMemo, useEffect } from "react";
import { LIC_PLANS, PLAN_TYPES, getSRBRate } from "../data/licPlans";
import { calculatePremium } from "../utils/calcPremium";
import { calculateMaturity, calculateTotalPremiumsPaid, calculateIRR } from "../utils/calcMaturity";
import { formatINR, formatPercent } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import { trackCalculation } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Pick any 2 plans", desc: "Choose from all 24+ LIC plans" },
  { title: "Set individual params", desc: "Different age, SA, and term for each plan" },
  { title: "Compare everything", desc: "Premium, maturity, IRR, features side by side" },
];

const FAQ_ITEMS = [
  { q: "How is this different from Plan Comparison?", a: "This tool lets you set different parameters (age, SA, term) for each plan. The standard comparison uses the same parameters for all plans. Use this when comparing plans for different people or different SA amounts." },
  { q: "Can I compare term and endowment plans?", a: "Yes! You can compare any two plans. For term plans, maturity value will be zero (pure protection), but you can see the premium difference clearly." },
  { q: "What does IRR mean here?", a: "IRR (Internal Rate of Return) measures the effective annual return. Higher IRR = better returns on premiums paid. Term plans have no IRR since there's no maturity benefit." },
];

const allPlans = LIC_PLANS.filter(
  (p) => p.type !== PLAN_TYPES.GOVT && Object.keys(p.premiumRates).length > 0,
);

function PlanColumn({ label, planId, setPlanId, age, setAge, sumAssured, setSumAssured, term, setTerm }) {
  return (
    <div className="space-y-3">
      <div className="text-xs text-signal font-medium uppercase tracking-wide">{label}</div>
      <div>
        <label className="block text-xs text-white/40 mb-1">Plan</label>
        <select className="select-field text-sm" value={planId} onChange={(e) => setPlanId(e.target.value)}>
          {allPlans.map((p) => (
            <option key={p.id} value={p.id}>{p.name} ({p.tableNo})</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs text-white/40 mb-1">Age</label>
        <input type="number" className="input-field text-sm" value={age} onChange={(e) => setAge(Number(e.target.value))} />
      </div>
      <div>
        <label className="block text-xs text-white/40 mb-1">Sum Assured (₹)</label>
        <input type="number" className="input-field text-sm" min={100000} step={100000} value={sumAssured} onChange={(e) => setSumAssured(Number(e.target.value))} />
      </div>
      <div>
        <label className="block text-xs text-white/40 mb-1">Term (years)</label>
        <input type="number" className="input-field text-sm" min={5} max={40} value={term} onChange={(e) => setTerm(Number(e.target.value))} />
      </div>
    </div>
  );
}

export default function CompareAnyPlans() {
  const [plan1Id, setPlan1Id] = useState(allPlans[0]?.id || "");
  const [age1, setAge1] = useState(30);
  const [sa1, setSa1] = useState(1000000);
  const [term1, setTerm1] = useState(20);

  const [plan2Id, setPlan2Id] = useState(allPlans[1]?.id || "");
  const [age2, setAge2] = useState(30);
  const [sa2, setSa2] = useState(1000000);
  const [term2, setTerm2] = useState(20);

  const compute = (planId, age, sa, term) => {
    const plan = allPlans.find((p) => p.id === planId);
    if (!plan) return null;
    const prem = calculatePremium(plan, age, sa, term, "yearly");
    const isTerm = plan.type === PLAN_TYPES.TERM;
    const mat = !isTerm ? calculateMaturity(plan, sa, term) : null;
    const totalPaid = prem ? calculateTotalPremiumsPaid(prem.annualPremium, term) : 0;
    const irr = prem && mat ? calculateIRR(prem.annualPremium, mat.maturityValue, term) : null;
    return { plan, prem, mat, totalPaid, irr, isTerm };
  };

  const r1 = useMemo(() => compute(plan1Id, age1, sa1, term1), [plan1Id, age1, sa1, term1]);
  const r2 = useMemo(() => compute(plan2Id, age2, sa2, term2), [plan2Id, age2, sa2, term2]);

  useEffect(() => {
    if (r1 && r2) trackCalculation('compare-any-plans');
  }, [r1, r2]);

  const shareText = r1 && r2
    ? `LIC Plan Comparison\n\n${r1.plan.name} vs ${r2.plan.name}\n\n${r1.plan.name}:\n  Premium: ${formatINR(r1.prem?.annualPremium || 0)}/yr\n  ${r1.mat ? `Maturity: ${formatINR(r1.mat.maturityValue)}` : "No maturity"}\n  ${r1.irr ? `IRR: ${formatPercent(r1.irr)}` : ""}\n\n${r2.plan.name}:\n  Premium: ${formatINR(r2.prem?.annualPremium || 0)}/yr\n  ${r2.mat ? `Maturity: ${formatINR(r2.mat.maturityValue)}` : "No maturity"}\n  ${r2.irr ? `IRR: ${formatPercent(r2.irr)}` : ""}\n\nCompared on DoAide InsureKit — insure.doaide.com`
    : "";

  const rows = r1 && r2 ? [
    { label: "Plan", v1: r1.plan.name, v2: r2.plan.name },
    { label: "Table No.", v1: String(r1.plan.tableNo), v2: String(r2.plan.tableNo) },
    { label: "Type", v1: r1.plan.type.replace("_", " "), v2: r2.plan.type.replace("_", " ") },
    { label: "Age", v1: String(age1), v2: String(age2) },
    { label: "Sum Assured", v1: formatINR(sa1), v2: formatINR(sa2) },
    { label: "Term", v1: `${term1} yr`, v2: `${term2} yr` },
    { label: "Annual Premium", v1: r1.prem ? formatINR(r1.prem.annualPremium) : "N/A", v2: r2.prem ? formatINR(r2.prem.annualPremium) : "N/A" },
    { label: "Total Premiums", v1: formatINR(r1.totalPaid), v2: formatINR(r2.totalPaid) },
    { label: "Maturity Value", v1: r1.mat ? formatINR(r1.mat.maturityValue) : "No maturity", v2: r2.mat ? formatINR(r2.mat.maturityValue) : "No maturity", highlight: true },
    { label: "Profit", v1: r1.mat ? formatINR(r1.mat.maturityValue - r1.totalPaid) : "—", v2: r2.mat ? formatINR(r2.mat.maturityValue - r2.totalPaid) : "—" },
    { label: "IRR", v1: r1.irr !== null ? formatPercent(r1.irr) : "N/A", v2: r2.irr !== null ? formatPercent(r2.irr) : "N/A", highlight: true },
    { label: "SRB Rate", v1: r1.mat ? `₹${r1.mat.srbRate}/1000` : "—", v2: r2.mat ? `₹${r2.mat.srbRate}/1000` : "—" },
    { label: "PPT", v1: r1.plan.ppt === "limited" ? "Limited" : "Full term", v2: r2.plan.ppt === "limited" ? "Limited" : "Full term" },
  ] : [];

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Compare Any Two Plans</h1>
      <p className="text-white/40 text-sm mb-6">
        Compare any two LIC plans with different parameters
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <PlanColumn label="Plan A" planId={plan1Id} setPlanId={setPlan1Id} age={age1} setAge={setAge1} sumAssured={sa1} setSumAssured={setSa1} term={term1} setTerm={setTerm1} />
          <PlanColumn label="Plan B" planId={plan2Id} setPlanId={setPlan2Id} age={age2} setAge={setAge2} sumAssured={sa2} setSumAssured={setSa2} term={term2} setTerm={setTerm2} />
        </div>
      </div>

      {rows.length > 0 && (
        <div className="animate-fade-up">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-3 text-white/40 font-medium text-xs uppercase tracking-wide">Feature</th>
                  <th className="text-right py-3 px-3 text-signal font-semibold">{r1?.plan.name}</th>
                  <th className="text-right py-3 px-3 text-signal font-semibold">{r2?.plan.name}</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-white/5">
                    <td className="py-2.5 px-3 text-white/40 text-xs uppercase tracking-wide">{row.label}</td>
                    <td className={`py-2.5 px-3 text-right font-medium ${row.highlight ? "text-signal" : ""}`}>{row.v1}</td>
                    <td className={`py-2.5 px-3 text-right font-medium ${row.highlight ? "text-signal" : ""}`}>{row.v2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[r1, r2].filter(Boolean).map((r) => (
              <div key={r.plan.id} className="panel-inner p-3">
                <div className="text-xs text-signal font-medium">{r.plan.name}</div>
                <div className="text-xs text-white/40 mt-0.5">{r.plan.description}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {r.plan.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">{f}</span>
                  ))}
                </div>
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
