/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { ArrowRight, Globe, Shield, Star, RefreshCw } from "lucide-react";

export default function HeroSection() {
  return (
    <section 
      id="home-hero-section" 
      className="relative min-h-screen flex items-center bg-slate-50 text-slate-900 overflow-hidden pt-20 border-b border-slate-200"
    >
      {/* Background graphic elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-slate-300/20 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 md:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center" id="hero-columns">
          
          {/* Main Hero Copy Details */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            
            {/* Lead Tagline Ribbon */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 font-mono text-[10px] uppercase tracking-widest mx-auto lg:mx-0 shadow-sm">
              <Globe className="w-3.5 h-3.5 text-slate-600 animate-spin-slow" />
              <span>Enterprise Class Import & Sourcing</span>
            </div>

            {/* Main Display Typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight leading-[1.1] text-slate-900">
              Global Sourcing.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 bg-[size:200%] font-extrabold">
                Absolute Integrity.
              </span>
            </h1>

            {/* Corporate Summary Context */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              Mokshamrit Trading Company operates secure, premium distribution pipelines across 8 global trade sectors. From heavy metal scrap machinery and agricultural grains to high-end leather, clothing, and smart electronic units – we deploy certified logistics with absolute transactional trust.
            </p>

            {/* Strategic Action Anchors */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4" id="hero-actions">
              <Link
                to="/services"
                className="w-full sm:w-auto px-8 py-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center space-x-2 animate-pulse-slow"
                id="hero-primary-cta"
              >
                <span>Explore Sourcing Sectors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-md bg-white border border-slate-200 hover:bg-slate-55 text-slate-800 font-semibold text-sm tracking-wide transition-all flex items-center justify-center space-x-2 shadow-sm"
                id="hero-secondary-cta"
              >
                <span>Request Trade Valuation</span>
              </Link>
            </div>

            {/* Minimalist Trust Indicator Deck */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 max-w-lg mx-auto lg:mx-0" id="hero-trust-metrics">
              <div className="text-center lg:text-left space-y-1">
                <span className="block text-2xl font-extrabold text-slate-900 font-mono">100%</span>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold">ISRI Standard</span>
              </div>
              <div className="text-center lg:text-left space-y-1">
                <span className="block text-2xl font-extrabold text-slate-900 font-mono">15K+</span>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Metric Tons</span>
              </div>
              <div className="text-center lg:text-left space-y-1">
                <span className="block text-2xl font-extrabold text-slate-900 font-mono">ICC</span>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold">FOB/CIF Approved</span>
              </div>
            </div>
          </div>

          {/* Right Column Interactive Dynamic UI Graphic/Card (Instead of standard stock, an executive structural pricing terminal card) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-transparent rounded-2xl blur-3xl pointer-events-none scale-90"></div>
            
            <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6" id="hero-interactive-card">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                  <span className="text-xs uppercase font-mono tracking-widest text-slate-500 font-semibold">MTC Trade Exchange</span>
                </div>
                <span className="text-[10px] font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  PORTAL SECURE
                </span>
              </div>

              {/* Displaying some simulated trading indices to offer "Enterprise / Deep Sourcing" context */}
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Copper Wire Millberry</span>
                    <span className="text-slate-805 font-mono font-bold">ISRI Certified</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-slate-900 font-sans text-lg font-bold">99.9% Premium Purities</span>
                    <span className="text-[10px] font-mono text-slate-500">Spot FOB Trade</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Agricultural Grain Pools</span>
                    <span className="text-slate-805 font-mono font-bold">SGS Approved</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-slate-900 font-sans text-lg font-bold">Traceable Farm Provenance</span>
                    <span className="text-[10px] font-mono text-slate-500">Max Moisture 12%</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Luxury Finished Hide Cargo</span>
                    <span className="text-slate-805 font-mono font-bold">REACH & LWG</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-slate-900 font-sans text-lg font-bold">Vegetable-Tanned Bovine</span>
                    <span className="text-[10px] font-mono text-slate-500">Exquisite Hides</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-center font-sans">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Mokshamrit oversees complete customs & deep border clearance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
