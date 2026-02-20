export default function FounderProfile() {
  return (
    <div className="overflow-hidden rounded-3xl border-2 border-brand-accent/30 bg-gradient-to-br from-white to-brand-accent/10 shadow-xl">
      <div className="flex flex-col items-center px-6 py-12 text-center sm:px-12 lg:px-16 lg:py-16">
        {/* Image */}
        <div className="mx-auto mb-8">
          <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-brand-accent/30 shadow-lg">
            <img
              src="/assets/generated/founder-profile.dim_400x400.png"
              alt="Dr. Suman Lal"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-2xl">
          <div className="mb-2">
            <span className="inline-block rounded-full bg-brand-primary/10 px-4 py-1 text-sm font-semibold text-brand-primary">
              Founder
            </span>
          </div>
          <h3 className="font-heading text-3xl font-bold text-brand-primary sm:text-4xl">
            Dr. Suman Lal
          </h3>
          <p className="mt-2 text-lg font-semibold text-brand-accent">
            40+ Years of Experience
          </p>
          <p className="mt-6 text-lg leading-relaxed text-brand-text">
            The visionary behind 'Ayurved Banaye Life'. Her mission is to make health simple, natural, and 
            accessible to every home.
          </p>
        </div>
      </div>
    </div>
  );
}
