import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { LIC_PLANS, PLAN_TYPES, PLAN_TYPE_LABELS } from "../data/licPlans";

const SITE_URL = "https://insure.doaide.com";

const TYPE_TABS = [
  { key: "all", label: "All Plans" },
  { key: PLAN_TYPES.ENDOWMENT, label: "Endowment" },
  { key: PLAN_TYPES.MONEY_BACK, label: "Money Back" },
  { key: PLAN_TYPES.TERM, label: "Term" },
  { key: PLAN_TYPES.WHOLE_LIFE, label: "Whole Life" },
  { key: PLAN_TYPES.CHILD, label: "Child" },
  { key: PLAN_TYPES.PENSION, label: "Pension" },
  { key: PLAN_TYPES.ULIP, label: "ULIP" },
  { key: PLAN_TYPES.GOVT, label: "Govt Scheme" },
];

function fmt(n) {
  if (n == null) return "No limit";
  return new Intl.NumberFormat("en-IN").format(n);
}

function TypeBadge({ type }) {
  const colors = {
    endowment: "bg-blue-500/15 text-blue-400",
    money_back: "bg-emerald-500/15 text-emerald-400",
    whole_life: "bg-purple-500/15 text-purple-400",
    term: "bg-red-500/15 text-red-400",
    child: "bg-pink-500/15 text-pink-400",
    pension: "bg-amber-500/15 text-amber-400",
    govt: "bg-green-500/15 text-green-400",
    ulip: "bg-cyan-500/15 text-cyan-400",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${colors[type] || "bg-white/10 text-white/60"}`}>
      {PLAN_TYPE_LABELS[type] || type}
    </span>
  );
}

export default function PlansDirectoryPage() {
  const [activeType, setActiveType] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const title = "All LIC Plans 2026 — Complete Directory with Details & Premium | DoAide InsureKit";
    const desc = "Browse all LIC plans — Endowment, Money Back, Term, Whole Life, Child, Pension, ULIP. Compare features, check eligibility, calculate premium. Free, no login.";
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
    setMeta("name", "keywords", "LIC plans, all LIC plans, LIC plan list, LIC plan directory, LIC endowment plans, LIC term plans, LIC money back plans");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", `${SITE_URL}/plans`);
    setMeta("property", "og:type", "website");

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}/plans`);
  }, []);

  const filtered = useMemo(() => {
    let plans = LIC_PLANS;
    if (activeType !== "all") {
      plans = plans.filter((p) => p.type === activeType);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      plans = plans.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          String(p.tableNo).includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return plans;
  }, [activeType, search]);

  return (
    <div className="animate-fade-up">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          All LIC Plans
        </h1>
        <p className="text-white/40 text-sm">
          Browse {LIC_PLANS.length} LIC plans. Click any plan for full details, eligibility, and premium calculator.
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search plans by name or table number..."
          className="input-field"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Type Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6 print:hidden">
        {TYPE_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveType(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeType === tab.key
                ? "bg-signal text-white"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-xs text-white/30 mb-4">
        {filtered.length} plan{filtered.length !== 1 ? "s" : ""} found
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {filtered.map((plan) => (
          <Link
            key={plan.id}
            to={`/plans/${plan.slug}`}
            className="panel p-4 hover:border-signal/30 transition-all group no-underline"
          >
            <div className="flex items-center gap-2 mb-2">
              <TypeBadge type={plan.type} />
              {plan.tableNo > 0 && (
                <span className="text-xs text-white/30">Table {plan.tableNo}</span>
              )}
            </div>
            <h2 className="text-sm font-semibold text-white group-hover:text-signal transition-colors mb-1">
              {plan.name}
            </h2>
            <p className="text-xs text-white/35 leading-relaxed mb-3 line-clamp-2">
              {plan.description}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/40">
              <span>Age: {plan.minAge}-{plan.maxAge}</span>
              {plan.minTerm > 0 && (
                <span>Term: {plan.minTerm === plan.maxTerm ? plan.minTerm : `${plan.minTerm}-${plan.maxTerm}`}yr</span>
              )}
              <span>SA: Rs.{fmt(plan.minSA)}+</span>
              {(plan.srbRate > 0) && (
                <span className="text-signal">Bonus: Rs.{plan.srbRate}/1000</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-white/40 text-sm">
          No plans match your search. Try a different term or category.
        </div>
      )}

      {/* Bottom CTA */}
      <div className="panel p-6 text-center mb-8">
        <p className="text-white/50 text-sm mb-4">
          Need help choosing the right plan?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/plan-recommender" className="btn-primary no-underline text-sm">
            Get Plan Recommendation
          </Link>
          <Link to="/compare-plans" className="btn-secondary no-underline text-sm">
            Compare Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
