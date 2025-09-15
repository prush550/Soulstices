"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroButtons() {
  const handleStartJourney = () => {
    // Add your logic here - redirect to signup, scroll to CTA, etc.
    console.log("Starting journey...");
    // Example: redirect to signup
    // window.location.href = '/signup';
  };

  const handleLearnMore = () => {
    // Add your logic here - scroll to about section, open modal, etc.
    console.log("Learning more...");
    // Example: scroll to about section
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button
        size="lg"
        onClick={handleStartJourney}
        className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white border-0 px-8 py-3"
      >
        Start Your Journey
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={handleLearnMore}
        className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 bg-transparent"
      >
        Learn More
      </Button>
    </div>
  );
}
