'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import Link from 'next/link'
import {
  Phone, MessageCircle, Clock, CheckCircle, ArrowRight,
  Loader2, Monitor, MapPin, CalendarDays, User, Wrench,
} from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  service_type: z.enum(['washing-machine', 'refrigerator', 'dishwasher', 'other']),
  appliance_brand: z.string().optional(),
  issue_description: z.string().min(10, 'Please describe the issue in at least 10 characters'),
  address: z.string().min(10, 'Enter your full address'),
  area: z.string().min(2, 'Select your area'),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const chennaiAreas = [
  'Anna Nagar', 'Adyar', 'Velachery', 'Tambaram', 'Porur', 'Chromepet',
  'OMR', 'Perungudi', 'T. Nagar', 'Mylapore', 'Nungambakkam', 'Guindy',
  'Besant Nagar', 'Sholinganallur', 'Pallavaram', 'Medavakkam',
  'Kovilambakkam', 'Perambur', 'Egmore', 'Royapettah', 'Other',
]

const timeSlots = [
  '8:00 AM – 10:00 AM', '10:00 AM – 12:00 PM',
  '12:00 PM – 2:00 PM', '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM', '6:00 PM – 9:00 PM',
]

const brands = ['Samsung', 'LG', 'Whirlpool', 'IFB', 'Bosch', 'Godrej', 'Haier', 'Panasonic', 'Voltas', 'Other']

const serviceOptions = [
  { value: 'washing-machine', label: 'Washing Machine', icon: '🫧', desc: 'Front load, top load, semi-auto' },
  { value: 'refrigerator', label: 'Refrigerator', icon: '🧊', desc: 'Single door, double door, side-by-side' },
  { value: 'dishwasher', label: 'Dishwasher', icon: '🍽️', desc: 'All brands & models' },
  { value: 'other', label: 'Other Appliance', icon: '🔧', desc: 'Describe your appliance' },
]

const steps = [
  { num: '01', icon: Monitor, title: 'Book Online or Call', desc: 'Submit your request in under 2 minutes' },
  { num: '02', icon: Wrench, title: 'Technician Assigned', desc: 'We assign a certified technician near you' },
  { num: '03', icon: MapPin, title: 'Doorstep Visit', desc: 'Technician arrives within 60–90 minutes' },
  { num: '04', icon: CheckCircle, title: 'Repair Done', desc: 'Issue fixed with genuine parts, on the spot' },
]

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service_type: 'washing-machine' },
  })

  const serviceType = watch('service_type')

  const nextStep = async () => {
    let valid = false
    if (step === 1) valid = await trigger('service_type')
    if (step === 2) valid = await trigger(['name', 'phone', 'area', 'address'])
    if (valid) setStep((s) => s + 1)
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Submission failed')
      setSubmitted(true)
    } catch {
      toast.error('Something went wrong. Please call us directly at +91 98765 43210')
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 px-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 max-w-lg w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-500 mb-6 text-sm leading-relaxed">
            Thank you! Our team will contact you within <strong className="text-gray-800">30 minutes</strong> to confirm your appointment.
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide mb-2">Need immediate help?</p>
            <a href="tel:+919876543210" className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <Phone className="w-4 h-4" /> +91 98765 43210
            </a>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors">
            Back to Home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">

      {/* Top banner — Bosch style */}
      <div className="bg-[#0d3a70] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-2">Service & Repair</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
              Book a Repair Service
            </h1>
            <p className="text-blue-200 text-base">
              Expert doorstep repair for washing machines, refrigerators & dishwashers across Chennai.
              Certified technicians, genuine spare parts.
            </p>
          </div>
        </div>
      </div>

      {/* How it works — horizontal strip like Bosch */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {steps.map((s) => (
              <div key={s.num} className="py-6 px-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold mb-0.5">Step {s.num}</p>
                  <p className="text-sm font-bold text-gray-900">{s.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Booking form — 2/3 width */}
          <div className="lg:col-span-2 space-y-5">

            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    step === s ? 'bg-blue-700 border-blue-700 text-white'
                    : step > s ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 text-gray-400 bg-white'
                  }`}>
                    {step > s ? '✓' : s}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${step === s ? 'text-blue-700' : 'text-gray-400'}`}>
                    {s === 1 ? 'Select Appliance' : s === 2 ? 'Your Details' : 'Schedule'}
                  </span>
                  {s < 3 && <div className={`flex-1 h-0.5 w-8 ${step > s ? 'bg-green-400' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Step 1 — Appliance */}
              {step === 1 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Which appliance needs repair?</h2>
                  <p className="text-gray-500 text-sm mb-5">Select the appliance type to get started</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {serviceOptions.map((opt) => (
                      <label key={opt.value} className="cursor-pointer">
                        <input type="radio" value={opt.value} {...register('service_type')} className="sr-only" />
                        <div className={`border-2 rounded-xl p-4 flex items-center gap-4 transition-all hover:border-blue-400 ${
                          serviceType === opt.value
                            ? 'border-blue-700 bg-blue-50'
                            : 'border-gray-200 bg-white'
                        }`}>
                          <span className="text-3xl">{opt.icon}</span>
                          <div>
                            <p className={`font-bold text-sm ${serviceType === opt.value ? 'text-blue-800' : 'text-gray-800'}`}>{opt.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                          </div>
                          {serviceType === opt.value && (
                            <CheckCircle className="w-5 h-5 text-blue-700 ml-auto flex-shrink-0" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                  <button type="button" onClick={nextStep}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Step 2 — Contact details */}
              {step === 2 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Your contact details</h2>
                    <p className="text-gray-500 text-sm">We'll use these to confirm your appointment</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input {...register('name')} placeholder="Eg. Ramesh Kumar"
                          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none" />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input {...register('phone')} type="tel" placeholder="10-digit number"
                          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none" />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Appliance Brand</label>
                      <select {...register('appliance_brand')}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:outline-none bg-white">
                        <option value="">Select brand</option>
                        {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email (Optional)</label>
                      <input {...register('email')} type="email" placeholder="your@email.com"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Describe the Problem *</label>
                    <textarea {...register('issue_description')} rows={3}
                      placeholder="Eg. Washing machine not spinning, makes loud noise during the cycle..."
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:outline-none resize-none" />
                    {errors.issue_description && <p className="text-red-500 text-xs mt-1">{errors.issue_description.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Area in Chennai *</label>
                    <select {...register('area')}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:outline-none bg-white">
                      <option value="">Select your area</option>
                      {chennaiAreas.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                    {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea {...register('address')} rows={2}
                        placeholder="Door no., street, locality..."
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:outline-none resize-none" />
                    </div>
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(1)}
                      className="px-5 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-50 transition-colors">
                      Back
                    </button>
                    <button type="button" onClick={nextStep}
                      className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors">
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 — Schedule */}
              {step === 3 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">When is convenient for you?</h2>
                    <p className="text-gray-500 text-sm">Optional — we'll call to confirm a suitable time</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Date</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input {...register('preferred_date')} type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Time Slot</label>
                      <select {...register('preferred_time')}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:outline-none bg-white">
                        <option value="">Any time (8AM – 9PM)</option>
                        {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Summary box */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Booking Summary</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Service</span>
                        <span className="font-semibold text-gray-900 capitalize">{serviceType.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Location</span>
                        <span className="font-semibold text-gray-900">{watch('area') || '—'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Inspection Fee</span>
                        <span className="font-bold text-green-700">Free</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(2)}
                      className="px-5 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-50 transition-colors">
                      Back
                    </button>
                    <button type="submit" disabled={isLoading}
                      className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors">
                      {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                        : <>Confirm Booking <CheckCircle className="w-4 h-4" /></>}
                    </button>
                  </div>

                  <p className="text-center text-xs text-gray-400">
                    By submitting, our team will contact you to confirm. No spam.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Sidebar — 1/3 width */}
          <div className="space-y-4">

            {/* Call card */}
            <div className="bg-[#0d3a70] text-white rounded-2xl p-5">
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-1">Prefer to call?</p>
              <p className="font-bold text-lg mb-3">Talk to our team directly</p>
              <a href="tel:+919876543210"
                className="flex items-center gap-3 bg-white text-blue-800 font-bold px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                <Phone className="w-5 h-5" /> +91 98765 43210
              </a>
              <p className="text-blue-300 text-xs mt-3">Mon – Sun • 8AM to 9PM</p>
            </div>

            {/* WhatsApp */}
            <div className="border border-gray-200 bg-white rounded-2xl p-5">
              <p className="font-bold text-gray-900 text-sm mb-1">Chat on WhatsApp</p>
              <p className="text-gray-500 text-xs mb-3">Send photos for faster diagnosis</p>
              <a href={`https://wa.me/919876543210?text=${encodeURIComponent('Hi! I need appliance repair in Chennai.')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-3 rounded-xl transition-colors text-sm">
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>

            {/* Service areas */}
            <div className="border border-gray-200 bg-white rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-blue-700" />
                <p className="font-bold text-gray-900 text-sm">Service Areas</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Anna Nagar', 'Adyar', 'Velachery', 'T. Nagar', 'OMR', 'Tambaram', 'Porur', 'Mylapore', 'Guindy', '+ more'].map((a) => (
                  <span key={a} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">{a}</span>
                ))}
              </div>
            </div>

            {/* Working hours */}
            <div className="border border-gray-200 bg-white rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-700" />
                <p className="font-bold text-gray-900 text-sm">Working Hours</p>
              </div>
              <p className="text-gray-700 font-bold">Mon – Sun: 8AM – 9PM</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-700 font-medium">Available Now</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
