/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Target, Compass } from "lucide-react";

export default function MissionVision() {
  return (
    <section id="about-mission-vision" className="py-20 bg-slate-50 border-b border-slate-200 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="vision-mission-cards">
          
          {/* Mission Card */}
          <div className="p-8 rounded-lg bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-200">
              <Target className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">
              Corporate Mission Statement
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed font-light font-sans">
              To operate secure, fully compliant supply pipelines that insulate international buying organizations from material impurities, border delays, and logistics inflation. We ensure that every metric ton of scrap or yard machinery meets or exceeds global ISRI parameters and national industry norms instantly.
            </p>
          </div>

          {/* Vision Card */}
          <div className="p-8 rounded-lg bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-200">
              <Compass className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">
              Strategic Vision Roadmap
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed font-light font-sans">
              To establish Mokshamrit as the standard-defining corporate brokerage house for mid-to-large-scale commodity sourcing. By integrating digital trace tokens and blockchain-level provenance audits across agricultural yields, leather tanned loads, and apparel lines, we aim to eliminate trade compromises altogether by 2028.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
