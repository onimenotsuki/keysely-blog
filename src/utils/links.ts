const UTM_SOURCE_KEY = "utm_source";
const UTM_MEDIUM_KEY = "utm_medium";
const UTM_CAMPAIGN_KEY = "utm_campaign";
const UTM_CONTENT_KEY = "utm_content";

const UTM_DEFAULT_SOURCE = "blog";
const UTM_DEFAULT_MEDIUM = "referral";
const UTM_DEFAULT_CAMPAIGN = "blog_keysely";
const UTM_DEFAULT_CONTENT = "generic_link";


function isKeyselyDomain(hostname: string) {
  const h = hostname.toLowerCase();
  return h === "keysely.com" || h.endsWith(".keysely.com");
}

/**
 * Appends UTM parameters to:
 * - Any URL pointing to keysely.com (or subdomains)
 * - Any internal blog article URL (e.g. /articles/slug)
 *
 * It preserves existing query params and hash, and does not overwrite any UTM
 * param that is already present in the URL.
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

  if (!url.searchParams.has(UTM_SOURCE_KEY)) {
    url.searchParams.set(UTM_SOURCE_KEY, UTM_DEFAULT_SOURCE);
  }
  if (!url.searchParams.has(UTM_MEDIUM_KEY)) {
    url.searchParams.set(UTM_MEDIUM_KEY, UTM_DEFAULT_MEDIUM);
  }
  if (!url.searchParams.has(UTM_CAMPAIGN_KEY)) {
    url.searchParams.set(UTM_CAMPAIGN_KEY, UTM_DEFAULT_CAMPAIGN);
  }
  if (!url.searchParams.has(UTM_CONTENT_KEY)) {
    url.searchParams.set(UTM_CONTENT_KEY, UTM_DEFAULT_CONTENT);
  }

  // Return relative URL if input was relative
  const isRelative = inputUrl.startsWith("/") && !inputUrl.startsWith("//");
  if (isRelative) {
    return `${url.pathname}${url.search}${url.hash}`;
  }

  return url.toString();
}
