import { useState, useMemo, useEffect } from "react";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackCalculation } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Enter date of birth", desc: "Provide client's date of birth" },
  { title: "Set policy date", desc: "The date of proposal or policy start" },
  { title: "Get insurance age", desc: "See age nearest birthday used by LIC" },
];

const FAQ_ITEMS = [
  { q: "What is insurance age?", a: "Insurance age is 'age nearest birthday' — not your actual completed age. LIC rounds your age to the nearest birthday. If you are 6+ months past your last birthday, your insurance age is one year more than your completed age." },
  { q: "Why does insurance age matter?", a: "LIC premium rates increase with age. A higher insurance age means higher premiums. By understanding the cutoff, agents can advise clients to purchase before their insurance age increases." },
  { q: "How is insurance age calculated?", a: "If months since last birthday > 6, insurance age = completed years + 1. Otherwise, insurance age = completed years. Example: If you're 30 years 7 months old, your insurance age is 31." },
  { q: "When does insurance age change?", a: "Insurance age increases 6 months after your birthday. So if your birthday is Jan 15, your insurance age increases on July 15. Acting before this date gets you the lower premium." },
  { q: "Is insurance age the same for all companies?", a: "Most life insurance companies in India use 'age nearest birthday'. However, some general insurance and health insurance use 'age last birthday'. Always check with the specific insurer." },
  { q: "Can I save on premium by applying before age change?", a: "Yes! If you apply just before the 6-month cutoff, you get the lower age bracket. This can save ₹500–₹5,000+ annually depending on the plan and SA." },
];

function calcInsuranceAge(dob, refDate) {
  const d = new Date(dob);
  const r = new Date(refDate);
  if (isNaN(d.getTime()) || isNaN(r.getTime())) return null;
  if (r < d) return null;

  let years = r.getFullYear() - d.getFullYear();
  let months = r.getMonth() - d.getMonth();
  let days = r.getDate() - d.getDate();
  if (days < 0) {
    months--;
    const prev = new Date(r.getFullYear(), r.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalMonths = months;
  const insuranceAge = totalMonths > 6 || (totalMonths === 6 && days > 0) ? years + 1 : years;

  const nextBirthday = new Date(r.getFullYear(), d.getMonth(), d.getDate());
  if (nextBirthday <= r) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  const daysToNextBirthday = Math.ceil((nextBirthday - r) / 86400000);

  const lastBirthday = new Date(nextBirthday);
  lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);

  const ageChangeDate = new Date(lastBirthday);
  ageChangeDate.setMonth(ageChangeDate.getMonth() + 6);
  const nextAgeChange = ageChangeDate <= r
    ? new Date(nextBirthday.getFullYear(), nextBirthday.getMonth() + 6, nextBirthday.getDate())
    : ageChangeDate;
  const daysToAgeChange = Math.ceil((nextAgeChange - r) / 86400000);

  return {
    actualYears: years,
    actualMonths: totalMonths,
    actualDays: days,
    insuranceAge,
    nextBirthday,
    daysToNextBirthday,
    nextAgeChange,
    daysToAgeChange,
    isNearCutoff: daysToAgeChange <= 30 && daysToAgeChange > 0,
  };
}

function fmtDate(d) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function InsuranceAgeCalculator() {
  const today = new Date().toISOString().split("T")[0];
  const [dob, setDob] = useState("1994-06-15");
  const [refDate, setRefDate] = useState(today);

  const result = useMemo(() => calcInsuranceAge(dob, refDate), [dob, refDate]);

  useEffect(() => {
    if (result) trackCalculation('insurance-age', { insuranceAge: result.insuranceAge });
  }, [result]);

  const shareText = result
    ? `Insurance Age Calculator\nDOB: ${dob}\nActual Age: ${result.actualYears} yrs ${result.actualMonths} months\nInsurance Age: ${result.insuranceAge} years\nNext age change: ${fmtDate(result.nextAgeChange)} (${result.daysToAgeChange} days)\n\n— DoAide InsureKit (insure.doaide.com)`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Insurance Age Calculator</h1>
      <p className="text-sm text-white/50 mb-6">
        Calculate age nearest birthday — the age LIC uses for premium calculation. Know when your insurance age increases.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-white/60 mb-1">Date of Birth</label>
          <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Policy / Calculation Date</label>
          <input type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={refDate} onChange={(e) => setRefDate(e.target.value)} />
        </div>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-sm text-white/50 mb-1">Actual Age</p>
              <p className="text-2xl font-bold text-white">{result.actualYears} <span className="text-base font-normal text-white/60">yrs {result.actualMonths} mo {result.actualDays} days</span></p>
            </div>
            <div className="bg-signal/10 border border-signal/30 rounded-xl p-4 text-center">
              <p className="text-sm text-white/50 mb-1">Insurance Age (Nearest Birthday)</p>
              <p className="text-3xl font-bold text-signal">{result.insuranceAge}</p>
              <p className="text-xs text-white/40 mt-1">Used by LIC for premium calculation</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-sm text-white/50 mb-1">Next Birthday</p>
              <p className="text-lg font-semibold text-white">{fmtDate(result.nextBirthday)}</p>
              <p className="text-sm text-white/40">{result.daysToNextBirthday} days away</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Age Change Alert</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/50">Insurance age changes on</p>
                <p className="text-lg font-semibold text-white">{fmtDate(result.nextAgeChange)}</p>
              </div>
              <div>
                <p className="text-sm text-white/50">Days remaining</p>
                <p className={`text-lg font-semibold ${result.daysToAgeChange <= 30 ? "text-red-400" : result.daysToAgeChange <= 90 ? "text-yellow-400" : "text-signal"}`}>
                  {result.daysToAgeChange} days
                </p>
              </div>
            </div>
          </div>

          {result.isNearCutoff && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
              <p className="text-yellow-300 font-semibold text-sm">
                ⚠ Insurance age increases in {result.daysToAgeChange} days! Act now to lock in the lower premium rate.
              </p>
            </div>
          )}

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">How Insurance Age Works</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white/60">Months Since Last Birthday</th>
                    <th className="text-left py-2 text-white/60">Insurance Age</th>
                    <th className="text-left py-2 text-white/60">Example (30 yrs + months)</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/5"><td className="py-2">0–6 months</td><td>Completed years</td><td>30 yrs 4 mo → Age 30</td></tr>
                  <tr className="border-b border-white/5"><td className="py-2">6+ months</td><td>Completed years + 1</td><td>30 yrs 7 mo → Age 31</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <ShareButtons text={shareText} />
            <PrintButton />
          </div>
        </>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
