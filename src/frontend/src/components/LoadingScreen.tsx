import React from 'react';

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-bg via-brand-bg to-brand-primary/5">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <img
            src="/assets/ABL Logo (6).png"
            alt="ABL Pulse"
            className="h-24 w-auto animate-pulse"
          />
        </div>
        
        <div className="mb-4 flex justify-center">
          <div className="h-2 w-48 overflow-hidden rounded-full bg-brand-primary/20">
            <div className="h-full animate-[pulse-glow_2s_ease-in-out_infinite] bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary bg-[length:200%_100%]" />
          </div>
        </div>
        
        <p className="font-serif text-lg text-brand-text/80">
          Loading... / लोड हो रहा है...
        </p>
      </div>
    </div>
  );
}
