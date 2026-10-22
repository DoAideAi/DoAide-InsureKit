import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { compareUlipVsMf, DEFAULT_ULIP_CHARGES } from "../utils/calcUlipVsMf";
import { formatINR } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";

const HOW_IT_WORKS = [
  { title: "Enter the monthly amount", desc: "Same outlay goes into a ULIP and a mutual fund" },
  { title: "Adjust real charges", desc: "Allocation, admin, FMC, mortality vs expense ratio" },
  { title: "Compare post-tax corpus", desc: "10(10D) vs equity LTCG — share the honest answer" },
];

const FAQ_ITEMS = [
  { q: "Is ULIP better than mutual fund?", a: "It depends on charges, tenure and tax. ULIPs bundle insurance and investing with allocation/admin/mortality charges but maturity is tax-free under 10(10D) if annual premium is ≤ ₹2.5 lakh. Mutual funds have lower costs but equity LTCG above ₹1.25 lakh is taxed at 12.5%. This calculator runs both with your numbers." },
  { q: "What charges does a ULIP have?", a: "Premium allocation charge (higher in year 1), policy administration charge, fund management charge (capped at 1.35% by IRDAI), and mortality charge for the life cover. Online ULIPs like LIC's SIIP have much lower allocation charges than offline plans." },
  { q: "Is ULIP maturity tax-free?", a: "Yes, under Section 10(10D) — but only if the total annual premium is ₹2.5 lakh or less (for policies issued after 1 Feb 2021). Above that, gains are taxed like equity capital gains." },
  { q: "What is the 5-year ULIP lock-in?", a: "ULIPs cannot be surrendered or withdrawn in the first 5 years. Mutual funds (except ELSS, 3 years) have no lock-in. Factor liquidity into the decision, not just returns." },
  { q: "Does the comparison include life cover?", a: "Yes — the ULIP side pays mortality charges for built-in cover. For a fair fight, the mutual fund side can deduct a term insurance premium from the investable amount (set 'Term premium' below)." },
];

export default function UlipVsMutualFundCalculator() {
  const [form, setForm] = useState({
    monthlyInvestment: 10000,
    years: 15,
    grossReturnPercent: 12,
    mfExpenseRatioPercent: 1.0,
    termPremiumYearly: 0,
  });
  const [charges, setCharges] = useState({ ...DEFAULT_ULIP_CHARGES });
  const [showCharges, setShowCharges] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: Number(e.target.value) });
  const setCharge = (key) => (e) => setCharges({ ...charges, [key]: Number(e.target.value) });

  const result = useMemo(
    () => compareUlipVsMf({ ...form, ulipCharges: charges }),
    [form, charges]
  );

  const { ulip, mf } = result;
  const milestoneYears = [5, 10, 15, 20, 25, 30].filter((y) => y <= form.years);
  if (!milestoneYears.includes(form.years)) milestoneYears.push(form.years);

  const shareText = `\u{2696} ULIP vs Mutual Fund (${formatINR(form.monthlyInvestment)}/month, ${form.years} yrs @ ${form.grossReturnPercent}%)\n\nULIP corpus (post-tax): ${formatINR(ulip.postTax)}\nMutual fund (post-tax): ${formatINR(mf.postTax)}\nDifference: ${formatINR(Math.abs(result.diff))} in favour of ${result.winner === "mf" ? "mutual fund" : "ULIP"}\n\nRun your own numbers free \u{2014} DoAide InsureKit`;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">ULIP vs Mutual Fund Calculator</h1>
      <p className="text-white/40 text-sm mb-6">
        Honest, charge-by-charge comparison of a ULIP against a mutual fund SIP — including tax at exit
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="text-sm font-medium text-white mb-3">Investment Details</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Monthly Investment (₹)</label>
            <input type="number" className="input-field" min={1000} step={1000} value={form.monthlyInvestment} onChange={set("monthlyInvestment")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Tenure (Years)</label>
            <input type="number" className="input-field" min={5} max={30} value={form.years} onChange={set("years")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Expected Return (%)</label>
            <input type="number" className="input-field" min={4} max={18} step={0.5} value={form.grossReturnPercent} onChange={set("grossReturnPercent")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">MF Expense Ratio (%)</label>
            <input type="number" className="input-field" min={0} max={2.5} step={0.05} value={form.mfExpenseRatioPercent} onChange={set("mfExpenseRatioPercent")} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Term Premium (₹/yr, MF side)</label>
            <input type="number" className="input-field" min={0} step={1000} value={form.termPremiumYearly} onChange={set("termPremiumYearly")} />
          </div>
        </div>
      </div>

      <button onClick={() => setShowCharges(!showCharges)} className="text-xs text-signal mb-4 bg-transparent border-0 cursor-pointer p-0">
        {showCharges ? "▾ Hide" : "▸ Edit"} ULIP charges (allocation {charges.allocationYear1Percent}% yr-1, admin {formatINR(charges.policyAdminYearly)}/yr, FMC {charges.fmcPercent}%)
      </button>

      {showCharges && (
        <div className="panel p-5 mb-6">
          <div className="text-sm font-medium text-white mb-3">ULIP Charges</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Allocation Yr 1 (%)</label>
              <input type="number" className="input-field" min={0} max={15} step={0.5} value={charges.allocationYear1Percent} onChange={setCharge("allocationYear1Percent")} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Allocation Yr 2+ (%)</label>
              <input type="number" className="input-field" min={0} max={10} step={0.5} value={charges.allocationLaterPercent} onChange={setCharge("allocationLaterPercent")} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Admin Charge (₹/yr)</label>
              <input type="number" className="input-field" min={0} step={500} value={charges.policyAdminYearly} onChange={setCharge("policyAdminYearly")} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">FMC (%)</label>
              <input type="number" className="input-field" min={0} max={1.35} step={0.05} value={charges.fmcPercent} onChange={setCharge("fmcPercent")} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Mortality (% of fund/yr)</label>
              <input type="number" className="input-field" min={0} max={2} step={0.05} value={charges.mortalityPercentOfFund} onChange={setCharge("mortalityPercentOfFund")} />
            </div>
          </div>
          <div className="mt-3 text-xs text-white/30">
            Tip: for LIC SIIP (online), set allocation charges to 0 and admin to ~₹1,200/yr — online ULIPs are far cheaper than offline ones.
          </div>
        </div>
      )}

      <div className="panel p-5 mb-6 border-l-4 border-l-signal">
        <div className="text-sm font-medium text-white mb-4">Post-Tax Corpus After {form.years} Years</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-white/10 px-3 py-2 bg-white/5 text-left">Parameter</th>
                <th className="border border-white/10 px-3 py-2 bg-signal/10 text-right text-signal">ULIP</th>
                <th className="border border-white/10 px-3 py-2 bg-white/5 text-right">Mutual Fund{form.termPremiumYearly > 0 ? " + Term" : ""}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-white/10 px-3 py-2 text-white/60">Total Invested</td>
                <td className="border border-white/10 px-3 py-2 text-right text-white/80">{formatINR(ulip.totalInvested)}</td>
                <td className="border border-white/10 px-3 py-2 text-right text-white/80">{formatINR(mf.totalInvested)}</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-3 py-2 text-white/60">Corpus Before Tax</td>
                <td className="border border-white/10 px-3 py-2 text-right text-white/80">{formatINR(ulip.maturity)}</td>
                <td className="border border-white/10 px-3 py-2 text-right text-white/80">{formatINR(mf.maturity)}</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-3 py-2 text-white/60">Tax at Exit</td>
                <td className="border border-white/10 px-3 py-2 text-right text-good">{ulip.taxFree ? "Nil — 10(10D)" : formatINR(ulip.tax)}</td>
                <td className="border border-white/10 px-3 py-2 text-right text-bad">{formatINR(mf.tax)} (LTCG 12.5%)</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-3 py-2 text-white font-medium">Post-Tax Corpus</td>
                <td className={`border border-white/10 px-3 py-2 text-right font-bold ${result.winner === "ulip" ? "text-good" : "text-white/80"}`}>{formatINR(ulip.postTax)}</td>
                <td className={`border border-white/10 px-3 py-2 text-right font-bold ${result.winner === "mf" ? "text-good" : "text-white/80"}`}>{formatINR(mf.postTax)}</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-3 py-2 text-white/60">Built-in Life Cover</td>
                <td className="border border-white/10 px-3 py-2 text-right text-good">Yes</td>
                <td className="border border-white/10 px-3 py-2 text-right text-white/40">{form.termPremiumYearly > 0 ? "Via term plan" : "None"}</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-3 py-2 text-white/60">Lock-in</td>
                <td className="border border-white/10 px-3 py-2 text-right text-white/40">5 years</td>
                <td className="border border-white/10 px-3 py-2 text-right text-white/40">None (ELSS: 3 yrs)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 rounded-lg bg-signal/5 border border-signal/10 text-xs text-signal/80">
          {result.winner === "tie"
            ? "Dead heat with these assumptions — decide on liquidity and cover, not corpus."
            : `${result.winner === "mf" ? "Mutual fund" : "ULIP"} ends ${formatINR(Math.abs(result.diff))} ahead post-tax with these assumptions. ${result.winner === "ulip" ? "The 10(10D) tax exemption and low online charges tip it." : "Lower charges outweigh the ULIP's tax break here — but the ULIP still bundles life cover and discipline."}`}
        </div>
      </div>

      {/* Year-wise growth */}
      <div className="panel p-5 mb-6">
        <div className="text-sm font-medium text-white mb-3">Growth Milestones</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border border-white/10 px-3 py-2 bg-white/5 text-left">Year</th>
                <th className="border border-white/10 px-3 py-2 bg-white/5 text-right">ULIP Fund</th>
                <th className="border border-white/10 px-3 py-2 bg-white/5 text-right">MF Corpus</th>
              </tr>
            </thead>
            <tbody>
              {milestoneYears.map((y) => (
                <tr key={y}>
                  <td className="border border-white/10 px-3 py-2 text-white/60">{y}</td>
                  <td className="border border-white/10 px-3 py-2 text-right text-white/80">{formatINR(ulip.rows[y - 1]?.fund || 0)}</td>
                  <td className="border border-white/10 px-3 py-2 text-right text-white/80">{formatINR(mf.rows[y - 1]?.fund || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-white/30">
          Deep dive: read the <Link to="/guides/ulip-vs-mutual-fund" className="text-signal">ULIP vs Mutual Fund guide</Link> or compare <Link to="/sip-vs-insurance" className="text-signal">SIP vs endowment insurance</Link>.
        </div>
      </div>

      <div className="flex items-center gap-3 print:hidden mb-6">
        <PrintButton />
        <ShareButtons text={shareText} toolName="ULIP vs Mutual Fund Calculator" />
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
