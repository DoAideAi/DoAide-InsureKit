import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import FAQ from "../components/FAQ";
import WhatsAppShare from "../components/WhatsAppShare";
import { calculateInsuranceNeeds } from "../utils/calcInsuranceNeeds";

const FAQ_ITEMS = [
  {
    q: "How much life insurance do I need?",
    a: "A common rule of thumb is 10-15 times your annual income. However, the exact amount depends on your dependents, liabilities, existing savings, and future financial goals. This calculator provides a more accurate estimate by considering all these factors.",
  },
  {
    q: "Does this calculator include health insurance needs?",
    a: "No, this calculator focuses on life insurance (sum assured). For health insurance, IRDAI recommends a cover of at least ₹5-10 lakh per family member. You should have both life insurance and health insurance.",
  },
  {
    q: "Should I buy one large policy or multiple smaller ones?",
    a: "Multiple policies can be useful: a term plan for the main cover, and an endowment plan for savings + additional cover. However, one large term plan is cheaper. Use our Plan Recommender for personalized suggestions.",
  },
];

function fmt(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function InsuranceNeedsCalculator() {
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(800000);
  const [dependents, setDependents] = useState(2);
  const [childrenCount, setChildrenCount] = useState(1);
  const [outstandingLoans, setOutstandingLoans] = useState(0);
  const [existingCover, setExistingCover] = useState(0);
  const [savings, setSavings] = useState(0);
  const [retirementAge, setRetirementAge] = useState(60);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const resultRef = useRef(null);

  const result = useMemo(() => calculateInsuranceNeeds({
    age, income, dependents, childrenCount, outstandingLoans, existingCover, savings, retirementAge,
  }), [age, income, dependents, childrenCount, outstandingLoans, existingCover, savings, retirementAge]);

  const {
    yearsToRetire, incomeReplacement, childEducation, childMarriage,
    emergencyFund, funeralAndSettlement, totalNeeds, recommendedCover: roundedCover, multiplier,
  } = result;

  useEffect(() => {
    document.title = "Insurance Needs Calculator — How Much Cover Do You Need? | InsureKit";
  }, []);

  const shareText = `My Insurance Needs Analysis (InsureKit):\n\n` +
    `Age: ${age} | Income: ${fmt(income)}/yr\n` +
    `Dependents: ${dependents} | Children: ${childrenCount}\n\n` +
    `Recommended Cover: ${fmt(roundedCover)} (${multiplier}x income)\n\n` +
    `Breakdown:\n` +
    `• Income Replacement: ${fmt(incomeReplacement)}\n` +
    (childrenCount > 0 ? `• Child Education: ${fmt(childEducation)}\n• Child Marriage: ${fmt(childMarriage)}\n` : "") +
    `• Emergency Fund: ${fmt(emergencyFund)}\n` +
    `• Funeral & Settlement: ${fmt(funeralAndSettlement)}\n` +
    `• Total Needs: ${fmt(totalNeeds)}\n` +
    (existingCover > 0 ? `• Existing Cover: -${fmt(existingCover)}\n` : "") +
    (savings > 0 ? `• Savings: -${fmt(savings)}\n` : "") +
    `\nCalculate yours free: https://insure.doaide.com/insurance-needs-calculator`;

  function handleDownloadPDF() {
    const printContent = resultRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`<!DOCTYPE html><html><head>
      <title>Insurance Needs Analysis — InsureKit</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; color: #1a1a1d; padding: 0 20px; }
        h1 { color: #0D9488; font-size: 22px; margin-bottom: 4px; }
        .subtitle { color: #666; font-size: 13px; margin-bottom: 24px; }
        .cover-box { background: #f0fdfa; border: 2px solid #0D9488; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px; }
        .cover-amount { font-size: 36px; font-weight: bold; color: #0D9488; }
        .cover-sub { color: #888; font-size: 13px; margin-top: 4px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { text-align: left; padding: 8px 12px; background: #f5f5f5; border-bottom: 1px solid #ddd; font-size: 13px; color: #666; text-transform: uppercase; }
        td { padding: 8px 12px; border-bottom: 1px solid #eee; font-size: 14px; }
        td:last-child { text-align: right; font-variant-numeric: tabular-nums; }
        .total td { font-weight: bold; border-top: 2px solid #0D9488; }
        .deduct td { color: #c0392b; }
        .final td { font-weight: bold; color: #0D9488; font-size: 16px; border-top: 2px solid #0D9488; }
        .params { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; margin-bottom: 24px; font-size: 13px; }
        .params div { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #f0f0f0; }
        .params .label { color: #888; }
        .disclaimer { color: #999; font-size: 11px; margin-top: 24px; text-align: center; border-top: 1px solid #eee; padding-top: 12px; }
        .branding { text-align: center; color: #0D9488; font-weight: bold; margin-top: 16px; font-size: 13px; }
        @media print { body { margin: 20px; } }
      </style>
    </head><body>
      <h1>Insurance Needs Analysis</h1>
      <div class="subtitle">Generated on ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} | insure.doaide.com</div>

      <div class="cover-box">
        <div style="font-size: 12px; color: #888; text-transform: uppercase;">Recommended Cover</div>
        <div class="cover-amount">${fmt(roundedCover)}</div>
        <div class="cover-sub">${multiplier}x annual income</div>
      </div>

      <div class="params">
        <div><span class="label">Age</span><span>${age} years</span></div>
        <div><span class="label">Annual Income</span><span>${fmt(income)}</span></div>
        <div><span class="label">Dependents</span><span>${dependents}</span></div>
        <div><span class="label">Children</span><span>${childrenCount}</span></div>
        <div><span class="label">Retirement Age</span><span>${retirementAge}</span></div>
        <div><span class="label">Years to Retire</span><span>${yearsToRetire}</span></div>
        ${outstandingLoans > 0 ? `<div><span class="label">Outstanding Loans</span><span>${fmt(outstandingLoans)}</span></div>` : ""}
        ${existingCover > 0 ? `<div><span class="label">Existing Cover</span><span>${fmt(existingCover)}</span></div>` : ""}
        ${savings > 0 ? `<div><span class="label">Savings</span><span>${fmt(savings)}</span></div>` : ""}
      </div>

      <table>
        <thead><tr><th>Component</th><th style="text-align:right">Amount</th></tr></thead>
        <tbody>
          <tr><td>Income Replacement (${yearsToRetire} yrs × 70%)</td><td>${fmt(incomeReplacement)}</td></tr>
          ${childrenCount > 0 ? `<tr><td>Child Education (${childrenCount} × ₹25L)</td><td>${fmt(childEducation)}</td></tr>
          <tr><td>Child Marriage (${childrenCount} × ₹15L)</td><td>${fmt(childMarriage)}</td></tr>` : ""}
          ${outstandingLoans > 0 ? `<tr><td>Outstanding Loans</td><td>${fmt(outstandingLoans)}</td></tr>` : ""}
          <tr><td>Emergency Fund (2yr income)</td><td>${fmt(emergencyFund)}</td></tr>
          <tr><td>Funeral & Settlement</td><td>${fmt(funeralAndSettlement)}</td></tr>
          <tr class="total"><td>Total Needs</td><td>${fmt(totalNeeds)}</td></tr>
          ${existingCover > 0 ? `<tr class="deduct"><td>− Existing Cover</td><td>${fmt(existingCover)}</td></tr>` : ""}
          ${savings > 0 ? `<tr class="deduct"><td>− Savings / Investments</td><td>${fmt(savings)}</td></tr>` : ""}
          <tr class="final"><td>Additional Cover Needed</td><td>${fmt(roundedCover)}</td></tr>
        </tbody>
      </table>

      <div class="disclaimer">This is an indicative estimate. Consult a financial advisor before making insurance decisions.</div>
      <div class="branding">DoAide InsureKit — insure.doaide.com</div>
    </body></html>`);
    printWindow.document.close();
    printWindow.print();
  }

  function handleEmailSubmit(e) {
    e.preventDefault();
    if (!email) return;
    try {
      const leads = JSON.parse(localStorage.getItem("insurekit_leads") || "[]");
      leads.push({
        email,
        source: "insurance-needs-calculator",
        recommendedCover: roundedCover,
        age,
        income,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("insurekit_leads", JSON.stringify(leads));
    } catch {}
    setEmailSubmitted(true);
  }

  return (
    <div className="animate-fade-up">
      <SEOHead
        title="Insurance Needs Calculator — How Much Cover Do You Need? | InsureKit"
        description="Calculate your ideal life insurance coverage based on age, income, dependents, and liabilities. Free insurance needs calculator by InsureKit."
        canonical="https://insure.doaide.com/insurance-needs-calculator"
      />

      <h1 className="text-2xl font-bold text-white mb-1">Insurance Needs Calculator</h1>
      <p className="text-white/40 text-sm mb-6">
        Find out how much life insurance cover you need based on your income, dependents, and financial goals.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Your Age</label>
            <input type="number" min={18} max={65} value={age} onChange={(e) => setAge(+e.target.value)} className="input-field" style={{ fontSize: "16px", minHeight: "44px" }} />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Annual Income (₹)</label>
            <input type="number" min={0} step={50000} value={income} onChange={(e) => setIncome(+e.target.value)} className="input-field" style={{ fontSize: "16px", minHeight: "44px" }} />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Number of Dependents</label>
            <input type="number" min={0} max={10} value={dependents} onChange={(e) => setDependents(+e.target.value)} className="input-field" style={{ fontSize: "16px", minHeight: "44px" }} />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Number of Children</label>
            <input type="number" min={0} max={5} value={childrenCount} onChange={(e) => setChildrenCount(+e.target.value)} className="input-field" style={{ fontSize: "16px", minHeight: "44px" }} />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Outstanding Loans (₹)</label>
            <input type="number" min={0} step={100000} value={outstandingLoans} onChange={(e) => setOutstandingLoans(+e.target.value)} className="input-field" style={{ fontSize: "16px", minHeight: "44px" }} />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Existing Life Insurance Cover (₹)</label>
            <input type="number" min={0} step={100000} value={existingCover} onChange={(e) => setExistingCover(+e.target.value)} className="input-field" style={{ fontSize: "16px", minHeight: "44px" }} />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Existing Savings / Investments (₹)</label>
            <input type="number" min={0} step={100000} value={savings} onChange={(e) => setSavings(+e.target.value)} className="input-field" style={{ fontSize: "16px", minHeight: "44px" }} />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wide mb-1">Planned Retirement Age</label>
            <input type="number" min={45} max={70} value={retirementAge} onChange={(e) => setRetirementAge(+e.target.value)} className="input-field" style={{ fontSize: "16px", minHeight: "44px" }} />
          </div>
        </div>

        <div className="space-y-4" ref={resultRef}>
          <div className="panel p-6 text-center">
            <div className="text-xs text-white/40 uppercase tracking-wide mb-1">Recommended Cover</div>
            <div className="text-signal text-3xl font-bold">{fmt(roundedCover)}</div>
            <div className="text-xs text-white/30 mt-1">{multiplier}x your annual income</div>
          </div>

          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Needs Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Income Replacement ({yearsToRetire} yrs × 70%)</span>
                <span className="text-white/70">{fmt(incomeReplacement)}</span>
              </div>
              {childrenCount > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-white/50">Child Education ({childrenCount} × ₹25L)</span>
                    <span className="text-white/70">{fmt(childEducation)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Child Marriage ({childrenCount} × ₹15L)</span>
                    <span className="text-white/70">{fmt(childMarriage)}</span>
                  </div>
                </>
              )}
              {outstandingLoans > 0 && (
                <div className="flex justify-between">
                  <span className="text-white/50">Outstanding Loans</span>
                  <span className="text-white/70">{fmt(outstandingLoans)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-white/50">Emergency Fund (2yr income)</span>
                <span className="text-white/70">{fmt(emergencyFund)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Funeral &amp; Settlement</span>
                <span className="text-white/70">{fmt(funeralAndSettlement)}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-semibold">
                <span className="text-white/60">Total Needs</span>
                <span className="text-white">{fmt(totalNeeds)}</span>
              </div>
              {(existingCover > 0 || savings > 0) && (
                <>
                  {existingCover > 0 && (
                    <div className="flex justify-between text-bad/70">
                      <span>− Existing Cover</span>
                      <span>{fmt(existingCover)}</span>
                    </div>
                  )}
                  {savings > 0 && (
                    <div className="flex justify-between text-bad/70">
                      <span>− Savings / Investments</span>
                      <span>{fmt(savings)}</span>
                    </div>
                  )}
                </>
              )}
              <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                <span className="text-signal">Additional Cover Needed</span>
                <span className="text-signal">{fmt(roundedCover)}</span>
              </div>
            </div>
          </div>

          <div className="panel-inner p-4">
            <h3 className="text-sm font-semibold text-white mb-2">Suggested Plan Mix</h3>
            <div className="text-sm text-white/60 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-signal mt-0.5">1.</span>
                <div>
                  <strong className="text-white/80">Term Plan</strong> — {fmt(roundedCover)} cover
                  <div className="text-xs text-white/40">LIC Tech Term (854) — cheapest way to get full cover</div>
                </div>
              </div>
              {income >= 500000 && (
                <div className="flex items-start gap-2">
                  <span className="text-signal mt-0.5">2.</span>
                  <div>
                    <strong className="text-white/80">Endowment Plan</strong> — ₹5-10L SA
                    <div className="text-xs text-white/40">Jeevan Labh (836) — guaranteed savings + tax benefits</div>
                  </div>
                </div>
              )}
              {childrenCount > 0 && (
                <div className="flex items-start gap-2">
                  <span className="text-signal mt-0.5">{income >= 500000 ? "3." : "2."}</span>
                  <div>
                    <strong className="text-white/80">Child Plan</strong> — ₹5-10L SA
                    <div className="text-xs text-white/40">Amritbaal (874) — dedicated child education planning</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="panel-inner p-4">
            <h3 className="text-sm font-semibold text-white mb-2">Health Insurance Recommendation</h3>
            <div className="text-sm text-white/60 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-signal mt-0.5">1.</span>
                <div>
                  <strong className="text-white/80">Family Floater</strong> — {dependents <= 2 ? "5-10L" : "10-15L"} cover
                  <div className="text-xs text-white/40">Covers hospitalization for self, spouse &amp; children</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-signal mt-0.5">2.</span>
                <div>
                  <strong className="text-white/80">Super Top-up</strong> — 25-50L cover
                  <div className="text-xs text-white/40">Kicks in when base policy exhausts — very low premium</div>
                </div>
              </div>
              {age >= 35 && (
                <div className="flex items-start gap-2">
                  <span className="text-signal mt-0.5">3.</span>
                  <div>
                    <strong className="text-white/80">Critical Illness</strong> — 10-25L cover
                    <div className="text-xs text-white/40">Lump sum on diagnosis of cancer, heart attack, stroke</div>
                  </div>
                </div>
              )}
              <div className="text-xs text-white/40 mt-2 pt-2 border-t border-white/5">
                Health premiums qualify for Section 80D deduction up to 1L/year.{" "}
                <Link to="/guides/section-80d-health-insurance" className="text-signal">Learn more &rarr;</Link>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <WhatsAppShare text={shareText} />
            <button onClick={handleDownloadPDF} className="btn-secondary text-sm inline-flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download PDF
            </button>
          </div>

          {!emailSubmitted ? (
            <div className="panel p-4 border-signal/30 border">
              <h3 className="text-sm font-semibold text-signal mb-1">Get Personalized Recommendations</h3>
              <p className="text-xs text-white/40 mb-3">
                Enter your email and we'll send you a detailed plan comparison tailored to your needs.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field flex-1"
                  style={{ fontSize: "16px", minHeight: "44px" }}
                />
                <button type="submit" className="btn-primary text-sm whitespace-nowrap">
                  Get Recommendations
                </button>
              </form>
            </div>
          ) : (
            <div className="panel p-4 border-green-500/30 border text-center">
              <div className="text-green-400 font-semibold text-sm mb-1">Thank you!</div>
              <p className="text-xs text-white/40">
                We'll send personalized plan recommendations to your email shortly.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Link to="/premium-calculator" className="btn-primary no-underline text-sm">
              Calculate Premium
            </Link>
            <Link to="/plan-recommender" className="btn-secondary no-underline text-sm">
              Get Plan Recommendations
            </Link>
            <Link to="/tools/term-insurance-compare" className="btn-secondary no-underline text-sm">
              Compare Term Plans
            </Link>
          </div>
        </div>
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
