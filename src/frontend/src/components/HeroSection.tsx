import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const openWhatsApp = () => {
    window.open('https://wa.me/919199434365', '_blank');
  };

  return (
    <section id="hero" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32 md:pt-32">
      {/* Electric Wave Animation Background */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="electric-wave-overlay" />
      </div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="wave-overlay" />
      </div>

      {/* Premium Pulse Animation Background */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="pulse-glow absolute h-[600px] w-[600px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-brand-primary sm:text-6xl lg:text-7xl xl:text-8xl">
          Small Habits. Big Impact.
        </h1>
        <p className="mt-6 text-xl font-medium tracking-wide text-brand-text sm:text-2xl lg:text-3xl">
          Your AI Health Buddy.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/assessment">
            <Button
              className="h-auto min-h-[44px] bg-brand-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-primary/30 transition-all hover:bg-brand-primary/90 hover:shadow-xl hover:shadow-brand-primary/40 sm:text-lg"
            >
              Get Your Free Health Readiness Score
            </Button>
          </Link>
          <Button
            onClick={openWhatsApp}
            variant="outline"
            className="h-auto min-h-[44px] border-2 border-brand-primary px-8 py-4 text-base font-semibold text-brand-primary shadow-md transition-all hover:bg-brand-primary hover:text-white hover:shadow-lg sm:text-lg"
          >
            Book 15-Min Clarity Session
          </Button>
        </div>
      </div>
    </section>
  );
}
