import { useState, useMemo, useEffect } from "react";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import ShareButtons from "../components/ShareButtons";
import { trackEvent } from "../lib/analytics";

const HOW_IT_WORKS = [
  { title: "Select state", desc: "Choose your state from the dropdown" },
  { title: "Find branch", desc: "Browse divisional and branch offices" },
  { title: "Get directions", desc: "Open the location in Google Maps" },
];

const FAQ_ITEMS = [
  { q: "How do I find my nearest LIC branch?", a: "Select your state and city from the filters. You can also search by branch name or address. Click 'Get Directions' to open the location in Google Maps." },
  { q: "Can I visit any LIC branch for my policy?", a: "Yes, most LIC services are available at any branch. However, for policy-specific queries, your servicing branch (mentioned on your policy bond) may be more helpful." },
  { q: "What are LIC's office hours?", a: "Most LIC branches are open Monday to Friday, 10:00 AM to 5:30 PM. Some branches open on alternate Saturdays. Timings may vary by location." },
];

const LIC_OFFICES = [
  { state: "Andhra Pradesh", city: "Hyderabad", name: "LIC Divisional Office, Hyderabad", type: "Divisional", address: "Jeevan Prakash, Tilak Road, Abids, Hyderabad - 500001", phone: "040-24756035" },
  { state: "Andhra Pradesh", city: "Visakhapatnam", name: "LIC Divisional Office, Visakhapatnam", type: "Divisional", address: "Jeevan Jyoti, Siripuram, Visakhapatnam - 530003", phone: "0891-2564035" },
  { state: "Andhra Pradesh", city: "Rajahmundry", name: "LIC Divisional Office, Rajahmundry", type: "Divisional", address: "D.No. 7-26-2, Innespeta, Rajahmundry - 533101", phone: "0883-2441035" },
  { state: "Bihar", city: "Patna", name: "LIC Zonal Office, Patna", type: "Zonal", address: "Jeevan Prakash, Fraser Road, Patna - 800001", phone: "0612-2219025" },
  { state: "Chhattisgarh", city: "Raipur", name: "LIC Divisional Office, Raipur", type: "Divisional", address: "Jeevan Bima Marg, Raipur - 492001", phone: "0771-4057035" },
  { state: "Delhi", city: "New Delhi", name: "LIC Zonal Office, Delhi", type: "Zonal", address: "Jeevan Prakash, 25 KG Marg, New Delhi - 110001", phone: "011-23316825" },
  { state: "Delhi", city: "New Delhi", name: "LIC Divisional Office I, Delhi", type: "Divisional", address: "Jeevan Anand, 3rd Floor, Parliament Street, New Delhi - 110001", phone: "011-23739935" },
  { state: "Delhi", city: "New Delhi", name: "LIC Divisional Office II, Delhi", type: "Divisional", address: "Jeevan Tara, 5 Pusa Road, New Delhi - 110005", phone: "011-25787835" },
  { state: "Goa", city: "Panaji", name: "LIC Divisional Office, Goa", type: "Divisional", address: "Jeevan Shikha, Menezes Braganza Road, Panaji - 403001", phone: "0832-2224735" },
  { state: "Gujarat", city: "Ahmedabad", name: "LIC Zonal Office, Ahmedabad", type: "Zonal", address: "Jeevan Prakash, Tilak Marg, Ahmedabad - 380001", phone: "079-25507125" },
  { state: "Gujarat", city: "Rajkot", name: "LIC Divisional Office, Rajkot", type: "Divisional", address: "Jeevan Prakash, Dhebar Road, Rajkot - 360001", phone: "0281-2477035" },
  { state: "Gujarat", city: "Vadodara", name: "LIC Divisional Office, Vadodara", type: "Divisional", address: "Jeevan Vaibhav, Tilak Road, Vadodara - 390001", phone: "0265-2431035" },
  { state: "Haryana", city: "Gurugram", name: "LIC Divisional Office, Gurugram", type: "Divisional", address: "Plot No.26, Sector-44, Gurugram - 122003", phone: "0124-4014035" },
  { state: "Jharkhand", city: "Ranchi", name: "LIC Divisional Office, Ranchi", type: "Divisional", address: "Jeevan Deep, Main Road, Ranchi - 834001", phone: "0651-2331035" },
  { state: "Karnataka", city: "Bengaluru", name: "LIC Zonal Office, Bengaluru", type: "Zonal", address: "Jeevan Prakash, J.C. Road, Bengaluru - 560002", phone: "080-22211925" },
  { state: "Karnataka", city: "Bengaluru", name: "LIC Divisional Office I, Bengaluru", type: "Divisional", address: "Jeevan Vikas, 5th Floor, JC Road, Bengaluru - 560002", phone: "080-22100735" },
  { state: "Kerala", city: "Thiruvananthapuram", name: "LIC Zonal Office, Thiruvananthapuram", type: "Zonal", address: "Jeevan Prakash, Pattom, Thiruvananthapuram - 695004", phone: "0471-2540025" },
  { state: "Kerala", city: "Kochi", name: "LIC Divisional Office, Kochi", type: "Divisional", address: "Jeevan Dhara, MG Road, Kochi - 682016", phone: "0484-2363035" },
  { state: "Madhya Pradesh", city: "Bhopal", name: "LIC Zonal Office, Bhopal", type: "Zonal", address: "Jeevan Prakash, Sultania Road, Bhopal - 462001", phone: "0755-2765025" },
  { state: "Madhya Pradesh", city: "Indore", name: "LIC Divisional Office, Indore", type: "Divisional", address: "Jeevan Nirman, 19/1 M.G. Road, Indore - 452001", phone: "0731-2432035" },
  { state: "Maharashtra", city: "Mumbai", name: "LIC Central Office", type: "Central", address: "Yogakshema, Jeevan Bima Marg, Mumbai - 400021", phone: "022-22027000" },
  { state: "Maharashtra", city: "Mumbai", name: "LIC Western Zonal Office", type: "Zonal", address: "Yogakshema, Jeevan Bima Marg, Mumbai - 400021", phone: "022-22819025" },
  { state: "Maharashtra", city: "Mumbai", name: "LIC Divisional Office I, Mumbai", type: "Divisional", address: "Jeevan Seva, S.V.Road, Santacruz (W), Mumbai - 400054", phone: "022-26491035" },
  { state: "Maharashtra", city: "Pune", name: "LIC Divisional Office, Pune", type: "Divisional", address: "Jeevan Prakash, Bund Garden Road, Pune - 411001", phone: "020-26120035" },
  { state: "Maharashtra", city: "Nagpur", name: "LIC Divisional Office, Nagpur", type: "Divisional", address: "Jeevan Prakash, South Ambazari Road, Nagpur - 440010", phone: "0712-2557035" },
  { state: "Odisha", city: "Bhubaneswar", name: "LIC Divisional Office, Bhubaneswar", type: "Divisional", address: "Jeevan Prakash, Sachivalay Marg, Bhubaneswar - 751001", phone: "0674-2390035" },
  { state: "Punjab", city: "Chandigarh", name: "LIC Zonal Office, Chandigarh", type: "Zonal", address: "Jeevan Prakash, Sector 17-B, Chandigarh - 160017", phone: "0172-2704025" },
  { state: "Rajasthan", city: "Jaipur", name: "LIC Divisional Office, Jaipur", type: "Divisional", address: "Jeevan Nidhi, Bhawani Singh Road, Jaipur - 302005", phone: "0141-2740035" },
  { state: "Tamil Nadu", city: "Chennai", name: "LIC Zonal Office, Chennai", type: "Zonal", address: "Jeevan Illam, 15 Marshall's Road, Chennai - 600008", phone: "044-28550025" },
  { state: "Tamil Nadu", city: "Chennai", name: "LIC Divisional Office I, Chennai", type: "Divisional", address: "Jeevan Sudha, No.7, Swami Sivananda Salai, Chennai - 600002", phone: "044-28447035" },
  { state: "Tamil Nadu", city: "Madurai", name: "LIC Divisional Office, Madurai", type: "Divisional", address: "Jeevan Prakash, 85 West Veli Street, Madurai - 625001", phone: "0452-2342035" },
  { state: "Telangana", city: "Hyderabad", name: "LIC Zonal Office, Hyderabad", type: "Zonal", address: "Jeevan Prakash, Tilak Road, Abids, Hyderabad - 500001", phone: "040-24756025" },
  { state: "Uttar Pradesh", city: "Lucknow", name: "LIC Zonal Office, Lucknow", type: "Zonal", address: "Jeevan Prakash, Hazratganj, Lucknow - 226001", phone: "0522-2622625" },
  { state: "Uttar Pradesh", city: "Kanpur", name: "LIC Divisional Office, Kanpur", type: "Divisional", address: "Jeevan Prakash, 14/129 Civil Lines, Kanpur - 208001", phone: "0512-2304035" },
  { state: "Uttar Pradesh", city: "Varanasi", name: "LIC Divisional Office, Varanasi", type: "Divisional", address: "Jeevan Deep, S-20/116A, Sigra, Varanasi - 221010", phone: "0542-2221035" },
  { state: "West Bengal", city: "Kolkata", name: "LIC Zonal Office, Kolkata", type: "Zonal", address: "Jeevan Prakash, 4 C.R. Avenue, Kolkata - 700072", phone: "033-22129025" },
  { state: "West Bengal", city: "Kolkata", name: "LIC Divisional Office I, Kolkata", type: "Divisional", address: "Jeevan Sudha, 2 Ganesh Chandra Avenue, Kolkata - 700013", phone: "033-22361035" },
];

const STATES = [...new Set(LIC_OFFICES.map((o) => o.state))].sort();

const TYPE_BADGE = {
  Central: "bg-purple-400/10 text-purple-400",
  Zonal: "bg-amber-400/10 text-amber-400",
  Divisional: "bg-signal/10 text-signal",
};

export default function BranchLocator() {
  useEffect(() => { trackEvent('tool:view', { tool: 'branch-locator' }); }, []);
  const [selectedState, setSelectedState] = useState("");
  const [searchText, setSearchText] = useState("");

  const filtered = useMemo(() => {
    let list = LIC_OFFICES;
    if (selectedState) {
      list = list.filter((o) => o.state === selectedState);
    }
    if (searchText) {
      const q = searchText.toLowerCase();
      list = list.filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          o.city.toLowerCase().includes(q) ||
          o.address.toLowerCase().includes(q) ||
          o.state.toLowerCase().includes(q),
      );
    }
    return list;
  }, [selectedState, searchText]);

  return (
    <div className="animate-fade-up">
      <h1 className="text-2xl font-bold text-white mb-1">LIC Branch & Office Locator</h1>
      <p className="text-white/40 text-sm mb-6">
        Find LIC zonal, divisional, and branch offices across India
      </p>

      <HowItWorks steps={HOW_IT_WORKS} />

      <div className="panel p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-white/50 mb-1">State</label>
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="input w-full">
              <option value="">All States</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Search</label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by city, office name..."
              className="input w-full"
            />
          </div>
        </div>
      </div>

      <div className="text-xs text-white/30 mb-3">{filtered.length} offices found</div>

      <div className="space-y-2 mb-6">
        {filtered.map((office, i) => (
          <div key={i} className="panel p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold text-white">{office.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${TYPE_BADGE[office.type]}`}>
                    {office.type}
                  </span>
                </div>
                <div className="text-xs text-white/40 mb-1">{office.address}</div>
                {office.phone && (
                  <div className="text-xs text-white/30">
                    Phone: <span className="text-white/50">{office.phone}</span>
                  </div>
                )}
              </div>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(office.name + " " + office.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-signal hover:text-signal/80 shrink-0 no-underline"
              >
                📍 Directions
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="panel p-6 text-center">
          <p className="text-white/40">No offices found matching your search</p>
        </div>
      )}

      <div className="panel p-4 mb-6">
        <h3 className="text-sm font-semibold text-white mb-2">Useful LIC Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-signal">→</span>
            <span className="text-white/50">LIC Customer Portal: </span>
            <span className="text-white/70">licindia.in</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-signal">→</span>
            <span className="text-white/50">LIC Toll-Free: </span>
            <span className="text-white/70">1800-227-717</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-signal">→</span>
            <span className="text-white/50">Policy Status: </span>
            <span className="text-white/70">licindia.in/policy-status</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-signal">→</span>
            <span className="text-white/50">Premium Payment: </span>
            <span className="text-white/70">licindia.in/pay-premium</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 mb-6">
        <ShareButtons text="Find your nearest LIC branch office — free tool on DoAide InsureKit" toolName="LIC Branch Locator" />
      </div>

      <FAQ items={FAQ_ITEMS} />
    </div>
  );
}
