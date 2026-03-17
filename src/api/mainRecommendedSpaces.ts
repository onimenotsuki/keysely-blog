import { getSupabaseClient } from "../lib/supabase"
import type { Database } from "../supabase/types/database.types"

const DEFAULT_LAT = 20.6597 // Guadalajara, MX
const DEFAULT_LNG = -103.3496

type MainRecommendedSpaceRow =
  Database["public"]["Functions"]["get_main_recommended_spaces"]["Returns"][number]

export interface MainRecommendedSpace {
  id: string
  name: string
  location: string
  imageUrls: string[]
  averageRating: number | null
  reviewsCount: number
  distanceMeters: number | null
  isFavorited: boolean
  price: number | null
  currency: string | null
  description: string | null
  space_type_id: number | null
  area_sqm: number | null
}

interface FetchMainRecommendedSpacesParams {
  profileId?: string | null
  spaceCategoryId?: number | null
  lat?: number | null
  lng?: number | null
  limit?: number
  scoreWindow?: number
  maxDistanceKm?: number
}

export async function fetchMainRecommendedSpaces({
  profileId,
  spaceCategoryId,
  lat,
  lng,
  limit = 6,
  scoreWindow = 30,
  maxDistanceKm = 25,
}: FetchMainRecommendedSpacesParams): Promise<MainRecommendedSpace[]> {
  const usingDefaultCenter = lat == null || lng == null
  const effectiveLat = lat ?? DEFAULT_LAT
  const effectiveLng = lng ?? DEFAULT_LNG
  const effectiveMaxDistanceKm = usingDefaultCenter ? 500 : maxDistanceKm

  const supabase = getSupabaseClient()
  const { data, error } = await supabase.rpc("get_main_recommended_spaces", {
    p_profile_id: profileId ?? undefined,
    p_lat: effectiveLat,
    p_lng: effectiveLng,
    p_space_category_id: spaceCategoryId ?? undefined,
    p_limit: limit,
    p_score_window: scoreWindow,
    p_max_distance_km: effectiveMaxDistanceKm,
  })

  if (error) {
    throw error
  }

  const rows: MainRecommendedSpaceRow[] = data ?? []

  return rows.map((row) => {
    const raw = row as MainRecommendedSpaceRow & { area_sqm?: number | null }
    const areaSqm =
      raw.area_sqm != null && Number.isFinite(raw.area_sqm) ? (raw.area_sqm as number) : null

    return {
      id: row.space_id,
      name: row.name,
      location: row.location,
      imageUrls: Array.isArray(row.image_url) ? row.image_url : [],
      averageRating: row.average_rating ?? null,
      reviewsCount: row.reviews_count,
      distanceMeters:
        typeof row.distance_meters === "number" ? row.distance_meters : null,
      isFavorited: row.is_favorited === true,
      price: typeof row.price === "number" ? row.price : null,
      currency: typeof row.currency === "string" ? row.currency : null,
      description: row.description ?? null,
      space_type_id:
        typeof row.space_type_id === "number" ? row.space_type_id : null,
      area_sqm: areaSqm,
    }
  })
}

