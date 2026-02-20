import HeroSection from '../components/HeroSection';
import ServicesGrid from '../components/ServicesGrid';
import AboutSection from '../components/AboutSection';
import ContactFooter from '../components/ContactFooter';
import Navigation from '../components/Navigation';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      <HeroSection />
      <ServicesGrid />
      <AboutSection />
      <ContactFooter />
    </div>
  );
}
