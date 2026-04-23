'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface Appliance { id: string; category: string; brand: string; active: boolean }

const CATEGORIES = [
  { value: 'washing-machine', label: '🫧 Washing Machine' },
  { value: 'refrigerator',    label: '🧊 Refrigerator' },
  { value: 'dishwasher',      label: '🍽️ Dishwasher' },
]

export default function AppliancesPage() {
  const [appliances, setAppliances] = useState<Appliance[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('washing-machine')
  const [newBrand, setNewBrand] = useState('')
  const [adding, setAdding] = useState(false)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/appliances')
    const data = await res.json()
    setAppliances(data.appliances || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const filtered = appliances.filter(a => a.category === activeTab)

  const add = async () => {
    if (!newBrand.trim()) return
    setAdding(true)
    const res = await fetch('/api/admin/appliances', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: activeTab, brand: newBrand.trim() }),
    })
    if (res.ok) {
      toast.success(`${newBrand} added!`)
      setNewBrand('')
      load()
    } else {
      toast.error('Failed to add')
    }
    setAdding(false)
  }

  const toggle = async (id: string, active: boolean) => {
    await fetch('/api/admin/appliances', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, active: !active }),
    })
    setAppliances(prev => prev.map(a => a.id === id ? { ...a, active: !active } : a))
  }

  const remove = async (id: string, brand: string) => {
    if (!confirm(`Delete "${brand}"?`)) return
    await fetch(`/api/admin/appliances?id=${id}`, { method: 'DELETE' })
    toast.success(`${brand} removed`)
    setAppliances(prev => prev.filter(a => a.id !== id))
  }

  const activeLabel = CATEGORIES.find(c => c.value === activeTab)?.label

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Manage Appliances</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          Brands shown in the booking form when customer selects an appliance type.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActiveTab(cat.value)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === cat.value
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Add brand */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-900 text-sm mb-3">
          Add Brand to {activeLabel}
        </h3>
        <div className="flex gap-2">
          <input
            value={newBrand}
            onChange={e => setNewBrand(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="e.g. Blue Star, Videocon..."
            className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={add}
            disabled={adding || !newBrand.trim()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">
            {activeLabel} Brands ({filtered.length})
          </h3>
          <span className="text-xs text-slate-400">Toggle to show/hide in booking form</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {filtered.map(a => (
              <li key={a.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <span className={`flex-1 font-semibold text-sm ${a.active ? 'text-slate-900' : 'text-slate-400 line-through'}`}>
                  {a.brand}
                </span>

                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {a.active ? 'Visible' : 'Hidden'}
                </span>

                <button
                  onClick={() => toggle(a.id, a.active)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    a.active ? 'bg-green-100 hover:bg-green-200 text-green-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                  }`}
                  title={a.active ? 'Hide' : 'Show'}
                >
                  {a.active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => remove(a.id, a.brand)}
                  className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="p-8 text-center text-slate-400 text-sm">No brands yet. Add one above.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
