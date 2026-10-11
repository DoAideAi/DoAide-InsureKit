import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const VISIT_KEY = "insurekit_visits";
const DISMISSED_KEY = "insurekit_signup_dismissed";
const SHOW_AFTER_VISITS = 3;

export default function SignUpBanner() {
  const { user, loading } = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loading || user) return;
    try {
      const dismissed = sessionStorage.getItem(DISMISSED_KEY);
      if (dismissed) return;
      const visits = parseInt(localStorage.getItem(VISIT_KEY) || "0", 10) + 1;
      localStorage.setItem(VISIT_KEY, String(visits));
      if (visits >= SHOW_AFTER_VISITS) setShow(true);
    } catch {}
  }, [loading, user]);

  if (!show) return null;

  return (
    <div className="bg-signal/10 border border-signal/20 rounded-xl px-4 py-3 mb-6 flex items-center justify-between gap-3">
      <p className="text-sm text-white/70">
        <span className="text-signal font-medium">Sync across devices?</span>{" "}
        Sign up free to keep your clients & policies backed up.
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <a href="/login" className="text-xs font-medium px-3 py-1.5 rounded-lg bg-signal text-white hover:brightness-110 transition-all no-underline">
          Sign up
        </a>
        <button
          onClick={() => {
            setShow(false);
            try { sessionStorage.setItem(DISMISSED_KEY, "1"); } catch {}
          }}
          className="text-white/30 hover:text-white/60 text-lg leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
