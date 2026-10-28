import { useState, useMemo, useEffect } from "react";
import { formatINR, formatLakh } from "../utils/format";
import ResultCard from "../components/ResultCard";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import ShareButtons from "../components/ShareButtons";
import { trackCalculation } from "../lib/analytics";

const CLUBS = [
  {
    id: "branch_manager",
    name: "Branch Manager Club",
    criteria: { minPolicies: 12, minFirstYearPremium: 200000, minLives: 8 },
    benefits: "Conference trip, certificate, cash incentive",
    color: "text-amber-400",
  },
  {
    id: "divisional_manager",
    name: "Divisional Manager Club",
    criteria: { minPolicies: 24, minFirstYearPremium: 500000, minLives: 16 },
    benefits: "Domestic tour, trophy, higher incentive",
    color: "text-gray-300",
  },
  {
    id: "zonal_manager",
    name: "Zonal Manager Club",
    criteria: { minPolicies: 40, minFirstYearPremium: 1000000, minLives: 25 },
    benefits: "International tour, gold medal, top-tier incentive",
    color: "text-yellow-300",
  },
  {
    id: "chairman",
    name: "Chairman's Club",
    criteria: { minPolicies: 70, minFirstYearPremium: 2000000, minLives: 45 },
    benefits: "International tour (premium destination), diamond pin, highest incentive",
    color: "text-cyan-300",
  },
  {
    id: "mdrt",
    name: "MDRT Qualifier",
    criteria: { minPolicies: 0, minFirstYearPremium: 3500000, minLives: 0 },
    benefits: "Million Dollar Round Table membership — global recognition",
    color: "text-purple-400",
  },
];

const HOW_IT_WORKS = [
  { title: "Enter progress", desc: "Add your current policies, premium, and lives count" },
  { title: "Track each club", desc: "See progress bars for every club qualification" },
  { title: "Plan your target", desc: "Know exactly how much more you need to qualify" },
];

const FAQ_ITEMS = [
  { q: "What are LIC Club qualifications?", a: "LIC rewards top-performing agents with club memberships at 4 levels — Branch Manager, Divisional Manager, Zonal Manager, and Chairman's Club. Each has minimum targets for policies, first-year premium, and lives covered." },
  { q: "What is MDRT?", a: "Million Dollar Round Table is an international recognition for life insurance agents. It requires a minimum first-year commission/premium threshold (approximately ₹35 lakh FYP for Indian agents). MDRT membership is a prestigious global credential." },
  { q: "When is the qualification period?", a: "Club qualifications typically run from April to March (LIC's financial year). MDRT follows the calendar year (January to December). Check your division for exact dates." },
  { q: "Can I qualify for multiple clubs?", a: "Yes! If you meet Chairman's Club criteria, you automatically qualify for all lower clubs too. Many top agents target Chairman's Club directly." },
  { q: "What counts as first-year premium?", a: "First-year premium (FYP) is the premium collected in the first policy year. It includes regular and single premium policies. Renewal premiums don't count for club qualification." },
];

function ProgressBar({ current, target, label }) {
  const pct = target > 0 ? Math.min(100, (current / target) * 100) : 0;
  const remaining = Math.max(0, target - current);
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-white/60">{label}</span>
        <span className="text-white/70">{current} / {typeof target === "number" && target >= 100000 ? formatINR(target) : target}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all ${pct >= 100 ? "bg-green-500" : pct >= 75 ? "bg-signal" : pct >= 50 ? "bg-yellow-500" : "bg-white/30"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-[10px] text-white/40 mt-0.5">
        {pct >= 100 ? "✓ Target met!" : `${remaining} more needed · ${pct.toFixed(0)}% done`}
      </div>
    </div>
  );
}

export default function ClubQualification() {
  useEffect(() => { trackCalculation('club-qualification'); }, []);
  const [policies, setPolicies] = useState(0);
  const [fyp, setFyp] = useState(0);
  const [lives, setLives] = useState(0);
  const [monthsElapsed, setMonthsElapsed] = useState(6);

  const analysis = useMemo(() => {
    return CLUBS.map((club) => {
      const c = club.criteria;
      const policyPct = c.minPolicies > 0 ? (policies / c.minPolicies) * 100 : 100;
      const fypPct = c.minFirstYearPremium > 0 ? (fyp / c.minFirstYearPremium) * 100 : 100;
      const livesPct = c.minLives > 0 ? (lives / c.minLives) * 100 : 100;
      const overallPct = Math.min(policyPct, fypPct, livesPct);
      const qualified = policyPct >= 100 && fypPct >= 100 && livesPct >= 100;

      const monthsRemaining = Math.max(0, 12 - monthsElapsed);
      const policyRate = monthsElapsed > 0 ? policies / monthsElapsed : 0;
      const fypRate = monthsElapsed > 0 ? fyp / monthsElapsed : 0;
      const projectedPolicies = Math.round(policies + policyRate * monthsRemaining);
      const projectedFYP = Math.round(fyp + fypRate * monthsRemaining);
      const onTrack = projectedPolicies >= c.minPolicies && projectedFYP >= c.minFirstYearPremium;

      return { club, policyPct, fypPct, livesPct, overallPct, qualified, projectedPolicies, projectedFYP, onTrack };
    });
  }, [policies, fyp, lives, monthsElapsed]);

  const highestQualified = analysis.filter((a) => a.qualified).pop();
  const nextTarget = analysis.find((a) => !a.qualified);

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Club Qualification Progress</h1>
      <p className="text-sm text-white/50 mb-6">
        Track your progress toward LIC club qualifications — Branch Manager to Chairman's Club and MDRT.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm text-white/60 mb-1">Policies Sold</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={policies} onChange={(e) => setPolicies(Number(e.target.value))} min={0} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">First Year Premium (₹)</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={fyp} onChange={(e) => setFyp(Number(e.target.value))} min={0} step={10000} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Lives Covered</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={lives} onChange={(e) => setLives(Number(e.target.value))} min={0} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Months Elapsed</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={monthsElapsed} onChange={(e) => setMonthsElapsed(Number(e.target.value))} min={0} max={12} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <ResultCard title="Highest Club Qualified" value={highestQualified ? highestQualified.club.name : "None yet"} />
        <ResultCard title="Next Target" value={nextTarget ? nextTarget.club.name : "All qualified!"} />
        <ResultCard title="Months Remaining" value={`${Math.max(0, 12 - monthsElapsed)} months`} />
      </div>

      <div className="space-y-4 mb-6">
        {analysis.map((a) => (
          <div key={a.club.id} className={`bg-white/5 border rounded-xl p-4 ${a.qualified ? "border-green-500/30 bg-green-500/5" : "border-white/10"}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className={`text-lg font-semibold ${a.club.color}`}>{a.club.name}</h3>
                <p className="text-xs text-white/40">{a.club.benefits}</p>
              </div>
              <div className="text-right">
                {a.qualified ? (
                  <span className="text-green-400 text-sm font-semibold">Qualified ✓</span>
                ) : (
                  <span className={`text-sm font-semibold ${a.onTrack ? "text-signal" : "text-red-400"}`}>
                    {a.onTrack ? "On Track" : "Behind Pace"}
                  </span>
                )}
              </div>
            </div>

            {a.club.criteria.minPolicies > 0 && (
              <ProgressBar current={policies} target={a.club.criteria.minPolicies} label="Policies" />
            )}
            <ProgressBar current={fyp} target={a.club.criteria.minFirstYearPremium} label="First Year Premium" />
            {a.club.criteria.minLives > 0 && (
              <ProgressBar current={lives} target={a.club.criteria.minLives} label="Lives Covered" />
            )}

            {!a.qualified && monthsElapsed > 0 && (
              <div className="mt-2 text-xs text-white/50 bg-white/5 rounded-lg p-2">
                At current pace: projected {a.projectedPolicies} policies, {formatINR(a.projectedFYP)} FYP by year end.
                {!a.onTrack && (
                  <span className="text-red-400">
                    {" "}Need to increase monthly run rate to qualify.
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {nextTarget && !nextTarget.qualified && monthsElapsed > 0 && (
        <div className="bg-signal/10 border border-signal/30 rounded-xl p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Monthly Targets for {nextTarget.club.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            {nextTarget.club.criteria.minPolicies > 0 && (
              <div>
                <div className="text-white/40 text-xs">Policies per month</div>
                <div className="text-white font-semibold">
                  {Math.max(0, 12 - monthsElapsed) > 0
                    ? Math.ceil(Math.max(0, nextTarget.club.criteria.minPolicies - policies) / Math.max(1, 12 - monthsElapsed))
                    : "—"}
                </div>
              </div>
            )}
            <div>
              <div className="text-white/40 text-xs">FYP per month</div>
              <div className="text-white font-semibold">
                {Math.max(0, 12 - monthsElapsed) > 0
                  ? formatINR(Math.ceil(Math.max(0, nextTarget.club.criteria.minFirstYearPremium - fyp) / Math.max(1, 12 - monthsElapsed)))
                  : "—"}
              </div>
            </div>
            {nextTarget.club.criteria.minLives > 0 && (
              <div>
                <div className="text-white/40 text-xs">Lives per month</div>
                <div className="text-white font-semibold">
                  {Math.max(0, 12 - monthsElapsed) > 0
                    ? Math.ceil(Math.max(0, nextTarget.club.criteria.minLives - lives) / Math.max(1, 12 - monthsElapsed))
                    : "—"}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4 mb-6">
        <ShareButtons text="Check your LIC club qualification status — free tracker on DoAide InsureKit" toolName="Club Qualification Tracker" />
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
