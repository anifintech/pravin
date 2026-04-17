import { Clock, Shield, Star, Wrench, MapPin, CreditCard } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: '60-Min Response',
    description: 'Our technicians reach your doorstep within 60–90 minutes of booking. No more waiting all day.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Shield,
    title: '90-Day Warranty',
    description: 'Every repair comes with a 90-day service warranty. If the issue returns, we fix it free of charge.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Star,
    title: 'Certified Technicians',
    description: 'Our team is trained & certified on all major brands — Samsung, LG, Whirlpool, IFB, Bosch & more.',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: Wrench,
    title: 'Genuine Spare Parts',
    description: 'We only use genuine or OEM-grade spare parts to ensure lasting, reliable repairs.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: MapPin,
    title: 'All Chennai Areas',
    description: 'Serving Anna Nagar, Adyar, OMR, T.Nagar, Velachery, Tambaram, Porur & all major Chennai areas.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: CreditCard,
    title: 'Transparent Pricing',
    description: 'Get an upfront quote before we start. No hidden charges, no surprise bills — ever.',
    color: 'bg-red-100 text-red-600',
  },
]

export default function WhyUsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-4">Why Choose Us</span>
          <h2 className="section-title mb-4">
            Chennai's Most Trusted{' '}
            <span className="text-blue-600">Appliance Repair</span>
          </h2>
          <p className="section-subtitle">
            We've built our reputation on speed, transparency & quality. Over 5,000 satisfied
            customers across Chennai trust us with their home appliances.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-5 p-6 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white">
          {[
            { value: '5,000+', label: 'Happy Customers' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '8+', label: 'Years Experience' },
            { value: '50+', label: 'Areas Covered' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl sm:text-4xl font-black text-orange-400 mb-1">{stat.value}</div>
              <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
