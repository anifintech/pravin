import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import PricingSection from '@/components/sections/PricingSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import AreasSection from '@/components/sections/AreasSection'
import QuickBookingSection from '@/components/sections/QuickBookingSection'
import { LocalBusinessJsonLd } from '@/components/SEO/JsonLd'

export const metadata: Metadata = {
  title: 'FixIt Chennai – Washing Machine & Fridge Repair Chennai | Same Day Doorstep',
  description:
    'Best appliance repair service in Chennai. Washing machine, refrigerator & dishwasher repair at your doorstep — same day, certified technicians, transparent pricing. Call +91 95000 93757.',
  alternates: { canonical: 'https://fixitchennai.in' },
}

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <AreasSection />
      <QuickBookingSection />
    </>
  )
}
