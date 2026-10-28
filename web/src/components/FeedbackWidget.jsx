import { useState } from "react";
import { trackFeedback } from "../lib/analytics";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === null) return;
    setSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: window.location.pathname,
          rating,
          comment: comment.trim() || null,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // best-effort
    }
    trackFeedback(rating, comment.trim() || null);
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
      setRating(null);
      setComment("");
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Send feedback"
        className="no-print"
        style={{
          position: "fixed",
          bottom: 90,
          right: 24,
          zIndex: 1100,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "none",
          background: "#D4AF37",
          color: "#1A1A1D",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(212,175,55,0.35)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {open && (
        <div
          data-testid="feedback-modal"
          style={{
            position: "fixed",
            bottom: 150,
            right: 24,
            zIndex: 1200,
            width: 300,
            background: "#1A1A1D",
            border: "1px solid #333",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            color: "#eee",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {submitted ? (
            <p style={{ textAlign: "center", fontSize: 16, margin: 0, color: "#D4AF37" }}>
              Thanks for your feedback!
            </p>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>How's this page?</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close feedback"
                  style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 18 }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: "flex", gap: 12, marginBottom: 16, justifyContent: "center" }}>
                <button
                  data-testid="rating-up"
                  onClick={() => setRating("up")}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 10,
                    border: rating === "up" ? "2px solid #D4AF37" : "1px solid #444",
                    background: rating === "up" ? "rgba(212,175,55,0.15)" : "#252528",
                    fontSize: 28,
                    cursor: "pointer",
                    transition: "border 0.15s, background 0.15s",
                  }}
                >
                  👍
                </button>
                <button
                  data-testid="rating-down"
                  onClick={() => setRating("down")}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 10,
                    border: rating === "down" ? "2px solid #D4AF37" : "1px solid #444",
                    background: rating === "down" ? "rgba(212,175,55,0.15)" : "#252528",
                    fontSize: 28,
                    cursor: "pointer",
                    transition: "border 0.15s, background 0.15s",
                  }}
                >
                  👎
                </button>
              </div>

              <textarea
                data-testid="feedback-comment"
                placeholder="Any comments? (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#252528",
                  border: "1px solid #444",
                  borderRadius: 8,
                  color: "#eee",
                  padding: 10,
                  fontSize: 13,
                  resize: "vertical",
                  marginBottom: 12,
                }}
              />

              <button
                data-testid="feedback-submit"
                onClick={handleSubmit}
                disabled={rating === null || submitting}
                style={{
                  width: "100%",
                  padding: "10px 0",
                  background: rating === null ? "#444" : "#D4AF37",
                  color: rating === null ? "#888" : "#1A1A1D",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: rating === null ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                }}
              >
                {submitting ? "Sending…" : "Submit"}
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
