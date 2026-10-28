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
  { title: "Enter client details", desc: "Set client name and age" },
  { title: "Add policies", desc: "Pick 2-5 LIC plans with different SA and terms" },
  { title: "View portfolio", desc: "See combined coverage, premium, and maturity analysis" },
];

const FAQ_ITEMS = [
  { q: "What is a Self Mix presentation?", a: "A Self Mix shows multiple LIC policies for the same person — combining endowment, money-back, and term plans to create an optimal portfolio with the right mix of savings, income, and protection." },
  { q: "Why recommend multiple policies?", a: "Different plans serve different goals: Jeevan Anand for lifelong cover, Money Back for periodic income, Term for high protection at low cost. A mix covers all financial goals better than a single plan." },
  { q: "How many policies can I add?", a: "You can add 2 to 5 policies in a Self Mix presentation. This covers most portfolio scenarios — from a basic endowment + term combo to a comprehensive multi-plan strategy." },
];

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

const emptyPolicy = () => ({ planId: presentablePlans[0]?.id || "", sumAssured: 1000000, term: 20 });

export default function SelfMixPresentation() {
  const [clientName, setClientName] = useState("");
  const [agentName, setAgentName] = useState("");
  const [age, setAge] = useState(30);
  const [policies, setPolicies] = useState([emptyPolicy(), emptyPolicy()]);

  const updatePolicy = (i, field, value) => {
    setPolicies((prev) => prev.map((p, j) => (j === i ? { ...p, [field]: value } : p)));
  };

  const addPolicy = () => {
    if (policies.length < 5) setPolicies((prev) => [...prev, emptyPolicy()]);
  };

  const removePolicy = (i) => {
    if (policies.length > 2) setPolicies((prev) => prev.filter((_, j) => j !== i));
  };

  const results = useMemo(() => {
    return policies.map((pol) => {
      const plan = presentablePlans.find((p) => p.id === pol.planId);
      if (!plan) return null;
      const premium = calculatePremium(plan, age, pol.sumAssured, pol.term, "yearly", true);
      const maturity = calculateMaturity(plan, pol.sumAssured, pol.term);
      const ppt = typeof plan.ppt === "number" ? plan.ppt : pol.term;
      return { plan, premium, maturity, ppt };
    });
  }, [policies, age]);

  const totals = useMemo(() => {
    let totalSA = 0, totalAnnual = 0, totalPaid = 0, totalMaturity = 0;
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      if (!r || !r.premium) continue;
      totalSA += policies[i].sumAssured;
      totalAnnual += r.premium.annualPremium;
      totalPaid += r.premium.annualPremium * r.ppt;
      if (r.maturity?.maturityValue) totalMaturity += r.maturity.maturityValue;
    }
    return { totalSA, totalAnnual, totalPaid, totalMaturity };
  }, [results, policies]);

  useEffect(() => {
    if (results.some(r => r?.premium)) trackEvent('presentation:generate', { tool: 'self-mix', count: results.filter(r => r?.premium).length });
  }, [results]);

  const shareText = `📋 Self Mix — Portfolio Presentation\n${clientName ? `Client: ${clientName}, ` : ""}Age: ${age}\n\n${results.map((r, i) => r?.premium ? `${i + 1}. ${r.plan.name}: SA ${formatINR(policies[i].sumAssured)}, Premium ${formatINR(r.premium.annualPremium)}/yr` : "").filter(Boolean).join("\n")}\n\nTotal SA: ${formatINR(totals.totalSA)}\nTotal Premium: ${formatINR(totals.totalAnnual)}/yr\nEst. Maturity: ${formatLakh(totals.totalMaturity)}\n\n— DoAide InsureKit (insure.doaide.com)`;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Self Mix Presentation</h1>
      <p className="text-sm text-white/50 mb-6">
        Create a multi-plan portfolio for one client — combine endowment, money-back, and term plans for complete coverage.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 print:hidden">
        <div>
          <label className="block text-sm text-white/60 mb-1">Client Name</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Rajesh Kumar" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Client Age</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={age} onChange={(e) => setAge(Number(e.target.value))} min={0} max={65} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Agent Name</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={agentName} onChange={(e) => setAgentName(e.target.value)} placeholder="Your name" />
        </div>
      </div>

      <div className="space-y-4 mb-6 print:hidden">
        {policies.map((pol, i) => {
          const plan = presentablePlans.find((p) => p.id === pol.planId);
          const terms = plan ? getAvailableTerms(plan, age) : [];
          return (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Policy {i + 1}</h3>
                {policies.length > 2 && (
                  <button onClick={() => removePolicy(i)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-white/50 mb-1">Plan</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" value={pol.planId} onChange={(e) => updatePolicy(i, "planId", e.target.value)}>
                    {presentablePlans.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.tableNo})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Sum Assured (₹)</label>
                  <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" value={pol.sumAssured} onChange={(e) => updatePolicy(i, "sumAssured", Number(e.target.value))} min={100000} step={100000} />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Term</label>
                  {terms.length > 0 ? (
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" value={pol.term} onChange={(e) => updatePolicy(i, "term", Number(e.target.value))}>
                      {terms.map((t) => <option key={t} value={t}>{t} years</option>)}
                    </select>
                  ) : (
                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" value={pol.term} onChange={(e) => updatePolicy(i, "term", Number(e.target.value))} min={5} max={40} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {policies.length < 5 && (
          <button onClick={addPolicy} className="w-full py-2 border border-dashed border-white/20 rounded-xl text-sm text-white/50 hover:text-white hover:border-white/40 transition">+ Add Another Policy</button>
        )}
      </div>

      <div className="presentation-output">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4 print:border-none print:p-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs text-signal font-medium uppercase tracking-wide mb-1">Self Mix Portfolio</div>
              <h2 className="text-xl font-bold text-white print:text-black">
                {clientName || "Client"}'s Insurance Portfolio
              </h2>
              <div className="text-sm text-white/50">Age {age} · {policies.length} Policies</div>
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
              <div className="text-xs text-white/40">Total Investment</div>
              <div className="text-lg font-bold text-white">{formatLakh(totals.totalPaid)}</div>
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
                  <th className="text-left py-2 text-white/60 px-2">#</th>
                  <th className="text-left py-2 text-white/60 px-2">Plan</th>
                  <th className="text-right py-2 text-white/60 px-2">SA</th>
                  <th className="text-right py-2 text-white/60 px-2">Term</th>
                  <th className="text-right py-2 text-white/60 px-2">Annual Premium</th>
                  <th className="text-right py-2 text-white/60 px-2">Est. Maturity</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2 px-2 text-white/40">{i + 1}</td>
                    <td className="py-2 px-2 text-white font-medium">{r?.plan.name || "—"}</td>
                    <td className="py-2 px-2 text-right">{formatINR(policies[i].sumAssured)}</td>
                    <td className="py-2 px-2 text-right">{policies[i].term} yr</td>
                    <td className="py-2 px-2 text-right">{r?.premium ? formatINR(r.premium.annualPremium) : "—"}</td>
                    <td className="py-2 px-2 text-right">{r?.maturity?.maturityValue ? formatLakh(r.maturity.maturityValue) : "—"}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-white/20 font-bold">
                  <td className="py-2 px-2" colSpan={2}>Total</td>
                  <td className="py-2 px-2 text-right text-signal">{formatINR(totals.totalSA)}</td>
                  <td className="py-2 px-2" />
                  <td className="py-2 px-2 text-right text-signal">{formatINR(totals.totalAnnual)}</td>
                  <td className="py-2 px-2 text-right text-signal">{formatLakh(totals.totalMaturity)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {results.some((r) => r?.plan) && (
            <div className="space-y-4 mb-6">
              {results.map((r, i) => {
                if (!r?.plan || !r.premium) return null;
                const totalPaid = r.premium.annualPremium * r.ppt;
                return (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-white mb-2">{i + 1}. {r.plan.name} (Table {r.plan.tableNo})</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div><span className="text-white/40">Type:</span> <span className="text-white/70">{r.plan.type}</span></div>
                      <div><span className="text-white/40">Premium:</span> <span className="text-white/70">{formatINR(r.premium.annualPremium)}/yr</span></div>
                      <div><span className="text-white/40">Total Paid:</span> <span className="text-white/70">{formatLakh(totalPaid)}</span></div>
                      <div><span className="text-white/40">Death Benefit:</span> <span className="text-white/70">SA + Bonus</span></div>
                    </div>
                    {r.plan.features && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {r.plan.features.slice(0, 3).map((f, j) => (
                          <span key={j} className="text-[10px] bg-signal/10 text-signal/80 px-2 py-0.5 rounded-full">{f}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {totals.totalMaturity > 0 && totals.totalPaid > 0 && (
            <div className="bg-signal/10 border border-signal/30 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-semibold text-white mb-2">Portfolio Analysis</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-white/40 text-xs">Total Returns</div>
                  <div className="text-white font-semibold">{((totals.totalMaturity / totals.totalPaid - 1) * 100).toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs">Monthly Outgo</div>
                  <div className="text-white font-semibold">{formatINR(Math.round(totals.totalAnnual / 12))}</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs">Coverage Ratio</div>
                  <div className="text-white font-semibold">{(totals.totalSA / totals.totalAnnual).toFixed(1)}x premium</div>
                </div>
              </div>
            </div>
          )}

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
