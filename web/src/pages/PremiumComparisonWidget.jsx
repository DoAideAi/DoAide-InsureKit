import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import FAQ from "../components/FAQ";
import { LIC_PLANS } from "../data/licPlans";
import { calculatePremium } from "../utils/calcPremium";

const COMPARABLE_PLANS = LIC_PLANS.filter(
  (p) => Object.keys(p.premiumRates).length > 0 && !p.fixedPremium
);

function fmt(n) {
  if (!n && n !== 0) return "—";
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function PremiumComparisonWidget() {
  const [age, setAge] = useState(30);
  const [term, setTerm] = useState(20);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [mode, setMode] = useState("yearly");
  const [selectedPlans, setSelectedPlans] = useState([]);

  useEffect(() => {
    document.title = "Premium Comparison — Compare LIC Plan Premiums Side by Side | InsureKit";
    const initial = COMPARABLE_PLANS.slice(0, 5).map((p) => p.table);
    setSelectedPlans(initial);
  }, []);

  const results = useMemo(() => {
    return COMPARABLE_PLANS.map((plan) => {
      if (!selectedPlans.includes(plan.table)) return null;
      const result = calculatePremium(plan, age, sumAssured, term, mode);
      return result ? { plan, premium: result } : null;
    })
      .filter(Boolean)
      .sort((a, b) => a.premium.totalPremium - b.premium.totalPremium);
  }, [age, term, sumAssured, mode, selectedPlans]);

  const togglePlan = (table) => {
    setSelectedPlans((prev) =>
      prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table]
    );
  };

  const selectAll = () => setSelectedPlans(COMPARABLE_PLANS.map((p) => p.table));
  const clearAll = () => setSelectedPlans([]);

  return (
    <div className="animate-fade-up">
      <SEOHead
        title="Premium Comparison — Compare LIC Plan Premiums | InsureKit"
        description="Compare premiums across LIC plans for the same age, sum assured, and term. Find the most affordable plan."
        canonical="https://insure.doaide.com/premium-comparison"
      />

      <h1 className="text-2xl font-bold text-white mb-1">Premium Comparison</h1>
      <p className="text-white/40 text-sm mb-6">
        Compare premiums across multiple LIC plans for the same age, sum assured, and term.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div>
          <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Age</label>
          <input type="number" min={18} max={65} value={age} onChange={(e) => setAge(+e.target.value)} className="input-field" style={{ fontSize: "16px", minHeight: "44px" }} />
        </div>
        <div>
          <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Term (years)</label>
          <input type="number" min={5} max={40} value={term} onChange={(e) => setTerm(+e.target.value)} className="input-field" style={{ fontSize: "16px", minHeight: "44px" }} />
        </div>
        <div>
          <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Sum Assured (₹)</label>
          <input type="number" min={100000} step={100000} value={sumAssured} onChange={(e) => setSumAssured(+e.target.value)} className="input-field" style={{ fontSize: "16px", minHeight: "44px" }} />
        </div>
        <div>
          <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Payment Mode</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="select-field" style={{ fontSize: "16px", minHeight: "44px" }}>
            <option value="yearly">Yearly</option>
            <option value="halfYearly">Half-Yearly</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <div className="panel-inner p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-white">Select Plans</h3>
          <div className="flex gap-2 text-xs">
            <button onClick={selectAll} className="text-signal hover:underline">All</button>
            <button onClick={clearAll} className="text-white/40 hover:underline">Clear</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {COMPARABLE_PLANS.map((p) => (
            <button
              key={p.table}
              onClick={() => togglePlan(p.table)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                selectedPlans.includes(p.table)
                  ? "bg-signal/20 text-signal border border-signal/30"
                  : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"
              }`}
              style={{ minHeight: "36px" }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="panel overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/50 text-xs uppercase">#</th>
                  <th className="text-left py-3 px-3 text-white/50 text-xs uppercase">Plan</th>
                  <th className="text-right py-3 px-3 text-white/50 text-xs uppercase">Table</th>
                  <th className="text-right py-3 px-3 text-white/50 text-xs uppercase">Base Premium</th>
                  <th className="text-right py-3 px-3 text-white/50 text-xs uppercase">GST</th>
                  <th className="text-right py-3 px-3 text-signal text-xs uppercase">Total Premium</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r.plan.table} className="border-t border-white/5">
                    <td className="py-2.5 px-4 text-white/30 text-sm">{i + 1}</td>
                    <td className="py-2.5 px-3 text-white/80 text-sm">
                      <Link to={`/plans/${r.plan.slug || r.plan.table}`} className="hover:text-signal transition-colors no-underline">
                        {r.plan.name}
                      </Link>
                    </td>
                    <td className="py-2.5 px-3 text-right text-white/50 text-sm">{r.plan.table}</td>
                    <td className="py-2.5 px-3 text-right text-white/60 text-sm">{fmt(r.premium.basePremium)}</td>
                    <td className="py-2.5 px-3 text-right text-white/40 text-sm">{fmt(r.premium.gst)}</td>
                    <td className="py-2.5 px-3 text-right text-signal font-semibold text-sm">{fmt(r.premium.totalPremium)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="panel-inner p-8 text-center text-white/40 text-sm mb-6">
          Select at least one plan above to compare premiums.
        </div>
      )}

      {results.length >= 2 && (
        <div className="panel-inner p-4 mb-6">
          <h3 className="text-sm font-semibold text-white mb-2">Quick Insight</h3>
          <p className="text-sm text-white/60">
            For a {age}-year-old with {fmt(sumAssured)} SA and {term}-year term,{" "}
            <strong className="text-signal">{results[0].plan.name}</strong> has the lowest premium at{" "}
            {fmt(results[0].premium.totalPremium)} ({mode}).
            {results.length > 1 && (
              <> The most expensive is <strong className="text-white/80">{results[results.length - 1].plan.name}</strong> at{" "}
              {fmt(results[results.length - 1].premium.totalPremium)} — a difference of{" "}
              {fmt(results[results.length - 1].premium.totalPremium - results[0].premium.totalPremium)}.</>
            )}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link to="/premium-calculator" className="btn-secondary no-underline text-sm">
          Detailed Premium Calculator
        </Link>
        <Link to="/maturity-calculator" className="btn-secondary no-underline text-sm">
          Maturity Calculator
        </Link>
        <Link to="/compare-plans" className="btn-secondary no-underline text-sm">
          Compare Any Plans
        </Link>
      </div>

      <FAQ items={[
        { q: "Why do premiums differ between plans for the same SA and term?", a: "Each LIC plan has a different premium rate (per ₹1,000 SA) based on the plan type, benefits offered, and bonus structure. Endowment plans with higher bonuses typically have higher premiums. Term plans have the lowest premiums since there is no maturity benefit." },
        { q: "Does this comparison include GST?", a: "Yes, the Total Premium column includes GST at 4.5% for the first year. Renewal year GST is 2.25%. SA rebates (for SA ≥ ₹5 lakh and ₹10 lakh) and mode rebates are also applied." },
      ]} />
    </div>
  );
}
