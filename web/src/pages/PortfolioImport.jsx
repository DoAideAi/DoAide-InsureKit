import { useState, useCallback, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { importPortfolioCsv, fetchPortfolioAnalytics } from "../utils/apiStore";
import { formatINR } from "../utils/format";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";

const HOW_IT_WORKS = [
  { title: "Upload CSV", desc: "Drag-and-drop or browse to select your portfolio CSV file" },
  { title: "Map columns", desc: "Match CSV columns to policy fields like Policy Number, Name, Premium" },
  { title: "Preview & import", desc: "Review the data, then import — policies sync to your dashboard" },
];

const FAQ_ITEMS = [
  { q: "What format should my CSV be in?", a: "Any CSV file with a header row works. Common columns include Policy Number, Policyholder Name, Plan Name, Premium, Sum Assured, Start Date, Maturity Date, and Status. You'll map these in step 2." },
  { q: "Will it create duplicate policies?", a: "Each import creates new policy records. If you've already added policies manually, check for duplicates in your Policy Tracker after import." },
  { q: "What date formats are supported?", a: "YYYY-MM-DD, DD-MM-YYYY, DD/MM/YYYY, and MM/DD/YYYY are all supported. The system auto-detects the format." },
  { q: "Can I import from Excel?", a: "Save your Excel file as CSV first (File → Save As → CSV). Then upload the .csv file here." },
  { q: "Is my data secure?", a: "Yes. Your portfolio data is stored securely and linked only to your account. No one else can see it." },
];

const TARGET_FIELDS = [
  { key: "policy_number", label: "Policy Number", required: true },
  { key: "holder_name", label: "Policyholder Name", required: true },
  { key: "plan_name", label: "Plan Name" },
  { key: "premium", label: "Premium" },
  { key: "sum_assured", label: "Sum Assured" },
  { key: "start_date", label: "Policy Start Date" },
  { key: "maturity_date", label: "Maturity Date" },
  { key: "status", label: "Status" },
];

function guessMapping(headers) {
  const map = {};
  const patterns = {
    policy_number: /policy.*(no|num|number|id)|pol.*no/i,
    holder_name: /holder|name|insured|customer|client/i,
    plan_name: /plan|scheme|product|type/i,
    premium: /premium|prem/i,
    sum_assured: /sum.*assured|sa|cover|amount/i,
    start_date: /start|commence|inception|doc|date.*of.*comm/i,
    maturity_date: /matur|end.*date|expiry/i,
    status: /status|state/i,
  };
  for (const [field, regex] of Object.entries(patterns)) {
    const match = headers.find((h) => regex.test(h));
    if (match) map[field] = match;
  }
  return map;
}

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return { headers: [], rows: [] };
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = lines[i].split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    const row = {};
    headers.forEach((h, idx) => { row[h] = vals[idx] || ""; });
    rows.push(row);
  }
  return { headers, rows };
}

export default function PortfolioImport() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [columnMap, setColumnMap] = useState({});
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [parseError, setParseError] = useState(null);

  const handleFile = useCallback((f) => {
    if (!f) return;
    setParseError(null);
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const parsed = parseCSV(text);
        if (parsed.headers.length === 0) {
          setParseError("Could not parse CSV — no headers found.");
          return;
        }
        setCsvData(parsed);
        setColumnMap(guessMapping(parsed.headers));
        setStep(2);
      } catch {
        setParseError("Failed to parse the CSV file. Please check the format.");
      }
    };
    reader.readAsText(f);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer?.files?.[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragActive(false), []);

  const mappedCount = useMemo(() =>
    Object.values(columnMap).filter(Boolean).length
  , [columnMap]);

  const previewRows = useMemo(() => {
    if (!csvData) return [];
    return csvData.rows.slice(0, 5).map((row) => {
      const mapped = {};
      for (const { key } of TARGET_FIELDS) {
        const csvCol = columnMap[key];
        mapped[key] = csvCol ? row[csvCol] || "" : "";
      }
      return mapped;
    });
  }, [csvData, columnMap]);

  const canImport = columnMap.policy_number && columnMap.holder_name;

  const handleImport = useCallback(async () => {
    if (!file || !canImport) return;
    setImporting(true);
    try {
      const res = await importPortfolioCsv(file, columnMap);
      setResult(res);
      setStep(4);
      try {
        const a = await fetchPortfolioAnalytics();
        setAnalytics(a);
      } catch {}
    } catch (err) {
      setResult({ error: err.message });
      setStep(4);
    } finally {
      setImporting(false);
    }
  }, [file, columnMap, canImport]);

  const reset = useCallback(() => {
    setStep(1);
    setFile(null);
    setCsvData(null);
    setColumnMap({});
    setResult(null);
    setAnalytics(null);
    setParseError(null);
  }, []);

  if (!user) {
    return (
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-white mb-1">Import Portfolio</h1>
        <p className="text-white/40 text-sm mb-6">Import your client policies from a CSV file</p>
        <div className="panel p-8 text-center">
          <div className="text-white/50 text-sm mb-2">Sign in to use Portfolio Import</div>
          <div className="text-white/30 text-xs">You need an account to save imported policies to your dashboard.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Import Portfolio</h1>
      <p className="text-white/40 text-sm mb-6">
        Import your client policies from a CSV file — track your entire book of business
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[
          { n: 1, label: "Upload" },
          { n: 2, label: "Map Columns" },
          { n: 3, label: "Preview" },
          { n: 4, label: "Done" },
        ].map(({ n, label }) => (
          <div key={n} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= n ? "bg-signal text-white" : "bg-white/10 text-white/30"
            }`}>
              {step > n ? "✓" : n}
            </div>
            <span className={`text-xs ${step >= n ? "text-white/70" : "text-white/30"}`}>{label}</span>
            {n < 4 && <div className={`w-6 h-px ${step > n ? "bg-signal/50" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Upload */}
      {step === 1 && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`panel p-10 text-center border-2 border-dashed transition-colors cursor-pointer ${
            dragActive ? "border-signal bg-signal/5" : "border-white/10 hover:border-white/20"
          }`}
          onClick={() => document.getElementById("csv-file-input")?.click()}
        >
          <input
            id="csv-file-input"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="text-3xl mb-3 opacity-40">{"\u{1F4C4}"}</div>
          <div className="text-white/60 text-sm mb-2">
            Drag & drop your CSV file here, or click to browse
          </div>
          <div className="text-white/30 text-xs">
            Supports .csv files with headers like Policy Number, Name, Premium, etc.
          </div>
          {parseError && (
            <div className="mt-4 text-bad text-sm">{parseError}</div>
          )}
        </div>
      )}

      {/* Step 2: Column Mapping */}
      {step === 2 && csvData && (
        <div className="panel p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium text-white">Map CSV Columns</div>
              <div className="text-xs text-white/30 mt-0.5">
                {csvData.rows.length} rows found &middot; {mappedCount}/{TARGET_FIELDS.length} fields mapped
              </div>
            </div>
            <button onClick={() => setStep(1)} className="text-xs text-white/40 hover:text-white/60">Change file</button>
          </div>

          <div className="space-y-3">
            {TARGET_FIELDS.map(({ key, label, required }) => (
              <div key={key} className="flex items-center gap-3">
                <div className="w-40 text-sm text-white/60 flex items-center gap-1">
                  {label}
                  {required && <span className="text-bad text-xs">*</span>}
                </div>
                <select
                  className="select-field flex-1"
                  value={columnMap[key] || ""}
                  onChange={(e) => setColumnMap({ ...columnMap, [key]: e.target.value || undefined })}
                >
                  <option value="">— skip —</option>
                  {csvData.headers.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                {columnMap[key] && (
                  <span className="text-xs text-white/20 truncate max-w-[120px]">
                    e.g. {csvData.rows[0]?.[columnMap[key]] || "—"}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button onClick={() => setStep(1)} className="text-sm text-white/40 hover:text-white/60">Back</button>
            <button
              onClick={() => setStep(3)}
              disabled={!canImport}
              className={`btn-primary text-sm py-2 px-5 ${!canImport ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              Preview Import
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Preview */}
      {step === 3 && csvData && (
        <div className="panel p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium text-white">Preview (first 5 rows)</div>
              <div className="text-xs text-white/30 mt-0.5">{csvData.rows.length} total rows will be imported</div>
            </div>
            <button onClick={() => setStep(2)} className="text-xs text-white/40 hover:text-white/60">Edit mapping</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr>
                  {TARGET_FIELDS.filter(({ key }) => columnMap[key]).map(({ key, label }) => (
                    <th key={key} className="border border-white/10 px-2 py-1.5 bg-white/5 text-left text-white/50 whitespace-nowrap">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.map((row, i) => (
                  <tr key={i}>
                    {TARGET_FIELDS.filter(({ key }) => columnMap[key]).map(({ key }) => (
                      <td key={key} className="border border-white/10 px-2 py-1.5 text-white/70 whitespace-nowrap">{row[key] || "—"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button onClick={() => setStep(2)} className="text-sm text-white/40 hover:text-white/60">Back</button>
            <button
              onClick={handleImport}
              disabled={importing}
              className="btn-primary text-sm py-2 px-5"
            >
              {importing ? "Importing..." : `Import ${csvData.rows.length} Policies`}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Result */}
      {step === 4 && result && (
        <div className="space-y-4">
          {result.error ? (
            <div className="panel p-5 border-l-4 border-l-bad">
              <div className="text-sm font-medium text-bad mb-1">Import Failed</div>
              <div className="text-xs text-white/50">{result.error}</div>
              <button onClick={reset} className="btn-primary text-sm py-2 px-4 mt-4">Try Again</button>
            </div>
          ) : (
            <>
              <div className="panel p-5 border-l-4 border-l-good">
                <div className="text-sm font-medium text-good mb-1">Import Complete</div>
                <div className="text-xs text-white/50">
                  {result.imported} {result.imported === 1 ? "policy" : "policies"} imported successfully
                  {result.errors?.length > 0 && ` · ${result.errors.length} rows skipped`}
                </div>
              </div>

              {result.errors?.length > 0 && (
                <div className="panel p-4">
                  <div className="text-xs font-medium text-warn mb-2">Skipped Rows</div>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {result.errors.map((e, i) => (
                      <div key={i} className="text-xs text-white/40">
                        Row {e.row}: {e.error}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analytics && (
                <div className="panel p-5">
                  <div className="text-sm font-medium text-white mb-3">Portfolio Summary</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="panel-inner p-3 text-center">
                      <div className="text-lg font-bold text-signal">{analytics.total_policies}</div>
                      <div className="text-[10px] text-white/30 uppercase tracking-wide">Total Policies</div>
                    </div>
                    <div className="panel-inner p-3 text-center">
                      <div className="text-lg font-bold text-white">{formatINR(analytics.total_annual_premium)}</div>
                      <div className="text-[10px] text-white/30 uppercase tracking-wide">Annual Premium</div>
                    </div>
                    <div className="panel-inner p-3 text-center">
                      <div className="text-lg font-bold text-signal">{formatINR(analytics.total_sum_assured)}</div>
                      <div className="text-[10px] text-white/30 uppercase tracking-wide">Total Cover</div>
                    </div>
                    <div className="panel-inner p-3 text-center">
                      <div className="text-lg font-bold text-white">{analytics.by_status?.active || 0}</div>
                      <div className="text-[10px] text-white/30 uppercase tracking-wide">Active</div>
                    </div>
                  </div>

                  {Object.keys(analytics.by_plan || {}).length > 0 && (
                    <div className="mt-4">
                      <div className="text-xs font-medium text-white/50 mb-2">Policies by Plan</div>
                      <div className="space-y-1">
                        {Object.entries(analytics.by_plan).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([plan, count]) => (
                          <div key={plan} className="flex justify-between text-xs">
                            <span className="text-white/50 truncate mr-2">{plan}</span>
                            <span className="text-white/70 font-medium">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={reset} className="text-sm text-white/40 hover:text-white/60">Import More</button>
                <a href="/dashboard" className="btn-primary text-sm py-2 px-4 no-underline">Go to Dashboard</a>
              </div>
            </>
          )}
        </div>
      )}

      <div className="mt-8">
        <FAQ items={FAQ_ITEMS} />
      </div>
    </div>
  );
}
