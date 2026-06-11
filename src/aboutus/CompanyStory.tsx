/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileSpreadsheet, Milestone, Trophy } from "lucide-react";

export default function CompanyStory() {
  const timeline = [
    {
      year: "2018",
      title: "Establishment of Core Cargo Trade Desk",
      desc: "Founded with a single transport license in Haryana, overseeing initial regional grain freight pipelines.",
      icon: FileSpreadsheet
    },
    {
      year: "2021",
      title: "Consolidation of Scrap Raw Machinery",
      desc: "Contracted with leading hydraulic processing foundries, adding heavy shredders and compaction equipment to the catalog.",
      icon: Trophy
    },
    {
      year: "2024",
      title: "Expanding Into Diverse Global Divisions",
      desc: "Formally integrated apparel, electronics, leatherwares, and furniture divisions, registering as Mokshamrit Trading Company.",
      icon: Milestone
    }
  ];

  return (
    <section id="about-company-story" className="py-20 bg-white border-b border-slate-200 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="story-grid-layout">
          
          {/* Left Text Pitch */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase block">
              Historical Milestones
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Establishing Certainty in a Fragile Market Ecosystem
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed font-light font-sans">
              Mokshamrit was conceived from a clear observation: that international supply channels were severely fragmented, prone to regulatory bottlenecks, and troubled by quality deviations. Industry players were constantly forced to accept compromises in copper fractions, machinery durability, or grain moisture levels.
              <br/><br/>
              Our strategy was simple: build a fully diversified, certified corporate brokerage house that takes full legal, phytosanitary, and physical custody of freight at source. This rigorous level of service led to our steady global expansion across 8 major sectors.
            </p>
          </div>

          {/* Right Chronological Milestones Tree */}
          <div className="lg:col-span-6 space-y-8 relative" id="story-pillars-tree">
            {/* Thread timeline line */}
            <div className="absolute left-[20px] top-4 bottom-4 w-[2px] bg-slate-200"></div>

            {timeline.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-6 relative z-10 p-5 rounded bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-900 flex items-center justify-center shrink-0">
                  <span className="text-xs font-mono font-bold text-slate-800">{item.year}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-slate-900 text-xs font-bold uppercase tracking-wider">{item.title}</h4>
                  <p className="text-slate-600 text-xs font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
