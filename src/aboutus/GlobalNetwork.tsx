/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Globe, MapPin, Anchor, ArrowRight } from "lucide-react";

export default function GlobalNetwork() {
  const nodes = [
    { location: "Gurugram, India (HQ)", purpose: "Trade Desk Management & Customs clearance filings" },
    { location: "Berlin, Germany", purpose: "Recycling machinery sifting & metallurgy check yards" },
    { location: "Tashkent, Uzbekistan", purpose: "Organic cotton sourcing, combing, and textile mills consolidation" },
    { location: "Rio Grande, Brazil", purpose: "Full-grain cattle hide tanneries & REACH safety audits" },
    { location: "Perth, Australia", purpose: "Agricultural crop bulk loading terminals (SGS validation desks)" }
  ];

  return (
    <section id="about-global-network" className="py-20 bg-slate-50 border-b border-slate-200 font-sans text-slate-705">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="network-grid-layout">
          
          {/* Left Block detailing the Network Nodes */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase block">
              Supply Chains Map
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              A Global Presence Bridging Sourcing Terminals
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed font-light">
              We operate structural distribution anchors inside high-yield trade terminals across multiple continents. This local presence lets us physically monitor material lots before vessel loading, shielding our clients from import defects.
            </p>
            
            <div className="space-y-3.5 pt-2" id="network-nodes-list">
              {nodes.map((node, i) => (
                <div key={i} className="flex items-start space-x-3 text-xs">
                  <MapPin className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-semibold">{node.location}</strong>
                    <span className="text-slate-600 block font-light">{node.purpose}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Layout: Simulated Interactive Network Map Graphic Card (Aesthetic design, deep terminal card look) */}
          <div className="lg:col-span-7 relative">
            <div className="absolute inset-0 bg-slate-200/40 rounded-2xl blur-3xl pointer-events-none scale-90"></div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
                <span className="font-mono text-slate-800 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Anchor className="w-4 h-4 text-slate-700" />
                  <span>Freight Ingress Routing Node</span>
                </span>
                <span className="text-[10px] font-mono text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                  PORT STATUS: READY
                </span>
              </div>

              {/* Sourcing flow graphic lanes */}
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-1 shadow-sm">
                  <div className="flex justify-between text-slate-900 font-bold">
                    <span>NORTH ATLANTIC CO-OP LANE</span>
                    <span className="text-slate-500">99.9% Purity</span>
                  </div>
                  <p className="text-slate-600 text-[10px] font-sans font-light">
                    Hamburg Port &rarr; Rotterdam Gateway &rarr; Mumbai Nhava Sheva (Heavy Scrap Machinery distribution blocks).
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-1 shadow-sm">
                  <div className="flex justify-between text-slate-900 font-bold">
                    <span>CENTRAL ASIA COTTON CORRIDOR</span>
                    <span className="text-slate-500">GRS Certified</span>
                  </div>
                  <p className="text-slate-600 text-[10px] font-sans font-light">
                    Uzbekistan Mills &rarr; Iran Land Transit &rarr; India Dry Ports (Premium combed yarn imports).
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-1 shadow-sm">
                  <div className="flex justify-between text-slate-900 font-bold">
                    <span>WESTERN AUSTRALIA CROPS OUTLET</span>
                    <span className="text-slate-500">Phytosanitary Cleared</span>
                  </div>
                  <p className="text-slate-600 text-[10px] font-sans font-light">
                    Fremantle Vessel Terminals &rarr; Indian Ocean Lanes &rarr; Multi-Port Destinations (Wheat and yellow corn pooling).
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 text-center uppercase tracking-wide">
                All ocean logs comply with ICC IncoTerms regulations.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
