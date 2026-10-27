import { Link } from "react-router-dom";
import GuideLayout from "../components/GuideLayout";
import FAQ from "../components/FAQ";

const FAQ_ITEMS = [
  {
    q: "What is the best age to start a child plan in LIC?",
    a: "As early as possible, ideally at birth or within the first year. Starting early means lower premiums, longer compounding period, and the policy matures when the child needs funds most (age 18-25). For example, a plan started at age 0 with ₹5,000/year premium will accumulate significantly more than one started at age 10.",
  },
  {
    q: "Can I afford LIC child plans on a modest budget?",
    a: "Yes. Plans like Jeevan Labh and Jeevan Lakshya start at around ₹2,500-3,000 per quarter. Even ₹1,000/month invested consistently can build a corpus of ₹8-12 lakh over 15-20 years with bonuses.",
  },
  {
    q: "Should I choose ULIP or traditional plan for my child?",
    a: "For most parents, traditional plans are better for children because returns are guaranteed and not market-dependent. ULIPs can give higher returns but carry market risk. If your child's education fund is your primary goal and you cannot afford losses, go with traditional endowment or money back plans.",
  },
  {
    q: "Is Amritbaal better than Jeevan Tarun?",
    a: "Amritbaal (Table 774) is the newest and most flexible plan with a wider entry age range and good bonus rates. Jeevan Tarun offers staged payouts from age 20-25 which is great for education funding. Choose Amritbaal for a single lump sum at maturity, Jeevan Tarun for staggered payouts during college years.",
  },
  {
    q: "What happens to the policy if the parent (proposer) dies?",
    a: "In plans where the parent is the life assured (like Jeevan Lakshya), the sum assured is paid immediately and all future premiums are waived. In child-specific plans, a Premium Waiver Benefit rider can be added so premiums are waived if the parent dies.",
  },
  {
    q: "Can I take a plan for my child's marriage instead of education?",
    a: "Yes, LIC plans are goal-agnostic. The maturity amount can be used for any purpose. Choose the policy term so that maturity aligns with your intended goal - age 18-21 for education, age 23-28 for marriage.",
  },
  {
    q: "How much should I invest for my child's education?",
    a: "Estimate the future cost of education (engineering: ₹15-25 lakh, medical: ₹50-80 lakh, MBA: ₹20-35 lakh by 2035-2040), then work backward to find the required annual premium. Use our Premium Calculator to get exact numbers for each plan.",
  },
];

const TOC = [
  { id: "why-lic-for-children", label: "Why LIC for Children's Future" },
  { id: "top-5-plans", label: "Top 5 LIC Plans for Children" },
  { id: "comparison-table", label: "Side-by-Side Comparison" },
  { id: "how-to-choose", label: "How to Choose the Right Plan" },
  { id: "sample-calculations", label: "Sample Calculations" },
  { id: "education-costs", label: "Education Cost Planning" },
  { id: "tax-benefits", label: "Tax Benefits on Children's Plans" },
  { id: "when-to-start", label: "When to Start" },
  { id: "common-mistakes", label: "Common Mistakes Parents Make" },
];

const RELATED_GUIDES = [
  { path: "/guides/best-lic-plans-2026", title: "Best LIC Plans 2026" },
  { path: "/guides/lic-tax-benefits", title: "LIC Tax Benefits Guide" },
  { path: "/guides/lic-premium-payment-online", title: "LIC Premium Payment Methods" },
];

const RELATED_TOOLS = [
  { path: "/premium-calculator", label: "Premium Calculator" },
  { path: "/maturity-calculator", label: "Maturity Calculator" },
  { path: "/plan-recommender", label: "Plan Recommender" },
  { path: "/plan-comparison", label: "Plan Comparison" },
];

export default function GuideBestLicPlansChild() {
  return (
    <GuideLayout
      tag="Comparison Guide"
      title="Best LIC Plans for Children 2026: Top 5 with Returns"
      subtitle="Compare the top LIC children's plans - Amritbaal, Jeevan Tarun, New Children's Money Back, Jeevan Lakshya, and Jeevan Labh. Know features, returns, and which plan fits your child's future best."
      publishDate="Oct 2026"
      readTime="11 min read"
      toc={TOC}
      relatedGuides={RELATED_GUIDES}
      relatedTools={RELATED_TOOLS}
    >
      {/* --- Why LIC for Children's Future --- */}
      <section id="why-lic-for-children" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Why LIC for Children's Future</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          When it comes to securing your child's future, LIC remains the most trusted name in India.
          With over 65 years of history and a sovereign guarantee backing, LIC plans offer what no
          mutual fund or ULIP can: <strong className="text-white/80">guaranteed returns combined with
          life insurance protection</strong>. For parents who want certainty that money will be
          available when their child needs it for education or marriage, LIC endowment and money back
          plans are hard to beat.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          LIC children's plans come with an important safety net - the{" "}
          <strong className="text-white/80">Premium Waiver Benefit</strong>. If the parent (proposer)
          passes away during the policy term, all future premiums are waived and the policy continues
          with full benefits. This means your child's education fund is protected even in the worst-case
          scenario. No investment instrument in India offers this level of protection for a child's future.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-signal font-semibold text-sm mb-1">Guaranteed Returns</p>
            <p className="text-white/50 text-xs">Sum assured + reversionary bonuses + final additional bonus. Returns are not linked to market performance.</p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-signal font-semibold text-sm mb-1">Tax Benefits</p>
            <p className="text-white/50 text-xs">Premium deduction under 80C (up to 1.5L) and tax-free maturity under 10(10D) when conditions are met.</p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-signal font-semibold text-sm mb-1">Discipline of Saving</p>
            <p className="text-white/50 text-xs">Regular premium payments create a forced savings habit. Unlike FDs or mutual funds, you can't easily withdraw impulsively.</p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-signal font-semibold text-sm mb-1">Waiver Protection</p>
            <p className="text-white/50 text-xs">Premium waiver benefit ensures the policy continues even if the parent dies. Child's fund stays secure no matter what.</p>
          </div>
        </div>
      </section>

      {/* --- Top 5 LIC Plans for Children --- */}
      <section id="top-5-plans" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Top 5 LIC Plans for Children</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Here are the five best LIC plans for building your child's education or marriage corpus.
          Each plan has a unique structure suited to different needs and budgets.
        </p>

        {/* Plan 1: Amritbaal */}
        <div className="panel-inner p-4 mb-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">1</div>
            <div>
              <h3 className="text-white font-semibold text-sm">Amritbaal (Table 774)</h3>
              <p className="text-white/40 text-xs">LIC's latest children's plan</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <div>
              <p className="text-white/40 text-xs">Entry Age</p>
              <p className="text-white/80 text-sm font-medium">0-17 years</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Min Sum Assured</p>
              <p className="text-white/80 text-sm font-medium">{"₹"}2,00,000</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Premium Terms</p>
              <p className="text-white/80 text-sm font-medium">Flexible</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Maturity Age</p>
              <p className="text-white/80 text-sm font-medium">25 years</p>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-2">
            Amritbaal is LIC's newest children's plan and comes with attractive bonus rates. It
            offers a lump sum payout at maturity (when the child turns 25), making it ideal for
            higher education or marriage funding. The wide entry age range (0-17) means you can
            start even for older children.
          </p>
          <p className="text-good text-xs font-medium">Best for: Lump sum needs at age 25, late starters (child already 10+)</p>
        </div>

        {/* Plan 2: Jeevan Tarun */}
        <div className="panel-inner p-4 mb-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">2</div>
            <div>
              <h3 className="text-white font-semibold text-sm">Jeevan Tarun (Table 834)</h3>
              <p className="text-white/40 text-xs">Staggered payout plan for college years</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <div>
              <p className="text-white/40 text-xs">Entry Age</p>
              <p className="text-white/80 text-sm font-medium">0-12 years</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Min Sum Assured</p>
              <p className="text-white/80 text-sm font-medium">{"₹"}1,00,000</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Survival Benefits</p>
              <p className="text-white/80 text-sm font-medium">5% SA/yr (20-24)</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Final Payout</p>
              <p className="text-white/80 text-sm font-medium">40% SA at 25</p>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-2">
            Jeevan Tarun is designed specifically for the college years. It pays 5% of the sum
            assured every year from age 20 to 24, followed by 40% of SA plus accumulated bonuses
            at age 25. This staggered payout structure means your child receives money exactly
            when they need it - during graduation and post-graduation years.
          </p>
          <p className="text-good text-xs font-medium">Best for: Funding 4-5 years of college + post-grad education</p>
        </div>

        {/* Plan 3: New Children's Money Back */}
        <div className="panel-inner p-4 mb-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">3</div>
            <div>
              <h3 className="text-white font-semibold text-sm">New Children's Money Back (Table 832)</h3>
              <p className="text-white/40 text-xs">Regular payouts at education milestones</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <div>
              <p className="text-white/40 text-xs">Entry Age</p>
              <p className="text-white/80 text-sm font-medium">0-12 years</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Min Sum Assured</p>
              <p className="text-white/80 text-sm font-medium">{"₹"}1,00,000</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Money Back</p>
              <p className="text-white/80 text-sm font-medium">20%+20%+20%+40%</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Payout Ages</p>
              <p className="text-white/80 text-sm font-medium">18, 20, 22, 25</p>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-2">
            This plan pays 20% of sum assured at ages 18, 20, and 22, with the remaining 40%
            plus all accumulated bonuses at age 25. The payouts align perfectly with education
            milestones: 12th standard completion, graduation start, post-graduation, and final
            settlement. Life cover continues for the full sum assured even after survival
            benefit payouts.
          </p>
          <p className="text-good text-xs font-medium">Best for: Parents who want regular payouts aligned with school/college milestones</p>
        </div>

        {/* Plan 4: Jeevan Lakshya */}
        <div className="panel-inner p-4 mb-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">4</div>
            <div>
              <h3 className="text-white font-semibold text-sm">Jeevan Lakshya (Table 833)</h3>
              <p className="text-white/40 text-xs">Parent's life plan with child as beneficiary</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <div>
              <p className="text-white/40 text-xs">Life Assured</p>
              <p className="text-white/80 text-sm font-medium">Parent</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Beneficiary</p>
              <p className="text-white/80 text-sm font-medium">Child</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">On Death</p>
              <p className="text-white/80 text-sm font-medium">Annual income + lump sum</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Policy Term</p>
              <p className="text-white/80 text-sm font-medium">13-25 years</p>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-2">
            Jeevan Lakshya is unique because the <strong className="text-white/80">parent is the life
            assured</strong>, not the child. If the parent dies during the policy term, the family
            immediately receives 10% of the sum assured annually until maturity, plus the full SA
            with bonuses at maturity. This dual-benefit structure ensures the child's future is
            financially protected even if the earning parent is no longer around.
          </p>
          <p className="text-good text-xs font-medium">Best for: Families where income protection for the child is the top priority</p>
        </div>

        {/* Plan 5: Jeevan Labh */}
        <div className="panel-inner p-4 mb-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">5</div>
            <div>
              <h3 className="text-white font-semibold text-sm">Jeevan Labh (Table 836)</h3>
              <p className="text-white/40 text-xs">Budget-friendly limited premium plan</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <div>
              <p className="text-white/40 text-xs">Premium Terms</p>
              <p className="text-white/80 text-sm font-medium">16 / 21 / 25 years</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Maturity Age</p>
              <p className="text-white/80 text-sm font-medium">25 / 26 / 31</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Min Sum Assured</p>
              <p className="text-white/80 text-sm font-medium">{"₹"}2,00,000</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Premium Type</p>
              <p className="text-white/80 text-sm font-medium">Limited pay</p>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-2">
            Jeevan Labh is a limited premium payment plan, meaning you pay premiums for fewer years
            than the policy term. With the 16-year option, you pay for 16 years and the policy matures
            at year 25. This makes it highly budget-friendly and ideal for parents who want to finish
            premium payments while still earning and let the policy compound until the child needs
            the funds. It also offers one of the highest IRRs among LIC plans.
          </p>
          <p className="text-good text-xs font-medium">Best for: Budget-conscious parents, highest IRR among traditional plans</p>
        </div>
      </section>

      {/* --- Comparison Table --- */}
      <section id="comparison-table" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Side-by-Side Comparison</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Compare all five plans on key parameters to find the best fit for your child's needs.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-wide">
                <th className="text-left py-2 px-3">Plan</th>
                <th className="text-right py-2 px-3">Table</th>
                <th className="text-right py-2 px-3">Min SA</th>
                <th className="text-right py-2 px-3">Entry Age</th>
                <th className="text-right py-2 px-3">Maturity</th>
                <th className="text-right py-2 px-3">IRR (est.)</th>
                <th className="text-left py-2 px-3">Key Benefit</th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-white/80">Amritbaal</td>
                <td className="py-2 px-3 text-right">774</td>
                <td className="py-2 px-3 text-right">{"₹"}2L</td>
                <td className="py-2 px-3 text-right">0-17</td>
                <td className="py-2 px-3 text-right">Age 25</td>
                <td className="py-2 px-3 text-right text-signal">5-5.5%</td>
                <td className="py-2 px-3">Lump sum, flexible terms</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-white/80">Jeevan Tarun</td>
                <td className="py-2 px-3 text-right">834</td>
                <td className="py-2 px-3 text-right">{"₹"}1L</td>
                <td className="py-2 px-3 text-right">0-12</td>
                <td className="py-2 px-3 text-right">Age 25</td>
                <td className="py-2 px-3 text-right text-signal">4.5-5.5%</td>
                <td className="py-2 px-3">Staggered college payouts</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-white/80">Children's Money Back</td>
                <td className="py-2 px-3 text-right">832</td>
                <td className="py-2 px-3 text-right">{"₹"}1L</td>
                <td className="py-2 px-3 text-right">0-12</td>
                <td className="py-2 px-3 text-right">Age 25</td>
                <td className="py-2 px-3 text-right text-signal">4.5-5%</td>
                <td className="py-2 px-3">4 milestone payouts</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-white/80">Jeevan Lakshya</td>
                <td className="py-2 px-3 text-right">833</td>
                <td className="py-2 px-3 text-right">{"₹"}1L</td>
                <td className="py-2 px-3 text-right">18-50*</td>
                <td className="py-2 px-3 text-right">13-25yr term</td>
                <td className="py-2 px-3 text-right text-signal">5-6%</td>
                <td className="py-2 px-3">Income on parent's death</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-white/80">Jeevan Labh</td>
                <td className="py-2 px-3 text-right">836</td>
                <td className="py-2 px-3 text-right">{"₹"}2L</td>
                <td className="py-2 px-3 text-right">8-59*</td>
                <td className="py-2 px-3 text-right">25/26/31yr</td>
                <td className="py-2 px-3 text-right text-signal">5.5-6%</td>
                <td className="py-2 px-3">Limited pay, highest IRR</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-white/40 text-xs mt-2">
          * Jeevan Lakshya and Jeevan Labh are not child-specific plans but are commonly used
          for children's goals. Entry age refers to the life assured (parent for Lakshya, anyone
          for Labh). IRR estimates based on current bonus rates and may vary.
        </p>
      </section>

      {/* --- How to Choose the Right Plan --- */}
      <section id="how-to-choose" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">How to Choose the Right Plan</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The right plan depends on your child's age, your financial goal, your budget, and whether
          you prefer a lump sum or staggered payouts. Follow this decision framework:
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">1</div>
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Check your child's age</p>
              <p className="text-white/60 text-sm leading-relaxed">
                If your child is <strong className="text-white/80">0-12 years</strong>, all five plans are
                available. If <strong className="text-white/80">13-17 years</strong>, only Amritbaal (774)
                accepts direct entry. For Jeevan Lakshya and Jeevan Labh, the parent's age matters, not
                the child's.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">2</div>
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Define your goal timeline</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Need funds at <strong className="text-white/80">age 18</strong> (12th completion)? Children's
                Money Back starts paying then. Need funds spread across{" "}
                <strong className="text-white/80">ages 20-25</strong> (college years)? Jeevan Tarun is ideal.
                Need a <strong className="text-white/80">single lump sum at 25</strong>? Amritbaal or Jeevan
                Labh work best.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">3</div>
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Assess your budget</p>
              <p className="text-white/60 text-sm leading-relaxed">
                On a tight budget ({"₹"}3,000-5,000/quarter), start with Jeevan Labh - limited premium
                payments and highest IRR. If you can afford {"₹"}10,000+/quarter, Amritbaal or Jeevan
                Tarun with higher SA will build a larger corpus.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">4</div>
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Consider income protection</p>
              <p className="text-white/60 text-sm leading-relaxed">
                If your primary concern is <strong className="text-white/80">"what happens to my child if
                I die?"</strong>, Jeevan Lakshya (833) is the clear choice. It provides annual income
                to the family plus a lump sum at maturity. Combine it with a child-specific plan for
                maximum protection.
              </p>
            </div>
          </div>
        </div>

        <div className="panel p-4 border-l-4 border-l-signal mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Quick recommendation:</span>{" "}
            For most parents with a newborn, start with <strong className="text-white/80">Jeevan Tarun
            (834)</strong> for staggered education payouts + <strong className="text-white/80">Jeevan
            Lakshya (833)</strong> for income protection. Use our{" "}
            <Link to="/plan-recommender" className="text-signal hover:underline">Plan Recommender</Link>{" "}
            for a personalized suggestion.
          </p>
        </div>
      </section>

      {/* --- Sample Calculations --- */}
      <section id="sample-calculations" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Sample Calculations</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Let's walk through a real example to show how LIC children's plans build wealth over time.
        </p>

        <div className="panel-inner p-4 mb-4">
          <h3 className="text-white font-semibold text-sm mb-3">Example: Amritbaal for a 5-year-old child</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <p className="text-white/40 text-xs">Child's Age</p>
              <p className="text-white/80 text-sm font-medium">5 years</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Sum Assured</p>
              <p className="text-white/80 text-sm font-medium">{"₹"}10,00,000</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Annual Premium (approx)</p>
              <p className="text-white/80 text-sm font-medium">{"₹"}45,000</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Premium Paying Term</p>
              <p className="text-white/80 text-sm font-medium">20 years</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3">
            <h4 className="text-white/80 text-xs font-semibold uppercase tracking-wide mb-2">Maturity Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Sum Assured</span>
                <span className="text-white/80">{"₹"}10,00,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Total Premiums Paid (20 yrs x {"₹"}45,000)</span>
                <span className="text-white/80">{"₹"}9,00,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Reversionary Bonus (est. {"₹"}46/1000 SA x 20 yrs)</span>
                <span className="text-white/80">{"₹"}9,20,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Final Additional Bonus (estimated)</span>
                <span className="text-white/80">{"₹"}80,000 - 1,00,000</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-white font-semibold">Estimated Maturity Value</span>
                <span className="text-signal font-bold">{"₹"}18,00,000 - 20,00,000</span>
              </div>
            </div>
          </div>

          <p className="text-white/40 text-xs mt-3">
            Note: Actual maturity value depends on bonus rates declared each year by LIC. The above
            estimate uses current bonus rates. Use our{" "}
            <Link to="/maturity-calculator" className="text-signal hover:underline">Maturity Calculator</Link>{" "}
            for plan-specific projections.
          </p>
        </div>

        <div className="panel-inner p-4 mb-4">
          <h3 className="text-white font-semibold text-sm mb-3">Example: Jeevan Tarun for a newborn</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <p className="text-white/40 text-xs">Child's Age</p>
              <p className="text-white/80 text-sm font-medium">0 years (newborn)</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Sum Assured</p>
              <p className="text-white/80 text-sm font-medium">{"₹"}5,00,000</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Annual Premium (approx)</p>
              <p className="text-white/80 text-sm font-medium">{"₹"}22,000</p>
            </div>
            <div>
              <p className="text-white/40 text-xs">Premium Paying Term</p>
              <p className="text-white/80 text-sm font-medium">20 years</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-3">
            <h4 className="text-white/80 text-xs font-semibold uppercase tracking-wide mb-2">Payout Schedule</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Age 20: 5% of SA</span>
                <span className="text-white/80">{"₹"}25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Age 21: 5% of SA</span>
                <span className="text-white/80">{"₹"}25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Age 22: 5% of SA</span>
                <span className="text-white/80">{"₹"}25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Age 23: 5% of SA</span>
                <span className="text-white/80">{"₹"}25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Age 24: 5% of SA</span>
                <span className="text-white/80">{"₹"}25,000</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-white/60">Age 25: 40% SA + bonuses</span>
                <span className="text-signal font-bold">{"₹"}6,50,000 - 7,50,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Education Cost Planning --- */}
      <section id="education-costs" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Education Cost Planning</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          To choose the right sum assured, you need to estimate what education will cost when your
          child reaches college age. Here are projected costs for 2035-2040 based on current
          inflation trends (8-10% education inflation per year):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-signal font-bold text-lg mb-1">{"₹"}15-25L</p>
            <p className="text-white/80 text-sm font-medium mb-1">Engineering (B.Tech)</p>
            <p className="text-white/50 text-xs">
              Top private colleges: {"₹"}20-25L. State/NIT: {"₹"}8-12L. IIT: {"₹"}10-15L
              (including hostel). Factor in coaching costs of {"₹"}3-5L for JEE preparation.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-bad font-bold text-lg mb-1">{"₹"}50-80L</p>
            <p className="text-white/80 text-sm font-medium mb-1">Medical (MBBS)</p>
            <p className="text-white/50 text-xs">
              Government college: {"₹"}15-25L. Private college: {"₹"}50-80L+. Deemed university:
              {"₹"}1Cr+. NEET coaching: {"₹"}3-5L. Most expensive education goal.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-warn font-bold text-lg mb-1">{"₹"}20-35L</p>
            <p className="text-white/80 text-sm font-medium mb-1">MBA</p>
            <p className="text-white/50 text-xs">
              IIM: {"₹"}25-30L. Top private B-school: {"₹"}20-35L. Tier-2 college: {"₹"}10-15L.
              Includes tuition, books, and living expenses for 2 years.
            </p>
          </div>
        </div>

        <div className="panel p-4 border-l-4 border-l-warn mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-warn font-semibold">Important:</span>{" "}
            A single LIC plan may not cover the entire education cost, especially for medical or
            MBA. Consider a portfolio approach: LIC plan for the guaranteed base + SIP in equity
            mutual funds for the growth component. Use our{" "}
            <Link to="/premium-calculator" className="text-signal hover:underline">Premium Calculator</Link>{" "}
            to find the premium needed for your target corpus.
          </p>
        </div>
      </section>

      {/* --- Tax Benefits on Children's Plans --- */}
      <section id="tax-benefits" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Tax Benefits on Children's Plans</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          LIC children's plans offer significant tax advantages under the Income Tax Act. Here's
          what you can claim:
        </p>

        <div className="space-y-3 mb-4">
          <div className="panel-inner p-4">
            <h3 className="text-white font-semibold text-sm mb-2">Section 80C - Premium Deduction</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Annual premiums paid towards LIC children's plans qualify for deduction under Section 80C,
              up to the overall limit of {"₹"}1,50,000 per financial year. This applies to plans taken
              in the name of your child (up to two children). The deduction is available to the parent
              who pays the premium, regardless of whether they are the life assured.
            </p>
          </div>

          <div className="panel-inner p-4">
            <h3 className="text-white font-semibold text-sm mb-2">Section 10(10D) - Tax-Free Maturity</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              The maturity proceeds, survival benefits, and bonus amounts are entirely tax-free under
              Section 10(10D) provided the annual premium does not exceed 10% of the sum assured (for
              policies issued after April 2012). Since most LIC children's plans easily meet this
              condition, the entire maturity payout is typically tax-free.
            </p>
          </div>
        </div>

        <div className="panel p-4 border-l-4 border-l-signal mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Effective return boost:</span>{" "}
            For someone in the 30% tax bracket, the 80C deduction effectively reduces the cost of
            the premium by 30%. A {"₹"}45,000 annual premium effectively costs only {"₹"}31,500 after
            tax savings. This can increase your effective IRR by 1-1.5%. Read our{" "}
            <Link to="/guides/lic-tax-benefits" className="text-signal hover:underline">LIC Tax Benefits
            Guide</Link> for detailed calculations.
          </p>
        </div>
      </section>

      {/* --- When to Start --- */}
      <section id="when-to-start" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">When to Start</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The single biggest factor in building a large corpus for your child is{" "}
          <strong className="text-white/80">time</strong>. Starting early means lower premiums, a
          longer compounding period, and significantly higher maturity value. Here's how the same
          annual premium ({"₹"}25,000/year) performs at different starting ages:
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-wide">
                <th className="text-left py-2 px-3">Start at Child's Age</th>
                <th className="text-right py-2 px-3">Premium Paying Years</th>
                <th className="text-right py-2 px-3">Total Premiums Paid</th>
                <th className="text-right py-2 px-3">Est. Maturity at 25</th>
                <th className="text-right py-2 px-3">Bonus Years</th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-good font-medium">Age 0 (birth)</td>
                <td className="py-2 px-3 text-right">25 years</td>
                <td className="py-2 px-3 text-right">{"₹"}6,25,000</td>
                <td className="py-2 px-3 text-right text-signal font-semibold">{"₹"}18-22L</td>
                <td className="py-2 px-3 text-right">25</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-warn font-medium">Age 5</td>
                <td className="py-2 px-3 text-right">20 years</td>
                <td className="py-2 px-3 text-right">{"₹"}5,00,000</td>
                <td className="py-2 px-3 text-right text-white/80">{"₹"}12-15L</td>
                <td className="py-2 px-3 text-right">20</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-3 text-bad font-medium">Age 10</td>
                <td className="py-2 px-3 text-right">15 years</td>
                <td className="py-2 px-3 text-right">{"₹"}3,75,000</td>
                <td className="py-2 px-3 text-right text-white/80">{"₹"}7-9L</td>
                <td className="py-2 px-3 text-right">15</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="panel p-4 border-l-4 border-l-signal mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Starting at birth vs age 10:</span>{" "}
            With the same {"₹"}25,000/year premium, starting at birth gives you{" "}
            <strong className="text-white/80">2-2.5x more maturity value</strong> than starting at
            age 10. The extra 10 years of bonus accumulation and compounding make an enormous
            difference. If your child is already born, the best time to start is{" "}
            <strong className="text-white/80">today</strong>.
          </p>
        </div>
      </section>

      {/* --- Common Mistakes Parents Make --- */}
      <section id="common-mistakes" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Common Mistakes Parents Make</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Avoid these pitfalls when choosing and managing LIC plans for your child:
        </p>

        <div className="space-y-3 mb-4">
          <div className="panel-inner p-4">
            <div className="flex items-start gap-3">
              <span className="text-bad font-bold text-sm shrink-0">1.</span>
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Under-insuring the child's needs</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Many parents choose a low sum assured ({"₹"}1-2 lakh) to save on premiums. But with
                  education inflation at 8-10%, a {"₹"}2 lakh SA will be woefully inadequate in 15-20
                  years. Aim for at least {"₹"}5-10 lakh SA, or more if you're targeting professional
                  courses like medical or MBA.
                </p>
              </div>
            </div>
          </div>

          <div className="panel-inner p-4">
            <div className="flex items-start gap-3">
              <span className="text-bad font-bold text-sm shrink-0">2.</span>
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Not adding the Premium Waiver Benefit rider</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  The whole point of a child plan is to ensure money is available regardless of what
                  happens to the parent. Without the Premium Waiver Benefit rider, if the parent dies,
                  no one may be able to continue paying premiums and the policy may lapse. This rider
                  costs very little (a few hundred rupees extra) but provides critical protection.
                </p>
              </div>
            </div>
          </div>

          <div className="panel-inner p-4">
            <div className="flex items-start gap-3">
              <span className="text-bad font-bold text-sm shrink-0">3.</span>
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Stopping premiums mid-way</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Discontinuing premium payments is the worst thing you can do. A lapsed policy loses
                  bonus accumulation and may eventually have a very low surrender value. If you face
                  temporary financial difficulty, consider a policy loan or switch to paid-up status
                  rather than letting the policy lapse entirely.
                </p>
              </div>
            </div>
          </div>

          <div className="panel-inner p-4">
            <div className="flex items-start gap-3">
              <span className="text-bad font-bold text-sm shrink-0">4.</span>
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Not reviewing the plan as the child grows</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  A plan bought at birth may need augmentation when the child is 10-12 and career
                  interests become clearer. If your child shows interest in medicine (costs {"₹"}50L+),
                  you may need to start an additional plan or SIP. Review your child's education fund
                  every 3-5 years against projected costs.
                </p>
              </div>
            </div>
          </div>

          <div className="panel-inner p-4">
            <div className="flex items-start gap-3">
              <span className="text-bad font-bold text-sm shrink-0">5.</span>
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Choosing the wrong maturity age</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  If you need funds at age 18 for college admission but chose a plan maturing at age
                  25, you'll face a 7-year gap with no payout. Match the maturity age to your specific
                  goal. If unsure, plans with staggered payouts (Jeevan Tarun, Children's Money Back)
                  offer more flexibility than lump-sum plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Use Our Tools CTA --- */}
      <div className="panel p-4 border-l-4 border-l-signal mb-6">
        <div className="text-sm font-medium text-white mb-1">Plan Your Child's Future</div>
        <div className="text-sm text-white/50">
          <Link to="/premium-calculator" className="text-signal hover:underline">Calculate Premium</Link> for any plan &middot;{" "}
          <Link to="/maturity-calculator" className="text-signal hover:underline">Estimate Maturity</Link> with bonus projections &middot;{" "}
          <Link to="/plan-recommender" className="text-signal hover:underline">Get Recommendations</Link> based on your child's age &middot;{" "}
          <Link to="/plan-comparison" className="text-signal hover:underline">Compare Plans</Link> side by side
        </div>
      </div>

      <FAQ items={FAQ_ITEMS} />
    </GuideLayout>
  );
}
