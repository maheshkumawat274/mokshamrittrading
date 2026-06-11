/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileSearch, Layers, BadgePercent, CheckCircle } from "lucide-react";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Material Spec Verification",
      desc: "Our trade desks analyze the exact compliance criteria, moisture contents, GSM parameters, or machine stress profiles required.",
      icon: FileSearch
    },
    {
      num: "02",
      title: "Ethical Procurement & Pricing",
      desc: "We secure direct cargo aggregates from certified source mills or origin farm-unions, issuing clean FOB valuations.",
      icon: Layers
    },
    {
      num: "03",
      title: "SGS Independent Audits",
      desc: "Independent analysts test the cargo, verifying material purity, radiation clearances, and moisture density standards.",
      icon: BadgePercent
    },
    {
      num: "04",
      title: "Customs Clearance & Cargo Delivery",
      desc: "Our brokers coordinate customs declarations and secure freight transport directly to your NCR or international terminals.",
      icon: CheckCircle
    }
  ];

  return (
    <section id="home-process-timeline" className="py-20 md:py-28 bg-white border-b border-slate-200 font-sans relative overflow-hidden">
      <div className="absolute top-[30%] left-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
            Execution Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Mokshamrit Powers Global Trade Logistics
          </h2>
          <p className="text-slate-600 text-sm font-light leading-relaxed">
            Four disciplined operational checkpoints that prevent trade delays and protect transaction yields.
          </p>
        </div>

        {/* Process Roadmap row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="process-timeline-grid">
          {steps.map((st, i) => (
            <div key={i} className="relative space-y-4 p-6 rounded-lg bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              {/* Highlight Step Number */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-3xl font-extrabold text-slate-350 font-mono">{st.num}</span>
                <st.icon className="w-5.5 h-5.5 text-slate-705" />
              </div>
              <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider">
                {st.title}
              </h3>
              <p className="text-slate-600 text-xs font-light leading-relaxed font-sans">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
