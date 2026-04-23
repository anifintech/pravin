import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { path, referrer } = await req.json()
    if (!path) return NextResponse.json({ ok: false }, { status: 400 })

    // Skip admin and API paths
    if (path.startsWith('/admin') || path.startsWith('/api')) {
      return NextResponse.json({ ok: true })
    }

    const supabase = getSupabaseClient()
    await supabase.from('page_views').insert({ path, referrer: referrer || null })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
