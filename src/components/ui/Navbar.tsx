'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Menu, X, Wrench } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services/washing-machine', label: 'Washing Machine' },
  { href: '/services/refrigerator', label: 'Refrigerator' },
  { href: '/services/dishwasher', label: 'Dishwasher' },
  { href: '/booking', label: 'Book Service' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              scrolled ? 'bg-blue-600' : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <Wrench className={`w-5 h-5 ${scrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <div>
              <span className={`font-black text-xl leading-none ${scrolled ? 'text-blue-900' : 'text-white'}`}>
                Pravin<span className={scrolled ? 'text-orange-500' : 'text-orange-400'}>Service</span>
              </span>
              <p className={`text-xs leading-none mt-0.5 ${scrolled ? 'text-slate-500' : 'text-blue-100'}`}>
                Chennai's #1 Appliance Repair
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  scrolled
                    ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
              className={`flex items-center gap-2 text-sm font-semibold transition-all ${
                scrolled ? 'text-blue-600 hover:text-blue-700' : 'text-white/90 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </a>
            <Link
              href="/booking"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-slate-700' : 'text-white'}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 px-4 py-3 text-blue-600 font-semibold"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="btn-primary justify-center text-center"
              >
                Book Service Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
