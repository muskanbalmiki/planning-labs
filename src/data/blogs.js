/*
  How to edit an article:
  - title, category, date, excerpt  -> shown on the cards and in the article hero
  - cover                           -> a CSS gradient, OR an image path like '/images/blog-1.webp'
  - content                         -> the article text. Each item is { heading, text }.
                                       "heading" is optional. Add or remove items freely.
  Covers below use your theme colours: gold for Experiential, violet for Digital.
*/
export const blogs = [
  {
    id: 'b1',
    title: 'What Makes an Activation Actually Convert',
    category: 'Experiential',
    date: '2026-08-12',
    excerpt: 'Footfall is easy to buy. Conversion is designed. Here is the framework we use before any activation goes live.',
    cover: 'linear-gradient(135deg,#ffc756,#5a2a06)',
    content: [
      { heading: 'Start with the action, not the crowd', text: 'Before we plan the space, we write down the one action we want a visitor to take. Everything else on the floor either helps that action or gets removed.' },
      { heading: 'Design the path', text: 'Visitors follow the easiest route. We map the walk-through, put the offer where people naturally slow down, and keep the sign-up step short enough to finish standing up.' },
      { heading: 'Measure on the day', text: 'We agree the numbers up front and track them while the activation is live, so we can adjust the floor in hours instead of waiting for the report.' },
    ],
  },
  {
    id: 'b2',
    title: 'The SEO Playbook for Low-Awareness Categories',
    category: 'Digital',
    date: '2026-07-28',
    excerpt: 'Ranking is the easy part. Here is how we build organic strategy for brands nobody is searching for yet.',
    cover: 'linear-gradient(135deg,#7a54a7,#1c1433)',
    content: [
      { heading: 'Search for the problem, not the product', text: 'When people do not know a category exists, they search for the problem it solves. We build content around those questions first.' },
      { heading: 'Build topics, not single pages', text: 'We group related questions into clusters, so one strong guide is supported by smaller pages that answer the follow-up questions.' },
      { heading: 'Track demand as it forms', text: 'In a new category the search volume grows over time. We review rankings and new queries every month and extend the clusters that start to move.' },
    ],
  },
  {
    id: 'b3',
    title: 'Inside a 5,000 sq.ft Stall Build, Start to Finish',
    category: 'Experiential',
    date: '2026-07-09',
    excerpt: 'From CAD to teardown: a look at how our fabrication team plans an exhibition stall on a 21-day production clock.',
    cover: 'linear-gradient(135deg,#ffc756,#7a1f10)',
    content: [
      { heading: 'Week one: CAD and sign-off', text: 'The stall starts as a 3D model. We lock the layout, materials and lighting with the client before a single panel is cut.' },
      { heading: 'Weeks two and three: fabrication', text: 'Our production team builds the structure in sections, so each part can be checked, packed and shipped to the venue on schedule.' },
      { heading: 'Install and teardown', text: 'On site, the sections go up in a fixed order. After the show, the same order runs in reverse so the stall can be packed and reused.' },
    ],
  },
  {
    id: 'b4',
    title: 'Influencer Marketing Is a Media Channel, Not a Favour',
    category: 'Digital',
    date: '2026-06-22',
    excerpt: 'Why we plan creator partnerships with the same rigour as paid media, and how that changes the brief.',
    cover: 'linear-gradient(135deg,#1c1433,#b89bdd)',
    content: [
      { heading: 'Plan it like media', text: 'We set an audience, a budget and a target before choosing creators, the same way we would for any paid channel.' },
      { heading: 'Write a brief creators can use', text: 'A good brief explains the goal and the must-haves, then leaves room for the creator to speak in their own voice.' },
      { heading: 'Report on outcomes', text: 'Views are not the finish line. We track clicks, sign-ups and sales from each partnership and use them to choose the next one.' },
    ],
  },
  {
    id: 'b5',
    title: 'Employee Engagement Events That Outlast the Day',
    category: 'Experiential',
    date: '2026-06-03',
    excerpt: 'The difference between a good town hall and one people are still talking about a year later.',
    cover: 'linear-gradient(135deg,#2a1a05,#ffc756)',
    content: [
      { heading: 'Give people a role', text: 'Events people remember are ones they took part in. We build in moments where employees contribute, not only listen.' },
      { heading: 'Make one message clear', text: 'We agree a single idea the company wants people to leave with, and shape the run of show around it.' },
      { heading: 'Keep it going afterwards', text: 'A short follow-up, such as a recap, a photo wall or a team challenge, keeps the idea alive after the day is over.' },
    ],
  },
  {
    id: 'b6',
    title: 'Performance Marketing Budgets: A Weekly Reallocation Model',
    category: 'Digital',
    date: '2026-05-19',
    excerpt: 'A simple weekly framework for moving budget toward what is actually working, before the quarter ends.',
    cover: 'linear-gradient(135deg,#322553,#7a54a7)',
    content: [
      { heading: 'Review weekly', text: 'Once a week we compare every campaign against the agreed cost target and sort them into scale, hold or pause.' },
      { heading: 'Move budget in small steps', text: 'We shift a portion of spend at a time, so one bad week does not undo a strong campaign.' },
      { heading: 'Keep a test budget', text: 'A fixed share of spend always goes to new ideas, so the plan keeps finding better options instead of repeating the old ones.' },
    ],
  },
];

export const getBlogById = (id) => blogs.find((b) => b.id === id);