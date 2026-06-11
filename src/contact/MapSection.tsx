/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Globe, Compass } from "lucide-react";

export default function MapSection() {
  return (
    <section id="map-section-module" className="py-12 bg-white font-sans text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-3 shadow-md relative">
          {/* Map Overlay Badge */}
          <div className="absolute top-6 left-6 z-10 bg-white border border-slate-200 p-4 rounded-lg shadow-lg flex items-start space-x-3 max-w-xs backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm animate-bounce">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-left">
              <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wide">Mokshamrit Towers</h4>
              <p className="text-[10px] text-slate-500 leading-normal font-light">
                Sector 44, Gurugram, National Capital Region (NCR), Haryana, India
              </p>
            </div>
          </div>

          {/* Fully compliant responsive Google Map Embed iframe */}
          <div className="relative h-96 w-full rounded-lg overflow-hidden border border-slate-200">
            <iframe
              title="Mokshamrit Trading Company HQ Location Map"
              src="https://maps.google.com/maps?q=Sector%2044%20Gurugram%20Haryana&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) contrast(1.05)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <div className="pt-4 px-3 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-500 gap-2">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-slate-500" />
              <span>HQ Coordinates Node: Zone-1 Sourcing Core</span>
            </span>
            <span className="text-slate-600 font-bold">Continuous dry port connectivity verified</span>
          </div>
        </div>

      </div>
    </section>
  );
}
