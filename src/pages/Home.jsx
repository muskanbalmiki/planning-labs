import Hero from '../components/home/Hero';
import ServiceOverview from '../components/home/ServiceOverview';
import ClientLogos from '../components/home/ClientLogos';
import Testimonials from '../components/home/Testimonials';
import FeaturedWork from '../components/home/FeaturedWork';
import Industries from '../components/home/Industries';
import LatestInsights from '../components/home/LatestInsights';
// import CareersPreview from '../components/home/CareersPreview';
import ContactCTA from '../components/home/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceOverview />
      <ClientLogos />
      <Testimonials />
      <FeaturedWork />
      <Industries />
      <LatestInsights />
      {/* <CareersPreview /> */}
      <ContactCTA />
    </>
  );
}
