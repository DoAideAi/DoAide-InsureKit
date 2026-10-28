import { useState, useMemo, useEffect } from "react";
import { formatINR } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackCalculation } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Enter your details", desc: "Age, gender, smoker status, and health" },
  { title: "Set coverage & term", desc: "Choose sum assured and policy term" },
  { title: "Get premium estimates", desc: "See estimated premiums across insurers" },
];

const FAQ_ITEMS = [
  { q: "How accurate are these premium estimates?", a: "These are indicative estimates based on publicly available premium rate patterns. Actual premiums may vary by ±10-15% depending on medical history, occupation, BMI, and insurer-specific underwriting. Always get a formal quote from the insurer." },
  { q: "Why does age affect premium so much?", a: "Insurance premium is based on mortality risk, which increases exponentially with age. A 40-year-old pays roughly 2-3× more than a 25-year-old for the same cover. This is why buying early locks in lower premiums for the entire term." },
  { q: "What is the cheapest type of insurance?", a: "Pure term insurance is the cheapest — it provides only death benefit with no maturity payout. Endowment plans cost 10-15× more for the same cover because they include a savings component. TROP (Term Return of Premium) plans are 2-3× more than pure term." },
  { q: "Does smoking affect insurance premium?", a: "Yes, significantly. Smokers pay 40-80% higher premiums than non-smokers for term insurance. Some insurers define 'smoker' as any tobacco use in the last 12 months, including chewing tobacco and e-cigarettes." },
];

const INSURANCE_TYPES = [
  { id: "term", label: "Term Insurance", desc: "Pure protection, lowest premium" },
  { id: "endowment", label: "Endowment Plan", desc: "Savings + protection" },
  { id: "wholeLife", label: "Whole Life Plan", desc: "Lifelong cover + bonus" },
];

const INSURERS = [
  { name: "LIC of India", csr: "98.6%", badge: "Government-backed" },
  { name: "HDFC Life", csr: "98.0%", badge: "Lowest premium" },
  { name: "Max Life", csr: "99.5%", badge: "Highest CSR" },
  { name: "ICICI Prudential", csr: "97.8%", badge: "" },
  { name: "SBI Life", csr: "97.3%", badge: "" },
  { name: "Tata AIA", csr: "99.1%", badge: "" },
];

function estimatePremium(type, age, sa, term, isSmoker, isFemale) {
  const saLakh = sa / 100000;

  let basePer1000;
  if (type === "term") {
    basePer1000 = 0.8 + (age - 18) * 0.12 + Math.pow(Math.max(0, age - 35), 2) * 0.005;
    if (isSmoker) basePer1000 *= 1.6;
    if (isFemale) basePer1000 *= 0.85;
    if (term > 30) basePer1000 *= 1.1;
    else if (term < 15) basePer1000 *= 0.9;
  } else if (type === "endowment") {
    basePer1000 = 35 + (age - 18) * 1.5 + Math.pow(Math.max(0, age - 30), 2) * 0.08;
    if (term <= 15) basePer1000 *= 1.3;
    else if (term >= 25) basePer1000 *= 0.8;
  } else {
    basePer1000 = 42 + (age - 18) * 1.8 + Math.pow(Math.max(0, age - 30), 2) * 0.1;
    if (term <= 20) basePer1000 *= 1.15;
  }

  if (saLakh >= 100) basePer1000 *= 0.92;
  else if (saLakh >= 50) basePer1000 *= 0.95;
  else if (saLakh >= 10) basePer1000 *= 0.97;

  const annualBase = (basePer1000 / 1000) * sa;
  const gst = type === "term" ? annualBase * 0.18 : annualBase * 0.045;

  const variations = INSURERS.map((ins, idx) => {
    let factor = 1;
    if (type === "term") {
      if (idx === 0) factor = 1.12;
      else if (idx === 1) factor = 0.92;
      else if (idx === 2) factor = 0.95;
      else if (idx === 3) factor = 0.94;
      else if (idx === 4) factor = 0.97;
      else factor = 0.93;
    } else {
      if (idx === 0) factor = 1.0;
      else factor = 0.95 + idx * 0.02;
    }
    const premium = Math.round(annualBase * factor);
    const withGst = Math.round(premium + (type === "term" ? premium * 0.18 : premium * 0.045));
    return { ...ins, premium, withGst };
  });

  variations.sort((a, b) => a.withGst - b.withGst);

  return { annualBase: Math.round(annualBase), gst: Math.round(gst), total: Math.round(annualBase + gst), variations };
}

export default function InsurancePremiumEstimator() {
  const [type, setType] = useState("term");
  const [age, setAge] = useState(30);
  const [sa, setSa] = useState(10000000);
  const [term, setTerm] = useState(30);
  const [isSmoker, setIsSmoker] = useState(false);
  const [isFemale, setIsFemale] = useState(false);

  const result = useMemo(() => estimatePremium(type, age, sa, term, isSmoker, isFemale), [type, age, sa, term, isSmoker, isFemale]);

  useEffect(() => {
    if (result) trackCalculation('premium-estimator', { type, age, term });
  }, [result, type, age, term]);

  const shareText = `Insurance Premium Estimate\nType: ${INSURANCE_TYPES.find(t => t.id === type)?.label}\nAge: ${age}, Cover: ${formatINR(sa)}, Term: ${term} years\nEstimated Annual Premium: ${formatINR(result.total)} (incl. GST)\n\nCalculated on InsureKit — insure.doaide.com/tools/premium-estimator`;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Insurance Premium Estimator</h1>
      <p className="text-white/40 text-sm mb-6">Estimate premiums across insurers based on age, coverage, and term</p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs text-white/40 mb-1">Insurance Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
            {INSURANCE_TYPES.map(t => <option key={t.id} value={t.id}>{t.label} — {t.desc}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">Age (years)</label>
          <input type="number" min={18} max={65} value={age} onChange={(e) => setAge(Math.min(65, Math.max(18, +e.target.value)))} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">Sum Assured (₹)</label>
          <select value={sa} onChange={(e) => setSa(+e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
            <option value={500000}>₹5 Lakh</option>
            <option value={1000000}>₹10 Lakh</option>
            <option value={2500000}>₹25 Lakh</option>
            <option value={5000000}>₹50 Lakh</option>
            <option value={7500000}>₹75 Lakh</option>
            <option value={10000000}>₹1 Crore</option>
            <option value={15000000}>₹1.5 Crore</option>
            <option value={20000000}>₹2 Crore</option>
            <option value={30000000}>₹3 Crore</option>
            <option value={50000000}>₹5 Crore</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1">Policy Term (years)</label>
          <input type="number" min={5} max={40} value={term} onChange={(e) => setTerm(Math.min(40, Math.max(5, +e.target.value)))} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
        </div>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isFemale} onChange={(e) => setIsFemale(e.target.checked)} className="accent-[var(--signal)]" />
          <span className="text-sm text-white/60">Female</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={isSmoker} onChange={(e) => setIsSmoker(e.target.checked)} className="accent-[var(--signal)]" />
          <span className="text-sm text-white/60">Smoker / Tobacco user</span>
        </label>
      </div>

      <div className="panel p-5 mb-6">
        <div className="text-xs text-white/40 uppercase tracking-wide mb-2">Estimated Annual Premium</div>
        <div className="text-3xl font-bold text-signal mb-1">{formatINR(result.total)}</div>
        <div className="text-xs text-white/40">
          Base: {formatINR(result.annualBase)} + GST: {formatINR(result.gst)} &middot; {INSURANCE_TYPES.find(t => t.id === type)?.label} &middot; {formatINR(sa)} cover &middot; {term} years
        </div>
        <div className="text-xs text-white/30 mt-1">Monthly: ~{formatINR(Math.round(result.total / 12))}/month</div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-3">Premium Comparison Across Insurers</h2>
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-3 text-white/50 text-xs uppercase">Insurer</th>
                  <th className="text-center py-3 px-3 text-white/50 text-xs uppercase">CSR</th>
                  <th className="text-right py-3 px-3 text-white/50 text-xs uppercase">Annual Premium</th>
                  <th className="text-right py-3 px-3 text-white/50 text-xs uppercase">Monthly</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                {result.variations.map((v, i) => (
                  <tr key={v.name} className={`border-t border-white/5 ${i === 0 ? "bg-signal/5" : ""}`}>
                    <td className="py-2.5 px-3">
                      <div className="text-white/80 font-medium">{v.name}</div>
                      {v.badge && <span className="text-[10px] text-signal">{v.badge}</span>}
                    </td>
                    <td className="py-2.5 px-3 text-center">{v.csr}</td>
                    <td className="py-2.5 px-3 text-right font-semibold">{i === 0 ? <span className="text-signal">{formatINR(v.withGst)}</span> : formatINR(v.withGst)}</td>
                    <td className="py-2.5 px-3 text-right text-white/40">~{formatINR(Math.round(v.withGst / 12))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-[10px] text-white/25 mt-2">* Premiums are indicative estimates. Actual premiums depend on medical underwriting, occupation, and insurer-specific factors. Get formal quotes for exact pricing.</p>
      </div>

      {type === "term" && (
        <div className="panel-inner p-4 mb-6">
          <h3 className="text-sm font-semibold text-white mb-2">Premium Saving Tips</h3>
          <ul className="text-xs text-white/50 space-y-1 list-disc pl-4">
            <li>Buy online — saves 10-25% vs offline purchase (no agent commission)</li>
            <li>Choose yearly payment mode for lowest effective cost</li>
            <li>Buy before your next birthday — insurance age increase raises premium</li>
            <li>Quit smoking 12 months before applying for non-smoker rates</li>
            <li>Maintain healthy BMI — some insurers offer wellness discounts</li>
          </ul>
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap mb-8">
        <ShareButtons text={shareText} />
        <PrintButton />
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
