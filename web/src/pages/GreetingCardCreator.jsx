import { useState, useRef, useEffect } from "react";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import { trackEvent } from "../lib/analytics";

const OCCASIONS = [
  { id: "birthday", label: "Birthday", emoji: "🎂", templates: [
    "Wishing you a very Happy Birthday, {name}! 🎂 May this year bring you health, happiness, and financial security. 🌟",
    "Happy Birthday, {name}! 🎉 Another year of life is a blessing. Let's make sure your family's future is as bright as your smile! 🎁",
    "Dear {name}, warmest birthday wishes! 🎈 May all your dreams come true. Here's to a prosperous year ahead! 🥳",
  ]},
  { id: "anniversary", label: "Policy Anniversary", emoji: "📋", templates: [
    "Congratulations, {name}! 🎉 Your LIC policy completes another successful year today. Your commitment to financial security is admirable! 📋",
    "Happy Policy Anniversary, {name}! ✨ Your consistent premium payments reflect your dedication to your family's future. Keep it up! 💪",
    "Dear {name}, your LIC policy anniversary is a milestone worth celebrating! 🏆 Your financial discipline today means security tomorrow. 🌟",
  ]},
  { id: "diwali", label: "Diwali", emoji: "🪔", templates: [
    "Happy Diwali, {name}! 🪔 May the festival of lights illuminate your path to prosperity and financial security! ✨🎆",
    "Wishing you a sparkling Diwali, {name}! 🎇 May Goddess Lakshmi bless you with wealth, health, and happiness. Shubh Deepavali! 🪔",
    "Dear {name}, this Diwali, may every diya light up your life with joy and your investments with great returns! 🪔✨ Happy Diwali!",
  ]},
  { id: "newyear", label: "New Year", emoji: "🎊", templates: [
    "Happy New Year, {name}! 🎊 Wishing you a year filled with prosperity, good health, and financial growth! 🥂",
    "Dear {name}, Happy New Year! 🎆 New year, new goals — let's review your financial plan and make {year} your best year yet! 🌟",
    "Cheers to {year}, {name}! 🥳 May this year bring you closer to all your financial goals. Wishing you success and happiness! 🎊",
  ]},
  { id: "holi", label: "Holi", emoji: "🎨", templates: [
    "Happy Holi, {name}! 🎨 May your life be as colorful as this festival! Wishing you joy, prosperity, and vibrant returns! 🌈",
    "Dear {name}, Happy Holi! 🎨 Just like colors brighten our lives, let smart investments brighten your family's future! 🌟",
  ]},
  { id: "raksha", label: "Raksha Bandhan", emoji: "🎀", templates: [
    "Happy Raksha Bandhan, {name}! 🎀 The bond of protection extends to financial security too. Wishing your family a blessed day! 🙏",
    "Dear {name}, on this Raksha Bandhan, protect your loved ones with the gift of financial security! 🎀 Happy celebrations! 🌟",
  ]},
  { id: "independence", label: "Independence Day", emoji: "🇮🇳", templates: [
    "Happy Independence Day, {name}! 🇮🇳 Just as our nation gained freedom, let's work toward your financial freedom too! Jai Hind! 🙏",
    "Dear {name}, Happy 15th August! 🇮🇳 Freedom means choices — choose financial security for your family. Jai Hind! 🌟",
  ]},
  { id: "custom", label: "Custom", emoji: "✉️", templates: [
    "Dear {name}, {message}",
  ]},
];

const BG_THEMES = [
  { id: "gradient1", label: "Warm Sunset", bg: "from-orange-600 to-pink-600" },
  { id: "gradient2", label: "Ocean Blue", bg: "from-blue-600 to-cyan-500" },
  { id: "gradient3", label: "Royal Purple", bg: "from-purple-600 to-indigo-600" },
  { id: "gradient4", label: "Forest Green", bg: "from-green-600 to-emerald-500" },
  { id: "gradient5", label: "Golden", bg: "from-yellow-600 to-amber-500" },
  { id: "signal", label: "InsureKit", bg: "from-signal to-blue-600" },
];

const HOW_IT_WORKS = [
  { title: "Pick occasion", desc: "Choose birthday, Diwali, policy anniversary, or custom" },
  { title: "Personalize", desc: "Add client name, your name, and choose a template" },
  { title: "Share via WhatsApp", desc: "Send the greeting directly to your client" },
];

const FAQ_ITEMS = [
  { q: "Why should agents send greeting cards?", a: "Personal greetings build lasting relationships. Clients who feel valued are more likely to renew policies, refer friends, and buy additional plans. A simple birthday wish can generate ₹1 lakh+ in new business." },
  { q: "Can I customize the message?", a: "Yes! Choose 'Custom' from the occasion list to write your own message, or edit any template before sharing. The message is plain text that works perfectly on WhatsApp." },
  { q: "When should I send greetings?", a: "Send birthday wishes, policy anniversary reminders, and festival greetings. The best agents maintain a calendar and never miss an occasion — use InsureKit's Birthday Reminders tool alongside this." },
];

export default function GreetingCardCreator() {
  useEffect(() => { trackEvent('tool:view', { tool: 'greeting-card-creator' }); }, []);
  const [occasion, setOccasion] = useState("birthday");
  const [templateIdx, setTemplateIdx] = useState(0);
  const [clientName, setClientName] = useState("");
  const [agentName, setAgentName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [bgTheme, setBgTheme] = useState("gradient1");
  const cardRef = useRef(null);

  const occ = OCCASIONS.find((o) => o.id === occasion) || OCCASIONS[0];
  const year = new Date().getFullYear() + 1;

  const rawTemplate = occ.templates[Math.min(templateIdx, occ.templates.length - 1)];
  const message = rawTemplate
    .replace(/\{name\}/g, clientName || "Dear Client")
    .replace(/\{year\}/g, String(year))
    .replace(/\{message\}/g, customMessage || "wishing you all the best!");

  const fullMessage = `${message}\n\n${agentName ? `With warm regards,\n${agentName}\nYour LIC Advisor` : "Your LIC Advisor"}\n\n— Created with DoAide InsureKit`;

  const theme = BG_THEMES.find((t) => t.id === bgTheme) || BG_THEMES[0];

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Greeting Card Creator</h1>
      <p className="text-sm text-white/50 mb-6">
        Create personalized greeting cards for clients — birthdays, festivals, policy anniversaries.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-white/60 mb-1">Occasion</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={occasion} onChange={(e) => { setOccasion(e.target.value); setTemplateIdx(0); }}>
            {OCCASIONS.map((o) => (
              <option key={o.id} value={o.id}>{o.emoji} {o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Template</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={templateIdx} onChange={(e) => setTemplateIdx(Number(e.target.value))}>
            {occ.templates.map((_, i) => (
              <option key={i} value={i}>Template {i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Client Name</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Rajesh Ji" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Your Name</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={agentName} onChange={(e) => setAgentName(e.target.value)} placeholder="Your name" />
        </div>
        {occasion === "custom" && (
          <div className="sm:col-span-2">
            <label className="block text-sm text-white/60 mb-1">Custom Message</label>
            <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white h-20" value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} placeholder="Write your personalized message..." />
          </div>
        )}
        <div className="sm:col-span-2">
          <label className="block text-sm text-white/60 mb-2">Card Theme</label>
          <div className="flex flex-wrap gap-2">
            {BG_THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setBgTheme(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${bgTheme === t.id ? "ring-2 ring-white" : "ring-1 ring-white/20"} bg-gradient-to-r ${t.bg} text-white`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={cardRef} className={`bg-gradient-to-br ${theme.bg} rounded-2xl p-8 mb-6 shadow-xl`}>
        <div className="text-center mb-6">
          <span className="text-5xl">{occ.emoji}</span>
        </div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            {occasion === "birthday" ? "Happy Birthday!" : occasion === "anniversary" ? "Happy Policy Anniversary!" : occasion === "diwali" ? "शुभ दीपावली!" : occasion === "newyear" ? `Happy New Year ${year}!` : occasion === "holi" ? "Happy Holi!" : occasion === "raksha" ? "Happy Raksha Bandhan!" : occasion === "independence" ? "Happy Independence Day!" : occ.label}
          </h2>
        </div>
        <div className="bg-black/20 rounded-xl p-5 mb-4 backdrop-blur-sm">
          <p className="text-white text-sm leading-relaxed whitespace-pre-line">{message}</p>
        </div>
        {agentName && (
          <div className="text-center">
            <p className="text-white/70 text-xs">With warm regards,</p>
            <p className="text-white font-semibold text-sm">{agentName}</p>
            <p className="text-white/50 text-xs">Your LIC Advisor</p>
          </div>
        )}
        <div className="text-center mt-4">
          <p className="text-white/30 text-[10px]">insure.doaide.com</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <ShareButtons text={fullMessage} />
        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(fullMessage);
            }
          }}
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white hover:bg-white/20 transition"
        >
          Copy Text
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
        <h3 className="text-sm font-semibold text-white mb-2">Preview Text</h3>
        <pre className="text-xs text-white/60 whitespace-pre-wrap font-sans">{fullMessage}</pre>
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
