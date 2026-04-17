'use client'

import Link from 'next/link'
import { Phone, Star, CheckCircle, Clock, Shield, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const phone = '+91 98765 43210'
  const waPhone = '919876543210'
  const waMsg = encodeURIComponent('Hi! I need appliance repair service in Chennai.')

  return (
    <section className="relative min-h-screen gradient-hero flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available Now • All Chennai
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Doorstep{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Appliance
              </span>{' '}
              Repair in Chennai
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-xl">
              Washing machine, refrigerator & dishwasher repairs at your home — same day service,
              certified technicians & 90-day warranty on all repairs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/booking" className="btn-primary text-base">
                Book Free Inspection
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`https://wa.me/${waPhone}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-base"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="trust-badge">
                <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-xs">Same Day</span>
              </div>
              <div className="trust-badge">
                <Shield className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-xs">90-Day Warranty</span>
              </div>
              <div className="trust-badge">
                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-xs">Certified Techs</span>
              </div>
            </div>
          </div>

          {/* Right: Stats card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6 text-center">Why Chennai Trusts Us</h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    { value: '5000+', label: 'Happy Customers' },
                    { value: '98%', label: 'Satisfaction Rate' },
                    { value: '60 Min', label: 'Avg. Response Time' },
                    { value: '90 Days', label: 'Service Warranty' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center bg-white/10 rounded-2xl p-4">
                      <div className="text-3xl font-black text-orange-400 mb-1">{stat.value}</div>
                      <div className="text-sm text-blue-100">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Services */}
                <div className="space-y-3">
                  {[
                    { icon: '🫧', name: 'Washing Machine Repair', price: 'From ₹299' },
                    { icon: '🧊', name: 'Refrigerator Repair', price: 'From ₹399' },
                    { icon: '🍽️', name: 'Dishwasher Repair', price: 'From ₹499' },
                  ].map((service) => (
                    <div key={service.name} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.icon}</span>
                        <span className="text-sm font-semibold">{service.name}</span>
                      </div>
                      <span className="text-orange-400 font-bold text-sm">{service.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-2xl p-4 w-52">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-slate-800">"Fixed my LG washing machine in 45 mins. Excellent service!"</p>
                <p className="text-xs text-slate-500 mt-1">— Priya R., Adyar</p>
              </div>

              {/* Floating call card */}
              <div className="absolute -top-6 -right-6 bg-orange-500 rounded-2xl shadow-2xl p-4 text-white">
                <p className="text-xs font-semibold mb-1">Call us now</p>
                <a href={`tel:${phone}`} className="text-base font-black block">{phone}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom brand logos */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <p className="text-center text-sm text-blue-300 font-medium mb-6">We Service All Major Brands</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {['Samsung', 'LG', 'Whirlpool', 'IFB', 'Bosch', 'Godrej', 'Haier', 'Voltas'].map((brand) => (
              <span key={brand} className="text-white/60 font-bold text-sm hover:text-white transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
