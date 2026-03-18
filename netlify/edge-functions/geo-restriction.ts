import type { Config, Context } from "@netlify/edge-functions";

const ALLOWED_COUNTRY = "MX";
const NOT_AVAILABLE_PATH = "/no-disponible.html";

export default async function handler(
  request: Request,
  context: Context,
): Promise<Response | URL | undefined> {
  const countryCode = context.geo?.country?.code ?? "";

  if (countryCode.toUpperCase() === ALLOWED_COUNTRY) {
    // Allow normal handling (static assets, redirects, etc.)
    return undefined;
  }

  // Same-site rewrite: serve the "not available" page with status 200,
  // keeping the original URL in the browser.
  return new URL(NOT_AVAILABLE_PATH, request.url);
}

export const config: Config = {
  path: "/*",
  excludedPath: ["/no-disponible.html", "/404.html", "/assets/*"],
};

