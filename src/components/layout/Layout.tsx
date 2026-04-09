import * as React from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <a
        href="#main-content"
        className="absolute left-[-10000px] top-auto z-[200] h-px w-px overflow-hidden rounded-md bg-white px-4 py-3 font-medium text-brand-navy shadow-lg ring-2 ring-brand-blue focus:left-4 focus:top-4 focus:h-auto focus:w-auto focus:overflow-visible focus:outline-none"
      >
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        {children}
      </main>
      <Footer />
    </div>
  )
}
