import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";
import { getPlanBySlug, getRelatedPlans, PLAN_TYPE_LABELS } from "../data/licPlans";
import { BONUS_HISTORY } from "../data/bonusHistory";
import FAQ from "../components/FAQ";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";

const SITE_URL = "https://insure.doaide.com";

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
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${colors[type] || "bg-white/10 text-white/60"}`}>
      {PLAN_TYPE_LABELS[type] || type}
    </span>
  );
}

function StatBox({ label, value, accent }) {
  return (
    <div className="stat-card">
      <div className="label">{label}</div>
      <div className={`value text-base ${accent ? "accent" : ""}`}>{value}</div>
    </div>
  );
}

function buildFAQ(plan) {
  const items = [];
  items.push({
    q: `What is LIC ${plan.name} (Table ${plan.tableNo})?`,
    a: plan.description,
  });
  if (plan.type !== "govt" && plan.type !== "ulip") {
    items.push({
      q: `What is the entry age for ${plan.name}?`,
      a: `The minimum entry age is ${plan.minAge} years and maximum entry age is ${plan.maxAge} years.`,
    });
  }
  if (plan.srbRate > 0 || plan.srbByTerm) {
    const rate = plan.srbRate || Object.values(plan.srbByTerm || {})[0] || 0;
    items.push({
      q: `What is the bonus rate for ${plan.name}?`,
      a: `The current Simple Reversionary Bonus (SRB) rate is approximately Rs.${rate} per Rs.1000 of Sum Assured. Bonus rates are declared annually by LIC and may change.`,
    });
  }
  items.push({
    q: `Is ${plan.name} a good plan to buy in 2026?`,
    a: `${plan.name} is suitable for ${plan.type === "term" ? "those seeking pure life cover at the lowest cost" : plan.type === "endowment" ? "those looking for savings plus insurance with guaranteed returns" : plan.type === "money_back" ? "those who want periodic payouts during the policy term" : plan.type === "whole_life" ? "those seeking lifelong coverage with income benefits" : plan.type === "child" ? "parents planning for their children's future needs" : plan.type === "pension" ? "those planning for retirement income" : "eligible individuals"}. Use our Premium Calculator to compare costs.`,
  });
  items.push({
    q: `What are the tax benefits of ${plan.name}?`,
    a: `Premiums paid qualify for deduction under Section 80C (up to Rs.1.5 lakh/year). Maturity proceeds are exempt under Section 10(10D) if the premium is less than 10% of SA (or 20% for policies before 01-Apr-2012).`,
  });
  if (plan.deathBenefit) {
    items.push({
      q: `What is the death benefit in ${plan.name}?`,
      a: plan.deathBenefit,
    });
  }
  return items;
}

function buildJsonLd(plan, faqItems) {
  const url = `${SITE_URL}/plans/${plan.slug}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `LIC ${plan.name} (Plan ${plan.tableNo})`,
      description: plan.description,
      brand: { "@type": "Organization", name: "Life Insurance Corporation of India" },
      category: "Life Insurance",
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "LIC Plans", item: `${SITE_URL}/plans` },
        { "@type": "ListItem", position: 3, name: plan.name, item: url },
      ],
    },
  ];
  return schemas;
}

export default function PlanDetailPage() {
  const { slug } = useParams();
  const plan = getPlanBySlug(slug);

  useEffect(() => {
    if (plan) trackEvent('plan:view', { plan: plan.name, tableNo: plan.tableNo });
  }, [plan]);

  useEffect(() => {
    if (!plan) return;
    const title = `LIC ${plan.name} Plan ${plan.tableNo} — Details, Benefits, Premium | DoAide InsureKit`;
    const desc = `Complete details of LIC ${plan.name} (Table ${plan.tableNo}). Entry age ${plan.minAge}-${plan.maxAge}, term ${plan.minTerm}-${plan.maxTerm} years. Features, benefits, bonus rates, eligibility & premium calculator.`;
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

    const canonicalUrl = `${SITE_URL}/plans/${plan.slug}`;
    setMeta("name", "description", desc);
    setMeta("name", "keywords", `LIC ${plan.name}, Plan ${plan.tableNo}, LIC plan details, ${plan.name} premium, ${plan.name} maturity, ${plan.name} benefits`);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "DoAide InsureKit");
    setMeta("property", "og:locale", "en_IN");
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", desc);

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const faqItems = buildFAQ(plan);
    const schemas = buildJsonLd(plan, faqItems);
    document.querySelectorAll("script[data-seo-ld]").forEach((el) => el.remove());
    schemas.forEach((schema, i) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-ld", String(i));
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [plan, slug]);

  if (!plan) {
    return (
      <div className="animate-fade-up text-center py-20">
        <h1 className="text-2xl font-bold text-white mb-4">Plan Not Found</h1>
        <p className="text-white/50 mb-6">The plan "{slug}" doesn't exist in our database.</p>
        <Link to="/plans" className="btn-primary no-underline">Browse All Plans</Link>
      </div>
    );
  }

  const bonusData = BONUS_HISTORY.find(
    (b) => b.planId === plan.id || b.tableNo === plan.tableNo
  );
  const faqItems = buildFAQ(plan);
  const related = getRelatedPlans(plan, 4);
  const shareText = `LIC ${plan.name} (Plan ${plan.tableNo})\n${plan.description}\n\nCheck details & calculate premium:\n${SITE_URL}/plans/${plan.slug}`;

  return (
    <div className="animate-fade-up">
      {/* Hero Section */}
      <div className="panel p-6 sm:p-8 mb-6">
        <div className="flex flex-wrap items-start gap-3 mb-4">
          <TypeBadge type={plan.type} />
          {plan.tableNo > 0 && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/60">
              Table No. {plan.tableNo}
            </span>
          )}
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-signal/15 text-signal">
            NO SIGNUP NEEDED
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          LIC {plan.name}
        </h1>
        <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-2xl">
          {plan.description}
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            to="/premium-calculator"
            className="btn-primary no-underline text-sm"
          >
            Calculate Premium
          </Link>
          {plan.type !== "term" && plan.type !== "govt" && plan.type !== "ulip" && (
            <Link
              to="/maturity-calculator"
              className="btn-secondary no-underline text-sm"
            >
              Estimate Maturity
            </Link>
          )}
          <Link
            to="/compare-plans"
            className="btn-secondary no-underline text-sm"
          >
            Compare Plans
          </Link>
        </div>
      </div>

      {/* Quick Facts */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3">Quick Facts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <StatBox label="Entry Age" value={`${plan.minAge} - ${plan.maxAge} yrs`} />
          {plan.minTerm > 0 && (
            <StatBox label="Policy Term" value={plan.minTerm === plan.maxTerm ? `${plan.minTerm} yrs` : `${plan.minTerm} - ${plan.maxTerm} yrs`} />
          )}
          <StatBox label="Min Sum Assured" value={`Rs.${fmt(plan.minSA)}`} />
          <StatBox label="Max Sum Assured" value={plan.maxSA ? `Rs.${fmt(plan.maxSA)}` : "No limit"} />
          <StatBox label="Premium Type" value={plan.ppt === "single" ? "Single Premium" : plan.ppt === "limited" ? "Limited Pay" : "Regular Pay"} />
          {(plan.srbRate > 0 || plan.srbByTerm) && (
            <StatBox label="Bonus (SRB)" value={`Rs.${plan.srbRate || Object.values(plan.srbByTerm)[0]}/1000 SA`} accent />
          )}
          {plan.guaranteedAdditions && (
            <StatBox label="Guaranteed Additions" value={`Rs.${plan.guaranteedAdditions}/1000 SA/yr`} accent />
          )}
          {plan.fixedPremium && (
            <StatBox label="Annual Premium" value={`Rs.${fmt(plan.fixedPremium)}`} accent />
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3">Benefits & Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Key Features */}
          <div className="panel p-5">
            <h3 className="text-sm font-semibold text-signal mb-3">Key Features</h3>
            <ul className="space-y-2">
              {plan.features.map((f, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/70">
                  <span className="text-signal shrink-0 mt-0.5">+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Summary */}
          <div className="panel p-5">
            <h3 className="text-sm font-semibold text-signal mb-3">Benefits</h3>
            <div className="space-y-3 text-sm">
              {plan.deathBenefit && (
                <div>
                  <div className="text-white/40 text-xs uppercase mb-1">Death Benefit</div>
                  <div className="text-white/70">{plan.deathBenefit}</div>
                </div>
              )}
              {plan.maturityNote && (
                <div>
                  <div className="text-white/40 text-xs uppercase mb-1">Maturity Benefit</div>
                  <div className="text-white/70">{plan.maturityNote}</div>
                </div>
              )}
              {plan.survivalBenefits && (
                <div>
                  <div className="text-white/40 text-xs uppercase mb-1">Survival Benefits</div>
                  <div className="text-white/70">
                    {plan.survivalBenefits.map((sb) => `${sb.percent}% SA at year ${sb.year}`).join(", ")}
                  </div>
                </div>
              )}
              {plan.survivalBenefitPercent && (
                <div>
                  <div className="text-white/40 text-xs uppercase mb-1">Survival Benefit</div>
                  <div className="text-white/70">{plan.survivalBenefitPercent}% of SA paid annually after PPT ends</div>
                </div>
              )}
              <div>
                <div className="text-white/40 text-xs uppercase mb-1">Tax Benefits</div>
                <div className="text-white/70">
                  Premium: Section 80C deduction (up to Rs.1.5L/yr).
                  {plan.type !== "ulip" && " Maturity: Exempt under 10(10D) if premium {'<'} 10% of SA."}
                </div>
              </div>
              {plan.isROP && (
                <div>
                  <div className="text-white/40 text-xs uppercase mb-1">Return of Premium</div>
                  <div className="text-white/70">All premiums returned on survival (excluding GST)</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Paying Options */}
      {plan.pptOptions && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3">Premium Paying Terms</h2>
          <div className="panel p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 text-xs uppercase">
                    <th className="text-left py-2 pr-4">Policy Term</th>
                    <th className="text-left py-2">Premium Paying Term</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(plan.pptOptions).map(([term, ppt]) => (
                    <tr key={term} className="border-t border-white/5">
                      <td className="py-2 pr-4 text-white/70">{term} years</td>
                      <td className="py-2 text-white/70">
                        {Array.isArray(ppt) ? ppt.join(", ") + " years" : ppt + " years"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Bonus History */}
      {bonusData && bonusData.history.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3">Historical Bonus Rates (SRB)</h2>
          <div className="panel p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 text-xs uppercase">
                    <th className="text-left py-2 pr-4">Year</th>
                    <th className="text-right py-2">SRB (Rs. per 1000 SA)</th>
                  </tr>
                </thead>
                <tbody>
                  {bonusData.history.map((row) => (
                    <tr key={row.year} className="border-t border-white/5">
                      <td className="py-2 pr-4 text-white/70">{row.year}</td>
                      <td className="py-2 text-right text-signal font-semibold">Rs.{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/30 mt-3">
              Bonus rates are declared annually by LIC and may vary. Past rates don't guarantee future rates.
            </p>
          </div>
        </section>
      )}

      {/* Eligibility */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3">Eligibility Criteria</h2>
        <div className="panel p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-white/40 text-xs uppercase mb-1">Minimum Entry Age</div>
              <div className="text-white/70">{plan.minAge} years (last birthday)</div>
            </div>
            <div>
              <div className="text-white/40 text-xs uppercase mb-1">Maximum Entry Age</div>
              <div className="text-white/70">{plan.maxAge} years (last birthday)</div>
            </div>
            {plan.minTerm > 0 && (
              <>
                <div>
                  <div className="text-white/40 text-xs uppercase mb-1">Minimum Term</div>
                  <div className="text-white/70">{plan.minTerm} years</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase mb-1">Maximum Term</div>
                  <div className="text-white/70">{plan.maxTerm} years</div>
                </div>
              </>
            )}
            <div>
              <div className="text-white/40 text-xs uppercase mb-1">Minimum Sum Assured</div>
              <div className="text-white/70">Rs.{fmt(plan.minSA)}</div>
            </div>
            <div>
              <div className="text-white/40 text-xs uppercase mb-1">Maximum Sum Assured</div>
              <div className="text-white/70">{plan.maxSA ? `Rs.${fmt(plan.maxSA)}` : "No upper limit"}</div>
            </div>
            <div>
              <div className="text-white/40 text-xs uppercase mb-1">Premium Payment</div>
              <div className="text-white/70">
                {plan.ppt === "single" ? "Single premium" : plan.ppt === "limited" ? "Limited premium paying term" : "Throughout the policy term"}
              </div>
            </div>
            <div>
              <div className="text-white/40 text-xs uppercase mb-1">Premium Modes</div>
              <div className="text-white/70">
                {plan.ppt === "single" ? "Lump sum" : "Yearly, Half-yearly, Quarterly, Monthly (ECS/SSS)"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusions */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3">Key Exclusions</h2>
        <div className="panel p-5">
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex gap-2">
              <span className="text-bad shrink-0">-</span>
              <span>Suicide within 12 months of policy commencement: only 80% of premiums paid (excl. taxes) or surrender value (whichever is higher) is payable.</span>
            </li>
            {plan.type === "term" && (
              <li className="flex gap-2">
                <span className="text-bad shrink-0">-</span>
                <span>No maturity benefit payable. Policy expires at end of term with no payout if the life assured survives.</span>
              </li>
            )}
            <li className="flex gap-2">
              <span className="text-bad shrink-0">-</span>
              <span>Policy lapses if premiums are not paid within the grace period (30 days for yearly/half-yearly, 15 days for quarterly/monthly).</span>
            </li>
            {!plan.fixedPremium && plan.type !== "ulip" && (
              <li className="flex gap-2">
                <span className="text-bad shrink-0">-</span>
                <span>Surrender value is available only after 3 full years of premium payment. Before that, no benefit is payable on surrender.</span>
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* Related Plans */}
      {related.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3">Similar Plans</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((rp) => (
              <Link
                key={rp.id}
                to={`/plans/${rp.slug}`}
                className="panel p-4 hover:border-signal/30 transition-all group no-underline"
              >
                <div className="flex items-center gap-2 mb-1">
                  <TypeBadge type={rp.type} />
                  {rp.tableNo > 0 && (
                    <span className="text-xs text-white/30">Table {rp.tableNo}</span>
                  )}
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-signal transition-colors">
                  {rp.name}
                </div>
                <div className="text-xs text-white/35 mt-1 line-clamp-2">
                  {rp.description}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Share & Print */}
      <div className="flex flex-wrap gap-3 mb-8 print:hidden">
        <ShareButtons text={shareText} />
        <PrintButton />
      </div>

      {/* FAQ */}
      <FAQ items={faqItems} />

      {/* Bottom CTA */}
      <div className="panel p-6 text-center mb-8">
        <p className="text-white/50 text-sm mb-4">
          Want to know the exact premium for {plan.name}?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/premium-calculator" className="btn-primary no-underline text-sm">
            Calculate Premium Now
          </Link>
          <Link to="/plans" className="btn-secondary no-underline text-sm">
            Browse All Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
