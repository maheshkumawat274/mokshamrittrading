/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Award, HelpCircle, HardHat } from "lucide-react";

export default function CoreValues() {
  const valuesData = [
    {
      title: "Absolute Integrity",
      desc: "Our contracts are firm. We do not renegotiate pricing structures mid-transit or compromise material dimensions.",
      icon: ShieldCheck
    },
    {
      title: "Strict Compliance Checks",
      desc: "Every dynamic lot complies cleanly with ISRI guidelines, GOTS Textile parameters, GRS recycling standards, or regional food acts.",
      icon: Award
    },
    {
      title: "Operational Velocity",
      desc: "By maintaining our own custom-brokering clearance licenses, we cut through typical border terminal delays.",
      icon: HardHat
    }
  ];

  return (
    <section id="about-core-values" className="py-20 bg-white border-b border-slate-200 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
            Organizational Integrity
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Core Operating Tenets
          </h2>
          <p className="text-slate-600 text-sm font-light leading-relaxed">
            The fundamental pillars that govern our trading choices, client relationships, and supply chain strategies.
          </p>
        </div>

        {/* Pillars dynamic grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="core-values-grid">
          {valuesData.map((val, i) => (
            <div key={i} className="p-6 rounded-lg bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                  <val.icon className="w-5.5 h-5.5 text-slate-705" />
                </div>
                <h3 className="text-slate-900 font-bold text-xs uppercase tracking-wider">
                  {val.title}
                </h3>
                <p className="text-slate-600 text-xs font-light leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
