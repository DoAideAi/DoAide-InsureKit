import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { calculateChildEducation, EDUCATION_PRESETS, CHILD_PLAN_OPTIONS } from "../utils/calcChildEducation";
import { formatINR } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";

const HOW_IT_WORKS = [
  { title: "Pick the education goal", desc: "Engineering, medical, MBA, or study abroad" },
  { title: "See the future cost", desc: "9% education inflation applied to today's fees" },
  { title: "Match an LIC child plan", desc: "Share the goal plan with parents on WhatsApp" },
];

const FAQ_ITEMS = [
  { q: "How much will education cost when my child turns 18?", a: "Education inflation in India runs 8-10% — roughly double general inflation. A ₹16 lakh engineering degree today will cost around ₹58 lakh in 15 years at 9% inflation. This calculator shows the exact number for your goal." },
  { q: "Which LIC plan is best for child education?", a: "Jeevan Lakshya (733) is the most popular — if the parent dies, LIC pays 10% of Sum Assured every year till maturity plus the full maturity benefit, so the education goal survives. Jeevan Tarun (734) and Children's Money Back (732) time payouts to college years." },
  { q: "Why not just use a mutual fund SIP for education?", a: "A SIP builds the corpus only if the parent survives and keeps investing. A child plan with waiver-of-premium guarantees the goal even if the parent dies — LIC continues the plan without further premiums. Many families use both." },
  { q: "What is waiver of premium?", a: "A rider (or built-in feature) where future premiums are waived if the proposer dies or is disabled, while the policy continues in full. Essential for any child education plan." },
  { q: "When should I start saving for child education?", a: "At birth. Starting at age 1 vs age 8 roughly halves the monthly saving needed, because compounding gets 7 more years to work." },
];

export default function ChildEducationCalculator() {
  const [presetId, setPresetId] = useState("engineering");
  const [form, setForm] = useState({
    childAge: 3,
    goalAge: 18,
    currentCost: 1600000,
    educationInflationPercent: 9,
    returnPercent: 10,
    existingSavings: 0,
  });

  const set = (key) => (e) => setForm({ ...form, [key]: Number(e.target.value) });

  const applyPreset = (id) => {
    setPresetId(id);
    const preset = EDUCATION_PRESETS.find((p) => p.id === id);
    if (preset && id !== "custom") {
      setForm((f) => ({ ...f, currentCost: preset.cost, goalAge: preset.atAge }));
    }
  };

  const result = useMemo(() => calculateChildEducation(form), [form]);

  const shareText = `\u{1F393} Child Education Plan\n\nGoal: ${formatINR(form.currentCost)} course at age ${form.goalAge}\nFuture cost (${form.educationInflationPercent}% edu inflation): ${formatINR(result.futureCost)}\n\nSave monthly: ${formatINR(result.monthlySavingsNeeded)}\nSuggested cover: ${formatINR(result.suggestedSumAssured)}\n\nSecure your child's future \u{2014} DoAide InsureKit`;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Child Education Plan Calculator</h1>
      <p className="text-white/40 text-sm mb-6">
        Future cost of your child's education, the monthly saving needed, and the LIC plan that guarantees it
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      {/* Goal presets */}
      <div className="flex flex-wrap gap-2 mb-6">
        {EDUCATION_PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => applyPreset(p.id)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${presetId === p.id ? "bg-signal text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="panel p-5 mb-6">
        <div className="text-sm font-medium text-white mb-3">Goal Details</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Child's Age</label>
            <input type="number" className="input-field" min={0} max={17} value={form.childAge} onChange={set("childAge")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Goal at Age</label>
            <input type="number" className="input-field" min={15} max={25} value={form.goalAge} onChange={set("goalAge")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Cost Today (₹)</label>
            <input type="number" className="input-field" min={100000} step={100000} value={form.currentCost} onChange={(e) => { setPresetId("custom"); set("currentCost")(e); }} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Education Inflation (%)</label>
            <input type="number" className="input-field" min={4} max={15} step={0.5} value={form.educationInflationPercent} onChange={set("educationInflationPercent")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Expected Return (%)</label>
            <input type="number" className="input-field" min={4} max={15} step={0.5} value={form.returnPercent} onChange={set("returnPercent")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Already Saved (₹)</label>
            <input type="number" className="input-field" min={0} step={50000} value={form.existingSavings} onChange={set("existingSavings")} />
          </div>
        </div>
      </div>

      <div className="panel p-5 mb-6 border-l-4 border-l-signal">
        <div className="text-sm font-medium text-white mb-3">The Education Goal</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-white">{result.yearsToGoal} yrs</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Time to Goal</div>
          </div>
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-signal">{formatINR(result.futureCost)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Future Cost</div>
          </div>
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-good">{formatINR(result.monthlySavingsNeeded)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Save Monthly</div>
          </div>
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-warn">{formatINR(result.suggestedSumAssured)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Suggested Cover</div>
          </div>
        </div>
        <div className="mt-3 p-3 rounded-lg bg-signal/5 border border-signal/10 text-xs text-signal/80">
          A {formatINR(form.currentCost)} course today will cost {formatINR(result.futureCost)} in {result.yearsToGoal} years at {form.educationInflationPercent}% education inflation. Cover of {formatINR(result.suggestedSumAssured)} with waiver-of-premium keeps the goal safe even if the earning parent is not around.
        </div>
      </div>

      <div className="panel p-5 mb-6">
        <div className="text-sm font-medium text-white mb-3">LIC Child Plans That Fit This Goal</div>
        <div className="space-y-3">
          {CHILD_PLAN_OPTIONS.map((p) => (
            <Link key={p.slug} to={`/plans/${p.slug}`} className="block panel-inner p-3 hover:bg-white/10 transition-colors no-underline">
              <div className="text-sm font-medium text-signal">{p.name}</div>
              <div className="text-xs text-white/50 mt-1">{p.role}</div>
            </Link>
          ))}
        </div>
        <div className="mt-3 text-xs text-white/30">
          Use the <Link to="/premium-calculator" className="text-signal">Premium Calculator</Link> to quote the exact premium for the suggested cover.
        </div>
      </div>

      <div className="flex items-center gap-3 print:hidden mb-6">
        <PrintButton />
        <ShareButtons text={shareText} toolName="Child Education Calculator" />
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
