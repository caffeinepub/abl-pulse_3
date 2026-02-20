import { SiFacebook, SiInstagram, SiYoutube, SiLinkedin } from 'react-icons/si';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              By Ayurved Banaye Life Pvt Ltd
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Making health simple, natural, and accessible to every home through Root Cause Healing.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-heading text-lg font-semibold">Get in Touch</h4>
            <div className="mt-4 space-y-3">
              <Button
                onClick={openWhatsApp}
                variant="outline"
                className="h-auto min-h-[44px] w-full justify-start gap-3 border-white/20 bg-white/10 px-4 py-3 text-left text-white shadow-md transition-all hover:bg-white/20 hover:text-white hover:shadow-lg"
              >
                <MessageCircle className="h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold">WhatsApp</div>
                  <div className="text-xs text-white/80">+91 9199434365</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="font-heading text-lg font-semibold">Follow Us</h4>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/20 hover:shadow-lg"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-white/80 sm:flex-row sm:text-left">
            <p>© {new Date().getFullYear()} Ayurved Banaye Life Pvt Ltd. All rights reserved.</p>
            <p>
              Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'abl-pulse'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline hover:text-white"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
