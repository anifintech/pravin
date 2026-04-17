'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Phone, MessageCircle, Clock, Shield, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'
import type { LeadFormData } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  service_type: z.enum(['washing-machine', 'refrigerator', 'dishwasher', 'other']),
  appliance_brand: z.string().optional(),
  issue_description: z.string().min(10, 'Please describe the issue in at least 10 characters'),
  address: z.string().min(10, 'Enter your full address'),
  area: z.string().min(2, 'Select or enter your area'),
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

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service_type: 'washing-machine' },
  })

  const serviceType = watch('service_type')

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
    } catch (err) {
      toast.error('Something went wrong. Please call us directly at +91 98765 43210')
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-6">
            Thank you! Our team will call you within <strong>30 minutes</strong> to confirm your appointment.
            Our technician will arrive at your doorstep within <strong>60–90 minutes</strong>.
          </p>
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-blue-900 mb-1">Need faster response?</p>
            <a href="tel:+919876543210" className="flex items-center gap-2 text-blue-600 font-bold">
              <Phone className="w-4 h-4" /> Call us: +91 98765 43210
            </a>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Clock className="w-4 h-4" />
            Technician in 90 Minutes
          </span>
          <h1 className="text-4xl font-black mb-3">Book Your Repair Service</h1>
          <p className="text-blue-200 text-lg">
            Fill in the details below. Our team will call you within 30 minutes to confirm.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-xl font-black text-slate-900 mb-6">Service Details</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Service type */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    What needs to be repaired? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: 'washing-machine', label: 'Washing Machine', icon: '🫧' },
                      { value: 'refrigerator', label: 'Refrigerator', icon: '🧊' },
                      { value: 'dishwasher', label: 'Dishwasher', icon: '🍽️' },
                      { value: 'other', label: 'Other', icon: '🔧' },
                    ].map((opt) => (
                      <label key={opt.value} className="cursor-pointer">
                        <input type="radio" value={opt.value} {...register('service_type')} className="sr-only" />
                        <div className={`border-2 rounded-2xl p-3 text-center transition-all ${
                          serviceType === opt.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-blue-200'
                        }`}>
                          <div className="text-2xl mb-1">{opt.icon}</div>
                          <div className="text-xs font-semibold text-slate-700">{opt.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Your Name *</label>
                    <input
                      {...register('name')}
                      placeholder="Eg. Ramesh Kumar"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Mobile Number *</label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="10-digit mobile number"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Email & Brand */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Email (Optional)</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Appliance Brand</label>
                    <select
                      {...register('appliance_brand')}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors bg-white"
                    >
                      <option value="">Select brand</option>
                      {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                {/* Issue */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Describe the Issue *</label>
                  <textarea
                    {...register('issue_description')}
                    rows={3}
                    placeholder="Eg. Washing machine is not spinning, makes a loud noise during the cycle..."
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  />
                  {errors.issue_description && <p className="text-red-500 text-xs mt-1">{errors.issue_description.message}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Address *</label>
                  <textarea
                    {...register('address')}
                    rows={2}
                    placeholder="Door no., street name, locality..."
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Area in Chennai *</label>
                  <select
                    {...register('area')}
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors bg-white"
                  >
                    <option value="">Select your area</option>
                    {chennaiAreas.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                  {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area.message}</p>}
                </div>

                {/* Date & Time */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Preferred Date</label>
                    <input
                      {...register('preferred_date')}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Preferred Time</label>
                    <select
                      {...register('preferred_time')}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors bg-white"
                    >
                      <option value="">Any time</option>
                      {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-60 text-white font-black py-4 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3 text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Book Service — Free Inspection
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-500">
                  By submitting, you agree to be contacted by our team. No spam, ever.
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Call card */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-6 text-white">
              <h3 className="font-black text-lg mb-2">Prefer to Call?</h3>
              <p className="text-blue-200 text-sm mb-4">Talk to our team directly for instant booking.</p>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 bg-white text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                +91 98765 43210
              </a>
            </div>

            {/* WhatsApp card */}
            <div className="bg-green-50 border border-green-200 rounded-3xl p-6">
              <h3 className="font-black text-slate-900 text-base mb-2">Chat on WhatsApp</h3>
              <p className="text-slate-600 text-sm mb-4">Send us photos of the issue for faster diagnosis.</p>
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent('Hi! I need appliance repair in Chennai.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>

            {/* Promises */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6">
              <h3 className="font-bold text-slate-900 text-base mb-4">Our Promises</h3>
              <ul className="space-y-3">
                {[
                  'Free doorstep inspection',
                  'Upfront pricing before repair',
                  'Genuine spare parts only',
                  '90-day service warranty',
                  'No fix = No charge',
                ].map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-slate-900 text-base">Working Hours</h3>
              </div>
              <p className="text-slate-700 font-semibold">Monday – Sunday</p>
              <p className="text-orange-600 font-black text-lg">8:00 AM – 9:00 PM</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-700 font-medium">Available Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
