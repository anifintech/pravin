'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Check, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Category { id: string; name: string; slug: string; icon: string; description: string; active: boolean }

const EMOJI_OPTIONS = ['🫧','🧊','🍽️','📺','❄️','🌀','🔥','🍳','🧹','💨','🔌','🖨️','🎵','💡','🔧']

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', slug: '', icon: '🔧', description: '' })
  const [adding, setAdding] = useState(false)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/categories')
    const data = await res.json()
    setCategories(data.categories || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    setForm(f => ({ ...f, name, slug }))
  }

  const add = async () => {
    if (!form.name.trim() || !form.slug.trim()) return toast.error('Name is required')
    setAdding(true)
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      toast.success(`${form.name} added!`)
      setForm({ name: '', slug: '', icon: '🔧', description: '' })
      setShowForm(false)
      load()
    } else {
      const err = await res.json()
      toast.error(err.error || 'Failed to add')
    }
    setAdding(false)
  }

  const toggle = async (id: string, active: boolean) => {
    await fetch('/api/admin/categories', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, active: !active }),
    })
    setCategories(prev => prev.map(c => c.id === id ? { ...c, active: !active } : c))
  }

  const remove = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}" and all its brands? This cannot be undone.`)) return
    await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' })
    toast.success(`${name} deleted`)
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Appliance Categories</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Add new appliance types (TV, AC, Microwave…). Each gets its own brands in the booking form.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
          <h3 className="font-bold text-slate-900 text-sm mb-4">New Appliance Category</h3>

          {/* Icon picker */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Pick Icon</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map(e => (
                <button
                  key={e}
                  onClick={() => setForm(f => ({ ...f, icon: e }))}
                  className={`w-10 h-10 text-xl rounded-xl border-2 transition-all ${form.icon === e ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Category Name *</label>
              <input
                value={form.name}
                onChange={e => handleNameChange(e.target.value)}
                placeholder="e.g. Television, Air Conditioner"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Slug (auto)</label>
              <input
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                placeholder="television"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Short Description</label>
            <input
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="e.g. All screen sizes & smart TVs"
              className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Preview */}
          <div className="bg-slate-50 rounded-xl p-3 mb-4 flex items-center gap-3">
            <span className="text-3xl">{form.icon}</span>
            <div>
              <p className="font-bold text-slate-900 text-sm">{form.name || 'Category Name'}</p>
              <p className="text-xs text-slate-500">{form.description || 'Description'}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-slate-300 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={add}
              disabled={adding || !form.name.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
            >
              {adding ? 'Adding...' : `Add ${form.icon} ${form.name || 'Category'}`}
            </button>
          </div>
        </div>
      )}

      {/* Categories list */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">All Categories ({categories.length})</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {categories.map(cat => (
              <li key={cat.id} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors">
                <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm ${cat.active ? 'text-slate-900' : 'text-slate-400'}`}>{cat.name}</p>
                  <p className="text-xs text-slate-400 truncate">{cat.description || cat.slug}</p>
                </div>

                <Link
                  href={`/admin/appliances?category=${cat.slug}`}
                  className="flex items-center gap-1 text-xs text-blue-600 font-bold hover:underline flex-shrink-0"
                >
                  Brands <ArrowRight className="w-3 h-3" />
                </Link>

                <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${cat.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {cat.active ? 'Active' : 'Hidden'}
                </span>

                <button
                  onClick={() => toggle(cat.id, cat.active)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${cat.active ? 'bg-green-100 hover:bg-green-200 text-green-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-500'}`}
                >
                  {cat.active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => remove(cat.id, cat.name)}
                  className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-xs text-slate-400">
        After adding a category, go to <strong>Appliances</strong> to add brands for it. It will immediately appear in the booking form.
      </p>
    </div>
  )
}
