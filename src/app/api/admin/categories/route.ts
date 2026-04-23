import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET() {
  const supabase = getSupabaseClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order')
  return NextResponse.json({ categories: data || [] })
}

export async function POST(req: NextRequest) {
  const { name, slug, icon, description } = await req.json()
  if (!name || !slug) return NextResponse.json({ error: 'Name and slug required' }, { status: 400 })
  const supabase = getSupabaseClient()
  const { data: last } = await supabase.from('categories').select('sort_order').order('sort_order', { ascending: false }).limit(1)
  const sort_order = last && last.length > 0 ? last[0].sort_order + 1 : 1
  const { data, error } = await supabase
    .from('categories')
    .insert({ name, slug, icon: icon || '🔧', description: description || '', sort_order })
    .select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ category: data })
}

export async function PATCH(req: NextRequest) {
  const { id, active } = await req.json()
  const supabase = getSupabaseClient()
  await supabase.from('categories').update({ active }).eq('id', id)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  const supabase = getSupabaseClient()
  // Also delete all appliances in this category
  const { data: cat } = await supabase.from('categories').select('slug').eq('id', id).single()
  if (cat) await supabase.from('appliances').delete().eq('category', cat.slug)
  await supabase.from('categories').delete().eq('id', id)
  return NextResponse.json({ ok: true })
}
