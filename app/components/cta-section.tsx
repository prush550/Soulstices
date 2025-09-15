"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Add your email submission logic here
    try {
      console.log("Submitting email:", email);
      // Example: await submitEmail(email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form or show success message
      setEmail("");
      alert("Thank you for your interest! We'll be in touch soon.");
    } catch (error) {
      console.error("Error submitting email:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isSubmitting}
        className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-400"
      />
      <Button 
        type="submit"
        disabled={isSubmitting || !email}
        className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white border-0 whitespace-nowrap"
      >
        {isSubmitting ? "Submitting..." : "Get Started"}
      </Button>
    </form>
  );
}
