/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Award, Users, Globe2 } from "lucide-react";

export default function CompanyOverview() {
  return (
    <section id="home-company-overview" className="py-20 md:py-28 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="absolute top-[30%] right-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Core Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="overview-grid">
          
          {/* Left: Graphic/Visual Representation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 space-y-6 inline-block w-full shadow-sm">
              <div className="w-12 h-12 bg-slate-900 text-white rounded flex items-center justify-center font-bold">
                <Globe2 className="w-6 h-6 text-slate-100" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-wide">
                Bridging Multi-Sectored Trade Boundaries
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                We organize seamless, legal pipelines of primary hardware and processed consumables. By acting as your direct broker, we shield your supply pipelines against seasonal shortages, tariff swings, and compliance defects.
              </p>
              <div className="border-t border-slate-200 pt-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Global Hub Integration</span>
                  <span className="text-slate-800 font-semibold">ACTIVE [APAC / EMEA]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Logistics Protocols</span>
                  <span className="text-slate-800 font-semibold">ICC INCOTERMS 2020</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Vision Pitch */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase block">
                Corporate Foundations
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Mokshamrit Trades: A Legacy of End-to-End International Sourcing Assurance
              </h2>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed font-light">
              Mokshamrit Trading Company is structured around the core principles of velocity, traceability, and material purity. Rather than acting as a simple intermediary, we manage the entire lifecycle of imported portfolios. From reviewing mill stress-coefficients for scrap machines to certifying the phytosanitary conditions of farm crops, our operations are precise.
            </p>

            {/* Core Pillars Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="overview-pillars">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0 mt-1 border border-slate-200">
                  <Shield className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <h4 className="text-slate-900 text-xs font-bold uppercase tracking-wider mb-1">
                    Risk Shielding Audits
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-light">
                    Every shipment is independently audited by SGS or equivalent inspectors prior to vessel loading.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0 mt-1 border border-slate-200">
                  <Award className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <h4 className="text-slate-900 text-xs font-bold uppercase tracking-wider mb-1">
                    Regulatory Licensing
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-light">
                    Fully accredited custom brokers handling complete cross-border trade filings seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
