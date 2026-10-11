import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FloatingPremiumWidget() {
  const [dismissed, setDismissed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (dismissed || pathname === "/premium-calculator" || pathname === "/" || pathname.startsWith("/embed/")) return null;

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, display: "flex", alignItems: "center", gap: 8 }} className="no-print">
      <button
        onClick={() => navigate("/premium-calculator")}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "12px 20px", background: "var(--color-signal)", color: "#fff",
          border: "none", borderRadius: 50, fontSize: 14, fontWeight: 700,
          cursor: "pointer", boxShadow: "0 4px 20px rgba(13,148,136,0.4)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(13,148,136,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(13,148,136,0.4)"; }}
      >
        <span style={{ fontSize: 18 }}>₹</span>
        Premium Calculator
      </button>
      <button
        onClick={() => setDismissed(true)}
        style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "rgba(255,255,255,0.1)", border: "none",
          color: "rgba(255,255,255,0.4)", fontSize: 14,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
