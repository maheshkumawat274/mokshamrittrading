/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ContactHero from "../contact/ContactHero";
import ContactForm from "../contact/ContactForm";
import ContactDetails from "../contact/ContactDetails";
import MapSection from "../contact/MapSection";

export default function Contact() {
  return (
    <div id="contact-page-container" className="bg-white min-h-screen">
      <ContactHero />
      
      {/* Forms & Address Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-panel-grid">
        <div className="lg:col-span-5">
          <ContactDetails />
        </div>
        
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>

      {/* Map Section */}
      <MapSection />
    </div>
  );
}
