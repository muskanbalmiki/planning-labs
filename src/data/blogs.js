export const blogs = [
  { id: 'b1', title: 'What Makes an Activation Actually Convert', category: 'Experiential', date: '2026-08-12', excerpt: 'Footfall is easy to buy. Conversion is designed. Here is the framework we use before any activation goes live.', cover: 'linear-gradient(135deg,#ff4d2e,#0e1013)' },
  { id: 'b2', title: 'The SEO Playbook for Low-Awareness Categories', category: 'Digital', date: '2026-07-28', excerpt: 'Ranking is the easy part. Here is how we build organic strategy for brands nobody is searching for yet.', cover: 'linear-gradient(135deg,#0b3d3a,#10635d)' },
  { id: 'b3', title: 'Inside a 5,000 sq.ft Stall Build, Start to Finish', category: 'Experiential', date: '2026-07-09', excerpt: 'From CAD to teardown: a look at how our fabrication team plans an exhibition stall on a 21-day production clock.', cover: 'linear-gradient(135deg,#d4a72c,#7a1f10)' },
  { id: 'b4', title: 'Influencer Marketing Is a Media Channel, Not a Favour', category: 'Digital', date: '2026-06-22', excerpt: 'Why we plan creator partnerships with the same rigour as paid media, and how that changes the brief.', cover: 'linear-gradient(135deg,#0e1013,#ff4d2e)' },
  { id: 'b5', title: 'Employee Engagement Events That Outlast the Day', category: 'Experiential', date: '2026-06-03', excerpt: 'The difference between a good town hall and one people are still talking about a year later.', cover: 'linear-gradient(135deg,#1a1d22,#d4a72c)' },
  { id: 'b6', title: 'Performance Marketing Budgets: A Weekly Reallocation Model', category: 'Digital', date: '2026-05-19', excerpt: 'A simple weekly framework for moving budget toward what is actually working, before the quarter ends.', cover: 'linear-gradient(135deg,#0b3d3a,#0e1013)' },
];

export const getBlogById = (id) => blogs.find((b) => b.id === id);
