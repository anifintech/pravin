'use client'

import Link from 'next/link'
import { Phone, MessageCircle, ArrowRight } from 'lucide-react'

export default function QuickBookingSection() {
  const waPhone = '919876543210'
  const waMsg = encodeURIComponent('Hi! I need appliance repair service in Chennai. Please help.')

  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text */}
          <div className="text-center lg:text-left text-white">
            <h2 className="text-3xl font-black mb-2">Need Urgent Repair? We're Ready Now!</h2>
            <p className="text-orange-100 text-lg">
              Technician at your door within 90 minutes — 7 days a week, 8AM to 9PM
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 bg-white text-orange-600 font-bold px-6 py-4 rounded-2xl hover:bg-orange-50 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <Phone className="w-5 h-5" />
              Call +91 98765 43210
            </a>
            <a
              href={`https://wa.me/${waPhone}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <Link
              href="/booking"
              className="flex items-center gap-3 bg-white/20 backdrop-blur-sm border-2 border-white text-white font-bold px-6 py-4 rounded-2xl hover:bg-white/30 transition-all"
            >
              Book Online
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
