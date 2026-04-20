import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const siteUrl = 'https://fixitchennai.in'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'FixIt Chennai – Washing Machine & Fridge Repair Chennai | Same Day',
    template: '%s | FixIt Chennai',
  },
  description:
    'Trusted doorstep washing machine, refrigerator & dishwasher repair in Chennai. Certified technicians, genuine parts, transparent pricing. Call +91 95000 93757 — same-day service 8AM to 9PM.',
  keywords: [
    'washing machine repair Chennai',
    'refrigerator repair Chennai',
    'fridge repair Chennai',
    'dishwasher repair Chennai',
    'appliance repair Chennai',
    'washing machine service Chennai',
    'doorstep appliance repair Chennai',
    'home appliance repair Chennai',
    'washing machine repair near me',
    'LG washing machine repair Chennai',
    'Samsung washing machine repair Chennai',
    'Whirlpool washing machine repair Chennai',
    'IFB washing machine repair Chennai',
    'Bosch dishwasher repair Chennai',
    'washing machine repair Anna Nagar',
    'washing machine repair Adyar',
    'washing machine repair OMR',
    'washing machine repair Velachery',
    'fridge not cooling Chennai',
    'washing machine not working Chennai',
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
    title: 'FixIt Chennai – Washing Machine & Fridge Repair Chennai | Same Day',
    description:
      'Certified doorstep appliance repair in Chennai. Washing machines, fridges & dishwashers fixed same day. 5,000+ happy customers.',
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
      </body>
    </html>
  )
}
