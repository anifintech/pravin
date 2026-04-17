'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'How quickly will the technician arrive after booking?',
    a: 'Our technicians typically arrive within 60–90 minutes of booking confirmation. We offer same-day service across all major Chennai areas from 8AM to 9PM, 7 days a week.',
  },
  {
    q: 'What appliances do you repair in Chennai?',
    a: 'We repair washing machines (front load, top load, semi-automatic), refrigerators (all types), and dishwashers (all brands). We service all major brands — Samsung, LG, Whirlpool, IFB, Bosch, Godrej, Haier and more.',
  },
  {
    q: 'How much does appliance repair cost in Chennai?',
    a: 'Washing machine repair starts at ₹299, refrigerator repair at ₹399, and dishwasher repair at ₹499. We provide a full transparent quote after free on-site diagnosis — no surprise charges.',
  },
  {
    q: 'Do you use genuine spare parts?',
    a: 'Yes, we only use genuine or OEM-grade spare parts from authorised suppliers. This ensures lasting, reliable repairs and protects your appliance from further damage.',
  },
  {
    q: 'Which areas in Chennai do you cover?',
    a: 'We cover all major Chennai areas including Anna Nagar, Adyar, Velachery, T. Nagar, OMR, Tambaram, Porur, Chromepet, Guindy, Mylapore, Nungambakkam, Besant Nagar, Sholinganallur, Perungudi and many more.',
  },
  {
    q: 'Is there a charge if you can\'t fix my appliance?',
    a: 'No. If we cannot fix your appliance, there is no service charge. We follow a strict "No fix, no fee" policy. The diagnosis is always free.',
  },
  {
    q: 'Can I book a repair on weekends?',
    a: 'Yes! We are open 7 days a week including Sundays and public holidays from 8AM to 9PM. Book online or call us anytime.',
  },
  {
    q: 'Do you service all brands of washing machines?',
    a: 'Yes — Samsung, LG, Whirlpool, IFB, Bosch, Godrej, Haier, Panasonic, Videocon, Voltas, Onida, Siemens and all other brands. Our technicians are trained across all major brands.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 lg:py-28 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="badge mb-4">FAQ</span>
          <h2 className="section-title mb-4">
            Common Questions About{' '}
            <span className="text-blue-600">Our Service</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about booking appliance repair in Chennai.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {faq.q}
                </span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {open === i && (
                <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-10">
          Still have questions?{' '}
          <a href="tel:+919876543210" className="text-blue-600 font-bold hover:underline">
            Call us at +91 98765 43210
          </a>
          {' '}— we're happy to help.
        </p>
      </div>
    </section>
  )
}
