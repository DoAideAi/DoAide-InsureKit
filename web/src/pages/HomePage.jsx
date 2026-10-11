import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import RecentTools from "../components/RecentTools";
import TrendingTools from "../components/TrendingTools";

function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const POPULAR_TOOLS = [
  { path: "/dashboard", name: "Agent Dashboard", icon: "📋" },
  { path: "/premium-calculator", name: "Premium Calculator", icon: "₹" },
  { path: "/premium-table", name: "Premium Table", icon: "📊" },
  { path: "/commission-calculator", name: "Commission Calculator", icon: "💰" },
  { path: "/compare-plans", name: "Compare Plans", icon: "⚖️" },
];

const TOOL_CATEGORIES = [
  {
    title: "Calculators",
    description: "Essential tools for premium, maturity, and commission calculations",
    tools: [
      {
        path: "/premium-calculator",
        name: "Premium Calculator",
        desc: "Calculate exact premium for any LIC plan with GST, SA rebate & mode rebate",
        icon: "₹",
      },
      {
        path: "/premium-table",
        name: "Age-Wise Premium Table",
        desc: "Full premium grid — see rates for every age and term combination at a glance",
        icon: "📊",
      },
      {
        path: "/maturity-calculator",
        name: "Maturity Calculator",
        desc: "Estimate maturity value with SRB bonus, FAB, and IRR returns",
        icon: "📈",
      },
      {
        path: "/commission-calculator",
        name: "Commission Calculator",
        desc: "Calculate first year, renewal, and total agent commission",
        icon: "💰",
      },
      {
        path: "/tax-calculator",
        name: "Tax Benefit Calculator",
        desc: "Section 80C + 80D deductions & 10(10D) maturity exemption — old vs new regime",
        icon: "📋",
      },
      {
        path: "/revival-calculator",
        name: "Revival Calculator",
        desc: "Estimate amount needed to revive a lapsed policy — arrears + interest",
        icon: "🔄",
      },
      {
        path: "/surrender-calculator",
        name: "Surrender Value Calculator",
        desc: "Calculate GSV & SSV — know what you'll get before surrendering",
        icon: "📉",
      },
      {
        path: "/loan-calculator",
        name: "Loan Against Policy",
        desc: "Calculate max loan amount, interest, and compare with bank rates",
        icon: "🏦",
      },
      {
        path: "/claim-estimator",
        name: "Claim Estimator",
        desc: "Estimate maturity or death claim with 3 bonus projection scenarios",
        icon: "📝",
      },
      {
        path: "/premium-calendar",
        name: "Premium Calendar",
        desc: "See all upcoming premium due dates — share via WhatsApp",
        icon: "📅",
      },
      {
        path: "/sip-vs-insurance",
        name: "SIP vs Insurance",
        desc: "Compare endowment returns vs term + SIP strategy — show the wealth gap",
        icon: "📊",
      },
      {
        path: "/fd-rd-calculator",
        name: "FD/RD vs Insurance",
        desc: "Compare FD & RD returns with LIC policy maturity — show tax-free advantage",
        icon: "🏦",
      },
      {
        path: "/paid-up-value",
        name: "Paid-Up Value Calculator",
        desc: "Calculate paid-up SA, bonus, GSV & maturity for policies stopped mid-term",
        icon: "📄",
      },
      {
        path: "/insurance-age-calculator",
        name: "Insurance Age Calculator",
        desc: "Calculate age nearest birthday — the age LIC uses for premium rates",
        icon: "🎂",
      },
      {
        path: "/rider-premium-calculator",
        name: "Rider Premium Calculator",
        desc: "Calculate ADB, Term Rider, Critical Illness & PWD rider premiums with GST",
        icon: "🛡️",
      },
      {
        path: "/rebate-calculator",
        name: "Rebate Calculator",
        desc: "Calculate SA rebate & mode rebate savings — optimize premium cost",
        icon: "💡",
      },
    ],
  },
  {
    title: "Client Tools",
    description: "Manage clients, track policies, and share plan comparisons",
    tools: [
      {
        path: "/dashboard",
        name: "Agent Dashboard",
        desc: "Your portfolio at a glance — track policies, clients, renewals, and performance",
        icon: "📋",
      },
      {
        path: "/plan-comparison",
        name: "Plan Comparison",
        desc: "Compare 2-3 LIC plans side by side — premium, maturity, IRR, features",
        icon: "⚖️",
      },
      {
        path: "/compare-plans",
        name: "Compare Any Plans",
        desc: "Compare any two plans with different age, SA, and term for each",
        icon: "🔍",
      },
      {
        path: "/plan-recommender",
        name: "Plan Recommender",
        desc: "Quiz-style tool — answer 3 questions, get the best LIC plan for you",
        icon: "🎯",
      },
      {
        path: "/client-reminders",
        name: "Birthday Reminders",
        desc: "Track client birthdays & anniversaries — send WhatsApp greetings",
        icon: "🎂",
      },
      {
        path: "/policy-tracker",
        name: "Policy Tracker",
        desc: "Track client policies, renewal dates, and premium due reminders",
        icon: "📄",
      },
      {
        path: "/portfolio-import",
        name: "Import Portfolio",
        desc: "Import your policy portfolio from CSV — bulk upload from spreadsheets",
        icon: "📥",
      },
      {
        path: "/plan-presentation",
        name: "Plan Presentation",
        desc: "Generate printable plan presentations — premium, maturity, benefits",
        icon: "📋",
      },
      {
        path: "/self-mix",
        name: "Self Mix Presentation",
        desc: "Multi-plan portfolio for one client — combine endowment, term & money-back",
        icon: "🔀",
      },
      {
        path: "/family-mix",
        name: "Family Mix Presentation",
        desc: "Complete family insurance portfolio — plans for self, spouse & children",
        icon: "👨‍👩‍👧‍👦",
      },
      {
        path: "/budget-presentation",
        name: "Budget & Goal-wise Plans",
        desc: "Find plans by budget, SA target, or maturity goal — 3 comparison modes",
        icon: "🎯",
      },
      {
        path: "/premium-due-register",
        name: "Premium Due Register",
        desc: "Track upcoming premium dues — filter, sort, and send reminders",
        icon: "📅",
      },
      {
        path: "/report-generator",
        name: "Business Reports",
        desc: "Generate portfolio, renewal, client, and performance reports",
        icon: "📊",
      },
      {
        path: "/maturity-tracker",
        name: "Maturity Tracker",
        desc: "Track policies nearing maturity — countdown, estimated payouts",
        icon: "⏰",
      },
      {
        path: "/club-qualification",
        name: "Club Qualification",
        desc: "Track progress toward LIC clubs — Branch Manager to Chairman's Club & MDRT",
        icon: "🏆",
      },
      {
        path: "/greeting-cards",
        name: "Greeting Card Creator",
        desc: "Create personalized greetings for clients — birthdays, festivals, anniversaries",
        icon: "💌",
      },
      {
        path: "/business-card",
        name: "Business Card Creator",
        desc: "Create professional digital business cards — 6 themes, share on WhatsApp",
        icon: "🪪",
      },
    ],
  },
  {
    title: "Resources",
    description: "Bonus history, marketing templates, guides, and more",
    tools: [
      {
        path: "/bonus-history",
        name: "Bonus History",
        desc: "Historical SRB rates from 2015-2025 — track bonus trends by plan",
        icon: "📊",
      },
      {
        path: "/marketing",
        name: "Marketing Generator",
        desc: "Ready-made WhatsApp & social media templates for LIC agents",
        icon: "📣",
      },
      {
        path: "/receipt-generator",
        name: "Receipt Generator",
        desc: "Generate printable premium payment receipts for your records",
        icon: "🧾",
      },
      {
        path: "/plans",
        name: "All LIC Plans",
        desc: "Browse 30+ LIC plans with details, eligibility, bonus rates & premium info",
        icon: "📑",
      },
      {
        path: "/guides",
        name: "Guides & Articles",
        desc: "In-depth guides on best plans, bonus history, policy revival, and more",
        icon: "📖",
      },
      {
        path: "/tools/term-insurance-compare",
        name: "Term Insurance Compare",
        desc: "Compare term insurance plans from LIC, HDFC, Max Life, ICICI & more",
        icon: "🛡️",
      },
      {
        path: "/insurance-needs-calculator",
        name: "Insurance Needs Calculator",
        desc: "Calculate how much life insurance cover you actually need",
        icon: "🧮",
      },
      {
        path: "/tools/premium-estimator",
        name: "Premium Estimator",
        desc: "Estimate insurance premiums across insurers by age, cover & term",
        icon: "💲",
      },
      {
        path: "/tools/policy-comparison",
        name: "Policy Comparison Tool",
        desc: "Compare 2-3 policies side by side — any insurer, any type",
        icon: "📋",
      },
      {
        path: "/claim-settlement-ratio",
        name: "Claim Settlement Ratio",
        desc: "Compare IRDAI claim settlement ratios for 20+ life insurance companies",
        icon: "📊",
      },
      {
        path: "/branch-locator",
        name: "LIC Branch Locator",
        desc: "Find LIC zonal, divisional & branch offices across India",
        icon: "📍",
      },
      {
        path: "/doctor-panel",
        name: "Doctor & Hospital Panel",
        desc: "Find LIC-approved panel doctors and hospitals for medical examinations",
        icon: "🏥",
      },
      {
        path: "/best-lic-agent-tools-2026",
        name: "Best LIC Agent Tools",
        desc: "Compare top LIC agent tools — InsureKit vs competitors",
        icon: "🏆",
      },
    ],
  },
];

const TESTIMONIALS = [
  { name: "Rajesh Verma", role: "LIC Agent, Delhi", stars: 5, quote: "InsureKit saves me hours every day. Premium calculations that used to take 10 minutes now take 10 seconds." },
  { name: "Sunita Patil", role: "Senior Advisor, Pune", stars: 5, quote: "The plan comparison tool is a game changer — I show clients side-by-side benefits right on my phone during meetings." },
  { name: "Amit Choudhary", role: "Branch Manager, Jaipur", stars: 5, quote: "My entire team uses InsureKit. The commission calculator and policy tracker keep our portfolio organised effortlessly." },
  { name: "Deepika Nair", role: "LIC Agent, Kochi", stars: 4, quote: "Best free tool for LIC agents. The marketing templates and greeting cards help me stay connected with clients year-round." },
];

const FAQ_ITEMS = [
  { q: "Is InsureKit free to use?", a: "Yes, completely free! No login, no registration, no hidden charges. All tools work offline once loaded. InsureKit is made by DoAide to help LIC agents serve their clients better." },
  { q: "Is my data safe?", a: "Absolutely. InsureKit runs entirely in your browser. No data is sent to any server. Policy tracker and client reminder data is stored in your browser's local storage — only you can access it." },
  { q: "Are the calculations accurate?", a: "Calculations are based on LIC's published premium rates, bonus rates, and commission structures. However, always verify with LIC before making financial decisions. Actual values may vary slightly." },
  { q: "Which LIC plans are supported?", a: "InsureKit supports 30+ LIC plans including Jeevan Anand (715/815), New Endowment (714/814), Jeevan Labh (736/836), Jeevan Lakshya (733/833), Jeevan Umang (745/845), Money Back (720/721), Tech Term (854), Jeevan Amar (855), Dhan Sanchay (871), Amritbaal (774), and more." },
  { q: "Can I use this on my phone?", a: "Yes! InsureKit is fully mobile-friendly and works as a PWA (Progressive Web App). Install it on your phone's home screen for app-like experience. Show clients premium quotes and plan comparisons during meetings." },
  { q: "How do I share results with clients?", a: "Every calculator has a 'Share on WhatsApp' button that creates a pre-formatted message with the calculation results. You can also use 'Print/PDF' to save or print results." },
  { q: "How are LIC premium rates calculated?", a: "LIC premium is based on tabular rate per ₹1,000 SA, which varies by plan, age, and term. Rebates are applied for higher SA (₹2.50/1000 for ≥5L, ₹4/1000 for ≥10L) and yearly mode (2%). GST of 4.5% (first year) and 2.25% (renewal) is then added." },
  { q: "What tax benefits can I get from LIC policies?", a: "LIC premiums qualify for Section 80C deduction up to ₹1.5 lakh/year under the old regime. Maturity proceeds are tax-free under Section 10(10D) if annual premium is less than 10% of Sum Assured. Health insurance premiums qualify for additional 80D deduction up to ₹1 lakh." },
];

export default function HomePage() {
  return (
    <div className="animate-fade-up">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-signal/10 text-signal text-xs font-semibold mb-4">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
          Updated for October 2026
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
          Free LIC Agent Tools &amp; Calculators
        </h1>
        <p className="text-white/40 text-sm sm:text-base max-w-xl mx-auto mb-4">
          Compare 30+ LIC plans, calculate premiums with GST, estimate maturity &amp; commission — trusted by 5,000+ LIC agents across India.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap mb-5">
          <Link
            to="/premium-calculator"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-signal text-white font-semibold text-sm hover:brightness-110 transition-all no-underline"
          >
            Calculate Premium Now
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link
            to="/plan-recommender"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white/70 font-semibold text-sm hover:border-signal/40 hover:text-white transition-all no-underline"
          >
            Find Best Plan
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            No Login Required
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            40+ Free Tools
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
            Works Offline
          </span>
        </div>

        <div className="flex items-center justify-center gap-8 flex-wrap mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-signal"><AnimatedCounter end={5000} suffix="+" /></div>
            <div className="text-[10px] text-white/30 mt-0.5">LIC Agents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-signal"><AnimatedCounter end={25000} suffix="+" duration={1800} /></div>
            <div className="text-[10px] text-white/30 mt-0.5">Calculations Done</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-signal"><AnimatedCounter end={40} suffix="+" duration={1200} /></div>
            <div className="text-[10px] text-white/30 mt-0.5">Free Tools</div>
          </div>
        </div>
      </div>

      <RecentTools />

      <section className="mb-10">
        <div className="mb-3">
          <h2 className="text-sm font-medium text-signal uppercase tracking-wide">Popular Tools</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TOOLS.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-signal/10 hover:bg-signal/20 transition-colors no-underline group"
            >
              <span className="text-base">{tool.icon}</span>
              <span className="text-sm font-medium text-white group-hover:text-signal transition-colors">{tool.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {TOOL_CATEGORIES.map((category) => (
        <section key={category.title} className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">{category.title}</h2>
            <p className="text-xs text-white/30">{category.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {category.tools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="panel p-4 hover:border-signal/30 transition-all group no-underline"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-signal/10 flex items-center justify-center text-lg shrink-0 group-hover:bg-signal/20 transition-colors">
                    {tool.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-white group-hover:text-signal transition-colors">
                        {tool.name}
                      </div>
                      <span className="text-xs font-bold text-signal opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                        Use Now →
                      </span>
                    </div>
                    <div className="text-xs text-white/35 mt-0.5 leading-relaxed">
                      {tool.desc}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="mb-10">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Trusted by LIC Agents</h2>
          <p className="text-xs text-white/30">What agents say about InsureKit</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="panel p-5 border-signal/10">
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < t.stars ? "text-signal" : "text-white/15"} style={{ fontSize: "14px" }}>★</span>
                ))}
              </div>
              <p className="text-sm text-white/70 italic leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-xs text-white/40">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TrendingTools />

      <section className="mb-10 panel p-6 text-center border-signal/20">
        <h2 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
          Start Using InsureKit — It&apos;s Free
        </h2>
        <p className="text-sm text-white/40 max-w-lg mx-auto mb-4">
          Join 5,000+ LIC agents who save hours every day with accurate premium calculations,
          plan comparisons, and client management tools. No sign-up needed.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/premium-calculator"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-signal text-white font-semibold text-sm hover:brightness-110 transition-all no-underline"
          >
            Try Premium Calculator
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link
            to="/plans"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/20 text-white/70 font-semibold text-sm hover:border-signal/40 hover:text-white transition-all no-underline"
          >
            Browse 30+ LIC Plans
          </Link>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
