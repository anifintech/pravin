import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET() {
  const supabase = getSupabaseClient()
  const { data: brands } = await supabase
    .from('brands')
    .select('*')
    .order('sort_order', { ascending: true })
  return NextResponse.json({ brands: brands || [] })
}

export async function POST(req: NextRequest) {
  const { name } = await req.json()
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 })
  const supabase = getSupabaseClient()
  const { data: existing } = await supabase.from('brands').select('sort_order').order('sort_order', { ascending: false }).limit(1)
  const sort_order = existing && existing.length > 0 ? existing[0].sort_order + 1 : 1
  const { data, error } = await supabase.from('brands').insert({ name, sort_order }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ brand: data })
}

export async function PATCH(req: NextRequest) {
  const { id, active } = await req.json()
  const supabase = getSupabaseClient()
  await supabase.from('brands').update({ active }).eq('id', id)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  const supabase = getSupabaseClient()
  await supabase.from('brands').delete().eq('id', id)
  return NextResponse.json({ ok: true })
}
