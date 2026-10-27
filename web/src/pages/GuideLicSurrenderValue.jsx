import { Link } from "react-router-dom";
import GuideLayout from "../components/GuideLayout";
import FAQ from "../components/FAQ";

const FAQ_ITEMS = [
  {
    q: "What is the surrender value of my LIC policy after 5 years?",
    a: "It depends on your plan, sum assured, and total premiums paid. The Guaranteed Surrender Value (GSV) is typically around 30% of premiums paid excluding the first year. The Special Surrender Value (SSV) is usually higher, especially after 5+ years. Use our Surrender Calculator for a plan-specific estimate.",
  },
  {
    q: "Can I surrender my LIC policy after 3 years?",
    a: "Yes, 3 years of premium payment is the minimum requirement for a policy to acquire surrender value. However, the surrender value at year 3 will be quite low - typically around 30-35% of total premiums paid. You will lose a significant portion of your investment.",
  },
  {
    q: "Is surrender value the same as paid-up value?",
    a: "No, they are different concepts. Paid-up value is the reduced sum assured your policy retains when you stop paying premiums but do not withdraw the money - the policy continues with reduced benefits until maturity. Surrender value is the actual cash you receive when you permanently exit the policy by terminating it.",
  },
  {
    q: "How long does it take to get surrender value credited?",
    a: "Typically 7-15 working days after submitting all required documents at your LIC branch. Online surrender processing may be faster, with credits arriving in 7-10 working days. Delays can occur if documents are incomplete or if the policy has any pending assignments or loans.",
  },
  {
    q: "Can I surrender a ULIP after 5 years?",
    a: "Yes, ULIPs have a mandatory 5-year lock-in period. After the lock-in, the fund value (NAV x units held) is the surrender value. The GSV/SSV concept does not apply to ULIPs since they are market-linked products. You simply get the current fund value at the time of surrender.",
  },
  {
    q: "Will I get back all my premiums if I surrender?",
    a: "Almost never. Surrender value is always less than total premiums paid, especially in the early years. The loss is highest if you surrender in years 3-5. Even at year 10, you may only get back 55-60% of total premiums. Only policies very close to maturity (18-20 years into a 20-year term) may return close to total premiums paid.",
  },
  {
    q: "Can I surrender only part of my policy?",
    a: "No, LIC does not allow partial surrender of a traditional policy. You either surrender the full policy or keep it as is. If you need partial funds, consider taking a policy loan instead - you can borrow up to 85-90% of the surrender value while keeping the policy active with full benefits.",
  },
];

const TOC = [
  { id: "what-is-surrender", label: "What is Surrender Value" },
  { id: "gsv-vs-ssv", label: "Types: GSV vs SSV" },
  { id: "gsv-calculation", label: "GSV Calculation" },
  { id: "ssv-calculation", label: "SSV Calculation" },
  { id: "year-wise-table", label: "Year-wise Surrender Value Table" },
  { id: "when-can-you-surrender", label: "When Can You Surrender" },
  { id: "surrender-online", label: "How to Surrender Online" },
  { id: "surrender-at-branch", label: "How to Surrender at Branch" },
  { id: "tax-on-surrender", label: "Tax on Surrender Value" },
  { id: "alternatives", label: "Alternatives to Surrender" },
  { id: "should-you-surrender", label: "Should You Surrender?" },
];

const RELATED_GUIDES = [
  { path: "/guides/lic-loan-on-policy", title: "How to Get Loan Against LIC Policy" },
  { path: "/guides/lic-maturity-amount-check", title: "How to Check LIC Maturity Amount" },
  { path: "/guides/lic-policy-status-check", title: "How to Check LIC Policy Status" },
];

const RELATED_TOOLS = [
  { path: "/surrender-calculator", label: "Surrender Calculator" },
  { path: "/loan-calculator", label: "Loan Calculator" },
  { path: "/revival-calculator", label: "Revival Calculator" },
  { path: "/maturity-calculator", label: "Maturity Calculator" },
];

export default function GuideLicSurrenderValue() {
  return (
    <GuideLayout
      tag="Reference Guide"
      title="LIC Surrender Value: How to Calculate & Rules"
      subtitle="Understand guaranteed and special surrender values, step-by-step calculation methods, tax implications, and smarter alternatives before surrendering your LIC policy."
      publishDate="Oct 2026"
      readTime="10 min read"
      toc={TOC}
      relatedGuides={RELATED_GUIDES}
      relatedTools={RELATED_TOOLS}
    >
      {/* --- What is Surrender Value --- */}
      <section id="what-is-surrender" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">What is Surrender Value</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          Surrender value is the amount LIC pays you if you voluntarily terminate your policy
          before its maturity date. Think of it as the early exit value of your life insurance
          policy. When you surrender a policy, the contract between you and LIC ends permanently
          - you receive a lump sum payout, but you lose all future benefits including life cover,
          bonus accumulation, and the maturity payout.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The surrender value is always significantly less than the maturity value. This is because
          LIC incurs costs in the early years of a policy (agent commission, underwriting, policy
          administration) and these are recovered from your premiums. Surrendering early means LIC
          hasn't had enough time to generate returns on your premiums, so you get back less than
          what you paid.
        </p>
        <div className="panel p-4 border-l-4 border-l-signal mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">When might you consider surrendering?</span>{" "}
            Financial emergency where you need immediate cash, you've found significantly better
            investment options, the policy no longer fits your financial plan, or the premiums have
            become an unaffordable burden.
          </p>
        </div>
        <div className="panel p-4 border-l-4 border-l-warn">
          <p className="text-white/60 text-sm">
            <span className="text-warn font-semibold">Warning:</span> Surrendering means you lose
            your life cover, all accumulated bonuses, and any future bonus declarations. The money
            you receive will almost certainly be less than the total premiums you've paid. Always
            explore alternatives like policy loans or making the policy paid-up before deciding
            to surrender.
          </p>
        </div>
      </section>

      {/* --- GSV vs SSV --- */}
      <section id="gsv-vs-ssv" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Types: GSV vs SSV</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          LIC calculates two types of surrender values for every eligible policy and pays
          whichever is <span className="text-signal font-semibold">higher</span>. This ensures
          you get the best possible payout when you exit.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-signal text-sm font-semibold mb-2">Guaranteed Surrender Value (GSV)</p>
            <p className="text-white/50 text-sm leading-relaxed">
              The minimum surrender value guaranteed by LIC from day one of the policy. It is
              calculated as a fixed percentage of total premiums paid (excluding the first year)
              plus a percentage of accrued bonuses. GSV is predictable and does not change with
              market conditions.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-signal text-sm font-semibold mb-2">Special Surrender Value (SSV)</p>
            <p className="text-white/50 text-sm leading-relaxed">
              A higher surrender value calculated based on the paid-up value, accrued bonuses,
              and a special multiplier that LIC revises periodically based on market conditions.
              SSV is usually higher than GSV for policies that have been running for 7 or more
              years.
            </p>
          </div>
        </div>
        <div className="panel p-4 border-l-4 border-l-signal">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Key Point:</span> You don't choose
            between GSV and SSV. LIC automatically calculates both and credits whichever is
            higher to your account. In the early years (3-5), GSV and SSV may be similar. After
            7+ years, SSV is almost always higher.
          </p>
        </div>
      </section>

      {/* --- GSV Calculation --- */}
      <section id="gsv-calculation" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">GSV Calculation</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The Guaranteed Surrender Value formula is straightforward. LIC applies a fixed
          percentage to your paid premiums and a separate GSV factor to any accrued bonuses.
        </p>
        <div className="panel p-4 border-l-4 border-l-signal mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">GSV Formula:</span>{" "}
            GSV = (Total Premiums Paid - First Year Premium) x 30% + Accrued Bonus x GSV Factor
          </p>
          <p className="text-white/40 text-xs mt-2">
            The 30% rate applies to most traditional endowment plans. Some plans (money-back,
            whole-life) may have different percentages. The GSV factor for bonuses varies by
            policy year and term.
          </p>
        </div>

        <div className="panel-inner p-5">
          <p className="text-signal text-sm font-semibold mb-3">Worked Example: GSV Calculation</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
            <span className="text-white/50">Sum Assured</span>
            <span className="text-white/80 font-medium">Rs 5,00,000</span>
            <span className="text-white/50">Annual Premium</span>
            <span className="text-white/80 font-medium">Rs 25,000</span>
            <span className="text-white/50">Premiums Paid</span>
            <span className="text-white/80 font-medium">7 years</span>
            <span className="text-white/50">Total Premiums Paid</span>
            <span className="text-white/80 font-medium">Rs 1,75,000</span>
            <span className="text-white/50">Bonus Rate</span>
            <span className="text-white/80 font-medium">Rs 48 per Rs 1,000 SA/year</span>
            <span className="text-white/50">Accrued Bonus (7 yrs)</span>
            <span className="text-white/80 font-medium">Rs 1,68,000</span>
          </div>
          <div className="border-t border-white/10 pt-3">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <span className="text-white/50">Premium Component</span>
              <span className="text-white/80 font-medium">(1,75,000 - 25,000) x 30% = Rs 45,000</span>
              <span className="text-white/50">Bonus Component (GSV factor ~35%)</span>
              <span className="text-white/80 font-medium">1,68,000 x 35% = Rs 58,800</span>
              <span className="text-white/50 font-semibold">Total GSV</span>
              <span className="text-signal font-bold">Rs 1,03,800</span>
            </div>
          </div>
          <p className="text-white/40 text-xs mt-3">
            * GSV factor for bonuses varies by plan, term, and year of surrender. 35% is
            illustrative for a 7th-year surrender on a 20-year endowment plan.
          </p>
        </div>
      </section>

      {/* --- SSV Calculation --- */}
      <section id="ssv-calculation" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">SSV Calculation</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The Special Surrender Value uses the paid-up value of the policy and a multiplier
          that LIC revises periodically. SSV typically gives a better payout than GSV, especially
          for policies that have been running for several years.
        </p>
        <div className="panel p-4 border-l-4 border-l-signal mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">SSV Formula:</span>{" "}
            SSV = (Paid-up Value + Accrued Bonus) x SSV Multiplier
          </p>
          <p className="text-white/40 text-xs mt-2">
            Paid-up Value = Sum Assured x (Number of Premiums Paid / Total Premiums Due).
            The SSV Multiplier varies by year of surrender and original policy term, typically
            ranging from 0.50 to 0.90.
          </p>
        </div>

        <div className="panel-inner p-5">
          <p className="text-signal text-sm font-semibold mb-3">Worked Example: SSV Calculation (Same Policy)</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
            <span className="text-white/50">Sum Assured</span>
            <span className="text-white/80 font-medium">Rs 5,00,000</span>
            <span className="text-white/50">Policy Term</span>
            <span className="text-white/80 font-medium">20 years</span>
            <span className="text-white/50">Premiums Paid</span>
            <span className="text-white/80 font-medium">7 out of 20</span>
            <span className="text-white/50">Paid-up Value</span>
            <span className="text-white/80 font-medium">5,00,000 x (7/20) = Rs 1,75,000</span>
            <span className="text-white/50">Accrued Bonus</span>
            <span className="text-white/80 font-medium">Rs 1,68,000</span>
            <span className="text-white/50">SSV Multiplier (year 7, term 20)</span>
            <span className="text-white/80 font-medium">0.50</span>
          </div>
          <div className="border-t border-white/10 pt-3">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <span className="text-white/50">Paid-up + Bonus</span>
              <span className="text-white/80 font-medium">1,75,000 + 1,68,000 = Rs 3,43,000</span>
              <span className="text-white/50">SSV = 3,43,000 x 0.50</span>
              <span className="text-signal font-bold">Rs 1,71,500</span>
            </div>
          </div>
          <p className="text-white/40 text-xs mt-3">
            * In this example, SSV (Rs 1,71,500) is significantly higher than GSV (Rs 1,03,800).
            LIC would pay the SSV amount. The SSV multiplier increases with more years of premium
            payment, making SSV even more favourable for longer-running policies.
          </p>
        </div>
      </section>

      {/* --- Year-wise Table --- */}
      <section id="year-wise-table" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Year-wise Surrender Value Table</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The following table shows approximate GSV percentages of total premiums paid at
          different policy years. These are indicative values for traditional endowment plans
          and may vary by specific plan and term.
        </p>
        <div className="panel-inner overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-3 text-xs text-white/40 uppercase tracking-wide">Year of Surrender</th>
                <th className="text-left py-2 px-3 text-xs text-white/40 uppercase tracking-wide">Approx. GSV (% of Premiums)</th>
                <th className="text-left py-2 px-3 text-xs text-white/40 uppercase tracking-wide">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {[
                { year: "Year 1-2", pct: "0%", remark: "No surrender value acquired", color: "text-bad" },
                { year: "Year 3", pct: "~30%", remark: "Minimum eligibility, heavy loss", color: "text-bad" },
                { year: "Year 5", pct: "~35%", remark: "Still significant loss", color: "text-warn" },
                { year: "Year 7", pct: "~50%", remark: "SSV typically higher from here", color: "text-warn" },
                { year: "Year 10", pct: "~55%", remark: "Moderate recovery", color: "text-warn" },
                { year: "Year 12", pct: "~60%", remark: "Past halfway for most terms", color: "text-white/60" },
                { year: "Year 15", pct: "~70%", remark: "Better to hold if close to maturity", color: "text-white/60" },
                { year: "Year 18", pct: "~80%", remark: "Nearing maturity, consider holding", color: "text-good" },
                { year: "Year 20", pct: "~90%", remark: "Very close to maturity value", color: "text-good" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-2 px-3 text-white/60">{row.year}</td>
                  <td className={`py-2 px-3 font-semibold ${row.color}`}>{row.pct}</td>
                  <td className="py-2 px-3 text-white/40">{row.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-white/40 text-xs mt-3">
          * These percentages are approximate and vary by plan type, sum assured, premium
          payment mode, and LIC's prevailing surrender value factors. Use our{" "}
          <Link to="/surrender-calculator" className="text-signal hover:underline">
            Surrender Calculator
          </Link>{" "}
          for accurate estimates based on your specific policy.
        </p>
      </section>

      {/* --- When Can You Surrender --- */}
      <section id="when-can-you-surrender" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">When Can You Surrender</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Not all policies are eligible for surrender. LIC has specific rules about when a
          policy acquires surrender value.
        </p>
        <div className="space-y-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">Traditional Plans (Endowment, Money-Back, Whole Life)</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Minimum <span className="text-signal font-semibold">3 full years</span> of premium
              must have been paid. If you've paid less than 3 years of premiums, the policy lapses
              without any surrender value - you get nothing back.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">ULIPs (Unit Linked Insurance Plans)</p>
            <p className="text-white/50 text-sm leading-relaxed">
              ULIPs have a mandatory <span className="text-signal font-semibold">5-year lock-in
              period</span>. You cannot surrender before completing 5 years. After the lock-in,
              the fund value (NAV x units) is the surrender value.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">Pension / Annuity Plans</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Pension plans have different surrender rules. Some allow surrender after 3 years
              but with restrictions - a portion may need to be mandatorily used to purchase an
              annuity. Check your specific plan's terms.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-1">Assigned Policies</p>
            <p className="text-white/50 text-sm leading-relaxed">
              If your policy has been assigned (e.g., as collateral for a bank loan), you
              will need a No Objection Certificate (NOC) from the assignee before LIC will
              process the surrender.
            </p>
          </div>
        </div>
      </section>

      {/* --- Surrender Online --- */}
      <section id="surrender-online" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">How to Surrender Online</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          LIC has enabled online surrender for eligible policies through their customer portal.
          This is the fastest way to process your surrender. Not all policies may be available
          for online surrender - recently issued or assigned policies may require a branch visit.
        </p>
        <div className="space-y-2 mb-4">
          {[
            "Log in to the LIC customer portal at licindia.in using your registered user ID and password.",
            "Navigate to Policy Services and select 'Surrender' from the available options.",
            "Select the eligible policy you wish to surrender from the list of your active policies.",
            "Review the surrender value displayed on screen. LIC shows both GSV and SSV and the higher amount payable.",
            "Confirm your decision and authenticate with the OTP sent to your registered mobile number.",
            "Upload a scanned copy of the original policy bond when prompted.",
            "The surrender amount will be credited to your registered bank account within 7-10 working days.",
          ].map((step, i) => (
            <div key={i} className="panel-inner p-3 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <p className="text-white/60 text-sm">{step}</p>
            </div>
          ))}
        </div>
        <div className="panel p-4 border-l-4 border-l-signal">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Note:</span> Not all policies may be
            available for online surrender. If your policy does not appear in the online
            surrender list, you will need to visit your servicing branch in person.
          </p>
        </div>
      </section>

      {/* --- Surrender at Branch --- */}
      <section id="surrender-at-branch" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">How to Surrender at Branch</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          If online surrender is not available for your policy, or you prefer in-person
          processing, visit your LIC servicing branch with the following documents.
        </p>
        <div className="panel-inner p-5 mb-4">
          <p className="text-white font-semibold text-sm mb-3">Documents Required</p>
          <ul className="text-white/50 text-sm space-y-2 leading-relaxed">
            <li className="flex gap-2">
              <span className="text-signal">1.</span>
              <span>Original Policy Bond (mandatory)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-signal">2.</span>
              <span>Surrender Request Form (LIC Form No. 5074)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-signal">3.</span>
              <span>Identity proof (Aadhaar, PAN, Passport, or Voter ID)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-signal">4.</span>
              <span>Address proof (Aadhaar, utility bill, or bank statement)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-signal">5.</span>
              <span>Cancelled cheque or bank passbook copy for NEFT credit</span>
            </li>
            <li className="flex gap-2">
              <span className="text-signal">6.</span>
              <span>Discharge Voucher signed on a revenue stamp of Rs 1</span>
            </li>
          </ul>
        </div>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The branch processes the surrender request and credits the amount to your bank account
          within 10-15 working days. You will receive an SMS/email confirmation once the payment
          is processed.
        </p>
        <div className="panel p-4 border-l-4 border-l-warn">
          <p className="text-white/60 text-sm">
            <span className="text-warn font-semibold">Heads Up:</span> The branch officer may
            try to dissuade you from surrendering. This is common because agents lose trail
            commission on surrendered policies. If you have already made your decision after
            careful evaluation, politely insist on processing the surrender. You are within your
            rights to surrender any eligible policy.
          </p>
        </div>
      </section>

      {/* --- Tax on Surrender --- */}
      <section id="tax-on-surrender" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Tax on Surrender Value</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The tax treatment of surrender proceeds depends on the policy tenure, the premium-to-SA
          ratio, and when the policy was issued. Section 10(10D) of the Income Tax Act governs
          the exemption.
        </p>
        <div className="space-y-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Traditional Plans - Before 5 Years</p>
            <p className="text-white/50 text-sm leading-relaxed">
              If you surrender a traditional plan before completing{" "}
              <span className="text-bad font-semibold">5 years of premium payment</span>, the
              entire surrender value is taxable as 'Income from Other Sources'. It is added to
              your total income and taxed at your slab rate. Additionally, the Section 80C
              deduction claimed on premiums in earlier years may be reversed.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Traditional Plans - After 5 Years</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Surrender proceeds are <span className="text-good font-semibold">tax-free</span> if
              the annual premium does not exceed 10% of the sum assured (20% for policies issued
              before 1 April 2012). If the premium exceeds this ratio, the surrender value is
              taxable.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Policies Issued After 1 April 2023</p>
            <p className="text-white/50 text-sm leading-relaxed">
              For policies issued on or after 1 April 2023, if the aggregate annual premium across
              all life insurance policies exceeds{" "}
              <span className="text-warn font-semibold">Rs 5,00,000</span>, the surrender proceeds
              from policies above this threshold are taxable, regardless of the premium-to-SA ratio.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">ULIPs</p>
            <p className="text-white/50 text-sm leading-relaxed">
              ULIP surrender proceeds are taxable if surrendered before 5 years of the lock-in
              period. After 5 years, proceeds are generally tax-free unless the annual premium
              exceeds Rs 2,50,000 (for policies issued after 1 Feb 2021).
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">TDS on Surrender</p>
            <p className="text-white/50 text-sm leading-relaxed">
              LIC deducts TDS at <span className="text-signal font-semibold">5%</span> if the
              surrender value exceeds Rs 1,00,000 in a financial year and the proceeds are taxable.
              You can claim the TDS credit when filing your income tax return. Submit Form 15G/15H
              to LIC to avoid TDS if your total income is below the taxable threshold.
            </p>
          </div>
        </div>
      </section>

      {/* --- Alternatives --- */}
      <section id="alternatives" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Alternatives to Surrender</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Before surrendering your policy, consider these alternatives that let you access
          funds or reduce your premium burden without losing the policy entirely.
        </p>
        <div className="space-y-3">
          <div className="panel-inner p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-signal text-lg font-bold">1</span>
              <p className="text-white font-semibold text-sm">Make the Policy Paid-Up</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Stop paying premiums and let the policy continue with a reduced sum assured. You
              won't need to pay anything more, and you'll still receive a reduced maturity amount
              when the policy term ends. The paid-up value is Sum Assured x (Premiums Paid /
              Total Premiums Due). This is better than surrendering if you don't need the money
              immediately.
            </p>
          </div>
          <div className="panel-inner p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-signal text-lg font-bold">2</span>
              <p className="text-white font-semibold text-sm">Take a Policy Loan</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Borrow up to 85-90% of the surrender value while keeping the policy active with
              full benefits. The interest rate is typically 9-10% p.a. simple interest. You can
              repay the loan at any time, or let it be deducted from the maturity/death claim
              proceeds.{" "}
              <Link to="/guides/lic-loan-on-policy" className="text-signal hover:underline">
                Read our detailed guide on LIC policy loans
              </Link>.
            </p>
          </div>
          <div className="panel-inner p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-signal text-lg font-bold">3</span>
              <p className="text-white font-semibold text-sm">Premium Holiday / Auto Cover</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Some LIC plans allow a temporary break in premium payment using the accumulated
              bonus or cash value. The policy stays in force during this period without any
              reduction in benefits. Check if your specific plan supports this feature by
              contacting your LIC branch or checking the policy terms.
            </p>
          </div>
          <div className="panel-inner p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-signal text-lg font-bold">4</span>
              <p className="text-white font-semibold text-sm">Assignment / Transfer</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Transfer your policy to someone else through assignment. This can be useful if
              you took the policy as loan collateral and want to transfer it, or if a family
              member wants to take over the policy and continue the premiums. Assignment can be
              done at any LIC branch with both parties present.
            </p>
          </div>
        </div>
      </section>

      {/* --- Should You Surrender --- */}
      <section id="should-you-surrender" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Should You Surrender?</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Surrendering a life insurance policy is a significant financial decision. Use this
          checklist to evaluate whether surrender is the right choice for your situation.
        </p>

        <div className="panel-inner p-5 mb-4">
          <p className="text-white font-semibold text-sm mb-4">Surrender Decision Checklist</p>

          <div className="mb-4">
            <p className="text-good text-sm font-semibold mb-2">Consider Surrendering If:</p>
            <ul className="text-white/50 text-sm space-y-2 leading-relaxed">
              <li className="flex gap-2 items-start">
                <span className="text-good shrink-0">&#10003;</span>
                <span>The policy is a poor performer with returns below 5% p.a. and you have better investment options</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-good shrink-0">&#10003;</span>
                <span>You're in the early years (3-5) and want to cut losses rather than continue paying into a bad plan</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-good shrink-0">&#10003;</span>
                <span>The premium has become a financial burden and you cannot afford to continue</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-good shrink-0">&#10003;</span>
                <span>You have adequate life cover from other sources (term insurance, employer cover)</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-good shrink-0">&#10003;</span>
                <span>You no longer have dependents who need the life cover</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-bad text-sm font-semibold mb-2">Don't Surrender If:</p>
            <ul className="text-white/50 text-sm space-y-2 leading-relaxed">
              <li className="flex gap-2 items-start">
                <span className="text-bad shrink-0">&#10007;</span>
                <span>You're past halfway through the policy term - maturity is closer than you think</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-bad shrink-0">&#10007;</span>
                <span>You need the life cover and don't have an alternative term plan in place</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-bad shrink-0">&#10007;</span>
                <span>You're surrendering just to invest in a new insurance product (likely to benefit the agent, not you)</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-bad shrink-0">&#10007;</span>
                <span>The policy has accumulated significant bonuses that you'll lose on surrender</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-bad shrink-0">&#10007;</span>
                <span>You can manage by taking a policy loan or making the policy paid-up instead</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="panel-inner p-5 text-center">
          <p className="text-white/60 text-sm mb-3">
            Calculate the exact surrender value for your LIC policy
          </p>
          <Link
            to="/surrender-calculator"
            className="text-signal text-sm font-semibold hover:underline no-underline"
          >
            Open Surrender Calculator &rarr;
          </Link>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </GuideLayout>
  );
}
