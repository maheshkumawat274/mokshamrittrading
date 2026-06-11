/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, ShieldAlert, BadgeCheck } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      quote: "Sourcing three horizontal metal compactors through Mokshamrit was flawless. Their raw machinery division managed heavy marine load transfers and local Gurugram custom filings seamlessly.",
      name: "Devendra Singh",
      role: "Operations VP, Delhi NCR Metals Corp",
      industry: "Scrap & Metal Reclamation"
    },
    {
      quote: "Achieving tight OEKO-TEX clothing standards across 20,000 seasonal unit runs is tough, but Mokshamrit's combed fabric audits cleared every single SGS check without a single glitch.",
      name: "Clara van de Berg",
      role: "Sourcing Manager, AmsterdamFashion BV",
      industry: "Textiles & Retail"
    },
    {
      quote: "We've contracted Mokshamrit for basmati and oilseed imports twice this quarter. Their strict control of moisture densities below 13% prevents vessel heating risks beautifully.",
      name: "Tariq Al-Mansoor",
      role: "Principal Broker, Gulf Agro Distribution",
      industry: "Agricultural Crops Sourcing"
    }
  ];

  return (
    <section id="home-testimonials-section" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase block">
            Global Affiliations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Client Verification & Trust Logs
          </h2>
          <p className="text-slate-600 text-sm font-light leading-relaxed">
            What leading international procurement directors say about our strict compliance, shipping speed, and contract accuracy.
          </p>
        </div>

        {/* Dynamic Reviews Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-columns">
          {reviews.map((rev, i) => (
            <div 
              key={i} 
              className="p-6 rounded-lg bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* 5 stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-slate-800 text-slate-800" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs font-light leading-relaxed italic font-sans">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-150 flex items-center justify-between">
                <div>
                  <h4 className="text-slate-900 text-xs font-bold font-sans">{rev.name}</h4>
                  <span className="text-[10px] text-slate-500 block">{rev.role}</span>
                </div>
                <span className="text-[9px] font-mono font-semibold bg-slate-100 text-slate-850 px-2 py-0.5 rounded uppercase border border-slate-200">
                  {rev.industry}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
