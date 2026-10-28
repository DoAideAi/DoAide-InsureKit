import { useState, useMemo, useEffect } from "react";
import { LIC_PLANS, MODE_LABELS } from "../data/licPlans";
import { validatePolicy } from "../utils/policyStore";
import { usePolicies } from "../hooks/usePolicies";
import { formatINR } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import PrintButton from "../components/PrintButton";
import HowItWorks from "../components/HowItWorks";
import { trackEvent } from "../lib/analytics";

const MODE_OPTIONS = Object.entries(MODE_LABELS);

const STATUS_OPTIONS = [
  { value: "active", label: "Active", color: "bg-good/15 text-good" },
  { value: "lapsed", label: "Lapsed", color: "bg-bad/15 text-bad" },
  { value: "paid_up", label: "Paid-Up", color: "bg-warn/15 text-warn" },
  { value: "matured", label: "Matured", color: "bg-signal/15 text-signal" },
];

const HOW_IT_WORKS = [
  { title: "Add policies", desc: "Enter client name, plan, premium, and status" },
  { title: "Track renewals", desc: "See upcoming premium due dates at a glance" },
  { title: "Manage portfolio", desc: "Search, filter, edit, and export your client policies" },
];

const FAQ_ITEMS = [
  { q: "Where is my policy data stored?", a: "If you're signed in, your data syncs to the cloud and is available on any device. If not signed in, data is stored locally in your browser." },
  { q: "Can I track policies from different clients?", a: "Yes! Add each policy with the client/holder name. You can track unlimited policies for all your clients." },
  { q: "How do premium reminders work?", a: "Set the next due date when adding a policy. The tracker shows upcoming renewals within the next 30 days, sorted by urgency." },
  { q: "Can I export my policy data?", a: "Yes! Click the 'Export CSV' button to download all your policies as a CSV file. You can open it in Excel or Google Sheets." },
  { q: "What do the policy statuses mean?", a: "Active = premiums being paid regularly. Lapsed = premiums missed for 2+ years. Paid-Up = no more premiums but reduced cover continues. Matured = policy term completed, benefits received." },
];

const EMPTY_FORM = {
  policyNumber: "",
  holderName: "",
  planName: LIC_PLANS[0].name,
  sumAssured: 500000,
  premium: 25000,
  mode: "yearly",
  startDate: "",
  nextDueDate: "",
  status: "active",
  notes: "",
};

export default function PolicyTracker() {
  useEffect(() => { trackEvent('tool:view', { tool: 'policy-tracker' }); }, []);
  const { policies, loading, addPolicy, updatePolicy, removePolicy, getUpcomingRenewals, isCloud } = usePolicies();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [form, setForm] = useState(EMPTY_FORM);

  const upcoming = useMemo(() => getUpcomingRenewals(30), [getUpcomingRenewals]);

  const filteredPolicies = useMemo(() => {
    let result = policies;
    if (statusFilter !== "all") {
      result = result.filter((p) => (p.status || "active") === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.holderName?.toLowerCase().includes(q) ||
          p.policyNumber?.toLowerCase().includes(q) ||
          p.planName?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [policies, searchQuery, statusFilter]);

  const portfolioStats = useMemo(() => {
    const active = policies.filter((p) => (p.status || "active") === "active");
    return {
      total: policies.length,
      active: active.length,
      lapsed: policies.filter((p) => p.status === "lapsed").length,
      totalSA: active.reduce((s, p) => s + (p.sumAssured || 0), 0),
      totalPremium: active.reduce((s, p) => s + (p.premium || 0), 0),
    };
  }, [policies]);

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validatePolicy(form);
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    if (editingId) {
      await updatePolicy(editingId, form);
      setEditingId(null);
    } else {
      await addPolicy(form);
    }

    setShowForm(false);
    setErrors([]);
    setForm(EMPTY_FORM);
  }

  function startEdit(policy) {
    setForm({
      policyNumber: policy.policyNumber || "",
      holderName: policy.holderName || "",
      planName: policy.planName || LIC_PLANS[0].name,
      sumAssured: policy.sumAssured || 500000,
      premium: policy.premium || 25000,
      mode: policy.mode || "yearly",
      startDate: policy.startDate || "",
      nextDueDate: policy.nextDueDate || "",
      status: policy.status || "active",
      notes: policy.notes || "",
    });
    setEditingId(policy.id);
    setShowForm(true);
    setErrors([]);
  }

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setErrors([]);
    setForm(EMPTY_FORM);
  }

  async function handleDelete(id) {
    await removePolicy(id);
  }

  function exportCSV() {
    const headers = ["Policy Number", "Holder Name", "Plan", "Sum Assured", "Premium", "Mode", "Start Date", "Next Due", "Status", "Notes"];
    const rows = policies.map((p) => [
      p.policyNumber,
      p.holderName,
      p.planName,
      p.sumAssured,
      p.premium,
      MODE_LABELS[p.mode] || p.mode,
      p.startDate || "",
      p.nextDueDate || "",
      p.status || "active",
      p.notes || "",
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `insurekit-policies-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const shareText = upcoming.length > 0
    ? `Premium Reminders (Next 30 days):\n${upcoming.map((p) => `${p.holderName} — ${p.planName}\nPolicy: ${p.policyNumber}\nPremium: ${formatINR(p.premium)}\nDue: ${p.nextDueDate} (${p.daysUntil <= 0 ? "OVERDUE" : `${p.daysUntil} days`})`).join("\n\n")}\n\n— DoAide InsureKit`
    : "";

  function getStatusBadge(status) {
    const opt = STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];
    return <span className={`text-xs px-2 py-0.5 rounded ${opt.color}`}>{opt.label}</span>;
  }

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Policy Tracker</h1>
      <p className="text-white/40 text-sm mb-2">
        Track client policies, renewal dates, status, and premium reminders
      </p>
      <p className="text-white/30 text-xs mb-6 flex items-center gap-1.5">
        <span className="inline-block w-3.5 h-3.5">{isCloud ? "\u{2601}\u{FE0F}" : "\u{1F4BE}"}</span>
        {isCloud ? "Your policies are synced to the cloud across all your devices." : "Policies are saved in this browser. Sign in to sync across devices."}
      </p>

      {loading && <div className="panel p-8 text-center text-white/40 text-sm mb-6">Loading policies...</div>}

      <HowItWorks steps={HOW_IT_WORKS} />

      {/* Portfolio Summary */}
      {policies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-white">{portfolioStats.total}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Total</div>
          </div>
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-good">{portfolioStats.active}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Active</div>
          </div>
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-bad">{portfolioStats.lapsed}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Lapsed</div>
          </div>
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-signal">{formatINR(portfolioStats.totalSA)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Total SA</div>
          </div>
          <div className="panel-inner p-3 text-center">
            <div className="text-lg font-bold text-white">{formatINR(portfolioStats.totalPremium)}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-wide">Annual Prem</div>
          </div>
        </div>
      )}

      {/* Upcoming Renewals */}
      {upcoming.length > 0 && (
        <div className="panel p-4 mb-6 border-l-4 border-l-warn">
          <div className="text-sm font-medium text-white mb-2">Upcoming Renewals (Next 30 days)</div>
          <div className="space-y-2">
            {upcoming.map((p) => (
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

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            className="input-field text-sm flex-1 sm:w-48"
            placeholder="Search policies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="select-field text-sm w-28"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          {policies.length > 0 && (
            <>
              <button onClick={exportCSV} className="text-xs text-signal hover:text-signal-soft transition-colors py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10">
                Export CSV
              </button>
              <PrintButton />
              {upcoming.length > 0 && <ShareButtons text={shareText} />}
            </>
          )}
          <button onClick={() => { showForm ? cancelForm() : setShowForm(true); }} className="btn-primary text-sm py-2 px-4">
            {showForm ? "Cancel" : "+ Add Policy"}
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="panel p-5 mb-6 animate-fade-up">
          <div className="text-sm font-medium text-white mb-3">{editingId ? "Edit Policy" : "Add New Policy"}</div>
          {errors.length > 0 && (
            <div className="mb-4 p-3 rounded-lg bg-bad/10 border border-bad/20 text-bad text-sm">
              {errors.map((e, i) => <div key={i}>{e}</div>)}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Policy Number</label>
              <input className="input-field" value={form.policyNumber} onChange={(e) => setForm({ ...form, policyNumber: e.target.value })} placeholder="e.g. 123456789" />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Holder Name</label>
              <input className="input-field" value={form.holderName} onChange={(e) => setForm({ ...form, holderName: e.target.value })} placeholder="e.g. Rajesh Kumar" />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Plan Name</label>
              <select className="select-field" value={form.planName} onChange={(e) => setForm({ ...form, planName: e.target.value })}>
                {LIC_PLANS.map((p) => <option key={p.id} value={p.name}>{p.name} ({p.tableNo || "Govt"})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Status</label>
              <select className="select-field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                {STATUS_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Sum Assured</label>
              <input type="number" className="input-field" min={10000} step={10000} value={form.sumAssured} onChange={(e) => setForm({ ...form, sumAssured: Number(e.target.value) })} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Premium Amount</label>
              <input type="number" className="input-field" min={100} step={100} value={form.premium} onChange={(e) => setForm({ ...form, premium: Number(e.target.value) })} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Payment Mode</label>
              <select className="select-field" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
                {MODE_OPTIONS.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Policy Start Date</label>
              <input type="date" className="input-field" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Next Premium Due Date</label>
              <input type="date" className="input-field" value={form.nextDueDate} onChange={(e) => setForm({ ...form, nextDueDate: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Notes (optional)</label>
              <input className="input-field" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any additional notes..." />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={cancelForm} className="text-sm py-2 px-4 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 transition-colors">Cancel</button>
            <button type="submit" className="btn-primary text-sm py-2 px-6">{editingId ? "Update Policy" : "Save Policy"}</button>
          </div>
        </form>
      )}

      {/* Policy List */}
      {filteredPolicies.length > 0 ? (
        <div className="space-y-3">
          {filteredPolicies.map((p) => (
            <div key={p.id} className="panel p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{p.holderName}</span>
                    {getStatusBadge(p.status || "active")}
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">{p.planName} &mdash; Policy #{p.policyNumber}</div>
                </div>
                <div className="flex gap-2 print:hidden">
                  <button onClick={() => startEdit(p)} className="text-xs text-signal/60 hover:text-signal transition-colors">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs text-bad/60 hover:text-bad transition-colors">Delete</button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                <div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wide">Sum Assured</div>
                  <div className="text-sm text-white/70">{formatINR(p.sumAssured)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wide">Premium</div>
                  <div className="text-sm text-white/70">{formatINR(p.premium)} ({MODE_LABELS[p.mode] || p.mode})</div>
                </div>
                {p.startDate && (
                  <div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wide">Start Date</div>
                    <div className="text-sm text-white/70">{p.startDate}</div>
                  </div>
                )}
                {p.nextDueDate && (
                  <div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wide">Next Due</div>
                    <div className="text-sm text-white/70">{p.nextDueDate}</div>
                  </div>
                )}
              </div>
              {p.notes && <div className="text-xs text-white/30 mt-2">{p.notes}</div>}
            </div>
          ))}
        </div>
      ) : (
        !showForm && (
          <div className="panel-inner p-8 text-center text-white/30 text-sm">
            {policies.length === 0
              ? 'No policies tracked yet. Click "+ Add Policy" to get started.'
              : "No policies match your search/filter."}
          </div>
        )
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
