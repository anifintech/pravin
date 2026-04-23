import { Eye, TrendingUp, Globe, ArrowRight, Users } from 'lucide-react'
import { createServiceRoleClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const PAGE_LABELS: Record<string, string> = {
  '/': '🏠 Home',
  '/booking': '📅 Booking',
  '/services/washing-machine': '🫧 Washing Machine',
  '/services/refrigerator': '🧊 Refrigerator',
  '/services/dishwasher': '🍽️ Dishwasher',
}

async function getAnalytics() {
  try {
    const supabase = createServiceRoleClient()
    const { data: views } = await supabase
      .from('page_views')
      .select('path, referrer, created_at')
      .order('created_at', { ascending: false })

    if (!views) return null

    const now = new Date()
    const todayStart = new Date(now); todayStart.setHours(0,0,0,0)
    const weekStart = new Date(now); weekStart.setDate(now.getDate() - 7)
    const monthStart = new Date(now); monthStart.setDate(now.getDate() - 30)

    const todayViews   = views.filter(v => new Date(v.created_at) >= todayStart).length
    const weekViews    = views.filter(v => new Date(v.created_at) >= weekStart).length
    const monthViews   = views.filter(v => new Date(v.created_at) >= monthStart).length
    const totalViews   = views.length

    // Last 14 days daily chart
    const last14 = [...Array(14)].map((_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (13 - i)); d.setHours(0,0,0,0)
      const next = new Date(d); next.setDate(next.getDate() + 1)
      return {
        label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        count: views.filter(v => { const t = new Date(v.created_at); return t >= d && t < next }).length,
      }
    })

    // By page
    const byPage: Record<string, number> = {}
    views.forEach(v => { byPage[v.path] = (byPage[v.path] || 0) + 1 })
    const topPages = Object.entries(byPage).sort((a, b) => b[1] - a[1]).slice(0, 8)

    // By referrer
    const byRef: Record<string, number> = {}
    views.forEach(v => {
      const ref = v.referrer ? new URL(v.referrer).hostname.replace('www.','') : 'Direct'
      byRef[ref] = (byRef[ref] || 0) + 1
    })
    const topRefs = Object.entries(byRef).sort((a, b) => b[1] - a[1]).slice(0, 6)

    // Recent 20 visits
    const recent = views.slice(0, 20)

    return { totalViews, todayViews, weekViews, monthViews, last14, topPages, topRefs, recent }
  } catch {
    return null
  }
}

export default async function AnalyticsPage() {
  const data = await getAnalytics()

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        Unable to load analytics. Check Supabase connection.
      </div>
    )
  }

  const maxDay = Math.max(...data.last14.map(d => d.count), 1)

  const statCards = [
    { label: 'Today',      value: data.todayViews,  icon: Eye,        color: 'bg-blue-500' },
    { label: 'This Week',  value: data.weekViews,   icon: TrendingUp, color: 'bg-orange-500' },
    { label: 'This Month', value: data.monthViews,  icon: Users,      color: 'bg-purple-500' },
    { label: 'All Time',   value: data.totalViews,  icon: Globe,      color: 'bg-green-500' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Website Visitors</h2>
        <p className="text-slate-500 text-sm mt-0.5">Real-time page view tracking across all pages</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 14-day bar chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-black text-slate-900 text-base mb-5">Page Views — Last 14 Days</h3>
        <div className="flex items-end gap-1.5 h-32">
          {data.last14.map((day, i) => {
            const pct = Math.round((day.count / maxDay) * 100)
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                {/* Tooltip */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {day.count} views
                </div>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 transition-all"
                  style={{ height: `${Math.max(pct, day.count > 0 ? 6 : 2)}%` }}
                />
                <span className="text-xs text-slate-400 hidden sm:block" style={{ fontSize: '10px' }}>{day.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top pages */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 text-base mb-5 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Most Visited Pages
          </h3>
          <div className="space-y-3">
            {data.topPages.map(([path, count]) => {
              const pct = data.totalViews > 0 ? Math.round((count / data.totalViews) * 100) : 0
              return (
                <div key={path}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700 truncate mr-2">
                      {PAGE_LABELS[path] || path}
                    </span>
                    <span className="font-black text-slate-900 flex-shrink-0">{count} <span className="text-slate-400 font-normal">({pct}%)</span></span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
            {data.topPages.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-6">No visits recorded yet</p>
            )}
          </div>
        </div>

        {/* Traffic sources */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 text-base mb-5 flex items-center gap-2">
            <Globe className="w-5 h-5 text-orange-500" />
            Traffic Sources
          </h3>
          <div className="space-y-3">
            {data.topRefs.map(([ref, count]) => {
              const pct = data.totalViews > 0 ? Math.round((count / data.totalViews) * 100) : 0
              return (
                <div key={ref} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="text-sm text-slate-700 font-medium">{ref}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm font-black text-slate-900 w-8 text-right">{count}</span>
                  </div>
                </div>
              )
            })}
            {data.topRefs.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-6">No visits recorded yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent visits */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-black text-slate-900 text-base mb-5">Recent Visits</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wide pb-3">Page</th>
                <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wide pb-3">Source</th>
                <th className="text-right text-xs font-bold text-slate-500 uppercase tracking-wide pb-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.recent.map((v, i) => {
                let ref = 'Direct'
                try { if (v.referrer) ref = new URL(v.referrer).hostname.replace('www.','') } catch {}
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-medium text-slate-800">
                      {PAGE_LABELS[v.path] || v.path}
                    </td>
                    <td className="py-2.5 text-slate-500">{ref}</td>
                    <td className="py-2.5 text-slate-400 text-right text-xs">
                      {new Date(v.created_at).toLocaleString('en-IN', {
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                  </tr>
                )
              })}
              {data.recent.length === 0 && (
                <tr><td colSpan={3} className="py-8 text-center text-slate-400">No visits yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
