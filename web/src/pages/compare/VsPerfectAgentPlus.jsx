import { useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../../components/FAQ";
import WhatsAppShare from "../../components/WhatsAppShare";

const SITE_URL = "https://insure.doaide.com";

const FEATURES = [
  { feature: "Premium Calculator", insurekit: true, competitor: true },
  { feature: "Maturity Calculator", insurekit: true, competitor: true },
  { feature: "Surrender Value Calculator", insurekit: true, competitor: true },
  { feature: "Loan Against Policy", insurekit: true, competitor: false },
  { feature: "Revival Calculator", insurekit: true, competitor: false },
  { feature: "Commission Calculator", insurekit: true, competitor: true },
  { feature: "Plan Comparison", insurekit: true, competitor: true },
  { feature: "Plan Recommender (AI-based)", insurekit: true, competitor: false },
  { feature: "Claim Estimator", insurekit: true, competitor: false },
  { feature: "FD/RD vs Insurance Calculator", insurekit: true, competitor: false },
  { feature: "Retirement Planning Calculator", insurekit: true, competitor: false },
  { feature: "Child Education Plan Calculator", insurekit: true, competitor: false },
  { feature: "ULIP vs Mutual Fund Calculator", insurekit: true, competitor: false },
  { feature: "Commission Tracker on Dashboard", insurekit: true, competitor: false },
  { feature: "Tax Benefit Calculator", insurekit: true, competitor: false },
  { feature: "Bonus History (10 years)", insurekit: true, competitor: false },
  { feature: "Policy Tracker", insurekit: true, competitor: true },
  { feature: "Client Birthday Reminders", insurekit: true, competitor: true },
  { feature: "Marketing Templates", insurekit: true, competitor: true },
  { feature: "Receipt Generator", insurekit: true, competitor: false },
  { feature: "Premium Calendar", insurekit: true, competitor: false },
  { feature: "Individual Plan Detail Pages", insurekit: true, competitor: false },
  { feature: "Cloud Sync (Google SSO)", insurekit: true, competitor: true },
  { feature: "100% Free (No Subscription)", insurekit: true, competitor: false },
  { feature: "Works Without Login", insurekit: true, competitor: false },
  { feature: "Works Offline (PWA)", insurekit: true, competitor: false },
  { feature: "Privacy (Data on Device)", insurekit: true, competitor: false },
  { feature: "WhatsApp Sharing", insurekit: true, competitor: true },
];

const FAQ_ITEMS = [
  {
    q: "How is InsureKit different from Perfect Agent Plus?",
    a: "InsureKit is 100% free with no registration, has more calculators (loan, revival, claim, tax, retirement, child education, ULIP vs mutual fund), a plan recommender, detailed plan pages, and works offline. Perfect Agent Plus requires a subscription for some features.",
  },
  {
    q: "Is InsureKit as accurate as Perfect Agent Plus?",
    a: "Both use LIC's published premium rates. InsureKit's calculations are based on the same data. Always verify with LIC for final decisions.",
  },
  {
    q: "Can I switch from Perfect Agent Plus to InsureKit?",
    a: "Yes, InsureKit requires no migration. Just visit insure.doaide.com and start using it. You can manually add your client data to the Policy Tracker, or bulk-import it from the Portfolio Import page.",
  },
  {
    q: "What does Perfect Agent Plus cost compared to InsureKit?",
    a: "Perfect Agent Plus runs a freemium model where presentations and advanced features need a yearly subscription. InsureKit has no paid tier at all — every tool, including presentations and the commission tracker, is free.",
  },
  {
    q: "Does InsureKit work on both mobile and desktop?",
    a: "Yes. InsureKit is a web app, so it runs in any browser on any device, and can be installed to the home screen like a native app. There is nothing to download from an app store.",
  },
  {
    q: "Is my client data safe on InsureKit?",
    a: "Your data stays in your browser's local storage by default — it is never uploaded unless you sign in to enable cross-device sync. You can use every calculator without creating an account.",
  },
];

const SWITCH_STEPS = [
  { step: "1", title: "Open insure.doaide.com", desc: "No download, no signup. Works in any browser and installs to your home screen." },
  { step: "2", title: "Import your book", desc: "Use Portfolio Import to bulk-add policies, or add them one by one in the Policy Tracker." },
  { step: "3", title: "Check the dashboard", desc: "Renewals, birthdays, commission estimate and club progress appear automatically." },
];

export default function VsPerfectAgentPlus() {
  useEffect(() => {
    const title = "InsureKit vs Perfect Agent Plus — Feature Comparison 2026 | DoAide";
    const desc = "Compare DoAide InsureKit with Perfect Agent Plus. Free vs paid, feature-by-feature comparison for LIC agents. See which tool offers more value.";
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
    setMeta("name", "keywords", "InsureKit vs Perfect Agent Plus, LIC agent tools comparison, best LIC agent app free, Perfect Agent Plus alternative");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", `${SITE_URL}/compare/perfect-agent-plus`);

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}/compare/perfect-agent-plus`);
  }, []);

  const ikCount = FEATURES.filter((f) => f.insurekit).length;
  const compCount = FEATURES.filter((f) => f.competitor).length;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
        InsureKit vs Perfect Agent Plus
      </h1>
      <p className="text-white/40 text-sm mb-8">
        Feature-by-feature comparison. See why thousands of LIC agents are switching to InsureKit.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="panel p-5 text-center">
          <div className="text-signal text-3xl font-bold">{ikCount}</div>
          <div className="text-xs text-white/40 mt-1">InsureKit Features</div>
          <div className="text-[10px] text-signal/60 mt-0.5">FREE Forever</div>
        </div>
        <div className="panel p-5 text-center">
          <div className="text-white/50 text-3xl font-bold">{compCount}</div>
          <div className="text-xs text-white/40 mt-1">Perfect Agent Plus</div>
          <div className="text-[10px] text-white/30 mt-0.5">Freemium / Paid</div>
        </div>
      </div>

      <div className="panel overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/50 text-xs uppercase">Feature</th>
                <th className="text-center py-3 px-3 text-signal text-xs uppercase">InsureKit</th>
                <th className="text-center py-3 px-3 text-white/40 text-xs uppercase">Perfect Agent+</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f) => (
                <tr key={f.feature} className="border-t border-white/5">
                  <td className="py-2.5 px-4 text-white/70 text-sm">{f.feature}</td>
                  <td className="py-2.5 px-3 text-center">
                    {f.insurekit ? <span className="text-good text-lg">&#10003;</span> : <span className="text-white/20 text-lg">&#10007;</span>}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {f.competitor ? <span className="text-good text-lg">&#10003;</span> : <span className="text-white/20 text-lg">&#10007;</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="panel p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">The InsureKit Advantage</h2>
        <div className="space-y-3 text-sm text-white/70">
          <p>
            While Perfect Agent Plus is a solid tool, InsureKit goes further with revival, loan, claim, and tax calculators,
            a plan recommender, 10-year bonus history data, and detailed pages for every LIC plan.
          </p>
          <p>
            The biggest difference: InsureKit is completely free with no registration. Your data stays on your device,
            nothing is uploaded to any server, and every tool works offline. No subscription fees, no ads, ever.
          </p>
        </div>
      </section>

      <section className="panel p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">Switching Takes Three Steps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SWITCH_STEPS.map((s) => (
            <div key={s.step} className="panel-inner p-4">
              <div className="text-signal text-2xl font-bold mb-2">{s.step}</div>
              <div className="text-sm font-medium text-white mb-1">{s.title}</div>
              <div className="text-xs text-white/50">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">Where Each Tool Wins</h2>
        <div className="space-y-3 text-sm text-white/70">
          <p>
            <span className="text-white font-medium">Choose Perfect Agent Plus if</span> you want a packaged
            mobile app with phone support and are comfortable paying a yearly subscription for presentation
            features.
          </p>
          <p>
            <span className="text-signal font-medium">Choose InsureKit if</span> you want every tool free —
            including the calculators paid apps lock away: retirement and child education planning,
            ULIP vs mutual fund comparisons, revival and loan quotes, and a dashboard that estimates your
            commission and club progress from your tracked book. Your data stays on your device, and
            everything works offline.
          </p>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />

      <div className="flex flex-wrap gap-3 mb-8">
        <WhatsAppShare text={"InsureKit vs Perfect Agent Plus — free LIC calculator with 24+ features, no signup needed\n\ninsure.doaide.com/compare/perfect-agent-plus"} />
      </div>

      <div className="panel p-6 text-center mb-8">
        <p className="text-white/50 text-sm mb-4">Try InsureKit free — no signup needed</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary no-underline text-sm">Explore All Tools</Link>
          <Link to="/premium-calculator" className="btn-secondary no-underline text-sm">Premium Calculator</Link>
        </div>
      </div>
    </div>
  );
}
