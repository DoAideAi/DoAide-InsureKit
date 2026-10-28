import { useState, useRef, useEffect } from "react";
import { LIC_PLANS, MODE_LABELS } from "../data/licPlans";
import { formatINR } from "../utils/format";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import ShareButtons from "../components/ShareButtons";
import { trackEvent } from "../lib/analytics";


const HOW_IT_WORKS = [
  { title: "Enter policy info", desc: "Policy number, plan, SA, and premium details" },
  { title: "Add agent details", desc: "Your name, code, and branch" },
  { title: "Print receipt", desc: "Generate a clean, printable premium receipt" },
];

const FAQ_ITEMS = [
  { q: "Is this an official LIC receipt?", a: "No. This is an unofficial reference receipt for your records only. For official premium receipts, please use LIC's official portal or visit your nearest LIC branch." },
  { q: "How do I save as PDF?", a: "Click 'Print Receipt', then in the print dialog, select 'Save as PDF' as the destination/printer. This works in Chrome, Firefox, Safari, and Edge." },
  { q: "Can I customize the receipt?", a: "Yes, you can fill in all the policy details, agent information, and the receipt will be formatted for professional printing." },
  { q: "Is my data saved?", a: "The receipt data is not saved anywhere. Each time you visit, you'll need to enter the details fresh. This is intentional for privacy." },
];

function numberToWords(num) {
  if (num === 0) return "Zero";
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  function chunk(n) {
    if (n === 0) return "";
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + chunk(n % 100) : "");
  }
  let result = "";
  if (num >= 10000000) { result += chunk(Math.floor(num / 10000000)) + " Crore "; num %= 10000000; }
  if (num >= 100000) { result += chunk(Math.floor(num / 100000)) + " Lakh "; num %= 100000; }
  if (num >= 1000) { result += chunk(Math.floor(num / 1000)) + " Thousand "; num %= 1000; }
  result += chunk(num);
  return result.trim() + " Rupees Only";
}

const RECEIPTS_KEY = "insurekit_receipts";

function loadReceipts() {
  try { return JSON.parse(localStorage.getItem(RECEIPTS_KEY)) || []; } catch { return []; }
}

function saveReceipts(list) {
  localStorage.setItem(RECEIPTS_KEY, JSON.stringify(list));
}

export default function ReceiptGenerator() {
  useEffect(() => { trackEvent('tool:view', { tool: 'receipt-generator' }); }, []);
  const receiptRef = useRef(null);
  const [savedReceipts, setSavedReceipts] = useState(() => loadReceipts());
  const [showHistory, setShowHistory] = useState(false);
  const [form, setForm] = useState({
    receiptNo: `REC-${Date.now().toString(36).toUpperCase()}`,
    date: new Date().toISOString().slice(0, 10),
    holderName: "",
    policyNumber: "",
    planName: LIC_PLANS[0].name,
    sumAssured: 1000000,
    premium: 50000,
    mode: "yearly",
    paymentMethod: "Cash",
    agentName: "",
    agentCode: "",
    branchName: "",
  });

  function handlePrint() {
    window.print();
  }

  function handleSave() {
    const receipt = { ...form, savedAt: new Date().toISOString() };
    const updated = [receipt, ...savedReceipts].slice(0, 50);
    saveReceipts(updated);
    setSavedReceipts(updated);
  }

  function loadReceipt(receipt) {
    setForm({ ...receipt });
    setShowHistory(false);
  }

  function deleteReceipt(idx) {
    const updated = savedReceipts.filter((_, i) => i !== idx);
    saveReceipts(updated);
    setSavedReceipts(updated);
  }

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1 print:hidden">Premium Receipt Generator</h1>
      <p className="text-white/40 text-sm mb-6 print:hidden">
        Generate printable premium receipts for your records
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6 print:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Receipt Number</label>
            <input className="input-field" value={form.receiptNo} onChange={(e) => setForm({ ...form, receiptNo: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Date</label>
            <input type="date" className="input-field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Policy Holder Name</label>
            <input className="input-field" value={form.holderName} onChange={(e) => setForm({ ...form, holderName: e.target.value })} placeholder="e.g. Rajesh Kumar" />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Policy Number</label>
            <input className="input-field" value={form.policyNumber} onChange={(e) => setForm({ ...form, policyNumber: e.target.value })} placeholder="e.g. 123456789" />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Plan Name</label>
            <select className="select-field" value={form.planName} onChange={(e) => setForm({ ...form, planName: e.target.value })}>
              {LIC_PLANS.map((p) => <option key={p.id} value={p.name}>{p.name} ({p.tableNo || "Govt"})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Sum Assured</label>
            <input type="number" className="input-field" min={10000} step={10000} value={form.sumAssured} onChange={(e) => setForm({ ...form, sumAssured: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Premium Amount</label>
            <input type="number" className="input-field" min={100} step={100} value={form.premium} onChange={(e) => setForm({ ...form, premium: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Payment Mode</label>
            <select className="select-field" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
              {Object.entries(MODE_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Payment Method</label>
            <select className="select-field" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
              <option>Cash</option>
              <option>Cheque</option>
              <option>Online/NEFT</option>
              <option>UPI</option>
              <option>Auto-Debit</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Agent Name</label>
            <input className="input-field" value={form.agentName} onChange={(e) => setForm({ ...form, agentName: e.target.value })} placeholder="Your name" />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Agent Code</label>
            <input className="input-field" value={form.agentCode} onChange={(e) => setForm({ ...form, agentCode: e.target.value })} placeholder="e.g. 12345678" />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Branch Name</label>
            <input className="input-field" value={form.branchName} onChange={(e) => setForm({ ...form, branchName: e.target.value })} placeholder="e.g. Mumbai DO-1" />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={handleSave} className="text-sm py-2 px-4 border border-white/10 rounded text-white/50 hover:text-white/70 transition-colors">
            Save Receipt
          </button>
          {savedReceipts.length > 0 && (
            <button onClick={() => setShowHistory(!showHistory)} className="text-sm py-2 px-4 border border-white/10 rounded text-white/50 hover:text-white/70 transition-colors">
              History ({savedReceipts.length})
            </button>
          )}
          <button onClick={handlePrint} className="btn-primary text-sm py-2 px-6">Print Receipt</button>
        </div>
      </div>

      {showHistory && savedReceipts.length > 0 && (
        <div className="panel p-4 mb-6 print:hidden animate-fade-up">
          <div className="text-sm font-medium text-white mb-3">Saved Receipts</div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {savedReceipts.map((r, i) => (
              <div key={i} className="panel-inner p-3 flex items-center justify-between">
                <div className="min-w-0">
                  <div className="text-sm text-white/70">{r.holderName || "—"} — {r.receiptNo}</div>
                  <div className="text-xs text-white/30 mt-0.5">
                    {r.planName} • {formatINR(r.premium)} • {r.date}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => loadReceipt(r)} className="text-xs text-signal hover:underline">Load</button>
                  <button onClick={() => deleteReceipt(i)} className="text-xs text-bad/60 hover:text-bad">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div ref={receiptRef} className="receipt-preview panel p-6 mb-6 print:shadow-none print:border-none print:bg-white print:text-black print:p-8">
        <div className="text-center mb-6 print:mb-8">
          <div className="text-xs text-white/30 print:text-gray-500 uppercase tracking-widest">Unofficial Reference Receipt</div>
          <div className="text-xl font-bold text-white print:text-black mt-1">Premium Payment Receipt</div>
          <div className="text-xs text-white/40 print:text-gray-500 mt-1">Receipt No: {form.receiptNo} &nbsp;|&nbsp; Date: {form.date}</div>
        </div>

        <div className="border border-white/10 print:border-gray-300 rounded-lg overflow-hidden mb-4">
          <table className="w-full text-sm">
            <tbody>
              <ReceiptRow label="Policy Holder" value={form.holderName || "—"} />
              <ReceiptRow label="Policy Number" value={form.policyNumber || "—"} />
              <ReceiptRow label="Plan Name" value={form.planName} />
              <ReceiptRow label="Sum Assured" value={formatINR(form.sumAssured)} />
              <ReceiptRow label="Premium Amount" value={formatINR(form.premium)} highlight />
              <ReceiptRow label="Amount in Words" value={numberToWords(form.premium)} />
              <ReceiptRow label="Payment Mode" value={MODE_LABELS[form.mode] || form.mode} />
              <ReceiptRow label="Payment Method" value={form.paymentMethod} />
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mt-6">
          <div>
            <div className="text-xs text-white/30 print:text-gray-400 uppercase tracking-wide mb-1">Agent Details</div>
            <div className="text-white/70 print:text-gray-700">{form.agentName || "—"}</div>
            {form.agentCode && <div className="text-xs text-white/40 print:text-gray-500">Code: {form.agentCode}</div>}
            {form.branchName && <div className="text-xs text-white/40 print:text-gray-500">{form.branchName}</div>}
          </div>
          <div className="text-right">
            <div className="text-xs text-white/30 print:text-gray-400 uppercase tracking-wide mb-1">Signature</div>
            <div className="border-b border-white/10 print:border-gray-300 w-32 ml-auto mt-8" />
            <div className="text-xs text-white/30 print:text-gray-400 mt-1">Authorized Signatory</div>
          </div>
        </div>

        <div className="text-[10px] text-white/20 print:text-gray-400 text-center mt-6 pt-4 border-t border-white/5 print:border-gray-200">
          This is an unofficial reference receipt generated on DoAide InsureKit. For official receipts, please contact LIC of India.
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 mb-6 no-print">
        <ShareButtons text="Generate LIC premium receipts — free tool on DoAide InsureKit" toolName="Premium Receipt Generator" />
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}

function ReceiptRow({ label, value, highlight = false }) {
  return (
    <tr className="border-b border-white/5 print:border-gray-200 last:border-0">
      <td className="py-2.5 px-4 text-white/40 print:text-gray-500 text-xs uppercase tracking-wide w-40">{label}</td>
      <td className={`py-2.5 px-4 ${highlight ? "text-signal print:text-blue-700 font-bold text-base" : "text-white/70 print:text-gray-700"}`}>{value}</td>
    </tr>
  );
}
