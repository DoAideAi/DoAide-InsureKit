const DOAIDE_PRODUCTS = [
  { icon: "\u{1F3F7}️", name: "GST Bot", url: "https://gst.doaide.com", desc: "GST filing & compliance" },
  { icon: "\u{1F4CA}", name: "409A", url: "https://409a.doaide.com", desc: "Startup valuations" },
  { icon: "\u{1F4C8}", name: "Pulse", url: "https://pulse.doaide.com", desc: "Newsletter growth tools" },
  { icon: "\u{1FA7A}", name: "Med", url: "https://med.doaide.com", desc: "Medical tools" },
  { icon: "\u{1F4BC}", name: "Job", url: "https://job.doaide.com", desc: "Job search & career" },
  { icon: "\u{1F5A5}️", name: "Desk", url: "https://desk.doaide.com", desc: "Productivity tools" },
  { icon: "\u{1F3E0}", name: "Realty", url: "https://realty.doaide.com", desc: "Real estate tools" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/7 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">More from DoAide</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {DOAIDE_PRODUCTS.map((t) => (
            <a key={t.url} href={t.url} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-left no-underline transition-colors hover:border-signal/40">
              <span className="text-lg leading-none">{t.icon}</span>
              <span>
                <strong className="block text-sm text-white/80">{t.name}</strong>
                <span className="text-xs text-white/40">{t.desc}</span>
              </span>
            </a>
          ))}
        </div>
        <p className="text-xs mb-4">
          <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="text-signal hover:text-signal-soft no-underline">
            View all DoAide tools &rarr;
          </a>
        </p>
        <div className="text-center text-sm text-white/30">
          <p>
            <a href="https://doaide.com" className="text-signal hover:text-signal-soft no-underline">
              DoAide
            </a>
            {" "}&mdash; Free, no login required
          </p>
          <p className="mt-1 text-xs text-white/20">
            Disclaimer: Calculations are approximate. Verify with LIC before making decisions.
            Not affiliated with LIC of India.
          </p>
        </div>
      </div>
    </footer>
  );
}
