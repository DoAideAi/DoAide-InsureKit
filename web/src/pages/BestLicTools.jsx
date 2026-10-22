import { useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";

const SITE_URL = "https://insure.doaide.com";

const TOOLS = [
  {
    rank: 1,
    name: "DoAide InsureKit",
    url: "https://insure.doaide.com",
    price: "Free",
    pros: [
      "22+ free tools — premium, maturity, surrender, revival, loan, claim, tax calculators",
      "Plan recommender, side-by-side comparison, detailed plan pages for 30+ LIC plans",
      "No login, no registration, works offline, data stays on your device",
      "WhatsApp sharing, PDF export, marketing templates, bonus history",
    ],
    cons: [
      "No mobile app (web-only, but fully mobile-optimized)",
      "Policy tracker data stored in browser only",
    ],
    verdict: "Best overall value. Most comprehensive free toolkit for LIC agents.",
  },
  {
    rank: 2,
    name: "Perfect Agent Plus",
    url: null,
    price: "Freemium (Rs.499-999/yr for premium features)",
    pros: [
      "Good premium and maturity calculators",
      "Policy management features",
      "WhatsApp integration",
    ],
    cons: [
      "Premium features behind paywall",
      "Requires registration and login",
      "Fewer calculators (no revival, loan, claim, tax)",
      "No plan recommender or detailed plan pages",
    ],
    verdict: "Solid tool with good basics, but paid features limit access.",
  },
  {
    rank: 3,
    name: "LIC Super Sales Saathi",
    url: null,
    price: "Paid subscription",
    pros: [
      "Official-feeling interface",
      "Client management features",
      "WhatsApp templates",
    ],
    cons: [
      "Subscription required for most features",
      "Limited free tier",
      "Fewer calculation tools",
      "No plan comparison or recommender",
    ],
    verdict: "Decent for client management, but limited calculator suite.",
  },
  {
    rank: 4,
    name: "LIC MF App (Official)",
    url: null,
    price: "Free",
    pros: [
      "Official LIC app",
      "Policy status check",
      "Premium payment online",
    ],
    cons: [
      "Very basic calculator",
      "Slow and often buggy",
      "No comparison or recommendation tools",
      "Limited to basic policy operations",
    ],
    verdict: "Use for policy payments, but not for sales tools.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Which is the best free LIC agent tool in 2026?",
    a: "DoAide InsureKit is the most comprehensive free tool with 22+ features including premium, maturity, surrender, revival, loan, claim, and tax calculators, plus a plan recommender and detailed plan pages. No registration needed.",
  },
  {
    q: "Do I need to pay for LIC agent tools?",
    a: "Not necessarily. InsureKit offers all essential tools for free. Some competitors charge Rs.500-1000/year for features that InsureKit provides at no cost.",
  },
  {
    q: "Can I use these tools offline?",
    a: "InsureKit works offline once loaded. Most other tools require an internet connection. InsureKit's calculations run entirely in your browser.",
  },
  {
    q: "Are these tools officially endorsed by LIC?",
    a: "None of these third-party tools are officially endorsed by LIC. They use LIC's published premium rates for calculations. Always verify with LIC before making financial decisions.",
  },
];

export default function BestLicTools() {
  useEffect(() => {
    const title = "Best LIC Agent Tools 2026 — Top 4 Apps Compared | DoAide InsureKit";
    const desc = "Comprehensive comparison of the best LIC agent tools in 2026. InsureKit vs Perfect Agent Plus vs Super Sales Saathi vs LIC MF App. Features, pricing, pros & cons.";
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
    setMeta("name", "keywords", "best LIC agent tools 2026, LIC calculator app, LIC agent app, free LIC tools, InsureKit, Perfect Agent Plus, Super Sales Saathi");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", `${SITE_URL}/best-lic-agent-tools-2026`);

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}/best-lic-agent-tools-2026`);

    // JSON-LD ItemList
    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Best LIC Agent Tools 2026",
      itemListElement: TOOLS.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.name,
        description: t.verdict,
      })),
    };
    document.querySelectorAll("script[data-seo-ld]").forEach((el) => el.remove());
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo-ld", "0");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        Best LIC Agent Tools 2026
      </h1>
      <p className="text-white/40 text-sm mb-8">
        We compared the top 4 tools LIC agents use in 2026. Here's what we found.
      </p>

      <div className="space-y-6 mb-10">
        {TOOLS.map((tool) => (
          <div key={tool.name} className={`panel p-5 sm:p-6 ${tool.rank === 1 ? "border-signal/30" : ""}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                tool.rank === 1 ? "bg-signal text-white" : "bg-white/10 text-white/50"
              }`}>
                #{tool.rank}
              </span>
              <div>
                <h2 className="text-base font-bold text-white">{tool.name}</h2>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span>{tool.price}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-good uppercase font-semibold mb-2">Pros</div>
                <ul className="space-y-1.5">
                  {tool.pros.map((p, i) => (
                    <li key={i} className="flex gap-2 text-xs text-white/60">
                      <span className="text-good shrink-0">+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs text-bad uppercase font-semibold mb-2">Cons</div>
                <ul className="space-y-1.5">
                  {tool.cons.map((c, i) => (
                    <li key={i} className="flex gap-2 text-xs text-white/60">
                      <span className="text-bad shrink-0">-</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="panel-inner p-3">
              <span className="text-xs text-white/40">Verdict: </span>
              <span className="text-xs text-white/70 font-medium">{tool.verdict}</span>
            </div>
          </div>
        ))}
      </div>

      <FAQ items={FAQ_ITEMS} />

      <div className="panel p-6 text-center mb-8">
        <p className="text-white/50 text-sm mb-4">Try the #1 rated LIC agent toolkit</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary no-underline text-sm">Explore InsureKit</Link>
          <Link to="/plans" className="btn-secondary no-underline text-sm">Browse All Plans</Link>
        </div>
      </div>
    </div>
  );
}
