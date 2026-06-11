/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock, BookOpen } from "lucide-react";

export default function BlogHero() {
  return (
    <section 
      id="blog-hero-section" 
      className="relative bg-slate-50 text-slate-900 border-b border-slate-200 min-h-[40vh] flex items-center pt-24 pb-12 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[5%] w-80 h-80 bg-slate-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-slate-300/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center lg:text-left">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-705 font-mono text-[9px] uppercase tracking-widest leading-none mx-auto lg:mx-0 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>Market Research & Sourcing Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight leading-tight font-sans">
            Mokshamrit Insights <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-705 to-slate-800 font-extrabold">
              Intel Desk Reports
            </span>
          </h1>

          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl font-sans font-light mx-auto lg:mx-0">
            Explore deep macro-economic analyses, supply chain optimization strategies, ISRI specification updates, and regulatory customs compliance guides written by our global trade desks.
          </p>
        </div>
      </div>
    </section>
  );
}
