/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import AboutHero from "../aboutus/AboutHero";
import CompanyStory from "../aboutus/CompanyStory";
import MissionVision from "../aboutus/MissionVision";
import CoreValues from "../aboutus/CoreValues";
import GlobalNetwork from "../aboutus/GlobalNetwork";
import Leadership from "../aboutus/Leadership";

export default function AboutUs() {
  return (
    <div id="about-page-container" className="bg-white min-h-screen">
      <AboutHero />
      <CompanyStory />
      <MissionVision />
      <CoreValues />
      <GlobalNetwork />
      <Leadership />
    </div>
  );
}
