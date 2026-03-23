import * as React from "react"
import { Link } from "gatsby"
import { withKeyselyOriginUtm } from "../../utils/links"
import { ArticleSearch } from "./ArticleSearch"

export function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src="/keysely.svg" alt="Keysely" className="h-7 w-auto" />
          
            <span className="font-normal text-gray-500">Blog</span>
          
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <ArticleSearch />
          <a
            href={withKeyselyOriginUtm("https://keysely.com")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-navy"
          >
            Ir a Keysely
          </a>
          <a
            href={withKeyselyOriginUtm("https://keysely.com/search")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center rounded-md bg-brand-blue px-4 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90"
          >
            Explorar espacios
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-brand-navy md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <ArticleSearch />
            <a
              href={withKeyselyOriginUtm("https://keysely.com")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-brand-navy"
            >
              Ir a Keysely
            </a>
            <a
              href={withKeyselyOriginUtm("https://keysely.com/search")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-fit items-center rounded-md bg-brand-blue px-4 text-sm font-medium text-white"
            >
              Explorar espacios
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
