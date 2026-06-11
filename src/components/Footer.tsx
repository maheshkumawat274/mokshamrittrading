/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, Linkedin, Facebook, Instagram, Twitter, ArrowRight, Shield } from "lucide-react";
import { servicesData } from "../serviceData/servicesData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="global-site-footer" className="bg-slate-50 border-t border-slate-200 text-slate-600 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" id="footer-grid-container">
          {/* Brand/Identity Card */}
          <div className="flex flex-col space-y-6">
            <Link to="/" className="flex items-center space-x-3 group" id="footer-logo">
              <div className="w-9 h-9 bg-gradient-to-tr from-slate-800 to-slate-950 rounded flex items-center justify-center text-white font-bold text-base shadow-sm">
                <span className="font-mono">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-slate-900 uppercase tracking-wider text-sm leading-none">
                  Mokshamrit
                </span>
                <span className="font-mono text-[8px] text-slate-500 tracking-widest uppercase mt-0.5">
                  Trading Company
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed font-sans font-light">
              Enterprise-grade industrial, agricultural, and luxury goods trade. Architecting secure, high-yield global supply channels for modern recycling, apparel, leather, food crops, and smart electronics blocks.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-slate-500 hover:text-slate-950 hover:bg-slate-100 flex items-center justify-center transition-all duration-150 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-slate-500 hover:text-slate-950 hover:bg-slate-100 flex items-center justify-center transition-all duration-150 shadow-sm"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-slate-500 hover:text-slate-950 hover:bg-slate-100 flex items-center justify-center transition-all duration-150 shadow-sm"
                aria-label="Instagram Handle"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-slate-500 hover:text-slate-950 hover:bg-slate-100 flex items-center justify-center transition-all duration-150 shadow-sm"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Business Portfolios Index */}
          <div>
            <h3 className="font-sans font-extrabold text-slate-900 text-xs tracking-widest uppercase mb-6 pb-2 border-b border-slate-200">
              Trading Divisions
            </h3>
            <ul className="space-y-3 font-medium text-xs text-slate-600 grid grid-cols-1 gap-1">
              {servicesData.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    to={`/services/${svc.slug}`}
                    className="hover:text-slate-950 flex items-center space-x-1.5 transition-colors duration-150 group"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-450 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    <span>{svc.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Corporate Navigation */}
          <div>
            <h3 className="font-sans font-extrabold text-slate-900 text-xs tracking-widest uppercase mb-6 pb-2 border-b border-slate-200">
              Navigation
            </h3>
            <ul className="space-y-3 font-medium text-xs text-slate-600 flex flex-col">
              <li>
                <Link to="/" className="hover:text-slate-950 flex items-center space-x-1.5 transition-colors">
                  <span>Home Desk</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-slate-950 flex items-center space-x-1.5 transition-colors">
                  <span>About Sourcing & Leadership</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-slate-950 flex items-center space-x-1.5 transition-colors">
                  <span>Dynamic blog & Market Insights</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-slate-950 flex items-center space-x-1.5 transition-colors">
                  <span>Inquire Now</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-slate-950 inline-flex items-center space-x-1.5 text-slate-600 font-semibold"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Secure Admin Terminal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Sourcing HQ Details */}
          <div className="flex flex-col space-y-5">
            <h3 className="font-sans font-extrabold text-slate-900 text-xs tracking-widest uppercase mb-1 pb-2 border-b border-slate-200">
              International Headquarters
            </h3>
            <div className="font-sans text-xs space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 leading-relaxed font-light">
                  Mokshamrit Corporate Plaza, Sector 44, Gurugram, National Capital Region (NCR), Haryana 122003, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <a href="tel:+919910088224" className="text-slate-600 hover:text-slate-950 transition-colors">
                  +91-99100-88224
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a
                  href="mailto:contact@mokshamrittradingcompany.com"
                  className="text-slate-600 hover:text-slate-950 transition-colors break-all"
                >
                  contact@mokshamrittradingcompany.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="text-slate-600 uppercase tracking-widest font-mono text-[10px]">
                  FOB / CIF Trade Desks
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Trade Disclaimers */}
        <div className="border-t border-slate-200 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-sans">
          <p className="font-light tracking-wide text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} Mokshamrit Trading Company. All Rights Reserved. Regulated International Bulk Import & Export Sourcing Solutions.
          </p>
          <div className="flex space-x-6">
            <span className="hover:text-slate-950 cursor-help text-slate-500 font-medium" title="Registration details available on file.">
              Licensed Sourcing Brokerage
            </span>
            <span>&bull;</span>
            <span className="hover:text-slate-950 cursor-help text-slate-500 font-medium" title="Standard trade regulations (Rules of Trade) governing CIF/FOB operations.">
              ICC IncoTerms Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
