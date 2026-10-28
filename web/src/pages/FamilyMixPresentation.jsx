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

const HOW_IT_WORKS = [
  { title: "Add family members", desc: "Enter name, age, and relation for each member" },
  { title: "Assign plans", desc: "Pick the right LIC plan for each person" },
  { title: "View family portfolio", desc: "See combined coverage and premium for the whole family" },
];

const FAQ_ITEMS = [
  { q: "What is a Family Mix presentation?", a: "A Family Mix shows LIC policies for different family members — self, spouse, and children — in one consolidated view. It helps agents present a complete family protection plan." },
  { q: "How many family members can I add?", a: "Up to 6 family members. This covers most family structures — self, spouse, 2-3 children, and optionally a parent." },
  { q: "Which plans are best for children?", a: "Jeevan Tarun (834), Amritbaal (774), and Children's Money Back (832) are popular child plans. They have lower entry ages and maturity aligned with education milestones." },
];

const RELATIONS = ["Self", "Spouse", "Son", "Daughter", "Father", "Mother"];

const presentablePlans = LIC_PLANS.filter(
  (p) => Object.keys(p.premiumRates).length > 0 || p.fixedPremium,
);

function getAvailableTerms(plan, age) {
  if (!plan || plan.fixedPremium) return [];
  const ages = Object.keys(plan.premiumRates).map(Number).sort((a, b) => a - b);
  let ageKey = ages[0];
  for (const a of ages) {
    if (a <= age) ageKey = a;
    else break;
  }
  return Object.keys(plan.premiumRates[ageKey] || {}).map(Number).sort((a, b) => a - b);
}

const emptyMember = (relation = "Self") => ({
  name: "",
  relation,
  age: relation === "Son" || relation === "Daughter" ? 10 : 30,
  planId: presentablePlans[0]?.id || "",
  sumAssured: 1000000,
  term: 20,
});

export default function FamilyMixPresentation() {
  const [agentName, setAgentName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [members, setMembers] = useState([
    emptyMember("Self"),
    emptyMember("Spouse"),
  ]);

  const updateMember = (i, field, value) => {
    setMembers((prev) => prev.map((m, j) => (j === i ? { ...m, [field]: value } : m)));
  };

  const addMember = () => {
    if (members.length < 6) {
      const usedRelations = members.map((m) => m.relation);
      const next = RELATIONS.find((r) => !usedRelations.includes(r)) || "Son";
      setMembers((prev) => [...prev, emptyMember(next)]);
    }
  };

  const removeMember = (i) => {
    if (members.length > 2) setMembers((prev) => prev.filter((_, j) => j !== i));
  };

  const results = useMemo(() => {
    return members.map((m) => {
      const plan = presentablePlans.find((p) => p.id === m.planId);
      if (!plan) return null;
      const premium = calculatePremium(plan, m.age, m.sumAssured, m.term, "yearly", true);
      const maturity = calculateMaturity(plan, m.sumAssured, m.term);
      const ppt = typeof plan.ppt === "number" ? plan.ppt : m.term;
      return { plan, premium, maturity, ppt };
    });
  }, [members]);

  const totals = useMemo(() => {
    let totalSA = 0, totalAnnual = 0, totalPaid = 0, totalMaturity = 0;
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      if (!r || !r.premium) continue;
      totalSA += members[i].sumAssured;
      totalAnnual += r.premium.annualPremium;
      totalPaid += r.premium.annualPremium * r.ppt;
      if (r.maturity?.maturityValue) totalMaturity += r.maturity.maturityValue;
    }
    return { totalSA, totalAnnual, totalPaid, totalMaturity };
  }, [results, members]);

  useEffect(() => {
    if (results.some(r => r?.premium)) trackEvent('presentation:generate', { tool: 'family-mix', count: members.length });
  }, [results, members.length]);

  const shareText = `👨‍👩‍👧‍👦 Family Insurance Plan — ${familyName || "Family"}\n\n${results.map((r, i) => r?.premium ? `${members[i].relation} (${members[i].name || "—"}, ${members[i].age}): ${r.plan.name} — SA ${formatINR(members[i].sumAssured)}, Premium ${formatINR(r.premium.annualPremium)}/yr` : "").filter(Boolean).join("\n")}\n\nTotal Premium: ${formatINR(totals.totalAnnual)}/yr\nTotal Coverage: ${formatINR(totals.totalSA)}\n\n— DoAide InsureKit (insure.doaide.com)`;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Family Mix Presentation</h1>
      <p className="text-sm text-white/50 mb-6">
        Create a complete family insurance portfolio — assign the right plan to each family member.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 print:hidden">
        <div>
          <label className="block text-sm text-white/60 mb-1">Family Name</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={familyName} onChange={(e) => setFamilyName(e.target.value)} placeholder="e.g. Kumar Family" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Agent Name</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={agentName} onChange={(e) => setAgentName(e.target.value)} placeholder="Your name" />
        </div>
      </div>

      <div className="space-y-4 mb-6 print:hidden">
        {members.map((m, i) => {
          const plan = presentablePlans.find((p) => p.id === m.planId);
          const terms = plan ? getAvailableTerms(plan, m.age) : [];
          return (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">{m.relation}</h3>
                {members.length > 2 && (
                  <button onClick={() => removeMember(i)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="block text-xs text-white/50 mb-1">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" value={m.name} onChange={(e) => updateMember(i, "name", e.target.value)} placeholder="Name" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Age</label>
                  <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" value={m.age} onChange={(e) => updateMember(i, "age", Number(e.target.value))} min={0} max={65} />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Relation</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" value={m.relation} onChange={(e) => updateMember(i, "relation", e.target.value)}>
                    {RELATIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-white/50 mb-1">Plan</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" value={m.planId} onChange={(e) => updateMember(i, "planId", e.target.value)}>
                    {presentablePlans.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.tableNo})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Sum Assured (₹)</label>
                  <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" value={m.sumAssured} onChange={(e) => updateMember(i, "sumAssured", Number(e.target.value))} min={100000} step={100000} />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Term</label>
                  {terms.length > 0 ? (
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" value={m.term} onChange={(e) => updateMember(i, "term", Number(e.target.value))}>
                      {terms.map((t) => <option key={t} value={t}>{t} years</option>)}
                    </select>
                  ) : (
                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" value={m.term} onChange={(e) => updateMember(i, "term", Number(e.target.value))} min={5} max={40} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {members.length < 6 && (
          <button onClick={addMember} className="w-full py-2 border border-dashed border-white/20 rounded-xl text-sm text-white/50 hover:text-white hover:border-white/40 transition">+ Add Family Member</button>
        )}
      </div>

      <div className="presentation-output">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4 print:border-none print:p-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs text-signal font-medium uppercase tracking-wide mb-1">Family Protection Plan</div>
              <h2 className="text-xl font-bold text-white print:text-black">
                {familyName || "Family"} Insurance Portfolio
              </h2>
              <div className="text-sm text-white/50">{members.length} Members · {members.filter((_, i) => results[i]?.premium).length} Policies</div>
            </div>
            <div className="text-right hidden print:block">
              <div className="text-xs text-gray-400">Generated on</div>
              <div className="text-sm">{new Date().toLocaleDateString("en-IN")}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-signal/10 border border-signal/30 rounded-lg p-3">
              <div className="text-xs text-white/40">Total Coverage</div>
              <div className="text-lg font-bold text-signal">{formatLakh(totals.totalSA)}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-xs text-white/40">Annual Premium</div>
              <div className="text-lg font-bold text-white">{formatINR(totals.totalAnnual)}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-xs text-white/40">Monthly Outgo</div>
              <div className="text-lg font-bold text-white">{formatINR(Math.round(totals.totalAnnual / 12))}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-xs text-white/40">Est. Total Maturity</div>
              <div className="text-lg font-bold text-white">{formatLakh(totals.totalMaturity)}</div>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-white/60 px-2">Member</th>
                  <th className="text-left py-2 text-white/60 px-2">Plan</th>
                  <th className="text-center py-2 text-white/60 px-2">Age</th>
                  <th className="text-right py-2 text-white/60 px-2">SA</th>
                  <th className="text-right py-2 text-white/60 px-2">Term</th>
                  <th className="text-right py-2 text-white/60 px-2">Premium/yr</th>
                  <th className="text-right py-2 text-white/60 px-2">Est. Maturity</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2 px-2">
                      <div className="text-white font-medium text-xs">{members[i].name || members[i].relation}</div>
                      <div className="text-white/40 text-[10px]">{members[i].relation}</div>
                    </td>
                    <td className="py-2 px-2 text-white/70 text-xs">{r?.plan.name || "—"}</td>
                    <td className="py-2 px-2 text-center text-white/70">{members[i].age}</td>
                    <td className="py-2 px-2 text-right">{formatINR(members[i].sumAssured)}</td>
                    <td className="py-2 px-2 text-right">{members[i].term} yr</td>
                    <td className="py-2 px-2 text-right">{r?.premium ? formatINR(r.premium.annualPremium) : "—"}</td>
                    <td className="py-2 px-2 text-right">{r?.maturity?.maturityValue ? formatLakh(r.maturity.maturityValue) : "—"}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-white/20 font-bold">
                  <td className="py-2 px-2" colSpan={3}>Family Total</td>
                  <td className="py-2 px-2 text-right text-signal">{formatINR(totals.totalSA)}</td>
                  <td className="py-2 px-2" />
                  <td className="py-2 px-2 text-right text-signal">{formatINR(totals.totalAnnual)}</td>
                  <td className="py-2 px-2 text-right text-signal">{formatLakh(totals.totalMaturity)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs text-white/30 border-t border-white/5 pt-4 print:text-gray-400">
            <p>Disclaimer: Premium and maturity figures are based on LIC's published rates and bonus history. Actual values may vary.</p>
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
