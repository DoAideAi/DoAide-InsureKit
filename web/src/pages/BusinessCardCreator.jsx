import { useState, useRef, useCallback, useEffect } from "react";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackEvent } from "../lib/analytics";

const CARD_THEMES = [
  { id: "classic_blue", name: "Classic Blue", primary: "#1e3a5f", accent: "#4a90d9", bg: "#f0f4f8", text: "#1a1a2e" },
  { id: "royal_gold", name: "Royal Gold", primary: "#2c1810", accent: "#d4a843", bg: "#faf6f0", text: "#1a1a2e" },
  { id: "modern_green", name: "Modern Green", primary: "#0d3b2e", accent: "#00b894", bg: "#f0faf5", text: "#1a1a2e" },
  { id: "professional_grey", name: "Professional Grey", primary: "#2d3436", accent: "#6c5ce7", bg: "#f5f5f5", text: "#1a1a2e" },
  { id: "lic_brand", name: "LIC Blue", primary: "#003366", accent: "#0066cc", bg: "#e6f0ff", text: "#1a1a2e" },
  { id: "warm_maroon", name: "Warm Maroon", primary: "#4a0e0e", accent: "#c0392b", bg: "#fdf2f2", text: "#1a1a2e" },
];

const HOW_IT_WORKS = [
  { title: "Enter details", desc: "Add your name, agent code, branch, and contact info" },
  { title: "Choose design", desc: "Pick from 6 professional card templates" },
  { title: "Download & share", desc: "Save as image or share via WhatsApp" },
];

const FAQ_ITEMS = [
  { q: "What details should I include?", a: "Include your full name, LIC agent code, branch name, phone number, and email. Optional: designation (Agent/SBC/CLU), WhatsApp number, and a tagline or motto." },
  { q: "Can I print these cards?", a: "Yes! Use the Download button to save the card as an image, then print it at any local print shop. Standard business card size is 3.5 × 2 inches (89 × 51 mm)." },
  { q: "What is the best way to share digitally?", a: "Save the card image and share via WhatsApp — set it as your WhatsApp Business profile card, or send it to clients after a meeting. You can also share the text version." },
  { q: "Can I add my photo?", a: "The tool supports photo upload. Click the photo area to upload your headshot. A professional passport-size photo works best." },
];

function CardPreview({ data, theme }) {
  const t = CARD_THEMES.find((th) => th.id === theme) || CARD_THEMES[0];

  return (
    <div
      className="w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl"
      style={{ aspectRatio: "1.75/1", background: t.bg }}
    >
      <div className="h-full flex flex-col">
        <div className="px-5 pt-4 pb-2 flex items-center gap-3" style={{ background: t.primary }}>
          <div className="flex-shrink-0">
            {data.photoUrl ? (
              <img src={data.photoUrl} alt="Agent photo" className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: t.accent }} loading="lazy" />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: t.accent, color: "#fff" }}>
                {data.name ? data.name.charAt(0).toUpperCase() : "A"}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white truncate">{data.name || "Your Name"}</h3>
            <p className="text-xs truncate" style={{ color: t.accent }}>{data.designation || "LIC Agent"}</p>
          </div>
        </div>

        <div className="flex-1 px-5 py-3 flex flex-col justify-between">
          <div className="space-y-1.5 text-xs" style={{ color: t.text }}>
            {data.agentCode && (
              <div className="flex items-center gap-2">
                <span className="font-medium w-20" style={{ color: t.accent }}>Agent Code:</span>
                <span>{data.agentCode}</span>
              </div>
            )}
            {data.branch && (
              <div className="flex items-center gap-2">
                <span className="font-medium w-20" style={{ color: t.accent }}>Branch:</span>
                <span>{data.branch}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-2">
                <span className="font-medium w-20" style={{ color: t.accent }}>Phone:</span>
                <span>{data.phone}</span>
              </div>
            )}
            {data.email && (
              <div className="flex items-center gap-2">
                <span className="font-medium w-20" style={{ color: t.accent }}>Email:</span>
                <span className="truncate">{data.email}</span>
              </div>
            )}
            {data.whatsapp && (
              <div className="flex items-center gap-2">
                <span className="font-medium w-20" style={{ color: t.accent }}>WhatsApp:</span>
                <span>{data.whatsapp}</span>
              </div>
            )}
          </div>

          <div className="flex items-end justify-between mt-2">
            {data.tagline && (
              <p className="text-[10px] italic max-w-[60%]" style={{ color: t.accent }}>"{data.tagline}"</p>
            )}
            <div className="text-right">
              <p className="text-[9px] font-bold" style={{ color: t.primary }}>Life Insurance Corporation</p>
              <p className="text-[8px]" style={{ color: t.text + "99" }}>of India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessCardCreator() {
  useEffect(() => { trackEvent('tool:view', { tool: 'business-card-creator' }); }, []);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("LIC Agent");
  const [agentCode, setAgentCode] = useState("");
  const [branch, setBranch] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tagline, setTagline] = useState("");
  const [theme, setTheme] = useState("classic_blue");
  const [photoUrl, setPhotoUrl] = useState("");
  const fileInputRef = useRef(null);

  const handlePhotoUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoUrl(ev.target.result);
    reader.readAsDataURL(file);
  }, []);

  const data = { name, designation, agentCode, branch, phone, email, whatsapp, tagline, photoUrl };

  const shareText = `${name || "LIC Agent"}\n${designation}\nAgent Code: ${agentCode}\n${branch ? `Branch: ${branch}\n` : ""}Phone: ${phone}\n${email ? `Email: ${email}\n` : ""}${whatsapp ? `WhatsApp: ${whatsapp}\n` : ""}${tagline ? `\n"${tagline}"\n` : ""}\nLife Insurance Corporation of India\n\n— Card created on DoAide InsureKit (insure.doaide.com)`;

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Business Card Creator</h1>
      <p className="text-sm text-white/50 mb-6">
        Create a professional digital business card — share on WhatsApp or print for client meetings.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-white/60 mb-1">Full Name</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rajesh Kumar Sharma" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Designation</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={designation} onChange={(e) => setDesignation(e.target.value)}>
            <option>LIC Agent</option>
            <option>Senior Business Consultant</option>
            <option>Chartered Life Underwriter</option>
            <option>Development Officer</option>
            <option>Branch Manager</option>
            <option>Insurance Advisor</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Agent Code</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={agentCode} onChange={(e) => setAgentCode(e.target.value)} placeholder="e.g. 12345678" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Branch Name</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="e.g. Mumbai DO-1, Andheri Branch" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Phone Number</label>
          <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Email</label>
          <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="agent@email.com" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">WhatsApp (if different)</label>
          <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="Same as phone if blank" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Tagline (optional)</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="e.g. Securing Futures Since 2010" maxLength={60} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Photo</label>
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/50 text-sm hover:border-white/30 transition text-left"
          >
            {photoUrl ? "Photo uploaded ✓ (click to change)" : "Upload headshot (optional)"}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-white/60 mb-2">Card Design</label>
        <div className="flex flex-wrap gap-2">
          {CARD_THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${theme === t.id ? "ring-2 ring-white" : "ring-1 ring-white/20"}`}
              style={{ background: t.primary, color: t.accent }}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide">Card Preview</h3>
        <CardPreview data={data} theme={theme} />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <ShareButtons text={shareText} />
        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(shareText);
            }
          }}
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white hover:bg-white/20 transition"
        >
          Copy Text
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
        <h3 className="text-sm font-semibold text-white mb-2">Tips for a Great Business Card</h3>
        <ul className="space-y-1 text-sm text-white/60">
          <li>• Use a professional passport-style photo with a plain background</li>
          <li>• Include your agent code — it builds trust and helps clients find you</li>
          <li>• Add your WhatsApp number — most LIC business happens on WhatsApp</li>
          <li>• Keep your tagline short and memorable — under 8 words</li>
          <li>• For print cards, use 300 GSM paper with matte or gloss finish</li>
          <li>• Save this card and share after every client meeting</li>
        </ul>
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
