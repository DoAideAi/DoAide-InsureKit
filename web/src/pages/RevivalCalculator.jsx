import { useState, useMemo, useEffect } from "react";
import { MODE_LABELS } from "../data/licPlans";
import { calculateRevival } from "../utils/calcRevival";
import { formatINR, formatPercent } from "../utils/format";
import ResultCard from "../components/ResultCard";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackCalculation } from "../lib/analytics";


const HOW_IT_WORKS = [
  { title: "Enter premium", desc: "Annual premium amount and payment mode" },
  { title: "Set lapse period", desc: "How many months since last premium paid" },
  { title: "Get revival cost", desc: "See arrears, interest, GST, and total amount" },
];

const FAQ_ITEMS = [
  { q: "What is policy revival?", a: "Revival is the process of restoring a lapsed LIC policy. A policy lapses when premiums are not paid within the grace period (30 days for yearly/half-yearly, 15 days for quarterly/monthly). You can revive it by paying all arrears with interest." },
  { q: "How long do I have to revive a lapsed policy?", a: "LIC allows revival within 5 years from the date of the first unpaid premium, subject to conditions. Beyond 2 years, a medical examination is typically required." },
  { q: "What is the interest rate on revival?", a: "LIC charges interest at approximately 9.25% p.a. on the arrears of premiums. The exact rate may vary based on current LIC guidelines." },
  { q: "Do I need a medical test for revival?", a: "If the policy has been lapsed for more than 2 years (24 months), a medical examination is generally required. For policies lapsed less than 2 years, revival can often be done without medical tests." },
  { q: "Can I revive a surrendered policy?", a: "No. Once a policy is surrendered (surrender value paid out), it cannot be revived. Revival is only possible for lapsed policies where no surrender value has been claimed." },
  { q: "Is GST charged on revival premiums?", a: "Yes, GST at the renewal rate (2.25%) is applicable on the arrears of premiums paid during revival." },
];

export default function RevivalCalculator() {
  const [annualPremium, setAnnualPremium] = useState(50000);
  const [mode, setMode] = useState("yearly");
  const [lapsedMonths, setLapsedMonths] = useState(12);
  const [sumAssured, setSumAssured] = useState(1000000);

  const result = useMemo(
    () => calculateRevival(annualPremium, mode, lapsedMonths, sumAssured),
    [annualPremium, mode, lapsedMonths, sumAssured],
  );

  useEffect(() => {
    if (result) trackCalculation('revival', { lapsedMonths, mode });
  }, [result, lapsedMonths, mode]);

  const shareText = result
    ? `LIC Policy Revival Estimate\nAnnual Premium: ${formatINR(annualPremium)}\nLapsed: ${lapsedMonths} months\nArrears: ${formatINR(result.totalArrears)}\nInterest: ${formatINR(result.interest)}\nGST: ${formatINR(result.gstOnArrears)}\nTotal Revival Amount: ${formatINR(result.totalRevivalAmount)}\n${result.medicalNote}\n\nCalculated on DoAide InsureKit — insure.doaide.com`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">LIC Revival Calculator</h1>
      <p className="text-white/40 text-sm mb-6">
        Estimate the amount needed to revive a lapsed LIC policy
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
              Annual Premium (₹)
            </label>
            <input
              type="number"
              className="input-field"
              min={1000}
              step={1000}
              value={annualPremium}
              onChange={(e) => setAnnualPremium(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
              Sum Assured (₹)
            </label>
            <input
              type="number"
              className="input-field"
              min={100000}
              step={100000}
              value={sumAssured}
              onChange={(e) => setSumAssured(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
              Months Lapsed
            </label>
            <input
              type="number"
              className="input-field"
              min={1}
              max={60}
              value={lapsedMonths}
              onChange={(e) => setLapsedMonths(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
              Payment Mode
            </label>
            <select
              className="select-field"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              {Object.entries(MODE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {result && (
        <div className="animate-fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <ResultCard
              label="Missed Instalments"
              value={result.missedInstalments}
              sub={`${formatINR(result.premiumPerInstalment)} each`}
            />
            <ResultCard
              label="Total Arrears"
              value={formatINR(result.totalArrears)}
            />
            <ResultCard
              label={`Interest (${formatPercent(result.interestRate)})`}
              value={formatINR(result.interest)}
            />
            <ResultCard
              label="Total Revival Amount"
              value={formatINR(result.totalRevivalAmount)}
              accent
            />
          </div>

          <div className="panel-inner p-4 mb-4">
            <div className="text-xs text-white/40 mb-2 uppercase tracking-wide">Breakdown</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Arrears ({result.missedInstalments} × {formatINR(result.premiumPerInstalment)})</span>
                <span className="text-white font-medium">{formatINR(result.totalArrears)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Interest @ {formatPercent(result.interestRate)} p.a.</span>
                <span className="text-white font-medium">{formatINR(result.interest)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">GST on arrears (2.25%)</span>
                <span className="text-white font-medium">{formatINR(result.gstOnArrears)}</span>
              </div>
              {result.lateFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-white/50">Late fee</span>
                  <span className="text-white font-medium">{formatINR(result.lateFee)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-white/70 font-medium">Total Payable</span>
                <span className="text-signal font-bold">{formatINR(result.totalRevivalAmount)}</span>
              </div>
            </div>
          </div>

          <div className={`panel p-4 mb-6 border-l-4 ${result.medicalRequired ? "border-l-warn" : "border-l-good"}`}>
            <div className="text-sm font-medium text-white mb-1">
              Medical Requirement
            </div>
            <div className={`text-sm ${result.medicalRequired ? "text-warn" : "text-good"}`}>
              {result.medicalNote}
            </div>
          </div>

          <div className="panel-inner p-3 mb-4 text-xs text-white/30">
            <p>Revival amount is approximate. Actual amount may vary based on LIC's current guidelines, policy type, and revival scheme in effect.</p>
            <p className="mt-1">Revival must be done within 5 years of first unpaid premium. Contact your LIC branch for exact revival requirements.</p>
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
