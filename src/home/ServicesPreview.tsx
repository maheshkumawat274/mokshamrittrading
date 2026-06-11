/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { servicesData } from "../serviceData/servicesData";

export default function ServicesPreview() {
  return (
    <section id="home-services-preview" className="py-20 md:py-28 bg-white border-b border-slate-200 font-sans relative">
      <div className="absolute top-[20%] left-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase block">
              Core Sourcing Portfolios
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Eight Verticals. One Global Standard.
            </h2>
            <p className="text-slate-600 text-sm font-light leading-relaxed">
              Mokshamrit operates exclusively in high-demand global trade sectors. Our direct-to-mill and direct-to-farm procurement structures yield premium material outputs.
            </p>
          </div>
          <Link
            to="/about"
            className="text-xs font-mono font-bold text-slate-700 hover:text-slate-950 flex items-center space-x-1.5 transition-colors border-b border-slate-300 hover:border-slate-950 pb-1"
          >
            <span>Learn Sourcing Process</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Bento Blocks Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="services-bento-grid">
          {servicesData.map((svc) => (
            <div 
              key={svc.slug} 
              className="group relative bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              id={`service-card-${svc.slug}`}
            >
              {/* Image backdrop layout with darkening overlay */}
              <div className="relative h-44 w-full overflow-hidden">
                <img 
                  src={svc.image} 
                  alt={svc.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent"></div>
              </div>

              {/* Copy Content */}
              <div className="px-5 py-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-sm tracking-wider uppercase group-hover:text-slate-700 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-slate-600 text-xs font-light leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Secure Trade Ready</span>
                  
                  <Link 
                    to={`/services/${svc.slug}`}
                    className="text-slate-700 hover:text-slate-950 font-bold tracking-wider inline-flex items-center space-x-1 uppercase text-[10px]"
                    id={`view-service-link-${svc.slug}`}
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-705" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
