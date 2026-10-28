import { useState, useMemo, useEffect } from "react";
import { LIC_PLANS, PLAN_TYPES, COMMISSION_RATES_BY_PPT, COMMISSION_OVERRIDES } from "../data/licPlans";
import { calculatePremium } from "../utils/calcPremium";
import { calculateCommission, calculateCommissionByYear, BONUS_COMMISSION_SLABS, getBonusCommissionRate, calculatePortfolioCommission } from "../utils/calcCommission";
import { formatINR, formatPercent } from "../utils/format";
import ResultCard from "../components/ResultCard";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackCalculation } from "../lib/analytics";


const HOW_IT_WORKS = [
  { title: "Select plan", desc: "Pick the LIC plan your client is buying" },
  { title: "Enter premium", desc: "Set age, SA, and term to calculate premium" },
  { title: "See commission", desc: "FY, renewal, bonus, and total commission over policy term" },
];

const FAQ_ITEMS = [
  { q: "How is LIC agent commission calculated?", a: "Commission is a percentage of the premium paid. First year (FY) commission is higher than renewal. FY rates depend on the Premium Paying Term (PPT): 25% for PPT 15+, 20% for PPT 12-14, 15% for PPT 8-11, 10% for PPT 5-7. Term plans get 28% FY." },
  { q: "What is renewal commission?", a: "Renewal commission is paid every year from the 2nd year onwards when the policyholder pays their premium. Standard renewal rate is 7.5% for most plans, 5% for plans with PPT 5-7 years." },
  { q: "What is bonus commission (club membership)?", a: "LIC rewards high-performing agents with bonus commission based on total first-year commission (FYC) earned. Star Club (₹3L+ FYC) gets 20%, MDRT (₹6L+) gets 30%, COT (₹12L+) gets 35%, and TOT (₹24L+) gets 40% bonus on FYC." },
  { q: "What is portfolio commission?", a: "Portfolio mode lets you add multiple policies and see your total FYC, total renewal, and which club tier you qualify for. This helps you track your performance against club targets." },
  { q: "Is commission paid on GST amount?", a: "No, commission is calculated on the base premium before GST. GST on premium goes to the government." },
  { q: "Do government schemes (PMJJBY, PMSBY) pay commission?", a: "No, government schemes like PMJJBY (₹436) and PMSBY (₹20) do not pay agent commission." },
];

const commissionPlans = LIC_PLANS.filter(
  (p) => p.type !== PLAN_TYPES.GOVT && Object.keys(p.premiumRates).length > 0,
);

export default function CommissionCalculator() {
  const [planId, setPlanId] = useState(commissionPlans[0].id);
  const [age, setAge] = useState(30);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [term, setTerm] = useState(20);
  const [showYearwise, setShowYearwise] = useState(false);
  const [showRateChart, setShowRateChart] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [portfolio, setPortfolio] = useState([]);

  const plan = useMemo(() => commissionPlans.find((p) => p.id === planId), [planId]);

  const premResult = useMemo(() => {
    if (!plan) return null;
    return calculatePremium(plan, age, sumAssured, term, "yearly");
  }, [plan, age, sumAssured, term]);

  const commission = useMemo(() => {
    if (!plan || !premResult) return null;
    return calculateCommission(plan, premResult.annualPremium, term);
  }, [plan, premResult, term]);

  const yearwise = useMemo(() => {
    if (!plan || !premResult) return [];
    return calculateCommissionByYear(plan, premResult.annualPremium, term);
  }, [plan, premResult, term]);

  const bonusSlab = useMemo(() => {
    if (!commission) return null;
    return getBonusCommissionRate(commission.firstYearComm);
  }, [commission]);

  const portfolioResult = useMemo(() => {
    if (portfolio.length === 0) return null;
    return calculatePortfolioCommission(portfolio);
  }, [portfolio]);

  useEffect(() => {
    if (commission && premResult) trackCalculation('commission', { plan: plan?.name, term });
  }, [commission, premResult, plan?.name, term]);

  function addToPortfolio() {
    if (!plan || !premResult || !commission) return;
    setPortfolio((prev) => [
      ...prev,
      {
        id: Date.now().toString(36),
        plan,
        annualPremium: premResult.annualPremium,
        term,
        ppt: commission.ppt,
        planName: plan.name,
        sa: sumAssured,
        age,
      },
    ]);
    setShowPortfolio(true);
  }

  function removeFromPortfolio(id) {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
  }

  const shareText = commission
    ? `LIC Agent Commission — ${plan.name}\nPremium: ${formatINR(premResult.annualPremium)}/yr\nFY Commission (${formatPercent(commission.firstYearRate)}): ${formatINR(commission.firstYearComm)}\nRenewal (${formatPercent(commission.renewalRate)}): ${formatINR(commission.renewalComm)}/yr\nTotal over ${term}yr: ${formatINR(commission.totalCommission)}${bonusSlab?.rate > 0 ? `\nBonus (${bonusSlab.label}): ${formatINR(Math.round(commission.firstYearComm * bonusSlab.rate))}` : ""}\n\nCalculated on DoAide InsureKit — insure.doaide.com`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">LIC Commission Calculator</h1>
      <p className="text-white/40 text-sm mb-6">
        Calculate first year, renewal, bonus, and total agent commission
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Plan</label>
            <select className="select-field" value={planId} onChange={(e) => setPlanId(e.target.value)}>
              {commissionPlans.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.tableNo})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Age</label>
            <input type="number" className="input-field" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Sum Assured (₹)</label>
            <input type="number" className="input-field" min={100000} step={100000} value={sumAssured} onChange={(e) => setSumAssured(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Term (years)</label>
            <input type="number" className="input-field" min={10} max={40} value={term} onChange={(e) => setTerm(Number(e.target.value))} />
          </div>
        </div>
      </div>

      {commission && premResult ? (
        <div className="animate-fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <ResultCard label="Annual Premium" value={formatINR(premResult.annualPremium)} />
            <ResultCard label={`FY Commission (${formatPercent(commission.firstYearRate)})`} value={formatINR(commission.firstYearComm)} accent />
            <ResultCard label={`Renewal (${formatPercent(commission.renewalRate)})`} value={formatINR(commission.renewalComm)} sub="Per year" />
            <ResultCard label={`Total (${term} yr)`} value={formatINR(commission.totalCommission)} accent />
          </div>

          {bonusSlab && bonusSlab.rate > 0 && (
            <div className="panel-inner p-4 mb-4 border-l-4 border-l-signal">
              <div className="text-xs text-white/40 uppercase tracking-wide mb-1">Bonus Commission Eligible</div>
              <div className="flex items-baseline gap-2">
                <span className="text-signal font-bold text-lg">{formatINR(Math.round(commission.firstYearComm * bonusSlab.rate))}</span>
                <span className="text-white/40 text-sm">{bonusSlab.label} — {(bonusSlab.rate * 100).toFixed(0)}% of FYC</span>
              </div>
            </div>
          )}

          <div className="panel-inner p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-white/40 uppercase tracking-wide">Commission Structure</div>
              <div className="flex gap-3">
                <button onClick={() => setShowYearwise(!showYearwise)} className="text-xs text-signal hover:text-signal-soft transition-colors">
                  {showYearwise ? "Hide" : "Show"} year-wise
                </button>
                <button onClick={addToPortfolio} className="text-xs text-signal hover:text-signal-soft transition-colors">
                  + Add to portfolio
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Year 1 (First Year)</span>
                <span className="text-white font-medium">{formatPercent(commission.firstYearRate)} = {formatINR(commission.firstYearComm)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Year 2-{term} (Renewal × {commission.renewalYears}yr)</span>
                <span className="text-white font-medium">{formatPercent(commission.renewalRate)} = {formatINR(commission.totalRenewalComm)}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-white/70 font-medium">Total Commission</span>
                <span className="text-signal font-bold">{formatINR(commission.totalCommission)}</span>
              </div>
            </div>
          </div>

          {showYearwise && (
            <div className="panel-inner p-4 mb-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-wide">
                    <th className="text-left py-2 px-2">Year</th>
                    <th className="text-right py-2 px-2">Premium</th>
                    <th className="text-right py-2 px-2">Rate</th>
                    <th className="text-right py-2 px-2">Commission</th>
                    <th className="text-right py-2 px-2">Cumulative</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    let cumulative = 0;
                    return yearwise.map((y) => {
                      cumulative += y.commission;
                      return (
                        <tr key={y.year} className="border-b border-white/5">
                          <td className="py-1.5 px-2 text-white/50">{y.year}</td>
                          <td className="py-1.5 px-2 text-right text-white/70">{formatINR(y.premium)}</td>
                          <td className="py-1.5 px-2 text-right text-white/50">{formatPercent(y.rate)}</td>
                          <td className="py-1.5 px-2 text-right text-white font-medium">{formatINR(y.commission)}</td>
                          <td className="py-1.5 px-2 text-right text-white/40">{formatINR(cumulative)}</td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-end gap-2 mb-6">
            <PrintButton />
            <ShareButtons text={shareText} />
          </div>
        </div>
      ) : (
        <div className="panel-inner p-6 text-center text-white/30 text-sm mb-6">
          Could not calculate commission. Try adjusting inputs.
        </div>
      )}

      {/* Portfolio Section */}
      {showPortfolio && (
        <div className="mb-6 animate-fade-up">
          <h2 className="text-lg font-semibold text-white mb-3">Portfolio Commission</h2>
          {portfolio.length > 0 ? (
            <>
              <div className="space-y-2 mb-4">
                {portfolio.map((p) => (
                  <div key={p.id} className="panel-inner p-3 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-white/70">{p.planName}</span>
                      <span className="text-xs text-white/30 ml-2">Age {p.age} | SA {formatINR(p.sa)} | {p.term}yr</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-white/70">{formatINR(p.annualPremium)}/yr</span>
                      <button onClick={() => removeFromPortfolio(p.id)} className="text-xs text-bad/60 hover:text-bad transition-colors">Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              {portfolioResult && (
                <div className="panel p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <ResultCard label="Policies" value={String(portfolioResult.policyCount)} />
                    <ResultCard label="Total FYC" value={formatINR(portfolioResult.totalFYC)} accent />
                    <ResultCard label="Total Renewal" value={formatINR(portfolioResult.totalRenewal)} />
                    <ResultCard label="Grand Total" value={formatINR(portfolioResult.grandTotal)} accent />
                  </div>

                  <div className="panel-inner p-3">
                    <div className="text-xs text-white/40 uppercase tracking-wide mb-2">Club Qualification</div>
                    <div className="space-y-1.5">
                      {BONUS_COMMISSION_SLABS.filter((s) => s.rate > 0).map((slab) => {
                        const qualified = portfolioResult.totalFYC >= slab.minFYC;
                        const progress = Math.min(100, (portfolioResult.totalFYC / slab.minFYC) * 100);
                        return (
                          <div key={slab.label}>
                            <div className="flex items-center justify-between text-xs mb-0.5">
                              <span className={qualified ? "text-signal font-medium" : "text-white/40"}>{slab.label}</span>
                              <span className={qualified ? "text-good" : "text-white/30"}>
                                {qualified ? "Qualified" : `${formatINR(slab.minFYC - portfolioResult.totalFYC)} more`}
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full transition-all ${qualified ? "bg-signal" : "bg-white/10"}`} style={{ width: `${progress}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {portfolioResult.bonusCommission > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                        <span className="text-sm text-white/70">Bonus Commission ({portfolioResult.bonusSlab.label})</span>
                        <span className="text-signal font-bold">{formatINR(portfolioResult.bonusCommission)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="panel-inner p-6 text-center text-white/30 text-sm">
              No policies in portfolio. Calculate a commission above and click &quot;+ Add to portfolio&quot;.
            </div>
          )}
        </div>
      )}

      {/* Commission Rate Reference */}
      <div className="mb-6">
        <button onClick={() => setShowRateChart(!showRateChart)} className="text-sm text-signal hover:text-signal-soft transition-colors mb-3">
          {showRateChart ? "Hide" : "Show"} Commission Rate Chart
        </button>

        {showRateChart && (
          <div className="panel-inner p-4 overflow-x-auto animate-fade-up">
            <div className="text-xs text-white/40 uppercase tracking-wide mb-3">Commission Rates by Premium Paying Term</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-wide">
                  <th className="text-left py-2 px-2">PPT Range</th>
                  <th className="text-right py-2 px-2">First Year</th>
                  <th className="text-right py-2 px-2">Renewal</th>
                </tr>
              </thead>
              <tbody>
                {COMMISSION_RATES_BY_PPT.map((bracket, i) => {
                  const next = COMMISSION_RATES_BY_PPT[i - 1];
                  const maxPPT = next ? next.minPPT - 1 : "+";
                  return (
                    <tr key={bracket.minPPT} className="border-b border-white/5">
                      <td className="py-2 px-2 text-white/70">{bracket.minPPT}-{maxPPT} years</td>
                      <td className="py-2 px-2 text-right text-signal font-medium">{formatPercent(bracket.firstYear)}</td>
                      <td className="py-2 px-2 text-right text-white/70">{formatPercent(bracket.renewal)}</td>
                    </tr>
                  );
                })}
                <tr className="border-b border-white/5">
                  <td className="py-2 px-2 text-white/70" colSpan={3}>
                    <span className="text-xs text-white/40">Plan-specific overrides:</span>
                  </td>
                </tr>
                {Object.entries(COMMISSION_OVERRIDES).filter(([, v]) => v.firstYear > 0).map(([type, rates]) => (
                  <tr key={type} className="border-b border-white/5">
                    <td className="py-2 px-2 text-white/70 capitalize">{type} plans</td>
                    <td className="py-2 px-2 text-right text-signal font-medium">{formatPercent(rates.firstYear)}</td>
                    <td className="py-2 px-2 text-right text-white/70">{formatPercent(rates.renewal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4">
              <div className="text-xs text-white/40 uppercase tracking-wide mb-2">Bonus Commission Slabs</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BONUS_COMMISSION_SLABS.filter((s) => s.rate > 0).map((slab) => (
                  <div key={slab.label} className="panel p-3 text-center">
                    <div className="text-signal font-bold text-lg">{(slab.rate * 100).toFixed(0)}%</div>
                    <div className="text-xs text-white/40 mt-0.5">{slab.label}</div>
                    <div className="text-[10px] text-white/25">of FYC</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="panel-inner p-3 mb-4 text-xs text-white/30">
        <p>Commission rates as per LIC guidelines (post Oct 2024). FY rate depends on PPT:</p>
        <p className="mt-1">PPT 15+ yr: 25% | 12-14 yr: 20% | 8-11 yr: 15% | 5-7 yr: 10% | Term: 28%</p>
        <p className="mt-1">Renewal: 7.5% (life), 5% (short PPT). Bonus up to 40% of FYC for top performers.</p>
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
