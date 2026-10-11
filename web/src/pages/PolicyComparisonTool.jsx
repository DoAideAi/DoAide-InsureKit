import { useState, useMemo } from "react";
import { formatINR } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";

const HOW_IT_WORKS = [
  { title: "Add policies", desc: "Enter details of 2-3 policies to compare" },
  { title: "See side by side", desc: "All features compared in one view" },
  { title: "Share or print", desc: "Send comparison to clients via WhatsApp" },
];

const FAQ_ITEMS = [
  { q: "Can I compare policies from different insurers?", a: "Yes! This tool is designed to compare any insurance policies side by side — LIC vs private, term vs endowment, or even policies from the same insurer with different parameters." },
  { q: "How do I decide which policy is better?", a: "Look at three key factors: (1) Premium-to-cover ratio — how much protection per rupee, (2) Claim settlement ratio of the insurer, (3) Additional benefits like riders, bonus, and survival benefits. The cheapest premium isn't always the best choice." },
  { q: "What is the effective cost of a policy?", a: "Effective cost = Total premiums paid over the term minus maturity benefit (if any). For term plans, the effective cost equals total premiums (no maturity). For endowment plans, it's the difference between premiums paid and maturity received." },
  { q: "Should I compare only within the same insurance type?", a: "Not necessarily. Comparing term vs endowment helps clients understand the protection-vs-savings trade-off. However, for a direct premium comparison, it's most useful to compare within the same type." },
];

const INSURANCE_TYPES = [
  "Term Insurance",
  "Endowment Plan",
  "Whole Life Plan",
  "Money Back Plan",
  "ULIP",
  "Health Insurance",
  "Child Plan",
  "Pension Plan",
];

const PAYMENT_MODES = ["Yearly", "Half-Yearly", "Quarterly", "Monthly"];

function emptyPolicy(label) {
  return {
    label,
    name: "",
    insurer: "",
    type: "Term Insurance",
    sumAssured: "",
    annualPremium: "",
    term: "",
    paymentMode: "Yearly",
    maturityBenefit: "",
    deathBenefit: "",
    riders: "",
    csr: "",
    notes: "",
  };
}

function PolicyForm({ policy, onChange }) {
  const set = (field, value) => onChange({ ...policy, [field]: value });

  return (
    <div className="space-y-3">
      <div className="text-xs text-signal font-medium uppercase tracking-wide">{policy.label}</div>
      <div>
        <label className="block text-xs text-white/40 mb-1">Policy / Plan Name</label>
        <input type="text" value={policy.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. LIC Tech Term 854" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20" />
      </div>
      <div>
        <label className="block text-xs text-white/40 mb-1">Insurer</label>
        <input type="text" value={policy.insurer} onChange={(e) => set("insurer", e.target.value)} placeholder="e.g. LIC of India" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-white/40 mb-1">Type</label>
          <select value={policy.type} onChange={(e) => set("type", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
            {INSURANCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">Payment Mode</label>
          <select value={policy.paymentMode} onChange={(e) => set("paymentMode", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
            {PAYMENT_MODES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-white/40 mb-1">Sum Assured (₹)</label>
          <input type="number" value={policy.sumAssured} onChange={(e) => set("sumAssured", e.target.value)} placeholder="e.g. 10000000" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20" />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">Annual Premium (₹)</label>
          <input type="number" value={policy.annualPremium} onChange={(e) => set("annualPremium", e.target.value)} placeholder="e.g. 12000" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-white/40 mb-1">Policy Term (years)</label>
          <input type="number" value={policy.term} onChange={(e) => set("term", e.target.value)} placeholder="e.g. 30" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20" />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">Claim Settlement Ratio (%)</label>
          <input type="text" value={policy.csr} onChange={(e) => set("csr", e.target.value)} placeholder="e.g. 98.6" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-white/40 mb-1">Death Benefit (₹)</label>
          <input type="number" value={policy.deathBenefit} onChange={(e) => set("deathBenefit", e.target.value)} placeholder="e.g. 10000000" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20" />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">Maturity Benefit (₹)</label>
          <input type="number" value={policy.maturityBenefit} onChange={(e) => set("maturityBenefit", e.target.value)} placeholder="e.g. 0 for term" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-white/40 mb-1">Riders / Add-ons</label>
        <input type="text" value={policy.riders} onChange={(e) => set("riders", e.target.value)} placeholder="e.g. ADB, Critical Illness" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20" />
      </div>
      <div>
        <label className="block text-xs text-white/40 mb-1">Notes</label>
        <input type="text" value={policy.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Any additional details" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20" />
      </div>
    </div>
  );
}

function ComparisonRow({ label, values, format = "text", highlight = "none" }) {
  const nums = highlight !== "none" && values.map(v => parseFloat(v) || 0);
  const best = highlight === "low" ? Math.min(...nums.filter(n => n > 0)) : highlight === "high" ? Math.max(...nums.filter(n => n > 0)) : null;

  return (
    <tr className="border-t border-white/5">
      <td className="py-2.5 px-3 text-white/80 font-medium text-sm">{label}</td>
      {values.map((v, i) => {
        const isBest = best !== null && nums[i] === best && nums[i] > 0;
        const display = format === "inr" && v ? formatINR(+v) : v || "—";
        return (
          <td key={i} className={`py-2.5 px-3 text-center text-sm ${isBest ? "text-signal font-semibold" : "text-white/60"}`}>
            {display}
          </td>
        );
      })}
    </tr>
  );
}

export default function PolicyComparisonTool() {
  const [count, setCount] = useState(2);
  const [policies, setPolicies] = useState([
    emptyPolicy("Policy A"),
    emptyPolicy("Policy B"),
    emptyPolicy("Policy C"),
  ]);

  const updatePolicy = (idx, updated) => {
    const next = [...policies];
    next[idx] = updated;
    setPolicies(next);
  };

  const active = policies.slice(0, count);
  const hasData = active.some(p => p.name || p.annualPremium);

  const totalPremiums = active.map(p => {
    const annual = parseFloat(p.annualPremium) || 0;
    const term = parseFloat(p.term) || 0;
    return annual * term;
  });

  const coverPerRupee = active.map(p => {
    const sa = parseFloat(p.sumAssured) || 0;
    const premium = parseFloat(p.annualPremium) || 0;
    return premium > 0 ? Math.round(sa / premium) : 0;
  });

  const shareText = hasData
    ? `Policy Comparison\n${active.map((p, i) => `${p.label}: ${p.name || "—"} | Premium: ${p.annualPremium ? formatINR(+p.annualPremium) : "—"}/yr | Cover: ${p.sumAssured ? formatINR(+p.sumAssured) : "—"}`).join("\n")}\n\nCompared on InsureKit — insure.doaide.com/tools/policy-comparison`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Policy Comparison Tool</h1>
      <p className="text-white/40 text-sm mb-6">Compare 2-3 insurance policies side by side — any insurer, any type</p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs text-white/40">Compare:</span>
        {[2, 3].map(n => (
          <button
            key={n}
            onClick={() => setCount(n)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${count === n ? "bg-signal text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}
          >
            {n} Policies
          </button>
        ))}
      </div>

      <div className={`grid gap-6 mb-8 ${count === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
        {active.map((p, i) => (
          <div key={i} className="panel p-4">
            <PolicyForm policy={p} onChange={(updated) => updatePolicy(i, updated)} />
          </div>
        ))}
      </div>

      {hasData && (
        <>
          <h2 className="text-lg font-semibold text-white mb-3">Side-by-Side Comparison</h2>
          <div className="panel overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-3 text-white/50 text-xs uppercase">Feature</th>
                    {active.map((p, i) => (
                      <th key={i} className="text-center py-3 px-3 text-white/50 text-xs uppercase">{p.name || p.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <ComparisonRow label="Insurer" values={active.map(p => p.insurer)} />
                  <ComparisonRow label="Type" values={active.map(p => p.type)} />
                  <ComparisonRow label="Sum Assured" values={active.map(p => p.sumAssured)} format="inr" highlight="high" />
                  <ComparisonRow label="Annual Premium" values={active.map(p => p.annualPremium)} format="inr" highlight="low" />
                  <ComparisonRow label="Policy Term" values={active.map(p => p.term ? `${p.term} years` : "")} />
                  <ComparisonRow label="Payment Mode" values={active.map(p => p.paymentMode)} />
                  <ComparisonRow label="Death Benefit" values={active.map(p => p.deathBenefit)} format="inr" highlight="high" />
                  <ComparisonRow label="Maturity Benefit" values={active.map(p => p.maturityBenefit)} format="inr" highlight="high" />
                  <ComparisonRow label="Claim Settlement" values={active.map(p => p.csr ? `${p.csr}%` : "")} highlight="high" />
                  <ComparisonRow label="Riders" values={active.map(p => p.riders)} />
                  <ComparisonRow label="Total Premium Paid" values={totalPremiums.map(t => t > 0 ? String(t) : "")} format="inr" highlight="low" />
                  <ComparisonRow label="Cover per ₹1 Premium" values={coverPerRupee.map(c => c > 0 ? `₹${c}` : "")} highlight="high" />
                  {active.some(p => p.notes) && <ComparisonRow label="Notes" values={active.map(p => p.notes)} />}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap mb-8">
            <ShareButtons text={shareText} />
            <PrintButton />
          </div>
        </>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
