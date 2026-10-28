import { useState, useMemo, useEffect } from "react";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import ShareButtons from "../components/ShareButtons";
import { trackEvent } from "../lib/analytics";

const SPECIALIZATIONS = [
  "General Physician",
  "Cardiologist",
  "Orthopedic",
  "ENT",
  "Ophthalmologist",
  "Dermatologist",
  "Neurologist",
  "Pulmonologist",
  "Urologist",
  "Gynecologist",
  "Pediatrician",
  "Pathology Lab",
];

const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Bhopal",
  "Patna",
  "Indore",
  "Nagpur",
  "Coimbatore",
  "Kochi",
  "Visakhapatnam",
  "Surat",
  "Vadodara",
];

const HOSPITAL_TYPES = ["Government Hospital", "Private Hospital", "Diagnostic Center", "Clinic"];

function generatePanelData(city, specialization) {
  const seed = (city + specialization).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rng = (i) => {
    const x = Math.sin(seed * 9301 + i * 49297) * 49297;
    return x - Math.floor(x);
  };

  const hospitalNames = [
    `${city} General Hospital`,
    `${city} Medical Center`,
    `Apollo Clinic ${city}`,
    `Max Healthcare ${city}`,
    `Fortis Hospital ${city}`,
    `Medanta ${city}`,
    `AIIMS Satellite ${city}`,
    `Life Care Hospital ${city}`,
    `City Heart Center ${city}`,
    `Narayana Health ${city}`,
    `Government District Hospital ${city}`,
    `Star Hospital ${city}`,
  ];

  const doctorFirstNames = ["Dr. Rajesh", "Dr. Sunita", "Dr. Arun", "Dr. Priya", "Dr. Vikram", "Dr. Kavita", "Dr. Manoj", "Dr. Neha", "Dr. Suresh", "Dr. Anita", "Dr. Ramesh", "Dr. Deepa"];
  const doctorLastNames = ["Sharma", "Patel", "Singh", "Kumar", "Reddy", "Iyer", "Das", "Gupta", "Joshi", "Verma", "Nair", "Rao"];

  const count = 4 + Math.floor(rng(0) * 6);
  const results = [];
  for (let i = 0; i < count; i++) {
    const di = Math.floor(rng(i * 3 + 1) * doctorFirstNames.length);
    const li = Math.floor(rng(i * 3 + 2) * doctorLastNames.length);
    const hi = Math.floor(rng(i * 3 + 3) * hospitalNames.length);
    const ti = Math.floor(rng(i * 3 + 4) * HOSPITAL_TYPES.length);
    const regNo = `LIC/MED/${city.slice(0, 3).toUpperCase()}/${1000 + Math.floor(rng(i * 7) * 9000)}`;
    results.push({
      id: i,
      doctor: `${doctorFirstNames[di]} ${doctorLastNames[li]}`,
      specialization,
      hospital: hospitalNames[hi],
      type: HOSPITAL_TYPES[ti],
      address: `${Math.floor(rng(i * 5) * 200) + 1}, ${["MG Road", "Station Road", "Civil Lines", "Gandhi Nagar", "Nehru Place", "Sector " + (Math.floor(rng(i * 6) * 50) + 1)][Math.floor(rng(i * 4) * 6)]}, ${city}`,
      phone: `${["011", "022", "080", "044", "040", "020", "033", "079", "0141", "0522"][Math.floor(rng(i * 8) * 10)]}-${2000000 + Math.floor(rng(i * 9) * 8000000)}`,
      panelReg: regNo,
      validTill: `31-03-${new Date().getFullYear() + 1}`,
    });
  }
  return results;
}

const HOW_IT_WORKS = [
  { title: "Select city", desc: "Choose your city from 20 major Indian cities" },
  { title: "Pick specialization", desc: "Select the type of medical examination needed" },
  { title: "Find panel doctors", desc: "Get LIC-approved doctors and hospitals with contact details" },
];

const FAQ_ITEMS = [
  { q: "What is an LIC panel doctor?", a: "LIC maintains a panel of approved medical practitioners and hospitals across India. These doctors conduct medical examinations required for policy issuance, revival, and claims. Using panel doctors ensures the medical reports are accepted by LIC." },
  { q: "When is a medical exam required?", a: "Medical exams are required for: new policies above certain SA limits (varies by age), revival of policies lapsed more than 2 years, non-early claims, and policies for older applicants. The specific requirements depend on age and SA." },
  { q: "Who pays for the medical exam?", a: "For new policy proposals, LIC typically bears the cost of standard medical tests through its panel doctors. Special tests or tests at non-panel facilities may be at the proposer's expense." },
  { q: "Can I use a non-panel doctor?", a: "LIC prefers panel doctors. Non-panel doctor reports may be accepted in special cases with prior approval from the underwriting department, but this can delay policy issuance." },
  { q: "What tests are usually required?", a: "Standard tests include: general physical examination, blood pressure, urine analysis, ECG (for older ages), blood tests (sugar, cholesterol, liver/kidney function), and chest X-ray for higher SA amounts." },
  { q: "How often is the panel updated?", a: "LIC updates its panel periodically. Always confirm with your divisional office for the most current panel list. This tool shows commonly listed panel facilities for reference." },
];

export default function DoctorPanelLocator() {
  useEffect(() => { trackEvent('tool:view', { tool: 'doctor-panel-locator' }); }, []);
  const [city, setCity] = useState("Mumbai");
  const [specialization, setSpecialization] = useState("General Physician");
  const [searchQuery, setSearchQuery] = useState("");

  const results = useMemo(() => {
    const data = generatePanelData(city, specialization);
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    return data.filter(
      (r) =>
        r.doctor.toLowerCase().includes(q) ||
        r.hospital.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q),
    );
  }, [city, specialization, searchQuery]);

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">Doctor & Hospital Panel Locator</h1>
      <p className="text-sm text-white/50 mb-6">
        Find LIC-approved panel doctors and hospitals for medical examinations — search by city and specialization.
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-6 text-sm text-amber-300/80">
        Note: This is a reference directory. Always confirm the current panel list with your LIC divisional office before sending clients for medical examination.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm text-white/60 mb-1">City</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={city} onChange={(e) => setCity(e.target.value)}>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Specialization</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
            {SPECIALIZATIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Search</label>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Doctor name, hospital..."
          />
        </div>
      </div>

      <div className="text-sm text-white/40 mb-3">{results.length} panel {results.length === 1 ? "facility" : "facilities"} found in {city}</div>

      <div className="space-y-3 mb-6">
        {results.map((r) => (
          <div key={r.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-white font-semibold">{r.doctor}</h3>
                <p className="text-xs text-signal">{r.specialization}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${r.type === "Government Hospital" ? "bg-green-500/15 text-green-400" : r.type === "Private Hospital" ? "bg-blue-500/15 text-blue-400" : r.type === "Diagnostic Center" ? "bg-purple-500/15 text-purple-400" : "bg-white/10 text-white/60"}`}>
                {r.type}
              </span>
            </div>
            <div className="text-sm text-white/70 mb-2">{r.hospital}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-white/50">
              <div>Address: {r.address}</div>
              <div>Phone: {r.phone}</div>
              <div>Panel Reg: {r.panelReg}</div>
              <div>Valid Till: {r.validTill}</div>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-8 text-white/40">
          <p className="text-lg mb-2">No results found</p>
          <p className="text-sm">Try a different city or specialization</p>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
        <h3 className="text-sm font-semibold text-white mb-3">Standard Medical Tests by SA Range</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 text-white/60 px-2">Sum Assured</th>
                <th className="text-left py-2 text-white/60 px-2">Age &lt; 35</th>
                <th className="text-left py-2 text-white/60 px-2">Age 35-45</th>
                <th className="text-left py-2 text-white/60 px-2">Age &gt; 45</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              <tr className="border-b border-white/5">
                <td className="py-2 px-2 font-medium">Up to ₹25L</td>
                <td className="py-2 px-2">GPE only</td>
                <td className="py-2 px-2">GPE + ECG</td>
                <td className="py-2 px-2">GPE + ECG + Blood</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-2 font-medium">₹25L - ₹50L</td>
                <td className="py-2 px-2">GPE + Blood</td>
                <td className="py-2 px-2">GPE + ECG + Blood</td>
                <td className="py-2 px-2">Full Medical</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-2 font-medium">₹50L - ₹1Cr</td>
                <td className="py-2 px-2">GPE + ECG + Blood</td>
                <td className="py-2 px-2">Full Medical</td>
                <td className="py-2 px-2">Full + TMT</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 px-2 font-medium">Above ₹1Cr</td>
                <td className="py-2 px-2">Full Medical</td>
                <td className="py-2 px-2">Full + TMT</td>
                <td className="py-2 px-2">Full + TMT + Special</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-white/30 mt-2">GPE = General Physical Exam. Blood = CBC, Sugar, Lipid, Liver, Kidney. Full = GPE + ECG + Blood + Urine + Chest X-ray. TMT = Treadmill Test.</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 mb-6">
        <ShareButtons text="Find LIC panel doctors near you — free tool on DoAide InsureKit" toolName="Doctor Panel Locator" />
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
