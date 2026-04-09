const UTM_SOURCE_KEY = "utm_source";
const UTM_MEDIUM_KEY = "utm_medium";
const UTM_CAMPAIGN_KEY = "utm_campaign";
const UTM_CONTENT_KEY = "utm_content";

const UTM_DEFAULT_SOURCE = "blog";
const UTM_DEFAULT_MEDIUM = "referral";
const UTM_DEFAULT_CAMPAIGN = "blog_mocal";
const UTM_DEFAULT_CONTENT = "generic_link";

/** Main product site hostname. Override with GATSBY_MAIN_SITE_HOST. */
function getMainSiteHost(): string {
  if (typeof process !== "undefined" && process.env.GATSBY_MAIN_SITE_HOST) {
    return process.env.GATSBY_MAIN_SITE_HOST.toLowerCase();
  }
  return "mocal.com.mx";
}

function isMocalProductDomain(hostname: string): boolean {
  const h = hostname.toLowerCase();
  const main = getMainSiteHost();
  return h === main || h.endsWith(`.${main}`);
}

function getBlogOrigin(): string {
  if (typeof process !== "undefined" && process.env.GATSBY_SITE_URL) {
    return process.env.GATSBY_SITE_URL.replace(/\/$/, "");
  }
  return "https://blog.mocal.com.mx";
}

/**
 * Appends UTM parameters to:
 * - Any URL pointing to the Mocal product domain (or subdomains)
 * - Any internal blog article URL (e.g. /articles/slug)
 *
 * Preserves existing query params and hash; does not overwrite UTMs already set.
 */
export function withMocalOriginUtm(inputUrl: string): string {
  if (!inputUrl) return inputUrl;

  if (
    /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(inputUrl) &&
    !/^https?:/i.test(inputUrl)
  ) {
    return inputUrl;
  }

  const isInternalArticle =
    inputUrl.startsWith("/articles/") ||
    inputUrl === "/articles" ||
    inputUrl === "/articles/";

  const url = new URL(inputUrl, `${getBlogOrigin()}/`);

  if (!isInternalArticle && !isMocalProductDomain(url.hostname)) {
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

  const isRelative = inputUrl.startsWith("/") && !inputUrl.startsWith("//");
  if (isRelative) {
    return `${url.pathname}${url.search}${url.hash}`;
  }

  return url.toString();
}
