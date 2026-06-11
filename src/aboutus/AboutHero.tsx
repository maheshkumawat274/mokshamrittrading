/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock, ShieldCheck } from "lucide-react";

export default function AboutHero() {
  return (
    <section 
      id="about-hero-section" 
      className="relative bg-slate-50 text-slate-900 border-b border-slate-200 min-h-[50vh] flex items-center pt-24 pb-12 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[10%] w-80 h-80 bg-slate-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-slate-300/20 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Simple grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center lg:text-left">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-705 font-mono text-[9px] uppercase tracking-widest leading-none mx-auto lg:mx-0 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Company Background Profile</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight uppercase font-sans">
            Architects of Secure <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-705 to-slate-800 font-extrabold">
              Global Supply Pipelines
            </span>
          </h1>

          <p className="text-slate-600 text-sm leading-relaxed font-sans font-light">
            Mokshamrit Trading Company operates a multi-sectored licensing network, managing international procurement, customs clearance, and dynamic distribution logistics for 8 critical trade divisions.
          </p>
        </div>
      </div>
    </section>
  );
}
