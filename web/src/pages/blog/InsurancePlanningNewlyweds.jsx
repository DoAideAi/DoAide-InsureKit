import { useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../../components/FAQ";

const FAQ_ITEMS = [
  { q: "How much life insurance should a newlywed couple buy?", a: "Each earning spouse should have term insurance of 10-15x their annual income. A non-earning spouse should also be covered for at least 25-50 lakh (their economic contribution to the household). If you plan to have children, increase cover by 40-50 lakh per planned child for education and marriage costs." },
  { q: "Should we buy a joint life insurance policy?", a: "LIC does not offer joint life insurance policies. Each spouse needs their own policy. This is actually better because: (1) each person has appropriate cover for their income, (2) the surviving spouse's policy continues unaffected, and (3) premium is individually tax-deductible under Section 80C." },
  { q: "Is health insurance mandatory for newly married couples?", a: "While not legally mandatory, it is financially essential. A single hospitalisation can cost 2-10 lakh in a private hospital. Buy a family floater of at least 5 lakh immediately after marriage. If your employer provides group health insurance, get a separate policy anyway because employer cover ends if you change jobs." },
  { q: "What percentage of income should we spend on insurance?", a: "A balanced approach: 3-5% of combined household income on term insurance, 3-5% on health insurance, and an additional 5-10% on savings-linked insurance if desired. Total insurance spend should not exceed 15-20% of income. For a couple earning 15 lakh combined, that means around 45,000-75,000 per year on term + health insurance." },
];

export default function BlogInsurancePlanningNewlyweds() {
  useEffect(() => {
    document.title = "Insurance Planning for Newlyweds in India — Complete Guide | InsureKit";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = "Complete insurance planning guide for newly married couples in India. Term insurance, health cover, savings plans, and budget allocation for newlyweds.";

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
        headline: "Insurance Planning for Newlyweds in India — A Complete Guide",
        description: "Complete insurance planning guide for newly married couples in India with practical recommendations and budget allocation.",
        url: "https://insure.doaide.com/blog/insurance-planning-newlyweds",
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
      <h1 className="text-2xl font-bold text-white mt-3 mb-1">Insurance Planning for Newlyweds in India &mdash; A Complete Guide</h1>
      <p className="text-white/40 text-sm mb-8">Updated October 2026 &middot; 10 min read</p>

      <section className="mb-8">
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Marriage is one of life&apos;s biggest milestones, and it changes your <strong className="text-white/80">financial responsibilities overnight</strong>. You now have someone who depends on your income, shared financial goals, and potentially a home loan on the horizon. Insurance planning should be one of the first financial decisions you make together as a couple.</p>
          <p>This guide covers what every newly married couple in India needs: the right mix of life insurance, health insurance, and savings-linked plans, with practical budget recommendations.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Step 1: Assess Your Combined Insurance Needs</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Before buying any policy, sit down together and calculate your <strong className="text-white/80">actual insurance needs</strong>:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white/80">Income replacement:</strong> How much would your spouse need annually if you weren&apos;t around? Multiply by years to retirement.</li>
            <li><strong className="text-white/80">Liabilities:</strong> Home loan, car loan, education loan balances.</li>
            <li><strong className="text-white/80">Future goals:</strong> Children&apos;s education (25L each), marriage (15L each), retirement corpus.</li>
            <li><strong className="text-white/80">Existing cover:</strong> Employer group insurance (usually 2-5x CTC), any policies parents bought for you.</li>
          </ul>
          <p>Use our <Link to="/insurance-needs-calculator" className="text-signal font-semibold">Insurance Needs Calculator</Link> to get a precise number for each spouse.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Step 2: Buy Term Insurance First</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Term insurance is <strong className="text-white/80">non-negotiable</strong> for married couples. It gives maximum cover at the lowest premium. Buy it before any other insurance product.</p>
          <h3 className="text-white/80 font-semibold mt-3">Recommended Cover by Income</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-2">
              <thead><tr className="border-b border-white/10">
                <th className="text-left py-2 px-3 text-white/50 text-xs uppercase">Combined Income</th>
                <th className="text-right py-2 px-3 text-white/50 text-xs uppercase">Earning Spouse Cover</th>
                <th className="text-right py-2 px-3 text-white/50 text-xs uppercase">Est. Premium/yr</th>
              </tr></thead>
              <tbody>
                <tr className="border-t border-white/5"><td className="py-2 px-3">5-8 lakh</td><td className="py-2 px-3 text-right text-signal">75L-1 Cr</td><td className="py-2 px-3 text-right">6,000-9,000</td></tr>
                <tr className="border-t border-white/5"><td className="py-2 px-3">8-15 lakh</td><td className="py-2 px-3 text-right text-signal">1-1.5 Cr</td><td className="py-2 px-3 text-right">9,000-14,000</td></tr>
                <tr className="border-t border-white/5"><td className="py-2 px-3">15-25 lakh</td><td className="py-2 px-3 text-right text-signal">1.5-2.5 Cr</td><td className="py-2 px-3 text-right">14,000-22,000</td></tr>
                <tr className="border-t border-white/5"><td className="py-2 px-3">25 lakh+</td><td className="py-2 px-3 text-right text-signal">2.5-5 Cr</td><td className="py-2 px-3 text-right">22,000-40,000</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">Both spouses should have their own policies. LIC Tech Term (854) and Jeevan Amar (855) are excellent options. Compare them using our <Link to="/tools/term-insurance-compare" className="text-signal">Term Insurance Comparison</Link> tool.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Step 3: Get Health Insurance Immediately</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Don&apos;t wait for your first health scare. <strong className="text-white/80">Buy health insurance within the first month of marriage.</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white/80">Family floater:</strong> 5-10 lakh minimum. Covers both spouses under one policy. Premium: 8,000-15,000/year for a young couple.</li>
            <li><strong className="text-white/80">Super top-up:</strong> 25-50 lakh. Kicks in when the base policy is exhausted. Premium: 3,000-8,000/year.</li>
            <li><strong className="text-white/80">Critical illness cover:</strong> 10-25 lakh. Lump sum on diagnosis of cancer, heart attack, stroke. Premium: 5,000-12,000/year.</li>
          </ul>
          <p>Health insurance premiums qualify for Section 80D deduction: up to 25,000 for self and spouse, plus 25,000-50,000 for parents. See our <Link to="/guides/section-80d-health-insurance" className="text-signal">Section 80D guide</Link>.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Step 4: Add Savings-Linked Plans (Optional)</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>After securing term and health cover, consider an endowment plan for <strong className="text-white/80">forced savings and tax benefits</strong>:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white/80">Jeevan Labh (836):</strong> Limited premium (16-21 years), higher maturity. Good for building a corpus for children or retirement.</li>
            <li><strong className="text-white/80">Jeevan Anand (815):</strong> Endowment + whole life cover. Maturity is paid, then free life cover continues till 100.</li>
            <li><strong className="text-white/80">Dhan Sanchay (871):</strong> Non-linked, non-participating plan with guaranteed additions. Predictable maturity value.</li>
          </ul>
          <p>Keep the Sum Assured modest (5-10 lakh) as the primary purpose is savings, not protection. Use our <Link to="/plan-recommender" className="text-signal">Plan Recommender</Link> to find the best fit.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Sample Insurance Budgets for Newlyweds</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <h3 className="text-white/80 font-semibold">Budget 1: Conservative (Combined income 8L/yr)</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Term insurance: 75L cover = ~6,000/yr</li>
            <li>Health floater: 5L cover = ~8,000/yr</li>
            <li><strong className="text-signal">Total: ~14,000/yr (1.75% of income)</strong></li>
          </ul>

          <h3 className="text-white/80 font-semibold mt-4">Budget 2: Balanced (Combined income 15L/yr)</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Term insurance: 1.5 Cr cover = ~12,000/yr</li>
            <li>Health floater: 10L + 25L top-up = ~15,000/yr</li>
            <li>Endowment (Jeevan Labh 5L SA) = ~25,000/yr</li>
            <li><strong className="text-signal">Total: ~52,000/yr (3.5% of income)</strong></li>
          </ul>

          <h3 className="text-white/80 font-semibold mt-4">Budget 3: Comprehensive (Combined income 25L/yr)</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Term insurance: 2 Cr each spouse = ~30,000/yr</li>
            <li>Health floater: 10L + 50L top-up + CI = ~25,000/yr</li>
            <li>Endowment (Jeevan Anand 10L SA) = ~47,000/yr</li>
            <li><strong className="text-signal">Total: ~1,02,000/yr (4% of income)</strong></li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Common Mistakes to Avoid</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white/80">Relying only on employer insurance:</strong> Employer group cover ends when you leave. Always have your own policy.</li>
            <li><strong className="text-white/80">Buying endowment instead of term:</strong> Endowment plans give 1/10th the cover at the same premium. Buy term first, endowment second.</li>
            <li><strong className="text-white/80">Delaying health insurance:</strong> Pre-existing condition waiting periods are 2-4 years. Buy now when you&apos;re healthy.</li>
            <li><strong className="text-white/80">Over-insuring on savings plans:</strong> Don&apos;t put more than 10% of income into endowment plans. Use SIPs for wealth creation.</li>
            <li><strong className="text-white/80">Ignoring the non-earning spouse:</strong> A homemaker&apos;s contribution has real economic value. Cover them for at least 25-50 lakh.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8 panel p-6 text-center border-signal/20">
        <h2 className="text-lg font-semibold text-white mb-2">Plan Your Insurance Together</h2>
        <p className="text-sm text-white/40 max-w-lg mx-auto mb-4">
          Calculate insurance needs for both spouses and find the right LIC plans for your budget.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link to="/insurance-needs-calculator" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-signal text-white font-semibold text-sm hover:brightness-110 transition-all no-underline">
            Calculate Insurance Needs
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link to="/plan-recommender" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/20 text-white/70 font-semibold text-sm hover:border-signal/40 hover:text-white transition-all no-underline">
            Get Plan Recommendations
          </Link>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
