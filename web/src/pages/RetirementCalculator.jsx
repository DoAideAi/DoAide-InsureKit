import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { calculateRetirement, retirementTimeline } from "../utils/calcRetirement";
import { formatINR } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";

const HOW_IT_WORKS = [
  { title: "Enter today's expenses", desc: "Age, retirement age, and monthly spending" },
  { title: "See the corpus needed", desc: "Inflation-adjusted corpus and the savings gap" },
  { title: "Present LIC pension options", desc: "Share the plan with your client on WhatsApp" },
];

const FAQ_ITEMS = [
  { q: "How much retirement corpus do I need in India?", a: "A common rule is 25-30× your annual expenses at retirement. This calculator is more precise: it inflates today's expenses to your retirement year, then computes the corpus that funds those expenses (growing with inflation) until life expectancy while the corpus earns post-retirement returns." },
  { q: "What inflation rate should I assume?", a: "6% is a reasonable long-term assumption for India. Healthcare and lifestyle inflation can run higher — use 7-8% if your client is conservative." },
  { q: "Which LIC plans work for retirement?", a: "Jeevan Umang (745) gives 8% of SA yearly for life after PPT. New Jeevan Shanti (858) is a deferred annuity with guaranteed rates. Saral Pension (862) is an immediate annuity. Jeevan Akshay is another immediate annuity option." },
  { q: "Is the corpus calculation guaranteed?", a: "No — it is a planning estimate based on your assumptions. Actual returns, inflation and life expectancy will differ. Review the plan yearly." },
  { q: "Why does post-retirement return matter?", a: "After retirement your corpus keeps earning (FDs, annuities, debt funds). A higher post-retirement return means a smaller corpus is enough. We default to 7% — typical of annuity and FD rates." },
];

const PENSION_PLANS = [
  { slug: "jeevan-umang-745", name: "Jeevan Umang (745)", desc: "8% of Sum Assured paid yearly for life after premium paying term, plus maturity at age 100. Works like a self-made pension with life cover." },
  { slug: "new-jeevan-shanti-858", name: "New Jeevan Shanti (858)", desc: "Deferred annuity — pay once, pension starts after 1-12 years at guaranteed rates locked in today." },
  { slug: "saral-pension-862", name: "Saral Pension (862)", desc: "Immediate annuity — pay once, pension starts next month/year. Simple, IRDAI-standard product." },
];

export default function RetirementCalculator() {
  const [form, setForm] = useState({
    currentAge: 30,
    retirementAge: 60,
    lifeExpectancy: 85,
    monthlyExpenses: 50000,
    inflationPercent: 6,
    preReturnPercent: 10,
    postReturnPercent: 7,
    existingCorpus: 0,
  });

  const set = (key) => (e) => setForm({ ...form, [key]: Number(e.target.value) });

  const result = useMemo(() => calculateRetirement(form), [form]);
  const timeline = useMemo(
    () =>
      result.monthlySavingsNeeded > 0
        ? retirementTimeline({
            currentAge: form.currentAge,
            retirementAge: form.retirementAge,
            monthlySavings: result.monthlySavingsNeeded,
            preReturnPercent: form.preReturnPercent,
            existingCorpus: form.existingCorpus,
          })
        : [],
    [form, result.monthlySavingsNeeded]
  );

  const milestones = timeline.filter((_, i) => (i + 1) % 5 === 0 || i === timeline.length - 1);

  const shareText = `\u{1F3D6} Retirement Plan (age ${form.currentAge} \u{2192} ${form.retirementAge})\n\nMonthly expenses today: ${formatINR(form.monthlyExpenses)}\nAt retirement (${form.inflationPercent}% inflation): ${formatINR(result.monthlyExpensesAtRetirement)}/month\n\nCorpus needed: ${formatINR(result.corpusNeeded)}\nSave monthly: ${formatINR(result.monthlySavingsNeeded)}\n\nPlan your retirement free \u{2014} DoAide InsureKit`;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Retirement Planning Calculator</h1>
      <p className="text-white/40 text-sm mb-6">
        How much corpus your client needs to retire — and the monthly saving that gets them there
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="text-sm font-medium text-white mb-3">Your Details</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Current Age</label>
            <input type="number" className="input-field" min={18} max={70} value={form.currentAge} onChange={set("currentAge")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Retirement Age</label>
            <input type="number" className="input-field" min={40} max={75} value={form.retirementAge} onChange={set("retirementAge")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Life Expectancy</label>
            <input type="number" className="input-field" min={60} max={100} value={form.lifeExpectancy} onChange={set("lifeExpectancy")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Monthly Expenses (₹)</label>
            <input type="number" className="input-field" min={5000} step={5000} value={form.monthlyExpenses} onChange={set("monthlyExpenses")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Inflation (%)</label>
            <input type="number" className="input-field" min={0} max={12} step={0.5} value={form.inflationPercent} onChange={set("inflationPercent")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Return Till Retirement (%)</label>
            <input type="number" className="input-field" min={1} max={18} step={0.5} value={form.preReturnPercent} onChange={set("preReturnPercent")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Return After Retirement (%)</label>
            <input type="number" className="input-field" min={1} max={15} step={0.5} value={form.postReturnPercent} onChange={set("postReturnPercent")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Existing Savings (₹)</label>
            <input type="number" className="input-field" min={0} step={100000} value={form.existingCorpus} onChange={set("existingCorpus")} />
          </div>
        </div>
      </div>

      <div className="panel p-5 mb-6 border-l-4 border-l-signal">
        <div className="text-sm font-medium text-white mb-3">Retirement Numbers</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-white">{formatINR(result.monthlyExpensesAtRetirement)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Monthly Need at {form.retirementAge}</div>
          </div>
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-signal">{formatINR(result.corpusNeeded)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Corpus Needed</div>
          </div>
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-warn">{formatINR(result.corpusGap)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Savings Gap</div>
          </div>
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-good">{formatINR(result.monthlySavingsNeeded)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Save Monthly</div>
          </div>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-signal/5 border border-signal/10 text-xs text-signal/80">
          Saving {formatINR(result.monthlySavingsNeeded)}/month for {result.yearsToRetire} years at {form.preReturnPercent}% builds the {formatINR(result.corpusNeeded)} corpus that funds {formatINR(result.monthlyExpensesAtRetirement)}/month (inflation-adjusted) from age {form.retirementAge} to {form.lifeExpectancy}.
        </div>
      </div>

      {milestones.length > 0 && (
        <div className="panel p-5 mb-6">
          <div className="text-sm font-medium text-white mb-3">Corpus Growth Milestones</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="border border-white/10 px-3 py-2 bg-white/5 text-left">Age</th>
                  <th className="border border-white/10 px-3 py-2 bg-white/5 text-right">Projected Corpus</th>
                  <th className="border border-white/10 px-3 py-2 bg-white/5 text-right">% of Target</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((row) => (
                  <tr key={row.age}>
                    <td className="border border-white/10 px-3 py-2 text-white/60">{row.age}</td>
                    <td className="border border-white/10 px-3 py-2 text-right text-white/80">{formatINR(row.corpus)}</td>
                    <td className="border border-white/10 px-3 py-2 text-right text-signal">{Math.min(100, Math.round((row.corpus / Math.max(1, result.corpusNeeded)) * 100))}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="panel p-5 mb-6">
        <div className="text-sm font-medium text-white mb-3">LIC Plans for Retirement</div>
        <div className="space-y-3">
          {PENSION_PLANS.map((p) => (
            <Link key={p.slug} to={`/plans/${p.slug}`} className="block panel-inner p-3 hover:bg-white/10 transition-colors no-underline">
              <div className="text-sm font-medium text-signal">{p.name}</div>
              <div className="text-xs text-white/50 mt-1">{p.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 print:hidden mb-6">
        <PrintButton />
        <ShareButtons text={shareText} toolName="Retirement Calculator" />
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
