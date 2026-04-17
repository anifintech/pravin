import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

const areas = [
  'Anna Nagar', 'Adyar', 'Velachery', 'Tambaram',
  'Porur', 'Chromepet', 'OMR', 'Perungudi',
  'T. Nagar', 'Mylapore', 'Nungambakkam', 'Guindy',
  'Besant Nagar', 'Sholinganallur', 'Pallavaram', 'Medavakkam',
  'Kovilambakkam', 'Perambur', 'Egmore', 'Royapettah',
]

export default function AreasSection() {
  return (
    <section className="py-20 lg:py-24 bg-slate-900 text-white" id="areas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              Service Coverage
            </span>
            <h2 className="text-4xl font-black text-white mb-4 leading-tight">
              Serving All Major Areas{' '}
              <span className="text-orange-400">Across Chennai</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              From Anna Nagar to OMR, from Porur to Mylapore — our technicians cover every
              corner of Chennai. If you're in Chennai, we're coming to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/booking"
                className="btn-primary"
              >
                Book in Your Area
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+919876543210"
                className="btn-secondary"
              >
                Call: +91 98765 43210
              </a>
            </div>
          </div>

          {/* Right: Areas grid */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {areas.map((area) => (
                <div
                  key={area}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 rounded-xl px-3 py-3 text-center transition-all cursor-default group"
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-slate-300 font-medium">{area}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">+ many more areas</p>
          </div>
        </div>
      </div>
    </section>
  )
}
