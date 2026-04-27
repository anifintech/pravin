import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

const areas = [
  { name: 'Anna Nagar',     slug: 'anna-nagar' },
  { name: 'Adyar',          slug: 'adyar' },
  { name: 'Velachery',      slug: 'velachery' },
  { name: 'Tambaram',       slug: 'tambaram' },
  { name: 'Porur',          slug: 'porur' },
  { name: 'Chromepet',      slug: 'chromepet' },
  { name: 'OMR',            slug: 'omr' },
  { name: 'Perungudi',      slug: 'perungudi' },
  { name: 'T. Nagar',       slug: 't-nagar' },
  { name: 'Mylapore',       slug: 'mylapore' },
  { name: 'Nungambakkam',   slug: 'nungambakkam' },
  { name: 'Guindy',         slug: 'guindy' },
  { name: 'Besant Nagar',   slug: 'besant-nagar' },
  { name: 'Sholinganallur', slug: 'sholinganallur' },
  { name: 'Pallavaram',     slug: 'pallavaram' },
  { name: 'Medavakkam',     slug: 'medavakkam' },
  { name: 'Kovilambakkam',  slug: 'kovilambakkam' },
  { name: 'Perambur',       slug: 'perambur' },
  { name: 'Egmore',         slug: 'egmore' },
  { name: 'Royapettah',     slug: 'royapettah' },
  { name: 'Mogappair',      slug: 'mogappair' },
  { name: 'Ambattur',       slug: 'ambattur' },
  { name: 'Avadi',          slug: 'avadi' },
  { name: 'Poonamallee',    slug: 'poonamallee' },
  { name: 'Thoraipakkam',   slug: 'thoraipakkam' },
  { name: 'Navalur',        slug: 'navalur' },
  { name: 'Virugambakkam',  slug: 'virugambakkam' },
  { name: 'KK Nagar',       slug: 'kk-nagar' },
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
                href="tel:+919500093757"
                className="btn-secondary"
              >
                Call: +91 95000 93757
              </a>
            </div>
          </div>

          {/* Right: Areas grid */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 rounded-xl px-3 py-3 text-center transition-all group"
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">{area.name}</span>
                </Link>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">Click any area to see local service details</p>
          </div>
        </div>
      </div>
    </section>
  )
}
