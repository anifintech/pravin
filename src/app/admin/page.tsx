import Link from 'next/link'
import { Users, CheckCircle, Clock, Phone, TrendingUp, ArrowRight, BarChart2, MapPin, Activity } from 'lucide-react'
import { createServiceRoleClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const supabase = createServiceRoleClient()
    const { data: leads } = await supabase
      .from('leads')
      .select('status, created_at, service_type, area')

    if (!leads) return null

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const byService: Record<string, number> = {}
    const byArea: Record<string, number> = {}
    leads.forEach((l) => {
      byService[l.service_type] = (byService[l.service_type] || 0) + 1
      if (l.area) byArea[l.area] = (byArea[l.area] || 0) + 1
    })

    const last7days = [...Array(7)].map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      d.setHours(0, 0, 0, 0)
      const next = new Date(d)
      next.setDate(next.getDate() + 1)
      return {
        label: d.toLocaleDateString('en-IN', { weekday: 'short' }),
        count: leads.filter((l) => {
          const ld = new Date(l.created_at)
          return ld >= d && ld < next
        }).length,
      }
    })

    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - 7)
    const prevWeekStart = new Date()
    prevWeekStart.setDate(prevWeekStart.getDate() - 14)
    const thisWeek = leads.filter((l) => new Date(l.created_at) >= weekStart).length
    const lastWeek = leads.filter((l) => {
      const d = new Date(l.created_at)
      return d >= prevWeekStart && d < weekStart
    }).length

    return {
      total: leads.length,
      new: leads.filter((l) => l.status === 'new').length,
      contacted: leads.filter((l) => l.status === 'contacted').length,
      completed: leads.filter((l) => l.status === 'completed').length,
      todayCount: leads.filter((l) => new Date(l.created_at) >= today).length,
      byService,
      byArea: Object.entries(byArea).sort((a, b) => b[1] - a[1]).slice(0, 8),
      last7days,
      thisWeek,
      lastWeek,
      weekChange: lastWeek > 0 ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) : 0,
    }
  } catch {
    return null
  }
}

const serviceLabels: Record<string, string> = {
  'washing-machine': '🫧 Washing Machine',
  refrigerator: '🧊 Refrigerator',
  dishwasher: '🍽️ Dishwasher',
  other: '🔧 Other',
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const maxDay = stats ? Math.max(...stats.last7days.map((d) => d.count), 1) : 1

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        Unable to load data. Check Supabase connection.
      </div>
    )
  }

  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, color: 'bg-blue-500', sub: 'All time' },
    { label: 'New Leads', value: stats.new, icon: Clock, color: 'bg-orange-500', sub: 'Needs call' },
    { label: 'Contacted', value: stats.contacted, icon: Phone, color: 'bg-purple-500', sub: 'In progress' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'bg-green-500', sub: 'Jobs done' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Dashboard</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Today: <span className="font-bold text-blue-600">{stats.todayCount} leads</span>
            {' · '}This week: <span className="font-bold text-slate-800">{stats.thisWeek}</span>
            {stats.lastWeek > 0 && (
              <span className={`ml-1 text-xs font-bold ${stats.weekChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                ({stats.weekChange >= 0 ? '+' : ''}{stats.weekChange}% vs last week)
              </span>
            )}
          </p>
        </div>
        <Link
          href="/admin/leads"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
        >
          View All Leads <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-slate-500">{stat.sub}</span>
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 7-day bar chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-black text-slate-900 text-base mb-5 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          Leads — Last 7 Days
        </h3>
        <div className="flex items-end gap-2 h-28">
          {stats.last7days.map((day, i) => {
            const heightPct = Math.round((day.count / maxDay) * 100)
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-slate-700">{day.count > 0 ? day.count : ''}</span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all"
                  style={{ height: `${Math.max(heightPct, day.count > 0 ? 8 : 2)}%` }}
                />
                <span className="text-xs text-slate-500">{day.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 text-base mb-5 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Leads by Service
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.byService).map(([type, count]) => {
              const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0
              return (
                <div key={type}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-slate-700">{serviceLabels[type] || type}</span>
                    <span className="font-black text-slate-900">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
            {Object.keys(stats.byService).length === 0 && (
              <p className="text-slate-400 text-sm text-center py-4">No leads yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 text-base mb-5 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" />
            Top Areas
          </h3>
          <div className="space-y-2">
            {stats.byArea.map(([area, count]) => {
              const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0
              return (
                <div key={area} className="flex items-center justify-between text-sm py-1">
                  <span className="text-slate-700 font-medium truncate mr-3">{area}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-black text-slate-900 w-5 text-right">{count}</span>
                  </div>
                </div>
              )
            })}
            {stats.byArea.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-4">No area data yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 text-base mb-2 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-500" />
            Website Analytics
          </h3>
          <p className="text-slate-500 text-xs mb-4">Page view & visitor data</p>
          <div className="space-y-3">
            <a
              href="https://vercel.com/analytics"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
            >
              <span className="text-sm font-bold text-purple-900">Vercel Analytics Dashboard</span>
              <ArrowRight className="w-4 h-4 text-purple-500" />
            </a>
            <a
              href="https://search.google.com/search-console"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              <span className="text-sm font-bold text-blue-900">Google Search Console</span>
              <ArrowRight className="w-4 h-4 text-blue-500" />
            </a>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submit <strong>saiservice.in/sitemap.xml</strong> in Google Search Console to track Chennai keyword rankings.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 text-base mb-5">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/admin/leads?status=new"
              className="flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">New Leads</p>
                  <p className="text-xs text-slate-500">Needs to be called</p>
                </div>
              </div>
              <span className="bg-orange-500 text-white text-xs font-black px-2.5 py-1 rounded-full">{stats.new}</span>
            </Link>
            <Link
              href="/admin/leads"
              className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">All Leads</p>
                  <p className="text-xs text-slate-500">View & manage all bookings</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
