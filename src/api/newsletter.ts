import { getSupabaseClient } from "../lib/supabase"

/**
 * Subscribe an email to the Brevo newsletter list.
 *
 * - Uses list 12 for all blog newsletter flows.
 * - Calls the Supabase Edge Function `create-brevo-contact`.
 */
export async function subscribeToNewsletter(email: string) {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) {
    throw new Error("Email is required to subscribe to the newsletter.")
  }

  const supabase = getSupabaseClient()
  const payload = {
    email: trimmedEmail,
    list_id: 12,
  }

  const { data, error } = await supabase.functions.invoke("create-brevo-contact", {
    body: payload,
  })

  if (error) throw error

  if ((data as any)?.error) {
    throw new Error(typeof (data as any).error === "string" ? (data as any).error : "No se pudo registrar tu correo.")
  }

  return data
}

