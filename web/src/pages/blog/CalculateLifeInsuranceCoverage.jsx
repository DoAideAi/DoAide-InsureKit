import { useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../../components/FAQ";

const FAQ_ITEMS = [
  { q: "What is the thumb rule for life insurance cover?", a: "The simplest rule is 10-15 times your annual income. A 30-year-old earning ₹10 lakh/year should have at least ₹1-1.5 crore cover. However, this is a rough estimate — the HLV method or expense-based method gives a more accurate figure." },
  { q: "Should I include my spouse's income in the calculation?", a: "Your life insurance cover should replace YOUR income, not your household income. If both spouses earn, each needs their own life cover based on their individual contribution. If only one earns, the earning spouse needs coverage for the entire family's needs." },
  { q: "Do I need life insurance if I have no dependents?", a: "If no one depends on your income — no spouse, no children, no dependent parents — you technically don't need life insurance. However, buying term insurance while young locks in very low premiums. A 25-year-old can get ₹1 Cr cover for under ₹7,000/year." },
  { q: "How often should I review my life insurance coverage?", a: "Review every 2-3 years or after major life events: marriage, birth of a child, buying a house, salary hike, or job change. Your coverage need increases with dependents and loans but decreases as children grow up and loans get repaid." },
  { q: "Should I reduce coverage as I age?", a: "Generally yes. As you build wealth, pay off loans, and children become independent, your insurance need decreases. A 50-year-old with grown children and no debt may need only ₹25-50 lakh cover vs ₹1-2 Cr at age 30. This is called the 'decreasing need' approach." },
];

export default function BlogCalculateLifeInsuranceCoverage() {
  useEffect(() => {
    document.title = "How to Calculate Your Life Insurance Coverage Need | InsureKit";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = "Learn how to calculate the right life insurance coverage using the income multiplier, HLV, and expense methods. Step-by-step examples for Indian salaried professionals with calculators.";

    let script = document.getElementById("blog-ld-json");
    if (!script) {
      script = document.createElement("script");
      script.id = "blog-ld-json";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: "How to Calculate Your Life Insurance Coverage Need",
        description: "Step-by-step guide to calculating the right life insurance coverage using income multiplier, HLV, and expense-based methods with Indian examples.",
        url: "https://insure.doaide.com/blog/calculate-life-insurance-coverage",
        datePublished: "2026-10-10",
        dateModified: "2026-10-10",
        author: { "@type": "Organization", name: "DoAide" },
        publisher: { "@type": "Organization", name: "DoAide", url: "https://doaide.com" },
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://insure.doaide.com/blog/calculate-life-insurance-coverage" },
        image: "https://insure.doaide.com/og-image.png",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map(i => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      },
    ]);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  return (
    <div className="animate-fade-up">
      <span className="text-[10px] px-2 py-0.5 rounded bg-signal/10 text-signal font-medium uppercase tracking-wide">
        Planning Guide
      </span>
      <h1 className="text-2xl font-bold text-white mt-3 mb-1">How to Calculate Your Life Insurance Coverage Need</h1>
      <p className="text-white/40 text-sm mb-8">Updated October 2026 &middot; 13 min read</p>

      <section className="mb-8">
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>The biggest mistake in life insurance is <strong className="text-white/80">buying the wrong cover amount</strong>. Too little, and your family faces financial hardship. Too much, and you&apos;re paying unnecessary premiums. This guide walks you through three proven methods to calculate exactly how much life insurance you need.</p>
          <p>Skip the reading and use our <Link to="/insurance-needs-calculator" className="text-signal">Insurance Needs Calculator</Link> for an instant, personalised recommendation. Or continue reading to understand the logic so you can validate any agent&apos;s suggestion.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Why Getting the Cover Right Matters</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Consider this scenario: A 35-year-old earning ₹12 lakh/year with a ₹40 lakh home loan, two school-age children, and dependent parents. If they have only ₹25 lakh life cover (a common endowment SA):</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>₹25 lakh − ₹40 lakh home loan = <strong className="text-white/80">family in negative</strong></li>
            <li>No money for children&apos;s education (₹20-50 lakh each)</li>
            <li>No monthly income replacement for the surviving spouse</li>
            <li>Parents&apos; medical expenses unaccounted for</li>
          </ul>
          <p>Correct cover for this person: approximately <strong className="text-signal">₹1.5-2 crore</strong>. Available via LIC Tech Term for about ₹12,000/year — less than ₹1,000/month for complete peace of mind.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Method 1: Income Multiplier (Quick Estimate)</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>The simplest approach — multiply your annual income by a factor:</p>
          <div className="panel overflow-hidden mt-2">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-white/50 text-xs uppercase">Age Group</th>
                    <th className="text-center py-2 px-3 text-white/50 text-xs uppercase">Multiplier</th>
                    <th className="text-center py-2 px-3 text-white/50 text-xs uppercase">Example (₹10L income)</th>
                  </tr>
                </thead>
                <tbody className="text-white/60">
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">25-30 years</td><td className="py-2 px-3 text-center text-signal font-semibold">15×</td><td className="py-2 px-3 text-center">₹1.5 Cr</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">30-35 years</td><td className="py-2 px-3 text-center text-signal font-semibold">12-15×</td><td className="py-2 px-3 text-center">₹1.2-1.5 Cr</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">35-40 years</td><td className="py-2 px-3 text-center text-signal font-semibold">10-12×</td><td className="py-2 px-3 text-center">₹1-1.2 Cr</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">40-45 years</td><td className="py-2 px-3 text-center text-signal font-semibold">8-10×</td><td className="py-2 px-3 text-center">₹80L-1 Cr</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">45-50 years</td><td className="py-2 px-3 text-center text-signal font-semibold">5-8×</td><td className="py-2 px-3 text-center">₹50-80L</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-2"><strong className="text-white/80">Pros:</strong> Quick, easy to calculate mentally. Good starting point for any conversation.</p>
          <p><strong className="text-white/80">Cons:</strong> Ignores loans, existing cover, number of dependents, and specific future goals. Can over-insure or under-insure significantly.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Method 2: Human Life Value (HLV) — The Gold Standard</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>HLV calculates the <strong className="text-white/80">present value of your future income</strong> minus personal expenses. This is the economic loss your family would suffer if you were no longer here.</p>
          <p><strong className="text-white/80">Formula:</strong></p>
          <div className="p-3 rounded-lg bg-white/[0.03] font-mono text-xs">
            HLV = Annual Income × (1 − Personal Expense Ratio) × Present Value Factor
          </div>
          <p className="mt-2"><strong className="text-white/80">Step-by-step example:</strong></p>
          <div className="space-y-2 mt-1">
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">1.</span>
              <div>Annual income: <strong className="text-white/80">₹12,00,000</strong></div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">2.</span>
              <div>Personal expenses (30% of income): <strong className="text-white/80">₹3,60,000</strong></div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">3.</span>
              <div>Net family income: ₹12,00,000 − ₹3,60,000 = <strong className="text-white/80">₹8,40,000/year</strong></div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">4.</span>
              <div>Years to retirement (age 30 → 60): <strong className="text-white/80">30 years</strong></div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">5.</span>
              <div>Discount rate (assume 6% inflation-adjusted): Present value factor ≈ <strong className="text-white/80">17.3</strong></div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">6.</span>
              <div>HLV = ₹8,40,000 × 17.3 = <strong className="text-signal">₹1,45,32,000 ≈ ₹1.45 Cr</strong></div>
            </div>
          </div>
          <p className="mt-2"><strong className="text-white/80">Pros:</strong> More accurate than income multiplier. Accounts for personal spending and remaining working years.</p>
          <p><strong className="text-white/80">Cons:</strong> Still ignores specific liabilities (loans) and goals (education).</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Method 3: Expense-Based (Most Comprehensive)</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>This is the <strong className="text-white/80">most accurate method</strong> — it adds up every specific financial need and subtracts existing resources. Financial planners and insurance advisors prefer this approach.</p>
          <p><strong className="text-white/80">What to add:</strong></p>
          <div className="space-y-2 mt-1">
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">A.</span>
              <div><strong className="text-white/80">Family living expenses:</strong> Monthly household expenses × 12 × years until youngest child is independent. Example: ₹50,000/month × 12 × 20 years = <strong className="text-white/80">₹1.2 Cr</strong> (adjust for inflation)</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">B.</span>
              <div><strong className="text-white/80">Outstanding loans:</strong> Home loan (₹40L) + car loan (₹5L) + education loan (₹3L) = <strong className="text-white/80">₹48L</strong></div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">C.</span>
              <div><strong className="text-white/80">Children&apos;s education:</strong> Engineering/medical/MBA: ₹20-50L per child. Two children = <strong className="text-white/80">₹50-100L</strong></div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">D.</span>
              <div><strong className="text-white/80">Children&apos;s marriage:</strong> ₹10-25L per child. Two children = <strong className="text-white/80">₹20-50L</strong></div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">E.</span>
              <div><strong className="text-white/80">Parents&apos; care:</strong> Medical + living expenses if they depend on you = <strong className="text-white/80">₹20-30L</strong></div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">F.</span>
              <div><strong className="text-white/80">Emergency fund:</strong> 6 months of expenses = <strong className="text-white/80">₹3-5L</strong></div>
            </div>
          </div>
          <p className="mt-2"><strong className="text-white/80">What to subtract:</strong></p>
          <div className="space-y-2 mt-1">
            <div className="flex items-start gap-2">
              <span className="text-white/40 mt-0.5 font-bold">−</span>
              <div>Existing life insurance cover (employer group + personal policies)</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/40 mt-0.5 font-bold">−</span>
              <div>Savings and investments (FD, MF, PPF, EPF, NPS)</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-white/40 mt-0.5 font-bold">−</span>
              <div>Spouse&apos;s earning capacity (if applicable)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Worked Example: 32-Year-Old IT Professional</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p><strong className="text-white/80">Profile:</strong> Rahul, 32, earning ₹15 lakh/year. Wife homemaker, two children (ages 3 and 6). Home loan ₹35 lakh, car loan ₹4 lakh. Parents dependent. Employer cover ₹10 lakh. Savings: ₹8 lakh in MF + ₹5 lakh in PPF + ₹4 lakh EPF.</p>
          <div className="panel overflow-hidden mt-2">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-white/50 text-xs uppercase">Need</th>
                    <th className="text-right py-2 px-3 text-white/50 text-xs uppercase">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="text-white/60">
                  <tr className="border-t border-white/5"><td className="py-2 px-3">Family expenses (₹60K/mo × 12 × 18 yrs)</td><td className="py-2 px-3 text-right">1,29,60,000</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3">Outstanding loans</td><td className="py-2 px-3 text-right">39,00,000</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3">Children&apos;s education (₹30L × 2)</td><td className="py-2 px-3 text-right">60,00,000</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3">Children&apos;s marriage (₹15L × 2)</td><td className="py-2 px-3 text-right">30,00,000</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3">Parents&apos; care</td><td className="py-2 px-3 text-right">25,00,000</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3">Emergency fund</td><td className="py-2 px-3 text-right">4,00,000</td></tr>
                  <tr className="border-t border-white/5 font-semibold text-white/80"><td className="py-2 px-3">Total need</td><td className="py-2 px-3 text-right">2,87,60,000</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3">Less: employer cover</td><td className="py-2 px-3 text-right text-red-400">−10,00,000</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3">Less: savings (MF + PPF + EPF)</td><td className="py-2 px-3 text-right text-red-400">−17,00,000</td></tr>
                  <tr className="border-t border-white/10 font-bold text-signal"><td className="py-2.5 px-3">Insurance cover needed</td><td className="py-2.5 px-3 text-right">2,60,60,000</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-2">Rahul needs approximately <strong className="text-signal">₹2.6 crore</strong> cover. Rounding up, a <strong className="text-white/80">₹2.5-3 Cr term plan</strong> is appropriate. LIC Tech Term for ₹3 Cr at age 32, 28-year term, would cost approximately ₹18,000-22,000/year.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">When to Increase or Decrease Coverage</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p><strong className="text-white/80">Increase cover when:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>You get married (spouse becomes dependent)</li>
            <li>A child is born (15-25 years of financial responsibility added)</li>
            <li>You take a home loan or large debt</li>
            <li>Your income increases significantly (lifestyle inflation means higher family expenses)</li>
            <li>Parents become financially dependent on you</li>
          </ul>
          <p className="mt-2"><strong className="text-white/80">Decrease cover when:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Children become financially independent</li>
            <li>Home loan and major debts are paid off</li>
            <li>You build significant wealth (investments, property, retirement corpus)</li>
            <li>Spouse starts earning sufficiently</li>
            <li>You approach retirement with adequate savings</li>
          </ul>
          <p className="mt-2"><strong className="text-white/80">Pro tip for LIC agents:</strong> Suggest a &ldquo;laddering strategy&rdquo; — buy two or three smaller term plans instead of one large one. For example, instead of one ₹2 Cr plan for 30 years, buy ₹1 Cr for 30 years + ₹75L for 20 years + ₹25L for 10 years. As loans get repaid and children grow, the shorter-term policies expire naturally, reducing coverage and cost.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Quick Coverage Checklist</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <div className="space-y-2">
            <div className="flex items-start gap-2"><span className="text-signal">✓</span><div>Calculate using at least two methods (income multiplier + expense-based)</div></div>
            <div className="flex items-start gap-2"><span className="text-signal">✓</span><div>Include ALL outstanding loans (home, car, personal, education)</div></div>
            <div className="flex items-start gap-2"><span className="text-signal">✓</span><div>Account for children&apos;s education AND marriage costs (adjust for inflation)</div></div>
            <div className="flex items-start gap-2"><span className="text-signal">✓</span><div>Subtract existing cover and liquid investments (don&apos;t double-count)</div></div>
            <div className="flex items-start gap-2"><span className="text-signal">✓</span><div>Choose term that covers until youngest child is independent (usually 20-25 years)</div></div>
            <div className="flex items-start gap-2"><span className="text-signal">✓</span><div>Round UP to the nearest ₹25 lakh or ₹50 lakh (better to over-insure slightly)</div></div>
            <div className="flex items-start gap-2"><span className="text-signal">✓</span><div>Review coverage every 2-3 years or after major life events</div></div>
          </div>
        </div>
      </section>

      <section className="mb-8 panel p-6 text-center border-signal/20">
        <h2 className="text-lg font-semibold text-white mb-2">Calculate Your Exact Coverage Need</h2>
        <p className="text-sm text-white/40 max-w-lg mx-auto mb-4">
          Enter your income, expenses, loans, and goals — get a precise life insurance cover recommendation in seconds.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link to="/insurance-needs-calculator" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-signal text-white font-semibold text-sm hover:brightness-110 transition-all no-underline">
            Insurance Needs Calculator
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link to="/premium-calculator" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/20 text-white/70 font-semibold text-sm hover:border-signal/40 hover:text-white transition-all no-underline">
            Get Premium Quote
          </Link>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
