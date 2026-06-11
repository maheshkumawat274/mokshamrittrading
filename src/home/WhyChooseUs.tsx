/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, ShieldCheck, TrendingUp, Compass, Award } from "lucide-react";

export default function WhyChooseUs() {
  const values = [
    {
      title: "Traceable origin Procurement",
      desc: "Every metric ton of scrap, fiber bundle, or agro grain is fully traceable to its primary source or production mill.",
      icon: Compass
    },
    {
      title: "Phytosanitary & SGS Compliance",
      desc: "We enforce third-party SGS/Intertek inspections, delivering purity analyses and moisture validation certs.",
      icon: ShieldCheck
    },
    {
      title: "Cost leverage",
      desc: "By trading directly with farm-unions and smelters, we eliminate unneeded broker overhead layers.",
      icon: TrendingUp
    },
    {
      title: "IncoTerms 2020 Compliance",
      desc: "Active logistics departments managing clean ocean container bookings on flexible FOB, CIF, or DDP terms.",
      icon: Award
    }
  ];

  return (
    <section id="home-why-choose-us" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200 font-sans relative overflow-hidden">
      <div className="absolute bottom-[20%] right-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
            Operational Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Enterprise Partners Choose Mokshamrit
          </h2>
          <p className="text-slate-600 text-sm font-light leading-relaxed">
            We provide absolute trade consistency, certified parameters, and risk shielding for large-scale corporate supply networks.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" id="why-choose-grid">
          {values.map((v, i) => (
            <div key={i} className="flex items-start space-x-5 p-6 rounded-lg bg-white border border-slate-200 shadow-sm">
              <div className="w-11 h-11 bg-slate-100 rounded flex items-center justify-center text-slate-800 shrink-0 mt-1 border border-slate-200 animate-pulse-slow">
                <v.icon className="w-5.5 h-5.5 text-slate-700" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-slate-900 font-bold text-sm tracking-wide uppercase">
                  {v.title}
                </h3>
                <p className="text-slate-600 text-xs font-light leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
