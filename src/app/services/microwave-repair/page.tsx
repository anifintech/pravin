import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/sections/ServicePageTemplate'
import { ServiceJsonLd } from '@/components/SEO/JsonLd'

export const metadata: Metadata = {
  title: 'Microwave Oven Repair in Chennai | Doorstep Service Same Day',
  description:
    'Expert microwave oven repair at your doorstep in Chennai. Solo, grill & convection models. Magnetron, door switch, turntable repair. Starting ₹299. Call +91 95000 93757.',
  keywords: [
    'microwave repair Chennai',
    'microwave oven repair Chennai',
    'microwave not heating Chennai',
    'microwave service Chennai',
    'microwave repair near me Chennai',
    'Samsung microwave repair Chennai',
    'LG microwave repair Chennai',
    'IFB microwave repair Chennai',
    'Godrej microwave repair Chennai',
    'convection microwave repair Chennai',
    'microwave door repair Chennai',
    'microwave magnetron repair Chennai',
  ],
  alternates: { canonical: 'https://fixitchennai.in/services/microwave-repair' },
  openGraph: {
    title: 'Microwave Oven Repair in Chennai | FixIt Chennai',
    description: 'Doorstep microwave repair in Chennai. All brands. Starting ₹299.',
    url: 'https://fixitchennai.in/services/microwave-repair',
  },
}

const problems = [
  { title: 'Not Heating Food', description: 'Magnetron failure, diode fault or high-voltage capacitor issue preventing proper heating.' },
  { title: 'Sparking Inside', description: 'Burnt waveguide cover, damaged rack or arcing caused by metal residue inside the cavity.' },
  { title: 'Door Not Closing / Locking', description: 'Door latch, hinge or interlock switch failure causing door issues and safety shutoff.' },
  { title: 'Turntable Not Rotating', description: 'Turntable motor or coupling failure preventing the plate from spinning during cooking.' },
  { title: 'Display Not Working', description: 'Control panel or display board fault causing blank display or unresponsive buttons.' },
  { title: 'Making Loud Noise', description: 'Turntable motor wear, stirrer fan fault or magnetron noise diagnosed and fixed.' },
  { title: 'Not Turning On', description: 'Blown fuse, door interlock or main PCB fault preventing the unit from powering on.' },
  { title: 'Convection Fan Not Working', description: 'Convection fan motor failure on combination microwave ovens repaired or replaced.' },
]

const brands = ['Samsung', 'LG', 'IFB', 'Godrej', 'Whirlpool', 'Panasonic', 'Bajaj', 'Morphy Richards', 'Bosch', 'Siemens']

const faq = [
  { q: 'How much does microwave repair cost in Chennai?', a: 'Microwave repair starts from ₹299 in Chennai. Magnetron replacement costs ₹800–₹2000. Door switch repair is ₹300–₹600. You always get a transparent quote before any work begins.' },
  { q: 'Do you repair convection microwaves?', a: 'Yes! We repair solo, grill and convection microwave ovens. Convection fan motor, heating element and control board repairs are all handled by our technicians.' },
  { q: 'Is it worth repairing a microwave?', a: 'If the repair cost is less than 50% of a new microwave, repair is usually the better option. Our technicians give you an honest recommendation after free diagnosis.' },
  { q: 'How long does microwave repair take?', a: 'Most microwave repairs are completed in 1–2 hours at your home. If a specific part like a magnetron needs ordering, it may take 1–2 days.' },
]

export default function MicrowaveRepairPage() {
  return (
    <>
      <ServiceJsonLd
        name="Microwave Oven Repair in Chennai"
        description="Expert doorstep microwave oven repair in Chennai. Solo, grill & convection models. All brands — Samsung, LG, IFB, Godrej serviced same day."
        url="https://fixitchennai.in/services/microwave-repair"
        price="299"
        faq={faq}
      />
      <ServicePageTemplate
        title="Microwave Oven Repair in Chennai"
        subtitle="Microwave Service & Repair"
        description="Expert doorstep microwave repair in Chennai. Solo, grill & convection ovens fixed same day — magnetron, door switch, turntable & PCB repairs. All brands covered."
        icon="🍳"
        color="bg-gradient-to-br from-orange-500 to-red-600"
        bgColor="bg-gradient-to-br from-orange-50 to-red-50"
        startingPrice="₹299"
        problems={problems}
        brands={brands}
        faq={faq}
      />
    </>
  )
}
