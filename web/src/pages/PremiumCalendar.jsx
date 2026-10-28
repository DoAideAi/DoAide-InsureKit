import { useState, useMemo, useEffect } from "react";
import { MODE_LABELS, MODE_FACTORS } from "../data/licPlans";
import { calculatePremiumDueDates } from "../utils/calcPremiumDue";
import { formatINR } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import { trackEvent } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Enter policy details", desc: "Start date, premium, and payment mode" },
  { title: "See all due dates", desc: "View upcoming premiums for the next 2 years" },
  { title: "Set reminders", desc: "Share calendar via WhatsApp with your client" },
];

const FAQ_ITEMS = [
  { q: "How are premium due dates calculated?", a: "Due dates are calculated from the policy start date based on the payment mode — yearly (every 12 months), half-yearly (every 6 months), quarterly (every 3 months), or monthly." },
  { q: "What is the grace period for premium payment?", a: "LIC allows a grace period of 30 days for yearly/half-yearly payments and 15 days for quarterly/monthly payments. Policy remains active during the grace period." },
  { q: "What happens if I miss a premium?", a: "If premium is not paid within the grace period, the policy lapses. After 3+ years of paid premiums, it acquires paid-up value. Within 5 years, it can be revived." },
  { q: "Can I change my premium due date?", a: "No, the due date is fixed based on the policy start date and payment mode. However, you can pay within the grace period." },
];

export default function PremiumCalendar() {
  useEffect(() => { trackEvent('tool:view', { tool: 'premium-calendar' }); }, []);
  const [startDate, setStartDate] = useState("");
  const [annualPremium, setAnnualPremium] = useState(50000);
  const [mode, setMode] = useState("yearly");
  const [term, setTerm] = useState(20);
  const [holderName, setHolderName] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");

  const modeFactor = MODE_FACTORS[mode] || 1;
  const premiumPerInstalment = Math.round(annualPremium * modeFactor);

  const dueDates = useMemo(() => {
    if (!startDate) return [];
    return calculatePremiumDueDates(startDate, mode, term);
  }, [startDate, mode, term]);

  const upcomingCount = dueDates.filter((d) => d.isUpcoming).length;
  const pastDueCount = dueDates.filter((d) => d.isPast).length;

  const shareText = dueDates.length > 0
    ? `Premium Due Calendar${holderName ? ` — ${holderName}` : ""}${policyNumber ? ` (${policyNumber})` : ""}\nPremium: ${formatINR(premiumPerInstalment)} (${MODE_LABELS[mode]})\n\n${dueDates.filter((d) => !d.isPast).slice(0, 12).map((d) => `${d.date} — ${formatINR(premiumPerInstalment)}`).join("\n")}\n\n— DoAide InsureKit (insure.doaide.com)`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Premium Due Calendar</h1>
      <p className="text-white/40 text-sm mb-6">
        See all upcoming premium due dates for any policy
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Policy Holder (optional)</label>
            <input className="input-field" value={holderName} onChange={(e) => setHolderName(e.target.value)} placeholder="e.g. Rajesh Kumar" />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Policy Number (optional)</label>
            <input className="input-field" value={policyNumber} onChange={(e) => setPolicyNumber(e.target.value)} placeholder="e.g. 123456789" />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Policy Start Date</label>
            <input type="date" className="input-field" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Annual Premium (₹)</label>
            <input type="number" className="input-field" min={1000} step={1000} value={annualPremium} onChange={(e) => setAnnualPremium(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Payment Mode</label>
            <select className="select-field" value={mode} onChange={(e) => setMode(e.target.value)}>
              {Object.entries(MODE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Policy Term (years)</label>
            <input type="number" className="input-field" min={5} max={40} value={term} onChange={(e) => setTerm(Number(e.target.value))} />
          </div>
        </div>
      </div>

      {startDate && (
        <div className="mb-4">
          <div className="panel-inner p-3 mb-4 flex items-center justify-between text-sm">
            <span className="text-white/50">Premium per instalment ({MODE_LABELS[mode]})</span>
            <span className="text-signal font-bold">{formatINR(premiumPerInstalment)}</span>
          </div>

          {upcomingCount > 0 && (
            <div className="panel p-3 mb-4 border-l-4 border-l-signal text-sm">
              <span className="text-signal font-medium">{upcomingCount}</span>
              <span className="text-white/50"> premium{upcomingCount > 1 ? "s" : ""} due in the next 30 days</span>
            </div>
          )}
        </div>
      )}

      {dueDates.length > 0 && (
        <div className="animate-fade-up">
          <div className="panel-inner p-4 mb-4 overflow-x-auto">
            <div className="text-xs text-white/40 mb-2 uppercase tracking-wide">Due Dates</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-wide">
                  <th className="text-left py-2 px-3">Due Date</th>
                  <th className="text-right py-2 px-3">Year</th>
                  <th className="text-right py-2 px-3">Instalment</th>
                  <th className="text-right py-2 px-3">Amount</th>
                  <th className="text-right py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {dueDates.map((d, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2 px-3 text-white/70">{d.date}</td>
                    <td className="py-2 px-3 text-right text-white/50">{d.year}</td>
                    <td className="py-2 px-3 text-right text-white/50">{d.installment}</td>
                    <td className="py-2 px-3 text-right text-white/70">{formatINR(premiumPerInstalment)}</td>
                    <td className="py-2 px-3 text-right">
                      {d.isPast ? (
                        <span className="text-xs px-2 py-0.5 rounded bg-bad/15 text-bad">Past Due</span>
                      ) : d.isUpcoming ? (
                        <span className="text-xs px-2 py-0.5 rounded bg-signal/15 text-signal">{d.daysUntil}d</span>
                      ) : (
                        <span className="text-xs text-white/30">{d.daysUntil}d</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-2">
            <PrintButton />
            <ShareButtons text={shareText} />
          </div>
        </div>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
