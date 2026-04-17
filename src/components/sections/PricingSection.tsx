import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: '🫧',
    name: 'Washing Machine',
    href: '/services/washing-machine',
    startingAt: '₹299',
    color: 'border-blue-200 hover:border-blue-400',
    badge: 'Most Popular',
    badgeColor: 'bg-blue-600',
    items: [
      { label: 'Inspection / Diagnosis', price: 'Free' },
      { label: 'Belt / Filter Replacement', price: '₹299 – ₹599' },
      { label: 'Drum Bearing / Motor', price: '₹800 – ₹2,000' },
      { label: 'Control Board Repair', price: '₹1,200 – ₹2,500' },
      { label: 'Water Pump Replacement', price: '₹500 – ₹900' },
    ],
  },
  {
    icon: '🧊',
    name: 'Refrigerator',
    href: '/services/refrigerator',
    startingAt: '₹399',
    color: 'border-indigo-200 hover:border-indigo-400',
    badge: null,
    badgeColor: '',
    items: [
      { label: 'Inspection / Diagnosis', price: 'Free' },
      { label: 'Thermostat / Sensor', price: '₹399 – ₹799' },
      { label: 'Gas Refilling (R134a)', price: '₹800 – ₹1,800' },
      { label: 'Compressor Replacement', price: '₹2,500 – ₹6,000' },
      { label: 'Door Seal / Gasket', price: '₹400 – ₹700' },
    ],
  },
  {
    icon: '🍽️',
    name: 'Dishwasher',
    href: '/services/dishwasher',
    startingAt: '₹499',
    color: 'border-orange-200 hover:border-orange-400',
    badge: null,
    badgeColor: '',
    items: [
      { label: 'Inspection / Diagnosis', price: 'Free' },
      { label: 'Spray Arm / Filter', price: '₹499 – ₹799' },
      { label: 'Drain Pump Repair', price: '₹800 – ₹1,500' },
      { label: 'Inlet Valve Replacement', price: '₹600 – ₹1,200' },
      { label: 'Control Board / PCB', price: '₹1,500 – ₹4,000' },
    ],
  },
]

export default function PricingSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="badge mb-4">Transparent Pricing</span>
          <h2 className="section-title mb-4">
            No Hidden Charges —{' '}
            <span className="text-blue-600">Ever</span>
          </h2>
          <p className="section-subtitle">
            You always get a full quote before we start any repair. Free inspection on every visit.
            No fix, no fee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.name}
              className={`relative bg-white rounded-2xl border-2 ${svc.color} p-6 transition-all shadow-sm hover:shadow-md`}
            >
              {svc.badge && (
                <span className={`absolute -top-3 left-6 ${svc.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {svc.badge}
                </span>
              )}

              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl">{svc.icon}</span>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">{svc.name}</h3>
                  <p className="text-sm text-slate-500">Starting at <span className="font-bold text-slate-800">{svc.startingAt}</span></p>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
                {svc.items.map((item) => (
                  <li key={item.label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {item.label}
                    </span>
                    <span className={`font-bold ml-2 ${item.price === 'Free' ? 'text-green-600' : 'text-slate-800'}`}>
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={svc.href}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Book {svc.name} Repair
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          * Prices are indicative. Exact quote given after free on-site diagnosis. Parts cost extra if replacement needed.
        </p>
      </div>
    </section>
  )
}
