import { useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../../components/FAQ";

const FAQ_ITEMS = [
  { q: "Which is the best LIC term insurance plan in 2026?", a: "LIC Tech Term (854) is the best online-only term plan with competitive premiums. For offline purchase, Jeevan Amar (855) offers level and increasing cover options. Jeevan Kiran (875) is ideal if you want return of premiums on survival." },
  { q: "Is LIC term insurance cheaper than private insurers?", a: "LIC term premiums are slightly higher than the cheapest private plans (HDFC Click2Protect, Max Life Smart Secure). However, LIC's claim settlement ratio of 98.6% and brand trust make the small premium difference worthwhile for many buyers." },
  { q: "Can I buy LIC term insurance online?", a: "Yes. LIC Tech Term (854) is available exclusively online through licindia.in. You get lower premiums (no agent commission) and instant issuance for eligible applicants. Medical tests may still be required based on age and sum assured." },
  { q: "What riders can I add to LIC term plans?", a: "LIC term plans support Accidental Death Benefit (ADB) Rider and Term Rider. Jeevan Amar also supports Premium Waiver on Disability. Rider premiums attract 18% GST (vs 4.5% on base premium). Use our Rider Premium Calculator for exact costs." },
  { q: "What happens if I survive the LIC term insurance period?", a: "For pure term plans like Tech Term (854) and Jeevan Amar (855), nothing is paid on survival — that is why premiums are so low. If you want premiums returned on survival, consider Jeevan Kiran (875) which refunds 100% of premiums paid (excluding GST)." },
];

export default function BlogLicTermInsurancePlans2026() {
  useEffect(() => {
    document.title = "LIC Term Insurance Plans 2026: Complete Comparison Guide | InsureKit";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = "Compare all LIC term insurance plans in 2026 — Tech Term 854, Jeevan Amar 855, Jeevan Kiran 875. Premium comparison, features, riders, claim ratio, and buying guide.";

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
        headline: "LIC Term Insurance Plans 2026: Complete Comparison Guide",
        description: "Compare all LIC term insurance plans in 2026 — Tech Term 854, Jeevan Amar 855, Jeevan Kiran 875. Premium comparison, features, riders, and buying guide.",
        url: "https://insure.doaide.com/blog/lic-term-insurance-plans-2026",
        datePublished: "2026-10-10",
        dateModified: "2026-10-10",
        author: { "@type": "Organization", name: "DoAide" },
        publisher: { "@type": "Organization", name: "DoAide", url: "https://doaide.com" },
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://insure.doaide.com/blog/lic-term-insurance-plans-2026" },
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
        Comparison Guide
      </span>
      <h1 className="text-2xl font-bold text-white mt-3 mb-1">LIC Term Insurance Plans 2026: Complete Comparison Guide</h1>
      <p className="text-white/40 text-sm mb-8">Updated October 2026 &middot; 14 min read</p>

      <section className="mb-8">
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Term insurance is the <strong className="text-white/80">most affordable form of life insurance</strong> — it provides a large death benefit at a fraction of the cost of endowment or whole life plans. LIC offers three distinct term insurance plans in 2026, each serving a different buyer profile.</p>
          <p>This guide compares all three LIC term plans head-to-head with premium examples, features, riders, and recommendations. Use our <Link to="/tools/term-insurance-compare" className="text-signal">Term Insurance Comparison</Link> tool to compare with private insurers or the <Link to="/premium-calculator" className="text-signal">Premium Calculator</Link> for exact LIC quotes.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">LIC&apos;s 3 Term Insurance Plans at a Glance</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>LIC currently offers three term insurance plans, each with a distinct value proposition:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white/80">LIC Tech Term (Plan 854):</strong> Online-only term plan with the lowest premiums. No agent commission means savings passed to the buyer. Available for ages 18-65, terms 10-40 years, minimum SA 50 lakh.</li>
            <li><strong className="text-white/80">LIC Jeevan Amar (Plan 855):</strong> Offline term plan with both level and increasing cover options. Available for ages 18-65, terms 10-40 years. Can be purchased through any LIC agent.</li>
            <li><strong className="text-white/80">LIC Jeevan Kiran (Plan 875):</strong> Term plan with return of premiums on survival. If you outlive the policy term, all premiums (excluding GST and rider premiums) are returned. Available for ages 18-55, terms 15-40 years.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Premium Comparison — 30-Year-Old Male, ₹1 Crore Cover, 30-Year Term</h2>
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-3 text-white/50 text-xs uppercase">Feature</th>
                  <th className="text-center py-3 px-3 text-white/50 text-xs uppercase">Tech Term (854)</th>
                  <th className="text-center py-3 px-3 text-white/50 text-xs uppercase">Jeevan Amar (855)</th>
                  <th className="text-center py-3 px-3 text-white/50 text-xs uppercase">Jeevan Kiran (875)</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Annual Premium</td><td className="py-2.5 px-3 text-center text-signal font-semibold">~₹8,900</td><td className="py-2.5 px-3 text-center">~₹11,200</td><td className="py-2.5 px-3 text-center">~₹28,500</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Purchase Mode</td><td className="py-2.5 px-3 text-center">Online only</td><td className="py-2.5 px-3 text-center">Offline (agent)</td><td className="py-2.5 px-3 text-center">Offline (agent)</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Cover Options</td><td className="py-2.5 px-3 text-center">Level cover</td><td className="py-2.5 px-3 text-center">Level + Increasing</td><td className="py-2.5 px-3 text-center">Level cover</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Survival Benefit</td><td className="py-2.5 px-3 text-center">None</td><td className="py-2.5 px-3 text-center">None</td><td className="py-2.5 px-3 text-center text-signal font-semibold">Return of premiums</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Min Sum Assured</td><td className="py-2.5 px-3 text-center">₹50 lakh</td><td className="py-2.5 px-3 text-center">₹25 lakh</td><td className="py-2.5 px-3 text-center">₹25 lakh</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Max Entry Age</td><td className="py-2.5 px-3 text-center">65 years</td><td className="py-2.5 px-3 text-center">65 years</td><td className="py-2.5 px-3 text-center">55 years</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Term Range</td><td className="py-2.5 px-3 text-center">10-40 years</td><td className="py-2.5 px-3 text-center">10-40 years</td><td className="py-2.5 px-3 text-center">15-40 years</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Claim Settlement</td><td className="py-2.5 px-3 text-center">98.6%</td><td className="py-2.5 px-3 text-center">98.6%</td><td className="py-2.5 px-3 text-center">98.6%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">LIC Tech Term (854) — Detailed Analysis</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p><strong className="text-white/80">Best for:</strong> Budget-conscious buyers who are comfortable purchasing online and want the lowest possible premium for maximum coverage.</p>
          <p>Tech Term is LIC&apos;s <strong className="text-white/80">online-exclusive term plan</strong> launched to compete with private insurer digital term plans. Since there is no agent commission involved, the premiums are 15-25% lower than Jeevan Amar.</p>
          <p><strong className="text-white/80">Key advantages:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Lowest premium among LIC term plans — under ₹9,000/year for 1 Cr cover at age 30</li>
            <li>Two death benefit payout options: lump sum or monthly income</li>
            <li>SA rebate for higher cover amounts (₹75L+ and ₹1Cr+)</li>
            <li>Backed by LIC&apos;s 98.6% claim settlement ratio — highest volume insurer in India</li>
          </ul>
          <p><strong className="text-white/80">Limitations:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Online-only purchase — no agent assistance during buying</li>
            <li>Minimum SA of ₹50 lakh (not suitable for small-cover needs)</li>
            <li>Only level cover available (no increasing cover option)</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">LIC Jeevan Amar (855) — Detailed Analysis</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p><strong className="text-white/80">Best for:</strong> Buyers who want agent assistance, need lower minimum cover, or want increasing cover to fight inflation.</p>
          <p>Jeevan Amar is LIC&apos;s <strong className="text-white/80">traditional offline term plan</strong> with more flexibility than Tech Term. The standout feature is the <strong className="text-white/80">increasing cover option</strong> — the sum assured increases by 10% every year (simple) for the first 5 years, meaning a ₹1 Cr policy becomes ₹1.5 Cr by year 5.</p>
          <p><strong className="text-white/80">Key advantages:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Available through agents — get guidance on cover calculation and form filling</li>
            <li>Increasing cover option fights inflation without buying a new policy</li>
            <li>Lower minimum SA of ₹25 lakh — accessible for smaller budgets</li>
            <li>Premium waiver on disability rider available</li>
          </ul>
          <p><strong className="text-white/80">Limitations:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>15-25% higher premiums than Tech Term due to agent commission</li>
            <li>Increasing cover option costs about 20% more than level cover</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">LIC Jeevan Kiran (875) — Detailed Analysis</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p><strong className="text-white/80">Best for:</strong> Buyers who want life cover but also want their money back if they survive the policy term. Ideal for those who feel &ldquo;term insurance is a waste if I survive.&rdquo;</p>
          <p>Jeevan Kiran is a <strong className="text-white/80">Term Return of Premium (TROP) plan</strong> — it works exactly like a regular term plan, but if you survive the policy term, LIC refunds 100% of the base premiums paid (excluding GST and rider premiums).</p>
          <p><strong className="text-white/80">Key advantages:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full return of premiums on survival — eliminates the &ldquo;waste of money&rdquo; perception</li>
            <li>Same death benefit as pure term plans during the policy term</li>
            <li>Good selling point for agents when clients resist pure term insurance</li>
            <li>Section 80C tax benefit on premiums + 10(10D) exemption on survival payout</li>
          </ul>
          <p><strong className="text-white/80">Limitations:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Premiums are 2.5-3× higher than pure term plans like Tech Term</li>
            <li>Lower maximum entry age (55 vs 65 for other term plans)</li>
            <li>Premium returned has no interest — at 6% inflation, the real value erodes significantly over 30 years</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">How Much Term Cover Do You Need?</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>The standard formula for calculating adequate term insurance cover:</p>
          <div className="space-y-2 mt-2">
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">1.</span>
              <div><strong className="text-white/80">Income replacement:</strong> 10-15× your annual income (provides for family expenses for 10-15 years)</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">2.</span>
              <div><strong className="text-white/80">Add outstanding loans:</strong> Home loan + car loan + personal loans + education loans</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">3.</span>
              <div><strong className="text-white/80">Add future goals:</strong> Children&apos;s education (₹25-50 lakh per child) + children&apos;s marriage (₹10-20 lakh per child)</div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-signal mt-0.5 font-bold">4.</span>
              <div><strong className="text-white/80">Subtract existing cover:</strong> Employer group cover + existing life insurance + investments that can be liquidated</div>
            </div>
          </div>
          <p className="mt-2"><strong className="text-white/80">Example:</strong> A 30-year-old earning ₹12 lakh/year with a ₹40 lakh home loan and 2 children needs approximately: (12L × 12) + 40L + 75L − 10L existing = <strong className="text-white/80">₹2.49 crore</strong> (round to ₹2.5 Cr cover).</p>
          <p>Use our <Link to="/insurance-needs-calculator" className="text-signal">Insurance Needs Calculator</Link> for a precise calculation based on your specifics.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">LIC vs Private Term Insurance — Should You Choose LIC?</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>LIC term plans are slightly more expensive than the cheapest private options, but here&apos;s why many still prefer LIC:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white/80">Claim settlement trust:</strong> LIC settles 98.6% of claims by volume — handling more claims than all private insurers combined. Their process is well-established and family-friendly.</li>
            <li><strong className="text-white/80">Branch network:</strong> 4,700+ branches across India, including tier-3 and rural areas. Physical branch access matters during claim filing.</li>
            <li><strong className="text-white/80">Government backing:</strong> LIC is majority-owned by the Government of India, providing an implicit sovereign guarantee on policyholder obligations.</li>
            <li><strong className="text-white/80">Brand recognition:</strong> Nominees and family members are more likely to know about and file claims with LIC compared to lesser-known private brands.</li>
          </ul>
          <p>For a detailed comparison with private insurers, use our <Link to="/tools/term-insurance-compare" className="text-signal">Term Insurance Comparison Tool</Link> which includes HDFC Life, Max Life, ICICI Prudential, and SBI Life.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Which LIC Term Plan Should You Choose?</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/[0.03]">
              <div className="text-white/80 font-semibold mb-1">Choose Tech Term (854) if:</div>
              <p>You want the lowest premium, are comfortable buying online, and need ₹50 lakh+ cover. Best value for money among LIC term plans.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03]">
              <div className="text-white/80 font-semibold mb-1">Choose Jeevan Amar (855) if:</div>
              <p>You prefer buying through an agent, need cover below ₹50 lakh, or want the increasing cover option to inflation-proof your coverage.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03]">
              <div className="text-white/80 font-semibold mb-1">Choose Jeevan Kiran (875) if:</div>
              <p>You want return of premiums on survival. Higher premium, but eliminates the &ldquo;wasted money&rdquo; concern that stops many Indians from buying pure term insurance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Tax Benefits on LIC Term Insurance</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>All LIC term plans qualify for tax benefits under the Income Tax Act:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white/80">Section 80C:</strong> Premiums up to ₹1.5 lakh/year are deductible under the old tax regime</li>
            <li><strong className="text-white/80">Section 10(10D):</strong> Death benefit received by nominees is completely tax-free</li>
            <li><strong className="text-white/80">Jeevan Kiran survival benefit:</strong> Return of premium on survival is also tax-free under 10(10D)</li>
          </ul>
          <p>Use our <Link to="/tax-calculator" className="text-signal">Tax Benefit Calculator</Link> to see your exact savings under old vs new regime.</p>
        </div>
      </section>

      <section className="mb-8 panel p-6 text-center border-signal/20">
        <h2 className="text-lg font-semibold text-white mb-2">Compare LIC Term Plans for Your Age</h2>
        <p className="text-sm text-white/40 max-w-lg mx-auto mb-4">
          Get exact premium quotes for all LIC term plans and compare with private insurers based on your age and sum assured.
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
