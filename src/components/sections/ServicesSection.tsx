import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

const services = [
  {
    icon: '🫧',
    title: 'Washing Machine Repair',
    slug: 'washing-machine',
    description: 'All types — front load, top load, semi-automatic. Drainage issues, spin problems, motor faults & more.',
    price: 'From ₹299',
    features: ['Front Load & Top Load', 'All Major Brands', 'Same-Day Repair', '90-Day Warranty'],
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    tag: 'Most Popular',
  },
  {
    icon: '🧊',
    title: 'Refrigerator Repair',
    slug: 'refrigerator',
    description: 'Single door, double door & side-by-side. Cooling issues, gas refilling, compressor & thermostat fixes.',
    price: 'From ₹399',
    features: ['Single & Double Door', 'Gas Refilling', 'Compressor Repair', '90-Day Warranty'],
    color: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    tag: null,
  },
  {
    icon: '🍽️',
    title: 'Dishwasher Repair',
    slug: 'dishwasher',
    description: 'Not cleaning, not draining, error codes & leaks — we fix all dishwasher issues at your doorstep.',
    price: 'From ₹499',
    features: ['All Dishwasher Types', 'Error Code Diagnosis', 'Drain & Pump Repair', '90-Day Warranty'],
    color: 'from-orange-500 to-red-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    tag: 'Premium',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-4">Our Services</span>
          <h2 className="section-title mb-4">
            Expert Repair for Every{' '}
            <span className="text-blue-600">Home Appliance</span>
          </h2>
          <p className="section-subtitle">
            Certified technicians reach your doorstep within 60–90 minutes. Transparent pricing,
            genuine spare parts & warranty on every job.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.slug}
              className={`relative bg-white rounded-3xl border-2 ${service.border} card-shadow overflow-hidden group`}
            >
              {service.tag && (
                <div className="absolute top-5 right-5 z-10">
                  <span className={`bg-gradient-to-r ${service.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {service.tag}
                  </span>
                </div>
              )}

              {/* Top gradient bar */}
              <div className={`h-2 bg-gradient-to-r ${service.color}`} />

              <div className="p-7">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${service.bg} text-4xl mb-5`}>
                  {service.icon}
                </div>

                {/* Title & desc */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500">Starting at</p>
                    <p className="text-xl font-black text-slate-900">{service.price}</p>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className={`inline-flex items-center gap-2 bg-gradient-to-r ${service.color} text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:opacity-90 hover:shadow-lg group-hover:-translate-y-0.5`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1"
          >
            Book Any Service — Get Free Diagnosis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
