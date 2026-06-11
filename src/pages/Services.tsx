/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams } from "react-router-dom";
import ServiceLanding from "../services/ServiceLanding";
import ServicesPreview from "../home/ServicesPreview";

export default function Services() {
  const { slug } = useParams();

  if (slug) {
    return <ServiceLanding />;
  }

  // Fallback to overview lists if accessing /services bare
  return (
    <div id="services-overview-page" className="bg-white pt-20 min-h-screen">
      <ServicesPreview />
    </div>
  );
}
