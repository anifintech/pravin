import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://saiservice.in'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/booking`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/washing-machine`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/refrigerator`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/dishwasher`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
