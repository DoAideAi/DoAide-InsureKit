import { useState, useMemo } from "react";
import { calculateTaxBenefit, calculate80DBenefit } from "../utils/calcTax";
import { formatINR } from "../utils/format";
import ResultCard from "../components/ResultCard";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";


const HOW_IT_WORKS = [
  { title: "Enter premium & SA", desc: "Life insurance premium, sum assured, and health premium" },
  { title: "Set your income", desc: "Enter annual income and choose tax regime" },
  { title: "See tax savings", desc: "80C + 80D deductions and 10(10D) exemption comparison" },
];

const FAQ_ITEMS = [
  { q: "How much tax can I save with LIC?", a: "Under Section 80C of the Income Tax Act (old regime), you can claim deduction up to ₹1,50,000/year on life insurance premiums. The actual tax saved depends on your income tax slab — up to 30% of the deduction amount." },
  { q: "What is Section 80D?", a: "Section 80D allows deductions for health insurance premiums. You can claim up to ₹25,000 for self/family (₹50,000 if senior citizen aged 60+) and an additional ₹25,000 for parents (₹50,000 if parents are senior citizens). Maximum combined deduction: ₹1,00,000." },
  { q: "Is Section 80C available in the new tax regime?", a: "No. The new tax regime (FY 2026-27) does not allow Section 80C or 80D deductions. However, the new regime has lower base tax rates and higher exemption limits. Section 10(10D) maturity exemption still applies in both regimes." },
  { q: "What is Section 10(10D)?", a: "Section 10(10D) exempts maturity proceeds from income tax, provided the annual premium does not exceed 10% of the Sum Assured. If premium > 10% SA, the maturity amount may be partially or fully taxable." },
  { q: "Are LIC premiums eligible for 80C if paid for family?", a: "Yes, premiums paid for self, spouse, and children are eligible for 80C deduction. However, the total 80C limit of ₹1.5 lakh includes all eligible investments (PPF, ELSS, NSC, etc.)." },
  { q: "Can I claim both 80C and 80D together?", a: "Yes, 80C and 80D are separate sections with separate limits. You can claim up to ₹1.5 lakh under 80C (life insurance) and up to ₹1 lakh under 80D (health insurance) in the same year under the old regime." },
  { q: "Is the death benefit from LIC taxable?", a: "No. Death benefit received by the nominee/legal heir is completely tax-free under Section 10(10D), regardless of the premium amount. There is no cap on this exemption." },
  { q: "Which tax regime is better for LIC policyholders?", a: "Generally, the old regime is better if you have significant 80C/80D investments (LIC, health insurance, PPF, ELSS). The new regime may be better for those with fewer deductions. Use our calculator to compare both." },
];

const INCOME_PRESETS = [
  { label: "₹5L", value: 500000 },
  { label: "₹7.5L", value: 750000 },
  { label: "₹10L", value: 1000000 },
  { label: "₹15L", value: 1500000 },
  { label: "₹20L", value: 2000000 },
  { label: "₹25L", value: 2500000 },
];

export default function TaxCalculator() {
  const [premium, setPremium] = useState(50000);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [income, setIncome] = useState(1000000);
  const [healthPremiumSelf, setHealthPremiumSelf] = useState(0);
  const [healthPremiumParents, setHealthPremiumParents] = useState(0);
  const [isSelfSenior, setIsSelfSenior] = useState(false);
  const [isParentSenior, setIsParentSenior] = useState(false);

  const oldResult = useMemo(
    () => calculateTaxBenefit(premium, sumAssured, income, false),
    [premium, sumAssured, income],
  );
  const newResult = useMemo(
    () => calculateTaxBenefit(premium, sumAssured, income, true),
    [premium, sumAssured, income],
  );

  const old80D = useMemo(
    () => calculate80DBenefit(healthPremiumSelf, healthPremiumParents, isSelfSenior, isParentSenior, income, false),
    [healthPremiumSelf, healthPremiumParents, isSelfSenior, isParentSenior, income],
  );
  const new80D = useMemo(
    () => calculate80DBenefit(healthPremiumSelf, healthPremiumParents, isSelfSenior, isParentSenior, income, true),
    [healthPremiumSelf, healthPremiumParents, isSelfSenior, isParentSenior, income],
  );

  const totalOldSaved = oldResult.taxSaved + old80D.taxSaved;
  const has80D = healthPremiumSelf > 0 || healthPremiumParents > 0;

  const shareText = `Insurance Tax Benefits\nLife Premium: ${formatINR(premium)}/yr, SA: ${formatINR(sumAssured)}${has80D ? `\nHealth Premium (Self): ${formatINR(healthPremiumSelf)}, Parents: ${formatINR(healthPremiumParents)}` : ""}\nIncome: ${formatINR(income)}\n\nOld Regime:\n  80C Deduction: ${formatINR(oldResult.sec80cDeduction)}${has80D ? `\n  80D Deduction: ${formatINR(old80D.totalDeduction)}` : ""}\n  Total Tax Saved: ${formatINR(totalOldSaved)}\n\nNew Regime:\n  80C/80D: Not available\n  Tax: ${formatINR(newResult.taxWith)}\n\nMaturity: ${oldResult.maturityExempt ? "Exempt u/s 10(10D)" : "Taxable"}\n\nCalculated on DoAide InsureKit — insure.doaide.com`;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Insurance Tax Benefit Calculator</h1>
      <p className="text-white/40 text-sm mb-6">
        Section 80C + 80D deductions, 10(10D) maturity exemption — old vs new regime
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Annual Premium (₹)</label>
            <input type="number" className="input-field" min={1000} step={1000} value={premium} onChange={(e) => setPremium(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Sum Assured (₹)</label>
            <input type="number" className="input-field" min={100000} step={100000} value={sumAssured} onChange={(e) => setSumAssured(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Annual Income (₹)</label>
            <input type="number" className="input-field" min={100000} step={100000} value={income} onChange={(e) => setIncome(Number(e.target.value))} />
          </div>
        </div>
        <div className="mt-3">
          <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Quick Income Select</label>
          <div className="flex flex-wrap gap-2">
            {INCOME_PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => setIncome(p.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  income === p.value
                    ? "bg-signal text-white"
                    : "bg-white/5 text-white/40 hover:bg-white/10"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="panel p-5 mb-6">
        <div className="text-sm font-semibold text-white mb-3">Section 80D — Health Insurance</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Health Premium — Self & Family (₹)</label>
            <input type="number" className="input-field" min={0} step={1000} value={healthPremiumSelf} onChange={(e) => setHealthPremiumSelf(Number(e.target.value))} />
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input type="checkbox" checked={isSelfSenior} onChange={(e) => setIsSelfSenior(e.target.checked)} className="rounded" />
              <span className="text-xs text-white/50">Senior citizen (60+ years) — limit ₹50,000</span>
            </label>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Health Premium — Parents (₹)</label>
            <input type="number" className="input-field" min={0} step={1000} value={healthPremiumParents} onChange={(e) => setHealthPremiumParents(Number(e.target.value))} />
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input type="checkbox" checked={isParentSenior} onChange={(e) => setIsParentSenior(e.target.checked)} className="rounded" />
              <span className="text-xs text-white/50">Parents are senior citizens (60+) — limit ₹50,000</span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <RegimeCard title="Old Tax Regime" result={oldResult} result80D={old80D} recommended />
        <RegimeCard title="New Tax Regime (FY 2026-27)" result={newResult} result80D={new80D} />
      </div>

      <div className={`panel p-4 mb-6 border-l-4 ${oldResult.maturityExempt ? "border-l-good" : "border-l-warn"}`}>
        <div className="text-sm font-medium text-white mb-1">
          Maturity Exemption — Section 10(10D)
        </div>
        <div className={`text-sm ${oldResult.maturityExempt ? "text-good" : "text-warn"}`}>
          {oldResult.maturityExemptReason}
        </div>
        <div className="text-xs text-white/30 mt-1">
          Premium cap: ≤ 10% of Sum Assured ({formatINR(sumAssured * 0.1)}/yr). Your premium: {formatINR(premium)}/yr.
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <PrintButton />
        <ShareButtons text={shareText} />
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}

function RegimeCard({ title, result, result80D, recommended = false }) {
  const has80D = result80D && result80D.totalDeduction > 0;
  const totalSaved = result.taxSaved + (result80D ? result80D.taxSaved : 0);
  return (
    <div className={`panel p-5 ${recommended ? "border-signal/30" : ""}`}>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {recommended && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-signal/15 text-signal font-medium uppercase tracking-wide">
            80C + 80D
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Sec 80C Deduction</span>
          <span className="text-white font-medium">{formatINR(result.sec80cDeduction)}</span>
        </div>
        {has80D && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Sec 80D (Self)</span>
              <span className="text-white/60">{formatINR(result80D.selfDeduction)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Sec 80D (Parents)</span>
              <span className="text-white/60">{formatINR(result80D.parentsDeduction)}</span>
            </div>
          </>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Tax Without Insurance</span>
          <span className="text-white/60">{formatINR(result.taxWithout)}</span>
        </div>
        <div className="flex justify-between text-sm border-t border-white/10 pt-2">
          <span className="text-white/70 font-medium">Total Tax Saved</span>
          <span className="text-signal font-bold text-lg">{formatINR(totalSaved)}</span>
        </div>
      </div>

      <div className="mt-3 text-xs text-white/30">{result.note}</div>
      {has80D && <div className="mt-1 text-xs text-white/30">{result80D.note}</div>}
    </div>
  );
}
