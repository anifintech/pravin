import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, MapPin, Phone, Clock, ArrowRight, Star } from 'lucide-react'
import { ServiceJsonLd } from '@/components/SEO/JsonLd'

const AREAS = [
  { slug: 'anna-nagar',       name: 'Anna Nagar',       pincode: '600040' },
  { slug: 'adyar',            name: 'Adyar',            pincode: '600020' },
  { slug: 'velachery',        name: 'Velachery',        pincode: '600042' },
  { slug: 'tambaram',         name: 'Tambaram',         pincode: '600045' },
  { slug: 'porur',            name: 'Porur',            pincode: '600116' },
  { slug: 'chromepet',        name: 'Chromepet',        pincode: '600044' },
  { slug: 'omr',              name: 'OMR',              pincode: '600119' },
  { slug: 'perungudi',        name: 'Perungudi',        pincode: '600096' },
  { slug: 't-nagar',          name: 'T. Nagar',         pincode: '600017' },
  { slug: 'mylapore',         name: 'Mylapore',         pincode: '600004' },
  { slug: 'nungambakkam',     name: 'Nungambakkam',     pincode: '600034' },
  { slug: 'guindy',           name: 'Guindy',           pincode: '600032' },
  { slug: 'besant-nagar',     name: 'Besant Nagar',     pincode: '600090' },
  { slug: 'sholinganallur',   name: 'Sholinganallur',   pincode: '600119' },
  { slug: 'pallavaram',       name: 'Pallavaram',       pincode: '600043' },
  { slug: 'medavakkam',       name: 'Medavakkam',       pincode: '600100' },
  { slug: 'kovilambakkam',    name: 'Kovilambakkam',    pincode: '600117' },
  { slug: 'perambur',         name: 'Perambur',         pincode: '600011' },
  { slug: 'egmore',           name: 'Egmore',           pincode: '600008' },
  { slug: 'royapettah',       name: 'Royapettah',       pincode: '600014' },
  { slug: 'mogappair',        name: 'Mogappair',        pincode: '600037' },
  { slug: 'ambattur',         name: 'Ambattur',         pincode: '600053' },
  { slug: 'avadi',            name: 'Avadi',            pincode: '600054' },
  { slug: 'poonamallee',      name: 'Poonamallee',      pincode: '600056' },
  { slug: 'thoraipakkam',     name: 'Thoraipakkam',     pincode: '600097' },
  { slug: 'navalur',          name: 'Navalur',          pincode: '600130' },
  { slug: 'virugambakkam',    name: 'Virugambakkam',    pincode: '600092' },
  { slug: 'kk-nagar',         name: 'KK Nagar',         pincode: '600078' },
  { slug: 'ashok-nagar',      name: 'Ashok Nagar',      pincode: '600083' },
  { slug: 'kodambakkam',      name: 'Kodambakkam',      pincode: '600024' },
  { slug: 'vadapalani',       name: 'Vadapalani',       pincode: '600026' },
  { slug: 'valasaravakkam',   name: 'Valasaravakkam',   pincode: '600087' },
  { slug: 'nanganallur',      name: 'Nanganallur',      pincode: '600061' },
  { slug: 'madipakkam',       name: 'Madipakkam',       pincode: '600091' },
  { slug: 'periyar-nagar',    name: 'Periyar Nagar',    pincode: '600082' },
  { slug: 'villivakkam',      name: 'Villivakkam',      pincode: '600049' },
]

const SERVICES = [
  { icon: '❄️', name: 'AC Repair', href: '/services/ac-repair', desc: 'Split AC, window AC, gas refilling & installation' },
  { icon: '🫧', name: 'Washing Machine Repair', href: '/services/washing-machine', desc: 'Front load, top load & semi-automatic' },
  { icon: '🧊', name: 'Refrigerator Repair', href: '/services/refrigerator', desc: 'Fridge gas refilling, compressor & thermostat' },
  { icon: '📺', name: 'TV Repair', href: '/services/tv-repair', desc: 'LED, LCD & Smart TV doorstep repair' },
  { icon: '🍳', name: 'Microwave Repair', href: '/services/microwave-repair', desc: 'Solo, grill & convection oven repair' },
  { icon: '🍽️', name: 'Dishwasher Repair', href: '/services/dishwasher', desc: 'All brands including Bosch & IFB' },
]

export async function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const area = AREAS.find((a) => a.slug === slug)
  if (!area) return {}

  const title = `Appliance Repair in ${area.name} Chennai | AC, Washing Machine & Fridge Repair`
  const description = `Fast doorstep appliance repair in ${area.name}, Chennai. AC repair, washing machine, refrigerator, TV & microwave repair — certified technicians, same-day service. Call +91 95000 93757.`

  return {
    title,
    description,
    keywords: [
      `appliance repair ${area.name}`,
      `AC repair ${area.name}`,
      `washing machine repair ${area.name}`,
      `refrigerator repair ${area.name}`,
      `fridge repair ${area.name}`,
      `TV repair ${area.name}`,
      `microwave repair ${area.name}`,
      `home appliance repair ${area.name} Chennai`,
      `AC service ${area.name} Chennai`,
      `washing machine service ${area.name} Chennai`,
      `appliance repair near me ${area.name}`,
      `AC repair ${area.name} Chennai`,
      `doorstep repair ${area.name} Chennai`,
    ],
    alternates: { canonical: `https://www.fixitchennai.in/areas/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://www.fixitchennai.in/areas/${slug}`,
    },
  }
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = AREAS.find((a) => a.slug === slug)
  if (!area) notFound()

  const faq = [
    {
      q: `Do you offer same-day appliance repair in ${area.name}?`,
      a: `Yes! We offer same-day doorstep appliance repair across ${area.name}, Chennai. Book before 5PM and a certified technician will visit your home the same day, 7 days a week from 8AM to 9PM.`,
    },
    {
      q: `How much does appliance repair cost in ${area.name}?`,
      a: `Repair starts from ₹299 in ${area.name}. AC repair from ₹399, washing machine from ₹299, fridge from ₹399, TV from ₹499. We give a transparent quote after free on-site diagnosis — no hidden charges.`,
    },
    {
      q: `How quickly does a technician arrive in ${area.name}?`,
      a: `Our technicians typically reach ${area.name} within 60–90 minutes of booking confirmation. We have technicians stationed across Chennai for fast response.`,
    },
    {
      q: `Which appliances do you repair in ${area.name}?`,
      a: `We repair AC (all types), washing machines, refrigerators, TVs, microwave ovens and dishwashers in ${area.name}. All major brands — Samsung, LG, Whirlpool, Daikin, Voltas, Bosch and more.`,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: `FixIt Chennai – Appliance Repair ${area.name}`,
            description: `Doorstep appliance repair in ${area.name}, Chennai. AC, washing machine, refrigerator, TV & microwave repair.`,
            telephone: '+91-95000-93757',
            url: `https://www.fixitchennai.in/areas/${slug}`,
            areaServed: { '@type': 'City', name: `${area.name}, Chennai` },
            address: {
              '@type': 'PostalAddress',
              addressLocality: area.name,
              addressRegion: 'Tamil Nadu',
              postalCode: area.pincode,
              addressCountry: 'IN',
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
              opens: '08:00',
              closes: '21:00',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        }}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
              <MapPin className="w-4 h-4" />
              <span>Chennai › {area.name}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Appliance Repair in<br />
              <span className="text-orange-400">{area.name}, Chennai</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl">
              Fast doorstep repair for AC, washing machine, refrigerator, TV & microwave in {area.name}.
              Certified technicians — arrives in 60–90 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
              >
                Book Repair in {area.name} <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+919500093757"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
              >
                <Phone className="w-5 h-5" /> Call +91 95000 93757
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { icon: Clock, text: '60–90 Min Arrival' },
                { icon: CheckCircle, text: 'Same Day Service' },
                { icon: Star, text: '4.9★ Rated' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white text-sm font-semibold">
                  <Icon className="w-4 h-4 text-orange-400" /> {text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              Our Services in {area.name}
            </h2>
            <p className="text-slate-500 mb-8">All appliance repairs at your doorstep — same day, genuine parts.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group border border-slate-200 hover:border-blue-300 rounded-2xl p-5 transition-all hover:shadow-md"
                >
                  <span className="text-3xl mb-3 block">{service.icon}</span>
                  <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                    {service.name} in {area.name}
                  </h3>
                  <p className="text-xs text-slate-500">{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
              Why {area.name} Residents Choose FixIt Chennai
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '⚡', title: '60–90 Min Arrival', desc: `Technicians reach ${area.name} fast` },
                { icon: '✅', title: 'Certified Technicians', desc: 'Brand-trained, background verified' },
                { icon: '💰', title: 'Transparent Pricing', desc: 'Quote upfront, no surprise bills' },
                { icon: '🔧', title: 'Genuine Parts', desc: 'OEM spare parts with warranty' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 text-center shadow-sm">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-slate-900 mb-8">
              FAQs — Appliance Repair in {area.name}
            </h2>
            <div className="space-y-4">
              {faq.map(({ q, a }) => (
                <div key={q} className="border border-slate-200 rounded-2xl p-5">
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-white mb-3">
              Need Appliance Repair in {area.name}?
            </h2>
            <p className="text-blue-100 mb-8">Book now — technician arrives in 60–90 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                Book Now <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+919500093757"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl transition-colors text-lg hover:bg-blue-50"
              >
                <Phone className="w-5 h-5" /> +91 95000 93757
              </a>
            </div>
          </div>
        </section>

        {/* Other Areas */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-black text-slate-700 mb-5">We Also Serve</h2>
            <div className="flex flex-wrap gap-2">
              {AREAS.filter((a) => a.slug !== slug).slice(0, 20).map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-3 py-1.5 rounded-full font-medium"
                >
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
