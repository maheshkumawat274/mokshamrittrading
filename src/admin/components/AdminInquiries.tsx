import { useState } from "react";
import { Mail, Search, Eye, Trash2, Shield, Calendar, Phone, Globe, MessageSquare, AlertCircle } from "lucide-react";
import type { ContactInquiry } from "../../types";
import API_ENDPOINTS from "@/src/api/apiCall";


interface AdminInquiriesProps {
  inquiries: ContactInquiry[];
  fetchAdminData: () => void;
  addActivity: (msg: string) => void;
  getAuthHeader: () => any;
}

export default function AdminInquiries({ inquiries, fetchAdminData, addActivity, getAuthHeader }: AdminInquiriesProps) {
  const [inquirySearch, setInquirySearch] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);

  // Filter list
  const filteredInquiries = inquiries.filter(inq => 
    inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
    inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
    inq.subject.toLowerCase().includes(inquirySearch.toLowerCase())
  );

  const handleDeleteInquiry = async (id: number) => {
  if (!window.confirm("Delete this inquiry?")) return;

  try {
    const res = await fetch(
      `${API_ENDPOINTS.CONTACT_DELETE}?id=${id}`
    );

    const data = await res.json();

    if (data.success) {
      addActivity(`Deleted inquiry ID: ${id}`);
      fetchAdminData();

      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6" id="inquiries-tab-content">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 mb-4 gap-2">
        <div>
          <h3 className="text-slate-900 font-extrabold text-base uppercase tracking-tight flex items-center gap-2">
            <Mail className="w-5 h-5 text-slate-705" />
            <span>Dry Port & Trade Lead Inquiries Log</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">Review and process customer transaction orders and heavy alloy/apparel raw material sourcing requirements.</p>
        </div>
        <span className="text-[10px] font-mono bg-slate-100 px-3 py-1 rounded-full text-slate-700 font-bold uppercase tracking-wider">
          {inquiries.length} Messages total
        </span>
      </div>

      {/* FILTER SEARCH */}
      <div className="flex items-center space-x-3 bg-slate-50 p-2.5 rounded-xl border border-slate-205 shadow-inner">
        <Search className="w-4 h-4 text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="Filter customer inquiries by sender email, company query subject, or keyword..."
          className="w-full bg-transparent text-xs text-slate-800 outline-none border-none placeholder-slate-400 font-sans"
          value={inquirySearch}
          onChange={(e) => setInquirySearch(e.target.value)}
        />
      </div>

      {/* LIST OR CARDS */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="py-12 bg-slate-50 border border-slate-200 rounded-xl text-center text-slate-450 font-mono text-xs">
            No incoming cargo sourcing specifications matched the query filters.
          </div>
        ) : (
          filteredInquiries.map((inq) => (
            <div 
              key={inq.id} 
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm relative group transition-all hover:border-slate-350 hover:shadow"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-3 mb-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <h4 className="text-slate-900 font-extrabold text-sm leading-tight flex items-center gap-2 flex-wrap">
                    <span>{inq.subject}</span>
                    <span className="text-[9px] font-mono font-extrabold rounded px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200">JOB REQ #{inq.id}</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Sourcing Lead: <strong className="text-slate-800">{inq.name}</strong> &bull; <a href={`mailto:${inq.email}`} className="text-slate-800 underline hover:text-slate-950 font-semibold">{inq.email}</a>
                    {inq.phone && <span className="font-mono"> &bull; Mob: {inq.phone}</span>}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-slate-455 md:text-right shrink-0 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{new Date(inq.createdDate).toLocaleString()}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap max-h-36 overflow-y-auto">
                {inq.message}
              </div>

              {/* ACTION ROW */}
              <div className="mt-3 flex flex-col sm:flex-row justify-between items-stretch sm:items-center text-[10px] font-mono text-slate-400 gap-2 font-semibold uppercase pt-2">
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Escrow compliance verified &bull; Sourcing Hub Gurugram</span>
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedInquiry(inq)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-extrabold cursor-pointer inline-flex items-center space-x-1 uppercase text-[9px] shadow-sm transition"
                  >
                    <Eye className="w-3 h-3 text-slate-700" />
                    <span>Deep Read</span>
                  </button>
                  <button
                    onClick={() => handleDeleteInquiry(inq.id)}
                    className="px-3 py-1.5 rounded-lg border border-red-200 bg-white hover:bg-red-50 text-red-650 font-extrabold cursor-pointer inline-flex items-center space-x-1 uppercase text-[9px] shadow-sm transition"
                  >
                    <Trash2 className="w-3 h-3 text-red-600" />
                    <span>Purge Log</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SELECTED DEEP READER DIALOG DRAW / DRAWER / SUMMARY OVERLAY */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            
            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-slate-850" />
                <span className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Secure Escrow Sourcing Document</span>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-slate-900 text-lg font-bold font-mono px-2 cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 text-slate-700">
              
              <div className="space-y-2">
                <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-150 uppercase tracking-wider block w-fit">
                  INCOMING BLOCK TRACE
                </span>
                <h4 className="text-slate-900 font-extrabold text-lg leading-snug">{selectedInquiry.subject}</h4>
              </div>

              {/* Sender Details Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Exporter Specifier Name</span>
                  <span className="font-bold text-slate-805 block">{selectedInquiry.name}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Official Contact Mail</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-slate-900 font-bold block hover:underline">{selectedInquiry.email}</a>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Phone / Mobile</span>
                  <span className="font-bold text-slate-805 block">{selectedInquiry.phone || "Not specified"}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Reception Node Date</span>
                  <span className="font-bold text-slate-805 block">{new Date(selectedInquiry.createdDate).toLocaleString()}</span>
                </div>
              </div>

              {/* Real Sourcing Specifier Statement */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Raw Specifier Message Statement</span>
                </span>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-sans text-xs text-slate-805 whitespace-pre-wrap leading-relaxed shadow-inner max-h-52 overflow-y-auto">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* ESCROW COMPLIANCE ALERT */}
              <div className="p-3 bg-blue-50 border border-blue-150 text-[11px] rounded-lg text-blue-800 flex items-start space-x-2.5 font-sans leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-blue-700" />
                <div>
                  <strong className="block font-bold">Standard ICC IncoTerms CIF/FOB Safeguards:</strong>
                  Ensure matching letter of credit (L/C) files are verified with Mokshamrit Corporate Plaza sourcing guidelines before initiating metal alloy casting pipelines or dry crop logistics block assignments.
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center px-6">
              <span className="text-[10px] text-slate-400 font-mono">ID Trace: {selectedInquiry.id}</span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-slate-700 text-xs font-bold transition cursor-pointer shadow-sm"
                >
                  Dismiss Document
                </button>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=RE: Mokshamrit Trading Company Inquiry - ${selectedInquiry.subject}`}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-1 shadow-md"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Initiate Email Reply</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
