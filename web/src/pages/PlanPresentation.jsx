import { useState, useMemo, useEffect } from "react";
import { LIC_PLANS, MODE_LABELS } from "../data/licPlans";
import { calculatePremium } from "../utils/calcPremium";
import { calculateMaturity } from "../utils/calcMaturity";
import { formatINR, formatLakh } from "../utils/format";
import PrintButton from "../components/PrintButton";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackEvent } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Select plan", desc: "Choose any LIC plan from the list" },
  { title: "Set client details", desc: "Enter client's age, sum assured, and term" },
  { title: "Generate & share", desc: "Get a printable presentation to share with clients" },
];

const FAQ_ITEMS = [
  { q: "What is a plan presentation?", a: "A plan presentation is a printable summary of an LIC plan's premium, maturity benefits, death benefits and features — ready to share with your client during a meeting." },
  { q: "Can I share this with clients?", a: "Yes! Use the Print/PDF button to save as PDF and share via email or WhatsApp. The presentation is professionally formatted for client meetings." },
  { q: "Are the premium figures accurate?", a: "Premiums are based on LIC's published tabular rates. Always verify with LIC before finalising a proposal." },
];

const presentablePlans = LIC_PLANS.filter(
  (p) => Object.keys(p.premiumRates).length > 0 || p.fixedPremium,
);

function PremiumGrid({ plan, age, sumAssured }) {
  const ages = Object.keys(plan.premiumRates).map(Number).sort((a, b) => a - b);
  const allTerms = new Set();
  for (const a of ages) {
    for (const t of Object.keys(plan.premiumRates[a])) allTerms.add(Number(t));
  }
  const terms = [...allTerms].sort((a, b) => a - b);

  if (ages.length === 0 || terms.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse presentation-table">
        <thead>
          <tr>
            <th className="border border-white/10 px-2 py-1 bg-white/5 text-left">Age ↓ / Term →</th>
            {terms.map((t) => (
              <th key={t} className="border border-white/10 px-2 py-1 bg-white/5 text-right">{t} yr</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ages.map((a) => (
            <tr key={a} className={a === age ? "bg-signal/10" : ""}>
              <td className={`border border-white/10 px-2 py-1 font-medium ${a === age ? "text-signal" : ""}`}>
                {a} yrs
              </td>
              {terms.map((t) => {
                const rate = plan.premiumRates[a]?.[t];
                if (!rate) return <td key={t} className="border border-white/10 px-2 py-1 text-right text-white/20">—</td>;
                const annual = Math.round((rate - (sumAssured >= 1000000 ? 4 : sumAssured >= 500000 ? 2.5 : 0)) * (sumAssured / 1000));
                const isSelected = a === age;
                return (
                  <td key={t} className={`border border-white/10 px-2 py-1 text-right ${isSelected ? "font-semibold text-signal" : ""}`}>
                    {formatINR(annual)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[10px] text-white/30 mt-1">* Annual premium before GST. SA rebate applied for SA ≥ ₹5L.</p>
    </div>
  );
}

function BenefitSummary({ plan, age, sumAssured, term }) {
  const maturity = calculateMaturity(plan, sumAssured, term);
  const premium = calculatePremium(plan, age, sumAssured, term, "yearly", true);
  if (!premium) return null;

  const ppt = typeof plan.ppt === "number" ? plan.ppt : term;
  const totalPaid = premium.annualPremium * ppt;
  const deathBenefit = plan.deathBenefit || "Sum Assured + Accrued Bonus";

  return (
    <div className="grid grid-cols-2 gap-3 text-sm">
      <div className="panel p-3">
        <div className="text-white/40 text-xs mb-1">Annual Premium</div>
        <div className="text-lg font-bold text-white">{formatINR(premium.annualPremium)}</div>
        <div className="text-[10px] text-white/30">+ GST {formatINR(premium.gst)}</div>
      </div>
      <div className="panel p-3">
        <div className="text-white/40 text-xs mb-1">Total Premium Paid</div>
        <div className="text-lg font-bold text-white">{formatLakh(totalPaid)}</div>
        <div className="text-[10px] text-white/30">{ppt} years × {formatINR(premium.annualPremium)}</div>
      </div>
      {maturity && maturity.maturityValue > 0 && (
        <>
          <div className="panel p-3">
            <div className="text-white/40 text-xs mb-1">Estimated Maturity</div>
            <div className="text-lg font-bold text-signal">{formatLakh(maturity.maturityValue)}</div>
            <div className="text-[10px] text-white/30">SA + Bonus + FAB</div>
          </div>
          <div className="panel p-3">
            <div className="text-white/40 text-xs mb-1">Estimated Returns</div>
            <div className="text-lg font-bold text-white">
              {maturity.maturityValue > totalPaid ? `${((maturity.maturityValue / totalPaid - 1) * 100).toFixed(1)}%` : "—"}
            </div>
            <div className="text-[10px] text-white/30">Total gain on investment</div>
          </div>
        </>
      )}
      <div className="panel p-3 col-span-2">
        <div className="text-white/40 text-xs mb-1">Death Benefit</div>
        <div className="text-sm font-medium text-white">{deathBenefit}</div>
      </div>
    </div>
  );
}

function ModeComparison({ plan, age, sumAssured, term }) {
  const modes = ["yearly", "halfYearly", "quarterly", "monthly"];
  const results = modes.map((m) => ({
    mode: m,
    label: MODE_LABELS[m],
    result: calculatePremium(plan, age, sumAssured, term, m, true),
  })).filter((r) => r.result);

  if (results.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse presentation-table">
        <thead>
          <tr>
            <th className="border border-white/10 px-3 py-2 bg-white/5 text-left">Payment Mode</th>
            <th className="border border-white/10 px-3 py-2 bg-white/5 text-right">Premium</th>
            <th className="border border-white/10 px-3 py-2 bg-white/5 text-right">GST</th>
            <th className="border border-white/10 px-3 py-2 bg-white/5 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {results.map(({ mode, label, result }) => (
            <tr key={mode} className={mode === "yearly" ? "bg-signal/5" : ""}>
              <td className="border border-white/10 px-3 py-2">{label}</td>
              <td className="border border-white/10 px-3 py-2 text-right">{formatINR(result.basePremium)}</td>
              <td className="border border-white/10 px-3 py-2 text-right">{formatINR(result.gst)}</td>
              <td className="border border-white/10 px-3 py-2 text-right font-medium">{formatINR(result.totalPremium)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PlanPresentation() {
  const [planId, setPlanId] = useState(presentablePlans[0].id);
  const [age, setAge] = useState(30);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [term, setTerm] = useState(20);
  const [clientName, setClientName] = useState("");
  const [agentName, setAgentName] = useState("");

  const plan = useMemo(() => presentablePlans.find((p) => p.id === planId), [planId]);

  const availableTerms = useMemo(() => {
    if (!plan || plan.fixedPremium) return [];
    const ages = Object.keys(plan.premiumRates).map(Number).sort((a, b) => a - b);
    let ageKey = ages[0];
    for (const a of ages) {
      if (a <= age) ageKey = a;
      else break;
    }
    return Object.keys(plan.premiumRates[ageKey] || {}).map(Number).sort((a, b) => a - b);
  }, [plan, age]);

  const premium = useMemo(() => {
    if (!plan) return null;
    return calculatePremium(plan, age, sumAssured, term, "yearly", true);
  }, [plan, age, sumAssured, term]);

  useEffect(() => {
    if (premium) trackEvent('presentation:generate', { tool: 'plan-presentation', plan: plan?.name });
  }, [premium, plan?.name]);

  const shareText = premium
    ? `📋 LIC ${plan.name} (Table ${plan.tableNo}) — Plan Presentation\n\n${clientName ? `Client: ${clientName}\n` : ""}Age: ${age}, SA: ${formatINR(sumAssured)}, Term: ${term}yr\nAnnual Premium: ${formatINR(premium.totalPremium)} (incl. GST)\n\n✅ View full details: insure.doaide.com/plan-presentation${agentName ? `\n\n— ${agentName}` : ""}`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Plan Presentation Generator</h1>
      <p className="text-white/40 text-sm mb-6">
        Generate a professional, printable plan presentation to share with clients
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-4 mb-6 print:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/50 mb-1">LIC Plan</label>
            <select
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
              className="input w-full"
            >
              {presentablePlans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Table {p.tableNo})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Client Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min={plan?.minAge || 0}
              max={plan?.maxAge || 65}
              className="input w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Sum Assured (₹)</label>
            <input
              type="number"
              value={sumAssured}
              onChange={(e) => setSumAssured(Number(e.target.value))}
              min={plan?.minSA || 100000}
              step={100000}
              className="input w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Term (years)</label>
            {availableTerms.length > 0 ? (
              <select value={term} onChange={(e) => setTerm(Number(e.target.value))} className="input w-full">
                {availableTerms.map((t) => (
                  <option key={t} value={t}>{t} years</option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                min={plan?.minTerm || 5}
                max={plan?.maxTerm || 40}
                className="input w-full"
              />
            )}
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Client Name (optional)</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Rajesh Kumar"
              className="input w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Agent Name (optional)</label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="Your name"
              className="input w-full"
            />
          </div>
        </div>
      </div>

      {premium && plan && (
        <div className="presentation-output">
          <div className="panel p-6 mb-4 print:border-none print:shadow-none print:p-0">
            <div className="flex items-start justify-between mb-4 print:mb-6">
              <div>
                <div className="text-xs text-signal font-medium uppercase tracking-wide mb-1">Plan Presentation</div>
                <h2 className="text-xl font-bold text-white print:text-black">
                  LIC {plan.name}
                </h2>
                <div className="text-sm text-white/50 print:text-gray-500">
                  Table No. {plan.tableNo} · {plan.type === "endowment" ? "Endowment Plan" : plan.type === "money_back" ? "Money Back Plan" : plan.type === "term" ? "Term Insurance" : plan.type === "whole_life" ? "Whole Life" : plan.type === "child" ? "Child Plan" : "Life Insurance Plan"}
                </div>
              </div>
              <div className="text-right print:block hidden">
                <div className="text-xs text-gray-400">Generated on</div>
                <div className="text-sm">{new Date().toLocaleDateString("en-IN")}</div>
              </div>
            </div>

            {clientName && (
              <div className="mb-4 p-3 bg-signal/5 rounded-lg border border-signal/10 print:bg-blue-50 print:border-blue-200">
                <span className="text-xs text-white/40 print:text-gray-500">Prepared for: </span>
                <span className="text-sm font-medium text-white print:text-black">{clientName}</span>
                <span className="text-xs text-white/30 print:text-gray-400 ml-2">
                  Age {age} · SA {formatINR(sumAssured)} · Term {term} years
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wide print:text-gray-700">Plan Features</h3>
              <ul className="text-sm text-white/60 space-y-1 print:text-gray-600">
                {plan.features?.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-signal mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {plan.description && (
                <p className="text-xs text-white/40 mt-2 print:text-gray-500">{plan.description}</p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wide print:text-gray-700">Benefit Summary</h3>
              <BenefitSummary plan={plan} age={age} sumAssured={sumAssured} term={term} />
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wide print:text-gray-700">Payment Mode Comparison</h3>
              <ModeComparison plan={plan} age={age} sumAssured={sumAssured} term={term} />
            </div>

            {!plan.fixedPremium && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wide print:text-gray-700">Premium Table (All Ages & Terms)</h3>
                <PremiumGrid plan={plan} age={age} sumAssured={sumAssured} />
              </div>
            )}

            <div className="mb-4 text-xs text-white/30 border-t border-white/5 pt-4 print:text-gray-400 print:border-gray-200">
              <p>Disclaimer: Premium and benefit figures are based on LIC's published rates and bonus history. Actual values may vary. Please verify with LIC before making financial decisions.</p>
              {agentName && <p className="mt-2 font-medium text-white/50 print:text-gray-600">Presented by: {agentName}</p>}
              <p className="mt-1">Generated on DoAide InsureKit — insure.doaide.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <PrintButton />
            <ShareButtons text={shareText} />
          </div>
        </div>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
