import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import PageTracker from '@/components/ui/PageTracker'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const siteUrl = 'https://www.fixitchennai.in'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'FixIt Chennai – AC, Washing Machine & Fridge Repair Chennai | Same Day',
    template: '%s | FixIt Chennai',
  },
  description:
    'Trusted doorstep washing machine, refrigerator & dishwasher repair in Chennai. Certified technicians, genuine parts, transparent pricing. Call +91 95000 93757 — same-day service 8AM to 9PM.',
  keywords: [
    // Core services
    'appliance repair Chennai',
    'home appliance repair Chennai',
    'doorstep appliance repair Chennai',
    'appliance repair near me Chennai',
    'appliance service center Chennai',
    // Washing machine
    'washing machine repair Chennai',
    'washing machine service Chennai',
    'washing machine repair near me',
    'washing machine not working Chennai',
    'front load washing machine repair Chennai',
    'top load washing machine repair Chennai',
    'semi automatic washing machine repair Chennai',
    'LG washing machine repair Chennai',
    'Samsung washing machine repair Chennai',
    'Whirlpool washing machine repair Chennai',
    'IFB washing machine repair Chennai',
    'Godrej washing machine repair Chennai',
    // Refrigerator
    'refrigerator repair Chennai',
    'fridge repair Chennai',
    'fridge not cooling Chennai',
    'refrigerator gas refilling Chennai',
    'fridge compressor repair Chennai',
    'double door fridge repair Chennai',
    'Samsung fridge repair Chennai',
    'LG refrigerator repair Chennai',
    'Whirlpool fridge repair Chennai',
    // AC repair - high volume
    'AC repair Chennai',
    'air conditioner repair Chennai',
    'AC service Chennai',
    'AC not cooling Chennai',
    'split AC repair Chennai',
    'window AC repair Chennai',
    'AC gas refilling Chennai',
    'AC installation Chennai',
    'LG AC repair Chennai',
    'Samsung AC repair Chennai',
    'Daikin AC repair Chennai',
    'Voltas AC repair Chennai',
    'Blue Star AC repair Chennai',
    // TV repair
    'TV repair Chennai',
    'LED TV repair Chennai',
    'smart TV repair Chennai',
    'TV not turning on Chennai',
    'Samsung TV repair Chennai',
    'LG TV repair Chennai',
    'Sony TV repair Chennai',
    // Microwave & other
    'microwave repair Chennai',
    'microwave oven repair Chennai',
    'geyser repair Chennai',
    'water heater repair Chennai',
    // Dishwasher
    'dishwasher repair Chennai',
    'Bosch dishwasher repair Chennai',
    'IFB dishwasher repair Chennai',
    // Area-specific
    'appliance repair Anna Nagar',
    'appliance repair Adyar',
    'appliance repair Velachery',
    'appliance repair OMR',
    'appliance repair T Nagar',
    'appliance repair Tambaram',
    'appliance repair Porur',
    'appliance repair Chromepet',
    'washing machine repair Anna Nagar',
    'washing machine repair Velachery',
    'washing machine repair Tambaram',
    'fridge repair Adyar',
    'AC repair Anna Nagar',
    'AC repair OMR',
    'AC repair Velachery',
  ],
  authors: [{ name: 'FixIt Chennai' }],
  creator: 'FixIt Chennai',
  publisher: 'FixIt Chennai',
  formatDetection: { telephone: true, email: false },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'FixIt Chennai',
    title: 'FixIt Chennai – AC, Washing Machine & Fridge Repair Chennai | Same Day',
    description:
      'Certified doorstep appliance repair in Chennai. AC, washing machines, fridges, TVs & dishwashers fixed same day. 5,000+ happy customers.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'FixIt Chennai – Appliance Repair Chennai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FixIt Chennai – Appliance Repair Chennai',
    description: 'Same-day doorstep repair for washing machines, fridges & dishwashers in Chennai.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: 'google93a9dcc7b3f7af17' },
  other: {
    'geo.region': 'IN-TN',
    'geo.placename': 'Chennai',
    'geo.position': '13.0827;80.2707',
    ICBM: '13.0827, 80.2707',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { borderRadius: '12px', fontWeight: 600 },
            success: { style: { background: '#059669', color: 'white' } },
            error: { style: { background: '#dc2626', color: 'white' } },
          }}
        />
        <Analytics />
        <PageTracker />
      </body>
    </html>
  )
}
