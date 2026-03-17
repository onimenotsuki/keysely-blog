const UTM_KEY = "utm_keysely_source_origin";
const UTM_VALUE = "blog";

function isKeyselyDomain(hostname: string) {
  const h = hostname.toLowerCase();
  return h === "keysely.com" || h.endsWith(".keysely.com");
}

/**
 * Appends `utm_keysely_source_origin=blog` to:
 * - Any URL pointing to keysely.com (or subdomains)
 * - Any internal blog article URL (e.g. /articles/slug)
 *
 * It preserves existing query params and hash, and does not overwrite the param if already present.
 */
export function withKeyselyOriginUtm(inputUrl: string): string {
  if (!inputUrl) return inputUrl;

  // Ignore non-http(s) schemes (mailto:, tel:, etc.)
  if (
    /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(inputUrl) &&
    !/^https?:/i.test(inputUrl)
  ) {
    return inputUrl;
  }

  // Internal article links (relative)
  const isInternalArticle =
    inputUrl.startsWith("/articles/") ||
    inputUrl === "/articles" ||
    inputUrl === "/articles/";

  const base = "https://blog.keysely.com";
  const url = new URL(inputUrl, base);

  if (!isInternalArticle && !isKeyselyDomain(url.hostname)) {
    return inputUrl;
  }

  if (!url.searchParams.has(UTM_KEY)) {
    url.searchParams.set(UTM_KEY, UTM_VALUE);
  }

  // Return relative URL if input was relative
  const isRelative = inputUrl.startsWith("/") && !inputUrl.startsWith("//");
  if (isRelative) {
    return `${url.pathname}${url.search}${url.hash}`;
  }

  return url.toString();
}
