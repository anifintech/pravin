import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/sections/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Dishwasher Repair in Chennai | Doorstep Service – Sai Service',
  description: 'Expert dishwasher repair at your doorstep in Chennai. All brands including Bosch, IFB, Siemens. Same-day service, error code diagnosis & . Call +91 98765 43210.',
}

const problems = [
  { title: 'Not Cleaning Dishes Properly', description: 'Blocked spray arms, clogged filters or low water pressure causing poor wash performance.' },
  { title: 'Not Draining Water', description: 'Blocked drain filter, faulty drain pump or kinked drain hose preventing complete drainage.' },
  { title: 'Water Leaking from Door', description: 'Worn door gasket, damaged latch or overfill sensor causing water to leak onto floor.' },
  { title: 'Error Codes (E15, E24, etc.)', description: 'All error codes diagnosed and resolved — including Bosch E15, E24, Siemens and IFB errors.' },
  { title: 'Not Starting / No Power', description: 'Door latch, thermal fuse, control board or power supply issues preventing startup.' },
  { title: 'Not Filling with Water', description: 'Faulty water inlet valve, float switch or water supply issue preventing water intake.' },
  { title: 'Making Loud Noise', description: 'Broken spray arm, debris in pump or worn wash motor causing grinding or rattling sounds.' },
  { title: 'Dishes Not Drying', description: 'Faulty heating element, rinse aid dispenser or vent fan not working as expected.' },
  { title: 'Detergent Dispenser Not Opening', description: 'Spring mechanism or wax motor failure in the detergent dispenser door.' },
]

const brands = ['Bosch', 'IFB', 'Siemens', 'Voltas Beko', 'LG', 'Samsung', 'Whirlpool', 'Faber', 'Elica', 'AEG', 'Miele', 'Electrolux']

const faq = [
  { q: 'How much does dishwasher repair cost in Chennai?', a: 'Dishwasher repair starts from ₹499 in Chennai. Minor repairs like cleaning blocked spray arms are ₹499–₹799. Motor or control board replacements cost ₹2000–₹5000. Always quoted upfront.' },
  { q: 'Can you fix Bosch E15 and E24 error codes?', a: 'Yes! Bosch E15 (water in base tray) and E24 (drain blocked) are among the most common dishwasher errors we fix daily. Our technicians specialize in Bosch and Siemens dishwashers.' },
  { q: 'Do you carry spare parts for dishwashers?', a: 'We carry common parts like spray arms, drain pumps, inlet valves and door gaskets. For specific parts, we source them within 24–48 hours from our suppliers.' },
  { q: 'My dishwasher is making a loud noise — is it worth repairing?', a: 'In most cases, yes. Noise usually indicates a blocked pump or broken spray arm — both are inexpensive repairs. Our technician will diagnose and advise you.' },
  { q: 'Do you service dishwashers in all Chennai areas?', a: 'Yes, we service dishwashers across all major Chennai areas including Anna Nagar, Adyar, OMR, Velachery, T.Nagar, Tambaram and many more.' },
]

export default function DishwasherPage() {
  return (
    <ServicePageTemplate
      title="Dishwasher Repair in Chennai"
      subtitle="Dishwasher Service"
      description="Certified doorstep dishwasher repair in Chennai. All brands — Bosch, IFB, Siemens, LG & more. Error code diagnosis, drain & pump repair. Transparent pricing."
      icon="🍽️"
      color="bg-gradient-to-br from-orange-500 to-red-600"
      bgColor="bg-gradient-to-br from-orange-50 to-red-50"
      startingPrice="₹499"
      problems={problems}
      brands={brands}
      faq={faq}
    />
  )
}
