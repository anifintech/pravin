const REVIEWS = [
  { author: 'Ramesh Kumar', rating: 5, text: 'Excellent service! Technician arrived within an hour and fixed my LG washing machine quickly. Very professional and transparent pricing.' },
  { author: 'Priya Suresh', rating: 5, text: 'My Samsung refrigerator stopped cooling. FixIt Chennai technician came the same day, refilled the gas and it works perfectly now. Highly recommend!' },
  { author: 'Karthik Venkat', rating: 5, text: 'AC was not cooling at all. They repaired the compressor and refilled the gas same day. Very reasonable price. Will use again.' },
  { author: 'Deepa Rajendran', rating: 5, text: 'IFB washing machine was leaking. Technician diagnosed and fixed it in under 2 hours. Genuine parts used. Great service.' },
  { author: 'Suresh Babu', rating: 4, text: 'Good and prompt service for my TV repair. Technician was knowledgeable and fixed the backlight issue the same day.' },
  { author: 'Anitha Krishnan', rating: 5, text: 'Bosch dishwasher repair done at my doorstep in Anna Nagar. Very happy with the quick response and quality of work.' },
]

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'FixIt Chennai',
    description:
      'Expert doorstep appliance repair in Chennai — AC, washing machine, refrigerator, TV, microwave & dishwasher. Certified technicians, genuine spare parts, same-day service.',
    url: 'https://www.fixitchennai.in',
    telephone: '+91-95000-93757',
    image: 'https://www.fixitchennai.in/og-image.jpg',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chennai',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.0827,
      longitude: 80.2707,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '21:00',
    },
    areaServed: [
      'Anna Nagar', 'Adyar', 'Velachery', 'T. Nagar', 'OMR', 'Tambaram',
      'Porur', 'Chromepet', 'Guindy', 'Mylapore', 'Nungambakkam', 'Besant Nagar',
      'Sholinganallur', 'Perungudi', 'Pallavaram', 'Medavakkam', 'Perambur',
      'Egmore', 'Royapettah', 'Kovilambakkam', 'Thoraipakkam', 'Navalur',
      'Ambattur', 'Avadi', 'Poonamallee', 'Mogappair', 'Virugambakkam',
    ].map((area) => ({ '@type': 'City', name: area + ', Chennai' })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '1247',
    },
    review: REVIEWS.map(r => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.text,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Home Appliance Repair Services Chennai',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Washing Machine Repair Chennai',
            description: 'Front load, top load and semi-automatic washing machine repair at your doorstep in Chennai.',
            url: 'https://www.fixitchennai.in/services/washing-machine',
          },
          price: '299',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Refrigerator Repair Chennai',
            description: 'Single door, double door and side-by-side refrigerator repair including gas refilling in Chennai.',
            url: 'https://www.fixitchennai.in/services/refrigerator',
          },
          price: '399',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Dishwasher Repair Chennai',
            description: 'All brand dishwasher repair including Bosch, IFB, Siemens in Chennai.',
            url: 'https://www.fixitchennai.in/services/dishwasher',
          },
          price: '499',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AC Repair Chennai',
            description: 'Split AC, window AC repair, gas refilling & installation in Chennai. All brands — LG, Samsung, Daikin, Voltas, Blue Star.',
            url: 'https://www.fixitchennai.in/services/ac-repair',
          },
          price: '399',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'TV Repair Chennai',
            description: 'LED, LCD & Smart TV repair at doorstep in Chennai. Samsung, LG, Sony, OnePlus all brands serviced.',
            url: 'https://www.fixitchennai.in/services/tv-repair',
          },
          price: '499',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Microwave Oven Repair Chennai',
            description: 'Microwave oven repair for all brands at doorstep in Chennai. Solo, grill & convection models serviced.',
            url: 'https://www.fixitchennai.in/services/microwave-repair',
          },
          price: '299',
          priceCurrency: 'INR',
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ServiceJsonLd({
  name,
  description,
  url,
  price,
  faq,
}: {
  name: string
  description: string
  url: string
  price: string
  faq: { q: string; a: string }[]
}) {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'LocalBusiness',
      name: 'FixIt Chennai',
      telephone: '+91-95000-93757',
      address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
    },
    areaServed: { '@type': 'City', name: 'Chennai' },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'INR',
      description: 'Starting price. Exact quote given after free on-site diagnosis.',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '1247',
    },
    review: REVIEWS.map(r => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.text,
    })),
  }

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </>
  )
}
