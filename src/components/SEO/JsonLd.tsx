export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Sai Service',
    description:
      'Expert doorstep washing machine, refrigerator and dishwasher repair in Chennai. Certified technicians, genuine spare parts, same-day service.',
    url: 'https://saiservice.in',
    telephone: '+91-98765-43210',
    image: 'https://saiservice.in/og-image.jpg',
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
      'Sholinganallur', 'Perungudi', 'Pallavaram', 'Medavakkam',
    ].map((area) => ({ '@type': 'City', name: area + ', Chennai' })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      reviewCount: '5000',
    },
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
            url: 'https://saiservice.in/services/washing-machine',
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
            url: 'https://saiservice.in/services/refrigerator',
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
            url: 'https://saiservice.in/services/dishwasher',
          },
          price: '499',
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
      name: 'Sai Service',
      telephone: '+91-98765-43210',
      address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
    },
    areaServed: { '@type': 'City', name: 'Chennai' },
    offers: { '@type': 'Offer', price, priceCurrency: 'INR', description: 'Starting price. Exact quote given after diagnosis.' },
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
