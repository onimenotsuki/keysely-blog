import * as React from "react"
import type { GatsbySSR } from "gatsby"

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="favicon" rel="icon" type="image/png" href="/favicon.png" />,
    <link
      key="favicon-96"
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/favicon-96x96.png"
    />,
    <link
      key="apple-touch-icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png"
    />,
    <link
      key="manifest"
      rel="manifest"
      href="/manifest.webmanifest"
      crossOrigin="anonymous"
    />,
    <meta key="theme-color" name="theme-color" content="#0f172a" />,
  ])
}

