import Link from 'next/link'
import { Users, CheckCircle, Clock, Phone, TrendingUp, ArrowRight } from 'lucide-react'
import { createServiceRoleClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const supabase = createServiceRoleClient()
    const { data: leads } = await supabase.from('leads').select('status, created_at, service_type')

    if (!leads) return { total: 0, new: 0, contacted: 0, completed: 0, byService: {} }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const byService: Record<string, number> = {}
    leads.forEach((l) => {
      byService[l.service_type] = (byService[l.service_type] || 0) + 1
    })

    return {
      total: leads.length,
      new: leads.filter((l) => l.status === 'new').length,
      contacted: leads.filter((l) => l.status === 'contacted').length,
      completed: leads.filter((l) => l.status === 'completed').length,
      todayCount: leads.filter((l) => new Date(l.created_at) >= today).length,
      byService,
    }
  } catch {
    return { total: 0, new: 0, contacted: 0, completed: 0, todayCount: 0, byService: {} }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, color: 'bg-blue-500', change: 'All time' },
    { label: 'New Leads', value: stats.new, icon: Clock, color: 'bg-orange-500', change: 'Need attention' },
    { label: 'Contacted', value: stats.contacted, icon: Phone, color: 'bg-purple-500', change: 'In progress' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'bg-green-500', change: 'Jobs done' },
  ]

  const serviceLabels: Record<string, string> = {
    'washing-machine': '🫧 Washing Machine',
    'refrigerator': '🧊 Refrigerator',
    'dishwasher': '🍽️ Dishwasher',
    'other': '🔧 Other',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Dashboard</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Today's leads: <span className="font-bold text-blue-600">{stats.todayCount || 0}</span>
          </p>
        </div>
        <Link
          href="/admin/leads"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
        >
          View All Leads
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-slate-500">{stat.change}</span>
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* By service type */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 text-base mb-5 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Leads by Service Type
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.byService || {}).map(([type, count]) => {
              const pct = stats.total > 0 ? Math.round((count as number / stats.total) * 100) : 0
              return (
                <div key={type}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-slate-700">{serviceLabels[type] || type}</span>
                    <span className="font-black text-slate-900">{count as number} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
            {Object.keys(stats.byService || {}).length === 0 && (
              <p className="text-slate-400 text-sm text-center py-4">No leads yet</p>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 text-base mb-5">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/admin/leads?status=new"
              className="flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors group"
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
