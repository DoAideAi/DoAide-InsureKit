import { Link, Outlet, useLocation } from "react-router-dom";
import { MARKDOWN_POSTS } from "./markdownPosts";

const ARTICLES = [
  {
    slug: "best-free-lic-premium-calculator-2026",
    title: "Best Free LIC Premium Calculator 2026: What to Look For and How to Check Accuracy",
    description: "How to pick the best free LIC premium calculator in 2026. Features that matter, how to verify a quote against your Benefit Illustration, and common mistakes.",
  },
  {
    slug: "choose-right-lic-plan-for-family",
    title: "How to Choose the Right LIC Plan for Your Family: A 5-Step Framework",
    description: "Work out the cover your family needs, match goals to LIC plan types, check affordability and compare plans before you buy.",
  },
  {
    slug: "lic-vs-private-life-insurance",
    title: "LIC vs Private Life Insurance: An Honest Comparison Guide for 2026",
    description: "LIC vs private insurers on sovereign guarantee, claim settlement, term premiums, savings plans, exit value and tax — and which suits you.",
  },
  {
    slug: "best-lic-plans-2026-comparison-guide",
    title: "Best LIC Plans 2026 — Comparison Guide",
    description: "Compare endowment, term, ULIP, and pension plans from LIC. Find the best plan for savings, protection, retirement, and child's future with premium and maturity details.",
  },
  {
    slug: "lic-premium-calculator-guide",
    title: "LIC Premium Calculator Guide — How to Calculate Premium for Any Plan",
    description: "Complete guide to LIC premium calculation. Understand premium factors, GST, mode rebates, SA rebates, and how to use the premium calculator for accurate quotes.",
  },
  {
    slug: "fd-vs-rd-vs-lic-comparison",
    title: "FD vs RD vs LIC Comparison — Which Gives Better Returns?",
    description: "Detailed comparison of Fixed Deposits, Recurring Deposits, and LIC plans. Compare returns, tax benefits, liquidity, risk, and lock-in period to choose the best savings option.",
  },
  {
    slug: "lic-bonus-rates-2026",
    title: "LIC Bonus Rates 2026 — Complete Plan-Wise List",
    description: "Latest LIC bonus rates for 2026 — Simple Reversionary Bonus, Final Additional Bonus, and Loyalty Addition for all active plans with historical trends.",
  },
  {
    slug: "best-lic-plans-child-education-2026",
    title: "Best LIC Plans for Child Education 2026 — Top 5 with Returns",
    description: "Compare the best LIC plans for child education — Jeevan Labh, Amritbaal, Jeevan Tarun. Premium examples, maturity projections, and education cost planning.",
  },
  {
    slug: "lic-maturity-claim-online",
    title: "How to Claim LIC Maturity Amount Online — Step-by-Step Guide",
    description: "Complete guide on how to claim LIC maturity amount online. Documents needed, NEFT registration, Discharge Voucher process, TDS rules, and timeline.",
  },
  {
    slug: "lic-surrender-value-calculator-guide",
    title: "LIC Plan Surrender Value Calculator — How to Calculate GSV & SSV",
    description: "Learn how to calculate LIC policy surrender value. GSV vs SSV formulas, year-wise factors, and better alternatives to surrendering your policy.",
  },
  {
    slug: "how-much-life-insurance",
    title: "How Much Life Insurance Do You Really Need in 2026?",
    description: "Calculate the right life insurance cover using income multiplier, HLV, and expense methods. Practical examples for different income levels in India.",
  },
  {
    slug: "term-vs-whole-life-insurance",
    title: "Term vs Whole Life Insurance: Which is Right for You in 2026?",
    description: "Compare term insurance vs whole life plans in India. LIC Tech Term vs Jeevan Umang — premiums, benefits, returns, and which is right for your needs.",
  },
  {
    slug: "insurance-planning-newlyweds",
    title: "Insurance Planning for Newlyweds in India — A Complete Guide",
    description: "Complete insurance planning guide for newly married couples in India. Term insurance, health cover, savings plans, and budget allocation for newlyweds.",
  },
  {
    slug: "lic-term-insurance-plans-2026",
    title: "LIC Term Insurance Plans 2026: Complete Comparison Guide",
    description: "Compare all LIC term insurance plans — Tech Term 854, Jeevan Amar 855, Jeevan Kiran 875. Premium comparison, features, riders, claim ratio, and buying guide.",
  },
  {
    slug: "health-vs-life-insurance",
    title: "Health Insurance vs Life Insurance: Which Should You Buy First?",
    description: "Health insurance vs life insurance comparison for Indians. Which to buy first, coverage needs, tax benefits under 80C and 80D, and how to budget for both.",
  },
  {
    slug: "calculate-life-insurance-coverage",
    title: "How to Calculate Your Life Insurance Coverage Need",
    description: "Step-by-step guide to calculating the right life insurance coverage using income multiplier, HLV, and expense methods with Indian examples and calculators.",
  },
];

export { ARTICLES };

export default function BlogLayout() {
  const { pathname } = useLocation();
  const isIndex = pathname === "/blog" || pathname === "/blog/";

  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">
          ← Back to InsureKit
        </Link>
      </div>
      {isIndex && (
        <>
          <h1 className="text-2xl font-bold text-white mb-1">InsureKit Blog</h1>
          <p className="text-white/40 text-sm mb-8">Guides and resources for LIC agents and policyholders</p>
        </>
      )}
      <Outlet />
    </div>
  );
}

export function BlogIndex() {
  return (
    <div className="space-y-4">
      {[...MARKDOWN_POSTS, ...ARTICLES].map((a) => (
        <Link
          key={a.slug}
          to={`/blog/${a.slug}`}
          className="block panel-inner p-5 hover:bg-white/[0.04] transition-colors"
        >
          <h2 className="text-base font-semibold text-white mb-1">{a.title}</h2>
          <p className="text-sm text-white/40 leading-relaxed">{a.description}</p>
          <span className="inline-block mt-2 text-xs text-signal font-medium">Read more →</span>
        </Link>
      ))}
    </div>
  );
}
