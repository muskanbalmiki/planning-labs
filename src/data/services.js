// Two verticals with their sub-services, matching the sitemap.
export const verticals = {
  experiential: {
    slug: 'experiential-marketing',
    name: 'Experiential Marketing',
    tagline: 'We build moments people remember, and brands people trust.',
    accent: 'signal',
    description:
      'From stage to stall, Planning Labs designs and produces live brand experiences across India — engineered for scale, safety and impact.',
    services: [
      { slug: 'events', name: 'Events', summary: 'End-to-end planning and live execution for corporate and consumer events of any size.' },
      { slug: 'exhibitions-stall-design', name: 'Exhibitions & Stall Design', summary: 'Custom stall design and fabrication that turns floor space into footfall.' },
      { slug: 'brand-activations', name: 'Brand Activations', summary: 'On-ground activations that convert audience attention into brand recall.' },
      { slug: 'mice', name: 'MICE', summary: 'Meetings, incentives, conferences and exhibitions delivered end to end, in India and abroad.' },
      { slug: 'conferences-product-launches', name: 'Conferences & Product Launches', summary: 'High-stakes launch moments produced with broadcast-grade precision.' },
      { slug: 'employee-engagement', name: 'Employee Engagement', summary: 'Town halls, offsites and culture-building experiences for growing teams.' },
      { slug: 'outdoor-advertising', name: 'Outdoor Advertising', summary: 'OOH planning and buying across hoardings, transit and experiential media.' },
      { slug: 'event-production-fabrication', name: 'Event Production & Fabrication', summary: 'In-house fabrication, sound, light and stage engineering under one roof.' },
    ],
  },
  digital: {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    tagline: 'We build growth systems, not just campaigns.',
    accent: 'current',
    description:
      'A full-stack digital practice — strategy, content, media and measurement — built to move business metrics, not vanity ones.',
    services: [
      { slug: 'social-media-management', name: 'Social Media Management', summary: 'Always-on content, community and channel strategy across platforms.' },
      { slug: 'performance-marketing', name: 'Performance Marketing', summary: 'Paid media planning and optimisation across search, social and programmatic.' },
      { slug: 'seo', name: 'SEO', summary: 'Technical, content and authority SEO built for compounding organic growth.' },
      { slug: 'influencer-marketing', name: 'Influencer Marketing', summary: 'Creator partnerships mapped to audience and outcome, not just reach.' },
      { slug: 'video-commercial-production', name: 'Video & Commercial Production', summary: 'Scripts to final cut — brand films, ads and social-first video.' },
      { slug: 'website-development', name: 'Website Development', summary: 'Fast, conversion-led websites built on modern, manageable stacks.' },
      { slug: 'creative-design', name: 'Creative Design', summary: 'Brand and campaign design systems that hold up across every touchpoint.' },
      { slug: 'cgi-digital-content', name: 'CGI & Digital Content', summary: '3D and CGI content for product, launch and social storytelling.' },
    ],
  },
};

export const getServiceBySlug = (slug) => {
  for (const vertical of Object.values(verticals)) {
    const match = vertical.services.find((s) => s.slug === slug);
    if (match) return { ...match, vertical };
  }
  return null;
};

export const allServices = [
  ...verticals.experiential.services.map((s) => ({ ...s, verticalSlug: verticals.experiential.slug, verticalName: verticals.experiential.name })),
  ...verticals.digital.services.map((s) => ({ ...s, verticalSlug: verticals.digital.slug, verticalName: verticals.digital.name })),
];
