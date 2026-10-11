import { useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../../components/FAQ";

const FAQ_ITEMS = [
  { q: "What is the thumb rule for life insurance cover?", a: "The simplest thumb rule is 10-15 times your annual income. A 30-year-old earning 10 lakh per year should have at least 1-1.5 crore life cover. However, this doesn't account for existing assets, liabilities, or specific goals. Use the Human Life Value (HLV) method for a more accurate number." },
  { q: "Should I include my spouse's income when calculating cover?", a: "Calculate cover based on the income your family would lose if you were no longer around. If both spouses earn, each needs separate cover based on their individual contribution. A non-earning spouse also has economic value (childcare, household management) and may need a smaller cover of 25-50 lakh." },
  { q: "How often should I review my life insurance cover?", a: "Review every 2-3 years or after major life events: marriage, birth of a child, home purchase, salary hike, or loan closure. Your insurance needs change as responsibilities grow and then reduce as children become independent and loans get paid off." },
  { q: "Is term insurance enough, or do I need endowment too?", a: "Term insurance gives the highest cover at the lowest premium and should be the foundation of your insurance portfolio. An endowment plan like Jeevan Labh (836) can supplement it for disciplined savings and tax benefits. Never rely on endowment alone for protection as the cover is usually inadequate." },
];

export default function BlogHowMuchLifeInsurance() {
  useEffect(() => {
    document.title = "How Much Life Insurance Do You Really Need in 2026? | InsureKit";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = "Calculate the right life insurance cover using income multiplier, HLV, and expense methods. Practical examples for different income levels in India.";

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
        "@type": "Article",
        headline: "How Much Life Insurance Do You Really Need in 2026?",
        description: "Calculate the right life insurance cover using income multiplier, HLV, and expense methods with practical examples.",
        url: "https://insure.doaide.com/blog/how-much-life-insurance",
        datePublished: "2026-10-10",
        dateModified: "2026-10-10",
        publisher: { "@type": "Organization", name: "DoAide" },
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
        Insurance Planning
      </span>
      <h1 className="text-2xl font-bold text-white mt-3 mb-1">How Much Life Insurance Do You Really Need in 2026?</h1>
      <p className="text-white/40 text-sm mb-8">Updated October 2026 &middot; 10 min read</p>

      <section className="mb-8">
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>One of the most common mistakes Indian policyholders make is buying <strong className="text-white/80">too little life insurance</strong>. IRDAI data shows the average life insurance cover in India is just 10-15% of what families actually need. The result? Financial hardship for dependents when the unexpected happens.</p>
          <p>This guide covers three proven methods to calculate your ideal cover, with practical examples at different income levels. Use our <Link to="/insurance-needs-calculator" className="text-signal">Insurance Needs Calculator</Link> for a personalized assessment.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Method 1: Income Multiplier Rule</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>The simplest approach: multiply your annual income by a factor based on your age.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-2">
              <thead><tr className="border-b border-white/10">
                <th className="text-left py-2 px-3 text-white/50 text-xs uppercase">Age Group</th>
                <th className="text-right py-2 px-3 text-white/50 text-xs uppercase">Multiplier</th>
                <th className="text-right py-2 px-3 text-white/50 text-xs uppercase">Example (Income: 10L)</th>
              </tr></thead>
              <tbody>
                <tr className="border-t border-white/5"><td className="py-2 px-3">25-30 years</td><td className="py-2 px-3 text-right">15-20x</td><td className="py-2 px-3 text-right text-signal">1.5-2 Cr</td></tr>
                <tr className="border-t border-white/5"><td className="py-2 px-3">31-40 years</td><td className="py-2 px-3 text-right">12-15x</td><td className="py-2 px-3 text-right text-signal">1.2-1.5 Cr</td></tr>
                <tr className="border-t border-white/5"><td className="py-2 px-3">41-50 years</td><td className="py-2 px-3 text-right">8-12x</td><td className="py-2 px-3 text-right text-signal">80L-1.2 Cr</td></tr>
                <tr className="border-t border-white/5"><td className="py-2 px-3">51-60 years</td><td className="py-2 px-3 text-right">5-8x</td><td className="py-2 px-3 text-right text-signal">50-80L</td></tr>
              </tbody>
            </table>
          </div>
          <p>This is a quick estimate. It works well for salaried individuals with moderate liabilities but doesn&apos;t account for specific needs like home loans or children&apos;s education.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Method 2: Human Life Value (HLV)</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>The HLV method calculates the present value of your future income, minus personal expenses. It&apos;s more accurate than the multiplier rule.</p>
          <p><strong className="text-white/80">Formula:</strong> HLV = Annual Income &times; (1 - Personal Expense Ratio) &times; Years to Retirement</p>
          <p>Assuming 30% personal expenses and 6% discount rate:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-2">
              <thead><tr className="border-b border-white/10">
                <th className="text-left py-2 px-3 text-white/50 text-xs uppercase">Profile</th>
                <th className="text-right py-2 px-3 text-white/50 text-xs uppercase">Annual Income</th>
                <th className="text-right py-2 px-3 text-white/50 text-xs uppercase">HLV Estimate</th>
              </tr></thead>
              <tbody>
                <tr className="border-t border-white/5"><td className="py-2 px-3">30 yrs, salaried</td><td className="py-2 px-3 text-right">5 lakh</td><td className="py-2 px-3 text-right text-signal">73 lakh</td></tr>
                <tr className="border-t border-white/5"><td className="py-2 px-3">30 yrs, salaried</td><td className="py-2 px-3 text-right">10 lakh</td><td className="py-2 px-3 text-right text-signal">1.46 Cr</td></tr>
                <tr className="border-t border-white/5"><td className="py-2 px-3">30 yrs, salaried</td><td className="py-2 px-3 text-right">20 lakh</td><td className="py-2 px-3 text-right text-signal">2.92 Cr</td></tr>
                <tr className="border-t border-white/5"><td className="py-2 px-3">40 yrs, salaried</td><td className="py-2 px-3 text-right">10 lakh</td><td className="py-2 px-3 text-right text-signal">97 lakh</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Method 3: Expense-Based / Needs Analysis</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>The most comprehensive method. It adds up all your family&apos;s financial needs and subtracts existing resources:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white/80">Income replacement:</strong> 70% of annual income &times; years to retirement</li>
            <li><strong className="text-white/80">Children&apos;s education:</strong> 25 lakh per child (graduation + post-graduation)</li>
            <li><strong className="text-white/80">Children&apos;s marriage:</strong> 15 lakh per child</li>
            <li><strong className="text-white/80">Outstanding loans:</strong> Home loan, car loan, personal loan balances</li>
            <li><strong className="text-white/80">Emergency fund:</strong> 2 years of income</li>
            <li><strong className="text-white/80">Funeral &amp; settlement expenses:</strong> 5 lakh</li>
          </ul>
          <p>Then subtract: existing life insurance + savings + investments + EPF/PPF balance.</p>
          <p>Our <Link to="/insurance-needs-calculator" className="text-signal font-semibold">Insurance Needs Calculator</Link> uses this exact method to give you a personalized recommendation in seconds.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Practical Examples</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <h3 className="text-white/80 font-semibold">Example 1: Ramesh, 30 years, Income 5L/yr</h3>
          <p>2 dependents, 1 child, no loans, no existing cover. Needs: Income replacement (5L &times; 30 &times; 0.7 = 1.05 Cr) + child costs (40L) + emergency (10L) + settlement (5L) = <strong className="text-signal">1.60 Cr</strong></p>
          <p><em>Recommendation:</em> LIC Tech Term (854) for 1.5 Cr + Jeevan Labh for 10L savings plan.</p>

          <h3 className="text-white/80 font-semibold mt-4">Example 2: Priya, 35 years, Income 10L/yr</h3>
          <p>3 dependents, 2 children, 30L home loan, 20L existing cover. Needs: 1.75 Cr income + 80L children + 20L emergency + 30L loans + 5L settlement - 20L existing = <strong className="text-signal">2.90 Cr</strong></p>
          <p><em>Recommendation:</em> Top up term cover to 3 Cr. Consider family floater health insurance of 10L.</p>

          <h3 className="text-white/80 font-semibold mt-4">Example 3: Vikram, 28 years, Income 20L/yr</h3>
          <p>1 dependent (spouse), no children yet, 50L home loan. Needs: 20L &times; 32 &times; 0.7 + 50L + 40L + 5L = <strong className="text-signal">5.39 Cr</strong></p>
          <p><em>Recommendation:</em> 5 Cr term plan now. Increase cover when children arrive.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Don&apos;t Forget Health Insurance</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Life insurance covers the financial loss from death. But a medical emergency can be equally devastating. IRDAI recommends every family have:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white/80">Family floater:</strong> minimum 5-10 lakh per family</li>
            <li><strong className="text-white/80">Super top-up:</strong> 25-50 lakh for major hospitalization</li>
            <li><strong className="text-white/80">Critical illness:</strong> 10-25 lakh for cancer, heart disease, stroke</li>
          </ul>
          <p>Health insurance premiums qualify for Section 80D deduction up to 1 lakh per year. Read our <Link to="/guides/section-80d-health-insurance" className="text-signal">Section 80D guide</Link>.</p>
        </div>
      </section>

      <section className="mb-8 panel p-6 text-center border-signal/20">
        <h2 className="text-lg font-semibold text-white mb-2">Calculate Your Insurance Need</h2>
        <p className="text-sm text-white/40 max-w-lg mx-auto mb-4">
          Enter your age, income, dependents, and liabilities to get a personalized recommendation in 30 seconds.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link to="/insurance-needs-calculator" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-signal text-white font-semibold text-sm hover:brightness-110 transition-all no-underline">
            Try Insurance Needs Calculator
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link to="/tools/term-insurance-compare" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/20 text-white/70 font-semibold text-sm hover:border-signal/40 hover:text-white transition-all no-underline">
            Compare Term Plans
          </Link>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
