/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Mail, Phone, ShieldCheck, HelpCircle } from "lucide-react";

export default function ContactDetails() {
  return (
    <div id="contact-details-component" className="space-y-8 font-sans text-slate-705">
      
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase block">
          Communications Matrix
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">
          International Trade Desks
        </h2>
        <p className="text-slate-600 text-xs font-light leading-relaxed">
          Mokshamrit manages segmented trade communications under strict operational guidelines, ensuring your messages route immediately to specialized directors.
        </p>
      </div>

      {/* Grid structure */}
      <div className="space-y-6" id="contact-details-cards">
        
        {/* HQ Address Cards */}
        <div className="p-5 bg-slate-50 border border-slate-200 shadow-sm rounded-lg flex items-start space-x-4">
          <div className="w-10 h-10 bg-white border border-slate-205 text-slate-800 rounded flex items-center justify-center shrink-0 shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Trading Headquarters</h4>
            <p className="text-slate-600 text-xs font-light leading-relaxed">
              Mokshamrit Corporate Plaza, Sector 44, Gurugram, National Capital Region (NCR), Haryana 122003, India
            </p>
          </div>
        </div>

        {/* Hotlines Card */}
        <div className="p-5 bg-slate-50 border border-slate-200 shadow-sm rounded-lg flex items-start space-x-4">
          <div className="w-10 h-10 bg-white border border-slate-205 text-slate-800 rounded flex items-center justify-center shrink-0 shadow-sm">
            <Phone className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Operational Contacts</h4>
            <div className="text-xs space-y-1">
              <span className="block text-slate-600 font-light">
                Direct Desk Phone:&nbsp;
                <a href="tel:+919910088224" className="text-slate-800 font-bold hover:underline">
                  +91-99100-88224
                </a>
              </span>
              <span className="block text-slate-600 font-light">
                Supply Operations Desk:&nbsp;
                <span className="text-slate-800 font-bold">+91-99100-88224</span>
              </span>
            </div>
          </div>
        </div>

        {/* Channels Card */}
        <div className="p-5 bg-slate-50 border border-slate-200 shadow-sm rounded-lg flex items-start space-x-4">
          <div className="w-10 h-10 bg-white border border-slate-205 text-slate-800 rounded flex items-center justify-center shrink-0 shadow-sm">
            <Mail className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider">Electronic Ingress</h4>
            <div className="text-xs space-y-1">
              <span className="block text-slate-600 font-light font-mono">
                Central Mail:&nbsp;
                <a href="mailto:contact@mokshamrittradingcompany.com" className="text-slate-805 hover:underline font-semibold">
                  contact@mokshamrittradingcompany.com
                </a>
              </span>
              <span className="block text-slate-600 font-light font-mono">
                Admin Terminal Queries:&nbsp;
                <a href="mailto:admin@mokshamrittradingcompany.com" className="text-slate-805 hover:underline font-semibold">
                  admin@mokshamrittradingcompany.com
                </a>
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="p-5 rounded bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
        <div className="flex items-center space-x-2 text-xs">
          <ShieldCheck className="w-4 h-4 text-slate-500" />
          <strong className="text-slate-800 uppercase font-mono tracking-widest text-[9px] font-bold">L/C Escrow Shield</strong>
        </div>
        <p className="text-[10px] text-slate-600 leading-relaxed font-light font-sans">
          Mokshamrit Trading operates commercial trading transactions exclusively under verified letters of credit (L/C) or secured bank escrow frameworks to ensure complete contract execution security.
        </p>
      </div>

    </div>
  );
}
