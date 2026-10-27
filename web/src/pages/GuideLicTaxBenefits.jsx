import { Link } from "react-router-dom";
import GuideLayout from "../components/GuideLayout";
import FAQ from "../components/FAQ";

const FAQ_ITEMS = [
  {
    q: "What is the maximum 80C deduction for LIC premium?",
    a: "Up to ₹1.5 lakh per year under the old tax regime. This limit is shared with PPF, ELSS, EPF, and other 80C investments.",
  },
  {
    q: "Is LIC maturity amount taxable under the new tax regime?",
    a: "Section 10(10D) exemption is available under both old and new regimes, provided premium does not exceed 10% of sum assured (or 15% for policies issued before April 2012).",
  },
  {
    q: "Is TDS deducted on LIC maturity amount?",
    a: "Yes, TDS at 5% is deducted if the maturity amount exceeds ₹1 lakh AND premium exceeds 10% of sum assured. No TDS if conditions for 10(10D) exemption are met.",
  },
  {
    q: "Are ULIP returns taxable?",
    a: "For ULIPs with annual premium above ₹2.5 lakh (policies issued after Feb 2021), maturity proceeds are taxed as capital gains. Below ₹2.5 lakh, 10(10D) exemption applies.",
  },
  {
    q: "Is LIC death claim taxable?",
    a: "No. Death claims are fully exempt under Section 10(10D) regardless of premium amount, sum assured, or tax regime chosen.",
  },
  {
    q: "Can I claim 80C deduction for premium paid for my spouse's policy?",
    a: "Yes, you can claim 80C deduction for premiums paid for policies on yourself, your spouse, and your children. Not for parents or siblings.",
  },
  {
    q: "What happens to tax benefits if I surrender my policy before 5 years?",
    a: "The 80C deductions claimed in previous years are added back to your income in the year of surrender and taxed at your slab rate. This is under Section 80C(5).",
  },
];

const TOC = [
  { id: "overview", label: "Overview of Tax Benefits" },
  { id: "section-80c", label: "Section 80C Deduction on Premiums" },
  { id: "section-10-10d", label: "Section 10(10D) Maturity Exemption" },
  { id: "tax-on-surrender", label: "Tax on Surrender Value" },
  { id: "tax-on-death-claim", label: "Tax on Death Claim" },
  { id: "old-vs-new-regime", label: "New Tax Regime vs Old Regime" },
  { id: "by-plan-type", label: "Tax Benefits by Plan Type" },
  { id: "section-80ccc", label: "Section 80CCC for Pension Plans" },
  { id: "how-to-claim", label: "How to Claim Tax Benefits" },
  { id: "common-mistakes", label: "Common Mistakes to Avoid" },
  { id: "tax-planning", label: "Tax Planning with LIC" },
];

const RELATED_GUIDES = [
  { path: "/guides/lic-premium-payment-online", title: "LIC Premium Payment Methods" },
  { path: "/guides/best-term-insurance-plan", title: "Best Term Insurance Plans 2026" },
  { path: "/guides/lic-maturity-amount-check", title: "How to Check LIC Maturity Amount" },
];

const RELATED_TOOLS = [
  { path: "/tax-calculator", label: "Tax Calculator" },
  { path: "/premium-calculator", label: "Premium Calculator" },
  { path: "/plan-recommender", label: "Plan Recommender" },
];

export default function GuideLicTaxBenefits() {
  return (
    <GuideLayout
      tag="Tax Guide"
      title="LIC Policy Tax Benefits: Section 80C, 10(10D) Complete Guide"
      subtitle="Understand tax deductions on LIC premiums under Section 80C, maturity exemption under 10(10D), surrender value taxation, and how the new tax regime affects your LIC policy benefits."
      publishDate="Oct 2026"
      readTime="10 min read"
      toc={TOC}
      relatedGuides={RELATED_GUIDES}
      relatedTools={RELATED_TOOLS}
    >
      {/* --- Overview --- */}
      <section id="overview" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Overview of Tax Benefits</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          LIC policies offer tax benefits at three distinct stages of the policy lifecycle, making
          them one of the most popular tax-saving instruments in India. Understanding these benefits
          is essential to maximise your after-tax returns and avoid unexpected tax liabilities when
          your policy matures or if you decide to surrender it early.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="panel-inner p-4 text-center">
            <p className="text-signal text-2xl font-bold mb-1">80C</p>
            <p className="text-white/50 text-xs">Deduction on premiums paid (up to &#8377;1.5L/year)</p>
          </div>
          <div className="panel-inner p-4 text-center">
            <p className="text-signal text-2xl font-bold mb-1">10(10D)</p>
            <p className="text-white/50 text-xs">Tax-free maturity proceeds (conditions apply)</p>
          </div>
          <div className="panel-inner p-4 text-center">
            <p className="text-signal text-2xl font-bold mb-1">10(10D)</p>
            <p className="text-white/50 text-xs">Death claim fully exempt (no conditions)</p>
          </div>
        </div>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          Tax saving remains one of the primary reasons millions of Indians invest in LIC endowment
          and money-back plans every year. However, the introduction of the new tax regime in 2020
          and subsequent amendments have changed the tax landscape significantly. Many policyholders
          are no longer sure whether their LIC premium qualifies for a deduction or whether their
          maturity proceeds will be taxable.
        </p>
        <p className="text-white/60 text-sm leading-relaxed">
          This guide covers every aspect of LIC taxation in detail, from premium deductions and
          maturity exemptions to surrender penalties and regime-specific rules. Whether you hold an
          endowment plan, a term policy, a ULIP, or an LIC pension plan, you will find the exact
          tax treatment that applies to your situation.
        </p>
      </section>

      {/* --- Section 80C --- */}
      <section id="section-80c" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Section 80C Deduction on Premiums</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          Under Section 80C of the Income Tax Act, premiums paid towards a life insurance policy
          qualify for a deduction from your gross total income, up to a maximum of &#8377;1,50,000
          per financial year. This deduction is available only under the old tax regime. If you have
          opted for the new tax regime (default from AY 2024-25 onwards), you cannot claim this
          deduction.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          The &#8377;1.5 lakh limit under Section 80C is a combined limit shared with several other
          investments. Your EPF contribution, PPF deposits, ELSS mutual funds, NSC, tax-saving FDs,
          children's tuition fees, and home loan principal repayment all compete for the same
          &#8377;1.5 lakh space. If your EPF and PPF alone consume the entire limit, paying LIC
          premium adds no additional tax benefit under 80C.
        </p>
        <div className="panel p-4 border-l-4 border-l-signal mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">10% Sum Assured Rule:</span> For policies
            issued on or after 1 April 2012, only the portion of premium that does not exceed 10% of
            the sum assured qualifies for 80C deduction. For policies issued before this date, the
            threshold is 20%. For example, if your sum assured is &#8377;5,00,000, the maximum
            qualifying premium is &#8377;50,000 per year for post-2012 policies.
          </p>
        </div>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          You can claim Section 80C deduction on premiums paid for policies covering yourself, your
          spouse, or your children (including adult children). Premiums paid for parents' or
          siblings' policies do not qualify. If you are part of a HUF (Hindu Undivided Family), the
          HUF can claim deductions on premiums paid for policies on any member of the HUF, but the
          same premium cannot be claimed by both the HUF and the individual.
        </p>
        <p className="text-white/60 text-sm leading-relaxed">
          The deduction is available on a payment basis, meaning you claim it in the year you
          actually pay the premium, not the year it was due. If you pay two years' premiums in a
          single financial year, only one year's premium qualifies (the excess is not carried
          forward). Keep your premium paid receipt or the statement from the LIC portal as proof for
          your ITR filing.
        </p>
      </section>

      {/* --- Section 10(10D) --- */}
      <section id="section-10-10d" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Section 10(10D) Maturity Exemption</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          Section 10(10D) of the Income Tax Act exempts the maturity proceeds of a life insurance
          policy from income tax, provided certain conditions are met. This applies to the sum
          assured, bonuses, and any additional amounts received on maturity. Unlike 80C, this
          exemption is available under both the old and new tax regimes.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The exemption covers endowment plans, money-back plans, term plans (if they have a
          maturity benefit), and ULIPs (subject to a special rule for high-premium ULIPs). To
          qualify, your policy must meet all of the following conditions:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Premium-to-SA Ratio</p>
            <p className="text-white/50 text-sm leading-relaxed">
              The annual premium must not exceed 10% of the sum assured for policies issued on or
              after 1 April 2012. For policies issued before this date, the threshold is 20%. If the
              premium exceeds this limit in any year, the entire maturity amount becomes taxable.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Minimum Holding Period</p>
            <p className="text-white/50 text-sm leading-relaxed">
              The policy must have been in force for at least 5 years (or 2 years for term insurance
              plans). If you surrender or receive maturity before completing this period, the
              exemption does not apply.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">ULIP Special Rule (Post-Feb 2021)</p>
            <p className="text-white/50 text-sm leading-relaxed">
              For ULIP policies issued after 1 February 2021 with annual premium exceeding &#8377;2.5
              lakh, the maturity proceeds are not exempt. They are taxed as capital gains under
              Section 112A (10% on gains exceeding &#8377;1.25 lakh). Below &#8377;2.5 lakh premium,
              normal 10(10D) exemption applies.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Disability Exception</p>
            <p className="text-white/50 text-sm leading-relaxed">
              For policies on the life of a person with disability (as defined under Section 80U) or
              suffering from specified diseases (Section 80DDB), the premium threshold is relaxed to
              15% of sum assured instead of 10%, regardless of the policy issue date.
            </p>
          </div>
        </div>
        <p className="text-white/60 text-sm leading-relaxed">
          When the maturity amount is not exempt under 10(10D), LIC deducts TDS at 5% on the
          amount exceeding &#8377;1 lakh. You must then report the full maturity amount as "Income
          from Other Sources" in your ITR and pay tax at your applicable slab rate. The TDS
          deducted can be adjusted against your total tax liability.
        </p>
      </section>

      {/* --- Tax on Surrender --- */}
      <section id="tax-on-surrender" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Tax on Surrender Value</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          Surrendering an LIC policy before its term ends can trigger two separate tax consequences.
          First, the surrender value itself may be taxable if the 10(10D) exemption conditions are
          not met. Second, if you claimed 80C deductions on premiums in earlier years and surrender
          the policy before completing 5 years, those deductions are reversed.
        </p>
        <div className="panel p-4 border-l-4 border-l-bad mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-bad font-semibold">80C Reversal (Section 80C(5)):</span> If you
            surrender a policy before completing 5 premium-paying years, the total 80C deductions
            claimed on that policy in previous years are added back to your taxable income in the
            year of surrender. For example, if you claimed &#8377;50,000 each year for 3 years and
            then surrendered, &#8377;1,50,000 gets added to your income in the surrender year.
          </p>
        </div>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          The taxability of the surrender value itself depends on whether 10(10D) conditions are
          met. If the policy was held for more than 5 years and the premium never exceeded 10% of
          sum assured, the surrender value is tax-free. Otherwise, the surrender value (minus total
          premiums paid) is taxable as "Income from Other Sources" at your slab rate.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          LIC deducts TDS at 5% on the taxable surrender amount if it exceeds &#8377;1 lakh. You
          will receive a Form 16A from LIC showing the TDS deducted. Report the surrender proceeds
          in your ITR under "Income from Other Sources" and claim credit for the TDS deducted.
        </p>
        <p className="text-white/60 text-sm leading-relaxed">
          If you are considering surrendering your policy, use our{" "}
          <Link to="/tax-calculator" className="text-signal hover:underline">
            Tax Calculator
          </Link>{" "}
          to estimate the exact tax impact before making a decision. In many cases, a policy loan
          from LIC may be a better alternative than surrender, as it does not trigger the 80C
          reversal or the taxability of surrender proceeds.
        </p>
      </section>

      {/* --- Tax on Death Claim --- */}
      <section id="tax-on-death-claim" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Tax on Death Claim</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          Death claims from LIC policies are fully exempt from income tax under Section 10(10D).
          This exemption applies unconditionally: there is no premium-to-sum-assured ratio check,
          no minimum holding period, and no distinction between old and new tax regimes. The entire
          death benefit, including the sum assured, accrued bonuses, and any additional rider
          benefits, is received completely tax-free by the nominee or legal heir.
        </p>
        <div className="panel p-4 border-l-4 border-l-good mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-good font-semibold">No conditions apply:</span> Whether the
            policyholder paid the first premium yesterday or held the policy for 30 years, whether
            the premium was 5% or 50% of sum assured, the death claim is always fully tax-free.
            This is one of the strongest tax advantages of life insurance.
          </p>
        </div>
        <p className="text-white/60 text-sm leading-relaxed">
          However, the interest earned on the death claim amount after it is received by the
          nominee is taxable. If the nominee deposits the claim amount in a bank fixed deposit, the
          interest earned on that FD is taxable under "Income from Other Sources". Only the
          insurance payout itself is exempt, not the returns earned on it subsequently.
        </p>
      </section>

      {/* --- Old vs New Regime --- */}
      <section id="old-vs-new-regime" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">New Tax Regime vs Old Regime</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The new tax regime, which became the default regime from Assessment Year 2024-25 (FY
          2023-24 onwards), offers lower tax slab rates but removes most deductions and exemptions
          including Section 80C. Here is how each LIC tax benefit is affected by your regime choice:
        </p>
        <div className="space-y-2 mb-4">
          {[
            {
              benefit: "Section 80C (Premium Deduction)",
              old: "Available (up to ₹1.5L)",
              new_r: "Not Available",
              oldColor: "text-good",
              newColor: "text-bad",
            },
            {
              benefit: "Section 10(10D) (Maturity Exemption)",
              old: "Available",
              new_r: "Available",
              oldColor: "text-good",
              newColor: "text-good",
            },
            {
              benefit: "Section 10(10D) (Death Claim)",
              old: "Fully Exempt",
              new_r: "Fully Exempt",
              oldColor: "text-good",
              newColor: "text-good",
            },
            {
              benefit: "Section 80CCC (Pension Premium)",
              old: "Available (within 80C limit)",
              new_r: "Not Available",
              oldColor: "text-good",
              newColor: "text-bad",
            },
            {
              benefit: "Section 80C(5) Reversal on Surrender",
              old: "Applies (deduction was claimed)",
              new_r: "Not Applicable (no deduction claimed)",
              oldColor: "text-warn",
              newColor: "text-white/40",
            },
          ].map((row, i) => (
            <div key={i} className="panel-inner p-3 grid grid-cols-3 gap-2 text-sm">
              <span className="text-white/80 font-medium">{row.benefit}</span>
              <span className={row.oldColor}>{row.old}</span>
              <span className={row.newColor}>{row.new_r}</span>
            </div>
          ))}
          <div className="panel-inner p-2 grid grid-cols-3 gap-2 text-xs text-white/40">
            <span>Tax Benefit</span>
            <span>Old Regime</span>
            <span>New Regime</span>
          </div>
        </div>
        <div className="panel p-4 border-l-4 border-l-signal mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Recommendation:</span> If your only
            tax-saving investment is LIC premium and the amount is modest (say &#8377;30,000-50,000
            per year), the new regime's lower slab rates will likely save you more than the old
            regime's 80C deduction. But if you are already claiming &#8377;1.5 lakh under 80C
            through EPF, PPF, and LIC combined, plus HRA and home loan interest under Section 24,
            the old regime usually remains more beneficial.
          </p>
        </div>
        <p className="text-white/60 text-sm leading-relaxed">
          Remember that you can switch between old and new regimes every year if you are a salaried
          employee (business/professional income taxpayers can switch only once). Use our{" "}
          <Link to="/tax-calculator" className="text-signal hover:underline">
            Tax Calculator
          </Link>{" "}
          to compare your total tax under both regimes considering all your deductions and
          exemptions, not just LIC.
        </p>
      </section>

      {/* --- By Plan Type --- */}
      <section id="by-plan-type" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Tax Benefits by Plan Type</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Different types of LIC plans receive different tax treatment. Here is a breakdown for
          the most common plan categories.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Endowment & Money-Back Plans</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Premiums qualify for 80C deduction (old regime). Maturity and survival benefits are
              exempt under 10(10D) if premium does not exceed 10% of sum assured. These are the
              most common LIC plans and the standard tax rules apply. Examples: Jeevan Anand, Jeevan
              Lakshya, New Endowment Plan.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Term Insurance Plans</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Premiums qualify for 80C deduction (old regime). Since term plans are pure protection
              with no maturity benefit, the 10(10D) question arises only on death claims, which are
              always fully exempt. Term premiums are usually well within the 10% SA threshold, so
              the full premium qualifies for 80C. Examples: LIC Tech Term, Jeevan Amar.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">ULIPs (Unit Linked Plans)</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Premiums qualify for 80C deduction (old regime). For policies issued after 1 Feb 2021
              with annual premium above &#8377;2.5 lakh, maturity proceeds are treated as capital
              gains and taxed at 10% on gains above &#8377;1.25 lakh. Below &#8377;2.5 lakh
              premium, standard 10(10D) exemption applies. Multiple ULIPs are aggregated for the
              &#8377;2.5 lakh threshold. Examples: LIC SIIP, New Endowment Plus.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Pension / Annuity Plans</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Premiums qualify for deduction under Section 80CCC (within the &#8377;1.5 lakh 80C
              combined limit). The commuted (lump sum) portion received at retirement is partially
              exempt, and the pension income received periodically is fully taxable as salary income.
              10(10D) exemption does not apply to pension plans. Examples: Jeevan Akshay, New
              Jeevan Nidhi.
            </p>
          </div>
        </div>
        <p className="text-white/60 text-sm leading-relaxed">
          For whole life plans like Jeevan Umang, the tax treatment follows the same rules as
          endowment plans. Survival benefits received periodically during the policy term are also
          exempt under 10(10D) if the premium conditions are satisfied.
        </p>
      </section>

      {/* --- Section 80CCC --- */}
      <section id="section-80ccc" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Section 80CCC for Pension Plans</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          Section 80CCC provides a specific deduction for premiums paid towards pension or annuity
          plans offered by life insurance companies, including LIC. This deduction is available only
          under the old tax regime. The maximum deduction under 80CCC is part of the overall
          &#8377;1.5 lakh limit shared with Section 80C and Section 80CCD(1).
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          If you are contributing to both a regular LIC endowment plan and an LIC pension plan,
          both premiums are competing for the same &#8377;1.5 lakh space. The endowment premium goes
          under 80C, the pension premium under 80CCC, but the combined total cannot exceed
          &#8377;1.5 lakh.
        </p>
        <div className="panel p-4 border-l-4 border-l-warn mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-warn font-semibold">Important:</span> While the premium paid
            towards a pension plan gets you a tax deduction today, the pension income received after
            retirement is fully taxable as salary/income. Additionally, if you surrender a pension
            plan, the entire surrender value is taxable in the year of receipt. The tax benefit is
            essentially a deferral, not an exemption.
          </p>
        </div>
        <p className="text-white/60 text-sm leading-relaxed">
          LIC pension plans like Jeevan Akshay, Saral Pension, and New Jeevan Nidhi are popular
          choices for retirement planning. However, from a pure tax-efficiency standpoint, NPS
          (National Pension System) offers an additional &#8377;50,000 deduction under Section
          80CCD(1B) over and above the &#8377;1.5 lakh limit, which LIC pension plans do not get.
          Consider your overall retirement and tax strategy before choosing between the two.
        </p>
      </section>

      {/* --- How to Claim --- */}
      <section id="how-to-claim" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">How to Claim Tax Benefits</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Claiming tax benefits on your LIC premium requires proper documentation and correct
          reporting in your income tax return. Here are the steps to ensure you claim every
          deduction you are entitled to.
        </p>
        <div className="space-y-2 mb-4">
          {[
            "Get your Premium Paid Certificate from the LIC customer portal (licindia.in > Login > Policy Info > Premium Paid Statement). This shows the total premium paid during the financial year for each policy. Download it before filing your ITR.",
            "If you are a salaried employee, submit the Premium Paid Certificate to your employer's HR/Payroll team before the end of January (most companies set a deadline for investment proof submission). The employer will factor this into your Form 16 under Section 80C.",
            "While filing your ITR, enter the total premium paid under Section 80C (or 80CCC for pension plans) in the 'Chapter VIA Deductions' section. If your employer has already considered it in Form 16, ensure the amounts match.",
            "For maturity or surrender proceeds, check if TDS has been deducted by LIC. If yes, it will appear in your Form 26AS (Annual Tax Statement). Report the maturity amount under 'Income from Other Sources' if it is taxable, and claim TDS credit.",
            "Keep all premium receipts, policy documents, and the Premium Paid Certificate for at least 7 years from the end of the relevant assessment year. The Income Tax Department can reopen cases for up to 6 years.",
          ].map((step, i) => (
            <div key={i} className="panel-inner p-3 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <p className="text-white/60 text-sm">{step}</p>
            </div>
          ))}
        </div>
        <p className="text-white/60 text-sm leading-relaxed">
          If you have multiple LIC policies, you can claim the combined premium under 80C up to the
          &#8377;1.5 lakh limit. There is no need to report each policy separately in the ITR; only
          the total deduction amount is entered. However, keep individual policy details handy in
          case of scrutiny or notice from the IT Department.
        </p>
      </section>

      {/* --- Common Mistakes --- */}
      <section id="common-mistakes" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Common Mistakes to Avoid</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Tax rules around LIC policies have several nuances that even experienced taxpayers miss.
          Here are the most common mistakes and how to avoid them.
        </p>
        <div className="space-y-3">
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">
              <span className="text-bad mr-2">1.</span>Ignoring the 10% Sum Assured Rule
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Many policyholders assume all LIC maturity proceeds are tax-free. If your annual
              premium exceeds 10% of the sum assured (for post-2012 policies), the entire maturity
              amount becomes taxable. This is common with high-premium single-pay or limited-pay
              plans. Before buying a new policy, verify that the premium-to-SA ratio stays below 10%.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">
              <span className="text-bad mr-2">2.</span>Claiming 80C Without Checking Tax Regime
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              If you have opted for the new tax regime (which is now the default), you cannot claim
              80C deduction on LIC premiums. Some taxpayers continue to deduct this amount and end
              up with a mismatch during processing. Always confirm your regime choice before
              filing. If you filed under the new regime, do not include LIC premium in Chapter VIA.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">
              <span className="text-bad mr-2">3.</span>Double Claiming by HUF and Individual
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              If a premium is paid by a HUF and claimed in the HUF's return, the individual member
              cannot claim the same premium in their personal ITR, or vice versa. Ensure only one
              entity claims the deduction for each premium payment to avoid scrutiny.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">
              <span className="text-bad mr-2">4.</span>Surrendering Before 5 Years
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Surrendering a policy before completing 5 premium-paying years triggers Section
              80C(5), which reverses all 80C deductions claimed on that policy. This can create a
              significant tax burden in the surrender year, especially if you claimed the full
              deduction for 3-4 years. If you must exit a policy early, consider making it paid-up
              instead of surrendering.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">
              <span className="text-bad mr-2">5.</span>Not Reporting Taxable Maturity in ITR
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              If your maturity amount does not qualify for 10(10D) exemption, it must be reported
              as "Income from Other Sources" even if TDS has been deducted. Some taxpayers skip
              this, only to receive a notice later when the IT Department matches Form 26AS data
              with the ITR. Always cross-check your Form 26AS for any LIC-related TDS entries.
            </p>
          </div>
        </div>
      </section>

      {/* --- Tax Planning --- */}
      <section id="tax-planning" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Tax Planning with LIC</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Strategic use of LIC policies can optimise your tax outgo while providing life cover and
          long-term savings. Here is how to think about LIC in the context of your overall tax plan.
        </p>
        <div className="panel-inner p-4 mb-4">
          <p className="text-white font-semibold text-sm mb-3">Optimal Premium by Income Slab (Old Regime)</p>
          <div className="space-y-2">
            {[
              {
                slab: "Up to ₹7 lakh",
                suggestion: "New regime is usually better. No need for 80C investments specifically for tax saving.",
                saving: "Tax-free under new regime (rebate u/s 87A)",
              },
              {
                slab: "₹7-10 lakh",
                suggestion: "If choosing old regime, use EPF + PPF first. Add LIC premium of ₹25,000-50,000 to fill the 80C gap.",
                saving: "Saves ₹5,000-10,000 in tax (20% slab)",
              },
              {
                slab: "₹10-15 lakh",
                suggestion: "Maximise 80C at ₹1.5 lakh. LIC premium of ₹50,000-75,000 can complement EPF/PPF. Ensure premium < 10% of SA.",
                saving: "Saves ₹15,000-22,500 in tax (30% slab)",
              },
              {
                slab: "Above ₹15 lakh",
                suggestion: "Full ₹1.5 lakh under 80C is essential. Use LIC to fill any gap after EPF and PPF. Consider term plan for high cover at low premium.",
                saving: "Saves up to ₹46,800 (30% slab + cess)",
              },
            ].map((item, i) => (
              <div key={i} className="panel p-3 flex flex-col sm:flex-row sm:items-start gap-2">
                <span className="text-signal font-semibold text-sm whitespace-nowrap">{item.slab}</span>
                <div>
                  <p className="text-white/60 text-sm">{item.suggestion}</p>
                  <p className="text-good text-xs mt-1">{item.saving}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          A common and effective strategy is to buy a term insurance plan with high sum assured
          (&#8377;50 lakh to &#8377;1 crore) at a low annual premium (&#8377;8,000-15,000). This
          gives you the best life cover per rupee spent, the premium easily qualifies for 80C (well
          within 10% of SA), and the death benefit is fully tax-free. For savings, separate your
          investment into PPF, ELSS, or NPS, which offer better returns than LIC endowment plans.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          If you already hold multiple LIC endowment policies, review whether the total premiums
          fit within the 80C limit and whether each policy satisfies the 10% SA condition. There is
          no tax benefit to paying &#8377;2 lakh in total LIC premiums if your 80C limit is already
          consumed by EPF and PPF contributions.
        </p>
        <div className="panel-inner p-5 text-center">
          <p className="text-white/60 text-sm mb-3">
            Calculate your exact tax savings with LIC under both regimes
          </p>
          <Link
            to="/tax-calculator"
            className="text-signal text-sm font-semibold hover:underline no-underline"
          >
            Open Tax Calculator &rarr;
          </Link>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </GuideLayout>
  );
}
