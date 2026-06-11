/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Wrench, Shield, Check, Cpu, Hammer, Hotel, ShoppingBag } from "lucide-react";

export default function Industries() {
  const sectors = [
    {
      title: "Heavy Metals & Smelting",
      desc: "Providing induction mills and yards with high-purity sheared steel, HMS, and high-conductivity copper.",
      icon: Hammer,
      metric: "99.9% Purity standard"
    },
    {
      title: "Hospitality & Commercial Setup",
      desc: "Source custom teak furniture and five-star quality leather accessories directly from heritage joineries.",
      icon: Hotel,
      metric: "SVLK Timber Certification"
    },
    {
      title: "Fashion & Retail labels",
      desc: "Supporting apparel brands with organic cotton blends, seasonal knitwear ranges, and dynamic GOTS certified weaves.",
      icon: ShoppingBag,
      metric: "1.2K Average MOQ limit"
    },
    {
      title: "IoT Electronics & Tech",
      desc: "Supplying smart appliance distributors and home integrators with CE/FCC certified PCB systems.",
      icon: Cpu,
      metric: "Zero-defect target standard"
    }
  ];

  return (
    <section id="home-industries-section" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Context */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
            Market Integration
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Industries Empowered by Mokshamrit
          </h2>
          <p className="text-slate-600 text-sm font-light leading-relaxed">
            We deliver tailored trade parameters specifically tuned to represent your vertical's regulatory guidelines and material tolerances.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="industries-grid">
          {sectors.map((sec, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200 hover:border-slate-400 p-6 rounded-lg transition-all duration-200 hover:-translate-y-1 shadow-sm"
            >
              <div className="w-10 h-10 rounded bg-slate-100 text-slate-800 flex items-center justify-center mb-5 border border-slate-200">
                <sec.icon className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="text-slate-905 font-bold text-xs uppercase tracking-wider mb-2">
                {sec.title}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed font-light mb-4">
                {sec.desc}
              </p>
              <div className="pt-3 border-t border-slate-150 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Certification Code:</span>
                <span className="font-semibold text-slate-750">{sec.metric}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
