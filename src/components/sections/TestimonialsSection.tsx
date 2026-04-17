import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Ramesh',
    area: 'Adyar, Chennai',
    service: 'Washing Machine Repair',
    rating: 5,
    text: 'My LG front-load washing machine was not spinning. Called Sai Service at 10am and the technician was here by 11:15am. Fixed within 45 minutes! Very professional and the price was totally fair.',
    avatar: 'PR',
    color: 'bg-blue-500',
  },
  {
    name: 'Karthik Subramaniam',
    area: 'Anna Nagar, Chennai',
    service: 'Refrigerator Repair',
    rating: 5,
    text: 'Samsung double door fridge stopped cooling. Sai Service diagnosed gas leak, refilled and fixed in 2 hours. 3 months later, still working perfectly. Highly recommend!',
    avatar: 'KS',
    color: 'bg-orange-500',
  },
  {
    name: 'Meenakshi Iyer',
    area: 'Velachery, Chennai',
    service: 'Dishwasher Repair',
    rating: 5,
    text: 'Bosch dishwasher showing E24 error. The technician knew exactly what the problem was — clogged drain pump. Cleared it in 30 minutes. Excellent technical knowledge!',
    avatar: 'MI',
    color: 'bg-purple-500',
  },
  {
    name: 'Vijay Anand',
    area: 'OMR, Chennai',
    service: 'Washing Machine Repair',
    rating: 5,
    text: 'IFB top-load machine motor was gone. Got genuine motor replacement with . The price was upfront — no hidden charges at all. Will use again!',
    avatar: 'VA',
    color: 'bg-green-500',
  },
  {
    name: 'Deepa Krishnan',
    area: 'T. Nagar, Chennai',
    service: 'Refrigerator Repair',
    rating: 5,
    text: 'Quick response, expert repair, honest pricing. What more can you ask for? My Whirlpool fridge thermostat was replaced perfectly. Great team!',
    avatar: 'DK',
    color: 'bg-red-500',
  },
  {
    name: 'Raj Venkatesh',
    area: 'Porur, Chennai',
    service: 'Washing Machine Repair',
    rating: 5,
    text: 'Service was fast, technician was courteous and cleaned up after the repair. The machine is working like new. Excellent 5-star service from Sai Service!',
    avatar: 'RV',
    color: 'bg-cyan-500',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge mb-4">Customer Reviews</span>
          <h2 className="section-title mb-4">
            What Chennai Customers{' '}
            <span className="text-blue-600">Say About Us</span>
          </h2>
          <p className="section-subtitle">
            Over 5,000 happy customers across Chennai. Here's what some of them have to say about their experience.
          </p>
          {/* Google rating */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="font-black text-2xl text-slate-900 ml-1">4.9</span>
            <span className="text-slate-500 text-sm">/ 5 on Google (340+ reviews)</span>
          </div>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-3xl p-6 card-shadow relative">
              <Quote className="absolute top-5 right-5 w-8 h-8 text-slate-100" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-700 text-sm leading-relaxed mb-5">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.area}</p>
                </div>
                <span className="ml-auto text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-full">
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
