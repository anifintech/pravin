import { getSupabaseClient } from '@/lib/supabase'

const FALLBACK_BRANDS = ['Samsung', 'LG', 'Whirlpool', 'IFB', 'Bosch', 'Godrej', 'Haier', 'Voltas']

async function getBrands(): Promise<string[]> {
  try {
    const supabase = getSupabaseClient()
    const { data } = await supabase
      .from('brands')
      .select('name')
      .eq('active', true)
      .order('sort_order', { ascending: true })
    return data && data.length > 0 ? data.map((b) => b.name) : FALLBACK_BRANDS
  } catch {
    return FALLBACK_BRANDS
  }
}

export default async function BrandsBar() {
  const brands = await getBrands()

  return (
    <div className="mt-16 pt-10 border-t border-white/10">
      <p className="text-center text-sm text-blue-300 font-medium mb-6">We Service All Major Brands</p>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
        {brands.map((brand) => (
          <span key={brand} className="text-white/60 font-bold text-sm hover:text-white transition-colors">
            {brand}
          </span>
        ))}
      </div>
    </div>
  )
}
