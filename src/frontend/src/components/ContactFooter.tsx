import { SiFacebook, SiInstagram, SiYoutube, SiLinkedin } from 'react-icons/si';
import { MessageCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export default function ContactFooter() {
  const openWhatsApp = () => {
    window.open('https://wa.me/919199434365', '_blank');
  };

  const socialLinks = [
    { icon: SiFacebook, href: '#', label: 'Facebook' },
    { icon: SiInstagram, href: '#', label: 'Instagram' },
    { icon: SiYoutube, href: '#', label: 'YouTube' },
    { icon: SiLinkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-brand-primary text-white shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Brand Section */}
          <div>
            <h3 className="font-heading text-2xl font-bold">ABL Pulse</h3>
            <p className="mt-4 text-sm leading-relaxed opacity-90">
              Empowering your wellness journey through Ayurvedic wisdom and modern science. Discover
              your path to optimal health with personalized assessments and expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-sm opacity-90 hover:opacity-100 hover:underline transition-all"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm opacity-90 hover:opacity-100 hover:underline transition-all"
                >
                  About Us
                </a>
              </li>
              <li>
                <Link
                  to="/assessment"
                  className="text-sm opacity-90 hover:opacity-100 hover:underline transition-all"
                >
                  Take Assessment
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-sm opacity-90 hover:opacity-100 hover:underline transition-all inline-flex items-center gap-2"
                >
                  <Shield className="h-3 w-3" />
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <Button
              onClick={openWhatsApp}
              variant="secondary"
              className="w-full bg-white text-brand-primary hover:bg-white/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Consultation
            </Button>

            {/* Social Media Icons */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} ABL Pulse. All rights reserved.
          </p>
          <p className="text-sm opacity-80">
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'abl-pulse'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-100 transition-opacity"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
