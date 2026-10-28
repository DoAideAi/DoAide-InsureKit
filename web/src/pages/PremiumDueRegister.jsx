import { useState, useMemo, useEffect } from "react";
import { usePolicies } from "../hooks/usePolicies";
import { formatINR } from "../utils/format";
import PrintButton from "../components/PrintButton";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackEvent } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Add policies", desc: "Go to Policy Tracker and add your client policies" },
  { title: "View dues", desc: "See all upcoming premium dues sorted by date" },
  { title: "Filter & export", desc: "Filter by status, month, or client — print or share" },
];

const FAQ_ITEMS = [
  { q: "Where does the data come from?", a: "Premium Due Register uses policies you've added in the Policy Tracker. Add policies there first, then view upcoming dues here." },
  { q: "Can I export the register?", a: "Yes! Use the Print/PDF button to save the filtered list as a PDF. You can also share individual reminders via WhatsApp." },
  { q: "How far ahead does it show?", a: "By default it shows dues for the next 90 days, but you can adjust the filter to show 30, 60, 90, or 180 days ahead." },
];

const STATUS_COLORS = {
  overdue: "text-red-400 bg-red-400/10",
  due_soon: "text-amber-400 bg-amber-400/10",
  upcoming: "text-signal bg-signal/10",
};

function getDueStatus(daysUntil) {
  if (daysUntil < 0) return { label: "Overdue", key: "overdue" };
  if (daysUntil <= 7) return { label: "Due Soon", key: "due_soon" };
  return { label: "Upcoming", key: "upcoming" };
}

export default function PremiumDueRegister() {
  useEffect(() => { trackEvent('tool:view', { tool: 'premium-due-register' }); }, []);
  const { policies: allPolicies, loading, getUpcomingRenewals, isCloud } = usePolicies();
  const [daysAhead, setDaysAhead] = useState(90);
  const [filterText, setFilterText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const renewals = useMemo(() => getUpcomingRenewals(daysAhead), [getUpcomingRenewals, daysAhead]);

  const filtered = useMemo(() => {
    let list = renewals;
    if (filterText) {
      const q = filterText.toLowerCase();
      list = list.filter(
        (p) =>
          p.holderName?.toLowerCase().includes(q) ||
          p.policyNumber?.toLowerCase().includes(q) ||
          p.planName?.toLowerCase().includes(q),
      );
    }
    if (filterStatus !== "all") {
      list = list.filter((p) => getDueStatus(p.daysUntil).key === filterStatus);
    }
    return list;
  }, [renewals, filterText, filterStatus]);

  const totalDue = filtered.reduce((sum, p) => sum + (p.premium || 0), 0);
  const overdueCount = filtered.filter((p) => p.daysUntil < 0).length;
  const dueSoonCount = filtered.filter((p) => p.daysUntil >= 0 && p.daysUntil <= 7).length;

  const shareText = `📋 Premium Due Register\n\n${filtered.length} premiums due in next ${daysAhead} days\nTotal: ${formatINR(totalDue)}\n${overdueCount > 0 ? `⚠️ ${overdueCount} overdue\n` : ""}${dueSoonCount > 0 ? `🔔 ${dueSoonCount} due this week\n` : ""}\n— DoAide InsureKit`;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Premium Due Register</h1>
      <p className="text-white/40 text-sm mb-6">
        Track all upcoming premium dues — filter, sort, and share reminders with clients
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      {allPolicies.length === 0 ? (
        <div className="panel p-8 text-center">
          <div className="text-3xl mb-3">📋</div>
          <h2 className="text-lg font-semibold text-white mb-2">No Policies Added Yet</h2>
          <p className="text-white/40 text-sm mb-4">
            Add policies in the Policy Tracker first, then come back here to see upcoming premium dues.
          </p>
          <a href="/policy-tracker" className="btn btn-primary">
            Go to Policy Tracker →
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="panel p-3 text-center">
              <div className="text-2xl font-bold text-white">{filtered.length}</div>
              <div className="text-xs text-white/40">Premiums Due</div>
            </div>
            <div className="panel p-3 text-center">
              <div className="text-2xl font-bold text-signal">{formatINR(totalDue)}</div>
              <div className="text-xs text-white/40">Total Amount</div>
            </div>
            <div className="panel p-3 text-center">
              <div className="text-2xl font-bold text-red-400">{overdueCount}</div>
              <div className="text-xs text-white/40">Overdue</div>
            </div>
          </div>

          <div className="panel p-4 mb-6 print:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-white/50 mb-1">Search</label>
                <input
                  type="text"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Client name, policy no, plan..."
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Status</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input w-full">
                  <option value="all">All</option>
                  <option value="overdue">Overdue</option>
                  <option value="due_soon">Due This Week</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Period</label>
                <select value={daysAhead} onChange={(e) => setDaysAhead(Number(e.target.value))} className="input w-full">
                  <option value={30}>Next 30 Days</option>
                  <option value={60}>Next 60 Days</option>
                  <option value={90}>Next 90 Days</option>
                  <option value={180}>Next 180 Days</option>
                </select>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="panel p-6 text-center">
              <p className="text-white/40">No premium dues matching your filters</p>
            </div>
          ) : (
            <div className="space-y-2 mb-6">
              {filtered.map((policy) => {
                const status = getDueStatus(policy.daysUntil);
                const dueDate = policy.nextDueDate ? new Date(policy.nextDueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
                const reminderText = `🔔 Premium Due Reminder\n\nPolicy: ${policy.policyNumber}\nPlan: ${policy.planName}\nHolder: ${policy.holderName}\nPremium: ${formatINR(policy.premium)}\nDue Date: ${dueDate}\n\nPlease ensure timely payment to keep your policy active.\n\n— DoAide InsureKit`;

                return (
                  <div key={policy.id} className="panel p-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white truncate">{policy.holderName}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${STATUS_COLORS[status.key]}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="text-xs text-white/40">
                        {policy.policyNumber} · {policy.planName}
                      </div>
                      <div className="text-xs text-white/30 mt-0.5">
                        Due: {dueDate}
                        {policy.daysUntil < 0
                          ? ` (${Math.abs(policy.daysUntil)} days overdue)`
                          : policy.daysUntil === 0
                            ? " (Today)"
                            : ` (in ${policy.daysUntil} days)`}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-white">{formatINR(policy.premium)}</div>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(reminderText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#25D366] hover:text-[#25D366]/80 no-underline mt-1 inline-block"
                      >
                        📲 Remind
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-3 print:hidden">
            <PrintButton />
            <ShareButtons text={shareText} />
          </div>
        </>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
