import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { GOALS, recommendPlans } from "../utils/recommendPlan";
import { formatINR, formatPercent } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";

const HOW_IT_WORKS = [
  { title: "Answer 3 questions", desc: "Your age, budget, and goal" },
  { title: "Get recommendations", desc: "AI-matched plans ranked for you" },
  { title: "Compare & decide", desc: "See premium, maturity, and returns side by side" },
];

const FAQ_ITEMS = [
  { q: "How are plans recommended?", a: "We match plans based on your age, budget, and goal. Plans are scored on IRR (returns), premium affordability, bonus rates, and suitability. The top 3 matches are shown." },
  { q: "Can I trust these recommendations?", a: "These are data-driven suggestions based on LIC's published rates. However, personal financial planning should consider your complete financial picture. Consult with your LIC agent for personalized advice." },
  { q: "What if I have multiple goals?", a: "Run the recommender for each goal separately. Many agents suggest a portfolio approach — a term plan for protection + an endowment for savings + a child plan if needed." },
  { q: "Why doesn't it show all plans?", a: "We filter plans based on your age eligibility, budget affordability, and goal alignment. Only plans you can actually buy and afford are shown." },
];

const BUDGET_PRESETS = [
  { label: "₹2,000/mo", value: 2000 },
  { label: "₹5,000/mo", value: 5000 },
  { label: "₹10,000/mo", value: 10000 },
  { label: "₹20,000/mo", value: 20000 },
  { label: "₹50,000/mo", value: 50000 },
];

export default function PlanRecommender() {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState(30);
  const [budget, setBudget] = useState(5000);
  const [goal, setGoal] = useState("");
  const [limitedPPT, setLimitedPPT] = useState(false);

  const recommendations = useMemo(() => {
    if (!goal || step < 4) return [];
    return recommendPlans(age, budget, goal, limitedPPT);
  }, [age, budget, goal, limitedPPT, step]);

  const shareText = recommendations.length > 0
    ? `LIC Plan Recommendations\nAge: ${age}, Budget: ${formatINR(budget)}/month, Goal: ${GOALS[goal]?.label}\n\n${recommendations.map((r, i) => `${i + 1}. ${r.plan.name} (Table ${r.plan.tableNo})\n   Premium: ${formatINR(r.premium.annualPremium)}/yr\n   ${r.maturity ? `Maturity: ${formatINR(r.maturity.maturityValue)}` : "Pure protection"}\n   ${r.irr ? `IRR: ${formatPercent(r.irr)}` : ""}`).join("\n\n")}\n\nRecommended by DoAide InsureKit — insure.doaide.com`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">LIC Plan Recommender</h1>
      <p className="text-white/40 text-sm mb-6">
        Answer 3 questions, get the best LIC plan for you
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s ? "bg-signal text-white" : "bg-white/5 text-white/30"
              }`}>
                {step > s ? "✓" : s}
              </div>
              {s < 3 && <div className={`w-8 h-px ${step > s ? "bg-signal" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-up">
            <label className="block text-sm text-white/70 mb-3">What is your age?</label>
            <input type="number" className="input-field text-lg" min={0} max={70} value={age} onChange={(e) => setAge(Number(e.target.value))} />
            <button onClick={() => setStep(2)} className="btn-primary mt-4 w-full">
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-up">
            <label className="block text-sm text-white/70 mb-3">What is your monthly budget for insurance?</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {BUDGET_PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setBudget(p.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    budget === p.value ? "bg-signal text-white" : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <input type="number" className="input-field" min={500} step={500} value={budget} onChange={(e) => setBudget(Number(e.target.value))} placeholder="Custom amount" />
            <div className="flex gap-2 mt-4">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button>
              <button onClick={() => setStep(3)} className="btn-primary flex-1">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-up">
            <label className="block text-sm text-white/70 mb-3">What is your primary goal?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {Object.entries(GOALS).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setGoal(key)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${
                    goal === key ? "bg-signal text-white" : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm text-white/50 mb-4">
              <input type="checkbox" checked={limitedPPT} onChange={(e) => setLimitedPPT(e.target.checked)} className="rounded" />
              Prefer limited premium paying term
            </label>
            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="btn-secondary flex-1">Back</button>
              <button onClick={() => { if (goal) setStep(4); }} className={`btn-primary flex-1 ${!goal ? "opacity-50" : ""}`}>
                Get Recommendations
              </button>
            </div>
          </div>
        )}
      </div>

      {step === 4 && (
        <div className="animate-fade-up">
          <div className="panel-inner p-3 mb-4 text-sm text-white/50">
            Age: <span className="text-white">{age}</span> &middot;
            Budget: <span className="text-white">{formatINR(budget)}/month</span> &middot;
            Goal: <span className="text-white">{GOALS[goal]?.label}</span>
            <button onClick={() => setStep(1)} className="text-signal ml-2 text-xs">Change</button>
          </div>

          {recommendations.length === 0 ? (
            <div className="panel p-6 text-center text-white/30 text-sm">
              No plans match your criteria. Try adjusting your age, budget, or goal.
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <div key={rec.plan.id} className={`panel p-5 ${i === 0 ? "border-signal/30" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        {i === 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-signal/15 text-signal font-medium uppercase tracking-wide">
                            Best Match
                          </span>
                        )}
                        <span className="text-xs text-white/30">#{i + 1}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1">{rec.plan.name}</h3>
                      <div className="text-xs text-white/40">Table {rec.plan.tableNo} &middot; {rec.plan.type.replace("_", " ")}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    <div className="stat-card">
                      <div className="label">Annual Premium</div>
                      <div className="value">{formatINR(rec.premium.annualPremium)}</div>
                      <div className="text-xs text-white/30 mt-1">~{formatINR(rec.monthlyPremium)}/mo</div>
                    </div>
                    <div className="stat-card">
                      <div className="label">Sum Assured</div>
                      <div className="value">{formatINR(rec.sumAssured)}</div>
                    </div>
                    {rec.maturity && (
                      <div className="stat-card">
                        <div className="label">Maturity Value</div>
                        <div className="value accent">{formatINR(rec.maturity.maturityValue)}</div>
                      </div>
                    )}
                    {rec.irr !== null && (
                      <div className="stat-card">
                        <div className="label">IRR</div>
                        <div className="value">{formatPercent(rec.irr)}</div>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-white/50 mb-3">{rec.whyRecommended}</div>

                  <div className="flex flex-wrap gap-2">
                    {rec.plan.features.slice(0, 3).map((f, fi) => (
                      <span key={fi} className="text-xs px-2 py-1 rounded bg-white/5 text-white/40">{f}</span>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Link to={`/premium-calculator`} className="btn-secondary text-sm py-2 px-4 no-underline">Calculate Premium</Link>
                    <Link to={`/maturity-calculator`} className="btn-secondary text-sm py-2 px-4 no-underline">Check Maturity</Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="flex justify-end gap-2 mt-4">
              <PrintButton />
              <ShareButtons text={shareText} />
            </div>
          )}
        </div>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
