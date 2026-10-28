import { useState, useMemo, useEffect } from "react";
import { usePolicies } from "../hooks/usePolicies";
import { LIC_PLANS, getSRBRate } from "../data/licPlans";
import { formatINR } from "../utils/format";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import PrintButton from "../components/PrintButton";
import ShareButtons from "../components/ShareButtons";
import { trackEvent } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Add policies", desc: "Use Policy Tracker to add policies with start date and term" },
  { title: "Track maturity", desc: "See which policies mature soon with countdown" },
  { title: "Estimate payout", desc: "Get estimated maturity amount with SA + bonus" },
];

const FAQ_ITEMS = [
  { q: "How is the maturity date calculated?", a: "Maturity date = Policy start date + Policy term (years). For Money Back plans, survival benefits are paid at intervals, and the final maturity is at the end of the term." },
  { q: "How accurate is the estimated maturity amount?", a: "The estimate uses current SRB bonus rates applied for each year. Actual maturity may differ based on LIC's declared bonus rates and Final Additional Bonus (FAB)." },
  { q: "What should I do when a policy matures?", a: "Contact LIC branch with original policy bond, ID proof, cancelled cheque, and discharge form (3815). Online maturity claims can be filed via licindia.in for registered users." },
  { q: "Where does the data come from?", a: "This page reads policies from the Policy Tracker. Add policies there with start date and term to see maturity tracking here." },
  { q: "What if I don't see any policies?", a: "Add policies in the Policy Tracker with all required fields: policy number, plan name, sum assured, start date, and term." },
];

function getMaturityDate(policy) {
  if (!policy.startDate || !policy.term) return null;
  const start = new Date(policy.startDate);
  if (isNaN(start.getTime())) return null;
  return new Date(start.getFullYear() + Number(policy.term), start.getMonth(), start.getDate());
}

function estimateMaturity(policy) {
  const plan = LIC_PLANS.find(
    (p) => p.name === policy.planName || p.id === policy.planId,
  );
  const sa = Number(policy.sumAssured) || 0;
  const term = Number(policy.term) || 0;
  if (!sa || !term) return { maturityValue: sa, bonus: 0, plan };

  if (plan && plan.type === "term") return { maturityValue: 0, bonus: 0, plan, isTerm: true };

  const srbRate = plan ? getSRBRate(plan.id) : 45;
  const annualBonus = (srbRate / 1000) * sa;
  const totalBonus = annualBonus * term;
  const maturityValue = sa + totalBonus;
  return { maturityValue, bonus: totalBonus, srbRate, plan };
}

export default function PolicyMaturityTracker() {
  useEffect(() => { trackEvent('tool:view', { tool: 'policy-maturity-tracker' }); }, []);
  const { policies: rawPolicies, loading } = usePolicies();
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const policies = useMemo(() => {
    return rawPolicies
      .map((p) => {
        const maturityDate = getMaturityDate(p);
        const estimate = estimateMaturity(p);
        const now = new Date();
        const daysUntil = maturityDate
          ? Math.ceil((maturityDate - now) / (24 * 60 * 60 * 1000))
          : null;
        return { ...p, maturityDate, daysUntil, estimate };
      })
      .filter((p) => p.maturityDate && !p.estimate.isTerm);
  }, []);

  const filtered = useMemo(() => {
    let list = [...policies];
    if (filter === "matured") list = list.filter((p) => p.daysUntil <= 0);
    else if (filter === "6months") list = list.filter((p) => p.daysUntil > 0 && p.daysUntil <= 180);
    else if (filter === "1year") list = list.filter((p) => p.daysUntil > 0 && p.daysUntil <= 365);
    else if (filter === "upcoming") list = list.filter((p) => p.daysUntil > 0);

    if (sortBy === "date") list.sort((a, b) => (a.daysUntil ?? 9999) - (b.daysUntil ?? 9999));
    else if (sortBy === "amount") list.sort((a, b) => b.estimate.maturityValue - a.estimate.maturityValue);
    else if (sortBy === "name") list.sort((a, b) => (a.holderName || "").localeCompare(b.holderName || ""));
    return list;
  }, [policies, filter, sortBy]);

  const stats = useMemo(() => {
    const matured = policies.filter((p) => p.daysUntil <= 0).length;
    const within6m = policies.filter((p) => p.daysUntil > 0 && p.daysUntil <= 180).length;
    const within1y = policies.filter((p) => p.daysUntil > 0 && p.daysUntil <= 365).length;
    const totalEstimated = policies
      .filter((p) => p.daysUntil > 0)
      .reduce((s, p) => s + p.estimate.maturityValue, 0);
    return { total: policies.length, matured, within6m, within1y, totalEstimated };
  }, [policies]);

  function getUrgencyColor(days) {
    if (days <= 0) return "bg-signal/15 text-signal border-signal/30";
    if (days <= 30) return "bg-bad/10 text-bad border-bad/30";
    if (days <= 90) return "bg-warn/10 text-warn border-warn/30";
    if (days <= 180) return "bg-signal/10 text-signal/80 border-signal/20";
    return "bg-white/5 text-white/50 border-white/10";
  }

  function getUrgencyLabel(days) {
    if (days <= 0) return "Matured";
    if (days <= 7) return "This week";
    if (days <= 30) return "This month";
    if (days <= 90) return "Within 3 months";
    if (days <= 180) return "Within 6 months";
    if (days <= 365) return "Within 1 year";
    return `${Math.floor(days / 365)}y ${Math.floor((days % 365) / 30)}m`;
  }

  const shareText = filtered.length > 0
    ? `Policy Maturity Tracker\n${filtered.slice(0, 5).map((p) => `${p.holderName || "—"} - ${p.planName} - Maturity: ${p.maturityDate?.toLocaleDateString("en-IN")} (Est. ${formatINR(p.estimate.maturityValue)})`).join("\n")}\n\nTracked on DoAide InsureKit — insure.doaide.com`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Policy Maturity Tracker</h1>
      <p className="text-white/40 text-sm mb-2">
        Track policies nearing maturity — estimated payouts and countdown
      </p>
      <p className="text-white/30 text-xs mb-6 flex items-center gap-1.5">
        <span className="inline-block w-3.5 h-3.5">📋</span>
        Data from Policy Tracker. Add policies there to see them here.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      {policies.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <StatCard label="Total Policies" value={stats.total} />
            <StatCard label="Already Matured" value={stats.matured} color="text-signal" />
            <StatCard label="Within 6 Months" value={stats.within6m} color="text-warn" />
            <StatCard label="Est. Total Payout" value={formatINR(stats.totalEstimated)} small />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <select
              className="text-xs bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white/60"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Policies</option>
              <option value="matured">Already Matured</option>
              <option value="6months">Within 6 Months</option>
              <option value="1year">Within 1 Year</option>
              <option value="upcoming">All Upcoming</option>
            </select>
            <select
              className="text-xs bg-white/5 border border-white/10 rounded px-3 py-1.5 text-white/60"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="name">Sort by Name</option>
            </select>
            <div className="flex-1" />
            <PrintButton />
            <ShareButtons text={shareText} />
          </div>

          <div className="space-y-3">
            {filtered.map((p) => (
              <div
                key={p.id}
                className={`panel p-4 border-l-4 ${getUrgencyColor(p.daysUntil)}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-white">
                        {p.holderName || "—"}
                      </span>
                      <span className="text-xs text-white/30">#{p.policyNumber}</span>
                    </div>
                    <div className="text-xs text-white/40 mt-1">{p.planName}</div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
                      <span>SA: {formatINR(Number(p.sumAssured) || 0)}</span>
                      <span>Term: {p.term} yrs</span>
                      <span>Start: {p.startDate}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${getUrgencyColor(p.daysUntil)}`}>
                      {getUrgencyLabel(p.daysUntil)}
                    </span>
                    <div className="text-xs text-white/40 mt-2">
                      {p.maturityDate?.toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wide">Sum Assured</div>
                    <div className="text-sm font-medium text-white/60">{formatINR(Number(p.sumAssured) || 0)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wide">Est. Bonus</div>
                    <div className="text-sm font-medium text-white/60">{formatINR(p.estimate.bonus)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wide">Est. Maturity</div>
                    <div className="text-sm font-bold text-signal">{formatINR(p.estimate.maturityValue)}</div>
                  </div>
                </div>
                {p.daysUntil > 0 && p.daysUntil <= 90 && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-signal transition-all"
                        style={{ width: `${Math.max(5, 100 - (p.daysUntil / 90) * 100)}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-white/30 mt-1">
                      {p.daysUntil} days remaining
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="panel-inner p-8 text-center text-white/30 text-sm">
              No policies match the selected filter.
            </div>
          )}
        </>
      )}

      {policies.length === 0 && (
        <div className="panel-inner p-8 text-center text-white/30 text-sm">
          <p className="mb-3">No policies with maturity dates found.</p>
          <p>
            Add policies with start date and term in the{" "}
            <a href="/policy-tracker" className="text-signal hover:underline">Policy Tracker</a>{" "}
            to track maturity dates here.
          </p>
        </div>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}

function StatCard({ label, value, color = "text-white", small = false }) {
  return (
    <div className="panel-inner p-3 text-center">
      <div className="text-[10px] text-white/30 uppercase tracking-wide">{label}</div>
      <div className={`${small ? "text-sm" : "text-lg"} font-bold ${color} mt-1`}>{value}</div>
    </div>
  );
}
