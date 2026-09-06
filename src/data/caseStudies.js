export const caseStudies = [
  {
    id: 'cs1',
    title: 'Skyline Realty: Selling a Tower Before It Was Built',
    client: 'Skyline Realty',
    vertical: 'Experiential Marketing',
    industry: 'Real Estate',
    cover: 'linear-gradient(135deg,#ff4d2e,#7a1f10)',
    challenge: 'Skyline needed to pre-sell 40% of a luxury residential tower before construction reached the third floor, in a market fatigued by generic sales lounges.',
    approach: 'Planning Labs designed and built a 6,000 sq.ft immersive pavilion with a scale model, a projection-mapped skyline walk-through, and a dedicated closing lounge for high-value walk-ins.',
    results: [
      { label: 'Units sold in 45 days', value: '46%' },
      { label: 'Qualified walk-ins', value: '2,300+' },
      { label: 'Avg. time on site', value: '38 min' },
    ],
  },
  {
    id: 'cs2',
    title: 'Coastal Homes: A 90-Day Paid Media Turnaround',
    client: 'Coastal Homes',
    vertical: 'Digital Marketing',
    industry: 'Real Estate',
    cover: 'linear-gradient(135deg,#0b3d3a,#10635d)',
    challenge: 'Rising cost-per-lead across search and social was making the sales funnel unviable for a mid-market housing project.',
    approach: 'We rebuilt the funnel from the ground up: audience segmentation, creative testing at scale, and a first-party lead-scoring model feeding budget allocation weekly.',
    results: [
      { label: 'Cost-per-lead reduction', value: '41%' },
      { label: 'Qualified leads / month', value: '3.4x' },
      { label: 'Media efficiency gain', value: '52%' },
    ],
  },
  {
    id: 'cs3',
    title: 'Fettle Wellness: Building an Organic Growth Engine',
    client: 'Fettle Wellness',
    vertical: 'Digital Marketing',
    industry: 'Healthcare & Pharma',
    cover: 'linear-gradient(135deg,#0e1013,#0b3d3a)',
    challenge: 'A wellness brand with strong products but near-zero organic search visibility against larger, better-funded competitors.',
    approach: 'A 9-month technical SEO overhaul paired with a topic-cluster content programme and a digital PR push to rebuild domain authority.',
    results: [
      { label: 'Organic traffic growth', value: '3.2x' },
      { label: 'Keywords ranking top 10', value: '480+' },
      { label: 'Organic-sourced revenue', value: '+61%' },
    ],
  },
];

export const getCaseStudyById = (id) => caseStudies.find((c) => c.id === id);
