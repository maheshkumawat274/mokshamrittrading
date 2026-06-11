/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link } from "react-router-dom";
import { servicesData, ServiceDetail } from "../serviceData/servicesData";
import { 
  ArrowRight, ShieldCheck, CheckSquare, Award, Clock, HelpCircle, 
  ChevronRight, ArrowLeft, Layers, Sparkles 
} from "lucide-react";

export default function ServiceLanding() {
  const { slug } = useParams();
  
  // Find the matching service details
  const activeService = servicesData.find(s => s.slug === slug) || servicesData[0];

  // Helper to extract related services
  const relatedServices = servicesData.filter(s => s.slug !== activeService.slug).slice(0, 4);

  return (
    <div id="dynamic-service-landing" className="bg-white min-h-screen text-slate-700 font-sans pt-24">
      <div className="absolute top-[10%] right-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none"></div>

      {/* DYNAMIC HERO SECTION */}
      <section className="relative py-16 md:py-24 border-b border-slate-200 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-slate-705 hover:text-slate-950 pb-2"
              id="back-home-link"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to home</span>
            </Link>

            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-700 font-mono text-[9px] uppercase tracking-widest leading-none shadow-sm">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Division specification</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight" id="service-title-display">
              {activeService.title}
            </h1>

            <p className="text-slate-800 font-semibold text-sm leading-relaxed max-w-xl">
              {activeService.heroSub}
            </p>

            <p className="text-slate-600 text-xs leading-relaxed font-light font-sans max-w-2xl">
              {activeService.longDescription}
            </p>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
                id="service-cta-btn"
              >
                <span>{activeService.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-slate-200/40 rounded-2xl blur-xl scale-95 pointer-events-none"></div>
            <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-xl border border-slate-200 shadow-lg">
              <img 
                src={activeService.image} 
                alt={activeService.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                id="service-detail-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent"></div>
            </div>
          </div>

        </div>
      </section>

      {/* CORE SPECIFICATIONS LAYOUT */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12" id="specifications-deck">
        
        {/* Left Specification details */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Features Grid */}
          <div className="space-y-6 bg-slate-50 border border-slate-200 p-8 rounded-xl shadow-sm">
            <h3 className="text-slate-900 font-extrabold text-sm tracking-widest uppercase border-b border-slate-200 pb-2">
              Division Features & Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="features-grid">
              {activeService.features.map((feat, idx) => (
                <div key={idx} className="flex space-x-3 items-start">
                  <CheckSquare className="w-5 h-5 text-slate-800 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-xs font-light leading-relaxed">{feat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-6 bg-slate-50 border border-slate-200 p-8 rounded-xl shadow-sm">
            <h3 className="text-slate-900 font-extrabold text-sm tracking-widest uppercase border-b border-slate-200 pb-2">
              Strategic Advantages & Yield Growth
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="benefits-grid">
              {activeService.benefits.map((ben, idx) => (
                <div key={idx} className="flex space-x-3 items-start">
                  <Award className="w-5 h-5 text-slate-800 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-xs font-light leading-relaxed">{ben}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Timeline */}
          <div className="space-y-8">
            <div className="border-b border-slate-200 pb-2">
              <h3 className="text-slate-900 font-extrabold text-sm tracking-widest uppercase">
                Logistics & Verification Process
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">Our exact four-phase operational workflow prior to final customs delivery.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="process-steps">
              {activeService.process.map((step, idx) => (
                <div key={idx} className="p-5 rounded bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <span className="text-2xl font-bold font-mono text-slate-350 mb-2">{step.step}</span>
                  <div className="space-y-1">
                    <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">{step.title}</h4>
                    <p className="text-slate-600 text-xs font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQS Section */}
          <div className="space-y-6 bg-slate-50 border border-slate-200 p-8 rounded-xl shadow-sm">
            <h3 className="text-slate-900 font-extrabold text-sm tracking-widest uppercase border-b border-slate-200 pb-2">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 divide-y divide-slate-200" id="faqs-list">
              {activeService.faqs.map((faq, idx) => (
                <div key={idx} className={`${idx > 0 ? "pt-4" : ""}`}>
                  <h4 className="text-slate-900 font-semibold text-xs py-1 flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-slate-700 shrink-0" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-slate-600 text-xs font-light leading-relaxed font-sans pl-6 mt-1">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar related list */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Industries Served */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
            <h3 className="text-slate-900 font-extrabold text-xs uppercase tracking-widest border-b border-slate-100 pb-2">
              Target Industries served
            </h3>
            <div className="space-y-2.5">
              {activeService.industriesServed.map((ind, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-medium text-slate-600">
                  <span className="w-1.5 h-1.5 bg-slate-800 rounded-full shrink-0"></span>
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related services index */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
            <h3 className="text-slate-900 font-extrabold text-xs uppercase tracking-widest border-b border-slate-100 pb-2">
              Related Divisions
            </h3>
            <div className="space-y-3">
              {relatedServices.map((svc) => (
                <Link 
                  key={svc.slug}
                  to={`/services/${svc.slug}`}
                  className="group flex justify-between items-center text-xs text-slate-700 hover:text-slate-950 p-2.5 rounded bg-slate-50 border border-slate-200 hover:border-slate-400 transition-all shadow-sm"
                  id={`related-service-${svc.slug}`}
                >
                  <span className="font-semibold">{svc.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Escrow note */}
          <div className="p-5 rounded bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
            <div className="flex items-center space-x-2.5 text-xs">
              <Sparkles className="w-4 h-4 text-slate-550" />
              <strong className="text-slate-800 uppercase font-mono tracking-wider font-extrabold">Trace Verification</strong>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-light">
              Mokshamrit coordinates with custom compliance organizations across APAC and Europe. Digital telemetry certifications are made available on demand.
            </p>
          </div>

        </div>

      </section>
    </div>
  );
}
