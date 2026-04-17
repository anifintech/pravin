'use client'

import { useState, useEffect, useCallback } from 'react'
import { Phone, Clock, CheckCircle, XCircle, Calendar, MapPin, Search, Filter, Loader2, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Lead, LeadStatus } from '@/types'

const statusConfig: Record<LeadStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  new: { label: 'New', color: 'text-orange-700', bg: 'bg-orange-100', icon: Clock },
  contacted: { label: 'Contacted', color: 'text-blue-700', bg: 'bg-blue-100', icon: Phone },
  scheduled: { label: 'Scheduled', color: 'text-purple-700', bg: 'bg-purple-100', icon: Calendar },
  completed: { label: 'Completed', color: 'text-green-700', bg: 'bg-green-100', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-slate-500', bg: 'bg-slate-100', icon: XCircle },
}

const serviceLabels: Record<string, string> = {
  'washing-machine': '🫧 Washing Machine',
  'refrigerator': '🧊 Refrigerator',
  'dishwasher': '🍽️ Dishwasher',
  'other': '🔧 Other',
}

const statusOptions: Array<{ value: string; label: string }> = [
  { value: '', label: 'All Status' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')
  const [search, setSearch] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const url = filterStatus ? `/api/leads?status=${filterStatus}&limit=100` : '/api/leads?limit=100'
      const res = await fetch(url)
      const data = await res.json()
      setLeads(data.leads || [])
    } catch {
      toast.error('Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }, [filterStatus])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const updateStatus = async (id: string, status: LeadStatus) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l))
      if (selectedLead?.id === id) setSelectedLead((prev) => prev ? { ...prev, status } : null)
      toast.success(`Status updated to ${status}`)
    } catch {
      toast.error('Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = leads.filter((l) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      l.name.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.area.toLowerCase().includes(q) ||
      l.issue_description.toLowerCase().includes(q)
    )
  })

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Leads</h2>
          <p className="text-slate-500 text-sm mt-0.5">{filtered.length} leads</p>
        </div>
        <button
          onClick={fetchLeads}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, area..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-blue-400 focus:outline-none bg-white"
          >
            {statusOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No leads found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Customer', 'Service', 'Area', 'Date', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-5 py-3.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((lead) => {
                  const sc = statusConfig[lead.status]
                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900 text-sm">{lead.name}</p>
                        <a
                          href={`tel:${lead.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 mt-0.5"
                        >
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-700">{serviceLabels[lead.service_type]}</p>
                        {lead.appliance_brand && (
                          <p className="text-xs text-slate-400 mt-0.5">{lead.appliance_brand}</p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {lead.area}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs text-slate-500">{formatDate(lead.created_at)}</p>
                        {lead.preferred_date && (
                          <p className="text-xs text-blue-600 mt-0.5">Pref: {lead.preferred_date}</p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${sc.bg} ${sc.color}`}>
                          <sc.icon className="w-3 h-3" />
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                          disabled={updatingId === lead.id}
                          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:border-blue-400 focus:outline-none disabled:opacity-50"
                        >
                          {(Object.keys(statusConfig) as LeadStatus[]).map((s) => (
                            <option key={s} value={s}>{statusConfig[s].label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead detail modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-lg">Lead Details</h3>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600 text-2xl font-light leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Customer Name</p>
                  <p className="font-bold text-slate-900">{selectedLead.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Phone</p>
                  <a href={`tel:${selectedLead.phone}`} className="font-bold text-blue-600">{selectedLead.phone}</a>
                </div>
                {selectedLead.email && (
                  <div className="col-span-2">
                    <p className="text-xs text-slate-500 font-medium mb-1">Email</p>
                    <p className="font-medium text-slate-800">{selectedLead.email}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Service</p>
                  <p className="font-medium text-slate-800">{serviceLabels[selectedLead.service_type]}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Brand</p>
                  <p className="font-medium text-slate-800">{selectedLead.appliance_brand || '—'}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Issue Description</p>
                <p className="text-slate-800 text-sm leading-relaxed bg-slate-50 rounded-xl p-3">{selectedLead.issue_description}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Address</p>
                <p className="text-slate-800 text-sm">{selectedLead.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Area</p>
                  <p className="font-medium text-slate-800">{selectedLead.area}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Preferred Date</p>
                  <p className="font-medium text-slate-800">{selectedLead.preferred_date || 'Any day'}</p>
                </div>
              </div>
              {selectedLead.preferred_time && (
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">Preferred Time</p>
                  <p className="font-medium text-slate-800">{selectedLead.preferred_time}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-slate-500 font-medium mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(statusConfig) as LeadStatus[]).map((s) => {
                    const sc = statusConfig[s]
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(selectedLead.id, s)}
                        disabled={selectedLead.status === s || updatingId === selectedLead.id}
                        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border-2 transition-all disabled:opacity-50 ${
                          selectedLead.status === s
                            ? `${sc.bg} ${sc.color} border-current`
                            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                        }`}
                      >
                        <sc.icon className="w-3.5 h-3.5" />
                        {sc.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
