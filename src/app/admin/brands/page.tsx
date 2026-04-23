'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface Brand { id: string; name: string; active: boolean; sort_order: number }

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/brands')
    const data = await res.json()
    setBrands(data.brands || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const addBrand = async () => {
    if (!newName.trim()) return
    setAdding(true)
    const res = await fetch('/api/admin/brands', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim() }),
    })
    if (res.ok) {
      toast.success(`${newName} added!`)
      setNewName('')
      load()
    } else {
      toast.error('Failed to add brand')
    }
    setAdding(false)
  }

  const toggleBrand = async (id: string, active: boolean) => {
    await fetch('/api/admin/brands', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, active: !active }),
    })
    setBrands((prev) => prev.map((b) => b.id === id ? { ...b, active: !active } : b))
  }

  const deleteBrand = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return
    await fetch(`/api/admin/brands?id=${id}`, { method: 'DELETE' })
    toast.success(`${name} removed`)
    setBrands((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Manage Brands</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          These brands show on the homepage "We Service All Major Brands" section.
        </p>
      </div>

      {/* Add new brand */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-900 text-sm mb-3">Add New Brand</h3>
        <div className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addBrand()}
            placeholder="e.g. Panasonic, Siemens..."
            className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={addBrand}
            disabled={adding || !newName.trim()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Brands list */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">All Brands ({brands.length})</h3>
          <span className="text-xs text-slate-400">Toggle to show/hide on website</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {brands.map((brand) => (
              <li key={brand.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <GripVertical className="w-4 h-4 text-slate-300 flex-shrink-0" />

                <span className={`flex-1 font-semibold text-sm ${brand.active ? 'text-slate-900' : 'text-slate-400 line-through'}`}>
                  {brand.name}
                </span>

                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${brand.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {brand.active ? 'Visible' : 'Hidden'}
                </span>

                <button
                  onClick={() => toggleBrand(brand.id, brand.active)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${brand.active ? 'bg-green-100 hover:bg-green-200 text-green-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-500'}`}
                  title={brand.active ? 'Hide from website' : 'Show on website'}
                >
                  {brand.active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => deleteBrand(brand.id, brand.name)}
                  className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors"
                  title="Delete brand"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
            {brands.length === 0 && (
              <li className="p-8 text-center text-slate-400 text-sm">No brands yet. Add one above.</li>
            )}
          </ul>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Changes reflect on the website immediately after saving.
      </p>
    </div>
  )
}
