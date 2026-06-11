/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, RefreshCw, Layers, Phone, LayoutDashboard } from "lucide-react";
import { servicesData } from "../serviceData/servicesData";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setIsOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const hasAdminToken = !!localStorage.getItem("admin_token");

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm"
          : "bg-white/80 backdrop-blur-sm py-5 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Branding */}
          <Link to="/" className="flex items-center space-x-3 group" id="header-brand-logo">
            <div className="relative w-10 h-10 bg-gradient-to-tr from-slate-800 to-slate-950 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform duration-200">
              <span className="relative z-10 font-mono tracking-tight text-white">M</span>
              <div className="absolute inset-0 border border-white/20 rounded-lg scale-90"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg text-slate-900 tracking-wider uppercase leading-none">
                Mokshamrit
              </span>
              <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase mt-1">
                Trading Company
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" id="desktop-nav-menu">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-colors duration-200 ${
                isActive("/") ? "text-slate-900 bg-slate-100 font-semibold" : "text-slate-650 hover:text-slate-900 hover:bg-slate-55"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-colors duration-200 ${
                isActive("/about") ? "text-slate-900 bg-slate-100 font-semibold" : "text-slate-650 hover:text-slate-900 hover:bg-slate-55"
              }`}
            >
              About Us
            </Link>

            {/* Dynamic Dropdown for Services */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                className={`px-4 py-2 rounded-md text-sm font-medium tracking-wide flex items-center space-x-1 transition-colors duration-200 ${
                  isActive("/services") ? "text-slate-900 bg-slate-100 font-semibold" : "text-slate-650 hover:text-slate-900 hover:bg-slate-55"
                }`}
                aria-expanded={isServicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
                className={`absolute left-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-xl p-4 transition-all duration-200 ${
                  isServicesDropdownOpen
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                }`}
              >
                <div className="grid grid-cols-1 gap-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2 border-b border-slate-100 pb-1">
                    Trading Sectors
                  </div>
                  {servicesData.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className="px-3 py-2 rounded-md text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-all duration-200 flex items-center space-x-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                      <span>{service.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/blog"
              className={`px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-colors duration-200 ${
                isActive("/blog") ? "text-slate-900 bg-slate-100 font-semibold" : "text-slate-650 hover:text-slate-900 hover:bg-slate-55"
              }`}
            >
              Insights & Blog
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-colors duration-200 ${
                isActive("/contact") ? "text-slate-900 bg-slate-100 font-semibold" : "text-slate-650 hover:text-slate-900 hover:bg-slate-55"
              }`}
            >
              Contact
            </Link>

            {hasAdminToken && (
               <Link
                 to="/admin"
                 className="ml-4 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center space-x-1.5 border border-slate-200"
               >
                 <LayoutDashboard className="w-3.5 h-3.5" />
                 <span>Admin Terminal</span>
               </Link>
            )}
          </nav>

          {/* Call to action button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/contact"
              id="header-cta-button"
              className="px-6 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold tracking-wide transition-transform hover:-translate-y-[1px] active:translate-y-0 duration-150 shadow-sm flex items-center space-x-1.5"
            >
              <Phone className="w-4 h-4 text-slate-300" />
              <span>Contact Desk</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            {hasAdminToken && (
              <Link
                to="/admin"
                className="px-2 py-1.5 rounded bg-slate-150 text-slate-800 text-xs font-bold border border-slate-200"
              >
                Admin
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-nav-panel"
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[500px] border-b border-slate-200 bg-white shadow-lg" : "max-h-0 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-semibold leading-relaxed tracking-wider transition-colors ${
              isActive("/") ? "text-slate-900 bg-slate-100" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-semibold leading-relaxed tracking-wider transition-colors ${
              isActive("/about") ? "text-slate-900 bg-slate-100" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            About Us
          </Link>

          {/* Mobile Services list */}
          <div className="space-y-1">
            <div className="px-3 py-2 text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">
              Trading Portfolios
            </div>
            <div className="grid grid-cols-2 gap-1 px-2">
              {servicesData.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="px-2 py-1.5 rounded text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/blog"
            className={`block px-3 py-2 rounded-md text-base font-semibold leading-relaxed tracking-wider transition-colors ${
              isActive("/blog") ? "text-slate-900 bg-slate-100" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Insights & Blog
          </Link>
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-semibold leading-relaxed tracking-wider transition-colors ${
              isActive("/contact") ? "text-slate-900 bg-slate-100" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Contact
          </Link>

          <div className="pt-4 px-3 border-t border-slate-100">
            <Link
              to="/contact"
              className="w-full flex items-center justify-center py-2.5 rounded bg-slate-900 text-white font-bold text-center text-sm shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
