import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Video, Users, BookOpen } from 'lucide-react';

const services = [
  {
    title: 'Health Score Card',
    description: 'Get a comprehensive assessment of your current health status and personalized insights.',
    icon: Heart,
  },
  {
    title: 'Webinars',
    description: 'Join our educational sessions on Ayurvedic principles and natural healing practices.',
    icon: Video,
  },
  {
    title: '1-on-1 Support',
    description: 'Receive personalized guidance from our experienced wellness practitioners.',
    icon: Users,
  },
  {
    title: 'Structured Programs',
    description: 'Follow our step-by-step programs designed for sustainable lifestyle transformation.',
    icon: BookOpen,
  },
];

export default function ServicesGrid() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-primary sm:text-4xl lg:text-5xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-brand-text">
            Comprehensive support for your wellness journey
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="group border-2 border-brand-accent/20 bg-gradient-to-br from-white to-brand-bg shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 transition-colors group-hover:bg-brand-primary/20">
                    <Icon className="h-7 w-7 text-brand-primary" />
                  </div>
                  <CardTitle className="font-heading text-xl text-brand-primary">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-brand-text">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
