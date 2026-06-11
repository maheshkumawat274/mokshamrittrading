/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceDetail {
  title: string;
  slug: string;
  heroTitle: string;
  heroSub: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  industriesServed: string[];
  process: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  ctaText: string;
  image: string;
}

export const servicesData: ServiceDetail[] = [
  {
    title: "Scrap Trading Machines",
    slug: "scrap-trading-machines",
    heroTitle: "Heavy-Duty Recycling & Processing Machinery",
    heroSub: "High-yield industrial scrap shredders, balers, and shears engineered for maximum metal reclamation efficiency.",
    description: "Importing and distributing industry-defining scrap metal shear and compaction equipment globally to optimize recycling workflows.",
    longDescription: "Mokshamrit Trading Company supplies state-of-the-art recycling machinery built to withstand rigorous industrial operations. We authorize and import heavy compaction balers, crocodile shears, container-loading systems, and massive metal shredding complexes. Our machinery bridges the gap between raw scrap processing plants and smelting mills, ensuring maximum material density and compliance.",
    features: [
      "Heavy-duty hydraulic compaction systems with automated cycle controls",
      "Reinforced carbon-steel wear plates for extreme durability",
      "Eco-efficiency power units reducing energy consumption by up to 30%",
      "Remote diagnostics and integrated safety sensor telemetry"
    ],
    benefits: [
      "Drastically reduces volumetric transport costs of raw metal waste",
      "Increases pricing yield at smelting mills due to superior bale density",
      "Minimizes downtime with high-torque, low-maintenance cutting matrices",
      "Guarantees operational safety compliance with rigorous global certifications"
    ],
    industriesServed: [
      "Industrial Scrap Yards",
      "Municipal Recycling Facilities",
      "Automotive Recycling & Demolition Yards",
      "Foundries & Smelling Complexes"
    ],
    process: [
      { step: "01", title: "Consultation & Requirement Analysis", desc: "We evaluate your daily processing volume and scrap profiles to recommend the correct machinery specs." },
      { step: "02", title: "Sourcing & Procurement", desc: "Our global networks procure the machinery directly from certified high-grade heavy engineering manufacturers." },
      { step: "03", title: "Quality Inspection & Testing", desc: "Rigorous load, pressure, and structural integrity tests are carried out before cargo loading." },
      { step: "04", title: "Logistics & Global Setup", desc: "We manage end-to-end heavy-lift shipping, customs protocols, delivery, and technician commissioning." }
    ],
    faqs: [
      { q: "What is the processing capacity of your metal balers?", a: "Our baling equipment ranges from medium-scale 10-tons-per-hour units to ultra-dense 45-tons-per-journey continuous horizontal rams." },
      { q: "Do you supply replacement parts and maintenance diagnostics?", a: "Yes, we trade and supply high-strength shear blade replacements, custom hydraulic cylinders, and keep local engineering partners." }
    ],
    ctaText: "Source Enterprise Scrap Machinery",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Clothing & Apparel",
    slug: "clothing",
    heroTitle: "Global Textile Sourcing & Quality Apparel",
    heroSub: "Enterprise-grade supply chains delivering premium fabrics, bespoke garments, and sustainable fashion products.",
    description: "Ethically sound fashion sourcing and customized garment manufacturing designed for leading retail brands.",
    longDescription: "We manage textile trading from source crop to retail floor. Partnering with finest mills in premium cotton-producing regions, we offer high-grade organic fabrics, ready-to-wear apparel, knitwear, activewear, and customized corporate wear. Our active quality management ensures exact GSM parameters, eco-friendly dye-safe variables, and immaculate finishing stitches.",
    features: [
      "Sourcing of 100% organic cotton, bamboo fibers, and recycled performance polyester",
      "Comprehensive size-grading audits and custom tech-pack execution",
      "Ethical, fair-trade certified manufacturing plants with modern equipment",
      "State-of-the-art digital printing and automated embroidery lines"
    ],
    benefits: [
      "Secure low-cost high-volume garment pipelines directly from leading hubs",
      "Adherence to strict global textile standards (OEKO-TEX, GOTS)",
      "Highly responsive lead times enabling seasonal adaptation",
      "Superior dye consistency and shrink-resistant fabric technology"
    ],
    industriesServed: [
      "Global Fashion Retail Chains",
      "E-commerce Brands & Labels",
      "Corporate Enterprise Groups (Uniformity)",
      "High-Performance Fitness Brands"
    ],
    process: [
      { step: "01", title: "Tech-Pack & Material Spec Selection", desc: "We align on custom templates, GSM, yarn weights, and fabric composition." },
      { step: "02", title: "Pre-Production Sampling", desc: "Our partnered factories develop precise physical samples for fit and wash tests." },
      { step: "03", title: "Bulk Sourcing & In-Line QC", desc: "We monitor knitting, dyeing, cutting, and stitching with deep oversight." },
      { step: "04", title: "Packaging & Sea Freight Direct", desc: "Garments are packed into humidity-controlled containers and shipped straight to your distribution center." }
    ],
    faqs: [
      { q: "What is the Minimum Order Quantity (MOQ) for bespoke apparel?", a: "Our default enterprise MOQ is 1,200 units per style, but we can accommodate scaled setups for premium custom fabric developments." },
      { q: "Are all your textile fabrics ethically sourced fabric certified?", a: "Yes, we prioritize mills carrying GOTS and OEKO-TEX Standard 100 certifications to ensure zero harmful chemicals and fair-trade labor." }
    ],
    ctaText: "Source Premium Apparel & Fabric",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Merchandising",
    slug: "merchandising",
    heroTitle: "Premium Corporate Giftware & Branded Merch",
    heroSub: "Impactful branding materials and high-end promotional commodities distributed with seamless global logistics.",
    description: "Curating and supplying high-perceived-value merchandise portfolios designed to elevate corporate identities.",
    longDescription: "Mokshamrit Trading Company supplies robust, exquisite promotional goods ranging from eco-friendly corporate gift boxes and tech items to luxury utility goods. Our global trade infrastructure allows corporate brands to achieve incredible economies of scale while securing premium material finishes. We oversee precision logo etching, embossing, dynamic screen-printing, and high-impact custom packaging.",
    features: [
      "End-to-end curated product lines from bamboo accessories to smart smartwares",
      "High-precision laser etching and multi-tone thermal printing techniques",
      "Custom gift boxes with high-density EVA foam custom inserts",
      "Sustainably packaged and carbon-neutral distribution options"
    ],
    benefits: [
      "Elevate brand loyalty with items that recipients use daily, not toss away",
      "High quality-control compliance to keep your brand's reputation flawless",
      "Vast savings over fragmented domestic promotional agencies",
      "Unified global distribution ensuring cohesive assets across offices"
    ],
    industriesServed: [
      "Tier-1 Tech Enterprises",
      "Financial Institutions & Banks",
      "Global Hospitality & Luxury Hotels",
      "Marketing Agencies & Promo Distributors"
    ],
    process: [
      { step: "01", title: "Concept Board & Selection", desc: "We curate a selection of luxury and sustainable products matched to your brand identity." },
      { step: "02", title: "Virtual Prototyping", desc: "We place logos and verify alignment with dynamic high-resolution 3D renders." },
      { step: "03", title: "Precision Imprinting", desc: "The products are customized in certified high-precision print-houses." },
      { step: "04", title: "Consolidated Shipping", desc: "We aggregate, pack, clear customs, and distribute directly to global dynamic hubs." }
    ],
    faqs: [
      { q: "Can we source custom-configured electronic items?", a: "Yes, we source and test custom power banks, wireless docks, and high-quality bluetooth hardware branded precisely to code." },
      { q: "Do you offer eco-friendly sustainable merchandise options?", a: "Absolutely. We supply certified wheat straw plastics, organic cork, bamboo tech structures, and GRS-certified recycled ocean materials." }
    ],
    ctaText: "Initiate Merchandising Program",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Leather Goods",
    slug: "leather-goods",
    heroTitle: "Bespoke Leather Craftsmanship & Premium Accessories",
    heroSub: "High-grade leather hides, custom luxury accessories, and classic luggage engineered to exquisite standards.",
    description: "Bulk supply of premium finished leather hides, genuine leather luggage, bespoke wallets, and accessories for upscale global markets.",
    longDescription: "We partner with heritage tanneries utilizing modern, eco-conscious tanning methods. From full-grain bovine leather hides to exquisitely crafted travel bags, portfolios, tech sleeves, and footwear collections, our selection adheres to the rigorous requirements of elite fashion houses and luxury interior designers. Each hide is carefully selected for consistent grain structure, durability, and texture.",
    features: [
      "Full-grain and top-grain chrome-free, vegetable-tanned premium leather hides",
      "Handcrafted assembly with heavy-gauge waxed nylon saddle-stitching",
      "Custom tarnish-free brass, alloy, or copper hardware configurations",
      "Exquisite anti-mold and moisture-inhibitor protective packaging"
    ],
    benefits: [
      "Direct trade access to raw hides and finished products from leading global hubs",
      "Compliance with REACH and Leather Working Group (LWG) regulations",
      "Excellent durability and aging patina properties in all finished goods",
      "Significant margins on premium-tier fashion and corporate accessories"
    ],
    industriesServed: [
      "Premium Leather Fashion Brands",
      "Luxury Department Stores & Distributors",
      "Automotive & Yacht Interior Designers",
      "Corporate VIP Gifting Operations"
    ],
    process: [
      { step: "01", title: "Hide & Tanning Selection", desc: "Select grain profiles, customized dye levels, oil ratios, and thickness configurations." },
      { step: "02", title: "Master Pattern & Stitch Mapping", desc: "Our direct craftsmen prototype correct stitching, hardware, and linings." },
      { step: "03", title: "Precision Cut & Assembly", desc: "Hides are hand-cut or laser-die cut and saddle-stitched under stringent QC." },
      { step: "04", title: "Conditioning & Vault Packing", desc: "Each item is oiled, buffed, packed with silica bags inside luxury dust protection bags." }
    ],
    faqs: [
      { q: "Do your tanneries have environmental compliance standards?", a: "Yes, we trade with tanneries certified by the Leather Working Group (LWG) that utilize water recycling and safe tanning techniques." },
      { q: "What types of hides do you offer?", a: "We primarily trade premium cowhide, goat leather, and sheepskin, in full-grain, corrected-grain, and suede finishes." }
    ],
    ctaText: "Source Exquisite Leather Portfolios",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Electronics",
    slug: "electronics",
    heroTitle: "Consumer & Enterprise Electronics Sourcing",
    heroSub: "Sourcing, testing, and distributing cutting-edge consumer tech, specialized PCB assemblies, and smart devices.",
    description: "A robust supply channel for reliable, certified consumer electronics, electrical assemblies, and semiconductor components.",
    longDescription: "Under extreme quality benchmarks, we manage the procurement, manufacturing oversight, and global distribution of consumer components, industrial electronic modules, custom wire harnesses, and Smart IoT devices. We partner with advanced fabrication centers, securing high-yield electronics that carry CE, FCC, RoHS, and UL safety standards.",
    features: [
      "Pre-shipment functional testing and automated optical inspections (AOI)",
      "Strict electrostatic discharge (ESD) secure handling and freight packaging",
      "Access to premium electronic components and verified OEM/ODM partners",
      "Custom mold injection and structural frame engineering options"
    ],
    benefits: [
      "Ensures low defect-per-million rates via rigorous factory inspection regimes",
      "Shields production against assembly line bottlenecks via buffer stock pipelines",
      "Simplifies global market entry with certified compliant electronics",
      "Direct cost benefits via global factory-direct trading contracts"
    ],
    industriesServed: [
      "Consumer Tech Brands & Retailers",
      "Industrial Automations Providers",
      "Smart Home & IoT System Integrators",
      "OEM/ODM Assembly Facilities"
    ],
    process: [
      { step: "01", title: "Schematics & Engineering Review", desc: "We review block diagrams, chip specifications, housing designs, and certification needs." },
      { step: "02", title: "ODM Selection & Tooling", desc: "We secure direct factory tooling and verify pre-production golden samples." },
      { step: "03", title: "High-Speed SMT & Automated Assembly", desc: "Surface-mount machines assemble PCBs, which are inspected at multi-level stages." },
      { step: "04", title: "Sealed Anti-Static Transport", desc: "Items undergo safe final tests, ESD packaging, and are vacuum-wrapped for global air or sea transit." }
    ],
    faqs: [
      { q: "What certification marks can you guarantee?", a: "We guarantee CE, FCC, RoHS, UL, and CB compliance based on the specific regulations of your target destination." },
      { q: "Can you provide custom firmware pre-flashing during assembly?", a: "Yes, we support secure flashing of custom firmware on chips during the in-circuit testing (ICT) stage." }
    ],
    ctaText: "Source High-Performance Electronics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Agricultural Commodities",
    slug: "agricultural-commodities",
    heroTitle: "Premium Global Grains, Spices & Crops Sourcing",
    heroSub: "Sustaining international food networks with high-grade grains, oilseeds, culinary spices, and fresh agro goods.",
    description: "Sourcing and delivering standard and organic agricultural products from primary farming regions across the globe.",
    longDescription: "Mokshamrit Trading Company is highly active in critical food networks. We source and trade agricultural commodities including basmati rice, high-protein wheat, oilseeds, yellow corn, groundnuts, raw spices (such as tellicherry black pepper, cumin, turmeric), and customized dry fruits. We maintain temperature-regulated container transport and verify strict phytosanitary parameters at every border.",
    features: [
      "Rigorous pre-shipment SGS analysis for moisture, purity, and aflatoxin levels",
      "State-of-the-art moisture-controlled and grain-protective packaging material",
      "Organic crop contract cultivation with traceable agricultural provenance",
      "Full compliance with FDA, EFSA, and regional food safety certifications"
    ],
    benefits: [
      "Ensures absolute food security with consistent and resilient crop supply contracts",
      "High quality grains with minimal foreign matter and zero infestation",
      "Strategic pricing through direct contracts with origin farming associations",
      "Complete import paperwork handled flawlessly (Certificate of Origin, Phytosanitary Certificate)"
    ],
    industriesServed: [
      "Global Food Processing Industries",
      "Supermarket Chains & Consumer Brands",
      "Culinary Spice Packers & Grinders",
      "Animal Feed Mills & Flour Producers"
    ],
    process: [
      { step: "01", title: "Specification & Crop Grade Setup", desc: "Define humidity levels, color ratios, unbroken grain percentage, and pesticide limits." },
      { step: "02", title: "Farm Consolidation & Cleaning", desc: "Crops are harvested, mechanically cleaned, color-sorted, and verified at processing mills." },
      { step: "03", title: "SGS Independent Validation", desc: "Third-party inspectors test samples at loading terminals to verify strict trade contract specs." },
      { step: "04", title: "Silo Bags or Bulk Vessel Transport", desc: "Agricultural goods are dynamically packed for optimal ventilation and dry shipping." }
    ],
    faqs: [
      { q: "Do you supply certificate of phytosanitary status?", a: "Yes, every single shipment is certified by local crop departments alongside custom SGS testing validations." },
      { q: "What shipping terms do you operate on?", a: "We operate on flexible containerized and breakbulk logistics on standard FOB, CFR, and CIF trade parameters." }
    ],
    ctaText: "Procure Premium Agricultural Crops",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Metal Scrap Recycling",
    slug: "metal-scrap",
    heroTitle: "High-Yield Ferrous & Non-Ferrous Scrap Metal Trading",
    heroSub: "Purity-inspected copper, aluminum, stainless steel, and iron scrap supplied directly to primary smelters.",
    description: "Repurposing industrial metals to supply circular loops with certified ferrous and non-ferrous raw materials.",
    longDescription: "Mokshamrit Trading Company processes and trades high-grade metal scrap to feed the global circular manufacturing sector. We source, classify, and supply premium copper wire scrap (Millberry), pristine aluminum extrusion scrap (Tense/Tabor), lead batteries, heavy melting steel (HMS 1 & 2), and stainless-steel grades. We operate in strict compliance with the Basel Convention and global environmental import laws.",
    features: [
      "Strict categorization based on ISRI (Institute of Scrap Recycling Industries) standards",
      "Spectrometric purity testing ensuring exact elemental fractions",
      "Secure yard packing, container strapping, and bulk scrap loading",
      "Complete radiation checking and decontamination certifications"
    ],
    benefits: [
      "Provides smelting facilities with cost-effective alternatives to raw iron/copper ore",
      "Guarantees compliance with ISRI definitions, eliminating border rejections",
      "Complete end-to-end trace documentation for green-carbon steel audits",
      "Reliable bulk shipments matching strict scheduled smelting cycles"
    ],
    industriesServed: [
      "Steel Manufacturing Mills & Foundries",
      "Copper Refineries & Cable Producers",
      "Aluminum Extruders & Smelting Works",
      "Heavy Industrial Tooling Manufacturers"
    ],
    process: [
      { step: "01", title: "Purity & ISRI Grade Profiling", desc: "Identify exact ISRI definitions for metal percentages, allowable coatings, and moisture rules." },
      { step: "02", title: "Sourcing & Metal Spectrometry", desc: "Yard processing consolidates raw scrap and screens with alloy analyzers." },
      { step: "03", title: "Shearing & High-DensityCompaction", desc: "Scrap is sheared to length or baled to optimize storage densities for shipping." },
      { step: "04", title: "Environmental Custody Shipping", desc: "We clear strict border customs and manage logistics under eco-compliant shipping criteria." }
    ],
    faqs: [
      { q: "Do you supply pure Copper Millberry scrap?", a: "Yes, we trade in premium Copper Wire Scrap (Millberry 99.9% purity), tested rigorously with digital alloy analyzers." },
      { q: "How do you guarantee scrap isn't contaminated?", a: "We issue complete radiation inspection reports, heavy metal purity tests, and follow ISRI specification rules." }
    ],
    ctaText: "Source Recycled Metal Scrap",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Furniture",
    slug: "furniture",
    heroTitle: "Enterprise & Luxury Bespoke Commercial Furniture",
    heroSub: "Architect-preferred solid wood, steel-reinforced frames, and modern luxury furnishings for commercial scaling.",
    description: "Custom bulk contract supply of premium commercial, resort, office, and institutional furniture designs.",
    longDescription: "We trade, collaborate, and supply top-tier contract furniture built for heavy use and high aesthetic value. Partnering with premium joineries and designers, we offer customized tables, lounge seating, commercial office setups, outdoor teakwood resort structures, and boutique hotel interior collections. We select kiln-dried timber, certified fabrics, and premium components to guarantee product life.",
    features: [
      "High-grade teak, oak, walnut, and certified anti-moisture hardwoods",
      "Commercial-grade heavy rub-count flame-retardant upholstery fabrics",
      "Precision structural joints with concealed steel reinforcement",
      "Crated wood-frame pallet packaging to ensure pristine delivery"
    ],
    benefits: [
      "Procure bespoke custom designer plans at direct-factory import costs",
      "Ensures furniture passes stability, durability, and commercial fire tests",
      "Access to extensive designer catalogs with personalized wood and metal styling options",
      "Full custom interior package deliveries matching your project schedule"
    ],
    industriesServed: [
      "Multi-Starred Hospitality & Resorts",
      "Premium Commercial Office Spaces",
      "Institutional and Educational Complexes",
      "Luxury Interior Design Agencies"
    ],
    process: [
      { step: "01", title: "Architectural Plans & CAD Integration", desc: "We review layout schematics, timber selection, fabric grades, and target finishes." },
      { step: "02", title: "Staging Prototype", desc: "Our direct factory craftsman builds a golden specimen room mock-up for visual validation." },
      { step: "03", title: "Precision CNC Slicing & Joinery", desc: "Wood components are carved with computerized accuracy and joined with classic techniques." },
      { step: "04", title: "Crated Packaging & Setup Logistics", desc: "Furniture units are wrapped, heavily crated, and container-shipped for direct site setup." }
    ],
    faqs: [
      { q: "Do your furniture woods carry eco-conscious certifications?", a: "Yes, we source sustainable timber carrying SVLK or FSC certifications ensuring eco-friendly lumber harvest methods." },
      { q: "What is your typical lead time for custom hotel fit-outs?", a: "Typical custom contract fabrication takes 45 to 60 days, followed by secure global marine transport." }
    ],
    ctaText: "Secure Luxury Contract Furniture",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
  }
];
