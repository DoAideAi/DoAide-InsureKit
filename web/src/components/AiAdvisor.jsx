import { useState, useRef, useEffect } from "react";
import { trackEvent } from "../lib/analytics";

const SUGGESTED_QUESTIONS = [
  "Which LIC plan has highest bonus?",
  "How to revive lapsed policy?",
  "Tax benefits on LIC premium?",
  "Best plan for child education?",
];

async function askAdvisor(message, history) {
  const res = await fetch("/api/advisor/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`Advisor API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.reply || "Sorry, I couldn't generate a response.";
}

export default function AiAdvisor() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", text: text.trim() };
    trackEvent('ai-advisor:ask', { questionLength: text.trim().length, messageCount: messages.length + 1 });
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const reply = await askAdvisor(userMsg.text, messages);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const showSuggestions = messages.length === 0 && !loading;

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI Advisor" : "Open AI Advisor"}
        className="no-print"
        data-testid="ai-advisor-toggle"
        style={{
          position: "fixed",
          bottom: 150,
          right: 24,
          zIndex: 1100,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg, #0d9488, #14b8a6)",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(20,184,166,0.4)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a8 8 0 0 1 8 8c0 3.3-2 6.2-5 7.5V20a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.5C6 16.2 4 13.3 4 10a8 8 0 0 1 8-8z" />
            <line x1="10" y1="22" x2="14" y2="22" />
          </svg>
        )}
      </button>

      {open && (
        <div
          data-testid="ai-advisor-panel"
          style={{
            position: "fixed",
            bottom: 210,
            right: 24,
            zIndex: 1200,
            width: 360,
            maxWidth: "calc(100vw - 48px)",
            height: 480,
            maxHeight: "calc(100vh - 260px)",
            background: "#1A1A1D",
            border: "1px solid #0d9488",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(13,148,136,0.2)",
            fontFamily: "system-ui, sans-serif",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid #333",
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "linear-gradient(135deg, rgba(13,148,136,0.15), rgba(20,184,166,0.05))",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 0 1 8 8c0 3.3-2 6.2-5 7.5V20a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.5C6 16.2 4 13.3 4 10a8 8 0 0 1 8-8z" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#eee" }}>Insurance AI Advisor</div>
              <div style={{ fontSize: 11, color: "#999" }}>Powered by Gemini</div>
            </div>
          </div>

          {/* Messages */}
          <div
            data-testid="ai-advisor-messages"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {showSuggestions && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                <p style={{ color: "#999", fontSize: 13, margin: 0, textAlign: "center" }}>
                  Ask me anything about LIC insurance
                </p>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    data-testid="suggested-question"
                    onClick={() => send(q)}
                    style={{
                      background: "#252528",
                      border: "1px solid #444",
                      borderRadius: 10,
                      padding: "10px 14px",
                      color: "#ccc",
                      fontSize: 13,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#14b8a6";
                      e.currentTarget.style.background = "rgba(20,184,166,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#444";
                      e.currentTarget.style.background = "#252528";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "10px 14px",
                  borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: m.role === "user" ? "linear-gradient(135deg, #0d9488, #0f766e)" : "#252528",
                  color: "#eee",
                  fontSize: 13,
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "10px 14px",
                  borderRadius: "14px 14px 14px 4px",
                  background: "#252528",
                  color: "#999",
                  fontSize: 13,
                }}
              >
                Thinking...
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid #333",
              display: "flex",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <input
              data-testid="ai-advisor-input"
              type="text"
              placeholder="Ask about LIC insurance..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              disabled={loading}
              style={{
                flex: 1,
                background: "#252528",
                border: "1px solid #444",
                borderRadius: 10,
                color: "#eee",
                padding: "10px 14px",
                fontSize: 13,
                outline: "none",
              }}
            />
            <button
              data-testid="ai-advisor-send"
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: "none",
                background: !input.trim() || loading ? "#333" : "linear-gradient(135deg, #0d9488, #14b8a6)",
                color: !input.trim() || loading ? "#666" : "#fff",
                cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export { askAdvisor, SUGGESTED_QUESTIONS };
