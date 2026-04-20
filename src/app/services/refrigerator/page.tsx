import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/sections/ServicePageTemplate'
import { ServiceJsonLd } from '@/components/SEO/JsonLd'

export const metadata: Metadata = {
  title: 'Refrigerator Repair in Chennai | Fridge Repair Same Day Doorstep',
  description:
    'Expert fridge & refrigerator repair at your doorstep in Chennai. Single door, double door, side-by-side. Gas refilling, compressor repair. Starting ₹399. Call +91 95000 93757.',
  keywords: [
    'refrigerator repair Chennai', 'fridge repair Chennai', 'fridge not cooling Chennai',
    'refrigerator gas refilling Chennai', 'compressor repair Chennai',
    'Samsung fridge repair Chennai', 'LG refrigerator repair Chennai',
    'double door fridge repair Chennai', 'fridge repair Anna Nagar', 'fridge repair Adyar',
  ],
  alternates: { canonical: 'https://fixitchennai.in/services/refrigerator' },
  openGraph: {
    title: 'Refrigerator Repair in Chennai | FixIt Chennai',
    description: 'Doorstep fridge repair in Chennai. Gas refilling, compressor & thermostat repair. Starting ₹399.',
    url: 'https://fixitchennai.in/services/refrigerator',
  },
}

const problems = [
  { title: 'Not Cooling or Cooling Poorly', description: 'Refrigerant (gas) leak, dirty condenser coils or faulty thermostat causing insufficient cooling.' },
  { title: 'Gas Refilling / Leakage', description: 'Refrigerant gas leak detected & refilled with the correct gas type for your model.' },
  { title: 'Compressor Not Working', description: 'Dead or noisy compressor replaced or repaired to restore cooling function.' },
  { title: 'Excessive Frost Build-up', description: 'Faulty defrost heater, timer or thermostat causing ice accumulation in the freezer.' },
  { title: 'Water Leaking Inside/Outside', description: 'Blocked drain tube, faulty door seal or drip tray overflow causing water leaks.' },
  { title: 'Unusual Noises', description: 'Rattling, clicking or humming sounds from fan motor, evaporator or compressor issues.' },
  { title: 'Door Seal Replacement', description: 'Worn or torn door gaskets allowing warm air in and reducing efficiency.' },
  { title: 'Thermostat Repair/Replacement', description: 'Temperature control issues due to faulty mechanical or digital thermostat.' },
  { title: 'Fridge Not Starting', description: 'Overload protector, start relay or control board fault preventing startup.' },
]

const brands = ['Samsung', 'LG', 'Whirlpool', 'Godrej', 'Haier', 'Bosch', 'Siemens', 'Kelvinator', 'Videocon', 'Voltas', 'Mitsubishi', 'Electrolux']

const faq = [
  { q: 'How much does refrigerator repair cost in Chennai?', a: 'Fridge repair starts from ₹399 in Chennai. Gas refilling costs ₹800–₹1800 depending on gas type and quantity. Compressor replacement is ₹2500–₹6000. You get a full quote before any work starts.' },
  { q: 'Do you refill refrigerant gas?', a: 'Yes, we handle refrigerant gas leak detection and refilling for all types — R134a, R600a, R22, R410a. Our technicians carry proper gas charging equipment.' },
  { q: 'Do you repair side-by-side and French door refrigerators?', a: 'Yes! We repair single door, double door, side-by-side, bottom freezer and French door refrigerators from all major brands.' },
  { q: 'How long does refrigerator repair take?', a: 'Most repairs like thermostat replacement, door seal, or gas refilling are completed in 1–2 hours. Compressor replacement may take 2–4 hours.' },
  { q: 'Is it worth repairing an old refrigerator?', a: 'If your fridge is under 8–10 years old, repair is almost always more economical than replacement. Our technicians will give you an honest recommendation.' },
]

export default function RefrigeratorPage() {
  return (
    <>
      <ServiceJsonLd
        name="Refrigerator Repair in Chennai"
        description="Professional doorstep refrigerator repair in Chennai. Single door, double door & side-by-side fridges fixed same day. Gas refilling, compressor repair & thermostat replacement."
        url="https://fixitchennai.in/services/refrigerator"
        price="399"
        faq={faq}
      />
      <ServicePageTemplate
        title="Refrigerator Repair in Chennai"
        subtitle="Fridge & Refrigerator Service"
        description="Professional doorstep refrigerator repair in Chennai. Single door, double door & side-by-side fridges fixed same day. Gas refilling, compressor repair & thermostat replacement."
        icon="🧊"
        color="bg-gradient-to-br from-indigo-600 to-blue-600"
        bgColor="bg-gradient-to-br from-indigo-50 to-blue-50"
        startingPrice="₹399"
        problems={problems}
        brands={brands}
        faq={faq}
      />
    </>
  )
}
