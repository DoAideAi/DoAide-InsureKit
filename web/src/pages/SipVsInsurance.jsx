import { useState, useMemo, useEffect } from "react";
import { formatINR, formatLakh } from "../utils/format";
import ResultCard from "../components/ResultCard";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackCalculation } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Enter your budget", desc: "Monthly amount you can spend on insurance + investment" },
  { title: "Set term & cover", desc: "Policy term, life cover needed, and expected SIP returns" },
  { title: "Compare strategies", desc: "See endowment vs term + SIP — returns, cover, and wealth gap" },
];

const FAQ_ITEMS = [
  { q: "Why is Term + SIP better than Endowment?", a: "Endowment plans combine insurance and investment, but return only 4-6% IRR. A term plan gives the same life cover at 1/10th the premium, and the saved amount invested in SIP at 12% CAGR creates 3-5× more wealth over the same period." },
  { q: "What if the market crashes?", a: "Even at conservative 8% SIP returns, Term + SIP beats endowment plans. Over 15-20 year horizons, equity SIPs have historically delivered 12-15% CAGR in India. Use the 'Conservative' preset to see the worst-case comparison." },
  { q: "Is there any risk in this strategy?", a: "Endowment gives guaranteed (but low) returns. SIP returns are market-linked and not guaranteed. However, the premium difference is so large that even with lower SIP returns, the total wealth is usually higher. Diversify across 2-3 good index funds." },
  { q: "What about the tax benefits?", a: "Both endowment premiums and term plan premiums qualify for Section 80C deduction up to ₹1.5 lakh. ELSS mutual funds also qualify for 80C. So tax benefits are comparable in both strategies." },
  { q: "Should I surrender my existing endowment policy?", a: "If you've paid premiums for less than 3 years, you'll get nothing on surrender. After 3+ years, compare the surrender value vs continuing. Use InsureKit's Surrender Calculator to check. Generally, if more than 5 years remain, switching to Term + SIP is worth evaluating." },
  { q: "What SIP return should I assume?", a: "Historically, Nifty 50 has returned ~12% CAGR over 15+ year periods. Large-cap index funds are a safe choice. Use 10% for moderate estimates, 8% for conservative. Never assume more than 14%." },
];

function computeSIP(monthlyAmount, annualRate, years) {
  const monthlyRate = annualRate / 12;
  const months = years * 12;
  if (monthlyRate === 0) return monthlyAmount * months;
  return monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
}

function computeEndowmentMaturity(annualPremium, term, irrRate) {
  let fv = 0;
  for (let y = 1; y <= term; y++) {
    fv += annualPremium * Math.pow(1 + irrRate, term - y);
  }
  return fv;
}

const TERM_PREMIUM_PER_LAKH = {
  20: { 25: 600, 30: 550, 35: 700, 40: 1000 },
  25: { 25: 650, 30: 600, 35: 800, 40: 1200 },
  30: { 25: 750, 30: 700, 35: 1000, 40: 1500 },
};

function getTermPremium(age, termYears, coverLakh) {
  const termBucket = termYears <= 22 ? 20 : termYears <= 27 ? 25 : 30;
  const ageBucket = age <= 27 ? 25 : age <= 32 ? 30 : age <= 37 ? 35 : 40;
  const rates = TERM_PREMIUM_PER_LAKH[termBucket] || TERM_PREMIUM_PER_LAKH[25];
  const ratePerLakh = rates[ageBucket] || rates[30];
  return ratePerLakh * coverLakh;
}

export default function SipVsInsurance() {
  const [monthlyBudget, setMonthlyBudget] = useState(10000);
  const [age, setAge] = useState(30);
  const [term, setTerm] = useState(20);
  const [coverCr, setCoverCr] = useState(1);
  const [sipReturn, setSipReturn] = useState(12);
  const [endowmentIRR, setEndowmentIRR] = useState(5);

  const result = useMemo(() => {
    const annualBudget = monthlyBudget * 12;
    const coverLakh = coverCr * 100;
    const termPremiumAnnual = getTermPremium(age, term, coverLakh);
    const termPremiumMonthly = Math.round(termPremiumAnnual / 12);
    const sipMonthly = monthlyBudget - termPremiumMonthly;

    if (sipMonthly <= 0) {
      return { error: "Term premium exceeds your budget. Increase budget or reduce cover." };
    }

    const sipCorpus = computeSIP(sipMonthly, sipReturn / 100, term);
    const totalSipInvested = sipMonthly * term * 12;
    const totalTermPaid = termPremiumAnnual * term;

    const endowmentMaturity = computeEndowmentMaturity(annualBudget, term, endowmentIRR / 100);
    const totalEndowmentPaid = annualBudget * term;

    const wealthGap = sipCorpus - endowmentMaturity;
    const sipMultiple = endowmentMaturity > 0 ? sipCorpus / endowmentMaturity : 0;

    return {
      termPremiumMonthly,
      termPremiumAnnual,
      sipMonthly,
      sipCorpus: Math.round(sipCorpus),
      totalSipInvested: Math.round(totalSipInvested),
      totalTermPaid: Math.round(totalTermPaid),
      sipWealth: Math.round(sipCorpus),
      endowmentMaturity: Math.round(endowmentMaturity),
      totalEndowmentPaid: Math.round(totalEndowmentPaid),
      wealthGap: Math.round(wealthGap),
      sipMultiple: sipMultiple.toFixed(1),
      coverAmount: coverCr * 10000000,
    };
  }, [monthlyBudget, age, term, coverCr, sipReturn, endowmentIRR]);

  const whatsappText = result.error
    ? ""
    : `*SIP vs Insurance — Term+SIP Strategy*
Budget: ${formatINR(monthlyBudget)}/month | Age: ${age} | Term: ${term} yrs

*Strategy 1: Term + SIP*
• Term premium: ${formatINR(result.termPremiumMonthly)}/mo (₹${coverCr} Cr cover)
• SIP amount: ${formatINR(result.sipMonthly)}/mo @ ${sipReturn}%
• Total wealth after ${term} yrs: ${formatLakh(result.sipWealth)}

*Strategy 2: Endowment Plan*
• Premium: ${formatINR(monthlyBudget)}/mo
• Maturity value @ ${endowmentIRR}% IRR: ${formatLakh(result.endowmentMaturity)}

*Wealth Gap: ${formatLakh(result.wealthGap)} more with Term+SIP (${result.sipMultiple}×)*

Calculated on insure.doaide.com/sip-vs-insurance`;

  useEffect(() => {
    if (result && !result.error) trackCalculation('sip-vs-insurance', { term, sipReturn });
  }, [result, term, sipReturn]);

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">SIP vs Insurance Returns Calculator</h1>
      <p className="text-sm text-white/40 mb-6">
        Compare endowment plan maturity vs term insurance + SIP strategy. See why separating insurance and investment creates more wealth.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6 space-y-4">
        <div>
          <label className="block text-xs text-white/40 mb-1">Monthly Budget (₹)</label>
          <input type="number" className="input-field" min={1000} step={1000} value={monthlyBudget} onChange={(e) => setMonthlyBudget(Number(e.target.value))} />
          <div className="flex gap-2 mt-2 flex-wrap">
            {[5000, 10000, 15000, 20000, 25000].map((v) => (
              <button key={v} className={`text-xs px-3 py-1 rounded-full border ${monthlyBudget === v ? "border-signal text-signal" : "border-white/10 text-white/40 hover:border-white/30"}`} onClick={() => setMonthlyBudget(v)}>₹{(v / 1000)}K</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1">Your Age</label>
            <input type="number" className="input-field" min={18} max={55} value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1">Term (years)</label>
            <input type="number" className="input-field" min={10} max={35} value={term} onChange={(e) => setTerm(Number(e.target.value))} />
          </div>
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">Life Cover (₹ Crore)</label>
          <input type="number" className="input-field" min={0.25} max={5} step={0.25} value={coverCr} onChange={(e) => setCoverCr(Number(e.target.value))} />
          <div className="flex gap-2 mt-2 flex-wrap">
            {[0.5, 1, 1.5, 2].map((v) => (
              <button key={v} className={`text-xs px-3 py-1 rounded-full border ${coverCr === v ? "border-signal text-signal" : "border-white/10 text-white/40 hover:border-white/30"}`} onClick={() => setCoverCr(v)}>₹{v} Cr</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1">Expected SIP Return (%)</label>
            <input type="number" className="input-field" min={6} max={18} step={0.5} value={sipReturn} onChange={(e) => setSipReturn(Number(e.target.value))} />
            <div className="flex gap-2 mt-2 flex-wrap">
              {[{ l: "Conservative", v: 8 }, { l: "Moderate", v: 10 }, { l: "Historical", v: 12 }].map((p) => (
                <button key={p.v} className={`text-xs px-3 py-1 rounded-full border ${sipReturn === p.v ? "border-signal text-signal" : "border-white/10 text-white/40 hover:border-white/30"}`} onClick={() => setSipReturn(p.v)}>{p.l}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1">Endowment IRR (%)</label>
            <input type="number" className="input-field" min={3} max={8} step={0.5} value={endowmentIRR} onChange={(e) => setEndowmentIRR(Number(e.target.value))} />
            <div className="flex gap-2 mt-2 flex-wrap">
              {[{ l: "Low", v: 4 }, { l: "Average", v: 5 }, { l: "Best", v: 6 }].map((p) => (
                <button key={p.v} className={`text-xs px-3 py-1 rounded-full border ${endowmentIRR === p.v ? "border-signal text-signal" : "border-white/10 text-white/40 hover:border-white/30"}`} onClick={() => setEndowmentIRR(p.v)}>{p.l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {result.error ? (
        <div className="panel p-5 text-center text-red-400 text-sm">{result.error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="panel p-5">
              <h2 className="text-sm font-medium text-signal uppercase tracking-wide mb-4">Strategy 1: Term + SIP</h2>
              <div className="space-y-3">
                <ResultCard label="Term Premium" value={`${formatINR(result.termPremiumMonthly)}/mo`} sub={`₹${coverCr} Cr life cover`} />
                <ResultCard label="SIP Amount" value={`${formatINR(result.sipMonthly)}/mo`} sub={`@ ${sipReturn}% CAGR`} />
                <ResultCard label={`Wealth after ${term} years`} value={formatLakh(result.sipWealth)} accent sub={`Invested: ${formatLakh(result.totalSipInvested)}`} />
                <ResultCard label="Life Cover" value={formatLakh(result.coverAmount)} sub="Active throughout term" />
              </div>
            </div>

            <div className="panel p-5">
              <h2 className="text-sm font-medium text-white/50 uppercase tracking-wide mb-4">Strategy 2: Endowment</h2>
              <div className="space-y-3">
                <ResultCard label="Premium" value={`${formatINR(monthlyBudget)}/mo`} sub="Entire budget goes to premium" />
                <ResultCard label="Locked-in" value="100%" sub="No flexibility or liquidity" />
                <ResultCard label={`Maturity after ${term} years`} value={formatLakh(result.endowmentMaturity)} sub={`@ ${endowmentIRR}% IRR`} />
                <ResultCard label="Life Cover" value={formatLakh(monthlyBudget * 12 * 10)} sub="~10× annual premium (typical)" />
              </div>
            </div>
          </div>

          <div className="panel p-5 mb-6 text-center">
            <div className="text-xs text-white/40 uppercase tracking-wide mb-2">Wealth Gap</div>
            <div className="text-3xl font-bold text-signal">{formatLakh(result.wealthGap)}</div>
            <div className="text-sm text-white/50 mt-1">
              Term + SIP creates <span className="text-signal font-semibold">{result.sipMultiple}×</span> more wealth than endowment
            </div>
          </div>

          <div className="panel p-5 mb-6">
            <h2 className="text-sm font-medium text-white uppercase tracking-wide mb-3">Year-by-Year Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white/40 border-b border-white/10">
                    <th className="text-left py-2 pr-3">Year</th>
                    <th className="text-right py-2 pr-3">SIP Corpus</th>
                    <th className="text-right py-2 pr-3">Endowment Value</th>
                    <th className="text-right py-2">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {[5, 10, 15, 20, 25, 30].filter((y) => y <= term).map((y) => {
                    const sipVal = computeSIP(result.sipMonthly, sipReturn / 100, y);
                    const endVal = computeEndowmentMaturity(monthlyBudget * 12, y, endowmentIRR / 100);
                    return (
                      <tr key={y} className="border-b border-white/5">
                        <td className="py-2 pr-3 text-white/60">{y}</td>
                        <td className="py-2 pr-3 text-right text-signal">{formatLakh(sipVal)}</td>
                        <td className="py-2 pr-3 text-right text-white/50">{formatLakh(endVal)}</td>
                        <td className="py-2 text-right text-white/70">{formatLakh(sipVal - endVal)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel p-5 mb-6">
            <h2 className="text-sm font-medium text-white uppercase tracking-wide mb-3">Key Takeaway</h2>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex gap-2"><span className="text-signal">•</span>Endowment plans mix insurance + investment, giving poor returns on both</li>
              <li className="flex gap-2"><span className="text-signal">•</span>Term insurance gives {formatLakh(result.coverAmount)} cover for just {formatINR(result.termPremiumMonthly)}/month</li>
              <li className="flex gap-2"><span className="text-signal">•</span>The remaining {formatINR(result.sipMonthly)}/month in SIP grows to {formatLakh(result.sipWealth)} in {term} years</li>
              <li className="flex gap-2"><span className="text-signal">•</span>Even at conservative returns, Term + SIP beats endowment</li>
            </ul>
          </div>

          <div className="flex gap-3 mb-6">
            <ShareButtons text={whatsappText} />
            <PrintButton />
          </div>
        </>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
