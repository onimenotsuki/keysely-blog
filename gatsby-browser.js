import "./src/styles/global.css"

import * as React from "react"
import { AppProviders } from "./src/providers/AppProviders"

export const wrapRootElement = ({ element }) => {
  return <AppProviders>{element}</AppProviders>
}
