import { useState, useMemo, useEffect } from "react";
import { formatINR } from "../utils/format";
import ResultCard from "../components/ResultCard";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackCalculation } from "../lib/analytics";

const RIDERS = [
  {
    id: "adb",
    name: "Accidental Death Benefit (ADB)",
    code: "UIN: 512B209V02",
    maxCover: 5000000,
    description: "Additional SA paid on accidental death — over and above the base plan's death benefit",
    rates: { 18: 1.00, 25: 1.00, 30: 1.00, 35: 1.50, 40: 2.00, 45: 2.50, 50: 3.00, 55: 4.00 },
    gstRate: 0.18,
    minAge: 18,
    maxAge: 65,
  },
  {
    id: "term_rider",
    name: "New Term Assurance Rider",
    code: "UIN: 512B210V02",
    maxCover: 2500000,
    description: "Additional term cover on top of base policy — pure risk cover at low cost",
    rates: { 18: 1.50, 25: 1.70, 30: 2.10, 35: 3.00, 40: 4.50, 45: 7.00, 50: 11.00, 55: 17.00 },
    gstRate: 0.18,
    minAge: 18,
    maxAge: 60,
  },
  {
    id: "ci_rider",
    name: "LIC's Critical Illness Rider",
    code: "UIN: 512A211V01",
    maxCover: 2500000,
    description: "Lump sum payout on first diagnosis of any of 15 specified critical illnesses",
    rates: { 18: 1.20, 25: 1.50, 30: 2.20, 35: 3.50, 40: 5.50, 45: 8.50, 50: 13.00 },
    gstRate: 0.18,
    minAge: 18,
    maxAge: 55,
    criticalIllnesses: [
      "Heart Attack (Myocardial Infarction)",
      "Stroke",
      "Cancer of Specified Severity",
      "Kidney Failure (End Stage Renal Disease)",
      "Major Organ Transplant",
      "Coronary Artery Bypass Surgery",
      "Multiple Sclerosis",
      "Aorta Graft Surgery",
      "Primary Pulmonary Hypertension",
      "Paralysis of Limbs",
      "Total Blindness",
      "Third Degree Burns",
      "Motor Neuron Disease",
      "Aplastic Anaemia",
      "Benign Brain Tumour",
    ],
  },
  {
    id: "pwd_rider",
    name: "Premium Waiver Disability Rider",
    code: "UIN: 512B212V01",
    maxCover: null,
    description: "Waives all future premiums if the life assured becomes totally and permanently disabled",
    rates: { 18: 0.50, 25: 0.60, 30: 0.80, 35: 1.20, 40: 1.80, 45: 2.50 },
    gstRate: 0.18,
    minAge: 18,
    maxAge: 50,
  },
];

const HOW_IT_WORKS = [
  { title: "Select rider", desc: "Choose ADB, Term Rider, Critical Illness, or PWD" },
  { title: "Enter details", desc: "Set age, rider cover amount, and payment term" },
  { title: "Get premium", desc: "See rider premium with GST and total cost" },
];

const FAQ_ITEMS = [
  { q: "What are LIC riders?", a: "Riders are optional add-on benefits attached to a base LIC policy. They provide additional coverage at a relatively small extra premium. Common riders include Accidental Death Benefit, Term Rider, Critical Illness, and Premium Waiver." },
  { q: "How much rider cover can I take?", a: "Rider cover is typically limited to the base policy's SA or a fixed maximum (e.g., ₹50L for ADB, ₹25L for CI and Term Rider). Total rider premium generally cannot exceed 30% of the base premium." },
  { q: "Is GST applicable on rider premium?", a: "Yes, GST at 18% is charged on rider premiums. This is different from the base life insurance premium which has 4.5% GST in the first year and 2.25% on renewals." },
  { q: "Can I add riders after taking a policy?", a: "Generally, riders must be chosen at the time of purchasing the policy. Some riders may be added later with LIC's approval and a medical examination, but this is not guaranteed." },
  { q: "Do riders get tax benefit under 80C?", a: "Rider premiums up to 10% of the policy SA may qualify for Section 80C deduction along with the base premium. Critical Illness rider premiums may qualify under Section 80D." },
  { q: "What happens to riders at maturity?", a: "Riders expire at the end of the rider term or the base policy's premium paying term, whichever is earlier. They do not have any maturity value — they are pure protection." },
];

function getRiderRate(rider, age) {
  const ages = Object.keys(rider.rates).map(Number).sort((a, b) => a - b);
  let ageKey = ages[0];
  for (const a of ages) {
    if (a <= age) ageKey = a;
    else break;
  }
  return rider.rates[ageKey];
}

export default function RiderPremiumCalculator() {
  const [riderId, setRiderId] = useState(RIDERS[0].id);
  const [age, setAge] = useState(30);
  const [riderSA, setRiderSA] = useState(1000000);
  const [ppt, setPpt] = useState(20);
  const [basePremium, setBasePremium] = useState(50000);

  const rider = useMemo(() => RIDERS.find((r) => r.id === riderId), [riderId]);

  const result = useMemo(() => {
    if (!rider) return null;
    const rate = getRiderRate(rider, age);
    const annualRiderPremium = Math.round((rate / 1000) * riderSA);
    const gst = Math.round(annualRiderPremium * rider.gstRate);
    const totalWithGST = annualRiderPremium + gst;
    const totalOverTerm = totalWithGST * ppt;
    const combinedPremium = basePremium + totalWithGST;
    const riderPercent = basePremium > 0 ? (totalWithGST / basePremium) * 100 : 0;

    return {
      rate,
      annualRiderPremium,
      gst,
      totalWithGST,
      totalOverTerm,
      combinedPremium,
      riderPercent,
    };
  }, [rider, age, riderSA, ppt, basePremium]);

  useEffect(() => {
    if (result && rider) trackCalculation('rider-premium', { rider: rider.name, age, riderSA });
  }, [result, rider, age, riderSA]);

  const shareText = result && rider
    ? `LIC Rider Premium — ${rider.name}\nAge: ${age}, Cover: ${formatINR(riderSA)}\nRate: ₹${result.rate}/1000\nAnnual Premium: ${formatINR(result.annualRiderPremium)}\nGST (18%): ${formatINR(result.gst)}\nTotal: ${formatINR(result.totalWithGST)}/year\n\n— DoAide InsureKit (insure.doaide.com)`
    : "";

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Rider Premium Calculator</h1>
      <p className="text-sm text-white/50 mb-6">
        Calculate premium for LIC riders — ADB, Term Rider, Critical Illness, and Premium Waiver.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-white/60 mb-1">Rider Type</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={riderId} onChange={(e) => setRiderId(e.target.value)}>
            {RIDERS.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Age</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={age} onChange={(e) => setAge(Number(e.target.value))} min={rider?.minAge || 18} max={rider?.maxAge || 65} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Rider Sum Assured (₹)</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={riderSA} onChange={(e) => setRiderSA(Number(e.target.value))} min={100000} max={rider?.maxCover || 5000000} step={100000} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Premium Payment Term (years)</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={ppt} onChange={(e) => setPpt(Number(e.target.value))} min={5} max={40} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Base Policy Annual Premium (₹)</label>
          <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={basePremium} onChange={(e) => setBasePremium(Number(e.target.value))} min={0} step={1000} />
        </div>
      </div>

      {rider && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">{rider.name}</h3>
          <p className="text-sm text-white/60 mb-2">{rider.code}</p>
          <p className="text-sm text-white/70 mb-3">{rider.description}</p>
          <div className="flex flex-wrap gap-4 text-xs text-white/50">
            <span>Age: {rider.minAge}–{rider.maxAge} years</span>
            {rider.maxCover && <span>Max Cover: {formatINR(rider.maxCover)}</span>}
            <span>GST: {rider.gstRate * 100}%</span>
          </div>
        </div>
      )}

      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <ResultCard title="Rate per ₹1,000" value={`₹${result.rate.toFixed(2)}`} />
            <ResultCard title="Annual Rider Premium" value={formatINR(result.annualRiderPremium)} />
            <ResultCard title="GST (18%)" value={formatINR(result.gst)} />
            <ResultCard title="Total Rider Premium/Year" value={formatINR(result.totalWithGST)} />
            <ResultCard title={`Total Over ${ppt} Years`} value={formatINR(result.totalOverTerm)} />
            <ResultCard title="% of Base Premium" value={`${result.riderPercent.toFixed(1)}%`} />
          </div>

          <div className="bg-signal/10 border border-signal/30 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Combined Premium</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-white/50">Base Policy</p>
                <p className="text-white font-semibold">{formatINR(basePremium)}</p>
              </div>
              <div>
                <p className="text-white/50">+ Rider</p>
                <p className="text-white font-semibold">{formatINR(result.totalWithGST)}</p>
              </div>
              <div>
                <p className="text-white/50">= Total Annual</p>
                <p className="text-signal text-xl font-bold">{formatINR(result.combinedPremium)}</p>
              </div>
            </div>
          </div>

          {rider.criticalIllnesses && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">15 Critical Illnesses Covered</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {rider.criticalIllnesses.map((illness, i) => (
                  <p key={i} className="text-sm text-white/70 py-1">{i + 1}. {illness}</p>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Rate Table — {rider.name}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white/60">Age</th>
                    <th className="text-right py-2 text-white/60">Rate per ₹1,000</th>
                    <th className="text-right py-2 text-white/60">Premium for ₹10L</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  {Object.entries(rider.rates).map(([a, r]) => (
                    <tr key={a} className={`border-b border-white/5 ${Number(a) === age || (Number(a) <= age && !rider.rates[age]) ? "" : ""}`}>
                      <td className="py-2">{a}</td>
                      <td className="text-right">₹{r.toFixed(2)}</td>
                      <td className="text-right">{formatINR(Math.round(r * 1000))}</td>
                    </tr>
                  ))}
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
