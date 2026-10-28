import { useState, useMemo, useEffect } from "react";
import { useClients } from "../hooks/useClients";
import { usePolicies } from "../hooks/usePolicies";
import { formatINR, formatLakh } from "../utils/format";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import ShareButtons from "../components/ShareButtons";
import { trackEvent } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Select report", desc: "Choose the type of business report" },
  { title: "Set period", desc: "Pick date range and filters" },
  { title: "Generate & print", desc: "View the report and export as PDF" },
];

const FAQ_ITEMS = [
  { q: "Where does the data come from?", a: "Reports are generated from your Policy Tracker and Client Reminders data stored in your browser. Add more policies and clients to get richer reports." },
  { q: "Can I export the reports?", a: "Yes! Use the Print/PDF button to save any report as a PDF. You can then email or print it for your records." },
  { q: "How far back can I generate reports?", a: "Reports use all data you've added to InsureKit. The more policies and clients you track, the more useful your reports become." },
];

const REPORT_TYPES = [
  { id: "portfolio", name: "Portfolio Summary", desc: "Overview of your entire policy book" },
  { id: "renewals", name: "Renewal Report", desc: "Upcoming renewals by month" },
  { id: "clients", name: "Client Summary", desc: "Client overview with policy counts" },
  { id: "performance", name: "Performance Report", desc: "Business metrics and growth" },
];

function PortfolioReport({ policies }) {
  const stats = useMemo(() => {
    const totalSA = policies.reduce((s, p) => s + (p.sumAssured || 0), 0);
    const totalPremium = policies.reduce((s, p) => s + (p.premium || 0), 0);
    const planCounts = {};
    const modeCounts = { yearly: 0, halfYearly: 0, quarterly: 0, monthly: 0, other: 0 };
    for (const p of policies) {
      const plan = p.planName || "Unknown";
      planCounts[plan] = (planCounts[plan] || 0) + 1;
      const mode = p.paymentMode || "other";
      modeCounts[mode] = (modeCounts[mode] || 0) + 1;
    }
    const topPlans = Object.entries(planCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
    return { totalSA, totalPremium, topPlans, modeCounts };
  }, [policies]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="panel p-3 text-center">
          <div className="text-xl font-bold text-white">{policies.length}</div>
          <div className="text-xs text-white/40">Total Policies</div>
        </div>
        <div className="panel p-3 text-center">
          <div className="text-xl font-bold text-signal">{formatLakh(stats.totalSA)}</div>
          <div className="text-xs text-white/40">Total Sum Assured</div>
        </div>
        <div className="panel p-3 text-center">
          <div className="text-xl font-bold text-white">{formatLakh(stats.totalPremium)}</div>
          <div className="text-xs text-white/40">Annual Premium</div>
        </div>
        <div className="panel p-3 text-center">
          <div className="text-xl font-bold text-white">
            {policies.length > 0 ? formatINR(Math.round(stats.totalSA / policies.length)) : "—"}
          </div>
          <div className="text-xs text-white/40">Avg SA/Policy</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="panel p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Top Plans</h3>
          {stats.topPlans.length === 0 ? (
            <p className="text-xs text-white/30">No data</p>
          ) : (
            <div className="space-y-2">
              {stats.topPlans.map(([plan, count]) => (
                <div key={plan} className="flex items-center justify-between">
                  <span className="text-xs text-white/60 truncate">{plan}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-signal rounded-full"
                        style={{ width: `${(count / policies.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/40 w-6 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="panel p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Payment Mode Split</h3>
          <div className="space-y-2">
            {Object.entries(stats.modeCounts)
              .filter(([, c]) => c > 0)
              .sort((a, b) => b[1] - a[1])
              .map(([mode, count]) => (
                <div key={mode} className="flex items-center justify-between">
                  <span className="text-xs text-white/60 capitalize">{mode === "halfYearly" ? "Half-Yearly" : mode}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${(count / policies.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/40 w-6 text-right">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RenewalReport({ policies }) {
  const monthlyRenewals = useMemo(() => {
    const months = {};
    for (const p of policies) {
      if (!p.nextDueDate) continue;
      const d = new Date(p.nextDueDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
      if (!months[key]) months[key] = { label, policies: [], total: 0 };
      months[key].policies.push(p);
      months[key].total += p.premium || 0;
    }
    return Object.entries(months).sort((a, b) => a[0].localeCompare(b[0])).map(([, v]) => v);
  }, [policies]);

  if (monthlyRenewals.length === 0) {
    return <p className="text-white/40 text-sm">No policies with due dates set. Add due dates in Policy Tracker.</p>;
  }

  return (
    <div className="space-y-4">
      {monthlyRenewals.map((month) => (
        <div key={month.label} className="panel p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">{month.label}</h3>
            <div className="text-xs text-white/40">
              {month.policies.length} policies · {formatINR(month.total)}
            </div>
          </div>
          <div className="space-y-1">
            {month.policies.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                <div className="flex-1 min-w-0">
                  <span className="text-white/60">{p.holderName}</span>
                  <span className="text-white/20 mx-2">·</span>
                  <span className="text-white/30">{p.policyNumber}</span>
                </div>
                <span className="text-white/50 font-medium">{formatINR(p.premium)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ClientReport({ clients, policies }) {
  const clientData = useMemo(() => {
    return clients.map((c) => {
      const clientPolicies = policies.filter(
        (p) => p.holderName?.toLowerCase() === c.name?.toLowerCase(),
      );
      const totalSA = clientPolicies.reduce((s, p) => s + (p.sumAssured || 0), 0);
      const totalPremium = clientPolicies.reduce((s, p) => s + (p.premium || 0), 0);
      return { ...c, policyCount: clientPolicies.length, totalSA, totalPremium };
    }).sort((a, b) => b.totalPremium - a.totalPremium);
  }, [clients, policies]);

  if (clientData.length === 0) {
    return <p className="text-white/40 text-sm">No clients added yet. Add clients in Birthday Reminders.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="border border-white/10 px-3 py-2 bg-white/5 text-left">Client</th>
            <th className="border border-white/10 px-3 py-2 bg-white/5 text-right">Policies</th>
            <th className="border border-white/10 px-3 py-2 bg-white/5 text-right">Total SA</th>
            <th className="border border-white/10 px-3 py-2 bg-white/5 text-right">Annual Premium</th>
          </tr>
        </thead>
        <tbody>
          {clientData.map((c) => (
            <tr key={c.id}>
              <td className="border border-white/10 px-3 py-2">
                <div className="text-white/80">{c.name}</div>
                <div className="text-[10px] text-white/30">{c.phone}</div>
              </td>
              <td className="border border-white/10 px-3 py-2 text-right text-white/60">{c.policyCount}</td>
              <td className="border border-white/10 px-3 py-2 text-right text-white/60">{c.totalSA > 0 ? formatLakh(c.totalSA) : "—"}</td>
              <td className="border border-white/10 px-3 py-2 text-right font-medium text-white/80">{c.totalPremium > 0 ? formatINR(c.totalPremium) : "—"}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-white/5">
            <td className="border border-white/10 px-3 py-2 font-medium">Total ({clientData.length} clients)</td>
            <td className="border border-white/10 px-3 py-2 text-right font-medium">{clientData.reduce((s, c) => s + c.policyCount, 0)}</td>
            <td className="border border-white/10 px-3 py-2 text-right font-medium">{formatLakh(clientData.reduce((s, c) => s + c.totalSA, 0))}</td>
            <td className="border border-white/10 px-3 py-2 text-right font-medium">{formatINR(clientData.reduce((s, c) => s + c.totalPremium, 0))}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function PerformanceReport({ policies, clients }) {
  const stats = useMemo(() => {
    const totalPremium = policies.reduce((s, p) => s + (p.premium || 0), 0);
    const totalSA = policies.reduce((s, p) => s + (p.sumAssured || 0), 0);
    const avgPolicySize = policies.length > 0 ? totalSA / policies.length : 0;
    const avgPremium = policies.length > 0 ? totalPremium / policies.length : 0;
    const clientsWithPolicies = new Set(policies.map((p) => p.holderName?.toLowerCase()).filter(Boolean)).size;
    const policiesPerClient = clientsWithPolicies > 0 ? policies.length / clientsWithPolicies : 0;

    return { totalPremium, totalSA, avgPolicySize, avgPremium, clientsWithPolicies, policiesPerClient };
  }, [policies, clients]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="panel p-4 text-center">
          <div className="text-2xl font-bold text-signal">{policies.length}</div>
          <div className="text-xs text-white/40">Total Policies</div>
        </div>
        <div className="panel p-4 text-center">
          <div className="text-2xl font-bold text-white">{clients.length}</div>
          <div className="text-xs text-white/40">Total Clients</div>
        </div>
        <div className="panel p-4 text-center">
          <div className="text-2xl font-bold text-white">{stats.policiesPerClient.toFixed(1)}</div>
          <div className="text-xs text-white/40">Policies / Client</div>
        </div>
        <div className="panel p-4 text-center">
          <div className="text-2xl font-bold text-white">{formatLakh(stats.totalPremium)}</div>
          <div className="text-xs text-white/40">Total Annual Premium</div>
        </div>
        <div className="panel p-4 text-center">
          <div className="text-2xl font-bold text-white">{formatINR(Math.round(stats.avgPremium))}</div>
          <div className="text-xs text-white/40">Avg Premium / Policy</div>
        </div>
        <div className="panel p-4 text-center">
          <div className="text-2xl font-bold text-white">{formatLakh(Math.round(stats.avgPolicySize))}</div>
          <div className="text-xs text-white/40">Avg SA / Policy</div>
        </div>
      </div>

      <div className="panel p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Key Metrics</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50">Total Sum Assured Book</span>
            <span className="text-white font-medium">{formatLakh(stats.totalSA)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50">Unique Policy Holders</span>
            <span className="text-white font-medium">{stats.clientsWithPolicies}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50">Client Retention (with 2+ policies)</span>
            <span className="text-white font-medium">
              {stats.policiesPerClient >= 2 ? "Strong" : stats.policiesPerClient >= 1.5 ? "Good" : "Build up"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportGenerator() {
  useEffect(() => { trackEvent('tool:view', { tool: 'report-generator' }); }, []);
  const [reportType, setReportType] = useState("portfolio");

  const { policies } = usePolicies();
  const { clients } = useClients();

  const hasData = policies.length > 0 || clients.length > 0;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Business Report Generator</h1>
      <p className="text-white/40 text-sm mb-6">
        Generate portfolio, renewal, client, and performance reports from your data
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      {!hasData ? (
        <div className="panel p-8 text-center">
          <div className="text-3xl mb-3">📊</div>
          <h2 className="text-lg font-semibold text-white mb-2">No Data Yet</h2>
          <p className="text-white/40 text-sm mb-4">
            Add policies and clients first, then come back to generate business reports.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a href="/policy-tracker" className="btn btn-primary">Add Policies</a>
            <a href="/client-reminders" className="btn btn-secondary">Add Clients</a>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-6 print:hidden">
            {REPORT_TYPES.map((r) => (
              <button
                key={r.id}
                onClick={() => setReportType(r.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  reportType === r.id
                    ? "bg-signal text-white"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>

          <div className="mb-4 print:mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {REPORT_TYPES.find((r) => r.id === reportType)?.name}
                </h2>
                <p className="text-xs text-white/30">
                  Generated on {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>

            {reportType === "portfolio" && <PortfolioReport policies={policies} />}
            {reportType === "renewals" && <RenewalReport policies={policies} />}
            {reportType === "clients" && <ClientReport clients={clients} policies={policies} />}
            {reportType === "performance" && <PerformanceReport policies={policies} clients={clients} />}
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <PrintButton />
          </div>
          <div className="flex flex-wrap gap-2 mt-4 no-print">
            <ShareButtons text="Generate LIC business reports — free tool on DoAide InsureKit" toolName="Business Report Generator" />
          </div>
        </>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
