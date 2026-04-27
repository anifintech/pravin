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
import BrandsBar from '@/components/sections/BrandsBar'

export const metadata: Metadata = {
  title: 'FixIt Chennai – AC, Washing Machine & Fridge Repair Chennai | Same Day',
  description:
    'Best home appliance repair in Chennai. AC, washing machine, refrigerator, TV & dishwasher repair at your doorstep — same day service, certified technicians, transparent pricing. Call +91 95000 93757.',
  alternates: { canonical: 'https://fixitchennai.in' },
}

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HeroSection brandsBar={<BrandsBar />} />
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
