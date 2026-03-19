import * as React from "react"

type SeoProps = {
  siteUrl: string
  siteName: string
  title: string
  description: string
  pathname: string
  image?: string | null
  keywords?: string[] | null
  type?: "website" | "article"
  noindex?: boolean
  imageWidth?: number
  imageHeight?: number
}

function toAbsoluteUrl(siteUrl: string, maybeRelativeUrl: string) {
  try {
    return new URL(maybeRelativeUrl, siteUrl).toString()
  } catch {
    return maybeRelativeUrl
  }
}

export function Seo({
  siteUrl,
  siteName,
  title,
  description,
  pathname,
  image,
  keywords,
  type = "website",
  noindex,
  imageWidth = 1200,
  imageHeight = 630,
}: SeoProps) {
  const canonical = toAbsoluteUrl(siteUrl, pathname)
  const ogImage = toAbsoluteUrl(siteUrl, image ?? "/web-app-manifest-512x512.png")
  const hasKeywords = (keywords?.length ?? 0) > 0

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {hasKeywords ? <meta name="keywords" content={keywords!.join(", ")} /> : null}

      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={String(imageWidth)} />
      <meta property="og:image:height" content={String(imageHeight)} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}
    </>
  )
}

