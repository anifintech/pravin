import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://fixitchennai.in'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/booking`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/ac-repair`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/services/washing-machine`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/refrigerator`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/tv-repair`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/services/microwave-repair`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services/dishwasher`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
