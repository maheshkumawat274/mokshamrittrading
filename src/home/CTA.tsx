/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function CTA() {
  return (
    <section id="home-cta-block" className="py-20 bg-white border-t border-slate-200 font-sans relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 text-center space-y-6 md:space-y-8 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-slate-700 font-mono text-[9px] uppercase tracking-widest shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          <span>Secured Corporate Escrow Accounts Only</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Secure Your Global Sourcing Contracts Today
        </h2>
        
        <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed font-light font-sans">
          Connect directly with our multi-sectored trade desks. Request dynamic material sample distributions, inspect transport routes, or verify standard compliance parameters cleanly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wider uppercase transition shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
            id="cta-primary-btn"
          >
            <span>Initiate trade Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="mailto:contact@mokshamrittradingcompany.com"
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-white border border-slate-300 text-slate-750 hover:bg-slate-55 hover:text-slate-900 font-bold text-xs tracking-wider uppercase transition flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
            id="cta-email"
          >
            <Mail className="w-4 h-4 text-slate-505" />
            <span>contact@mokshamrittradingcompany.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
