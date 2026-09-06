# Planning Labs — Website (React + Bootstrap)

A component-based rebuild of the Planning Labs website: a Mumbai experiential +
digital marketing agency site with a full portfolio, case studies, blog/insights,
careers + application system, site-wide search, and lead-gen forms.

## Stack

- **React 19** (Vite) — component architecture, client-side routing
- **React Router v7** — all page routing (`src/App.jsx`)
- **Bootstrap 5** (grid + utilities) + **Bootstrap Icons**, themed with a custom
  design-token stylesheet (`src/styles/theme.css`) so it doesn't look like
  default Bootstrap
- No backend included — all content currently comes from plain JS "data" files
  so the whole site works standalone. See **Connecting a CMS** below for how to
  wire these to a real backend.

## Getting started

```bash
npm install
npm run dev       # local dev server, http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/
    layout/       Header (mega nav), Footer, WhatsApp/call floats, search overlay
    home/         Homepage sections (hero, service overview, stats, testimonials, etc.)
    common/       Shared building blocks (ProjectCard, BlogCard, JobCard, EnquiryForm, ...)
  pages/          One file per route (Home, About, OurWork, CaseStudies, Insights,
                  Careers, Contact, ServiceLanding/ServiceDetail, etc.)
  data/           Mock content: services.js, projects.js, caseStudies.js, blogs.js,
                  jobs.js, testimonials.js, stats.js — replace with API calls to go live
  styles/theme.css  Design tokens (colour, type, spacing) + all custom CSS
```

## Sitemap → routes

| Page                          | Route                                     |
|--------------------------------|--------------------------------------------|
| Home                           | `/`                                         |
| About                          | `/about`                                    |
| Experiential Marketing (hub)   | `/services/experiential-marketing`          |
| Digital Marketing (hub)        | `/services/digital-marketing`               |
| Individual service (e.g. SEO)  | `/services/seo`, `/services/events`, etc.   |
| Our Work (portfolio + filters) | `/our-work`                                 |
| Project detail                 | `/our-work/:id`                             |
| Case Studies                   | `/case-studies`                             |
| Case study detail              | `/case-studies/:id`                         |
| Insights / Blog                | `/insights`                                 |
| Blog detail                    | `/insights/:id`                             |
| Careers                        | `/careers`                                  |
| Job detail + application form  | `/careers/:id`                              |
| Contact + enquiry form         | `/contact`                                  |
| Search results                 | `/search?q=...`                             |

All 8 sub-services under each vertical are wired as individual pages with their
own URL, breadcrumb, and enquiry form — see `src/data/services.js`.

## Key functional requirements — where they live

- **Portfolio with category/industry filters** — `src/pages/OurWork.jsx`
- **Site-wide search** — header search icon opens `SearchOverlay.jsx`;
  full results page at `src/pages/SearchResults.jsx`
- **Enquiry form with file upload** — `src/components/common/EnquiryForm.jsx`,
  used on Contact, every service page, and the vertical landing pages
- **Careers + job application (with resume upload)** — `src/pages/Careers.jsx`
  and `src/pages/JobDetail.jsx`
- **WhatsApp + click-to-call** — floating buttons in
  `src/components/layout/FloatingActions.jsx` (update the phone number there)
- **Responsive design** — Bootstrap's grid + custom breakpoints throughout;
  test at 375px / 768px / 1280px

## Connecting a CMS / backend

Everything under `src/data/` is a plain array/object of the shape a real API
would return. To go live:

1. Replace the exports in `src/data/*.js` with `fetch()`/API calls (or a
   headless CMS SDK — Sanity, Contentful, Strapi, WordPress REST/GraphQL are
   all good fits for this content shape).
2. Wire `EnquiryForm.jsx` and `JobDetail.jsx`'s `handleSubmit` to your real
   endpoint (e.g. `POST /api/enquiries`, `POST /api/applications`) — both
   already collect the right fields, including file upload.
3. For Google Analytics / conversion tracking, add your GA4 snippet to
   `index.html` and fire events from the two form submit handlers above.
4. SEO basics (title/meta per page) can be added with `react-helmet-async` —
   not included by default to keep the starter dependency-light.

## Notes on content

All copy, project names, client logos, testimonials and statistics in this
build are **placeholder content** written to match the brief — swap these for
real Planning Labs projects, clients and numbers before launch.
