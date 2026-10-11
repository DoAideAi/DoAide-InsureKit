import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = sessionStorage.getItem("pwa-dismissed");
      if (!dismissed) setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible) return null;

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  };

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("pwa-dismissed", "1");
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-xl bg-ink-700 border border-white/10 p-4 shadow-lg animate-fade-up print:hidden">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-signal/20 flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#0D9488" />
            <text x="16" y="22" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="15" fill="#fff" textAnchor="middle">IK</text>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">Install InsureKit</p>
          <p className="text-xs text-white/40">Use offline like an app</p>
        </div>
        <button onClick={install} className="btn-primary text-xs px-3 py-1.5 rounded-lg shrink-0">
          Install
        </button>
        <button onClick={dismiss} className="text-white/30 hover:text-white/60 transition-colors p-1" aria-label="Dismiss">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
