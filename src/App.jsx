import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingActions from './components/layout/FloatingActions';
import ScrollToTop from './components/layout/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import ServiceRouter from './pages/ServiceRouter';
import OurWork from './pages/OurWork';
import ProjectDetail from './pages/ProjectDetail';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Insights from './pages/Insights';
import BlogDetail from './pages/BlogDetail';
import Careers from './pages/Careers';
import JobDetail from './pages/JobDetail';
import Contact from './pages/Contact';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Handles both vertical landing pages (experiential-marketing, digital-marketing)
              and individual sub-service pages (events, seo, etc.) from a single flat slug. */}
          <Route path="/services/:slug" element={<ServiceRouter />} />

          <Route path="/our-work" element={<OurWork />} />
          <Route path="/our-work/:id" element={<ProjectDetail />} />

          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:id" element={<CaseStudyDetail />} />

          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:id" element={<BlogDetail />} />

          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<JobDetail />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchResults />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
