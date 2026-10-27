import { Link } from "react-router-dom";
import GuideLayout from "../components/GuideLayout";
import FAQ from "../components/FAQ";

const FAQ_ITEMS = [
  {
    q: "Can I get a loan on my LIC term plan?",
    a: "No. Policy loans are only available on endowment, whole life, and money-back plans that have acquired a surrender value. Term insurance plans do not build any cash value, so they are not eligible for a policy loan. ULIPs and micro insurance plans are also ineligible.",
  },
  {
    q: "What is the maximum loan amount on LIC policy?",
    a: "You can borrow up to 90% of the surrender value of your policy. The exact percentage depends on the plan type and how long you have been paying premiums. LIC calculates the eligible loan amount based on the current surrender value at the time of your application.",
  },
  {
    q: "How long does it take to get a policy loan?",
    a: "If you apply online through the LIC e-Services portal (ebiz.licindia.in), the loan amount is typically credited to your bank account within 3-5 working days. For offline applications submitted at a branch, the processing takes 7-10 working days due to manual verification of the policy bond and documents.",
  },
  {
    q: "What happens if I don't repay the loan?",
    a: "If you do not repay the policy loan, interest continues to compound on the outstanding amount. LIC charges interest half-yearly, and unpaid interest is added to the principal. If the total outstanding (principal + accumulated interest) exceeds the surrender value of the policy, LIC will automatically terminate the policy, and you will lose your life cover and all future benefits.",
  },
  {
    q: "Can I get a loan if my policy is paid-up?",
    a: "Yes, you can get a loan on a paid-up policy as long as it has an existing surrender value. Since a paid-up policy has a reduced sum assured and correspondingly lower surrender value, the eligible loan amount will be less than what you could have borrowed on a fully active policy.",
  },
  {
    q: "Is LIC policy loan interest tax deductible?",
    a: "No. The interest paid on a loan taken against an individual LIC policy is not deductible under any section of the Income Tax Act. It is not eligible under Section 80C, Section 24, or any other provision. The loan interest is a personal expense and cannot be claimed as a deduction while filing your income tax return.",
  },
];

const TOC = [
  { id: "what-is-policy-loan", label: "What is a Policy Loan" },
  { id: "eligibility", label: "Eligibility Criteria" },
  { id: "how-much-can-you-borrow", label: "How Much Can You Borrow" },
  { id: "interest-rate", label: "Interest Rate on LIC Policy Loan" },
  { id: "apply-online", label: "How to Apply Online" },
  { id: "apply-offline", label: "How to Apply Offline" },
  { id: "required-documents", label: "Required Documents" },
  { id: "repayment-options", label: "Repayment Options" },
  { id: "loan-vs-surrender", label: "Policy Loan vs Surrender" },
  { id: "tips", label: "Tips & Things to Watch Out For" },
];

const RELATED_GUIDES = [
  { path: "/guides/lic-surrender-value", title: "LIC Surrender Value Guide" },
  { path: "/guides/lic-maturity-amount-check", title: "How to Check LIC Maturity Amount" },
  { path: "/guides/lic-claim-process", title: "LIC Claim Process Guide" },
];

const RELATED_TOOLS = [
  { path: "/loan-calculator", label: "Loan Calculator" },
  { path: "/surrender-calculator", label: "Surrender Calculator" },
  { path: "/premium-calculator", label: "Premium Calculator" },
];

export default function GuideLicLoanOnPolicy() {
  return (
    <GuideLayout
      tag="How-To Guide"
      title="How to Get Loan Against LIC Policy: Complete Guide"
      subtitle="Learn how to get emergency funds by borrowing against your LIC policy without surrendering it. Keep your life cover, continue earning bonuses, and repay at your own pace."
      publishDate="Oct 2026"
      readTime="9 min read"
      toc={TOC}
      relatedGuides={RELATED_GUIDES}
      relatedTools={RELATED_TOOLS}
    >
      {/* --- What is a Policy Loan --- */}
      <section id="what-is-policy-loan" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">What is a Policy Loan</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          A policy loan is a facility offered by LIC that allows policyholders to borrow money
          against the surrender value of their life insurance policy. It is one of the most
          underutilised benefits of traditional LIC plans. Unlike a personal loan or credit card
          advance, a policy loan uses your own policy as collateral, which means there is no
          external credit check, no income proof required, and the interest rate is significantly
          lower than most other borrowing options.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          It is important to understand that this is not a traditional loan in the conventional
          sense. LIC essentially lends you money that your policy has already accumulated in the
          form of surrender value. Your policy continues to remain active throughout the loan
          period &mdash; your life cover stays intact, and your policy keeps earning bonuses as
          usual. You do not need to surrender or give up your policy to access these funds.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          For policyholders facing a temporary financial emergency &mdash; medical expenses,
          education fees, home repairs &mdash; a policy loan is often the cheapest and fastest
          way to arrange funds without disrupting your long-term financial plan.
        </p>
        <div className="panel p-4 border-l-4 border-l-signal">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Key Advantage:</span>{" "}
            Unlike surrendering, a policy loan lets you access funds while keeping your life cover
            and bonus accumulation intact. It is one of the cheapest borrowing options available in
            India, with interest rates around 9% p.a.
          </p>
        </div>
      </section>

      {/* --- Eligibility Criteria --- */}
      <section id="eligibility" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Eligibility Criteria</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Not all LIC policies qualify for a loan. Your policy must meet certain conditions before
          LIC will approve a loan against it. The fundamental requirement is that the policy must
          have acquired a surrender value, which typically happens after three consecutive years
          of premium payments.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-good text-xs font-semibold uppercase tracking-wide mb-2">Eligible Plans</p>
            <ul className="space-y-2">
              {[
                "Endowment Plans (e.g., Jeevan Anand, New Endowment)",
                "Whole Life Plans (e.g., Jeevan Umang)",
                "Money-Back Plans (e.g., Jeevan Labh, New Money Back)",
                "Pension Plans with surrender value",
              ].map((item, i) => (
                <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                  <span className="text-good mt-0.5">&#10003;</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="panel-inner p-4">
            <p className="text-bad text-xs font-semibold uppercase tracking-wide mb-2">Not Eligible</p>
            <ul className="space-y-2">
              {[
                "Term Insurance Plans",
                "ULIPs (Unit Linked Plans)",
                "Micro Insurance Plans",
                "Lapsed Policies (premiums not paid)",
              ].map((item, i) => (
                <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                  <span className="text-bad mt-0.5">&#10007;</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="panel-inner p-4">
          <p className="text-white font-semibold text-sm mb-2">Key Requirements</p>
          <ul className="space-y-2">
            {[
              "Premiums must be paid for at least 3 consecutive years",
              "Policy must be in-force (not lapsed or surrendered)",
              "Policy must have acquired a surrender value",
              "No existing assignment that restricts borrowing",
            ].map((item, i) => (
              <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                <span className="text-signal mt-0.5">&#8226;</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- How Much Can You Borrow --- */}
      <section id="how-much-can-you-borrow" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">How Much Can You Borrow</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          LIC allows you to borrow up to 85-90% of the current surrender value of your policy.
          The exact percentage depends on the plan type and the policy terms. The surrender value
          itself increases with each year of premium payment, so the longer you have been paying
          premiums, the higher the loan amount you can access.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The formula is straightforward: the maximum loan amount equals the surrender value of
          your policy multiplied by the loan eligibility percentage. LIC calculates the surrender
          value based on the guaranteed surrender value plus any vested bonuses, then applies the
          eligibility percentage to arrive at the maximum loan you can take.
        </p>
        <div className="panel-inner p-5 mb-4">
          <p className="text-signal text-sm font-semibold mb-3">Worked Example</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-4">
            <span className="text-white/50">Policy</span>
            <span className="text-white/80 font-medium">Jeevan Anand (Plan 915)</span>
            <span className="text-white/50">Sum Assured</span>
            <span className="text-white/80 font-medium">Rs 10,00,000</span>
            <span className="text-white/50">Premiums Paid</span>
            <span className="text-white/80 font-medium">10 years</span>
            <span className="text-white/50">Current Surrender Value</span>
            <span className="text-white/80 font-medium">Rs 3,50,000</span>
            <span className="text-white/50">Loan Eligibility</span>
            <span className="text-white/80 font-medium">90% of Surrender Value</span>
          </div>
          <div className="border-t border-white/10 pt-3">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <span className="text-white/50 font-semibold">Maximum Loan Amount</span>
              <span className="text-signal font-bold">Rs 3,15,000</span>
            </div>
          </div>
          <p className="text-white/40 text-xs mt-3">
            * Loan Amount = Rs 3,50,000 x 90% = Rs 3,15,000. Actual surrender value depends on
            plan, term, bonus accumulation, and premium payment history.
          </p>
        </div>
        <div className="panel-inner p-5 text-center">
          <p className="text-white/60 text-sm mb-3">
            Estimate how much you can borrow against your LIC policy
          </p>
          <Link
            to="/loan-calculator"
            className="text-signal text-sm font-semibold hover:underline no-underline"
          >
            Open Loan Calculator &rarr;
          </Link>
        </div>
      </section>

      {/* --- Interest Rate --- */}
      <section id="interest-rate" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Interest Rate on LIC Policy Loan</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          LIC charges approximately 9% per annum on policy loans, calculated as simple interest
          and charged half-yearly. This rate is reviewed periodically by LIC and may change. The
          interest is debited to your loan account every six months, and any unpaid interest is
          added to the outstanding principal.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Compared to other borrowing options available in India, a policy loan offers one of the
          lowest interest rates. Here is how it stacks up against common alternatives:
        </p>
        <div className="panel-inner p-4 mb-4">
          <p className="text-white font-semibold text-sm mb-3">Interest Rate Comparison</p>
          <div className="space-y-2">
            {[
              { type: "LIC Policy Loan", rate: "~9%", highlight: true },
              { type: "Loan Against FD", rate: "7-8%", highlight: false },
              { type: "Gold Loan", rate: "8-9%", highlight: false },
              { type: "Personal Loan", rate: "12-18%", highlight: false },
              { type: "Credit Card Revolving", rate: "~36%", highlight: false },
            ].map((item, i) => (
              <div key={i} className={`flex justify-between items-center p-2 rounded text-sm ${item.highlight ? "bg-signal/10" : ""}`}>
                <span className={item.highlight ? "text-signal font-semibold" : "text-white/60"}>{item.type}</span>
                <span className={item.highlight ? "text-signal font-bold" : "text-white/80 font-medium"}>{item.rate}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel p-4 border-l-4 border-l-signal">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Note:</span>{" "}
            The interest rate on LIC policy loans is reviewed periodically and may vary. The rate
            applicable at the time of loan disbursement applies for the duration of the loan. Check
            the latest rate on the LIC website or at your branch before applying.
          </p>
        </div>
      </section>

      {/* --- Apply Online --- */}
      <section id="apply-online" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">How to Apply Online</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          LIC offers a convenient online process for applying for a policy loan through their
          e-Services portal. This is the fastest way to get your loan disbursed, with the amount
          typically credited to your bank account within 3-5 working days.
        </p>
        <div className="space-y-2 mb-4">
          {[
            "Log in to the LIC e-Services portal at ebiz.licindia.in using your registered credentials. If you do not have an account, register first using your policy number and date of birth.",
            "Navigate to 'Policy Loan' under the e-Services menu. This section shows all your eligible policies.",
            "Select the policy against which you want to take the loan. The system will display the eligible loan amount based on the current surrender value.",
            "Enter the loan amount you wish to borrow. This must be within the eligible limit displayed by the system.",
            "Verify your bank account details for NEFT credit. Ensure the account number and IFSC code are correct, as the loan amount will be transferred to this account.",
            "Submit the application with OTP verification. An OTP will be sent to your registered mobile number for authentication.",
            "Once processed, the loan amount is credited to your bank account within 3-5 working days. You will receive an SMS and email confirmation from LIC.",
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
            <span className="text-signal font-semibold">Tip:</span>{" "}
            Make sure your mobile number and email are updated in your LIC records before applying
            online. If they are not current, visit your branch first to update contact details.
          </p>
        </div>
      </section>

      {/* --- Apply Offline --- */}
      <section id="apply-offline" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">How to Apply Offline</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          If you prefer the traditional route, or if your policy is not enabled for online
          services, you can apply for a policy loan by visiting your nearest LIC branch. The
          offline process involves submitting physical documents and takes slightly longer than
          the online method.
        </p>
        <div className="space-y-2 mb-4">
          {[
            "Visit your nearest LIC branch (preferably the servicing branch where your policy is administered) with all required documents.",
            "Fill out the Loan Application Form No. 5104, available at the branch counter or downloadable from the LIC website.",
            "Submit the original policy bond along with the completed application form. LIC retains the bond as security until the loan is fully repaid.",
            "The branch verifies your documents, checks the policy status and surrender value, and processes the loan application.",
            "Processing and verification typically takes 7-10 working days. The loan amount is credited to your bank account via NEFT once approved.",
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
          After the loan is disbursed, LIC will send you a loan acknowledgement letter with
          details of the loan amount, interest rate, and the outstanding balance. Keep this letter
          safe for your records.
        </p>
      </section>

      {/* --- Required Documents --- */}
      <section id="required-documents" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Required Documents</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          For offline applications, you need to submit the following documents at the LIC branch.
          Online applications require fewer documents since most information is already in the
          system, but having these ready is still advisable.
        </p>
        <div className="panel-inner p-4">
          <div className="space-y-3">
            {[
              {
                doc: "Original Policy Bond",
                note: "LIC retains this as security until the loan is repaid. For online applications, the bond may not be required upfront.",
              },
              {
                doc: "Loan Application Form (No. 5104)",
                note: "Available at the branch or downloadable from the LIC website. Must be filled completely and signed by the policyholder.",
              },
              {
                doc: "Identity Proof",
                note: "Any one of: Aadhaar Card, PAN Card, Voter ID, Passport, or Driving Licence.",
              },
              {
                doc: "Address Proof",
                note: "Aadhaar Card, Utility Bill, Bank Statement, or Passport. Must match the address on LIC records.",
              },
              {
                doc: "Cancelled Cheque / Bank Passbook",
                note: "For NEFT credit of the loan amount. The account must be in the name of the policyholder.",
              },
              {
                doc: "Assignment Deed (if applicable)",
                note: "Required only if the policy has been assigned to a bank or financial institution. The assignee's NOC may also be needed.",
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <p className="text-white font-semibold text-sm mb-1">{item.doc}</p>
                <p className="text-white/50 text-sm leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Repayment Options --- */}
      <section id="repayment-options" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Repayment Options</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          LIC offers flexible repayment options for policy loans. There is no fixed EMI schedule
          or mandatory repayment timeline, giving you the freedom to repay at your convenience.
          However, it is important to understand how each option works to avoid the pitfall of
          compounding interest.
        </p>
        <div className="space-y-3 mb-4">
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Option 1: Interest-Only Payments</p>
            <p className="text-white/50 text-sm leading-relaxed mb-2">
              Pay the interest component half-yearly and repay the principal at any time of your
              choosing. This keeps the outstanding amount from growing and is the minimum you
              should aim for.
            </p>
            <div className="flex gap-4 text-xs">
              <span className="text-good">Pro: Prevents compounding, keeps loan manageable</span>
              <span className="text-warn">Con: Principal remains outstanding</span>
            </div>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Option 2: Partial Repayment</p>
            <p className="text-white/50 text-sm leading-relaxed mb-2">
              Reduce the principal in chunks whenever you have surplus funds. There is no minimum
              repayment amount, and no penalty for partial payments. Each repayment reduces the
              interest burden going forward.
            </p>
            <div className="flex gap-4 text-xs">
              <span className="text-good">Pro: Flexible, reduces interest over time</span>
              <span className="text-warn">Con: Requires discipline to make regular payments</span>
            </div>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Option 3: Full Repayment</p>
            <p className="text-white/50 text-sm leading-relaxed mb-2">
              Clear the entire outstanding loan (principal + accrued interest) at any time. There is
              no prepayment penalty. Once repaid, the original policy bond is returned to you and
              the policy is free of any encumbrance.
            </p>
            <div className="flex gap-4 text-xs">
              <span className="text-good">Pro: No prepayment penalty, full freedom</span>
              <span className="text-good">Pro: Policy bond returned immediately</span>
            </div>
          </div>
          <div className="panel-inner p-4">
            <p className="text-white font-semibold text-sm mb-2">Option 4: Auto-Deduction at Maturity / Claim</p>
            <p className="text-white/50 text-sm leading-relaxed mb-2">
              If you do not repay the loan during the policy term, the outstanding amount (principal
              + all accrued interest) is automatically deducted from the maturity payout or death
              claim settlement. The balance is paid to you or your nominee.
            </p>
            <div className="flex gap-4 text-xs">
              <span className="text-warn">Con: Interest compounds over years, significantly reducing payout</span>
              <span className="text-bad">Con: Can erode a large portion of maturity value</span>
            </div>
          </div>
        </div>
        <div className="panel p-4 border-l-4 border-l-signal">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Recommendation:</span>{" "}
            At the very minimum, pay the half-yearly interest to prevent compounding. Ideally,
            repay the principal as soon as your financial situation improves. Use our{" "}
            <Link to="/loan-calculator" className="text-signal hover:underline">
              Loan Calculator
            </Link>{" "}
            to see how interest accumulates over time.
          </p>
        </div>
      </section>

      {/* --- Loan vs Surrender --- */}
      <section id="loan-vs-surrender" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Policy Loan vs Surrender</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          When you need money from your LIC policy, you have two choices: take a loan against it
          or surrender the policy entirely. This comparison will help you understand why a policy
          loan is almost always the better option for temporary financial needs.
        </p>
        <div className="panel-inner p-4 mb-4">
          <div className="space-y-3">
            {[
              {
                factor: "Life Cover",
                loan: "Continues throughout",
                loanColor: "text-good",
                surrender: "Terminated permanently",
                surrenderColor: "text-bad",
              },
              {
                factor: "Bonus Accumulation",
                loan: "Keeps accumulating",
                loanColor: "text-good",
                surrender: "Forfeited on all future bonuses",
                surrenderColor: "text-bad",
              },
              {
                factor: "Amount Received",
                loan: "Up to 90% of surrender value",
                loanColor: "text-white/80",
                surrender: "100% of surrender value",
                surrenderColor: "text-white/80",
              },
              {
                factor: "Repayment",
                loan: "Required (flexible timeline)",
                loanColor: "text-white/80",
                surrender: "Not applicable",
                surrenderColor: "text-white/80",
              },
              {
                factor: "Future Maturity Payout",
                loan: "Full maturity value minus loan outstanding",
                loanColor: "text-good",
                surrender: "No maturity benefit",
                surrenderColor: "text-bad",
              },
              {
                factor: "Best For",
                loan: "Temporary financial need",
                loanColor: "text-white/80",
                surrender: "Permanent exit from the policy",
                surrenderColor: "text-white/80",
              },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <span className="text-white font-semibold">{row.factor}</span>
                <span className={row.loanColor}>{row.loan}</span>
                <span className={row.surrenderColor}>{row.surrender}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs text-white/40 mt-3 pt-3 border-t border-white/10">
            <span></span>
            <span className="font-semibold text-signal">Policy Loan</span>
            <span className="font-semibold text-white/60">Surrender</span>
          </div>
        </div>
        <p className="text-white/60 text-sm leading-relaxed">
          In nearly all situations where you need temporary access to funds, a policy loan is the
          smarter choice. Surrendering should only be considered when you have permanently decided
          to exit the policy and have no further need for the life cover. Use our{" "}
          <Link to="/surrender-calculator" className="text-signal hover:underline">
            Surrender Calculator
          </Link>{" "}
          to see what you would receive if you surrendered, and compare it with the loan amount
          available.
        </p>
      </section>

      {/* --- Tips --- */}
      <section id="tips" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Tips & Things to Watch Out For</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          While a policy loan is a convenient and low-cost borrowing option, there are several
          important things you should be aware of before and after taking one. Ignoring these can
          lead to unpleasant surprises at maturity.
        </p>
        <div className="space-y-3">
          <div className="panel-inner p-4">
            <div className="flex gap-3 items-start">
              <span className="text-bad text-lg mt-0.5">&#9888;</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Beware of Compound Interest</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  If you do not pay the half-yearly interest, it gets added to the principal. This
                  means you start paying interest on interest. Over several years, the outstanding
                  amount can snowball and significantly eat into your maturity value or even exceed
                  the surrender value.
                </p>
              </div>
            </div>
          </div>
          <div className="panel-inner p-4">
            <div className="flex gap-3 items-start">
              <span className="text-bad text-lg mt-0.5">&#9888;</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Policy Can Lapse</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  If the total outstanding amount (principal + accumulated interest) exceeds the
                  surrender value of your policy, LIC will automatically terminate the policy. You
                  lose your life cover, all future bonuses, and the maturity benefit. This is the
                  worst-case scenario and must be avoided at all costs.
                </p>
              </div>
            </div>
          </div>
          <div className="panel-inner p-4">
            <div className="flex gap-3 items-start">
              <span className="text-warn text-lg mt-0.5">&#9679;</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">No Tax Deduction on Interest</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  The interest you pay on a policy loan is not tax-deductible under any section of
                  the Income Tax Act for individual policies. Do not factor in any tax benefit when
                  calculating the effective cost of borrowing.
                </p>
              </div>
            </div>
          </div>
          <div className="panel-inner p-4">
            <div className="flex gap-3 items-start">
              <span className="text-signal text-lg mt-0.5">&#9679;</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Consider ULIP Partial Withdrawal Instead</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  If you hold a ULIP (which is not eligible for a policy loan), you may be able to
                  make a partial withdrawal after the 5-year lock-in period. This is not a loan, so
                  there is no interest to pay. Check with your insurer for the partial withdrawal
                  rules specific to your ULIP.
                </p>
              </div>
            </div>
          </div>
          <div className="panel-inner p-4">
            <div className="flex gap-3 items-start">
              <span className="text-signal text-lg mt-0.5">&#9679;</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Compare with Other Loan Options</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Before taking a policy loan, compare the effective cost with other available
                  options like a loan against fixed deposit (7-8%) or a gold loan (8-9%). While
                  policy loans are convenient, a loan against FD may offer an even lower rate
                  depending on your bank.
                </p>
              </div>
            </div>
          </div>
          <div className="panel-inner p-4">
            <div className="flex gap-3 items-start">
              <span className="text-good text-lg mt-0.5">&#10003;</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Repay as Soon as Possible</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  The golden rule with policy loans is to repay the principal as quickly as your
                  finances allow. There is no prepayment penalty, so there is no cost to early
                  repayment. The sooner you clear the loan, the less interest you pay, and the more
                  of your maturity value you preserve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </GuideLayout>
  );
}
