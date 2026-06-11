/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Send, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Metal Scrap Reclamation Division Sourcing",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const subjectOptions = [
    "Scrap Trading Machines Procurement",
    "Fabric & Custom Clothing Sourcing",
    "Corporate Premium Merchandising",
    "Leather Goods & Portfolios Trade",
    "Semiconductors & Electronics Assemblies",
    "Agricultural crops grains Trade",
    "Metal Scrap Reclamation Division Sourcing",
    "Commercial Teak Contract Furniture"
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    // Validate standard constraints
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Mandatory specifications missing. Name, Email, and Message are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(data.message || "Thank you! Your communication has been dispatched to our trade desks.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Metal Scrap Reclamation Division Sourcing",
          message: ""
        });
      } else {
        setErrorMsg(data.error || "Compliance block triggered. Form not submitted.");
      }
    } catch (err) {
      setErrorMsg("Terminal network connection loss. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact-form-component" className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 shadow-md font-sans text-slate-700">
      
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h3 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">
          Establish encrypted communication
        </h3>
        <p className="text-xs text-slate-500 mt-1">Submit your specification query here to prompt direct trade representative action.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" id="sourcing-contact-form">
        
        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-250 rounded text-xs text-emerald-800 flex items-start space-x-3" id="contact-success-alert">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold block uppercase tracking-wide">Submission Complete</strong>
              <p className="font-light">{successMsg}</p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-start space-x-3" id="contact-error-alert">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold block uppercase tracking-wide">Validation Block triggered</strong>
              <p className="font-light">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Divided row for Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              Client Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded outline-none focus:border-slate-500 shadow-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              id="form-input-name"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              Corporate Email *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. john.doe@enterprise.com"
              className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded outline-none focus:border-slate-500 shadow-sm"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              id="form-input-email"
            />
          </div>
        </div>

        {/* Divided phone & subject */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              Contact Telephone / Mobile
            </label>
            <input
              type="tel"
              placeholder="e.g. +91 99999 88888"
              className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded outline-none focus:border-slate-500 shadow-sm"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              id="form-input-phone"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              Sourcing Sector Scope
            </label>
            <select
              className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded outline-none focus:border-slate-500 shadow-sm cursor-pointer"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              id="form-input-subject"
            >
              {subjectOptions.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Message body */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
            Trade Specifications / Query Details *
          </label>
          <textarea
            rows={5}
            required
            placeholder="Type bulk size limits, alloy spectrometry targets, target delivery port code, or custom machinery load parameters..."
            className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-3 rounded outline-none focus:border-slate-500 shadow-sm resize-none font-sans"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            id="form-input-message"
          />
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded transition flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            id="form-submit-btn"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Query</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
