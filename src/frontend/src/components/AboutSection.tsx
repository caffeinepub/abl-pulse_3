import FounderProfile from './FounderProfile';
import { Leaf, GraduationCap, TrendingUp, Heart } from 'lucide-react';

const coreValues = [
  {
    title: 'Education First',
    icon: GraduationCap,
  },
  {
    title: 'Structured Improvement',
    icon: TrendingUp,
  },
  {
    title: 'Sustainable Lifestyle Design',
    icon: Leaf,
  },
  {
    title: 'Accessible First Step',
    icon: Heart,
  },
];

export default function AboutSection() {
  return (
    <section className="bg-gradient-to-b from-brand-bg to-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Philosophy */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-primary sm:text-4xl lg:text-5xl">
            Our Philosophy
          </h2>
          <div className="mx-auto mt-8 max-w-4xl">
            <p className="text-lg leading-relaxed text-brand-text sm:text-xl">
              At ABL Pulse, we believe in <span className="font-semibold text-brand-primary">Root Cause Healing</span>. 
              We don't suppress symptoms; we align your body back with nature's rhythm by correcting your food, water 
              intake, and daily routine.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className="mb-10 text-center font-heading text-2xl font-bold text-brand-primary sm:text-3xl">
            Our Core Values
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="flex flex-col items-center rounded-2xl border-2 border-brand-accent/20 bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent/20">
                    <Icon className="h-8 w-8 text-brand-primary" />
                  </div>
                  <h4 className="font-heading text-lg font-semibold text-brand-primary">
                    {value.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Founder Profile */}
        <FounderProfile />
      </div>
    </section>
  );
}
