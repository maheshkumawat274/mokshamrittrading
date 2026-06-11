/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Linkedin, Globe } from "lucide-react";

export default function Leadership() {
  const managers = [
    {
      name: "Mahesh Kumar",
      role: "Chief Executive Officer & Founder",
      desc: "Oversees final trade clearing operations, corporate direction, and governmental logistics liaisons.",
      contact: "mahesh@mokshamrittradingcompany.com"
    },
    {
      name: "Rohan Sharma",
      role: "Director of Sourcing Operations",
      desc: "Manages heavy machinery specifications validations, textile mill inspections, and LWG leather compliance parameters.",
      contact: "rohan@mokshamrittradingcompany.com"
    },
    {
      name: "Anjali Mehta",
      role: "Director of Agricultural Commodities",
      desc: "Supervises grain cargo moisture analytics, phytosanitary clearance certifications, and origin farming networks.",
      contact: "anjali@mokshamrittradingcompany.com"
    }
  ];

  return (
    <section id="about-leadership-team" className="py-20 bg-white border-b border-slate-200 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
            Sourcing Desks
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Corporate Leadership & Trade Directors
          </h2>
          <p className="text-slate-600 text-sm font-light leading-relaxed">
            Meet the experienced industry professionals who coordinate our global divisions, cargo inspections, and customs clearance procedures.
          </p>
        </div>

        {/* Dynamic Cards Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="leadership-grid">
          {managers.map((m, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              
              <div className="space-y-4">
                <div className="inline-block px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-705 font-mono text-[9px] uppercase tracking-wider shadow-sm">
                  TC Desk Ref #{100 + idx}
                </div>
                <div>
                  <h3 className="text-slate-905 font-extrabold text-sm tracking-tight">{m.name}</h3>
                  <span className="text-slate-500 text-[10px] uppercase font-mono block mt-1">{m.role}</span>
                </div>
                <p className="text-slate-600 text-xs font-light leading-relaxed font-sans mt-2">
                  {m.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <a href={`mailto:${m.contact}`} className="hover:text-slate-900 tracking-wider font-mono text-[10px]" title={`Mail directly to ${m.name}`}>
                  {m.contact}
                </a>
                <div className="flex space-x-3 text-slate-500">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
