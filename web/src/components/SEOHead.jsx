import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://insure.doaide.com";
const SITE_NAME = "DoAide InsureKit";

const META = {
  "/": {
    title: "DoAide InsureKit — Free LIC Insurance Calculators & Agent Tools 2026",
    description: "Free LIC premium calculator, maturity calculator, plan comparison, commission calculator, tax benefit tools, revival & surrender calculators for LIC agents and policyholders. Updated for 2026.",
    keywords: "LIC calculator, LIC premium calculator, LIC agent tools, LIC maturity calculator, LIC commission calculator, insurance calculator India, free LIC tools, LIC tools 2026",
    faq: [
      { q: "Is InsureKit free to use?", a: "Yes, completely free. No login, no registration, no hidden charges. All 40+ tools work offline once loaded." },
      { q: "Are the calculations accurate?", a: "Calculations are based on LIC's published premium rates and bonus rates, updated for 2026. Always verify with LIC before making financial decisions." },
      { q: "Which LIC plans are supported?", a: "InsureKit supports 30+ LIC plans including Jeevan Anand (815), New Endowment (814), Jeevan Labh (836), Jeevan Lakshya (833), Tech Term (854), Dhan Sanchay (871), Amritbaal (774), and more." },
      { q: "How are LIC premium rates calculated?", a: "LIC premium is based on tabular rate per ₹1,000 SA, which varies by plan, age, and term. Rebates are applied for higher SA and yearly payment mode. GST of 4.5% (first year) and 2.25% (renewal) is added." },
      { q: "What tax benefits can I get from LIC policies?", a: "LIC premiums qualify for Section 80C deduction up to ₹1.5 lakh/year under the old regime. Maturity proceeds are tax-free under Section 10(10D) if annual premium is less than 10% of Sum Assured." },
    ],
  },
  "/premium-calculator": {
    title: "LIC Premium Calculator 2026 — Calculate Exact Premium with GST | DoAide InsureKit",
    description: "Free LIC premium calculator. Select any LIC plan, enter age, sum assured, term — get exact premium with GST. Jeevan Anand, Jeevan Labh, Tech Term & more.",
    keywords: "LIC premium calculator, LIC premium rate, Jeevan Anand premium, LIC plan premium, LIC GST calculator",
    faq: [
      { q: "How is LIC premium calculated?", a: "LIC premium is calculated based on the tabular rate per ₹1000 of Sum Assured, which varies by plan, age, and term. SA rebate and mode rebate are applied, then GST is added." },
      { q: "What is the GST rate on LIC premium?", a: "First year GST is 4.5% and renewal year GST is 2.25% of the premium amount." },
      { q: "How can I reduce my LIC premium?", a: "Choose yearly payment mode for 2% rebate, opt for higher sum assured to get SA rebate (₹2.50/1000 for SA ≥5L, ₹4/1000 for SA ≥10L), and consider limited premium paying terms." },
    ],
  },
  "/maturity-calculator": {
    title: "LIC Maturity Value Calculator 2026 — Bonus, FAB & IRR | DoAide InsureKit",
    description: "Calculate LIC policy maturity value with reversionary bonus, FAB, and IRR. Compare returns across Jeevan Anand, Jeevan Labh, New Endowment plans.",
    keywords: "LIC maturity calculator, LIC maturity value, LIC bonus rate, LIC IRR, LIC returns calculator",
    faq: [
      { q: "How is LIC maturity value calculated?", a: "Maturity value = Sum Assured + Total SRB (Simple Reversionary Bonus) + FAB (Final Additional Bonus). Some plans have maturity multipliers." },
      { q: "What is a good IRR for LIC plans?", a: "Most LIC endowment plans deliver an IRR of 4-6%. Compare this with bank FD rates (6-7%) and PPF (7.1%) to evaluate returns." },
    ],
  },
  "/plan-comparison": {
    title: "LIC Plan Comparison 2026 — Compare Premium, Maturity & Benefits | DoAide InsureKit",
    description: "Compare LIC plans side by side — premium, maturity value, death benefit, features. Find the best LIC policy for your needs.",
    keywords: "LIC plan comparison, best LIC plan, compare LIC policies, LIC plan features, which LIC plan is best",
    faq: [
      { q: "Which is the best LIC plan in 2026?", a: "It depends on your needs. Jeevan Anand (715/815) is best for savings + whole life cover, Tech Term (854) for pure protection, Jeevan Labh (736) for limited premium payment." },
    ],
  },
  "/commission-calculator": {
    title: "LIC Agent Commission Calculator 2026 — FY, Renewal & Total | DoAide InsureKit",
    description: "Calculate LIC agent commission — first year, renewal, and total commission over policy term. Updated with Oct 2024 commission rates.",
    keywords: "LIC agent commission, LIC commission calculator, LIC FY commission, LIC renewal commission, LIC agent income",
    faq: [
      { q: "What is the first year commission rate for LIC agents?", a: "FY commission depends on Premium Paying Term: 25% for PPT 15+, 20% for PPT 12-14, 15% for PPT 8-11, 10% for PPT 5-7. Term plans get 28%." },
    ],
  },
  "/tax-calculator": {
    title: "Insurance Tax Benefit Calculator — Section 80C + 80D | DoAide InsureKit",
    description: "Calculate tax benefits on life insurance (80C) and health insurance (80D) premiums. Check maturity exemption under 10(10D). Compare old vs new tax regime.",
    keywords: "LIC tax benefit, Section 80C LIC, Section 80D health insurance, LIC 10(10D), LIC tax exemption, insurance tax saving, health insurance tax benefit",
    faq: [
      { q: "How much tax can I save with LIC?", a: "Under Section 80C, you can save up to ₹46,800/year in tax (30% slab × ₹1.5L deduction). Under 80D, up to ₹1L for health insurance. Total: over ₹75,000/year." },
      { q: "What is the 80D deduction limit?", a: "₹25,000 for self/family (₹50,000 if senior citizen 60+) + ₹25,000 for parents (₹50,000 if senior). Max combined: ₹1,00,000 per year." },
    ],
  },
  "/policy-tracker": {
    title: "LIC Policy Tracker — Track Renewals & Premium Reminders | DoAide InsureKit",
    description: "Free policy tracker for LIC agents. Add client policies, track renewal dates, get premium reminders. No login required — works offline.",
    keywords: "LIC policy tracker, LIC renewal reminder, LIC premium reminder, policy management, LIC agent tool",
    faq: [
      { q: "Is the policy tracker free?", a: "Yes, completely free with no login required. Data is stored locally in your browser for privacy." },
    ],
  },
  "/bonus-history": {
    title: "LIC Bonus History 2015-2026 — SRB Rates by Plan & Year | DoAide InsureKit",
    description: "View historical LIC bonus rates (SRB) from 2015 to 2026. Compare bonus trends across Jeevan Anand, Jeevan Labh, New Endowment and other plans.",
    keywords: "LIC bonus rate, LIC SRB rate, LIC bonus history, LIC reversionary bonus, LIC bonus 2026",
    faq: [
      { q: "What is the current LIC bonus rate?", a: "Bonus rates vary by plan. For 2024-25: Jeevan Anand ₹45-46/1000, New Endowment ₹42-43/1000, Jeevan Umang ₹50/1000, Amritbaal ₹58/1000." },
    ],
  },
  "/marketing": {
    title: "LIC Marketing Content Generator — WhatsApp & Social Media Templates | DoAide InsureKit",
    description: "Ready-made WhatsApp messages and social media post templates for LIC agents. Generate professional marketing content for any LIC plan.",
    keywords: "LIC marketing, LIC WhatsApp message, LIC agent marketing, insurance social media, LIC promotion",
    faq: [
      { q: "Are these templates compliant with IRDAI guidelines?", a: "Templates are designed to be informational. Always verify compliance with current IRDAI advertising guidelines before use." },
    ],
  },
  "/client-reminders": {
    title: "Client Birthday & Anniversary Reminders for LIC Agents | DoAide InsureKit",
    description: "Track client birthdays and anniversaries. Send WhatsApp greetings directly. Free tool for LIC agents to build stronger client relationships.",
    keywords: "LIC client management, birthday reminder, anniversary reminder, LIC agent CRM, client relationship",
    faq: [
      { q: "Why should LIC agents track client birthdays?", a: "Personal greetings build rapport, increase client retention, and generate referrals. Successful agents consistently maintain personal connections." },
    ],
  },
  "/receipt-generator": {
    title: "LIC Premium Receipt Generator — Printable PDF Receipt | DoAide InsureKit",
    description: "Generate printable premium payment receipts for LIC policies. Fill in policy details, agent info, and print or save as PDF. Unofficial reference receipt.",
    keywords: "LIC premium receipt, LIC payment receipt, premium receipt generator, LIC receipt PDF",
    faq: [
      { q: "Is this an official LIC receipt?", a: "No, this is an unofficial reference receipt for record-keeping. For official receipts, contact LIC or use their portal." },
    ],
  },
  "/revival-calculator": {
    title: "LIC Revival Calculator 2026 — Lapsed Policy Revival Amount | DoAide InsureKit",
    description: "Calculate the amount needed to revive a lapsed LIC policy. Includes arrears, interest, GST, and medical requirement check. Free revival quote tool.",
    keywords: "LIC revival calculator, LIC lapsed policy, policy revival amount, LIC revival interest, revive LIC policy",
    faq: [
      { q: "How do I revive a lapsed LIC policy?", a: "Pay all arrears with interest (approx 9.25% p.a.) plus GST. Revival within 2 years usually doesn't need medical tests. Contact your LIC branch with the revival amount." },
      { q: "What is the time limit for revival?", a: "LIC allows revival within 5 years from the date of first unpaid premium. Beyond that, the policy cannot be revived." },
      { q: "Is medical examination required for revival?", a: "For policies lapsed more than 2 years, medical examination is generally required. For shorter lapse periods, revival without medical is usually possible." },
    ],
  },
  "/surrender-calculator": {
    title: "LIC Surrender Value Calculator 2026 — GSV & SSV | DoAide InsureKit",
    description: "Calculate LIC policy surrender value — both Guaranteed Surrender Value (GSV) and Special Surrender Value (SSV). Know what you'll receive before surrendering.",
    keywords: "LIC surrender value, LIC GSV calculator, LIC SSV calculator, LIC policy surrender, surrender value calculation",
    faq: [
      { q: "When can I surrender my LIC policy?", a: "You can surrender after paying premiums for at least 3 full years. Before 3 years, no surrender value is payable." },
      { q: "What is the difference between GSV and SSV?", a: "GSV is a guaranteed percentage of premiums paid. SSV is based on paid-up value with a multiplier. LIC pays whichever is higher." },
      { q: "Should I surrender my LIC policy?", a: "Surrendering usually results in significant financial loss. Consider making it paid-up or taking a loan against it instead." },
    ],
  },
  "/loan-calculator": {
    title: "Loan Against LIC Policy Calculator 2026 — Max Amount & Interest | DoAide InsureKit",
    description: "Calculate maximum loan amount against your LIC policy. Compare policy loan interest (9%) vs personal loan (12%) vs gold loan (8.5%). Free loan calculator.",
    keywords: "LIC loan calculator, loan against LIC policy, LIC policy loan interest rate, LIC surrender vs loan, policy loan amount",
    faq: [
      { q: "How much can I borrow against my LIC policy?", a: "You can borrow up to 90% of the surrender value of your policy. The surrender value depends on years of premium paid and bonus accrued." },
      { q: "What is the interest rate on LIC policy loan?", a: "LIC charges approximately 9% p.a. on policy loans, which is lower than personal loan rates (12-18%)." },
    ],
  },
  "/premium-calendar": {
    title: "LIC Premium Due Date Calendar — Track All Instalments | DoAide InsureKit",
    description: "Generate a complete premium due date calendar for any LIC policy. Track yearly, half-yearly, quarterly, or monthly premium due dates. Share via WhatsApp.",
    keywords: "LIC premium due date, LIC premium calendar, LIC payment schedule, LIC premium reminder, premium instalment dates",
    faq: [
      { q: "How are premium due dates calculated?", a: "Due dates are based on the policy start date and payment mode — yearly, half-yearly, quarterly, or monthly." },
      { q: "What is the grace period?", a: "30 days for yearly/half-yearly payments, 15 days for quarterly/monthly payments." },
    ],
  },
  "/claim-estimator": {
    title: "LIC Claim Amount Estimator 2026 — Maturity & Death Claim | DoAide InsureKit",
    description: "Estimate LIC maturity or death claim amount with bonus projections. Three scenarios: conservative, current, and optimistic. Free claim amount calculator.",
    keywords: "LIC claim amount, LIC maturity claim, LIC death claim calculator, LIC bonus projection, LIC claim estimator",
    faq: [
      { q: "How is LIC maturity claim calculated?", a: "Maturity claim = Sum Assured + Total SRB (Simple Reversionary Bonus) + FAB (Final Additional Bonus). Some plans have maturity multipliers." },
      { q: "What is included in a death claim?", a: "Death claim is the higher of (SA + Bonus) or guaranteed minimum death benefit. Plus any accrued reversionary bonus." },
    ],
  },
  "/plan-recommender": {
    title: "LIC Plan Recommender 2026 — Best Plan for Your Age & Budget | DoAide InsureKit",
    description: "Get personalized LIC plan recommendations. Answer 3 questions — age, budget, goal — and get the top 3 LIC plans ranked by returns, affordability, and features.",
    keywords: "best LIC plan, LIC plan recommendation, which LIC plan to buy, LIC plan for 30 year old, LIC plan suggestion",
    faq: [
      { q: "How are plans recommended?", a: "Plans are scored based on IRR (returns), budget affordability, bonus rates, and goal alignment. Top 3 matches are shown." },
      { q: "Which LIC plan is best for savings?", a: "Jeevan Labh (836) and Jeevan Lakshya (833) offer the highest IRR among endowment plans. Use the recommender for personalized results." },
    ],
  },
  "/compare-plans": {
    title: "Compare Any Two LIC Plans 2026 — Custom Parameters | DoAide InsureKit",
    description: "Compare any two LIC plans with different age, sum assured, and term for each. Side-by-side comparison of premium, maturity, IRR, and features.",
    keywords: "compare LIC plans, LIC plan vs plan, LIC policy comparison, best LIC plan comparison, compare two LIC policies",
    faq: [
      { q: "Can I compare plans with different parameters?", a: "Yes! Unlike the standard comparison tool, this lets you set different age, SA, and term for each plan." },
    ],
  },
  "/guides": {
    title: "LIC Insurance Guides & Articles — DoAide InsureKit",
    description: "In-depth guides on LIC plans, bonus rates, policy revival, and more. Expert articles for LIC agents and policyholders.",
    keywords: "LIC guides, LIC articles, LIC plan guide, LIC bonus rates guide, LIC revival guide",
    faq: [
      { q: "What topics do InsureKit guides cover?", a: "Guides cover best LIC plans, bonus rate history, policy revival, premium payment, tax benefits, how to become an LIC agent, claim process, child plans, term insurance, and more." },
      { q: "Are the guides updated for 2026?", a: "Yes, all guides are updated with the latest LIC bonus rates, premium tables, commission structures, and plan details for 2026." },
    ],
  },
  "/guides/best-lic-plans-2026": {
    title: "Best LIC Plans 2026 — Complete Comparison Guide | DoAide InsureKit",
    description: "Comprehensive guide to the best LIC plans in 2026. Compare endowment, term, whole life, and limited premium plans by returns, features, and suitability.",
    keywords: "best LIC plan 2026, top LIC plans, LIC plan comparison guide, best endowment plan, best term plan LIC",
    faq: [
      { q: "Which LIC plan gives the highest returns?", a: "Among endowment plans, Jeevan Labh (836) and Jeevan Lakshya (833) typically offer the highest IRR of 5-6%." },
      { q: "Which LIC plan is best for a salaried person?", a: "Jeevan Anand (815) for savings + whole life cover, or Tech Term (854) for pure protection at the lowest premium." },
    ],
  },
  "/guides/check-policy-status": {
    title: "How to Check LIC Policy Status Online — Step by Step | DoAide InsureKit",
    description: "Complete guide to check LIC policy status online via website, app, SMS, and helpline. Check premium payment status, maturity date, and bonus details.",
    keywords: "check LIC policy status, LIC policy status online, LIC premium status, LIC policy details, LIC customer portal",
    faq: [
      { q: "Can I check policy status without registration?", a: "Yes, via SMS (send ASKLIC to 56677) or by calling the LIC helpline at 022-68276827." },
    ],
  },
  "/guides/bonus-rates-history": {
    title: "LIC Bonus Rates History 2024-2026 — SRB Rates by Plan | DoAide InsureKit",
    description: "Complete history of LIC Simple Reversionary Bonus (SRB) rates from 2024 to 2026. Track bonus trends for Jeevan Anand, Jeevan Labh, New Endowment, and more.",
    keywords: "LIC bonus rate history, LIC SRB rate 2026, LIC bonus rate 2026, LIC reversionary bonus history, LIC plan bonus",
    faq: [
      { q: "How is LIC bonus calculated?", a: "LIC declares SRB as ₹X per ₹1000 of Sum Assured. Annual bonus = (SRB rate / 1000) × Sum Assured." },
      { q: "Is LIC bonus guaranteed?", a: "Bonus declared and added to a policy becomes guaranteed. But future bonus rates are not guaranteed and depend on LIC's annual surplus." },
    ],
  },
  "/guides/lic-premium-payment-online": {
    title: "How to Pay LIC Premium Online: Complete Guide 2026 | DoAide InsureKit",
    description: "Step-by-step guide to pay LIC premium online via LIC portal, ANANDA app, PayTM, PhonePe, Google Pay, net banking. Grace period rules, charges, and troubleshooting.",
    keywords: "LIC premium payment online, pay LIC premium, LIC online payment, LIC premium PayTM, LIC premium UPI, LIC grace period",
    faq: [
      { q: "How can I pay LIC premium online?", a: "You can pay via LIC website (licindia.in), LIC ANANDA app, PayTM, PhonePe, Google Pay, or net banking. All online payments are free of charge." },
      { q: "Is there any charge for online LIC premium payment?", a: "No, online premium payment through LIC portal, app, or UPI is completely free. CSC centres may charge ₹20-30." },
      { q: "What is the grace period for LIC premium payment?", a: "30 days for yearly and half-yearly modes, 15 days for quarterly and monthly modes from the premium due date." },
    ],
  },
  "/guides/lic-policy-status-check": {
    title: "How to Check LIC Policy Status Online: 6 Methods | DoAide InsureKit",
    description: "Check your LIC policy status online via website, app, SMS, helpline, agent, or branch. Understand policy status types — In Force, Lapsed, Paid-Up, Discharged.",
    keywords: "LIC policy status, check LIC policy status online, LIC policy status check, LIC policy details, LIC customer portal login",
    faq: [
      { q: "How can I check my LIC policy status online?", a: "Register and login to licindia.in, go to My Policies section. You can also check via the LIC ANANDA app or send ASKLIC <policy number> to 56677." },
      { q: "Can I check LIC policy status by SMS?", a: "Yes, send ASKLIC <Policy Number> to 56677 or 9222492224 from your registered mobile number." },
      { q: "What does Lapsed policy status mean?", a: "A lapsed policy means premiums were not paid within the grace period. The policy can be revived within 5 years by paying arrears with interest." },
    ],
  },
  "/guides/lic-maturity-amount-check": {
    title: "How to Check LIC Maturity Amount Online — Calculator & Guide | DoAide InsureKit",
    description: "Calculate and check your LIC maturity amount. Understand SA, SRB bonus, FAB components. Sample calculations for Jeevan Anand, Jeevan Labh. Tax rules on maturity.",
    keywords: "LIC maturity amount, check LIC maturity value, LIC maturity calculator, LIC bonus calculation, LIC maturity claim, LIC 10(10D)",
    faq: [
      { q: "How is LIC maturity amount calculated?", a: "Maturity amount = Sum Assured + Total Simple Reversionary Bonus (SRB) + Final Additional Bonus (FAB). Some plans have maturity multipliers." },
      { q: "Is LIC maturity amount taxable?", a: "No, if the annual premium is less than 10% of Sum Assured and the policy runs for at least 5 years. Otherwise, it's taxable under Section 10(10D)." },
      { q: "How do I check my LIC maturity amount online?", a: "Login to licindia.in > My Policies > click your policy number. Use InsureKit's free Maturity Calculator for detailed projections with bonus." },
    ],
  },
  "/guides/lic-loan-on-policy": {
    title: "How to Get Loan Against LIC Policy: Complete Guide 2026 | DoAide InsureKit",
    description: "Get loan against LIC policy — eligibility, max loan amount (90% of surrender value), interest rate (9%), application process, required documents, and repayment options.",
    keywords: "loan against LIC policy, LIC policy loan, LIC loan interest rate, LIC loan eligibility, LIC loan amount, policy loan vs surrender",
    faq: [
      { q: "How much loan can I get against my LIC policy?", a: "You can borrow up to 90% of the surrender value. The surrender value depends on premiums paid and bonus accrued." },
      { q: "What is the interest rate on LIC policy loan?", a: "LIC charges approximately 9% per annum on policy loans, significantly lower than personal loans (12-18%)." },
      { q: "Can I get a loan on a term insurance policy?", a: "No, term insurance policies have no surrender value, so they cannot be used for policy loans. Only endowment and whole life policies qualify." },
    ],
  },
  "/guides/lic-surrender-value": {
    title: "LIC Surrender Value: GSV, SSV Calculator & Rules | DoAide InsureKit",
    description: "Calculate LIC surrender value — Guaranteed (GSV) and Special (SSV). Year-wise surrender value table, tax implications, and 4 better alternatives to surrendering.",
    keywords: "LIC surrender value, LIC GSV, LIC SSV, LIC surrender value calculator, surrender LIC policy, LIC surrender tax",
    faq: [
      { q: "When can I surrender my LIC policy?", a: "You can surrender after paying premiums for at least 3 full years. Before 3 years, no surrender value is payable." },
      { q: "What is the difference between GSV and SSV?", a: "GSV (Guaranteed Surrender Value) is a guaranteed percentage of premiums paid. SSV (Special Surrender Value) is based on paid-up value with a multiplier. LIC pays whichever is higher." },
      { q: "Is surrender value taxable?", a: "If surrendered before 5 years (or 2 years for ULIPs post-2012), the entire amount is taxable. After 5 years, it's exempt under Section 10(10D) if premium < 10% of SA." },
    ],
  },
  "/guides/lic-agent-exam-preparation": {
    title: "LIC Agent Exam 2026: IC-38 Syllabus, Tips & Study Material | DoAide InsureKit",
    description: "Complete guide to LIC agent exam (IC-38) — eligibility, syllabus, exam pattern, preparation strategy, free study resources, and career growth path as a LIC agent.",
    keywords: "LIC agent exam, IC-38 exam, LIC agent syllabus, LIC agent preparation, become LIC agent, IRDAI license exam",
    faq: [
      { q: "What is the qualification to become a LIC agent?", a: "Minimum 10th pass (rural areas) or 12th pass (urban areas), age 18+, Indian citizen. No upper age limit." },
      { q: "How difficult is the LIC agent exam?", a: "The IC-38 exam is moderate difficulty — 50 MCQs in 1 hour, 35% passing marks. With 2-3 weeks of focused preparation, most candidates pass on the first attempt." },
      { q: "What is the LIC agent exam syllabus?", a: "The IC-38 covers insurance principles, LIC products, IRDAI regulations, customer service, and professional ethics. Topic weightage: insurance basics 40%, products 30%, regulations 20%, ethics 10%." },
    ],
  },
  "/guides/lic-claim-process": {
    title: "LIC Claim Process: Documents, Steps & Settlement Guide | DoAide InsureKit",
    description: "Complete LIC claim process — maturity, death, and survival benefit claims. Required documents, online and branch filing, settlement timeline, rejection reasons, and escalation.",
    keywords: "LIC claim process, LIC maturity claim, LIC death claim, LIC claim documents, LIC claim settlement, LIC claim rejection",
    faq: [
      { q: "How long does LIC take to settle a claim?", a: "Maturity claims: 30 days. Death claims: 30-90 days depending on complexity. Early death claims (within 3 years) may take longer due to investigation." },
      { q: "What documents are needed for LIC death claim?", a: "Original policy bond, death certificate, claimant's ID/address proof, cancelled cheque, NEFT form. For accidental death: FIR, post-mortem report, police investigation report." },
      { q: "What to do if LIC rejects my claim?", a: "File a grievance with LIC branch > approach LIC Zonal Manager > complaint to IRDAI (igms.irda.gov.in) > approach Insurance Ombudsman." },
    ],
  },
  "/guides/lic-tax-benefits": {
    title: "LIC Tax Benefits: Section 80C, 10(10D) Complete Guide 2026 | DoAide InsureKit",
    description: "Tax benefits on LIC policies — Section 80C deduction on premiums, Section 10(10D) maturity exemption, old vs new regime comparison, and tax planning strategies.",
    keywords: "LIC tax benefits, LIC 80C deduction, LIC 10(10D), LIC tax saving, insurance tax benefit, LIC new tax regime",
    faq: [
      { q: "Is LIC premium eligible for 80C deduction?", a: "Yes, LIC premiums up to ₹1.5 lakh per year qualify for Section 80C deduction under the old tax regime. Premium must be less than 10% of Sum Assured." },
      { q: "Is LIC maturity amount tax-free?", a: "Yes, under Section 10(10D), if annual premium is less than 10% of SA and the policy runs for 5+ years. Otherwise, maturity amount is taxable as income." },
      { q: "Can I claim LIC tax benefit under new tax regime?", a: "Section 80C deduction is NOT available under the new tax regime. However, Section 10(10D) maturity exemption applies under both regimes." },
    ],
  },
  "/guides/best-lic-plans-for-child": {
    title: "Best LIC Plans for Children 2026: Top 5 with Returns | DoAide InsureKit",
    description: "Best LIC plans for children in 2026 — Amritbaal, Jeevan Tarun, Children's Money Back compared. Sample calculations, education cost planning, and how to choose.",
    keywords: "best LIC plan for child, LIC children plan, Amritbaal LIC, Jeevan Tarun, children's education plan, LIC child policy",
    faq: [
      { q: "Which LIC plan is best for a child?", a: "Amritbaal (774) is the best dedicated children's plan with guaranteed additions. Jeevan Tarun (834) and New Children's Money Back (832) are also excellent choices." },
      { q: "What is the minimum age to buy a children's LIC plan?", a: "Amritbaal can be bought from age 0 (90 days). Jeevan Tarun from age 0-12 years. New Children's Money Back from age 0-12 years." },
      { q: "When should I start a LIC plan for my child?", a: "The earlier the better. Starting at birth vs age 5 can reduce annual premiums by 30-40% for the same maturity amount." },
    ],
  },
  "/guides/best-term-insurance-plan": {
    title: "Best Term Insurance Plans 2026: LIC vs Private Comparison | DoAide InsureKit",
    description: "Compare best term insurance plans 2026 — LIC Tech Term, Jeevan Amar vs HDFC Click2Protect, ICICI iProtect, Max Life. Claim ratios, premiums, riders, and buying guide.",
    keywords: "best term insurance plan, LIC vs private term plan, Tech Term 854, term insurance comparison, cheapest term plan, term insurance claim ratio",
    faq: [
      { q: "Which is the best term insurance plan in 2026?", a: "LIC Tech Term (854) offers the trust of LIC with competitive premiums. For the lowest premium, HDFC Click2Protect and Max Life Smart Secure are top choices." },
      { q: "Is LIC better than private for term insurance?", a: "LIC has a higher claim settlement ratio (98.6% vs 97-98% for top private insurers). Private insurers offer lower premiums and more riders. Both are equally regulated by IRDAI." },
      { q: "How much term insurance cover do I need?", a: "Standard rule: 10-15x your annual income. A 30-year-old earning ₹10 lakh/year should have at least ₹1-1.5 crore term cover." },
    ],
  },
  "/plans": {
    title: "All LIC Plans 2026 — Complete Directory with Details & Premium | DoAide InsureKit",
    description: "Browse all LIC plans — Endowment, Money Back, Term, Whole Life, Child, Pension, ULIP. Compare features, check eligibility, calculate premium. Free, no login.",
    keywords: "LIC plans, all LIC plans, LIC plan list, LIC plan directory, LIC endowment plans, LIC term plans",
    faq: [
      { q: "How many LIC plans are currently available?", a: "LIC currently offers 30+ plans across categories: Endowment, Money Back, Term, Whole Life, Child, Pension, ULIP, and Government Schemes." },
      { q: "Which LIC plan is best for savings?", a: "Jeevan Labh (736) and Jeevan Lakshya (833) offer the highest IRR among endowment plans. Use our Plan Recommender for personalized suggestions." },
    ],
  },
  "/premium-table": {
    title: "LIC Age-Wise Premium Table 2026 — Rates for All Ages & Terms | DoAide InsureKit",
    description: "Complete age-wise premium rate table for every LIC plan. See premium per ₹1000 SA for all age-term combinations. Show clients exact rates — the agent's must-have tool.",
    keywords: "LIC premium table, LIC premium rates by age, LIC age wise premium, LIC rate per 1000, LIC premium chart, LIC premium grid",
    faq: [
      { q: "What is a premium rate table?", a: "It shows the tabular premium rate per ₹1000 of Sum Assured for every valid age-term combination. Multiply by your SA (in thousands) to get the annual premium." },
      { q: "Why are some cells empty?", a: "LIC restricts certain age-term combinations. For example, a 50-year-old cannot take a 35-year endowment because maturity age would exceed limits." },
      { q: "Are SA rebates included?", a: "When you set a Sum Assured ≥ ₹5L, the SA rebate is automatically applied. Toggle 'Show rate per 1000' to see raw tabular rates." },
    ],
  },
  "/dashboard": {
    title: "LIC Agent Dashboard — Portfolio Summary & Performance | DoAide InsureKit",
    description: "Free agent dashboard for LIC agents. Track your total portfolio, active policies, upcoming renewals, client events, and club qualification progress.",
    keywords: "LIC agent dashboard, LIC agent portfolio, LIC agent performance, LIC agent CRM, LIC policy management",
    faq: [
      { q: "Where does the dashboard data come from?", a: "The dashboard reads from policies added in Policy Tracker and clients in Client Reminders. Data is stored locally in your browser." },
      { q: "What are LIC club targets?", a: "LIC rewards agents based on First Year Commission: Star Club (₹3L+), MDRT (₹6L+), COT (₹12L+), TOT (₹24L+)." },
    ],
  },
  "/portfolio-import": {
    title: "Import Portfolio CSV — Bulk Policy Upload for LIC Agents | DoAide InsureKit",
    description: "Import your LIC policy portfolio from CSV. Drag-and-drop upload, automatic column mapping, preview before import. Track your entire book of business.",
    keywords: "LIC portfolio import, CSV import policies, LIC agent portfolio, bulk policy upload, LIC agent tool",
    faq: [
      { q: "What format should my CSV be in?", a: "Any CSV with a header row works. Common columns: Policy Number, Name, Plan, Premium, Sum Assured, Start Date, Maturity Date, Status." },
      { q: "Is my data secure?", a: "Yes. Portfolio data is stored securely and linked only to your account." },
    ],
  },
  "/compare/lic-super-sales-saathi": {
    title: "InsureKit vs LIC Super Sales Saathi — Feature Comparison 2026 | DoAide",
    description: "Compare DoAide InsureKit with LIC Super Sales Saathi. See which LIC agent tool has more calculators, better features, and is truly free.",
    keywords: "InsureKit vs LIC Super Sales Saathi, LIC agent tools comparison, best LIC agent app",
    faq: [
      { q: "Is InsureKit better than LIC Super Sales Saathi?", a: "InsureKit offers 40+ free tools with no login, compared to limited features in Super Sales Saathi. InsureKit includes plan presentations, business cards, and AI advisor — features not found elsewhere." },
    ],
  },
  "/compare/perfect-agent-plus": {
    title: "InsureKit vs Perfect Agent Plus — Feature Comparison 2026 | DoAide",
    description: "Compare DoAide InsureKit with Perfect Agent Plus. Free vs paid, feature-by-feature comparison for LIC agents.",
    keywords: "InsureKit vs Perfect Agent Plus, LIC agent tools comparison, best free LIC calculator",
    faq: [
      { q: "Is InsureKit free compared to Perfect Agent Plus?", a: "Yes, InsureKit is 100% free with all features. Perfect Agent Plus charges for premium features. InsureKit offers more tools at zero cost." },
    ],
  },
  "/best-lic-agent-tools-2026": {
    title: "Best LIC Agent Tools 2026 — Top 4 Apps Compared | DoAide InsureKit",
    description: "Comprehensive comparison of the best LIC agent tools in 2026. InsureKit vs Perfect Agent Plus vs Super Sales Saathi vs LIC MF App.",
    keywords: "best LIC agent tools 2026, LIC calculator app, LIC agent app, free LIC tools",
    faq: [
      { q: "Which is the best free LIC agent tool in 2026?", a: "DoAide InsureKit is the most comprehensive free tool with 22+ features. No registration needed." },
      { q: "Do I need to pay for LIC agent tools?", a: "Not necessarily. InsureKit offers all essential tools for free." },
    ],
  },
  "/maturity-tracker": {
    title: "LIC Policy Maturity Tracker — Countdown & Estimated Payout | DoAide InsureKit",
    description: "Track LIC policies nearing maturity with countdown timers and estimated payout amounts. Filter by timeline, sort by date or amount. Free tool for LIC agents.",
    keywords: "LIC maturity tracker, LIC policy maturity date, LIC maturity payout, policy maturity countdown, LIC agent maturity tool",
    faq: [
      { q: "How is the maturity date calculated?", a: "Maturity date = Policy start date + Policy term (years). The tracker shows countdown and estimated payout including SA + bonus." },
      { q: "How accurate is the estimated maturity amount?", a: "Estimates use current SRB bonus rates. Actual maturity may differ based on LIC's declared bonus and FAB." },
    ],
  },
  "/guides/lic-commission-structure": {
    title: "LIC Agent Commission Structure 2026: FY, Renewal & Bonus Rates | DoAide InsureKit",
    description: "Complete guide to LIC agent commission structure 2026 — first year rates (10-40%), renewal (7.5%), bonus commission, Star Club, MDRT, COT, TOT qualification, and income scenarios.",
    keywords: "LIC agent commission structure, LIC commission rates 2026, LIC FY commission, LIC renewal commission, LIC bonus commission, Star Club MDRT COT TOT",
    faq: [
      { q: "What is the first year commission rate for LIC agents?", a: "FY commission depends on PPT: 25% for PPT 15+, 20% for PPT 12-14, 15% for PPT 8-11, 10% for PPT 5-7. Term plans get 28-40%." },
      { q: "What is LIC bonus commission?", a: "LIC rewards agents with FYC ₹3L+ (Star Club 20%), ₹6L+ (MDRT 30%), ₹12L+ (COT 35%), ₹24L+ (TOT 40%) bonus on total FYC." },
      { q: "How much can a LIC agent earn?", a: "Part-time agents earn ₹1-3L/year, full-time ₹5-15L, and top performers ₹20L+ with club bonuses and growing renewal income." },
    ],
  },
  "/guides/how-to-become-lic-agent": {
    title: "How to Become a LIC Agent in 2026: Step-by-Step Guide | DoAide InsureKit",
    description: "Complete guide to becoming a LIC agent — eligibility (10th/12th pass, 18+), 25-hour training, IC-38 exam (50 MCQs, 35% passing), IRDAI license, and career growth path.",
    keywords: "how to become LIC agent, LIC agent eligibility, IC-38 exam, LIC agent training, IRDAI license, LIC agent career, LIC agent income",
    faq: [
      { q: "What is the qualification to become a LIC agent?", a: "Minimum 10th pass (rural) or 12th pass (urban), age 18+, Indian citizen. No upper age limit." },
      { q: "How long does it take to become a LIC agent?", a: "4-8 weeks total: find a Development Officer, complete 25-hour training, pass IC-38 exam, and get IRDAI license." },
      { q: "Is there any fee to become a LIC agent?", a: "Total cost under ₹1,000: IC-38 exam fee ₹250-500 + IRDAI license ₹250 for 3 years. Training is free." },
    ],
  },
  "/guides/best-plans-for-tax-saving": {
    title: "Best LIC Plans for Tax Saving 2026: Section 80C Guide | DoAide InsureKit",
    description: "Top 5 LIC plans for tax saving under Section 80C — Jeevan Anand, Jeevan Labh, Tech Term, New Endowment compared. Tax-saving strategies, old vs new regime, and common mistakes.",
    keywords: "best LIC plan for tax saving, LIC 80C plans, LIC tax saving plan, best insurance for tax benefit, LIC Section 80C, tax saving with LIC",
    faq: [
      { q: "Which LIC plan gives the best tax saving?", a: "Jeevan Anand (815) and Jeevan Labh (736) offer good returns with 80C deduction. Tech Term (854) gives maximum cover per premium." },
      { q: "Can I claim 80C deduction under new tax regime?", a: "No, Section 80C is NOT available under the new regime. But Section 10(10D) maturity exemption applies under both regimes." },
      { q: "What is the maximum tax saving from LIC?", a: "Up to ₹46,800/year (31.2% of ₹1.5L) under old regime. Shared with PPF, ELSS, EPF, home loan principal." },
    ],
  },
  "/sip-vs-insurance": {
    title: "SIP vs Insurance Calculator — Term + SIP vs Endowment Returns | DoAide InsureKit",
    description: "Compare endowment plan returns vs term insurance + SIP strategy. See why pure term + SIP creates 3-5× more wealth than endowment plans. Free calculator with year-by-year comparison.",
    keywords: "SIP vs insurance, term plan vs endowment, SIP vs LIC, term insurance SIP, endowment vs mutual fund, insurance vs investment, SIP returns calculator",
    faq: [
      { q: "Why is Term + SIP better than Endowment?", a: "Endowment plans return only 4-6% IRR. A term plan gives the same life cover at 1/10th the premium, and the saved amount invested in SIP at 12% CAGR creates 3-5× more wealth over the same period." },
      { q: "What SIP return should I assume?", a: "Historically, Nifty 50 has returned ~12% CAGR over 15+ year periods. Use 10% for moderate estimates, 8% for conservative. Large-cap index funds are a safe choice." },
      { q: "Is there any risk in Term + SIP strategy?", a: "Endowment gives guaranteed but low returns. SIP returns are market-linked. However, the premium difference is so large that even at conservative 8% SIP returns, total wealth is usually higher with Term + SIP." },
      { q: "Should I surrender my endowment policy for Term + SIP?", a: "If you've paid premiums for less than 3 years, you'll get nothing on surrender. After 3+ years, compare surrender value vs continuing. Use InsureKit's Surrender Calculator to check." },
    ],
  },
  "/claim-settlement-ratio": {
    title: "Claim Settlement Ratio 2024 — Compare All Life Insurers | DoAide InsureKit",
    description: "Compare IRDAI claim settlement ratios for 20+ life insurance companies. Sort by individual/group CSR. LIC, HDFC Life, Max Life, ICICI Pru, SBI Life & more.",
    keywords: "claim settlement ratio, CSR insurance, IRDAI claim settlement, best insurance company India, LIC claim ratio, insurance comparison India",
    faq: [
      { q: "What is Claim Settlement Ratio?", a: "CSR is the percentage of claims settled by an insurer out of total claims received. Higher CSR (above 95%) means better claim reliability." },
      { q: "Which insurance company has the highest CSR?", a: "Max Life (99.51%), Aegon (99.00%), and Tata AIA (99.06%) have the highest individual CSR. LIC at 98.74% is impressive given its massive volume." },
    ],
  },
  "/guides/revive-lapsed-policy": {
    title: "How to Revive a Lapsed LIC Policy — Complete Guide | DoAide InsureKit",
    description: "Step-by-step guide to reviving a lapsed LIC policy. Eligibility, documents needed, revival amount calculation, online & offline methods, and tips to avoid future lapses.",
    keywords: "revive lapsed LIC policy, LIC policy revival, lapsed policy revival amount, LIC revival process, how to revive LIC",
    faq: [
      { q: "Can I revive a policy after 5 years?", a: "Generally no. LIC's standard revival period is 5 years from the first unpaid premium. Special revival schemes may extend this." },
      { q: "Is interest charged on revival?", a: "Yes, approximately 9.25% p.a. on unpaid premiums plus GST." },
    ],
  },
  "/guides/section-80d-health-insurance": {
    title: "Section 80D Tax Benefits on Health Insurance 2026 | DoAide InsureKit",
    description: "Complete guide to Section 80D deductions on health insurance — limits for self, family, parents, senior citizens, eligible expenses, examples, and how to claim.",
    keywords: "Section 80D, 80D health insurance, 80D deduction limit, health insurance tax benefit, 80D senior citizen, preventive health checkup 80D",
    faq: [
      { q: "Can I claim 80D under the new tax regime?", a: "No. Section 80D deductions are only available under the old tax regime." },
      { q: "What is the maximum 80D deduction?", a: "₹1,00,000 — ₹50,000 for self (senior) + ₹50,000 for senior citizen parents." },
      { q: "Does 80D cover preventive health check-ups?", a: "Yes, up to ₹5,000 per year, included within the overall 80D limit." },
    ],
  },
  "/plan-presentation": {
    title: "LIC Plan Presentation Generator — Printable Client Proposal | DoAide InsureKit",
    description: "Generate professional, printable plan presentations for any LIC plan. Show premium, maturity benefits, death benefits, and payment mode comparisons. Share via WhatsApp or PDF.",
    keywords: "LIC plan presentation, LIC client proposal, LIC plan PDF, LIC agent presentation, LIC premium proposal, printable LIC plan",
    faq: [
      { q: "What is a plan presentation?", a: "A printable summary of an LIC plan's premium, maturity, death benefits and features — ready to share with clients during meetings." },
      { q: "Can I share this with clients?", a: "Yes! Use the Print/PDF button to save as PDF and share via email or WhatsApp." },
      { q: "Are the premium figures accurate?", a: "Premiums are based on LIC's published tabular rates. Always verify with LIC before finalising a proposal." },
    ],
  },
  "/premium-due-register": {
    title: "Premium Due Register — Track Upcoming LIC Premium Dues | DoAide InsureKit",
    description: "Track all upcoming LIC premium dues in one place. Filter by client, status (overdue, due soon, upcoming), export as PDF, and send WhatsApp reminders to clients.",
    keywords: "LIC premium due register, LIC premium tracker, LIC renewal register, LIC premium reminder, premium due list, LIC agent register",
    faq: [
      { q: "Where does the data come from?", a: "The register uses policies added in the Policy Tracker. Add policies there first, then view upcoming dues here." },
      { q: "Can I export the register?", a: "Yes! Use Print/PDF to save the filtered list. You can also send individual WhatsApp reminders." },
    ],
  },
  "/branch-locator": {
    title: "LIC Branch & Office Locator — Find Nearest LIC Office | DoAide InsureKit",
    description: "Find LIC zonal, divisional, and branch offices across India. Search by state, city, or office name. Get address, phone number, and Google Maps directions.",
    keywords: "LIC branch locator, LIC office near me, LIC divisional office, LIC zonal office, find LIC branch, LIC office address",
    faq: [
      { q: "How do I find my nearest LIC branch?", a: "Select your state and city. Click 'Directions' to open the location in Google Maps." },
      { q: "Can I visit any LIC branch for my policy?", a: "Yes, most services are available at any branch. For policy-specific queries, your servicing branch may be more helpful." },
    ],
  },
  "/report-generator": {
    title: "LIC Business Report Generator — Portfolio & Performance Reports | DoAide InsureKit",
    description: "Generate portfolio summary, renewal reports, client reports, and performance reports for your LIC insurance business. Print-ready PDF export. Free for LIC agents.",
    keywords: "LIC business report, LIC agent report, LIC portfolio report, LIC renewal report, insurance business report, LIC performance metrics",
    faq: [
      { q: "Where does the report data come from?", a: "Reports use your Policy Tracker and Client Reminders data stored in your browser. Add more data for richer reports." },
      { q: "Can I export reports?", a: "Yes, use Print/PDF to save any report. You can print or email them." },
    ],
  },
  "/paid-up-value": {
    title: "LIC Paid-Up Value Calculator 2026 — Reduced SA & GSV | DoAide InsureKit",
    description: "Calculate LIC paid-up value when you stop paying premiums. Get paid-up SA, vested bonus, GSV, and maturity estimate. Know your options before deciding.",
    keywords: "LIC paid up value, paid up calculator, LIC reduced paid up, LIC GSV calculator, stop LIC premium, LIC paid up maturity",
    faq: [
      { q: "What is LIC paid-up value?", a: "When you stop paying premiums after 3+ years, LIC converts your policy to paid-up. Paid-up SA = original SA × (premiums paid / total premiums due)." },
      { q: "Do bonuses continue on a paid-up policy?", a: "No. Only bonuses accrued before the policy became paid-up remain. No future bonuses are added." },
    ],
  },
  "/insurance-age-calculator": {
    title: "Insurance Age Calculator — Age Nearest Birthday for LIC | DoAide InsureKit",
    description: "Calculate insurance age (age nearest birthday) used by LIC for premium rates. Know when your insurance age changes and save on premiums by acting before the cutoff.",
    keywords: "insurance age calculator, age nearest birthday, LIC age calculation, insurance age LIC, LIC premium age, age nearest birthday calculator",
    faq: [
      { q: "What is insurance age?", a: "Insurance age is age nearest birthday — not completed age. If you're 6+ months past your last birthday, your insurance age is one year more." },
      { q: "When does insurance age change?", a: "Insurance age increases 6 months after your birthday. Acting before this date locks in the lower premium rate." },
    ],
  },
  "/rider-premium-calculator": {
    title: "LIC Rider Premium Calculator 2026 — ADB, Term, CI & PWD | DoAide InsureKit",
    description: "Calculate LIC rider premiums — Accidental Death Benefit, Term Rider, Critical Illness, and Premium Waiver Disability. Rate tables, GST, and combined premium analysis.",
    keywords: "LIC rider premium, LIC ADB rider, LIC critical illness rider, LIC term rider, LIC rider calculator, LIC rider rates",
    faq: [
      { q: "What are LIC riders?", a: "Riders are optional add-on benefits attached to a base LIC policy — ADB, Term Rider, Critical Illness, and Premium Waiver. They provide extra coverage at small additional premium." },
      { q: "Is GST applicable on riders?", a: "Yes, 18% GST is charged on rider premiums, different from the base life insurance premium GST of 4.5%/2.25%." },
    ],
  },
  "/rebate-calculator": {
    title: "LIC SA & Mode Rebate Calculator — Premium Savings Tool | DoAide InsureKit",
    description: "Calculate LIC SA rebate and mode rebate savings. Compare payment modes, see how higher SA reduces premium rate. Optimize premium cost for clients.",
    keywords: "LIC rebate calculator, LIC SA rebate, LIC mode rebate, LIC premium discount, LIC yearly rebate, LIC premium savings",
    faq: [
      { q: "What is SA rebate in LIC?", a: "SA ≥ ₹5L gets ₹2.50/1000 rebate, SA ≥ ₹10L gets ₹4.00/1000 rebate on the tabular premium rate." },
      { q: "What is mode rebate?", a: "Yearly mode gets 2% rebate, half-yearly 1%. Quarterly and monthly modes get no rebate." },
    ],
  },
  "/self-mix": {
    title: "Self Mix Presentation — Multi-Plan Portfolio for LIC Clients | DoAide InsureKit",
    description: "Create a multi-plan insurance portfolio for one client. Combine endowment, money-back, and term plans. See combined coverage, premium, and maturity analysis.",
    keywords: "LIC self mix, multi plan portfolio, LIC plan combination, LIC portfolio presentation, LIC agent presentation, insurance portfolio",
    faq: [
      { q: "What is a Self Mix?", a: "A Self Mix shows 2-5 LIC policies for one person — combining endowment, money-back, and term plans for optimal coverage." },
      { q: "Why recommend multiple policies?", a: "Different plans serve different goals: savings, periodic income, and high protection. A mix covers all financial goals better than one plan." },
    ],
  },
  "/family-mix": {
    title: "Family Mix Presentation — Family Insurance Portfolio | DoAide InsureKit",
    description: "Create a complete family insurance portfolio. Assign the right LIC plan to self, spouse, and children. See combined family coverage and premium analysis.",
    keywords: "LIC family plan, family insurance portfolio, LIC family mix, family protection plan, LIC plan for family, insurance for family",
    faq: [
      { q: "What is a Family Mix?", a: "A Family Mix shows LIC policies for all family members — self, spouse, children — in one view, helping agents present complete family protection." },
      { q: "Which plans are best for children?", a: "Jeevan Tarun (834), Amritbaal (774), and Children's Money Back (832) are popular child plans." },
    ],
  },
  "/budget-presentation": {
    title: "Budget & Goal-wise LIC Plan Finder — Premium, SA & Maturity | DoAide InsureKit",
    description: "Find LIC plans by budget, coverage target, or maturity goal. Three comparison modes: budget-wise, SA-wise, and maturity-wise. Free plan finder for agents.",
    keywords: "LIC plan by budget, LIC plan finder, best LIC plan for budget, LIC plan comparison, LIC maturity goal, LIC SA target",
    faq: [
      { q: "What is budget-wise comparison?", a: "Shows all LIC plans that fit within your annual premium budget, sorted by coverage and maturity value." },
      { q: "What is maturity-wise comparison?", a: "Given a target maturity amount, it reverse-calculates which plans can reach that goal and what premium/SA is needed." },
    ],
  },
  "/club-qualification": {
    title: "LIC Club Qualification Progress Tracker — Branch to Chairman's Club | DoAide InsureKit",
    description: "Track your progress toward LIC club qualifications — Branch Manager, Divisional Manager, Zonal Manager, Chairman's Club, and MDRT. See pace projections and monthly targets.",
    keywords: "LIC club qualification, LIC branch manager club, LIC chairman club, MDRT qualification, LIC agent club, LIC performance tracker",
    faq: [
      { q: "What are LIC club qualifications?", a: "LIC rewards top agents with 4 club levels — Branch Manager, Divisional Manager, Zonal Manager, and Chairman's Club — based on policies, FYP, and lives." },
      { q: "What is MDRT?", a: "Million Dollar Round Table is an international recognition requiring approximately ₹35 lakh FYP for Indian agents." },
    ],
  },
  "/greeting-cards": {
    title: "LIC Agent Greeting Card Creator — Birthday, Festival & Custom | DoAide InsureKit",
    description: "Create personalized greeting cards for LIC clients — birthdays, Diwali, New Year, policy anniversaries. Multiple templates and themes. Share via WhatsApp.",
    keywords: "LIC greeting card, LIC agent birthday card, insurance agent greetings, LIC Diwali card, LIC client birthday, WhatsApp greeting card",
    faq: [
      { q: "Why send greeting cards?", a: "Personal greetings build lasting relationships. Clients who feel valued are more likely to renew, refer friends, and buy additional plans." },
      { q: "Can I customize messages?", a: "Yes! Choose Custom occasion for your own message, or edit any template. Messages work perfectly on WhatsApp." },
    ],
  },
  "/doctor-panel": {
    title: "LIC Panel Doctor & Hospital Locator — Medical Exam Directory | DoAide InsureKit",
    description: "Find LIC-approved panel doctors and hospitals for medical examinations. Search by city and specialization. 20 cities, 12 specializations. Medical test requirements by SA.",
    keywords: "LIC panel doctor, LIC medical exam, LIC hospital panel, LIC approved doctor, LIC medical test, insurance medical exam",
    faq: [
      { q: "What is an LIC panel doctor?", a: "LIC maintains a panel of approved doctors who conduct medical exams for policy issuance, revival, and claims." },
      { q: "When is a medical exam required?", a: "For new policies above SA limits (by age), revival after 2 years of lapse, and non-early claims." },
    ],
  },
  "/business-card": {
    title: "LIC Agent Business Card Creator — Digital Cards for WhatsApp | DoAide InsureKit",
    description: "Create professional digital business cards for LIC agents. 6 themes, photo upload, WhatsApp sharing. Include agent code, branch, and contact details.",
    keywords: "LIC agent business card, insurance agent card, LIC digital card, LIC agent WhatsApp card, professional business card, LIC agent branding",
    faq: [
      { q: "What details to include?", a: "Name, LIC agent code, branch, phone, email. Optional: designation, WhatsApp number, tagline, and headshot photo." },
      { q: "Can I print these cards?", a: "Yes! Download the card image and print at any shop. Standard size: 3.5 × 2 inches on 300 GSM paper." },
    ],
  },
  "/fd-rd-calculator": {
    title: "FD/RD vs Insurance Calculator — Compare Returns | DoAide InsureKit",
    description: "Compare FD and RD returns with LIC policy maturity value. See the tax-free advantage of life insurance over fixed deposits. Free FD vs insurance comparison tool.",
    keywords: "FD vs insurance, RD vs insurance, FD vs LIC, fixed deposit vs insurance, insurance vs FD returns, LIC vs FD comparison, tax-free insurance maturity",
    faq: [
      { q: "Is LIC better than FD?", a: "LIC maturity is tax-free under Section 10(10D) if premium is less than 10% of SA. FD interest is fully taxable at your slab rate, reducing effective returns significantly for high earners." },
      { q: "What is the return on FD vs LIC?", a: "FDs offer 6-7.5% pre-tax returns. After 30% tax, effective return drops to ~4.5-5.2%. LIC endowment plans return 4.5-6% IRR but the maturity is completely tax-free." },
      { q: "Should I invest in FD or insurance?", a: "It depends on your goal. FDs are better for short-term liquidity. Insurance provides life cover + tax-free maturity for long-term savings. A combination of both is often ideal." },
    ],
  },
  "/insurance-needs-calculator": {
    title: "Insurance Needs Calculator 2026 — How Much Cover Do You Need? | DoAide InsureKit",
    description: "Calculate how much life insurance you need based on income, expenses, loans, and future goals. Free human life value (HLV) calculator for accurate cover assessment.",
    keywords: "insurance needs calculator, how much life insurance, HLV calculator, life insurance cover, insurance requirement calculator, human life value",
    faq: [
      { q: "How much life insurance do I need?", a: "Standard rule: 10-15× annual income. The calculator factors in debts, future expenses (children's education, marriage), existing cover, and investments to give a precise number." },
      { q: "What is Human Life Value?", a: "HLV is the present value of your future income, minus personal expenses. It represents the economic loss your family would face and is used to determine adequate life insurance cover." },
    ],
  },
  "/retirement-calculator": {
    title: "Retirement Planning Calculator India 2026 — Corpus & Monthly Savings | DoAide InsureKit",
    description: "Calculate the retirement corpus you need and the monthly saving to get there. Inflation-adjusted expenses, LIC pension plan options — Jeevan Umang, New Jeevan Shanti, Saral Pension. Free.",
    keywords: "retirement planning calculator, retirement corpus calculator India, how much to retire in India, LIC pension plan calculator, Jeevan Umang calculator, retirement savings calculator",
    faq: [
      { q: "How much retirement corpus do I need in India?", a: "Roughly 25-30× your annual expenses at retirement. The calculator inflates today's expenses to your retirement year and computes the exact corpus that funds them until life expectancy." },
      { q: "Which LIC plans work for retirement?", a: "Jeevan Umang (745) pays 8% of SA yearly for life, New Jeevan Shanti (858) is a deferred annuity with locked-in rates, and Saral Pension (862) is an immediate annuity." },
      { q: "What inflation rate should I assume for retirement?", a: "6% is a reasonable long-term assumption for India; use 7-8% to be conservative, since healthcare inflation runs higher." },
    ],
  },
  "/child-education-calculator": {
    title: "Child Education Plan Calculator — Future Cost & LIC Child Plans | DoAide InsureKit",
    description: "Calculate the future cost of your child's education at 9% education inflation, the monthly saving needed, and the LIC child plan that guarantees the goal — Jeevan Lakshya, Jeevan Tarun, Amritbaal.",
    keywords: "child education plan calculator, child education cost calculator India, LIC child plan calculator, Jeevan Lakshya calculator, education inflation calculator, child future planning",
    faq: [
      { q: "How much will education cost when my child turns 18?", a: "At 9% education inflation, a ₹16 lakh engineering degree today costs about ₹58 lakh in 15 years. The calculator shows the exact figure for your goal and timeline." },
      { q: "Which LIC plan is best for child education?", a: "Jeevan Lakshya (733) is the most popular — if the parent dies, LIC pays 10% of SA yearly till maturity plus the full maturity benefit, so the goal survives." },
      { q: "Why not just use a mutual fund SIP for education?", a: "A SIP builds the corpus only if the parent survives and keeps investing. A child plan with waiver-of-premium guarantees the goal even if the parent dies." },
    ],
  },
  "/ulip-vs-mutual-fund-calculator": {
    title: "ULIP vs Mutual Fund Calculator 2026 — Post-Tax Corpus Comparison | DoAide InsureKit",
    description: "Compare ULIP and mutual fund SIP returns with real charges — allocation, admin, FMC, mortality vs expense ratio — and tax at exit (Section 10(10D) vs 12.5% LTCG). Free, honest comparison.",
    keywords: "ULIP vs mutual fund calculator, ULIP vs SIP, ULIP returns calculator, ULIP charges comparison, LIC SIIP vs mutual fund, ULIP vs mutual fund which is better",
    faq: [
      { q: "Is ULIP better than mutual fund?", a: "It depends on charges, tenure and tax. ULIP maturity is tax-free under 10(10D) if annual premium is ≤ ₹2.5 lakh; mutual funds have lower costs but equity LTCG above ₹1.25 lakh is taxed at 12.5%. Run both with your numbers." },
      { q: "Is ULIP maturity tax-free?", a: "Yes, under Section 10(10D) — but only if total annual premium is ₹2.5 lakh or less for policies issued after 1 Feb 2021." },
      { q: "What charges does a ULIP have?", a: "Premium allocation (higher in year 1), policy administration, fund management (capped at 1.35%), and mortality charges. Online ULIPs like LIC SIIP charge far less than offline plans." },
    ],
  },
  "/premium-comparison": {
    title: "LIC Premium Comparison Widget — Embed on Your Website | DoAide InsureKit",
    description: "Compare LIC plan premiums across age, term, and sum assured. Embeddable widget for insurance blogs and websites. Free LIC premium comparison tool.",
    keywords: "LIC premium comparison, compare LIC premiums, LIC premium widget, premium comparison tool, LIC plan premium compare",
    faq: [
      { q: "What is the premium comparison tool?", a: "It lets you compare premiums for multiple LIC plans side-by-side with the same or different parameters — helping clients choose the most affordable option." },
    ],
  },
  "/tools/term-insurance-compare": {
    title: "Term Insurance Comparison 2026 — LIC vs HDFC vs Max Life vs ICICI | DoAide InsureKit",
    description: "Compare term insurance plans from LIC, HDFC Life, Max Life, ICICI Prudential, SBI Life, and Tata AIA. Premium, claim ratio, riders, and coverage analysis.",
    keywords: "term insurance comparison, best term plan India, compare term insurance, LIC term vs private, cheapest term plan, term plan comparison 2026",
    faq: [
      { q: "Which term insurance is cheapest?", a: "Private insurers like HDFC Click2Protect and Max Life Smart Secure offer the lowest premiums. LIC Tech Term is competitive while offering the trust of LIC." },
      { q: "Is LIC term plan better than private?", a: "LIC has a higher claim settlement ratio (98.6%) and brand trust. Private insurers offer lower premiums and more rider options. Both are IRDAI-regulated." },
      { q: "At what age should I buy term insurance?", a: "The earlier the better — premiums increase with age. Buying at 25 vs 35 can save 40-50% on premiums over the policy term." },
    ],
  },
  "/compare/lic-vs-sbi-life": {
    title: "LIC vs SBI Life Insurance — Complete Comparison 2026 | DoAide InsureKit",
    description: "Compare LIC and SBI Life Insurance — plans, premiums, claim settlement ratio, returns, and agent support. Which insurer is better for you?",
    keywords: "LIC vs SBI Life, LIC comparison, SBI Life comparison, best life insurance India, LIC or SBI Life, insurance company comparison",
    faq: [
      { q: "Is LIC better than SBI Life?", a: "LIC has a higher claim ratio (98.6% vs 97.3%) and wider branch network. SBI Life offers competitive ULIPs and online plans. Choice depends on your priority: trust or product variety." },
    ],
  },
  "/compare/term-vs-endowment": {
    title: "Term Insurance vs Endowment Plan — Which is Better? | DoAide InsureKit",
    description: "Detailed comparison of term insurance and endowment plans — coverage, premium, returns, tax benefits. Use the calculator to see the wealth gap between the two approaches.",
    keywords: "term vs endowment, term insurance vs endowment, endowment vs term plan, which is better term or endowment, LIC term plan vs endowment",
    faq: [
      { q: "Is term insurance better than endowment?", a: "Term insurance provides 10× more coverage at the same premium. The saved amount invested in SIP can create 3-5× more wealth than an endowment plan's maturity." },
      { q: "Does term insurance have any maturity benefit?", a: "Pure term insurance pays nothing at maturity — it only pays on death during the term. For maturity benefits, choose TROP (Term Return of Premium) at a higher premium." },
    ],
  },
  "/blog": {
    title: "InsureKit Blog — Insurance Guides & Planning Articles | DoAide",
    description: "Expert articles on insurance planning in India. LIC plan guides, term vs whole life comparisons, insurance needs analysis, and financial planning tips for agents and policyholders.",
    keywords: "insurance blog, LIC blog, insurance planning guide, life insurance articles, LIC agent blog, insurance tips India",
    faq: [
      { q: "What topics does the InsureKit blog cover?", a: "Our blog covers LIC plan comparisons, insurance planning guides, premium calculation tutorials, term vs endowment analysis, tax-saving strategies, and practical tips for LIC agents." },
    ],
  },
  "/blog/how-much-life-insurance": {
    title: "How Much Life Insurance Do You Really Need in 2026? | InsureKit",
    description: "Calculate the right life insurance cover using income multiplier, HLV, and expense methods. Practical examples for different income levels in India.",
    keywords: "how much life insurance, life insurance calculator, HLV calculator, insurance cover needed, life insurance India, income multiplier insurance",
    faq: [
      { q: "What is the thumb rule for life insurance?", a: "The simplest rule is 10-15 times your annual income. A 30-year-old earning ₹10 lakh/year should have at least ₹1-1.5 crore cover. Use the HLV method for a more accurate calculation." },
      { q: "How do I calculate Human Life Value?", a: "HLV = Annual Income × (1 - Personal Expense Ratio) × Years to Retirement. Assuming 30% personal expenses: a 30-year-old earning ₹10L/year has an HLV of approximately ₹1.46 crore." },
    ],
  },
  "/blog/term-vs-whole-life-insurance": {
    title: "Term vs Whole Life Insurance: Which is Right for You? | InsureKit",
    description: "Compare term insurance vs whole life plans in India. LIC Tech Term vs Jeevan Umang — premiums, benefits, returns, and which is right for your needs.",
    keywords: "term vs whole life, term insurance comparison, whole life insurance India, LIC Tech Term, Jeevan Umang, term plan vs whole life plan",
    faq: [
      { q: "Is term insurance a waste if I survive?", a: "No. Term insurance is pure protection at the lowest cost. The premium saved vs an endowment plan can be invested in SIPs to create 3-5× more wealth. Think of it like car insurance — you pay for protection, not returns." },
      { q: "Which is better for a 30-year-old?", a: "For most 30-year-olds, a large term plan (₹1 Cr+) is essential. Add a smaller whole life or endowment plan for savings. The combination approach gives the best of both worlds." },
    ],
  },
  "/blog/insurance-planning-newlyweds": {
    title: "Insurance Planning for Newlyweds in India — Complete Guide | InsureKit",
    description: "Complete insurance planning guide for newly married couples in India. Term insurance, health cover, savings plans, and budget allocation for newlyweds.",
    keywords: "insurance for newlyweds, newly married insurance, couple insurance plan, newlywed financial planning, health insurance newlyweds, term insurance couple",
    faq: [
      { q: "What insurance should newlyweds buy first?", a: "1. Term insurance (10-15x each earning spouse's income). 2. Health insurance (family floater, minimum ₹5 lakh). 3. Optional: endowment plan for savings. Buy term and health cover within the first month of marriage." },
      { q: "How much should a couple spend on insurance?", a: "3-5% of combined income on term + health insurance is the minimum. Total insurance spend including savings plans should not exceed 15-20% of household income." },
    ],
  },
  "/blog/lic-term-insurance-plans-2026": {
    title: "LIC Term Insurance Plans 2026: Complete Comparison Guide | InsureKit",
    description: "Compare all LIC term insurance plans — Tech Term 854, Jeevan Amar 855, Jeevan Kiran 875. Premium comparison, features, riders, claim ratio, and buying guide.",
    keywords: "LIC term insurance, LIC Tech Term 854, Jeevan Amar 855, Jeevan Kiran 875, LIC term plan comparison, best LIC term plan, term insurance India 2026",
    faq: [
      { q: "Which is the best LIC term insurance plan?", a: "LIC Tech Term (854) is the best value with the lowest premiums. Jeevan Amar (855) offers increasing cover. Jeevan Kiran (875) returns premiums on survival." },
      { q: "Is LIC term insurance cheaper than private?", a: "LIC premiums are slightly higher, but the 98.6% claim settlement ratio and government backing make the premium difference worthwhile for many buyers." },
    ],
  },
  "/blog/health-vs-life-insurance": {
    title: "Health Insurance vs Life Insurance: Which Should You Buy First? | InsureKit",
    description: "Health insurance vs life insurance comparison for Indians. Which to buy first, coverage needs, tax benefits under 80C and 80D, and budgeting for both.",
    keywords: "health insurance vs life insurance, health or life insurance first, 80C vs 80D, insurance priority India, health insurance India, life insurance India",
    faq: [
      { q: "Should I buy health or life insurance first?", a: "If single with no dependents, buy health insurance first. If you have a spouse or children, buy life insurance (term plan) first. Ideally buy both together — combined cost is under ₹15,000/year for a 25-year-old." },
      { q: "Can life insurance cover hospital bills?", a: "No. Life insurance pays only on death or maturity. Health insurance covers hospitalisation, surgery, and medical expenses. They solve different problems." },
    ],
  },
  "/blog/calculate-life-insurance-coverage": {
    title: "How to Calculate Your Life Insurance Coverage Need | InsureKit",
    description: "Calculate the right life insurance coverage using income multiplier, HLV, and expense methods. Step-by-step examples for Indian salaried professionals.",
    keywords: "life insurance coverage calculator, how much life insurance, HLV calculator, insurance cover needed India, life insurance calculation, human life value",
    faq: [
      { q: "What is the thumb rule for life insurance?", a: "10-15 times annual income. A 30-year-old earning ₹10L/year needs ₹1-1.5 Cr. Use the expense-based method for more accuracy — it accounts for loans, children's education, and existing cover." },
      { q: "How often should I review my coverage?", a: "Every 2-3 years or after major life events: marriage, child birth, home loan, salary hike. Coverage need increases with dependents and loans but decreases as children grow up." },
    ],
  },
  "/tools/premium-estimator": {
    title: "Insurance Premium Estimator — Compare Premiums Across Insurers | DoAide InsureKit",
    description: "Estimate insurance premiums based on age, coverage amount, and policy term. Compare indicative premiums across LIC, HDFC Life, Max Life, ICICI Prudential, SBI Life, and Tata AIA.",
    keywords: "insurance premium estimator, insurance premium calculator, term insurance premium, compare insurance premiums, cheapest insurance premium, insurance cost India",
    faq: [
      { q: "How accurate are premium estimates?", a: "These are indicative estimates based on public rate patterns. Actual premiums vary by ±10-15% based on medical history, BMI, occupation, and insurer underwriting. Get formal quotes for exact pricing." },
      { q: "Why does smoking affect premium?", a: "Smokers pay 40-80% higher premiums due to increased mortality risk. Some insurers include chewing tobacco and e-cigarettes in the smoker category." },
    ],
  },
  "/tools/policy-comparison": {
    title: "Policy Comparison Tool — Compare 2-3 Insurance Policies Side by Side | DoAide InsureKit",
    description: "Compare any 2-3 insurance policies side by side. Enter policy details, see features, premiums, coverage, and benefits compared in one view. Share via WhatsApp or print.",
    keywords: "policy comparison tool, compare insurance policies, insurance comparison, compare LIC policies, insurance policy compare, side by side insurance comparison",
    faq: [
      { q: "Can I compare policies from different insurers?", a: "Yes! Compare any policies side by side — LIC vs private, term vs endowment, or same insurer with different parameters." },
      { q: "What is cover per rupee?", a: "It shows how much coverage (sum assured) you get for every ₹1 of premium paid. Higher is better — term plans score highest on this metric." },
    ],
  },
  "/guides/ulip-vs-mutual-fund": {
    title: "ULIP vs Mutual Fund: Which is Better in 2026? | DoAide InsureKit",
    description: "Detailed comparison of ULIPs and mutual funds — charges, returns, tax benefits, flexibility, and suitability. Make an informed investment choice.",
    keywords: "ULIP vs mutual fund, ULIP comparison, mutual fund vs ULIP, ULIP charges, ULIP tax benefit, ELSS vs ULIP, best investment option",
    faq: [
      { q: "Is ULIP better than mutual fund for tax saving?", a: "Both save tax under 80C. ULIP maturity is tax-free under 10(10D) if annual premium < ₹2.5L, while ELSS has LTCG tax of 12.5% on gains above ₹1.25L." },
      { q: "What is the lock-in period for ULIP vs ELSS?", a: "ULIPs have a 5-year lock-in, ELSS mutual funds have a 3-year lock-in. ULIPs charge higher fees in early years." },
      { q: "Which gives better returns — ULIP or mutual fund?", a: "Mutual funds generally deliver 1-2% higher annual returns due to lower charges. The gap narrows over 15+ years." },
    ],
  },
};

function buildStructuredData(pathname, meta) {
  const base = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Free LIC insurance calculators and agent tools",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    creator: { "@type": "Organization", name: "DoAide", url: "https://doaide.com" },
  };

  const schemas = [base];

  const crumbs = [{ name: "DoAide", item: "https://doaide.com/" }, { name: "InsureKit", item: SITE_URL }];
  if (pathname !== "/") {
    const label = meta?.title?.split("|")[0]?.split("—")[0]?.trim() || pathname.replace(/^\//, "");
    crumbs.push({ name: label, item: `${SITE_URL}${pathname}` });
  }
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
  });

  if (meta?.faq?.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: meta.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return schemas;
}

export default function SEOHead() {
  const { pathname } = useLocation();
  const meta = META[pathname];

  useEffect(() => {
    if (!meta) return;
    document.title = meta.title;

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", meta.description);
    setMeta("name", "keywords", meta.keywords);

    const canonicalUrl = `${SITE_URL}${pathname}`;
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_IN");

    setMeta("property", "og:image", "https://insure.doaide.com/og-image.png");
    setMeta("property", "og:image:alt", meta.title);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", "https://insure.doaide.com/og-image.png");

    const schemas = buildStructuredData(pathname, meta);

    document.querySelectorAll("script[data-seo-ld]").forEach((el) => el.remove());

    schemas.forEach((schema, i) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-ld", String(i));
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [pathname, meta]);

  return null;
}
