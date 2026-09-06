export const jobs = [
  { id: 'j1', title: 'Senior Event Producer', department: 'Experiential Marketing', location: 'Mumbai', type: 'Full-time', description: 'Lead end-to-end production for large-scale corporate and consumer events, from concept through on-ground execution.' },
  { id: 'j2', title: 'Performance Marketing Manager', department: 'Digital Marketing', location: 'Mumbai', type: 'Full-time', description: 'Own paid media strategy and delivery across search, social and programmatic for a portfolio of client accounts.' },
  { id: 'j3', title: 'Exhibition Stall Designer', department: 'Experiential Marketing', location: 'Mumbai', type: 'Full-time', description: 'Design custom exhibition stalls and activation spaces from concept sketch to fabrication-ready drawings.' },
  { id: 'j4', title: 'SEO Strategist', department: 'Digital Marketing', location: 'Mumbai / Remote', type: 'Full-time', description: 'Build and execute technical and content SEO roadmaps across client accounts spanning multiple industries.' },
  { id: 'j5', title: 'Video Editor & CGI Artist', department: 'Digital Marketing', location: 'Mumbai', type: 'Full-time', description: 'Create brand films, social-first video and CGI product content for client and in-house campaigns.' },
  { id: 'j6', title: 'Client Servicing Executive', department: 'Client Services', location: 'Mumbai', type: 'Full-time', description: 'Be the day-to-day link between clients and our experiential and digital delivery teams.' },
];

export const getJobById = (id) => jobs.find((j) => j.id === id);
