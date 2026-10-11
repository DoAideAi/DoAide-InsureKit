import { useState, useMemo } from "react";
import { LIC_PLANS, MODE_LABELS, MODE_FACTORS } from "../data/licPlans";
import { calculatePremium } from "../utils/calcPremium";
import { formatINR } from "../utils/format";

const selectablePlans = LIC_PLANS.filter(
  (p) => Object.keys(p.premiumRates).length > 0 || p.fixedPremium,
);

const s = {
  page: {
    display: "flex", flexDirection: "column", minHeight: "100vh",
    background: "#0a0a0b", color: "rgba(255,255,255,0.85)",
    fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14, boxSizing: "border-box",
  },
  header: {
    padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)",
    fontWeight: 600, fontSize: 15, color: "#fff",
  },
  body: { flex: 1, padding: 16 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  label: {
    display: "block", fontSize: 11, color: "rgba(255,255,255,0.4)",
    marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em",
  },
  select: {
    width: "100%", padding: "8px 10px", background: "#16161a", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 6, color: "#fff", fontSize: 14, outline: "none",
  },
  input: {
    width: "100%", padding: "8px 10px", background: "#16161a", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 6, color: "#fff", fontSize: 14, outline: "none",
  },
  row: {
    display: "flex", justifyContent: "space-between", padding: "6px 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 13,
  },
  total: { fontWeight: 700, fontSize: 15, color: "#0D9488", borderBottom: "none", paddingTop: 8 },
  powered: {
    display: "block", textAlign: "center", padding: "8px 16px",
    borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 12,
    color: "rgba(255,255,255,0.4)", textDecoration: "none",
  },
};

export default function EmbedPremiumCalculator() {
  const [planId, setPlanId] = useState(selectablePlans[0].id);
  const [age, setAge] = useState(30);
  const [sumAssured, setSumAssured] = useState(1000000);
  const [term, setTerm] = useState(20);
  const [mode, setMode] = useState("yearly");

  const plan = useMemo(() => selectablePlans.find((p) => p.id === planId), [planId]);

  const availableTerms = useMemo(() => {
    if (!plan || plan.fixedPremium) return [];
    const ages = Object.keys(plan.premiumRates).map(Number).sort((a, b) => a - b);
    let ageKey = ages[0];
    for (const a of ages) { if (a <= age) ageKey = a; else break; }
    return Object.keys(plan.premiumRates[ageKey] || {}).map(Number).sort((a, b) => a - b);
  }, [plan, age]);

  const result = useMemo(() => {
    if (!plan) return null;
    return calculatePremium(plan, age, sumAssured, term, mode, true);
  }, [plan, age, sumAssured, term, mode]);

  const [showEmbed, setShowEmbed] = useState(false);
  const embedCode = `<iframe src="https://insure.doaide.com/embed/premium-calculator" width="400" height="520" frameborder="0" style="border:1px solid #222;border-radius:8px;" title="LIC Premium Calculator"></iframe>`;

  return (
    <div style={s.page}>
      <div style={s.header}>LIC Premium Calculator</div>
      <div style={s.body}>
        <div style={s.grid}>
          <div>
            <label style={s.label}>Plan</label>
            <select style={s.select} value={planId} onChange={(e) => setPlanId(e.target.value)}>
              {selectablePlans.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.tableNo})</option>
              ))}
            </select>
          </div>
          <div>
            <label style={s.label}>Age</label>
            <input style={s.input} type="number" min={8} max={65} value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
          <div>
            <label style={s.label}>Sum Assured (₹)</label>
            <input style={s.input} type="number" min={100000} step={100000} value={sumAssured} onChange={(e) => setSumAssured(Number(e.target.value))} />
          </div>
          <div>
            <label style={s.label}>Term (years)</label>
            <select style={s.select} value={term} onChange={(e) => setTerm(Number(e.target.value))}>
              {availableTerms.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={s.label}>Payment Mode</label>
            <select style={s.select} value={mode} onChange={(e) => setMode(e.target.value)}>
              {Object.entries(MODE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>

        {result && (
          <div style={{ marginTop: 16 }}>
            <div style={s.row}><span>Base Premium</span><strong>{formatINR(result.basePremium)}</strong></div>
            <div style={s.row}><span>GST ({(result.gstRate * 100).toFixed(1)}%)</span><strong>{formatINR(result.gst)}</strong></div>
            <div style={{ ...s.row, ...s.total }}><span>Total Premium ({MODE_LABELS[mode]})</span><strong>{formatINR(result.totalPremium)}</strong></div>
          </div>
        )}

        <button
          onClick={() => setShowEmbed(!showEmbed)}
          style={{
            marginTop: 12, background: "none", border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.5)", padding: "6px 12px", borderRadius: 6,
            cursor: "pointer", fontSize: 12, width: "100%",
          }}
        >
          {showEmbed ? "Hide" : "Get this widget for your site"}
        </button>
        {showEmbed && (
          <pre style={{
            marginTop: 8, padding: 10, background: "#111", borderRadius: 6,
            fontSize: 11, color: "#9ca3af", overflow: "auto", whiteSpace: "pre-wrap",
          }}>{embedCode}</pre>
        )}
      </div>
      <a style={s.powered} href="https://insure.doaide.com?ref=widget" target="_blank" rel="noopener noreferrer">
        Powered by <strong style={{ color: "#0D9488" }}>DoAide InsureKit</strong>
      </a>
    </div>
  );
}
