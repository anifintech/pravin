import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    step: '01',
    title: 'Book Online or Call',
    description: 'Fill our quick booking form or call/WhatsApp us. Takes less than 2 minutes.',
    icon: '📱',
    color: 'bg-blue-600',
  },
  {
    step: '02',
    title: 'Technician Arrives',
    description: 'A certified technician reaches your doorstep within 60–90 minutes.',
    icon: '🏠',
    color: 'bg-orange-500',
  },
  {
    step: '03',
    title: 'Free Diagnosis',
    description: 'The technician diagnoses the issue and gives you a transparent price quote.',
    icon: '🔍',
    color: 'bg-purple-600',
  },
  {
    step: '04',
    title: 'Repair & Done',
    description: "Once you approve, we fix it right then and you're good to go.",
    icon: '✅',
    color: 'bg-green-600',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-4">Simple Process</span>
          <h2 className="section-title mb-4">
            How It Works —{' '}
            <span className="text-blue-600">Super Simple</span>
          </h2>
          <p className="section-subtitle">
            Getting your appliance repaired has never been easier. Book in 2 minutes, get repaired same day.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-orange-200 via-purple-200 to-green-200 mx-32" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                {/* Step circle */}
                <div className={`relative w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center text-3xl mb-4 z-10 shadow-lg`}>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center">
                    <span className="text-xs font-black text-slate-600">{step.step}</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>

                {/* Arrow (mobile) */}
                {i < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-300 mt-4 lg:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-100 rounded-3xl px-8 py-6">
            <div className="text-center sm:text-left">
              <p className="font-black text-xl text-slate-900">Ready to get your appliance fixed?</p>
              <p className="text-slate-600 text-sm mt-1">Book now — technician reaches within 90 minutes</p>
            </div>
            <Link
              href="/booking"
              className="btn-primary whitespace-nowrap flex-shrink-0"
            >
              Book Now — It's Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
