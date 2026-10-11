import { useState, useMemo } from "react";
import { calculateFD, calculateRD, compareWithInsurance } from "../utils/calcFdRd";
import { formatINR } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";

const HOW_IT_WORKS = [
  { title: "Enter FD/RD details", desc: "Amount, rate, and tenure" },
  { title: "Compare with LIC", desc: "See insurance maturity vs FD/RD side by side" },
  { title: "Share with client", desc: "Send the comparison via WhatsApp" },
];

const FAQ_ITEMS = [
  { q: "Why compare FD with insurance?", a: "Many clients think FD gives better returns. This tool shows that after tax, LIC policies often match or beat FD returns — plus you get life cover and tax benefits under 80C/10(10D)." },
  { q: "Is FD interest taxable?", a: "Yes, FD interest is fully taxable at your income tax slab rate. If interest exceeds ₹40,000/year (₹50,000 for senior citizens), TDS is deducted at 10%." },
  { q: "Is LIC maturity tax-free?", a: "Yes, LIC maturity proceeds are tax-free under Section 10(10D) if the annual premium does not exceed 10% of Sum Assured (20% for policies before 01-Apr-2012)." },
  { q: "What bonus rate is used?", a: "We use LIC's current Simple Reversionary Bonus (SRB) rate of ₹44 per 1000 SA (Jeevan Anand 2025-26 declared rate). Actual rates vary by plan and are declared annually." },
  { q: "How is RD interest calculated?", a: "RD interest is calculated on quarterly compounding basis, similar to how banks calculate it. Each monthly deposit earns interest for the remaining tenure." },
];

const COMPOUNDING_OPTIONS = [
  { value: "quarterly", label: "Quarterly" },
  { value: "half-yearly", label: "Half-Yearly" },
  { value: "yearly", label: "Yearly" },
  { value: "monthly", label: "Monthly" },
];

export default function FdRdCalculator() {
  const [mode, setMode] = useState("fd");
  const [fdForm, setFdForm] = useState({
    principal: 500000,
    ratePercent: 7.0,
    years: 10,
    compounding: "quarterly",
  });
  const [rdForm, setRdForm] = useState({
    monthly: 5000,
    ratePercent: 6.5,
    years: 10,
  });
  const [insuranceForm, setInsuranceForm] = useState({
    sumAssured: 500000,
    premium: 25000,
    bonusRate: 44,
  });
  const [showComparison, setShowComparison] = useState(false);

  const fdResult = useMemo(() => calculateFD(fdForm), [fdForm]);
  const rdResult = useMemo(() => calculateRD(rdForm), [rdForm]);

  const activeResult = mode === "fd" ? fdResult : rdResult;
  const activeTerm = mode === "fd" ? fdForm.years : rdForm.years;

  const comparison = useMemo(() => {
    if (!showComparison) return null;
    return compareWithInsurance({
      fdResult: { ...activeResult, maturity: activeResult.maturity, interest: activeResult.interest, postTax30: mode === "fd" ? activeResult.postTax30 : activeResult.maturity - Math.round(activeResult.interest * 0.30) },
      insuranceSA: insuranceForm.sumAssured,
      insurancePremium: insuranceForm.premium,
      insuranceTerm: activeTerm,
      bonusRate: insuranceForm.bonusRate,
    });
  }, [showComparison, activeResult, activeTerm, insuranceForm, mode]);

  const shareText = comparison
    ? `\u{1F4CA} FD vs LIC Comparison (${activeTerm} years)\n\n${mode === "fd" ? "FD" : "RD"} Maturity: ${formatINR(activeResult.maturity)}\nAfter Tax (30%): ${formatINR(mode === "fd" ? fdResult.postTax30 : activeResult.maturity - Math.round(activeResult.interest * 0.30))}\n\nLIC Maturity: ${formatINR(comparison.insuranceMaturity)} (TAX FREE)\nLife Cover: ${formatINR(comparison.lifeCover)}\n\n✅ LIC gives life protection + tax-free returns!\n\n— DoAide InsureKit`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">FD/RD vs Insurance Calculator</h1>
      <p className="text-white/40 text-sm mb-6">
        Compare Fixed Deposit & Recurring Deposit returns with LIC policy maturity
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("fd")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "fd" ? "bg-signal text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}
        >
          Fixed Deposit
        </button>
        <button
          onClick={() => setMode("rd")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "rd" ? "bg-signal text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}
        >
          Recurring Deposit
        </button>
      </div>

      {/* FD Input */}
      {mode === "fd" && (
        <div className="panel p-5 mb-6">
          <div className="text-sm font-medium text-white mb-3">Fixed Deposit Details</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Principal Amount</label>
              <input type="number" className="input-field" min={1000} step={10000} value={fdForm.principal} onChange={(e) => setFdForm({ ...fdForm, principal: Number(e.target.value) })} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Interest Rate (%)</label>
              <input type="number" className="input-field" min={0} max={15} step={0.1} value={fdForm.ratePercent} onChange={(e) => setFdForm({ ...fdForm, ratePercent: Number(e.target.value) })} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Tenure (Years)</label>
              <input type="number" className="input-field" min={1} max={30} value={fdForm.years} onChange={(e) => setFdForm({ ...fdForm, years: Number(e.target.value) })} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Compounding</label>
              <select className="select-field" value={fdForm.compounding} onChange={(e) => setFdForm({ ...fdForm, compounding: e.target.value })}>
                {COMPOUNDING_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* RD Input */}
      {mode === "rd" && (
        <div className="panel p-5 mb-6">
          <div className="text-sm font-medium text-white mb-3">Recurring Deposit Details</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Monthly Deposit</label>
              <input type="number" className="input-field" min={100} step={500} value={rdForm.monthly} onChange={(e) => setRdForm({ ...rdForm, monthly: Number(e.target.value) })} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Interest Rate (%)</label>
              <input type="number" className="input-field" min={0} max={15} step={0.1} value={rdForm.ratePercent} onChange={(e) => setRdForm({ ...rdForm, ratePercent: Number(e.target.value) })} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Tenure (Years)</label>
              <input type="number" className="input-field" min={1} max={30} value={rdForm.years} onChange={(e) => setRdForm({ ...rdForm, years: Number(e.target.value) })} />
            </div>
          </div>
        </div>
      )}

      {/* FD/RD Result */}
      <div className="panel p-5 mb-6">
        <div className="text-sm font-medium text-white mb-3">{mode === "fd" ? "FD" : "RD"} Returns</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-white">{formatINR(mode === "fd" ? fdResult.principal : rdResult.invested)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">{mode === "fd" ? "Principal" : "Invested"}</div>
          </div>
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-signal">{formatINR(activeResult.maturity)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Maturity</div>
          </div>
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-good">{formatINR(activeResult.interest)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Interest Earned</div>
          </div>
          {mode === "fd" && (
            <div className="panel-inner p-3 text-center">
              <div className="text-lg font-bold text-bad">{formatINR(fdResult.postTax30)}</div>
              <div className="text-[10px] text-white/30 uppercase tracking-wide">After Tax (30%)</div>
            </div>
          )}
          {mode === "rd" && (
            <div className="panel-inner p-3 text-center">
              <div className="text-lg font-bold text-bad">{formatINR(rdResult.maturity - Math.round(rdResult.interest * 0.30))}</div>
              <div className="text-[10px] text-white/30 uppercase tracking-wide">After Tax (30%)</div>
            </div>
          )}
        </div>
        <div className="mt-3 p-3 rounded-lg bg-bad/5 border border-bad/10 text-xs text-bad/80">
          FD/RD interest is fully taxable at your slab rate. TDS deducted if interest exceeds {"₹"}40,000/year.
        </div>
      </div>

      {/* Compare Button */}
      {!showComparison && (
        <button onClick={() => setShowComparison(true)} className="btn-primary w-full py-3 text-sm mb-6">
          Compare with LIC Insurance
        </button>
      )}

      {/* Insurance Comparison */}
      {showComparison && (
        <>
          <div className="panel p-5 mb-6">
            <div className="text-sm font-medium text-white mb-3">LIC Policy Details (for comparison)</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Sum Assured</label>
                <input type="number" className="input-field" min={10000} step={50000} value={insuranceForm.sumAssured} onChange={(e) => setInsuranceForm({ ...insuranceForm, sumAssured: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Annual Premium</label>
                <input type="number" className="input-field" min={1000} step={1000} value={insuranceForm.premium} onChange={(e) => setInsuranceForm({ ...insuranceForm, premium: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Bonus Rate ({"₹"}/1000 SA)</label>
                <input type="number" className="input-field" min={0} max={100} step={1} value={insuranceForm.bonusRate} onChange={(e) => setInsuranceForm({ ...insuranceForm, bonusRate: Number(e.target.value) })} />
              </div>
            </div>
          </div>

          {comparison && (
            <div className="panel p-5 mb-6 border-l-4 border-l-signal">
              <div className="text-sm font-medium text-white mb-4">Side-by-Side Comparison ({activeTerm} Years)</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-white/10 px-3 py-2 bg-white/5 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 bg-white/5 text-right">{mode === "fd" ? "FD" : "RD"}</th>
                      <th className="border border-white/10 px-3 py-2 bg-signal/10 text-right text-signal">LIC Policy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-white/60">Maturity Amount</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-white/80">{formatINR(comparison.fdMaturity)}</td>
                      <td className="border border-white/10 px-3 py-2 text-right font-medium text-signal">{formatINR(comparison.insuranceMaturity)}</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-white/60">After Tax (30% slab)</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-bad">{formatINR(comparison.fdPostTax)}</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-good">{formatINR(comparison.insuranceMaturity)} (Tax Free)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-white/60">Life Cover</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-bad/60">None</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-good">{formatINR(comparison.lifeCover)}</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-white/60">Tax Benefit (80C)</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-white/40">{mode === "fd" ? "5-year FD only" : "No"}</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-good">Yes (up to {"₹"}1.5L/yr)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-white/60">Maturity Tax</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-bad">Fully Taxable</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-good">Tax Free (10(10D))</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-white/60">Loan Facility</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-white/40">FD can be pledged</td>
                      <td className="border border-white/10 px-3 py-2 text-right text-good">Loan after 3 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-signal/5 border border-signal/10 text-xs text-signal/80">
                LIC provides life cover of {formatINR(comparison.lifeCover)} from day 1 + tax-free maturity. FD/RD interest is taxable and offers no life protection.
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 print:hidden mb-6">
            <PrintButton />
            {shareText && <ShareButtons text={shareText} />}
          </div>
        </>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
