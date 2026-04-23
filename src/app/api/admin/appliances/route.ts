import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET() {
  const supabase = getSupabaseClient()
  const { data } = await supabase
    .from('appliances')
    .select('*')
    .order('category')
    .order('sort_order')
  return NextResponse.json({ appliances: data || [] })
}

export async function POST(req: NextRequest) {
  const { category, brand } = await req.json()
  if (!category || !brand) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const supabase = getSupabaseClient()
  const { data: last } = await supabase
    .from('appliances').select('sort_order')
    .eq('category', category).order('sort_order', { ascending: false }).limit(1)
  const sort_order = last && last.length > 0 ? last[0].sort_order + 1 : 1
  const { data, error } = await supabase.from('appliances').insert({ category, brand, sort_order }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ appliance: data })
}

export async function PATCH(req: NextRequest) {
  const { id, active } = await req.json()
  const supabase = getSupabaseClient()
  await supabase.from('appliances').update({ active }).eq('id', id)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  const supabase = getSupabaseClient()
  await supabase.from('appliances').delete().eq('id', id)
  return NextResponse.json({ ok: true })
}
