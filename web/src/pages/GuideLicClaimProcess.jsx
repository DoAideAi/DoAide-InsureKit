import { Link } from "react-router-dom";
import GuideLayout from "../components/GuideLayout";
import FAQ from "../components/FAQ";

const FAQ_ITEMS = [
  {
    q: "How long does LIC take to settle a maturity claim?",
    a: "30 days from the maturity date for registered policies. If your NEFT details and PAN are updated in LIC records, the maturity amount is auto-credited to your bank account without any claim forms. For unregistered policies, the process may take 45-60 days after you submit all required documents at your servicing branch.",
  },
  {
    q: "What documents are needed for a death claim?",
    a: "Original policy bond (or indemnity bond if lost), death certificate issued by municipal authority, claimant's identity proof (Aadhaar/PAN), claimant's bank account details, NEFT mandate form, and the claim form (Form 3783/3816). For accidental death claims, you also need the FIR copy, post-mortem report, police inquest report, and treating hospital records if applicable.",
  },
  {
    q: "Can a nominee file a claim without the original policy bond?",
    a: "Yes. The nominee must submit an indemnity bond (on stamp paper) and a notarized affidavit declaring that the original policy bond is lost or destroyed. LIC may also ask for a newspaper advertisement about the lost bond for policies with higher sum assured. The claim process continues normally after these additional documents are accepted.",
  },
  {
    q: "What happens if the policyholder dies within 3 years?",
    a: "This is classified as an 'early claim' and LIC investigates more thoroughly. The claim undergoes detailed scrutiny including medical history verification, cause of death investigation, and agent report. The outcome can be: full claim settlement if everything is in order, repudiation (rejection) if material non-disclosure is found, or ex-gratia settlement at a reduced amount as a goodwill gesture when there is partial non-disclosure.",
  },
  {
    q: "Is TDS deducted on LIC claim amount?",
    a: "It depends on the claim type. Death claim proceeds are fully exempt from income tax under Section 10(10D) - no TDS is deducted. For maturity claims, if the annual premium exceeds 10% of the sum assured (5% for policies issued after 1 April 2012 with SA above Rs 10 lakh), TDS at 5% is deducted on amounts exceeding Rs 1 lakh. Submit Form 15G/15H to avoid TDS if your total income is below the taxable limit.",
  },
  {
    q: "How to check LIC claim status online?",
    a: "Visit licindia.in and go to Online Services > Claim Status. Enter your policy number and date of birth. The portal shows the current status of your claim - whether it is registered, under process, approved, or settled. You can also call LIC customer care at 022-68276827 or visit your servicing branch for a status update.",
  },
  {
    q: "Can a legal heir file a claim if there is no nominee?",
    a: "Yes, but the process is longer. The legal heir must obtain a succession certificate or legal heir certificate from a civil court. Along with this, they need to submit all regular claim documents plus an indemnity bond and affidavit. For smaller claim amounts (typically below Rs 1 lakh), LIC may accept a legal heir certificate from the tehsildar or revenue authority instead of a court order.",
  },
];

const TOC = [
  { id: "types-of-claims", label: "Types of LIC Claims" },
  { id: "maturity-claim", label: "Maturity Claim Process" },
  { id: "death-claim", label: "Death Claim Process" },
  { id: "survival-benefit", label: "Survival Benefit Claim" },
  { id: "documents-required", label: "Documents Required" },
  { id: "file-online", label: "How to File Claim Online" },
  { id: "file-at-branch", label: "How to File at Branch" },
  { id: "settlement-timeline", label: "Claim Settlement Timeline" },
  { id: "rejection-reasons", label: "Common Reasons for Claim Rejection" },
  { id: "if-rejected", label: "What to Do If Claim is Rejected" },
  { id: "tips", label: "Tips for Smooth Claim Settlement" },
];

const RELATED_GUIDES = [
  { path: "/guides/lic-policy-status-check", title: "How to Check LIC Policy Status" },
  { path: "/guides/lic-maturity-amount-check", title: "How to Check LIC Maturity Amount" },
  { path: "/guides/lic-surrender-value", title: "LIC Surrender Value Guide" },
];

const RELATED_TOOLS = [
  { path: "/claim-estimator", label: "Claim Estimator" },
  { path: "/maturity-calculator", label: "Maturity Calculator" },
  { path: "/premium-calendar", label: "Premium Calendar" },
];

export default function GuideLicClaimProcess() {
  return (
    <GuideLayout
      tag="How-To Guide"
      title="LIC Claim Process: Documents, Steps & Settlement"
      subtitle="Complete guide to filing LIC claims - maturity, death, survival benefit. Know the documents required, step-by-step process, settlement timelines, and what to do if your claim is rejected."
      publishDate="Oct 2026"
      readTime="10 min read"
      toc={TOC}
      relatedGuides={RELATED_GUIDES}
      relatedTools={RELATED_TOOLS}
    >
      {/* --- Types of LIC Claims --- */}
      <section id="types-of-claims" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Types of LIC Claims</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          LIC policyholders or their nominees can file different types of claims depending on
          the policy event. Understanding which claim type applies to your situation is the first
          step in the process. Each claim type has its own set of documents, procedures, and
          settlement timelines.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Below are the four main types of claims you can file with LIC. The process and
          documentation requirements differ for each, so make sure you identify the correct
          claim type before proceeding.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="panel-inner p-4">
            <p className="text-signal text-sm font-semibold mb-2">Maturity Claim</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Filed when the policy completes its full term and the sum assured plus accumulated
              bonuses become payable. This is the most straightforward claim type. If your NEFT
              details are registered, LIC auto-credits the amount on the maturity date.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-signal text-sm font-semibold mb-2">Death Claim</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Filed by the nominee or legal heir when the policyholder passes away during the
              policy term. The sum assured plus vested bonuses are paid to the claimant. Death
              claims within 3 years of policy issuance undergo additional investigation.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-signal text-sm font-semibold mb-2">Survival Benefit Claim</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Applicable to money-back policies where a percentage of the sum assured is paid out
              at regular intervals during the policy term. These periodic payouts are automatic
              if your bank details are registered with LIC.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-signal text-sm font-semibold mb-2">Accident Benefit Claim</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Filed when the policyholder has the Accident Death and Disability Benefit (ADDB)
              rider and dies due to an accident or suffers permanent disability. An additional
              sum equal to the base sum assured is paid over and above the death claim.
            </p>
          </div>
        </div>
      </section>

      {/* --- Maturity Claim Process --- */}
      <section id="maturity-claim" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Maturity Claim Process</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          The maturity claim is the simplest of all LIC claims. When your policy completes its
          full term, the maturity amount (sum assured + vested bonuses + final additional bonus)
          becomes payable. LIC typically sends a maturity intimation letter or SMS about 2-3
          months before the maturity date, reminding you to update your bank details.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          If you are a registered user on the LIC portal and your NEFT/bank details and PAN are
          updated, the maturity amount is auto-credited to your bank account on the maturity date.
          No forms or branch visits are needed. This is called{" "}
          <span className="text-signal font-semibold">auto settlement</span>.
        </p>
        <div className="panel p-4 border-l-4 border-l-signal mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Auto Settlement:</span> To ensure
            automatic maturity credit, log in to licindia.in and update your NEFT mandate and PAN
            at least 3 months before maturity. Go to e-Services &gt; NEFT Mandate Registration.
            Once verified, LIC will directly credit the maturity amount to your bank account.
          </p>
        </div>
        <p className="text-white/80 text-sm font-semibold mb-3">Manual Maturity Claim Steps</p>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          If you are not registered for auto settlement or if the amount is not credited
          automatically, follow these steps to file a manual maturity claim.
        </p>
        <div className="space-y-2 mb-4">
          {[
            "Collect the maturity intimation letter from LIC (sent 2-3 months before maturity) or note down your policy maturity date.",
            "Fill in the Discharge Voucher (Form 3825) sent by LIC. Sign it exactly as your name appears on the policy bond.",
            "Submit the original policy bond, discharge voucher, ID proof (Aadhaar/PAN), and a cancelled cheque or NEFT mandate form at your servicing branch.",
            "LIC processes the claim and verifies all documents. If everything is in order, the maturity amount is credited within 7-15 working days.",
            "Check your bank statement or LIC portal for the credit. You will also receive an SMS confirmation from LIC.",
          ].map((step, i) => (
            <div key={i} className="panel-inner p-3 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <p className="text-white/60 text-sm">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Death Claim Process --- */}
      <section id="death-claim" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Death Claim Process</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          A death claim is filed by the nominee (or legal heir if no nominee is registered)
          when the policyholder passes away during the policy term. The claim amount includes
          the sum assured, all vested bonuses, and the final additional bonus declared by LIC.
          Death claim proceeds are fully exempt from income tax under Section 10(10D).
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          LIC categorizes death claims into two types based on when the death occurs relative
          to the policy start date. This classification significantly affects the investigation
          process and settlement timeline.
        </p>

        <div className="panel p-4 border-l-4 border-l-warn mb-4">
          <p className="text-white/60 text-sm">
            <span className="text-warn font-semibold">Early Death Claim (within 3 years):</span>{" "}
            If the policyholder dies within 3 years of policy issuance or revival, it is classified
            as an early claim. LIC conducts a thorough investigation including verification of the
            proposal form details, medical history, cause of death, and agent's report. This process
            can take 90-180 days. The claim may be settled in full, repudiated if fraud or
            non-disclosure is found, or settled at a reduced ex-gratia amount.
          </p>
        </div>

        <p className="text-white/80 text-sm font-semibold mb-3">Steps for Nominee</p>
        <div className="space-y-2 mb-4">
          {[
            "Inform the LIC branch office about the policyholder's death as soon as possible. Note down the claim intimation reference number.",
            "Obtain the death certificate from the municipal authority. For accidental death, also file an FIR and obtain a copy.",
            "Fill in the Claim Form (Form 3783 for non-early claims, Form 3816 for early claims). The branch will provide the correct form.",
            "Submit the original policy bond, death certificate, claimant's ID proof, NEFT mandate form, and any additional documents requested by LIC.",
            "LIC assigns a claims officer who verifies documents and may visit for investigation (especially for early claims). Cooperate fully with the investigation.",
            "Once approved, the claim amount is credited to the nominee's bank account. LIC issues a discharge voucher for the nominee to sign.",
          ].map((step, i) => (
            <div key={i} className="panel-inner p-3 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <p className="text-white/60 text-sm">{step}</p>
            </div>
          ))}
        </div>

        <p className="text-white/80 text-sm font-semibold mb-3">Steps for Legal Heir (No Nominee)</p>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          If no nominee is registered on the policy, the legal heir must first establish their
          right to receive the claim amount. This requires a succession certificate from a civil
          court or a legal heir certificate from the tehsildar (for smaller amounts). The legal
          heir then follows the same process as a nominee, with the additional court documents.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          For claim amounts below Rs 1 lakh, LIC may accept a legal heir certificate from the
          revenue authority (tehsildar) along with an indemnity bond. For larger amounts, a
          court-issued succession certificate is mandatory. The legal heir process typically takes
          3-6 months longer than a nominee claim due to the court proceedings.
        </p>
      </section>

      {/* --- Survival Benefit Claim --- */}
      <section id="survival-benefit" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Survival Benefit Claim</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          Survival benefit is a feature of money-back policies (like Jeevan Tarun, Jeevan Shiromani,
          Bima Bachat, etc.) where a fixed percentage of the sum assured is paid out at regular
          intervals during the policy term. For example, in a 20-year money-back plan, you might
          receive 20% of the sum assured at the end of 5th, 10th, and 15th year, with the remaining
          40% plus bonuses paid at maturity.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          If your bank details (NEFT) are registered with LIC, survival benefit payouts are
          auto-credited to your bank account on the due date. No forms or branch visits are
          required. LIC sends an SMS notification when the amount is credited.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          If the payout is not auto-credited, you need to submit a Discharge Voucher at your
          servicing branch along with the policy bond for endorsement. LIC will process the
          survival benefit and credit it within 7-15 working days. Keep in mind that all premiums
          must be paid up to the survival benefit due date for the payout to be processed.
        </p>
        <div className="panel p-4 border-l-4 border-l-signal">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Important:</span> Survival benefit is
            only paid if all premiums due up to that date have been paid. If your policy is lapsed
            or has unpaid premiums, the survival benefit will be withheld until the policy is
            revived. Register your NEFT details on the LIC portal to ensure automatic payouts.
          </p>
        </div>
      </section>

      {/* --- Documents Required --- */}
      <section id="documents-required" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Documents Required</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          The documents you need depend on the type of claim you are filing. Below is a detailed
          list for each claim type. Keep certified copies of all documents before submitting
          originals to LIC.
        </p>

        <div className="space-y-4">
          <div className="panel-inner p-4">
            <p className="text-signal text-sm font-semibold mb-3">Maturity Claim Documents</p>
            <ul className="text-white/50 text-sm space-y-2 leading-relaxed">
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>Original policy bond</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>Discharge voucher (Form 3825) signed by the policyholder</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>Identity proof - Aadhaar card or PAN card</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>Cancelled cheque or NEFT mandate form with bank account details</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>PAN card (mandatory for amounts above Rs 1 lakh to avoid higher TDS)</span>
              </li>
            </ul>
          </div>

          <div className="panel-inner p-4">
            <p className="text-signal text-sm font-semibold mb-3">Death Claim Documents</p>
            <ul className="text-white/50 text-sm space-y-2 leading-relaxed">
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>Original policy bond (or indemnity bond + affidavit if lost)</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>Claim form - Form 3783 (non-early) or Form 3816 (early claim)</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>Death certificate issued by municipal authority (original + copy)</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>Claimant's (nominee/legal heir) identity proof - Aadhaar and PAN</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>NEFT mandate form with claimant's bank account details</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>Hospital records and treating doctor's certificate (if death due to illness)</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-warn shrink-0">&#8226;</span>
                <span className="text-white/60">
                  <span className="text-warn font-semibold">For accidental death:</span> FIR copy,
                  post-mortem report, police inquest report, final police report, and driving
                  licence (if motor accident)
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-warn shrink-0">&#8226;</span>
                <span className="text-white/60">
                  <span className="text-warn font-semibold">For legal heir (no nominee):</span>{" "}
                  Succession certificate from court or legal heir certificate from tehsildar
                </span>
              </li>
            </ul>
          </div>

          <div className="panel-inner p-4">
            <p className="text-signal text-sm font-semibold mb-3">Survival Benefit Documents</p>
            <ul className="text-white/50 text-sm space-y-2 leading-relaxed">
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>Policy bond (for endorsement of the survival benefit payout)</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>Discharge voucher signed by the policyholder</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-signal shrink-0">&#8226;</span>
                <span>NEFT mandate form (if not already registered)</span>
              </li>
            </ul>
            <p className="text-white/40 text-xs mt-2">
              Minimal documents needed. If NEFT is registered, survival benefit is auto-credited
              with no documents required.
            </p>
          </div>
        </div>
      </section>

      {/* --- How to File Claim Online --- */}
      <section id="file-online" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">How to File Claim Online</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          LIC has digitized much of the claim process through its online portal. While death
          claims still require physical document submission, maturity and survival benefit claims
          can be largely processed online if your policy is registered on the LIC portal.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Follow these steps to initiate or track your claim online through the LIC website.
        </p>
        <div className="space-y-2 mb-4">
          {[
            "Visit the LIC website at licindia.in and click on 'Customer Login' or 'Online Services' from the top menu.",
            "Log in with your registered credentials. If you don't have an account, register using your policy number, date of birth, and mobile number linked to the policy.",
            "Navigate to e-Services and select the relevant option: 'Maturity Claim' for maturity, or 'NEFT Mandate Registration' to ensure auto-settlement for future claims.",
            "Verify your policy details and bank account information. Update NEFT/bank details if they are incorrect or missing. Upload PAN card if not already linked.",
            "For maturity claims, submit the online discharge voucher. Digitally sign if applicable, or print, sign, and upload the scanned copy.",
            "Track your claim status under Online Services > Claim Status. Enter your policy number to see real-time updates on your claim processing stage.",
            "The claim amount will be credited to your registered bank account. You will receive an SMS and email confirmation from LIC.",
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
            <span className="text-signal font-semibold">Note:</span> Death claims cannot be
            fully processed online. You must visit the servicing branch to submit original
            documents. However, you can initiate the claim intimation online and track the
            status through the portal.
          </p>
        </div>
      </section>

      {/* --- How to File at Branch --- */}
      <section id="file-at-branch" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">How to File at Branch</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          For death claims and situations where online filing is not possible, you need to
          visit the LIC servicing branch in person. The servicing branch is the branch where
          the policy was originally issued or last transferred. You can find your servicing
          branch details on the policy bond or by calling LIC customer care.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Follow these steps for a smooth branch visit. It is advisable to call the branch
          beforehand to confirm the required documents and the claims officer's availability.
        </p>
        <div className="space-y-2 mb-4">
          {[
            "Identify your servicing branch from the policy bond or by calling LIC helpline (022-68276827). Confirm the branch address and working hours.",
            "Gather all required documents for your claim type (refer to the Documents Required section above). Carry both originals and self-attested photocopies.",
            "Visit the branch and meet the claims section officer. Submit the claim intimation along with all documents. Obtain a written acknowledgement with the claim registration number.",
            "The claims officer will verify your documents and may ask for additional papers. For death claims, an investigation officer may be assigned who will contact you for further verification.",
            "Keep the acknowledgement slip safe and follow up at the branch or through the LIC portal (Claim Status section) after 15-20 working days if you haven't received an update.",
            "Once approved, LIC processes the payment via NEFT to the registered bank account. Sign the discharge voucher when presented by the branch.",
          ].map((step, i) => (
            <div key={i} className="panel-inner p-3 flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <p className="text-white/60 text-sm">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Claim Settlement Timeline --- */}
      <section id="settlement-timeline" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Claim Settlement Timeline</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          LIC is mandated by IRDAI regulations to settle claims within a stipulated time frame.
          Delays beyond the prescribed period entitle the claimant to penal interest from LIC.
          However, actual settlement timelines depend on the claim type, completeness of
          documents, and whether any investigation is required.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Below are the typical settlement timelines for each claim type. These are from the
          date LIC receives all required documents in complete form.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="panel-inner p-4 text-center">
            <p className="text-good text-2xl font-bold mb-1">30 Days</p>
            <p className="text-white text-sm font-semibold mb-2">Maturity Claim</p>
            <p className="text-white/50 text-xs leading-relaxed">
              From the maturity date. Auto settlement with NEFT can be as fast as the same day.
              Manual claims take 7-15 working days after document submission.
            </p>
          </div>
          <div className="panel-inner p-4 text-center">
            <p className="text-warn text-2xl font-bold mb-1">30-90 Days</p>
            <p className="text-white text-sm font-semibold mb-2">Death Claim</p>
            <p className="text-white/50 text-xs leading-relaxed">
              Non-early claims: 30 days. Early claims (within 3 years): 90-180 days due to
              mandatory investigation. Complex cases may take longer.
            </p>
          </div>
          <div className="panel-inner p-4 text-center">
            <p className="text-good text-2xl font-bold mb-1">15 Days</p>
            <p className="text-white text-sm font-semibold mb-2">Survival Benefit</p>
            <p className="text-white/50 text-xs leading-relaxed">
              Auto-credited on the due date if NEFT is registered. Manual claims processed
              within 15 working days of discharge voucher submission.
            </p>
          </div>
        </div>
        <div className="panel p-4 border-l-4 border-l-warn">
          <p className="text-white/60 text-sm">
            <span className="text-warn font-semibold">Disputed or Investigated Claims:</span>{" "}
            If LIC initiates an investigation (common for early death claims, high sum assured
            claims, or claims with incomplete documentation), the settlement timeline can extend
            to 6-12 months. During investigation, LIC may request additional documents, conduct
            field visits, or seek medical opinions. If you believe LIC is causing unnecessary
            delays, you can escalate through the IRDAI IGMS portal.
          </p>
        </div>
      </section>

      {/* --- Common Reasons for Claim Rejection --- */}
      <section id="rejection-reasons" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Common Reasons for Claim Rejection</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          LIC rejects (repudiates) a small percentage of claims each year. Understanding the
          common reasons for rejection can help you avoid these pitfalls and ensure your family
          receives the claim amount without issues. Most rejections happen in death claims,
          particularly early death claims.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Below are the most common reasons LIC rejects claims. Being aware of these can help
          you take preventive steps right from the time of purchasing the policy.
        </p>
        <div className="space-y-3">
          <div className="panel-inner p-4">
            <p className="text-bad text-sm font-semibold mb-2">Non-Disclosure of Medical History</p>
            <p className="text-white/50 text-sm leading-relaxed">
              The most common reason for rejection. If the policyholder did not disclose a
              pre-existing medical condition (diabetes, hypertension, heart disease, etc.) at the
              time of purchasing the policy, and death occurs due to or related to that condition,
              LIC can repudiate the claim. Always declare your complete medical history truthfully
              in the proposal form.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-bad text-sm font-semibold mb-2">Lapsed Policy</p>
            <p className="text-white/50 text-sm leading-relaxed">
              If premiums have not been paid and the policy has lapsed, no claim is payable.
              Even if the policyholder dies during the grace period (30 days for annual/half-yearly,
              15 days for monthly premiums), the claim may be settled after deducting the due
              premium. A fully lapsed policy has no cover, and the claim will be outright rejected.{" "}
              <Link to="/guides/revive-lapsed-policy" className="text-signal hover:underline">
                Learn how to revive a lapsed policy
              </Link>.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-bad text-sm font-semibold mb-2">Suicide Clause (Within 1 Year)</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Under Section 45 of the Insurance Act, if the policyholder dies by suicide within
              12 months of the policy commencement or the last revival date, LIC is not liable to
              pay the full claim. Only 80% of the premiums paid (excluding any extra premiums for
              riders) will be refunded. This is a standard industry clause applied by all insurers.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-bad text-sm font-semibold mb-2">Fraud or Misrepresentation</p>
            <p className="text-white/50 text-sm leading-relaxed">
              If LIC's investigation reveals that the policy was obtained through fraud - such as
              impersonation during medical examination, forged documents, false age declaration,
              or inflated income statements - the claim is rejected entirely. In cases of proven
              fraud, even the premiums paid may not be refunded.
            </p>
          </div>
          <div className="panel-inner p-4">
            <p className="text-bad text-sm font-semibold mb-2">Incorrect or Incomplete Documentation</p>
            <p className="text-white/50 text-sm leading-relaxed">
              While not a permanent rejection, submitting incorrect claim forms, mismatched
              signatures, expired ID proofs, or incomplete documents will delay your claim. LIC
              returns the papers asking for corrections, and the settlement clock resets. Ensure
              all documents are accurate and complete before submission to avoid these delays.
            </p>
          </div>
        </div>
      </section>

      {/* --- What to Do If Claim is Rejected --- */}
      <section id="if-rejected" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">What to Do If Claim is Rejected</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-3">
          If LIC rejects your claim, do not lose hope. There is a structured grievance redressal
          mechanism available to every policyholder and claimant in India. You have the right to
          challenge the decision at multiple levels, and many rejected claims are overturned on
          appeal if the rejection is unjustified.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Follow these three escalation levels in order. Each level has specific procedures and
          timelines. Keep copies of all correspondence and responses at each stage.
        </p>
        <div className="space-y-2 mb-4">
          <div className="panel-inner p-3 flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-1">LIC Grievance Redressal Cell</p>
              <p className="text-white/60 text-sm">
                Write a formal complaint to the Grievance Redressal Officer at your LIC branch or
                divisional office. Clearly state why you believe the rejection is wrong and attach
                supporting evidence. You can also file a complaint online at licindia.in under
                'Customer Services &gt; Grievance Redressal'. LIC is required to respond within
                15 days. If unsatisfied with the response, escalate to the next level.
              </p>
            </div>
          </div>
          <div className="panel-inner p-3 flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-1">IRDAI IGMS Portal</p>
              <p className="text-white/60 text-sm">
                If LIC does not resolve your complaint within 15 days or you are unsatisfied with
                their response, file a complaint on the IRDAI Integrated Grievance Management
                System (IGMS) at igms.irda.gov.in. Register on the portal, select LIC as the
                insurer, and describe your grievance in detail. Upload all relevant documents
                including the rejection letter. IRDAI intervenes and directs LIC to reconsider.
                Response timeline is 15-30 days.
              </p>
            </div>
          </div>
          <div className="panel-inner p-3 flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-signal/10 text-signal font-bold text-sm flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-1">Insurance Ombudsman</p>
              <p className="text-white/60 text-sm">
                If the IGMS route does not resolve your issue, approach the Insurance Ombudsman in
                your region. The Ombudsman is a quasi-judicial authority that hears insurance disputes
                for claims up to Rs 50 lakh. File a written complaint within 1 year of the
                rejection or the insurer's final response. The Ombudsman's decision is binding on
                LIC (but not on you - you can still approach consumer court). The process is free
                and does not require a lawyer. Find your regional Ombudsman at
                cioins.co.in/ombudsman.
              </p>
            </div>
          </div>
        </div>
        <div className="panel p-4 border-l-4 border-l-signal">
          <p className="text-white/60 text-sm">
            <span className="text-signal font-semibold">Beyond Ombudsman:</span> If the
            Ombudsman's decision is also unfavorable, you can approach the Consumer Disputes
            Redressal Forum (consumer court) or file a civil suit. For claims involving large
            amounts, consider consulting a lawyer who specializes in insurance disputes.
          </p>
        </div>
      </section>

      {/* --- Tips for Smooth Claim Settlement --- */}
      <section id="tips" className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Tips for Smooth Claim Settlement</h2>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Most claim delays and rejections are avoidable with proper planning. Follow these
          practical tips to ensure that your claim (or your family's claim) is processed quickly
          and without complications.
        </p>
        <div className="space-y-3">
          <div className="panel-inner p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-signal text-lg font-bold">1</span>
              <p className="text-white font-semibold text-sm">Keep Your Policy Active</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Pay premiums on time, every time. Set up auto-debit through your bank or register
              on the LIC portal for premium reminders. A lapsed policy provides no cover and no
              claim benefits. If you miss a premium, revive the policy within the revival period
              (5 years from the first unpaid premium) to restore full benefits.{" "}
              <Link to="/premium-calendar" className="text-signal hover:underline">
                Use our Premium Calendar to track due dates
              </Link>.
            </p>
          </div>
          <div className="panel-inner p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-signal text-lg font-bold">2</span>
              <p className="text-white font-semibold text-sm">Update Nominee and Address</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Ensure your nominee details are current. If your nominee has changed (due to
              marriage, divorce, or death of the original nominee), update it immediately at
              the LIC branch or through the online portal. Also update your correspondence
              address and mobile number so you receive all policy communications including
              maturity intimation and premium reminders.
            </p>
          </div>
          <div className="panel-inner p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-signal text-lg font-bold">3</span>
              <p className="text-white font-semibold text-sm">Inform Family About Your Policies</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Your family should know about all your insurance policies - policy numbers, the
              servicing branch, nominee details, and where the policy bonds are stored. Many
              claims go unclaimed simply because the family is unaware of the policy's existence.
              Consider creating a simple document listing all your policies with key details and
              share it with your spouse or a trusted family member.
            </p>
          </div>
          <div className="panel-inner p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-signal text-lg font-bold">4</span>
              <p className="text-white font-semibold text-sm">Register NEFT and PAN on the LIC Portal</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              This is the single most impactful step for hassle-free claims. With NEFT and PAN
              registered, maturity and survival benefit claims are auto-settled without any
              paperwork. Log in to licindia.in, go to e-Services, and complete the NEFT mandate
              registration. Verify that the bank account details shown are correct.
            </p>
          </div>
          <div className="panel-inner p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-signal text-lg font-bold">5</span>
              <p className="text-white font-semibold text-sm">Maintain All Policy Documents Safely</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Store the original policy bond, premium receipts, and any correspondence from LIC
              in a safe place. If the original bond is lost, report it to LIC immediately and
              obtain a duplicate. While claims can be processed without the original bond (using
              an indemnity bond), having the original significantly speeds up the settlement
              process.
            </p>
          </div>
          <div className="panel-inner p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-signal text-lg font-bold">6</span>
              <p className="text-white font-semibold text-sm">Disclose Medical History Honestly</p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              When buying a policy or reviving a lapsed one, declare your complete medical
              history truthfully. Non-disclosure of pre-existing conditions is the number one
              reason for death claim rejection. Even if it means paying a slightly higher premium,
              honest disclosure protects your family's claim in the future.
            </p>
          </div>
        </div>

        <div className="panel-inner p-5 text-center mt-6">
          <p className="text-white/60 text-sm mb-3">
            Estimate your LIC claim payout with our free calculator
          </p>
          <Link
            to="/claim-estimator"
            className="text-signal text-sm font-semibold hover:underline no-underline"
          >
            Open Claim Estimator &rarr;
          </Link>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </GuideLayout>
  );
}
