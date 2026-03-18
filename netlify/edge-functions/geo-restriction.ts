import type { Config, Context } from "@netlify/edge-functions"

const ALLOWED_COUNTRY = "MX"
const NOT_AVAILABLE_PATH = "/no-disponible/"

export default async function handler(
  request: Request,
  context: Context,
): Promise<Response | URL | undefined> {
  const countryCode = context.geo?.country?.code ?? ""
  const url = new URL(request.url)

  // Never intercept the not-available page itself or 404, to avoid redirect loops.
  if (url.pathname.startsWith("/no-disponible") || url.pathname.startsWith("/404")) {
    return undefined
  }

  // If we don't have geo information, do not restrict access
  if (!countryCode) {
    return undefined
  }

  if (countryCode.toUpperCase() === ALLOWED_COUNTRY) {
    // Allow normal handling (static assets, redirects, etc.)
    return undefined
  }

  // Same-site rewrite: serve the "not available" page with status 200,
  // keeping the original URL in the browser.
  return new URL(NOT_AVAILABLE_PATH, request.url)
}

export const config: Config = {
  path: "/*",
  excludedPath: ["/no-disponible/*", "/404/*", "/assets/*"],
}

