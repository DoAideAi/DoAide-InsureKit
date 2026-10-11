import { useState, useMemo } from "react";
import { CSR_DATA } from "../data/claimSettlementData";
import { formatPercent } from "../utils/format";
import ShareButtons from "../components/ShareButtons";
import PrintButton from "../components/PrintButton";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";

const HOW_IT_WORKS = [
  { title: "Browse all insurers", desc: "See IRDAI-reported CSR for 20+ life insurance companies" },
  { title: "Sort & compare", desc: "Sort by individual or group CSR to find the best" },
  { title: "Make an informed choice", desc: "Higher CSR means better claim settlement track record" },
];

const FAQ_ITEMS = [
  { q: "What is Claim Settlement Ratio (CSR)?", a: "CSR is the percentage of claims settled by an insurance company out of total claims received in a financial year. A higher CSR means the insurer is more likely to honour your claim. IRDAI publishes this data annually." },
  { q: "What is a good CSR?", a: "A CSR above 95% is considered good. Most top Indian insurers have CSR above 97%. LIC and several private insurers like Max Life, Tata AIA, and Aegon consistently maintain CSR above 98%." },
  { q: "What is the difference between individual and group CSR?", a: "Individual CSR covers retail policies (bought by individuals). Group CSR covers group insurance policies (employer/bank-sponsored). Group CSR is usually higher because group policies have simpler claim processes." },
  { q: "Should I choose a company based only on CSR?", a: "CSR is an important factor but not the only one. Also consider: premium rates, plan features, claim process ease, company financial strength (solvency ratio), and customer service quality." },
  { q: "Where does this data come from?", a: "This data is sourced from IRDAI's (Insurance Regulatory and Development Authority of India) annual reports. The data shown is for FY 2023-24. Always verify the latest data from IRDAI's official publications." },
  { q: "Why is LIC's CSR different from private insurers?", a: "LIC, as the largest public insurer, processes millions of claims yearly. Its CSR of 98.74% is impressive given the sheer volume. Some private insurers with smaller portfolios may have slightly higher CSRs but process far fewer claims." },
];

const SORT_OPTIONS = [
  { key: "csrIndividual", label: "Individual CSR" },
  { key: "csrGroup", label: "Group CSR" },
  { key: "name", label: "Name" },
];

const FILTER_OPTIONS = [
  { key: "all", label: "All" },
  { key: "Public", label: "Public" },
  { key: "Private", label: "Private" },
];

function getCsrColor(csr) {
  if (csr >= 99) return "text-good";
  if (csr >= 98) return "text-signal";
  if (csr >= 97) return "text-warn";
  return "text-bad";
}

function getCsrBarWidth(csr) {
  return `${Math.max(0, (csr - 90) * 10)}%`;
}

export default function ClaimSettlementRatio() {
  const [sortBy, setSortBy] = useState("csrIndividual");
  const [sortDir, setSortDir] = useState("desc");
  const [filterType, setFilterType] = useState("all");
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const filtered = useMemo(() => {
    let data = [...CSR_DATA];
    if (filterType !== "all") data = data.filter((d) => d.type === filterType);
    data.sort((a, b) => {
      if (sortBy === "name") return sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      return sortDir === "desc" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy];
    });
    return data;
  }, [sortBy, sortDir, filterType]);

  const avgCSR = useMemo(() => {
    const avg = filtered.reduce((sum, d) => sum + d.csrIndividual, 0) / filtered.length;
    return avg.toFixed(2);
  }, [filtered]);

  const topCSR = useMemo(() => {
    return [...filtered].sort((a, b) => b.csrIndividual - a.csrIndividual)[0];
  }, [filtered]);

  const toggleCompare = (name) => {
    setSelectedCompanies((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : prev.length < 3 ? [...prev, name] : prev,
    );
  };

  const compareData = useMemo(
    () => CSR_DATA.filter((d) => selectedCompanies.includes(d.name)),
    [selectedCompanies],
  );

  const shareText = `Claim Settlement Ratios (FY 2023-24)\n\nTop 5 by Individual CSR:\n${[...CSR_DATA]
    .sort((a, b) => b.csrIndividual - a.csrIndividual)
    .slice(0, 5)
    .map((d, i) => `${i + 1}. ${d.short}: ${d.csrIndividual}%`)
    .join("\n")}\n\nCompare all insurers on DoAide InsureKit — insure.doaide.com/claim-settlement-ratio`;

  const toggleSort = (key) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortBy(key);
      setSortDir("desc");
    }
  };

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Claim Settlement Ratio — All Insurers</h1>
      <p className="text-white/40 text-sm mb-6">
        Compare IRDAI claim settlement ratios for 20+ life insurance companies (FY 2023-24)
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="stat-card">
          <div className="label">Companies</div>
          <div className="value">{filtered.length}</div>
        </div>
        <div className="stat-card">
          <div className="label">Average CSR</div>
          <div className="value accent">{avgCSR}%</div>
        </div>
        <div className="stat-card">
          <div className="label">Highest CSR</div>
          <div className="value">{topCSR ? `${topCSR.short} — ${topCSR.csrIndividual}%` : "-"}</div>
        </div>
      </div>

      <div className="panel p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-xs text-white/40 mb-1 uppercase tracking-wide">Filter</label>
            <div className="flex gap-1">
              {FILTER_OPTIONS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterType(f.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filterType === f.key ? "bg-signal text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1 uppercase tracking-wide">Sort By</label>
            <div className="flex gap-1">
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => toggleSort(s.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    sortBy === s.key ? "bg-signal text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
                  }`}
                >
                  {s.label} {sortBy === s.key && (sortDir === "desc" ? "↓" : "↑")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="panel mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-wide">
              <th className="text-left py-3 px-3">#</th>
              <th className="text-left py-3 px-3">Insurer</th>
              <th className="text-left py-3 px-3">Type</th>
              <th className="text-right py-3 px-3 cursor-pointer hover:text-white" onClick={() => toggleSort("csrIndividual")}>
                Individual CSR {sortBy === "csrIndividual" && (sortDir === "desc" ? "↓" : "↑")}
              </th>
              <th className="text-right py-3 px-3 cursor-pointer hover:text-white" onClick={() => toggleSort("csrGroup")}>
                Group CSR {sortBy === "csrGroup" && (sortDir === "desc" ? "↓" : "↑")}
              </th>
              <th className="text-center py-3 px-3">Compare</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr key={d.name} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${selectedCompanies.includes(d.name) ? "bg-signal/5" : ""}`}>
                <td className="py-2.5 px-3 text-white/30">{i + 1}</td>
                <td className="py-2.5 px-3">
                  <div className="text-white font-medium">{d.short}</div>
                  <div className="text-[10px] text-white/25">{d.name}</div>
                </td>
                <td className="py-2.5 px-3">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${d.type === "Public" ? "bg-signal/15 text-signal" : "bg-white/10 text-white/40"}`}>
                    {d.type}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                      <div className="h-full bg-signal rounded-full" style={{ width: getCsrBarWidth(d.csrIndividual) }} />
                    </div>
                    <span className={`font-medium ${getCsrColor(d.csrIndividual)}`}>{d.csrIndividual}%</span>
                  </div>
                </td>
                <td className={`py-2.5 px-3 text-right font-medium ${getCsrColor(d.csrGroup)}`}>{d.csrGroup}%</td>
                <td className="py-2.5 px-3 text-center">
                  <button
                    onClick={() => toggleCompare(d.name)}
                    className={`w-6 h-6 rounded text-xs font-bold transition-all ${
                      selectedCompanies.includes(d.name) ? "bg-signal text-white" : "bg-white/10 text-white/30 hover:bg-white/20"
                    }`}
                  >
                    {selectedCompanies.includes(d.name) ? "✓" : "+"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {compareData.length >= 2 && (
        <div className="panel p-5 mb-6 border-signal/30 animate-fade-up">
          <h3 className="text-sm font-semibold text-white mb-4">Comparison — {compareData.map((d) => d.short).join(" vs ")}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs text-white/40 uppercase tracking-wide">
                  <th className="text-left py-2 px-3">Metric</th>
                  {compareData.map((d) => (
                    <th key={d.name} className="text-right py-2 px-3">{d.short}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 px-3 text-white/50">Individual CSR</td>
                  {compareData.map((d) => (
                    <td key={d.name} className={`py-2 px-3 text-right font-medium ${getCsrColor(d.csrIndividual)}`}>{d.csrIndividual}%</td>
                  ))}
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 px-3 text-white/50">Group CSR</td>
                  {compareData.map((d) => (
                    <td key={d.name} className={`py-2 px-3 text-right font-medium ${getCsrColor(d.csrGroup)}`}>{d.csrGroup}%</td>
                  ))}
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 px-3 text-white/50">Claims Settled</td>
                  {compareData.map((d) => (
                    <td key={d.name} className="py-2 px-3 text-right text-white/70">{d.claimsSettled.toLocaleString("en-IN")}</td>
                  ))}
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 px-3 text-white/50">Claims Pending</td>
                  {compareData.map((d) => (
                    <td key={d.name} className="py-2 px-3 text-right text-white/70">{d.claimsPending.toLocaleString("en-IN")}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 px-3 text-white/50">Type</td>
                  {compareData.map((d) => (
                    <td key={d.name} className="py-2 px-3 text-right text-white/70">{d.type}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="panel-inner p-3 mb-6 text-xs text-white/30">
        <p>Data source: IRDAI Annual Report FY 2023-24. CSR = (Claims Settled / Claims Received) x 100. Individual CSR covers retail policies; Group CSR covers employer/bank-sponsored group policies. Select up to 3 companies to compare.</p>
      </div>

      <div className="flex justify-end gap-2 mb-6">
        <PrintButton />
        <ShareButtons text={shareText} />
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
