import { useState, useMemo, useEffect } from "react";
import { validateClient } from "../utils/clientStore";
import { useClients } from "../hooks/useClients";
import FAQ from "../components/FAQ";
import PrintButton from "../components/PrintButton";
import HowItWorks from "../components/HowItWorks";
import { trackEvent } from "../lib/analytics";


const HOW_IT_WORKS = [
  { title: "Add clients", desc: "Enter name, birthday, anniversary, and phone" },
  { title: "View upcoming", desc: "See events in the next 7, 14, or 30 days" },
  { title: "Send wishes", desc: "One-tap WhatsApp greeting for each event" },
];

const FAQ_ITEMS = [
  { q: "Why should I track client birthdays and anniversaries?", a: "Sending timely wishes builds personal rapport with clients. It keeps you top-of-mind and leads to referrals and repeat business. Successful LIC agents consistently maintain personal touch with clients." },
  { q: "Where is my client data stored?", a: "If you're signed in, data syncs to the cloud and is available on any device. If not signed in, data is stored locally in your browser (localStorage)." },
  { q: "How do I enter dates?", a: "Enter birthday and anniversary as month-day format (MM-DD). For example, 03-15 for March 15th. The system automatically calculates the next occurrence." },
  { q: "Can I send WhatsApp greetings directly?", a: "Yes! Click the WhatsApp icon next to any upcoming event to open a pre-filled WhatsApp message for that client." },
  { q: "What happens if I clear my browser data?", a: "If signed in, your data is safe in the cloud. If not signed in, all client data will be lost — use Print/PDF to keep a backup." },
];

function computeUpcomingEvents(clients, daysAhead) {
  const now = new Date();
  const events = [];
  for (const client of clients) {
    for (const type of ["birthday", "anniversary"]) {
      const val = client[type];
      if (!val) continue;
      const [month, day] = val.split("-").map(Number);
      const thisYear = now.getFullYear();
      let next = new Date(thisYear, month - 1, day);
      if (next < now) next = new Date(thisYear + 1, month - 1, day);
      const daysUntil = Math.ceil((next - now) / (24 * 60 * 60 * 1000));
      if (daysUntil >= 0 && daysUntil <= daysAhead) {
        events.push({ clientId: client.id, clientName: client.name, type, date: next.toISOString().slice(0, 10), daysUntil, phone: client.phone });
      }
    }
  }
  return events.sort((a, b) => a.daysUntil - b.daysUntil);
}

export default function ClientReminders() {
  useEffect(() => { trackEvent('tool:view', { tool: 'client-reminders' }); }, []);
  const { clients, loading, addClient, updateClient, removeClient, isCloud } = useClients();
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [daysRange, setDaysRange] = useState(30);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    birthday: "",
    anniversary: "",
    notes: "",
  });

  const upcoming = useMemo(() => computeUpcomingEvents(clients, daysRange), [clients, daysRange]);

  const todayEvents = useMemo(() => upcoming.filter((e) => e.daysUntil === 0), [upcoming]);
  const thisWeekEvents = useMemo(() => upcoming.filter((e) => e.daysUntil > 0 && e.daysUntil <= 7), [upcoming]);

  const filteredClients = useMemo(() => {
    if (!search.trim()) return clients;
    const q = search.toLowerCase();
    return clients.filter(
      (c) => c.name?.toLowerCase().includes(q) || c.phone?.includes(q) || c.notes?.toLowerCase().includes(q),
    );
  }, [clients, search]);

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validateClient(form);
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    if (editingId) {
      await updateClient(editingId, form);
      setEditingId(null);
    } else {
      await addClient(form);
    }
    setShowForm(false);
    setErrors([]);
    setForm({ name: "", phone: "", email: "", birthday: "", anniversary: "", notes: "" });
  }

  function startEdit(client) {
    setForm({
      name: client.name || "",
      phone: client.phone || "",
      email: client.email || "",
      birthday: client.birthday || "",
      anniversary: client.anniversary || "",
      notes: client.notes || "",
    });
    setEditingId(client.id);
    setShowForm(true);
    setErrors([]);
  }

  async function handleDelete(id) {
    await removeClient(id);
    if (editingId === id) {
      setEditingId(null);
      setShowForm(false);
    }
  }

  function exportCSV() {
    const header = "Name,Phone,Email,Birthday,Anniversary,Notes\n";
    const rows = clients
      .map((c) => [c.name, c.phone, c.email, c.birthday, c.anniversary, c.notes].map((v) => `"${(v || "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "insurekit-clients.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function getWhatsAppLink(event) {
    const greeting = event.type === "birthday"
      ? `Happy Birthday ${event.clientName} ji! 🎂🎉\n\nWishing you a wonderful year ahead filled with health, happiness, and prosperity!\n\nWarm regards,\nYour LIC Advisor`
      : `Happy Anniversary ${event.clientName} ji! 💐🎊\n\nWishing you and your family many more years of love and togetherness!\n\nWarm regards,\nYour LIC Advisor`;
    return `https://wa.me/${event.phone?.replace(/\D/g, "")}?text=${encodeURIComponent(greeting)}`;
  }

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Client Reminders</h1>
      <p className="text-white/40 text-sm mb-2">
        Track client birthdays and anniversaries — never miss a greeting
      </p>
      <p className="text-white/30 text-xs mb-6 flex items-center gap-1.5">
        <span className="inline-block w-3.5 h-3.5">{isCloud ? "\u{2601}\u{FE0F}" : "\u{1F4BE}"}</span>
        {isCloud ? "Your data is synced to the cloud across all your devices." : "Your reminders are saved in this browser. Sign in to sync across devices."}
      </p>

      {loading && (
        <div className="panel p-8 text-center text-white/40 text-sm mb-6">Loading clients...</div>
      )}

      <HowItWorks steps={HOW_IT_WORKS} />

      {todayEvents.length > 0 && (
        <div className="panel p-4 mb-4 border-l-4 border-l-signal bg-signal/5">
          <div className="text-sm font-bold text-signal mb-2">{"\u{1F389}"} Today&apos;s Events</div>
          <div className="space-y-2">
            {todayEvents.map((event, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{event.type === "birthday" ? "\u{1F382}" : "\u{1F490}"}</span>
                  <div>
                    <span className="text-sm font-medium text-white">{event.clientName}</span>
                    <span className="text-xs text-signal/70 ml-2">{event.type === "birthday" ? "Birthday" : "Anniversary"} today!</span>
                  </div>
                </div>
                {event.phone && (
                  <a href={getWhatsAppLink(event)} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-1.5 px-3 no-underline flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    Send Wishes
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {thisWeekEvents.length > 0 && (
        <div className="panel p-4 mb-4 border-l-4 border-l-warn">
          <div className="text-sm font-medium text-warn mb-2">This Week</div>
          <div className="space-y-2">
            {thisWeekEvents.map((event, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-base">{event.type === "birthday" ? "\u{1F382}" : "\u{1F490}"}</span>
                  <span className="text-white/70">{event.clientName}</span>
                  <span className="text-white/30 text-xs">{event.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40">{event.date}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-warn/15 text-warn">{event.daysUntil}d</span>
                  {event.phone && (
                    <a href={getWhatsAppLink(event)} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:text-[#25D366]/80 transition-colors" title="Send greeting via WhatsApp">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {upcoming.length > 0 && upcoming.some((e) => e.daysUntil > 7) && (
        <div className="panel p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-white">Upcoming Events</div>
            <select
              className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-white/50"
              value={daysRange}
              onChange={(e) => setDaysRange(Number(e.target.value))}
            >
              <option value={7}>Next 7 days</option>
              <option value={14}>Next 14 days</option>
              <option value={30}>Next 30 days</option>
              <option value={60}>Next 60 days</option>
              <option value={90}>Next 90 days</option>
            </select>
          </div>
          <div className="space-y-2">
            {upcoming.filter((e) => e.daysUntil > 7).map((event, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-base">{event.type === "birthday" ? "\u{1F382}" : "\u{1F490}"}</span>
                  <div>
                    <span className="text-white/70">{event.clientName}</span>
                    <span className="text-white/30 text-xs ml-2">{event.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40">{event.date}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/40">{event.daysUntil}d</span>
                  {event.phone && (
                    <a href={getWhatsAppLink(event)} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:text-[#25D366]/80 transition-colors" title="Send greeting via WhatsApp">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="text-sm text-white/40">{clients.length} {clients.length === 1 ? "client" : "clients"}</div>
          {clients.length > 3 && (
            <input
              className="input-field text-xs py-1.5 px-3 w-40"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
        </div>
        <div className="flex gap-2">
          {clients.length > 0 && (
            <button onClick={exportCSV} className="text-xs text-white/40 hover:text-white/60 transition-colors py-2 px-3 border border-white/10 rounded">
              Export CSV
            </button>
          )}
          <PrintButton />
          <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ name: "", phone: "", email: "", birthday: "", anniversary: "", notes: "" }); }} className="btn-primary text-sm py-2 px-4">
            {showForm ? "Cancel" : "+ Add Client"}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="panel p-5 mb-6 animate-fade-up">
          {errors.length > 0 && (
            <div className="mb-4 p-3 rounded-lg bg-bad/10 border border-bad/20 text-bad text-sm">
              {errors.map((e, i) => <div key={i}>{e}</div>)}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Client Name</label>
              <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Rajesh Kumar" />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Phone Number</label>
              <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="e.g. 9876543210" />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Email (optional)</label>
              <input className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="e.g. rajesh@email.com" />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Birthday (MM-DD)</label>
              <input className="input-field" value={form.birthday} onChange={(e) => setForm({ ...form, birthday: e.target.value })} placeholder="e.g. 03-15 for March 15" />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Anniversary (MM-DD)</label>
              <input className="input-field" value={form.anniversary} onChange={(e) => setForm({ ...form, anniversary: e.target.value })} placeholder="e.g. 11-20 for Nov 20" />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">Notes (optional)</label>
              <input className="input-field" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any notes..." />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button type="submit" className="btn-primary text-sm py-2 px-6">{editingId ? "Update Client" : "Save Client"}</button>
          </div>
        </form>
      )}

      {filteredClients.length > 0 ? (
        <div className="space-y-2">
          {filteredClients.map((c) => (
            <div key={c.id} className="panel-inner p-3 flex items-center justify-between">
              <div>
                <div className="text-sm text-white/70">{c.name}</div>
                <div className="text-xs text-white/30 mt-0.5">
                  {c.phone}
                  {c.birthday && <span className="ml-3">{"\u{1F382}"} {c.birthday}</span>}
                  {c.anniversary && <span className="ml-3">{"\u{1F490}"} {c.anniversary}</span>}
                  {c.notes && <span className="ml-3 text-white/20">{c.notes}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 print:hidden">
                <button onClick={() => startEdit(c)} className="text-xs text-white/40 hover:text-signal transition-colors">Edit</button>
                <button onClick={() => handleDelete(c.id)} className="text-xs text-bad/60 hover:text-bad transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !showForm && (
          <div className="panel-inner p-8 text-center text-white/30 text-sm">
            No clients added yet. Click &quot;+ Add Client&quot; to start tracking birthdays and anniversaries.
          </div>
        )
      )}

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
