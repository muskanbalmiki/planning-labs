import { useParams } from 'react-router-dom';
import { verticals } from '../data/services';
import ServiceLanding from './ServiceLanding';
import ServiceDetail from './ServiceDetail';

// A single flat slug (/services/:slug) can be either a vertical landing page
// (experiential-marketing, digital-marketing) or an individual sub-service page
// (events, seo, performance-marketing, etc.) — this resolves which to render.
export default function ServiceRouter() {
  const { slug } = useParams();
  const isVertical = Object.values(verticals).some((v) => v.slug === slug);
  return isVertical ? <ServiceLanding /> : <ServiceDetail />;
}
