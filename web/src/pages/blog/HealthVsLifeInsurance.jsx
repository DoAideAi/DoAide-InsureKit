import { useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../../components/FAQ";

const FAQ_ITEMS = [
  { q: "Should I buy health insurance or life insurance first?", a: "Buy health insurance first if you are single with no dependents — a medical emergency can wipe out savings overnight. Buy life insurance first if you have a spouse, children, or parents who depend on your income. Ideally, buy both together — a term plan + health policy costs under ₹15,000/year for a 25-year-old." },
  { q: "Can life insurance cover medical expenses?", a: "No. Life insurance pays a lump sum only on death (or maturity for endowment plans). It does not cover hospitalisation, surgery, or medical treatments. Some plans offer Critical Illness riders that pay a lump sum on diagnosis of specific illnesses, but this is not a substitute for health insurance." },
  { q: "Is employer health insurance sufficient?", a: "No. Employer health insurance typically covers ₹3-5 lakh with limited room rent and no coverage after you leave the job. Buy a personal health policy of at least ₹5-10 lakh while young — premiums are lower and you build continuous coverage history." },
  { q: "Do I need both Section 80C and 80D deductions?", a: "Yes, they are separate deductions. Section 80C (life insurance premiums, up to ₹1.5 lakh) and Section 80D (health insurance premiums, up to ₹25,000-₹1 lakh) both reduce your taxable income under the old regime. Together, they can save over ₹70,000 in taxes annually." },
  { q: "What is the ideal insurance budget for a salaried person?", a: "Allocate 3-5% of annual income for insurance: roughly 1% for term life insurance (₹1 Cr+ cover) and 2-4% for health insurance (₹10-20 lakh family floater). A 30-year-old earning ₹10 lakh/year should spend ₹30,000-50,000 on combined insurance." },
];

export default function BlogHealthVsLifeInsurance() {
  useEffect(() => {
    document.title = "Health Insurance vs Life Insurance: Which Should You Buy First? | InsureKit";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = "Health insurance vs life insurance comparison for Indians. Understand the difference, which to buy first, coverage needs, tax benefits under 80C and 80D, and how to budget for both.";

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
        headline: "Health Insurance vs Life Insurance: Which Should You Buy First?",
        description: "Health insurance vs life insurance comparison for Indians. Which to buy first, coverage needs, tax benefits, and budgeting for both.",
        url: "https://insure.doaide.com/blog/health-vs-life-insurance",
        datePublished: "2026-10-10",
        dateModified: "2026-10-10",
        author: { "@type": "Organization", name: "DoAide" },
        publisher: { "@type": "Organization", name: "DoAide", url: "https://doaide.com" },
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://insure.doaide.com/blog/health-vs-life-insurance" },
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
        Insurance Guide
      </span>
      <h1 className="text-2xl font-bold text-white mt-3 mb-1">Health Insurance vs Life Insurance: Which Should You Buy First?</h1>
      <p className="text-white/40 text-sm mb-8">Updated October 2026 &middot; 12 min read</p>

      <section className="mb-8">
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>This is the most common question among first-time insurance buyers in India: <strong className="text-white/80">&ldquo;Should I get health insurance or life insurance?&rdquo;</strong> The short answer is you need both — but which one you prioritise depends on your life stage, dependents, and financial situation.</p>
          <p>This guide breaks down the differences, helps you decide the right buying order, and shows you how to budget for complete protection. Use our <Link to="/insurance-needs-calculator" className="text-signal">Insurance Needs Calculator</Link> to figure out your exact life cover requirement or the <Link to="/tax-calculator" className="text-signal">Tax Benefit Calculator</Link> for 80C + 80D savings.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Understanding the Fundamental Difference</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p><strong className="text-white/80">Life insurance</strong> protects your family&apos;s financial future if you die. It pays a lump sum (sum assured + bonus) to your nominees. The purpose is <strong className="text-white/80">income replacement</strong> — ensuring your family can maintain their lifestyle, pay off loans, and fund children&apos;s education without your earnings.</p>
          <p><strong className="text-white/80">Health insurance</strong> protects you and your family from medical expenses. It covers hospitalisation, surgery, treatments, and pre/post-hospitalisation costs. The purpose is <strong className="text-white/80">wealth protection</strong> — preventing a medical emergency from draining your savings and pushing you into debt.</p>
          <p>They solve <strong className="text-white/80">completely different problems</strong>. Life insurance cannot pay hospital bills, and health insurance cannot replace lost income. Buying one does not eliminate the need for the other.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Head-to-Head Comparison</h2>
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-3 text-white/50 text-xs uppercase">Parameter</th>
                  <th className="text-center py-3 px-3 text-white/50 text-xs uppercase">Health Insurance</th>
                  <th className="text-center py-3 px-3 text-white/50 text-xs uppercase">Life Insurance (Term)</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Purpose</td><td className="py-2.5 px-3 text-center">Covers medical expenses</td><td className="py-2.5 px-3 text-center">Income replacement on death</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">When It Pays</td><td className="py-2.5 px-3 text-center">On hospitalisation</td><td className="py-2.5 px-3 text-center">On death during term</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Who Benefits</td><td className="py-2.5 px-3 text-center">Policyholder + family</td><td className="py-2.5 px-3 text-center">Nominees (family)</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Typical Cover</td><td className="py-2.5 px-3 text-center">₹5-50 lakh</td><td className="py-2.5 px-3 text-center">₹50L-2 Cr</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Annual Cost (Age 30)</td><td className="py-2.5 px-3 text-center">₹8,000-25,000</td><td className="py-2.5 px-3 text-center text-signal font-semibold">₹6,000-12,000</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Tax Benefit</td><td className="py-2.5 px-3 text-center">Section 80D</td><td className="py-2.5 px-3 text-center">Section 80C</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Renewal</td><td className="py-2.5 px-3 text-center">Yearly (lifelong)</td><td className="py-2.5 px-3 text-center">Fixed term (10-40 yr)</td></tr>
                <tr className="border-t border-white/5"><td className="py-2.5 px-3 text-white/80 font-medium">Claims Frequency</td><td className="py-2.5 px-3 text-center text-signal">Multiple per year</td><td className="py-2.5 px-3 text-center">Once (on death)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">The Priority Framework — Which to Buy First</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Your buying priority depends on your life stage:</p>
          <div className="space-y-3 mt-2">
            <div className="p-3 rounded-lg bg-white/[0.03]">
              <div className="text-white/80 font-semibold mb-1">Single, No Dependents (Age 22-28)</div>
              <p><strong className="text-signal">Buy health insurance first.</strong> No one depends on your income yet, so life insurance is less urgent. But a single hospital stay for dengue or an accident can cost ₹2-5 lakh, wiping out your early-career savings. Get a ₹5-10 lakh individual health policy.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03]">
              <div className="text-white/80 font-semibold mb-1">Married, Spouse Working (Age 25-35)</div>
              <p><strong className="text-signal">Buy both together.</strong> Even if your spouse earns, your household depends on dual income. A term plan ensures the surviving spouse can maintain lifestyle and handle EMIs. A health floater covers both of you. Combined cost: ₹15,000-25,000/year.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03]">
              <div className="text-white/80 font-semibold mb-1">Parent with Young Children (Age 28-40)</div>
              <p><strong className="text-signal">Buy life insurance first — immediately.</strong> Your children need 15-20 years of financial support for education, housing, and basics. A ₹1 Cr+ term plan is non-negotiable. Then add a ₹10-20 lakh family floater health policy.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03]">
              <div className="text-white/80 font-semibold mb-1">Near Retirement (Age 50+)</div>
              <p><strong className="text-signal">Health insurance becomes top priority.</strong> Medical costs spike after 50. Life insurance need reduces as children become independent and loans get repaid. Focus on a ₹20-50 lakh health policy with no co-pay and good restoration benefit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">How Much Cover Do You Need?</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p><strong className="text-white/80">Life insurance cover:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Minimum: 10× your annual income</li>
            <li>Better: Income × years to retirement + outstanding loans + children&apos;s future costs</li>
            <li>A 30-year-old earning ₹10 lakh/year with a home loan should have ₹1-1.5 Cr cover</li>
            <li>Use our <Link to="/insurance-needs-calculator" className="text-signal">Insurance Needs Calculator</Link> for a precise figure</li>
          </ul>
          <p className="mt-2"><strong className="text-white/80">Health insurance cover:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Minimum: ₹5 lakh (individual) or ₹10 lakh (family floater)</li>
            <li>Recommended for metro cities: ₹15-25 lakh (a single cardiac surgery costs ₹5-15 lakh)</li>
            <li>Senior citizens (60+): ₹20-50 lakh with restoration benefit</li>
            <li>Consider a super top-up plan (₹25-50 lakh) above your base policy for catastrophic coverage</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Tax Benefits — 80C + 80D Together</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Life and health insurance provide <strong className="text-white/80">separate tax deductions</strong> under the old regime, maximising your savings:</p>
          <div className="panel overflow-hidden mt-2">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-white/50 text-xs uppercase">Section</th>
                    <th className="text-center py-2 px-3 text-white/50 text-xs uppercase">Covers</th>
                    <th className="text-center py-2 px-3 text-white/50 text-xs uppercase">Max Deduction</th>
                    <th className="text-center py-2 px-3 text-white/50 text-xs uppercase">Max Tax Saved</th>
                  </tr>
                </thead>
                <tbody className="text-white/60">
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">80C</td><td className="py-2 px-3 text-center">Life insurance premium</td><td className="py-2 px-3 text-center">₹1.5 lakh</td><td className="py-2 px-3 text-center text-signal">₹46,800</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">80D (self+family)</td><td className="py-2 px-3 text-center">Health insurance premium</td><td className="py-2 px-3 text-center">₹25,000-₹50,000</td><td className="py-2 px-3 text-center text-signal">₹7,800-₹15,600</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">80D (parents)</td><td className="py-2 px-3 text-center">Parents&apos; health premium</td><td className="py-2 px-3 text-center">₹25,000-₹50,000</td><td className="py-2 px-3 text-center text-signal">₹7,800-₹15,600</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-2">Total potential tax saving: <strong className="text-signal">₹62,400 - ₹78,000/year</strong> under the 31.2% tax bracket. Calculate your exact saving with our <Link to="/tax-calculator" className="text-signal">Tax Benefit Calculator</Link>.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Common Mistakes to Avoid</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white/80">Buying endowment instead of term + health:</strong> A ₹50,000/year endowment gives only ₹5-10 lakh life cover and zero health cover. The same ₹50,000 spent on a ₹1 Cr term plan (₹10,000) + ₹15 lakh health policy (₹12,000) + SIPs (₹28,000) gives far more protection and wealth.</li>
            <li><strong className="text-white/80">Relying solely on employer health insurance:</strong> Employer cover ends when you leave. Buying your own policy at 40+ costs 3-5× more than buying at 25, with pre-existing disease waiting periods starting over.</li>
            <li><strong className="text-white/80">Under-insuring health cover:</strong> A ₹3 lakh health policy is nearly useless in metro cities where an ICU day costs ₹15,000-50,000. Get at least ₹10 lakh family floater + a ₹25 lakh super top-up.</li>
            <li><strong className="text-white/80">Buying life insurance for parents:</strong> If your parents are retired with no dependents, they don&apos;t need life insurance. They need health insurance. Term premiums for a 60-year-old are prohibitively expensive anyway.</li>
            <li><strong className="text-white/80">Ignoring critical illness cover:</strong> Neither term life nor health insurance covers income loss during prolonged treatment (cancer, stroke). Consider adding a Critical Illness rider to your term plan for ₹2,000-5,000 extra per year.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Recommended Insurance Portfolio by Income Level</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/[0.03]">
              <div className="text-white/80 font-semibold mb-1">₹5-10 lakh/year income</div>
              <p>Term plan: ₹75 lakh-1 Cr (~₹7,000/yr) + Health floater: ₹5-10 lakh (~₹8,000/yr) = <strong className="text-signal">Total: ~₹15,000/yr</strong></p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03]">
              <div className="text-white/80 font-semibold mb-1">₹10-20 lakh/year income</div>
              <p>Term plan: ₹1-1.5 Cr (~₹10,000/yr) + Health floater: ₹10-15 lakh (~₹15,000/yr) + Super top-up: ₹25 lakh (~₹3,000/yr) = <strong className="text-signal">Total: ~₹28,000/yr</strong></p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.03]">
              <div className="text-white/80 font-semibold mb-1">₹20+ lakh/year income</div>
              <p>Term plan: ₹2 Cr (~₹15,000/yr) + Health floater: ₹20-25 lakh (~₹25,000/yr) + Super top-up: ₹50 lakh (~₹5,000/yr) + CI rider (~₹3,000/yr) = <strong className="text-signal">Total: ~₹48,000/yr</strong></p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8 panel p-6 text-center border-signal/20">
        <h2 className="text-lg font-semibold text-white mb-2">Calculate Your Insurance Needs</h2>
        <p className="text-sm text-white/40 max-w-lg mx-auto mb-4">
          Find out exactly how much life insurance cover you need based on your income, loans, and family goals.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link to="/insurance-needs-calculator" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-signal text-white font-semibold text-sm hover:brightness-110 transition-all no-underline">
            Insurance Needs Calculator
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link to="/tax-calculator" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/20 text-white/70 font-semibold text-sm hover:border-signal/40 hover:text-white transition-all no-underline">
            Tax Benefit Calculator
          </Link>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
