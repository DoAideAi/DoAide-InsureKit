import { trackPrint } from "../lib/analytics";

export default function PrintButton() {
  return (
    <button
      onClick={() => { trackPrint('insurekit-tool'); window.print(); }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-white/50 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-white/70 transition-colors print:hidden"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9V2h12v7" />
        <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
      Print / PDF
    </button>
  );
}
