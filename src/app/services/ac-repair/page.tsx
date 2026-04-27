import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/sections/ServicePageTemplate'
import { ServiceJsonLd } from '@/components/SEO/JsonLd'

export const metadata: Metadata = {
  title: 'AC Repair in Chennai | Air Conditioner Service & Gas Refilling',
  description:
    'Expert AC repair at your doorstep in Chennai. Split AC, window AC, inverter AC — gas refilling, compressor repair, PCB repair & installation. Starting ₹399. Call +91 95000 93757.',
  keywords: [
    'AC repair Chennai',
    'air conditioner repair Chennai',
    'AC service Chennai',
    'AC not cooling Chennai',
    'split AC repair Chennai',
    'window AC repair Chennai',
    'inverter AC repair Chennai',
    'AC gas refilling Chennai',
    'AC gas charging Chennai',
    'AC compressor repair Chennai',
    'AC PCB repair Chennai',
    'AC installation Chennai',
    'AC service near me Chennai',
    'LG AC repair Chennai',
    'Samsung AC repair Chennai',
    'Daikin AC repair Chennai',
    'Voltas AC repair Chennai',
    'Blue Star AC repair Chennai',
    'Hitachi AC repair Chennai',
    'Carrier AC repair Chennai',
    'O General AC repair Chennai',
    'AC repair Anna Nagar',
    'AC repair Velachery',
    'AC repair OMR',
    'AC repair Adyar',
    'AC repair Tambaram',
    'AC repair T Nagar',
    'AC not working Chennai',
    'AC cooling problem Chennai',
  ],
  alternates: { canonical: 'https://fixitchennai.in/services/ac-repair' },
  openGraph: {
    title: 'AC Repair in Chennai | FixIt Chennai',
    description: 'Doorstep AC repair & gas refilling in Chennai. All brands. Starting ₹399.',
    url: 'https://fixitchennai.in/services/ac-repair',
  },
}

const problems = [
  { title: 'AC Not Cooling', description: 'Low refrigerant gas, dirty filters or faulty compressor causing poor cooling performance.' },
  { title: 'Gas Refilling / Gas Leak', description: 'Refrigerant gas leak detection and refilling for R22, R32, R410a and R290 gas types.' },
  { title: 'Compressor Not Working', description: 'Dead or noisy compressor diagnosed and repaired or replaced to restore cooling.' },
  { title: 'AC Not Turning On', description: 'PCB fault, capacitor failure or power supply issue preventing the unit from starting.' },
  { title: 'Water Leaking from Indoor Unit', description: 'Blocked drain pipe, ice formation on coil or incorrect installation causing water drip.' },
  { title: 'PCB / Circuit Board Repair', description: 'Control board and PCB faults repaired or replaced for both indoor and outdoor units.' },
  { title: 'Unusual Noise or Vibration', description: 'Fan motor bearing wear, loose parts or compressor issues causing noise.' },
  { title: 'Remote Not Working', description: 'Remote control replaced or AC receiver board repaired for proper remote function.' },
  { title: 'AC Installation & Uninstallation', description: 'Professional split AC installation, uninstallation and re-installation with proper gas charging.' },
]

const brands = ['LG', 'Samsung', 'Daikin', 'Voltas', 'Blue Star', 'Hitachi', 'Carrier', 'O\'General', 'Godrej', 'Panasonic', 'Whirlpool', 'Lloyd', 'Haier', 'Onida']

const faq = [
  { q: 'How much does AC repair cost in Chennai?', a: 'AC repair starts from ₹399 in Chennai. Gas refilling costs ₹800–₹2500 depending on gas type (R22, R32, R410a). Compressor replacement is ₹3000–₹8000. You always get a transparent quote before we start any work.' },
  { q: 'Do you do AC gas refilling in Chennai?', a: 'Yes! We handle AC gas leak detection and refilling for all gas types — R22, R32, R410a and R290. Our technicians carry gas charging equipment and complete the job on the same visit.' },
  { q: 'Do you repair inverter ACs?', a: 'Yes, we repair both regular and inverter ACs. Inverter AC PCB repairs, sensor faults and compressor issues are all handled by our trained technicians.' },
  { q: 'How long does AC repair take?', a: 'Most AC repairs including gas refilling, capacitor replacement or cleaning are done in 1–2 hours. PCB or compressor replacement may take 2–4 hours depending on part availability.' },
  { q: 'Do you install new ACs in Chennai?', a: 'Yes! We install split ACs professionally with proper bracket fitting, copper pipe laying and gas charging. We also do uninstallation and reinstallation when you move homes.' },
  { q: 'Which AC brands do you service in Chennai?', a: 'All major brands — LG, Samsung, Daikin, Voltas, Blue Star, Hitachi, Carrier, O\'General, Godrej, Panasonic, Lloyd, Haier and more. Our technicians are brand-trained.' },
]

export default function ACRepairPage() {
  return (
    <>
      <ServiceJsonLd
        name="AC Repair in Chennai"
        description="Expert doorstep AC repair in Chennai. Split AC, window AC & inverter AC — gas refilling, compressor repair & installation. All brands serviced same day."
        url="https://fixitchennai.in/services/ac-repair"
        price="399"
        faq={faq}
      />
      <ServicePageTemplate
        title="AC Repair in Chennai"
        subtitle="Air Conditioner Service & Repair"
        description="Expert doorstep AC repair in Chennai. Split AC, window AC & inverter AC — gas refilling, compressor repair, PCB repair & installation. All brands serviced same day."
        icon="❄️"
        color="bg-gradient-to-br from-cyan-600 to-blue-700"
        bgColor="bg-gradient-to-br from-cyan-50 to-blue-50"
        startingPrice="₹399"
        problems={problems}
        brands={brands}
        faq={faq}
      />
    </>
  )
}
