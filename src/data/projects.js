export const industries = [
  'BFSI', 'FMCG', 'Real Estate', 'Automotive', 'Healthcare & Pharma',
  'Technology', 'Retail & E-commerce', 'Hospitality',
];

export const projects = [
  { id: 'p1', title: 'Skyline Realty — Launch Pavilion', category: 'experiential', service: 'Exhibitions & Stall Design', industry: 'Real Estate', year: 2025, cover: 'linear-gradient(135deg,#ff4d2e,#7a1f10)', summary: 'A 6,000 sq.ft immersive sales pavilion for a luxury tower launch in South Mumbai.' },
  { id: 'p2', title: 'Nova Bank — Employee Town Hall', category: 'experiential', service: 'Employee Engagement', industry: 'BFSI', year: 2025, cover: 'linear-gradient(135deg,#0b3d3a,#0e1013)', summary: 'A pan-India hybrid town hall for 4,000+ employees across 12 cities.' },
  { id: 'p3', title: 'Verdant Foods — Retail Activation', category: 'experiential', service: 'Brand Activations', industry: 'FMCG', year: 2024, cover: 'linear-gradient(135deg,#d4a72c,#7a1f10)', summary: '250-store sampling and activation drive across 6 metro markets.' },
  { id: 'p4', title: 'AutoDrive Expo — Booth Experience', category: 'experiential', service: 'Exhibitions & Stall Design', industry: 'Automotive', year: 2024, cover: 'linear-gradient(135deg,#1a1d22,#ff4d2e)', summary: 'A 4,500 sq.ft interactive booth built for a national auto expo.' },
  { id: 'p5', title: 'MedCore — Annual Conference', category: 'experiential', service: 'Conferences & Product Launches', industry: 'Healthcare & Pharma', year: 2024, cover: 'linear-gradient(135deg,#0b3d3a,#d4a72c)', summary: 'A 3-day medical conference and product showcase for 1,200 delegates.' },
  { id: 'p6', title: 'Coastal Homes — 90-Day Growth Sprint', category: 'digital', service: 'Performance Marketing', industry: 'Real Estate', year: 2025, cover: 'linear-gradient(135deg,#0b3d3a,#10635d)', summary: 'A full-funnel paid media build that cut cost-per-lead by 41% in 90 days.' },
  { id: 'p7', title: 'Fettle Wellness — Organic Growth Engine', category: 'digital', service: 'SEO', industry: 'Healthcare & Pharma', year: 2025, cover: 'linear-gradient(135deg,#0e1013,#0b3d3a)', summary: 'A content and technical SEO programme that grew organic traffic 3.2x.' },
  { id: 'p8', title: 'Urban Threads — Creator Network', category: 'digital', service: 'Influencer Marketing', industry: 'Retail & E-commerce', year: 2024, cover: 'linear-gradient(135deg,#ff4d2e,#d4a72c)', summary: 'A 60-creator seeding and affiliate programme for a D2C apparel brand.' },
  { id: 'p9', title: 'Zenith Tech — Brand Film & Launch', category: 'digital', service: 'Video & Commercial Production', industry: 'Technology', year: 2024, cover: 'linear-gradient(135deg,#0e1013,#ff4d2e)', summary: 'A hero brand film and cutdown suite for a SaaS product launch.' },
  { id: 'p10', title: 'Harbor Stays — Website Rebuild', category: 'digital', service: 'Website Development', industry: 'Hospitality', year: 2025, cover: 'linear-gradient(135deg,#10635d,#1a1d22)', summary: 'A booking-first website rebuild that lifted direct bookings by 28%.' },
  { id: 'p11', title: 'Pulse Motors — CGI Product Film', category: 'digital', service: 'CGI & Digital Content', industry: 'Automotive', year: 2024, cover: 'linear-gradient(135deg,#7a1f10,#0e1013)', summary: 'Photoreal CGI film for a vehicle variant launch, shot-free.' },
  { id: 'p12', title: 'Meridian Group — MICE Offsite', category: 'experiential', service: 'MICE', industry: 'BFSI', year: 2023, cover: 'linear-gradient(135deg,#d4a72c,#0b3d3a)', summary: 'A 3-day leadership offsite and incentive trip for a 300-person cohort.' },
];

export const getProjectById = (id) => projects.find((p) => p.id === id);
