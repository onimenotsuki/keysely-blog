import { createClient, type SupabaseClient } from "@supabase/supabase-js"

export function getSupabaseClient(): SupabaseClient {
  const url = process.env.GATSBY_SUPABASE_URL
  // "Publishable key" for Supabase in frontend contexts = anon/public key.
  const publishableKey = process.env.GATSBY_SUPABASE_PUBLISHABLE_KEY ?? process.env.GATSBY_SUPABASE_ANON_KEY

  if (!url) {
    throw new Error("Missing required environment variable: GATSBY_SUPABASE_URL")
  }

  if (!publishableKey) {
    throw new Error(
      "Missing required environment variable: GATSBY_SUPABASE_PUBLISHABLE_KEY (or GATSBY_SUPABASE_ANON_KEY)"
    )
  }

  return createClient(url, publishableKey)
}

