import { useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../../components/FAQ";

const FAQ_ITEMS = [
  { q: "Which LIC plan is best for a family?", a: "There is no single best plan. Most families need a term plan (such as Tech Term or Jeevan Amar) to protect the earning member's income, plus one goal-based plan — an endowment, child or pension plan — for savings. Choose based on dependants, cover needed and what you can afford to pay for the full term." },
  { q: "How much life cover does my family need?", a: "A common starting point is 10-15 times annual income plus outstanding loans, minus existing savings and cover. A detailed calculation adds your family's expenses for the years they depend on you and future goals like education." },
  { q: "Should I buy LIC insurance for my child?", a: "Insure the earning parents first, because a child has no income to replace. Child plans like Amritbaal or Jeevan Tarun are savings tools for education, and work best alongside adequate term cover on the parents." },
  { q: "Is it better to buy one big policy or several small ones?", a: "One adequate term plan plus one or two goal-based plans is usually simpler and cheaper than many small endowment policies. Multiple small policies often leave the family under-insured while costing more in total." },
  { q: "Can I get a tax benefit on LIC premiums in 2026?", a: "Under the old tax regime, LIC premiums qualify for deduction under Section 80C up to ₹1.5 lakh, subject to conditions. Under the new tax regime, Section 80C is not available. Maturity proceeds may be tax-free under Section 10(10D) if the policy meets the premium-to-sum-assured and aggregate premium conditions." },
];

export default function BlogChooseRightLicPlanForFamily() {
  useEffect(() => {
    document.title = "How to Choose the Right LIC Plan for Your Family: A 5-Step Framework | InsureKit";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = "A practical 5-step framework to choose the right LIC plan for your family in 2026 — work out cover, match goals to plan types, check affordability, and compare before you buy.";

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
        headline: "How to Choose the Right LIC Plan for Your Family: A 5-Step Framework",
        description: "A practical 5-step framework to choose the right LIC plan for your family in 2026 — work out cover, match goals to plan types, check affordability, and compare before you buy.",
        url: "https://insure.doaide.com/blog/choose-right-lic-plan-for-family",
        datePublished: "2026-10-22",
        dateModified: "2026-10-22",
        author: { "@type": "Organization", name: "DoAide" },
        publisher: { "@type": "Organization", name: "DoAide", url: "https://doaide.com" },
        mainEntityOfPage: { "@type": "WebPage", "@id": "https://insure.doaide.com/blog/choose-right-lic-plan-for-family" },
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
        Family Planning
      </span>
      <h1 className="text-2xl font-bold text-white mt-3 mb-1">How to Choose the Right LIC Plan for Your Family: A 5-Step Framework</h1>
      <p className="text-white/40 text-sm mb-8">Updated October 2026 &middot; 8 min read</p>

      <section className="mb-8">
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Most families buy an LIC policy because a relative or agent recommended a plan, not because they matched a plan to a need. The result is common: a ₹5 lakh endowment policy on the main earner, no real protection for the family, and premiums that feel heavy for what they deliver.</p>
          <p>This guide gives you a simple five-step framework to choose the right LIC plan for your family. It works whether you are buying your first policy or reviewing the ones you already have. For a plan-by-plan list, see our <Link to="/blog/best-lic-plans-2026-comparison-guide" className="text-signal">Best LIC Plans 2026 comparison</Link>; this article is about how to decide.</p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Step 1: List Who Depends on You and for How Long</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Write down every person who relies on your income and how many years they will need support:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white/80">Spouse</strong> — until they have their own retirement income, or for life if they do not work.</li>
            <li><strong className="text-white/80">Children</strong> — until they finish education and become financially independent, typically age 22-25.</li>
            <li><strong className="text-white/80">Parents</strong> — if they rely on you for living or medical expenses.</li>
            <li><strong className="text-white/80">Loans</strong> — a home loan or car loan your family would have to repay without you.</li>
          </ul>
          <p>This list tells you two things: how large your cover needs to be, and how long the policy term should run. A 32-year-old with a newborn needs protection for at least 25 years. A 50-year-old whose children are working needs far less.</p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Step 2: Work Out the Life Cover You Actually Need</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>The right sum assured is usually much higher than what families buy. A common starting point is 10-15 times your annual income, plus outstanding loans, minus existing savings and cover. A more precise approach adds up your family&apos;s yearly expenses for the years they depend on you, future goals like education and marriage, and liabilities.</p>
          <p>Use our <Link to="/insurance-needs-calculator" className="text-signal">Insurance Needs Calculator</Link> to get a number in two minutes, or read <Link to="/blog/calculate-life-insurance-coverage" className="text-signal">How to Calculate Your Life Insurance Coverage</Link> for the full method.</p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Step 3: Match Each Family Goal to the Right Plan Type</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>LIC sells several categories of plans. Each solves a different problem, and most families need a combination rather than one plan that tries to do everything.</p>
          <div className="panel overflow-hidden mt-2">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-white/50 text-xs uppercase">Family goal</th>
                    <th className="text-center py-2 px-3 text-white/50 text-xs uppercase">Plan type</th>
                    <th className="text-center py-2 px-3 text-white/50 text-xs uppercase">LIC examples</th>
                  </tr>
                </thead>
                <tbody className="text-white/60">
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">Replace income if the earner dies</td><td className="py-2 px-3 text-center">Term insurance</td><td className="py-2 px-3 text-center">Tech Term, Jeevan Amar</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">Guaranteed savings with cover</td><td className="py-2 px-3 text-center">Endowment / limited pay</td><td className="py-2 px-3 text-center">Jeevan Labh, Jeevan Anand</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">Child&apos;s education fund</td><td className="py-2 px-3 text-center">Child plan</td><td className="py-2 px-3 text-center">Amritbaal, Jeevan Tarun</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">Regular income at intervals</td><td className="py-2 px-3 text-center">Money back</td><td className="py-2 px-3 text-center">New Money Back plans</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">Lifelong income and cover</td><td className="py-2 px-3 text-center">Whole life</td><td className="py-2 px-3 text-center">Jeevan Umang, Jeevan Utsav</td></tr>
                  <tr className="border-t border-white/5"><td className="py-2 px-3 text-white/80 font-medium">Retirement pension</td><td className="py-2 px-3 text-center">Annuity / pension</td><td className="py-2 px-3 text-center">New Jeevan Shanti, Saral Pension</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p>The most important rule: <strong className="text-white/80">protection comes first.</strong> If your family would struggle financially without your income, get adequate term cover before you put money into savings-oriented plans. A large term policy costs far less than an endowment with the same sum assured. See <Link to="/blog/term-vs-whole-life-insurance" className="text-signal">Term vs Whole Life Insurance</Link> for a detailed comparison.</p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Step 4: Choose Plans by Life Stage</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white/80">Young couple, no children (25-30):</strong> A term plan for each earning partner, plus health insurance. If you want guaranteed savings, add a modest endowment or limited-pay plan you can comfortably sustain for the full term.</li>
            <li><strong className="text-white/80">Parents of young children (28-40):</strong> This is when protection matters most. A large term plan on the main earner (and ideally the second earner), then a child plan or limited-pay endowment for education goals. Read our <Link to="/blog/best-lic-plans-child-education-2026" className="text-signal">child education plans guide</Link>.</li>
            <li><strong className="text-white/80">Mid-career with teenagers (40-50):</strong> Review existing cover against current income and loans. Focus on funding education deadlines that are 3-8 years away and start a retirement plan.</li>
            <li><strong className="text-white/80">Pre-retirement (50-60):</strong> Life cover needs usually shrink as loans are repaid and children become independent. Shift focus to annuity and pension plans for guaranteed income after retirement, and make sure health cover is strong.</li>
          </ul>
          <p>Not sure which category fits? Our <Link to="/plan-recommender" className="text-signal">LIC plan recommender</Link> asks a few questions about your age, income and goals and suggests suitable plans.</p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Step 5: Check Affordability and Compare Before You Sign</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>A plan is only right if you can keep paying for it. Lapsed traditional policies return far less than you paid in, so affordability is not optional.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white/80">Keep total life insurance premiums manageable.</strong> Many planners suggest keeping all insurance premiums within roughly 10-15% of take-home income.</li>
            <li><strong className="text-white/80">Prefer a premium term you can sustain.</strong> Limited-pay plans finish payments sooner but cost more per year. Choose a term that ends before major expenses or retirement.</li>
            <li><strong className="text-white/80">Compare total premium paid with projected maturity.</strong> Use the <Link to="/premium-calculator" className="text-signal">premium calculator</Link> and <Link to="/maturity-calculator" className="text-signal">maturity calculator</Link>, then put two or three shortlisted plans side by side with <Link to="/compare-plans" className="text-signal">Compare Plans</Link>.</li>
            <li><strong className="text-white/80">Read the Benefit Illustration.</strong> Ask for the official illustration for your exact age and term. Note which benefits are guaranteed and which depend on bonus rates.</li>
            <li><strong className="text-white/80">Choose the right nominee and riders.</strong> Add a spouse or child as nominee, and consider an accidental death or premium waiver rider where it makes sense.</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Common Mistakes Families Make</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white/80">Buying multiple small endowment policies</strong> instead of one adequate term plan plus one savings plan.</li>
            <li><strong className="text-white/80">Insuring children instead of parents.</strong> A child has no income to replace. Cover the earners first.</li>
            <li><strong className="text-white/80">Choosing a plan because of tax savings alone.</strong> Under the new tax regime, premiums do not get a Section 80C deduction, so the tax benefit may be smaller than you expect. Our <Link to="/tax-calculator" className="text-signal">tax calculator</Link> shows the difference.</li>
            <li><strong className="text-white/80">Never reviewing cover.</strong> Revisit your policies after marriage, a child&apos;s birth, a home loan or a big salary change.</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">A Quick Example</h2>
        <div className="panel-inner p-4 text-sm text-white/60 leading-relaxed space-y-3">
          <p>Ravi, 33, earns ₹12 lakh a year, has a ₹40 lakh home loan, a spouse who works part-time and a three-year-old daughter. Following the framework: his family depends on him for about 25 years; he needs roughly ₹1.5-2 crore of cover; a term plan provides most of it affordably; a child plan or limited-pay endowment targets his daughter&apos;s education at 18; and the total premium stays within a comfortable share of his take-home pay. He compares two savings plans side by side before deciding.</p>
          <p>The right LIC plan for your family is rarely a single policy. It is usually a term plan for protection plus one goal-based plan you can afford to continue — chosen after doing the numbers, not before.</p>
        </div>
      </section>

      <section className="mb-8 panel p-6 text-center border-signal/20">
        <h2 className="text-lg font-semibold text-white mb-2">Find the Right LIC Plan for Your Family</h2>
        <p className="text-sm text-white/40 max-w-lg mx-auto mb-4">
          Answer a few questions and get plan suggestions, then compare premiums and maturity values side by side.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link to="/plan-recommender" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-signal text-white font-semibold text-sm hover:brightness-110 transition-all no-underline">
            LIC Plan Recommender
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link to="/insurance-needs-calculator" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/20 text-white/70 font-semibold text-sm hover:border-signal/40 hover:text-white transition-all no-underline">
            Insurance Needs Calculator
          </Link>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
