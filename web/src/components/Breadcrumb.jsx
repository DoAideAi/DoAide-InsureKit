import { Link, useLocation } from "react-router-dom";

const ROUTE_NAMES = {
  "/premium-calculator": "Premium Calculator",
  "/maturity-calculator": "Maturity Calculator",
  "/plan-comparison": "Plan Comparison",
  "/commission-calculator": "Commission Calculator",
  "/tax-calculator": "Tax Calculator",
  "/policy-tracker": "Policy Tracker",
  "/bonus-history": "Bonus History",
  "/marketing": "Marketing Generator",
  "/client-reminders": "Client Reminders",
  "/receipt-generator": "Receipt Generator",
  "/revival-calculator": "Revival Calculator",
  "/surrender-calculator": "Surrender Calculator",
  "/loan-calculator": "Loan Against Policy",
  "/premium-calendar": "Premium Calendar",
  "/claim-estimator": "Claim Estimator",
  "/plan-recommender": "Plan Recommender",
  "/compare-plans": "Compare Any Plans",
  "/guides": "Guides",
  "/guides/best-lic-plans-2026": "Best LIC Plans 2026",
  "/guides/check-policy-status": "Check Policy Status",
  "/guides/bonus-rates-history": "Bonus Rates History",
  "/guides/revive-lapsed-policy": "Revive Lapsed Policy",
  "/plans": "LIC Plans",
  "/compare": "Compare",
  "/compare/lic-super-sales-saathi": "InsureKit vs Super Sales Saathi",
  "/compare/perfect-agent-plus": "InsureKit vs Perfect Agent Plus",
  "/best-lic-agent-tools-2026": "Best LIC Agent Tools 2026",
  "/premium-table": "Age-Wise Premium Table",
  "/dashboard": "Agent Dashboard",
  "/maturity-tracker": "Maturity Tracker",
  "/claim-settlement-ratio": "Claim Settlement Ratio",
  "/sip-vs-insurance": "SIP vs Insurance",
  "/plan-presentation": "Plan Presentation",
  "/premium-due-register": "Premium Due Register",
  "/branch-locator": "LIC Branch Locator",
  "/report-generator": "Business Reports",
  "/guides/lic-premium-payment-online": "LIC Premium Payment Online",
  "/guides/lic-policy-status-check": "LIC Policy Status Check",
  "/guides/lic-maturity-amount-check": "LIC Maturity Amount Check",
  "/guides/lic-loan-on-policy": "Loan on LIC Policy",
  "/guides/lic-surrender-value": "LIC Surrender Value Guide",
  "/guides/lic-agent-exam-preparation": "LIC Agent Exam Preparation",
  "/guides/lic-claim-process": "LIC Claim Process",
  "/guides/lic-tax-benefits": "LIC Tax Benefits",
  "/guides/best-lic-plans-for-child": "Best LIC Plans for Children",
  "/guides/best-term-insurance-plan": "Best Term Insurance Plans",
  "/guides/lic-commission-structure": "LIC Commission Structure",
  "/guides/how-to-become-lic-agent": "How to Become LIC Agent",
  "/guides/best-plans-for-tax-saving": "Best Plans for Tax Saving",
  "/guides/section-80d-health-insurance": "Section 80D Health Insurance",
  "/guides/ulip-vs-mutual-fund": "ULIP vs Mutual Fund",
  "/paid-up-value": "Paid-Up Value Calculator",
  "/insurance-age-calculator": "Insurance Age Calculator",
  "/rider-premium-calculator": "Rider Premium Calculator",
  "/rebate-calculator": "Rebate Calculator",
  "/self-mix": "Self Mix Presentation",
  "/family-mix": "Family Mix Presentation",
  "/budget-presentation": "Budget & Goal-wise Plans",
  "/club-qualification": "Club Qualification",
  "/greeting-cards": "Greeting Card Creator",
  "/doctor-panel": "Doctor & Hospital Panel",
  "/business-card": "Business Card Creator",
  "/fd-rd-calculator": "FD/RD vs Insurance",
  "/retirement-calculator": "Retirement Calculator",
  "/child-education-calculator": "Child Education Calculator",
  "/ulip-vs-mutual-fund-calculator": "ULIP vs Mutual Fund",
};

// Path prefixes with no page of their own (/compare/x and /tools/x exist, /compare
// and /tools do not), shown as plain text so the trail never links to a 404.
const NO_PAGE = new Set(["/compare", "/tools"]);

export default function Breadcrumb() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [{ path: "/", label: "Home" }];

  let accumulated = "";
  for (const seg of segments) {
    accumulated += "/" + seg;
    crumbs.push({
      path: accumulated,
      label: ROUTE_NAMES[accumulated] || seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    });
  }

  return (
    <nav className="border-b border-white/7 print:hidden" aria-label="Breadcrumb">
      <div className="max-w-4xl mx-auto px-4">
        <ol className="flex items-center gap-1.5 py-2.5 text-xs text-white/35">
          {crumbs.map((crumb, i) => (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {i > 0 && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              )}
              {i === crumbs.length - 1 || NO_PAGE.has(crumb.path) ? (
                <span className="text-white/60">{crumb.label}</span>
              ) : (
                <Link to={crumb.path} className="hover:text-white/60 transition-colors no-underline">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
