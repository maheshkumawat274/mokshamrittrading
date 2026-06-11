/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import HeroSection from "../home/HeroSection";
import CompanyOverview from "../home/CompanyOverview";
import Industries from "../home/Industries";
import ServicesPreview from "../home/ServicesPreview";
import WhyChooseUs from "../home/WhyChooseUs";
import Process from "../home/Process";
import Testimonials from "../home/Testimonials";
import CTA from "../home/CTA";

export default function Home() {
  return (
    <div id="home-page-container" className="bg-white min-h-screen">
      <HeroSection />
      <CompanyOverview />
      <Industries />
      <ServicesPreview />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <CTA />
    </div>
  );
}
