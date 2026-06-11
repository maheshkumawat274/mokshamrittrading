import { 
  FileText, Mail, Globe, ArrowRight, Shield, Anchor, Compass, CheckCircle, Smartphone, Terminal, HelpCircle
} from "lucide-react";
import type { BlogItem, ContactInquiry } from "../../types";

interface AdminDashboardProps {
  blogs: BlogItem[];
  inquiries: ContactInquiry[];
  activities: string[];
  onNavigateTab: (tab: any) => void;
}

export default function AdminDashboard({ blogs, inquiries, activities, onNavigateTab }: AdminDashboardProps) {
  // Pre-configured import/export active shipment telemetry
  const shipmentRoutes = [
    { id: "MTC-9041", origin: "Mundra Port, India (INMUN)", destination: "Rotterdam, Netherlands (NLROT)", cargo: "Recycled Steel Scrap & Heavy Alloys", weight: "240 Metric Tons", status: "Customs Cleared", date: "2026-06-10" },
    { id: "MTC-3820", origin: "Chennai Port, India (INMAA)", destination: "Hamburg Port, Germany (DEHAM)", cargo: "Premium Organic Cotton Fabrics", weight: "85 Metric Tons", status: "Vessel En Route", date: "2026-06-08" },
    { id: "MTC-7521", origin: "Shanghai Port, China (CNSHA)", destination: "Nhava Sheva, India (INNSA)", cargo: "Industrial Gearboxes & CNC Lathes", weight: "120 Metric Tons", status: "Sourcing Approved", date: "2026-06-09" },
    { id: "MTC-1052", origin: "Rotterdam, Netherlands (NLROT)", destination: "Kolkata Port, India (INCCU)", cargo: "FOB Grade Food Processing Units", weight: "45 Metric Tons", status: "Discharged & Inland", date: "2026-06-05" }
  ];

  return (
    <div className="space-y-6" id="dashboard-tab-content">
      
      {/* Core Stats Bento Block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Blogs Card */}
        <div className="bg-white border border-slate-205 rounded-xl p-5 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SEO Blog Insights</p>
            <h2 className="text-3xl font-extrabold text-slate-900 font-mono">{blogs.length}</h2>
            <p className="text-[10px] text-slate-400">Deployed dynamic articles</p>
          </div>
          <div className="w-11 h-11 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-800 shadow-sm">
            <FileText className="w-5 h-5 text-slate-705" />
          </div>
        </div>

        {/* Total Contact Inquiries Card */}
        <div className="bg-white border border-slate-205 rounded-xl p-5 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Trade Inquiries</p>
            <h2 className="text-3xl font-extrabold text-slate-900 font-mono">{inquiries.length}</h2>
            <p className="text-[10px] text-slate-400 font-sans">Active import/export leads</p>
          </div>
          <div className="w-11 h-11 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-800 shadow-sm">
            <Mail className="w-5 h-5 text-slate-705" />
          </div>
        </div>

        {/* Total Tonnage Handled Card */}
        <div className="bg-white border border-slate-205 rounded-xl p-5 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cargo Tonnage</p>
            <h2 className="text-3xl font-extrabold text-slate-900 font-mono">490</h2>
            <p className="text-[10px] text-slate-400">Metric tons handled this cycle</p>
          </div>
          <div className="w-11 h-11 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-800 shadow-sm">
            <Anchor className="w-5 h-5 text-slate-705" />
          </div>
        </div>

        {/* Search Engine Global Status */}
        <div className="bg-white border border-slate-205 rounded-xl p-5 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI & SEO Score</p>
            <h2 className="text-3xl font-extrabold text-emerald-600 font-mono">98%</h2>
            <p className="text-[10px] text-slate-400">Search engine indexable status</p>
          </div>
          <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-sm animate-pulse">
            <Compass className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* NEW: Import-Export Visual Shipment Tracker & Route Controller */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 mb-4 gap-2">
          <div>
            <h3 className="font-sans font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <Anchor className="w-4 h-4 text-slate-700" />
              <span>FOB & CIF Active Vessel Telemetry Brokerage</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Active shipping blocks verified under ICC IncoTerms regulations for premium metals, agriculture grads, and electronics elements.
            </p>
          </div>
          <span className="text-[9px] font-mono bg-blue-50 border border-blue-150 px-2 py-0.5 rounded text-blue-700 font-bold uppercase tracking-widest">
            Live Vessel Sync
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-mono text-[10px] uppercase bg-slate-50/50">
                <th className="py-2.5 px-3">Vessel Job ID</th>
                <th className="py-2.5 px-3">Sourcing Route origin/destination</th>
                <th className="py-2.5 px-3">Specifications (Cargo)</th>
                <th className="py-2.5 px-3">Metric Tonnage</th>
                <th className="py-2.5 px-3 text-right">Clearance status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {shipmentRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{route.id}</td>
                  <td className="py-3 px-3 text-slate-700">
                    <span className="font-bold block text-[11px]">{route.origin}</span>
                    <span className="text-[10px] text-slate-400 font-semibold block flex items-center gap-1 mt-0.5">
                      <ArrowRight className="w-3 h-3 text-slate-400" /> {route.destination}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-medium">{route.cargo}</td>
                  <td className="py-3 px-3 font-mono text-slate-800 font-extrabold">{route.weight}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      route.status === "Customs Cleared" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                      route.status === "Vessel En Route" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                      route.status === "Sourcing Approved" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                      "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}>
                      {route.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Console Logs & Activity Logs */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <h3 className="font-sans font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-700" />
            <span>HQ Sourcing Audit Logs & System Telemetry</span>
          </h3>
          <span className="text-[9px] font-mono bg-slate-100 px-2.5 py-0.5 rounded text-slate-700 font-bold tracking-wider">
            CONSOLE SECURED
          </span>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-xs text-slate-300 space-y-2 h-44 overflow-y-auto leading-relaxed shadow-inner">
          {activities.map((log, index) => (
            <div key={index} className="flex space-x-2">
              <span className="text-slate-550 font-bold">&gt;</span>
              <span className="text-slate-200 font-light">{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Administrative Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 shadow-sm">
          <h4 className="text-slate-900 font-extrabold text-sm uppercase tracking-wide flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-slate-650" />
            <span>GEO-Optimized Sourcing Directory</span>
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-light font-sans">
            Mokshamrit Trading operates multi-port dry and sea freight channels optimized for search bots. By customizing localized headers, keywords, and container logs, our platform stays globally active across major indices (Google, Bing, Gemini Deep Search, ChatGPT crawlers).
          </p>
          <div className="pt-2 text-[11px] text-slate-900 font-bold font-mono hover:underline cursor-pointer flex items-center space-x-1" onClick={() => onNavigateTab("settings")}>
            <span>Manage SEO Profiles & identities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 shadow-sm">
          <h4 className="text-slate-900 font-extrabold text-sm uppercase tracking-wide flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-slate-650" />
            <span>Secured Escrow & Contract Gateway</span>
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-light font-sans">
            Every transaction is recorded here safely for verification. If customers send inquiry packages containing custom specification targets or alloy percentages, they appear under the contact inquiries log immediately where they can be printed or cleared.
          </p>
          <div className="pt-2 text-[11px] text-slate-900 font-bold font-mono hover:underline cursor-pointer flex items-center space-x-1" onClick={() => onNavigateTab("inquiries")}>
            <span>View Active Escrow Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
