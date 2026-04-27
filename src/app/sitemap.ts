import { MetadataRoute } from 'next'

const AREA_SLUGS = [
  'anna-nagar','adyar','velachery','tambaram','porur','chromepet','omr','perungudi',
  't-nagar','mylapore','nungambakkam','guindy','besant-nagar','sholinganallur',
  'pallavaram','medavakkam','kovilambakkam','perambur','egmore','royapettah',
  'mogappair','ambattur','avadi','poonamallee','thoraipakkam','navalur',
  'virugambakkam','kk-nagar','ashok-nagar','kodambakkam','vadapalani',
  'valasaravakkam','nanganallur','madipakkam','periyar-nagar','villivakkam',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.fixitchennai.in'
  const now = new Date()

  const servicePages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/booking`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/ac-repair`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/services/washing-machine`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/refrigerator`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/tv-repair`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/services/microwave-repair`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services/dishwasher`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const areaPages: MetadataRoute.Sitemap = AREA_SLUGS.map((slug) => ({
    url: `${base}/areas/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...servicePages, ...areaPages]
}
