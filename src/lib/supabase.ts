import { createClient, type SupabaseClient } from "@supabase/supabase-js"

function getRequiredEnv(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function getSupabaseClient(): SupabaseClient {
  const url = getRequiredEnv("GATSBY_SUPABASE_URL")
  // "Publishable key" for Supabase in frontend contexts = anon/public key.
  const publishableKey =
    process.env.GATSBY_SUPABASE_PUBLISHABLE_KEY ?? getRequiredEnv("GATSBY_SUPABASE_ANON_KEY")

  return createClient(url, publishableKey)
}

