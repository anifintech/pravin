import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/sections/ServicePageTemplate'
import { ServiceJsonLd } from '@/components/SEO/JsonLd'

export const metadata: Metadata = {
  title: 'TV Repair in Chennai | LED & Smart TV Repair Doorstep Service',
  description:
    'Expert LED, LCD & Smart TV repair at your doorstep in Chennai. No display, lines on screen, backlight failure fixed same day. Samsung, LG, Sony all brands. Starting ₹499. Call +91 95000 93757.',
  keywords: [
    'TV repair Chennai',
    'LED TV repair Chennai',
    'LCD TV repair Chennai',
    'smart TV repair Chennai',
    'TV repair near me Chennai',
    'TV not turning on Chennai',
    'TV no display Chennai',
    'TV screen repair Chennai',
    'TV backlight repair Chennai',
    'TV motherboard repair Chennai',
    'Samsung TV repair Chennai',
    'LG TV repair Chennai',
    'Sony TV repair Chennai',
    'OnePlus TV repair Chennai',
    'Mi TV repair Chennai',
    'TCL TV repair Chennai',
    'Panasonic TV repair Chennai',
    'TV repair Anna Nagar',
    'TV repair Velachery',
    'TV repair OMR',
    'TV repair Adyar',
  ],
  alternates: { canonical: 'https://fixitchennai.in/services/tv-repair' },
  openGraph: {
    title: 'TV Repair in Chennai | FixIt Chennai',
    description: 'Doorstep LED & Smart TV repair in Chennai. All brands. Starting ₹499.',
    url: 'https://fixitchennai.in/services/tv-repair',
  },
}

const problems = [
  { title: 'No Display / Black Screen', description: 'T-CON board fault, panel failure or HDMI input issue causing a blank screen.' },
  { title: 'Backlight Failure', description: 'LED backlight strips or inverter board failure causing dim or no picture.' },
  { title: 'TV Not Turning On', description: 'Power supply board fault, blown capacitors or main board failure preventing startup.' },
  { title: 'Lines on Screen', description: 'Vertical or horizontal lines caused by panel ribbon damage or T-CON board fault.' },
  { title: 'No Sound / Audio Issues', description: 'Speaker failure, audio IC fault or software issue causing no sound or distorted audio.' },
  { title: 'Motherboard / Main Board Repair', description: 'Main PCB repair or replacement for software crashes, no picture or Smart TV issues.' },
  { title: 'Smart TV Not Connecting to WiFi', description: 'WiFi module repair or software reset to restore internet and app connectivity.' },
  { title: 'Remote Not Working', description: 'Remote sensor repair on the TV or universal remote provided as replacement.' },
  { title: 'Screen Flickering', description: 'Power supply instability, loose panel connections or backlight driver issues causing flicker.' },
]

const brands = ['Samsung', 'LG', 'Sony', 'OnePlus', 'Mi (Xiaomi)', 'TCL', 'Panasonic', 'Vu', 'Philips', 'Hisense', 'Kodak', 'Thomson']

const faq = [
  { q: 'How much does TV repair cost in Chennai?', a: 'TV repair in Chennai starts from ₹499. Backlight repair costs ₹800–₹2500. Main board replacement is ₹1500–₹4000 depending on TV model. You get a full transparent quote after free diagnosis.' },
  { q: 'Do you repair Smart TVs in Chennai?', a: 'Yes! We repair all Smart TVs including Android TV, Tizen (Samsung) and WebOS (LG). Software issues, app crashes, WiFi problems and hardware faults are all handled.' },
  { q: 'Can you repair a cracked TV screen?', a: 'Unfortunately cracked panels usually cost more to replace than buying a new TV. We will inspect your TV and give you an honest recommendation before proceeding.' },
  { q: 'How long does TV repair take?', a: 'Most TV repairs like backlight, power board or software issues are completed in 1–3 hours at your home. Main board or panel replacement may take 1–2 days if parts need to be sourced.' },
  { q: 'Do you repair all TV sizes?', a: 'Yes — from 24-inch to 85-inch TVs. Whether it\'s a small bedroom TV or a large living room screen, our technicians handle all sizes and screen types.' },
]

export default function TVRepairPage() {
  return (
    <>
      <ServiceJsonLd
        name="TV Repair in Chennai"
        description="Expert doorstep LED & Smart TV repair in Chennai. No display, backlight failure, no sound — all issues fixed same day. Samsung, LG, Sony and all brands."
        url="https://fixitchennai.in/services/tv-repair"
        price="499"
        faq={faq}
      />
      <ServicePageTemplate
        title="TV Repair in Chennai"
        subtitle="LED, LCD & Smart TV Service"
        description="Expert doorstep TV repair in Chennai. LED, LCD, OLED & Smart TVs fixed same day — no display, backlight failure, board repair. All brands covered."
        icon="📺"
        color="bg-gradient-to-br from-slate-700 to-slate-900"
        bgColor="bg-gradient-to-br from-slate-50 to-gray-100"
        startingPrice="₹499"
        problems={problems}
        brands={brands}
        faq={faq}
      />
    </>
  )
}
