import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/sections/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Washing Machine Repair in Chennai | Doorstep Service – Sai Service',
  description: 'Expert washing machine repair at your doorstep in Chennai. Front load, top load, semi-automatic. Same-day service, . Call +91 98765 43210.',
}

const problems = [
  { title: 'Not Spinning or Agitating', description: 'Motor or belt issues causing the drum to not spin during wash or rinse cycles.' },
  { title: 'Not Draining Water', description: 'Blocked filter, faulty drain pump or kinked hose preventing water drainage.' },
  { title: 'Excessive Vibration & Noise', description: 'Worn drum bearings, unbalanced load sensors or damaged shock absorbers.' },
  { title: 'Water Leakage', description: 'Leaking from door seal, hose connections or damaged tub causing water on the floor.' },
  { title: 'Not Starting / No Power', description: 'Control board issues, burnt fuse or power supply faults preventing the machine from turning on.' },
  { title: 'Error Codes on Display', description: 'F, E, or H error codes diagnosed and resolved by our trained technicians.' },
  { title: 'Not Heating Water', description: 'Faulty heating element or thermostat preventing hot water washes.' },
  { title: 'Door Won\'t Lock / Open', description: 'Door interlock or handle mechanism failure on front-load machines.' },
  { title: 'Drum Not Tumbling', description: 'Broken drive belt or motor coupling on top-load or front-load machines.' },
]

const brands = ['Samsung', 'LG', 'Whirlpool', 'IFB', 'Bosch', 'Godrej', 'Haier', 'Panasonic', 'Videocon', 'Voltas', 'Onida', 'Siemens']

const faq = [
  { q: 'How much does washing machine repair cost in Chennai?', a: 'Washing machine repair starts from ₹299 in Chennai. The final cost depends on the type of repair — minor issues like belt replacement start at ₹299, while motor or control board repairs may cost ₹800–₹2500. You always get an upfront quote before we start.' },
  { q: 'Do you repair both front-load and top-load washing machines?', a: 'Yes! We repair all types — front-load, top-load (fully automatic), and semi-automatic washing machines from all major brands.' },
  { q: 'How quickly will the technician arrive?', a: 'Our technicians typically arrive within 60–90 minutes of booking confirmation. We offer same-day service across all major Chennai areas.' },
  { q: 'Do you carry spare parts?', a: 'Yes, our technicians carry commonly needed spare parts (belts, pumps, filters) in their service kits. For specific parts, we source genuine parts within 24 hours.' },
  { q: 'What warranty do you provide?', a: 'All washing machine repairs come with a service warranty. If the same issue recurs, we fix it at no extra charge.' },
]

export default function WashingMachinePage() {
  return (
    <ServicePageTemplate
      title="Washing Machine Repair in Chennai"
      subtitle="Washing Machine Service"
      description="Expert doorstep washing machine repair in Chennai by certified technicians. Front load, top load & semi-automatic machines fixed same day. Transparent pricing, genuine parts & ."
      icon="🫧"
      color="bg-gradient-to-br from-blue-600 to-cyan-600"
      bgColor="bg-gradient-to-br from-blue-50 to-cyan-50"
      startingPrice="₹299"
      problems={problems}
      brands={brands}
      faq={faq}
    />
  )
}
