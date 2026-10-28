import { useState, useMemo, useEffect } from "react";
import SEOHead from "../components/SEOHead";
import FAQ from "../components/FAQ";
import WhatsAppShare from "../components/WhatsAppShare";
import { TERM_PLANS, estimateTermPremium } from "../data/termInsuranceData";
import { trackCalculation } from "../lib/analytics";

const FAQ_ITEMS = [
  {
    q: "How is the term insurance premium calculated here?",
    a: "Premiums shown are indicative estimates based on publicly available rate cards. Actual premiums may vary based on medical history, occupation, and insurer underwriting. Always get an official quote from the insurer.",
  },
  {
    q: "Which term insurance plan is best in India?",
    a: "It depends on your priorities. LIC Jeevan Amar offers the trust of a government-backed insurer. Max Life has the highest claim settlement ratio (99.51%). HDFC and ICICI offer the lowest premiums. Tata AIA provides comprehensive riders.",
  },
  {
    q: "How much term insurance cover do I need?",
    a: "A good rule of thumb is 10-15 times your annual income. A 30-year-old earning ₹10 lakh should aim for ₹1-1.5 crore cover. Use our Insurance Needs Calculator for a more accurate estimate.",
  },
  {
    q: "Is LIC better than private insurers for term insurance?",
    a: "LIC has government backing and a 98.74% claim settlement ratio. Top private insurers like Max Life (99.51%) and Tata AIA (99.06%) actually have higher individual CSR. All insurers are regulated by IRDAI.",
  },
  {
    q: "Does smoking affect term insurance premium?",
    a: "Yes, significantly. Smokers typically pay 30-50% more in premiums compared to non-smokers. If you quit smoking for 12+ months, some insurers may offer non-smoker rates.",
  },
];

function fmt(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function TermInsuranceCompare() {
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState("male");
  const [isSmoker, setIsSmoker] = useState(false);
  const [coverAmount, setCoverAmount] = useState(10000000);
  const [term, setTerm] = useState(30);
  const [sortBy, setSortBy] = useState("premium");

  useEffect(() => {
    document.title = "Term Insurance Comparison 2026 — Compare Top 5 Plans | InsureKit";
  }, []);

  const results = useMemo(() => {
    return TERM_PLANS.map((plan) => ({
      ...plan,
      premium: estimateTermPremium({
        planId: plan.id,
        age,
        gender,
        isSmoker,
        coverAmount,
        term,
      }),
    })).sort((a, b) => {
      if (sortBy === "premium") return (a.premium || Infinity) - (b.premium || Infinity);
      if (sortBy === "csr") return b.claimSettlementRatio - a.claimSettlementRatio;
      return 0;
    });
  }, [age, gender, isSmoker, coverAmount, term, sortBy]);

  useEffect(() => {
    if (results.length > 0) trackCalculation('term-insurance-compare', { age, gender, coverAmount, term });
  }, [results, age, gender, coverAmount, term]);

  const cheapest = results[0]?.premium;

  const shareText = `Compare term insurance plans on InsureKit:\n\n${results
    .map((r) => `${r.insurer}: ${r.premium ? fmt(r.premium) + "/yr" : "N/A"} (CSR: ${r.claimSettlementRatio}%)`)
    .join("\n")}\n\nAge: ${age}, Cover: ${fmt(coverAmount)}, Term: ${term} years\n\nFree comparison: https://insure.doaide.com/tools/term-insurance-compare`;

  return (
    <div className="animate-fade-up">
      <SEOHead
        title="Term Insurance Comparison 2026 — Compare Top 5 Plans | InsureKit"
        description="Compare term insurance plans across LIC, HDFC Life, ICICI Prudential, Max Life, and Tata AIA. Free premium comparison with claim settlement ratios."
        canonical="https://insure.doaide.com/tools/term-insurance-compare"
      />

      <h1 className="text-2xl font-bold text-white mb-1">Term Insurance Comparison</h1>
      <p className="text-white/40 text-sm mb-6">
        Compare term plans across LIC, HDFC Life, ICICI Pru, Max Life &amp; Tata AIA — no login required.
      </p>

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Age</label>
            <input
              type="number"
              min={18}
              max={65}
              value={age}
              onChange={(e) => setAge(+e.target.value)}
              className="input-field"
              style={{ fontSize: "16px", minHeight: "44px" }}
            />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="select-field" style={{ minHeight: "44px" }}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Smoker?</label>
            <select value={isSmoker ? "yes" : "no"} onChange={(e) => setIsSmoker(e.target.value === "yes")} className="select-field" style={{ minHeight: "44px" }}>
              <option value="no">Non-Smoker</option>
              <option value="yes">Smoker</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Cover (₹)</label>
            <select value={coverAmount} onChange={(e) => setCoverAmount(+e.target.value)} className="select-field" style={{ minHeight: "44px" }}>
              <option value={2500000}>₹25 Lakh</option>
              <option value={5000000}>₹50 Lakh</option>
              <option value={7500000}>₹75 Lakh</option>
              <option value={10000000}>₹1 Crore</option>
              <option value={15000000}>₹1.5 Crore</option>
              <option value={20000000}>₹2 Crore</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Term (yrs)</label>
            <select value={term} onChange={(e) => setTerm(+e.target.value)} className="select-field" style={{ minHeight: "44px" }}>
              {[10, 15, 20, 25, 30, 35, 40].map((t) => (
                <option key={t} value={t}>{t} years</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white">Comparison Results</h2>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select-field w-auto text-sm" style={{ minHeight: "36px", padding: "6px 32px 6px 10px" }}>
          <option value="premium">Sort by Premium</option>
          <option value="csr">Sort by Claim Ratio</option>
        </select>
      </div>

      <div className="text-xs text-amber-400/80 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 mb-4">
        ⚠ Premiums shown are <strong>indicative estimates</strong> for comparison purposes. Get official quotes from each insurer for exact premiums.
      </div>

      <div className="space-y-4 mb-6">
        {results.map((plan, idx) => (
          <div key={plan.id} className="panel p-5">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-white/30 font-mono">#{idx + 1}</span>
                  <h3 className="text-base font-bold text-white">{plan.insurer}</h3>
                  {plan.premium === cheapest && (
                    <span className="text-xs bg-signal/20 text-signal px-2 py-0.5 rounded-full">Lowest Premium</span>
                  )}
                  {plan.claimSettlementRatio >= 99 && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Top CSR</span>
                  )}
                </div>
                <div className="text-sm text-white/50 mb-3">{plan.planName}</div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="text-xs text-white/30 uppercase">Annual Premium</div>
                    <div className="text-xl font-bold text-signal">
                      {plan.premium ? `${fmt(plan.premium)}/yr` : "N/A"}
                    </div>
                    {plan.premium && (
                      <div className="text-xs text-white/30">
                        {fmt(Math.round(plan.premium / 12))}/month
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs text-white/30 uppercase">Claim Settlement</div>
                    <div className={`text-xl font-bold ${plan.claimSettlementRatio >= 99 ? "text-green-400" : plan.claimSettlementRatio >= 98 ? "text-signal" : "text-white"}`}>
                      {plan.claimSettlementRatio}%
                    </div>
                    <div className="text-xs text-white/30">Individual CSR 2023-24</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-xs text-white/30 uppercase mb-1">Key Features</div>
                  <ul className="text-sm text-white/60 space-y-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-signal mt-0.5 text-xs">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs text-white/30 uppercase mb-1">Available Riders</div>
                  <div className="flex flex-wrap gap-1.5">
                    {plan.riders.map((r) => (
                      <span key={r} className="text-xs bg-white/5 border border-white/10 rounded px-2 py-0.5 text-white/50">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <WhatsAppShare text={shareText} />
      </div>

      <div className="panel p-5 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">How to Choose the Right Term Plan</h2>
        <div className="space-y-3 text-sm text-white/60">
          <div className="flex items-start gap-2">
            <span className="text-signal font-bold">1.</span>
            <div><strong className="text-white/80">Coverage Amount:</strong> Get at least 10-15× your annual income. Factor in loans, children's education, and spouse's needs.</div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-signal font-bold">2.</span>
            <div><strong className="text-white/80">Claim Settlement Ratio:</strong> Choose insurers with CSR above 98%. LIC, Max Life, and Tata AIA lead this metric.</div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-signal font-bold">3.</span>
            <div><strong className="text-white/80">Riders:</strong> Add Critical Illness and Accidental Death riders for comprehensive protection. They cost 10-15% extra.</div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-signal font-bold">4.</span>
            <div><strong className="text-white/80">Policy Term:</strong> Cover yourself until at least age 60-65. A 30-year term for a 30-year-old is ideal.</div>
          </div>
        </div>
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
