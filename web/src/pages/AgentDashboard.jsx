import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useClients } from "../hooks/useClients";
import { usePolicies } from "../hooks/usePolicies";
import { estimatePortfolioCommission } from "../utils/estimateCommission";
import { formatINR } from "../utils/format";
import FAQ from "../components/FAQ";

const FAQ_ITEMS = [
  { q: "Where does the dashboard data come from?", a: "The dashboard reads from policies you've added in Policy Tracker and clients in Client Reminders. Sign in to sync data across all your devices." },
  { q: "How do I increase my portfolio value?", a: "Add all your client policies to the Policy Tracker. The dashboard automatically calculates totals and shows your progress toward LIC club targets." },
  { q: "What are LIC club targets?", a: "LIC rewards agents based on First Year Commission (FYC): Star Club (₹3L+), MDRT (₹6L+), COT (₹12L+), TOT (₹24L+). Each tier gets bonus commission on FYC." },
  { q: "Is this data synced across devices?", a: "Yes! Sign in with Google to sync your data across all devices. If not signed in, data is stored locally in your browser." },
];

const QUICK_LINKS = [
  { path: "/premium-calculator", name: "Premium Calculator", icon: "₹" },
  { path: "/commission-calculator", name: "Commission Calculator", icon: "💰" },
  { path: "/premium-table", name: "Premium Table", icon: "📊" },
  { path: "/compare-plans", name: "Compare Plans", icon: "⚖️" },
  { path: "/policy-tracker", name: "Policy Tracker", icon: "📄" },
  { path: "/client-reminders", name: "Client Reminders", icon: "🎂" },
  { path: "/plan-recommender", name: "Plan Recommender", icon: "🎯" },
  { path: "/marketing", name: "Marketing Templates", icon: "📣" },
  { path: "/portfolio-import", name: "Import Portfolio", icon: "📥" },
];

function computeUpcomingEvents(clients, daysAhead) {
  const now = new Date();
  const events = [];
  for (const client of clients) {
    for (const type of ["birthday", "anniversary"]) {
      const val = client[type];
      if (!val) continue;
      const [month, day] = val.split("-").map(Number);
      const thisYear = now.getFullYear();
      let next = new Date(thisYear, month - 1, day);
      if (next < now) next = new Date(thisYear + 1, month - 1, day);
      const daysUntil = Math.ceil((next - now) / (24 * 60 * 60 * 1000));
      if (daysUntil >= 0 && daysUntil <= daysAhead) {
        events.push({ clientId: client.id, clientName: client.name, type, date: next.toISOString().slice(0, 10), daysUntil, phone: client.phone });
      }
    }
  }
  return events.sort((a, b) => a.daysUntil - b.daysUntil);
}

export default function AgentDashboard() {
  const { clients, loading: clientsLoading, isCloud } = useClients();
  const { policies, loading: policiesLoading, getUpcomingRenewals } = usePolicies();
  const upcomingRenewals = useMemo(() => getUpcomingRenewals(30), [getUpcomingRenewals]);
  const upcomingEvents = useMemo(() => computeUpcomingEvents(clients, 7), [clients]);

  const stats = useMemo(() => {
    const active = policies.filter((p) => (p.status || "active") === "active");
    const lapsed = policies.filter((p) => p.status === "lapsed");
    return {
      totalPolicies: policies.length,
      activePolicies: active.length,
      lapsedPolicies: lapsed.length,
      totalSA: active.reduce((s, p) => s + (p.sumAssured || 0), 0),
      totalAnnualPremium: active.reduce((s, p) => s + (p.premium || 0), 0),
      totalClients: clients.length,
      overdueCount: upcomingRenewals.filter((r) => r.daysUntil <= 0).length,
      dueSoonCount: upcomingRenewals.filter((r) => r.daysUntil > 0 && r.daysUntil <= 7).length,
    };
  }, [policies, clients, upcomingRenewals]);

  const commission = useMemo(() => estimatePortfolioCommission(policies), [policies]);

  const hasData = policies.length > 0 || clients.length > 0;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Agent Dashboard</h1>
      <p className="text-white/40 text-sm mb-2">
        Your portfolio at a glance — policies, clients, renewals, and performance
      </p>
      <p className="text-white/30 text-xs mb-6 flex items-center gap-1.5">
        <span className="inline-block w-3.5 h-3.5">{isCloud ? "\u{2601}\u{FE0F}" : "\u{1F4BE}"}</span>
        {isCloud ? "Synced to the cloud." : "Data saved locally. Sign in to sync across devices."}
      </p>

      {(clientsLoading || policiesLoading) && (
        <div className="panel p-8 text-center text-white/40 text-sm mb-6">Loading your data...</div>
      )}

      {hasData ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="panel p-4 text-center">
              <div className="text-2xl font-bold text-signal">{stats.activePolicies}</div>
              <div className="text-[10px] text-white/30 uppercase tracking-wide mt-0.5">Active Policies</div>
            </div>
            <div className="panel p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.totalClients}</div>
              <div className="text-[10px] text-white/30 uppercase tracking-wide mt-0.5">Clients</div>
            </div>
            <div className="panel p-4 text-center">
              <div className="text-2xl font-bold text-signal">{formatINR(stats.totalSA)}</div>
              <div className="text-[10px] text-white/30 uppercase tracking-wide mt-0.5">Total Cover (SA)</div>
            </div>
            <div className="panel p-4 text-center">
              <div className="text-2xl font-bold text-white">{formatINR(stats.totalAnnualPremium)}</div>
              <div className="text-[10px] text-white/30 uppercase tracking-wide mt-0.5">Annual Premium</div>
            </div>
          </div>

          {/* Alerts Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {stats.overdueCount > 0 && (
              <Link to="/policy-tracker" className="panel p-4 border-l-4 border-l-bad hover:border-bad/80 transition-colors no-underline">
                <div className="text-bad font-bold text-lg">{stats.overdueCount}</div>
                <div className="text-xs text-white/40">Overdue Renewals</div>
                <div className="text-[10px] text-bad/50 mt-1">Needs immediate attention</div>
              </Link>
            )}
            {stats.dueSoonCount > 0 && (
              <Link to="/policy-tracker" className="panel p-4 border-l-4 border-l-warn hover:border-warn/80 transition-colors no-underline">
                <div className="text-warn font-bold text-lg">{stats.dueSoonCount}</div>
                <div className="text-xs text-white/40">Due This Week</div>
                <div className="text-[10px] text-warn/50 mt-1">Send reminders now</div>
              </Link>
            )}
            {stats.lapsedPolicies > 0 && (
              <Link to="/policy-tracker" className="panel p-4 border-l-4 border-l-bad hover:border-bad/80 transition-colors no-underline">
                <div className="text-bad font-bold text-lg">{stats.lapsedPolicies}</div>
                <div className="text-xs text-white/40">Lapsed Policies</div>
                <div className="text-[10px] text-bad/50 mt-1">Use Revival Calculator to quote</div>
              </Link>
            )}
            {upcomingEvents.length > 0 && (
              <Link to="/client-reminders" className="panel p-4 border-l-4 border-l-signal hover:border-signal/80 transition-colors no-underline">
                <div className="text-signal font-bold text-lg">{upcomingEvents.length}</div>
                <div className="text-xs text-white/40">Events This Week</div>
                <div className="text-[10px] text-signal/50 mt-1">{upcomingEvents.map((e) => `${e.clientName} (${e.type})`).slice(0, 2).join(", ")}</div>
              </Link>
            )}
          </div>

          {/* Commission Tracker */}
          {commission.details.length > 0 && (
            <div className="panel p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-white">Commission Tracker</div>
                <Link to="/commission-calculator" className="text-xs text-signal hover:text-signal-soft transition-colors no-underline">Full calculator</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="panel-inner p-3 text-center">
                  <div className="text-lg font-bold text-good">{formatINR(commission.fyc)}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wide">First-Year Comm.</div>
                </div>
                <div className="panel-inner p-3 text-center">
                  <div className="text-lg font-bold text-white">{formatINR(commission.renewal)}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wide">Renewal Comm.</div>
                </div>
                <div className="panel-inner p-3 text-center">
                  <div className="text-lg font-bold text-signal">{formatINR(commission.total)}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wide">Total This Year</div>
                </div>
                <div className="panel-inner p-3 text-center">
                  <div className="text-lg font-bold text-white">{formatINR(commission.annualPremium)}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wide">Annualized Premium</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-white/50">{commission.currentSlab.label}</span>
                {commission.nextSlab && (
                  <span className="text-white/40">
                    {formatINR(commission.amountToNext)} FYC to {commission.nextSlab.label}
                  </span>
                )}
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden" role="progressbar" aria-valuenow={commission.progressPercent} aria-valuemin="0" aria-valuemax="100">
                <div className="h-full rounded-full bg-signal transition-all" style={{ width: `${commission.progressPercent}%` }} />
              </div>
              <div className="mt-3 text-[10px] text-white/25">
                Estimated from tracked policies using standard IRDAI commission rates (plan type inferred from name; first policy year earns the first-year rate). Actual commission depends on your agency terms.
              </div>
            </div>
          )}

          {/* Upcoming Renewals */}
          {upcomingRenewals.length > 0 && (
            <div className="panel p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-white">Upcoming Renewals</div>
                <Link to="/policy-tracker" className="text-xs text-signal hover:text-signal-soft transition-colors no-underline">View all</Link>
              </div>
              <div className="space-y-2">
                {upcomingRenewals.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-white/70">{p.holderName}</span>
                      <span className="text-white/30 mx-1">&mdash;</span>
                      <span className="text-white/50">{p.planName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/70">{formatINR(p.premium)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${p.daysUntil <= 0 ? "bg-bad/15 text-bad" : p.daysUntil <= 7 ? "bg-warn/15 text-warn" : "bg-signal/15 text-signal"}`}>
                        {p.daysUntil <= 0 ? "OVERDUE" : `${p.daysUntil}d`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="panel p-8 text-center mb-6">
          <div className="text-white/50 text-sm mb-2">No data yet</div>
          <div className="text-white/30 text-xs mb-4">Start by adding policies and clients to see your dashboard</div>
          <div className="flex justify-center gap-3">
            <Link to="/policy-tracker" className="btn-primary text-sm py-2 px-4 no-underline">Add Policies</Link>
            <Link to="/client-reminders" className="text-sm py-2 px-4 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 transition-colors no-underline">Add Clients</Link>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-signal uppercase tracking-wide mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {QUICK_LINKS.map((link) => (
            <Link key={link.path} to={link.path} className="panel-inner p-3 flex items-center gap-2 hover:bg-white/10 transition-colors no-underline group">
              <span className="text-base">{link.icon}</span>
              <span className="text-sm text-white/50 group-hover:text-white transition-colors">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
