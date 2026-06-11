import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { CheckCircle, Eye, Shield, Globe, Award, HelpCircle } from "lucide-react";
import type { GlobalSettings } from "../../types";


interface AdminSettingsProps {
  settings: GlobalSettings | null;
  fetchAdminData: () => void;
  addActivity: (msg: string) => void;
  getAuthHeader: () => any;
}

export default function AdminSettings({ settings, fetchAdminData, addActivity, getAuthHeader }: AdminSettingsProps) {
  const [settingsForm, setSettingsForm] = useState<GlobalSettings | null>(null);
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setSettingsForm(settings);
    }
  }, [settings]);

  const handleSaveSettings = async (e: FormEvent) => {
    e.preventDefault();
    setSettingsSuccessMsg("");
    if (!settingsForm) return;
    setIsSaving(true);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
        },
        body: JSON.stringify(settingsForm)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSettingsForm(data.settings);
        setSettingsSuccessMsg("Corporate settings database updated successfully.");
        addActivity("Modified global settings configurations and address layout.");
        fetchAdminData();
        setTimeout(() => setSettingsSuccessMsg(""), 4000);
      } else {
        alert("Auth failure or validation issue saving settings.");
      }
    } catch (err) {
      alert("Error uploading settings configurations.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!settingsForm) {
    return (
      <div className="py-12 text-center text-slate-500 text-xs font-mono">
        Loading secure corporate credentials profile buffer...
      </div>
    );
  }

  return (
    <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-sm" id="settings-tab-content">
      <div className="pb-4 border-b border-slate-100 flex justify-between items-center flex-wrap gap-2">
        <div>
          <h3 className="text-slate-900 font-extrabold text-base uppercase tracking-tight flex items-center gap-1.5">
            <Shield className="w-5 h-5 text-slate-705" />
            <span>Corporate Sourcing Identity Configurations</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">Adjust global trade registry listings, primary communication details, social handles, and Google Search metadata.</p>
        </div>
        
        <button
          type="submit"
          disabled={isSaving}
          className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition shadow-sm cursor-pointer"
        >
          {isSaving ? "Saving..." : "Apply Identities"}
        </button>
      </div>

      {settingsSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center space-x-2">
          <CheckCircle className="w-4.5 h-4.5 shrink-0 text-emerald-600 animate-bounce" />
          <span>{settingsSuccessMsg}</span>
        </div>
      )}

      {/* Divided Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-705">
        
        {/* Core Corporate Identifiers */}
        <div className="space-y-4">
          <h4 className="text-slate-950 text-xs font-extrabold uppercase tracking-widest border-b border-slate-100 pb-2 text-slate-800">Company Identifiers</h4>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 font-mono">Company Legal Trade Name</label>
            <input
              type="text"
              required
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-slate-500 shadow-sm"
              value={settingsForm.companyName}
              onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 font-mono">Sourcing Portal Desk Email</label>
            <input
              type="email"
              required
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-slate-500 shadow-sm"
              value={settingsForm.email}
              onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 font-mono">Trade Desk Direct Line</label>
            <input
              type="text"
              required
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-slate-500 shadow-sm"
              value={settingsForm.phone}
              onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 font-mono">HQ International Warehouse & Plaza Address</label>
            <textarea
              rows={3}
              required
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-slate-500 resize-none font-sans shadow-sm"
              value={settingsForm.address}
              onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
            />
          </div>
        </div>

        {/* Global SEO Configuration Variables */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-slate-950 text-xs font-extrabold uppercase tracking-widest text-slate-805">Global Crawlers Target</h4>
            <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-150 rounded px-1.5 py-0.5">ACTIVE FEED</span>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 font-mono">Global Default Meta Title prefix</label>
            <input
              type="text"
              required
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-slate-500 shadow-sm"
              value={settingsForm.seo?.seoTitle || ""}
              onChange={(e) => setSettingsForm({ 
                ...settingsForm, 
                seo: { ...(settingsForm.seo || { seoTitle: "", seoKeywords: "", seoDescription: "" }), seoTitle: e.target.value } 
              })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 font-mono">Global Default Keywords Meta (Highly Optimized)</label>
            <textarea
              rows={2}
              required
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-slate-500 resize-none font-sans shadow-sm"
              value={settingsForm.seo?.seoKeywords || ""}
              onChange={(e) => setSettingsForm({ 
                ...settingsForm, 
                seo: { ...(settingsForm.seo || { seoTitle: "", seoKeywords: "", seoDescription: "" }), seoKeywords: e.target.value } 
              })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 font-mono">Global Default Schema Meta Description</label>
            <textarea
              rows={3}
              required
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-slate-500 resize-none font-sans shadow-sm"
              value={settingsForm.seo?.seoDescription || ""}
              onChange={(e) => setSettingsForm({ 
                ...settingsForm, 
                seo: { ...(settingsForm.seo || { seoTitle: "", seoKeywords: "", seoDescription: "" }), seoDescription: e.target.value } 
              })}
            />
          </div>
        </div>
      </div>

      {/* Social Channels Config Link */}
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
        <h4 className="text-slate-900 text-xs font-extrabold uppercase tracking-widest font-sans flex items-center gap-1">
          <Award className="w-4 h-4 text-slate-650" />
          <span>Corporate Social Escrow handles</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-705">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">LinkedIn Channel URL</label>
            <input
              type="url"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-slate-500 shadow-sm font-mono"
              value={settingsForm.social?.linkedin || ""}
              onChange={(e) => setSettingsForm({
                ...settingsForm,
                social: { ...settingsForm.social, linkedin: e.target.value }
              })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">Facebook Page URL</label>
            <input
              type="url"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-slate-500 shadow-sm font-mono"
              value={settingsForm.social?.facebook || ""}
              onChange={(e) => setSettingsForm({
                ...settingsForm,
                social: { ...settingsForm.social, facebook: e.target.value }
              })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">Instagram Hub URL</label>
            <input
              type="url"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-slate-500 shadow-sm font-mono"
              value={settingsForm.social?.instagram || ""}
              onChange={(e) => setSettingsForm({
                ...settingsForm,
                social: { ...settingsForm.social, instagram: e.target.value }
              })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 font-mono">Twitter Profile URL</label>
            <input
              type="url"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-slate-500 shadow-sm font-mono"
              value={settingsForm.social?.twitter || ""}
              onChange={(e) => setSettingsForm({
                ...settingsForm,
                social: { ...settingsForm.social, twitter: e.target.value }
              })}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
