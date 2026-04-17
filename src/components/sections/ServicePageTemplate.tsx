import Link from 'next/link'
import { CheckCircle, ArrowRight, Phone, Clock, Shield, Star } from 'lucide-react'

interface Problem {
  title: string
  description: string
}

interface ServicePageTemplateProps {
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
  bgColor: string
  startingPrice: string
  problems: Problem[]
  brands: string[]
  faq: { q: string; a: string }[]
}

export default function ServicePageTemplate({
  title, subtitle, description, icon, color, bgColor, startingPrice,
  problems, brands, faq,
}: ServicePageTemplateProps) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className={`${bgColor} pt-24 pb-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge mb-5 inline-block">{subtitle}</span>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-5">
                {title}
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">{description}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/booking" className="btn-primary">
                  Book Service Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+919876543210" className="flex items-center gap-2 bg-white border-2 border-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl hover:border-blue-300 transition-colors">
                  <Phone className="w-5 h-5 text-blue-600" />
                  +91 98765 43210
                </a>
              </div>

              {/* Quick facts */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Clock className="w-4 h-4 text-orange-500" />
                  Same-day service
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Shield className="w-4 h-4 text-green-500" />
                  
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Star className="w-4 h-4 text-yellow-500" />
                  4.9 rated service
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className={`${color} rounded-3xl p-12 text-center shadow-2xl`}>
                <div className="text-8xl mb-6">{icon}</div>
                <div className="text-white/90 text-xl font-bold mb-2">Starting at</div>
                <div className="text-white text-5xl font-black">{startingPrice}</div>
                <p className="text-white/70 text-sm mt-3">Free diagnosis • No fix, no fee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems we fix */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge mb-4">What We Fix</span>
            <h2 className="section-title mb-3">Common Problems We Solve</h2>
            <p className="section-subtitle">Our technicians are trained to diagnose & fix all types of issues.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, i) => (
              <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
                  <CheckCircle className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{problem.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-black text-2xl text-slate-900 mb-8">All Brands We Service</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {brands.map((brand) => (
              <span key={brand} className="bg-white border-2 border-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:border-blue-300 hover:text-blue-600 transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge mb-4">FAQ</span>
            <h2 className="section-title mb-3">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <details key={i} className="group bg-slate-50 rounded-2xl p-5 cursor-pointer">
                <summary className="font-bold text-slate-900 text-base flex items-center justify-between list-none">
                  {item.q}
                  <ArrowRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Ready to Fix Your {title.split(' ')[0]}?</h2>
          <p className="text-blue-200 mb-8 text-lg">Book now — same-day service across all Chennai areas</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="btn-primary text-base px-8 py-4">
              Book Service Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+919876543210" className="btn-secondary text-base px-8 py-4">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
