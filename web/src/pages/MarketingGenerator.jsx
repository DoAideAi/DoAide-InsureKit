import { useState, useMemo, useCallback } from "react";
import { TEMPLATE_CATEGORIES, MARKETING_TEMPLATES, fillTemplate, getTemplatesByCategory } from "../data/marketingTemplates";
import { LIC_PLANS } from "../data/licPlans";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";


const HOW_IT_WORKS = [
  { title: "Pick a template", desc: "Choose WhatsApp, social, festival, or reminder" },
  { title: "Fill your details", desc: "Add your name, phone, and plan info" },
  { title: "Copy & send", desc: "One-click copy to WhatsApp or social media" },
];

const FAQ_ITEMS = [
  { q: "How do I use these marketing templates?", a: "Select a category, pick a template, fill in your details (name, phone), customize the plan details, then copy the generated message. Paste it directly into WhatsApp, Instagram, Facebook, or any social media." },
  { q: "Can I edit the generated message?", a: "Yes! The generated message is fully editable. Click in the preview area to modify any text before copying." },
  { q: "Are these templates compliant with IRDAI guidelines?", a: "These templates are designed to be informational and professional. However, always ensure your marketing complies with IRDAI advertising guidelines. Avoid making guaranteed return promises and always include appropriate disclaimers." },
  { q: "Can I save my agent details?", a: "Your name and phone number are saved in your browser so you don't have to re-enter them every time." },
  { q: "How do festival greetings help my business?", a: "Festival greetings keep you top-of-mind with clients and prospects. Adding a subtle insurance message builds awareness without being pushy. Send these on Diwali, New Year, and other major festivals." },
];

export default function MarketingGenerator() {
  const [category, setCategory] = useState("whatsapp");
  const [templateId, setTemplateId] = useState("");
  const [copied, setCopied] = useState(false);

  const savedAgent = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("insurekit_agent") || "{}");
    } catch { return {}; }
  }, []);

  const [values, setValues] = useState({
    agentName: savedAgent.name || "",
    agentPhone: savedAgent.phone || "",
  });

  const templates = useMemo(
    () => getTemplatesByCategory(category),
    [category],
  );

  const selectedTemplate = useMemo(
    () => MARKETING_TEMPLATES.find((t) => t.id === templateId) || templates[0],
    [templateId, templates],
  );

  const generatedText = useMemo(() => {
    if (!selectedTemplate) return "";
    return fillTemplate(selectedTemplate.template, values);
  }, [selectedTemplate, values]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [generatedText]);

  const handleShareWhatsApp = useCallback(() => {
    window.open(`https://wa.me/?text=${encodeURIComponent(generatedText)}`, "_blank");
  }, [generatedText]);

  function updateValue(key, val) {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (key === "agentName" || key === "agentPhone") {
      try {
        const agent = JSON.parse(localStorage.getItem("insurekit_agent") || "{}");
        if (key === "agentName") agent.name = val;
        if (key === "agentPhone") agent.phone = val;
        localStorage.setItem("insurekit_agent", JSON.stringify(agent));
      } catch { /* ignore */ }
    }
  }

  function autofillPlan(planId) {
    const plan = LIC_PLANS.find((p) => p.id === planId);
    if (!plan) return;
    setValues((prev) => ({
      ...prev,
      planName: plan.name,
      tableNo: String(plan.tableNo || ""),
      feature1: plan.features?.[0] || "",
      feature2: plan.features?.[1] || "",
      feature3: plan.features?.[2] || "",
      minPremium: plan.minSA ? String(Math.round((plan.minSA / 1000) * 50 * 0.0875)) : "",
    }));
  }

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Marketing Content Generator</h1>
      <p className="text-white/40 text-sm mb-6">
        Ready-made WhatsApp messages and social media posts for LIC agents
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-5 mb-6">
        <div className="mb-4">
          <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Category</label>
          <div className="flex flex-wrap gap-2">
            {TEMPLATE_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => { setCategory(c.id); setTemplateId(""); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  category === c.id
                    ? "bg-signal text-white"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Template</label>
          <select
            className="select-field"
            value={selectedTemplate?.id || ""}
            onChange={(e) => setTemplateId(e.target.value)}
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </div>

        {selectedTemplate?.placeholders?.includes("planName") && (
          <div className="mb-4">
            <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Auto-fill from LIC Plan</label>
            <select className="select-field" onChange={(e) => autofillPlan(e.target.value)} defaultValue="">
              <option value="">— Select a plan to auto-fill —</option>
              {LIC_PLANS.filter((p) => p.tableNo > 0).map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.tableNo})</option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {selectedTemplate?.placeholders?.map((ph) => (
            <div key={ph}>
              <label className="block text-xs text-white/40 mb-1 uppercase tracking-wide">
                {ph.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase())}
              </label>
              <input
                className="input-field text-sm"
                value={values[ph] || ""}
                onChange={(e) => updateValue(ph, e.target.value)}
                placeholder={ph}
              />
            </div>
          ))}
        </div>
      </div>

      {generatedText && (
        <div className="animate-fade-up">
          <div className="panel-inner p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-white/40 uppercase tracking-wide">Preview</div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="text-xs px-3 py-1.5 rounded bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70 transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="text-xs px-3 py-1.5 rounded bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 transition-colors"
                >
                  Send via WhatsApp
                </button>
              </div>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-white/70 font-sans leading-relaxed">
              {generatedText}
            </pre>
          </div>
        </div>
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
