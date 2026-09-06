import Hero from '../components/home/Hero';
import ServiceOverview from '../components/home/ServiceOverview';
import FeaturedWork from '../components/home/FeaturedWork';
import Industries from '../components/home/Industries';
import ClientLogos from '../components/home/ClientLogos';
import Testimonials from '../components/home/Testimonials';
import LatestInsights from '../components/home/LatestInsights';
import CareersPreview from '../components/home/CareersPreview';
import ContactCTA from '../components/home/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceOverview />
      <FeaturedWork />
      <Industries />
      <ClientLogos />
      <Testimonials />
      <LatestInsights />
      <CareersPreview />
      <ContactCTA />
    </>
  );
}
