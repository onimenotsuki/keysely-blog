import { getSupabaseClient } from "../lib/supabase"
import type { Database } from "../supabase/types/database.types"

export type SpaceAmenity = { label: string; iconUrl: string | null }

type SpaceAmenityRow = Database["public"]["Tables"]["space_amenities"]["Row"]
type AmenityRow = Database["public"]["Tables"]["amenities"]["Row"]

type SpaceAmenitiesJoinRow = SpaceAmenityRow & {
  amenities: Pick<AmenityRow, "name" | "icon_url"> | null
}

export async function fetchAmenitiesForSpaces(spaceIds: string[]): Promise<Record<string, SpaceAmenity[]>> {
  if (spaceIds.length === 0) return {}

  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("space_amenities")
    // Use the explicit foreign key name to ensure the relation is joined correctly
    .select("space_id, custom_label, amenities:amenities!space_amenities_amenity_id_fkey ( name, icon_url )")
    .in("space_id", spaceIds)

  if (error) throw error

  const rows = (data ?? []) as unknown as SpaceAmenitiesJoinRow[]
  const bySpaceId: Record<string, SpaceAmenity[]> = {}

  for (const row of rows) {
    const label = row.custom_label ?? row.amenities?.name ?? null
    if (!label) continue

    const iconUrl = row.amenities?.icon_url ?? null
    if (!bySpaceId[row.space_id]) bySpaceId[row.space_id] = []
    bySpaceId[row.space_id].push({ label, iconUrl })
  }

  return bySpaceId
}

