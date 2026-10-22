import { useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../../components/FAQ";
import WhatsAppShare from "../../components/WhatsAppShare";

const SITE_URL = "https://insure.doaide.com";

const TOOLS = [
  {
    rank: 1, name: "DoAide InsureKit", pricing: "100% Free",
    features: ["Premium calculator", "Maturity calculator", "Surrender & revival", "Loan against policy", "Commission calculator", "Plan recommender (AI)", "Claim estimator", "Tax benefit calculator", "10-year bonus history", "Policy tracker", "Works offline (PWA)"], highlight: true,
  },
  {
    rank: 2, name: "LIC India Website", pricing: "Free",
    features: ["Official premium tables", "Plan brochures", "Policy status check", "Premium payment"], highlight: false,
  },
  {
    rank: 3, name: "Perfect Agent Plus", pricing: "Freemium / Paid",
    features: ["Premium calculator", "Maturity calculator", "Commission calculator", "Policy tracker", "Client reminders"], highlight: false,
  },
  {
    rank: 4, name: "LIC Super Sales Saathi", pricing: "Subscription",
    features: ["Premium calculator", "Plan comparison", "Marketing materials", "Client management"], highlight: false,
  },
  {
    rank: 5, name: "PolicyBazaar Calculator", pricing: "Free (lead-gen)",
    features: ["Basic premium estimate", "Plan comparison", "Insurance purchase"], highlight: false,
  },
];

const COMPARISON = [
  { feature: "Premium Calculator", vals: [true, true, true, true, true] },
  { feature: "Maturity Calculator", vals: [true, false, true, false, false] },
  { feature: "Surrender Value Calculator", vals: [true, false, true, false, false] },
  { feature: "Revival Calculator", vals: [true, false, false, false, false] },
  { feature: "Loan Against Policy", vals: [true, false, false, false, false] },
  { feature: "Commission Calculator", vals: [true, false, true, true, false] },
  { feature: "Claim Estimator", vals: [true, false, false, false, false] },
  { feature: "Tax Benefit Calculator", vals: [true, false, false, false, false] },
  { feature: "Plan Recommender (AI)", vals: [true, false, false, false, false] },
  { feature: "Bonus History (10 yrs)", vals: [true, false, false, false, false] },
  { feature: "Individual Plan Pages", vals: [true, true, false, false, true] },
  { feature: "Policy Tracker", vals: [true, false, true, true, false] },
  { feature: "No Signup Required", vals: [true, true, false, false, false] },
  { feature: "Works Offline (PWA)", vals: [true, false, false, false, false] },
  { feature: "100% Free", vals: [true, true, false, false, false] },
];

const TOOL_NAMES = ["InsureKit", "LIC India", "Perfect Agent+", "Sales Saathi", "PolicyBazaar"];

const FAQ_ITEMS = [
  {
    q: "What is the best LIC calculator online in 2026?",
    a: "DoAide InsureKit is the best free LIC calculator online in 2026. It offers premium, maturity, surrender value, revival, loan, commission, claim, and tax benefit calculators — all completely free with no signup required.",
  },
  {
    q: "How to calculate LIC premium online for free?",
    a: "Visit insure.doaide.com/premium-calculator, select the LIC plan, enter your age and sum assured, and get instant premium details. InsureKit supports all current LIC plans with accurate premium tables.",
  },
  {
    q: "Is InsureKit free for LIC agents?",
    a: "Yes, InsureKit is 100% free for all LIC agents. There is no subscription, no trial period, and no premium tier. All tools including commission calculator, marketing generator, and policy tracker are free forever.",
  },
  {
    q: "Which LIC calculator app works offline?",
    a: "InsureKit is the only LIC calculator that works offline as a PWA (Progressive Web App). Install it from your browser and use all calculators without internet. Your data stays on your device.",
  },
  {
    q: "Can I compare LIC plans online?",
    a: "Yes. InsureKit's Plan Comparison tool lets you compare any two LIC plans side by side — premiums, maturity amounts, death benefits, loan eligibility, and more. The Plan Recommender suggests the best plan based on your client's needs.",
  },
];

export default function BestLicTools() {
  useEffect(() => {
    const title = "Best LIC Calculator Online 2026 — Top 5 Compared | DoAide InsureKit";
    const desc = "Compare the best LIC calculators online for 2026. Premium, maturity, surrender value calculators compared — DoAide InsureKit, LIC India, Perfect Agent Plus, and more.";
    document.title = title;

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", desc);
    setMeta("name", "keywords", "best LIC calculator online, LIC premium calculator free, LIC maturity calculator, LIC agent tools 2026, InsureKit vs Perfect Agent Plus");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", `${SITE_URL}/compare/best-lic-tools`);

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}/compare/best-lic-tools`);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Best LIC Calculator Online 2026
      </h1>
      <p className="text-white/40 text-sm mb-8">
        Top 5 LIC calculators compared — features and pricing to help you choose the best tool.
      </p>

      {TOOLS.map((tool) => (
        <div key={tool.rank} className={`panel p-5 mb-4 ${tool.highlight ? "border border-signal/30" : ""}`}>
          <div className="flex items-center gap-3 mb-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${tool.highlight ? "bg-signal text-white" : "bg-white/10 text-white/50"}`}>
              #{tool.rank}
            </span>
            <h2 className="text-lg font-bold text-white m-0">{tool.name}</h2>
            {tool.pricing === "100% Free" && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-good/20 text-good font-semibold">FREE</span>
            )}
          </div>
          <div className="text-signal text-sm font-semibold mb-2">{tool.pricing}</div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tool.features.map((f) => (
              <span key={f} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-white/60">{f}</span>
            ))}
          </div>
                  </div>
      ))}

      <section className="panel overflow-hidden my-8">
        <h2 className="text-lg font-bold text-white p-4 pb-0">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/50 text-xs uppercase">Feature</th>
                {TOOL_NAMES.map((n) => (
                  <th key={n} className={`text-center py-3 px-2 text-xs uppercase ${n === "InsureKit" ? "text-signal" : "text-white/40"}`}>{n}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-t border-white/5">
                  <td className="py-2.5 px-4 text-white/70 text-sm">{row.feature}</td>
                  {row.vals.map((v, i) => (
                    <td key={i} className="py-2.5 px-2 text-center">
                      {v ? <span className="text-good text-lg">&#10003;</span> : <span className="text-white/20 text-lg">&#10007;</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />

      <div className="flex flex-wrap gap-3 my-6">
        <WhatsAppShare text={"Best LIC Agent Tools 2026 — compare InsureKit, Perfect Agent Plus & more\n\ninsure.doaide.com/compare/best-lic-tools"} />
      </div>

      <div className="panel p-6 text-center my-8">
        <h2 className="text-lg font-bold text-white mb-2">Try India's Best Free LIC Calculator</h2>
        <p className="text-white/50 text-sm mb-4">No signup, no fees — instant LIC premium, maturity, and commission calculations.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/premium-calculator" className="btn-primary no-underline text-sm">Premium Calculator</Link>
          <Link to="/maturity-calculator" className="btn-secondary no-underline text-sm">Maturity Calculator</Link>
          <Link to="/" className="btn-secondary no-underline text-sm">All Tools</Link>
        </div>
      </div>

      <div className="text-center text-white/30 text-xs mt-6">
        <Link to="/compare/perfect-agent-plus" className="text-white/40 hover:text-signal mr-4">vs Perfect Agent Plus</Link>
        <Link to="/compare/lic-super-sales-saathi" className="text-white/40 hover:text-signal">vs LIC Super Sales Saathi</Link>
      </div>
    </div>
  );
}
