import { useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../../components/FAQ";

const FAQ_ITEMS = [
  { q: "Is term insurance a waste if I survive the term?", a: "No. Term insurance is like car insurance or health insurance. You pay for financial protection during the years your family needs it most. The low premium means you can invest the difference in SIPs or PPF and build significantly more wealth than any whole life or endowment plan would return." },
  { q: "Can I convert a term plan into an endowment plan later?", a: "LIC does not allow conversion between plan types. However, you can buy a separate endowment plan alongside your term plan. Many advisors recommend a portfolio approach: a large term plan for protection and a smaller endowment or whole life plan for savings." },
  { q: "What happens to LIC whole life cover after age 100?", a: "Jeevan Umang (845) pays the Sum Assured + accrued bonus as a lump sum at age 100, effectively acting as a maturity benefit. The policyholder receives annual survival benefits (8% of SA) from the end of the premium paying term until then." },
  { q: "Which is better for tax saving: term or whole life?", a: "Both qualify for Section 80C deduction on premiums (up to 1.5 lakh/year under old regime). Whole life plans have an advantage: their maturity/survival benefits are tax-free under Section 10(10D), while term plans have no maturity benefit. However, the premium saved by choosing term can be invested in ELSS or PPF for additional 80C benefit." },
];

export default function BlogTermVsWholeLife() {
  useEffect(() => {
    document.title = "Term vs Whole Life Insurance: Which is Right for You? | InsureKit";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = "Compare term insurance vs whole life plans in India. LIC Tech Term vs Jeevan Umang — premiums, benefits, returns, and which is right for your needs.";

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
        headline: "Term vs Whole Life Insurance: Which is Right for You in 2026?",
        description: "Detailed comparison of term and whole life insurance plans in India with premium examples and recommendations.",
        url: "https://insure.doaide.com/blog/term-vs-whole-life-insurance",
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
        Comparison Guide
      </span>
      <h1 className="text-2xl font-bold text-white mt-3 mb-1">Term vs Whole Life Insurance: Which is Right for You in 2026?</h1>
      <p className="text-white/40 text-sm mb-8">Updated October 2026 &middot; 12 min read</p>

      <section className="mb-8">
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>The most fundamental choice in life insurance: <strong className="text-white/80">term insurance</strong> (pure protection at the lowest cost) versus <strong className="text-white/80">whole life insurance</strong> (lifelong cover with savings). Both have clear advantages, and the right choice depends on your financial goals, budget, and risk appetite.</p>
          <p>This guide compares LIC&apos;s best options in both categories with premium examples for a 30-year-old. Use our <Link to="/tools/term-insurance-compare" className="text-signal">Term Insurance Comparison</Link> tool or <Link to="/premium-calculator" className="text-signal">Premium Calculator</Link> for personalized quotes.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">What is Term Insurance?</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Term insurance provides a <strong className="text-white/80">death benefit only</strong> for a specified period (the &ldquo;term&rdquo;). If the policyholder survives the term, nothing is paid. This makes it the cheapest form of life insurance.</p>
          <p><strong className="text-white/80">LIC Options:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white/80">LIC Tech Term (854):</strong> Online-only term plan with competitive premiums. Available for ages 18-65, terms 10-40 years.</li>
            <li><strong className="text-white/80">LIC Jeevan Amar (855):</strong> Offline term plan with level and increasing cover options. Available for ages 18-65.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">What is Whole Life Insurance?</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Whole life insurance provides <strong className="text-white/80">lifelong coverage</strong> (typically till age 100) with a savings component. It builds cash value through bonuses and pays survival benefits.</p>
          <p><strong className="text-white/80">LIC&apos;s Best Option:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white/80">LIC Jeevan Umang (845):</strong> Whole life plan with annual survival benefits of 8% of SA after the premium paying term. At 100, pays SA + vested bonus.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Head-to-Head Comparison</h2>
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-3 text-white/50 text-xs uppercase">Feature</th>
                  <th className="text-center py-3 px-3 text-white/50 text-xs uppercase">Term (Tech Term 854)</th>
                  <th className="text-center py-3 px-3 text-white/50 text-xs uppercase">Whole Life (Jeevan Umang 845)</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Cover Period</td><td className="py-2.5 px-3 text-center">10-40 years</td><td className="py-2.5 px-3 text-center">Till age 100</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Annual Premium (30yr, 1Cr SA)</td><td className="py-2.5 px-3 text-center text-signal font-semibold">~9,000</td><td className="py-2.5 px-3 text-center">~4,50,000</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Death Benefit</td><td className="py-2.5 px-3 text-center">Sum Assured</td><td className="py-2.5 px-3 text-center">SA + Bonus</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Maturity Benefit</td><td className="py-2.5 px-3 text-center">None</td><td className="py-2.5 px-3 text-center">SA + Vested Bonus at 100</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Survival Benefits</td><td className="py-2.5 px-3 text-center">None</td><td className="py-2.5 px-3 text-center">8% of SA yearly</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Bonus</td><td className="py-2.5 px-3 text-center">Not applicable</td><td className="py-2.5 px-3 text-center">SRB + FAB</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Loan Facility</td><td className="py-2.5 px-3 text-center">No</td><td className="py-2.5 px-3 text-center">Yes, after 3 years</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Tax Benefit (80C)</td><td className="py-2.5 px-3 text-center">Yes</td><td className="py-2.5 px-3 text-center">Yes</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Best For</td><td className="py-2.5 px-3 text-center text-signal">Maximum cover, low cost</td><td className="py-2.5 px-3 text-center text-signal">Lifelong cover + income</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">When to Choose Term Insurance</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white/80">Young families with dependents:</strong> You need maximum cover at the lowest cost. A 30-year-old can get 1 Cr cover for under 10,000/year.</li>
            <li><strong className="text-white/80">Home loan borrowers:</strong> Match the term plan cover to your loan balance. If something happens, the loan won&apos;t burden your family.</li>
            <li><strong className="text-white/80">Disciplined investors:</strong> If you can invest the premium difference in mutual funds via SIP, the &ldquo;term + SIP&rdquo; strategy creates 3-5x more wealth than any endowment or whole life plan.</li>
            <li><strong className="text-white/80">Budget-conscious buyers:</strong> When every rupee counts, term insurance gives the most protection per rupee spent.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">When to Choose Whole Life Insurance</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white/80">Estate planning:</strong> If you want to leave a guaranteed legacy for heirs regardless of when you pass away.</li>
            <li><strong className="text-white/80">Retirement income supplement:</strong> Jeevan Umang&apos;s 8% annual survival benefit can supplement retirement income after premiums are fully paid.</li>
            <li><strong className="text-white/80">Guaranteed savings:</strong> If you prefer the discipline of forced savings with guaranteed returns, whole life insurance ensures you don&apos;t spend what you should save.</li>
            <li><strong className="text-white/80">Tax-free income:</strong> Survival benefits are tax-free under Section 10(10D), making it attractive for those in higher tax brackets.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">The Smart Approach: Combine Both</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Most financial advisors recommend a <strong className="text-white/80">combination approach</strong>:</p>
          <div className="space-y-2 mt-2">
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">1.</span>
              <div><strong className="text-white/80">Large term plan</strong> for adequate protection (10-15x income)</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">2.</span>
              <div><strong className="text-white/80">Smaller whole life or endowment plan</strong> for guaranteed savings and tax benefits</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">3.</span>
              <div><strong className="text-white/80">SIP in equity mutual funds</strong> with the money saved on premiums for wealth creation</div>
            </div>
          </div>
          <p className="mt-2">For example, a 30-year-old earning 10L/year could get: Tech Term (1 Cr cover, ~9,000/yr) + Jeevan Umang (10L cover, ~45,000/yr) + SIP of 4,000/month in an index fund. Total outgo: ~1 lakh/year for complete protection + savings + wealth creation.</p>
        </div>
      </section>

      <section className="mb-8 panel p-6 text-center border-signal/20">
        <h2 className="text-lg font-semibold text-white mb-2">Compare Plans for Your Age &amp; Budget</h2>
        <p className="text-sm text-white/40 max-w-lg mx-auto mb-4">
          Get exact premium quotes for term and whole life plans based on your age, sum assured, and preferred term.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link to="/tools/term-insurance-compare" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-signal text-white font-semibold text-sm hover:brightness-110 transition-all no-underline">
            Compare Term Plans
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link to="/premium-calculator" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/20 text-white/70 font-semibold text-sm hover:border-signal/40 hover:text-white transition-all no-underline">
            Premium Calculator
          </Link>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
