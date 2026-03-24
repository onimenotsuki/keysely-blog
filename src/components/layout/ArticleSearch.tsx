import * as React from "react"
import { Link } from "gatsby"
import { createPortal } from "react-dom"
import Typesense from "typesense"
import { Search, Loader2, X } from "lucide-react"

type SearchHit = {
  title?: string
  slug?: string
  category?: string
  cover_image?: string
  page_path?: string
}

type SearchHighlightEntry = {
  matched_tokens?: string[]
  snippet?: string
}

type SearchHighlightObject = {
  title?: SearchHighlightEntry
  category?: SearchHighlightEntry
}

type SearchHighlight = {
  field?: string
  snippet?: string
}

type SearchResultItem = {
  document: SearchHit
  highlight?: SearchHighlightObject
  highlights: SearchHighlight[]
}

const SEARCH_DEBOUNCE_MS = 220

function normalizePagePath(path: string | undefined): string {
  if (!path) return "/"
  if (path.startsWith("/")) return path
  return `/${path}`
}

function getResultPath(hit: SearchHit): string {
  const pagePath = normalizePagePath(hit.page_path)
  if (pagePath !== "/") return pagePath
  if (hit.slug) return `/articles/${hit.slug}/`
  return "/"
}

export function ArticleSearch() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResultItem[]>([])
  const [resultsFound, setResultsFound] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const client = React.useMemo(() => {
    const host = process.env.GATSBY_TYPESENSE_HOST
    const apiKey = process.env.GATSBY_TYPESENSE_SEARCH_API_KEY
    if (!host || !apiKey) return null

    return new Typesense.Client({
      nodes: [
        {
          host,
          port: Number(process.env.GATSBY_TYPESENSE_PORT ?? "443"),
          protocol: process.env.GATSBY_TYPESENSE_PROTOCOL ?? "https",
        },
      ],
      apiKey,
      connectionTimeoutSeconds: 2,
    })
  }, [])

  const collectionName =
    process.env.GATSBY_TYPESENSE_BLOG_COLLECTION ?? "blog_articles_v1"

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    if (!isDialogOpen) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      setIsDialogOpen(false)
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isDialogOpen])

  React.useEffect(() => {
    if (!isDialogOpen) return
    const timeoutId = window.setTimeout(() => {
      inputRef.current?.focus()
    }, 30)
    return () => window.clearTimeout(timeoutId)
  }, [isDialogOpen])

  React.useEffect(() => {
    if (!isDialogOpen) return
    if (!query.trim() || !client) {
      setResults([])
      setResultsFound(0)
      setIsLoading(false)
      return
    }

    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true)
      try {
        const response = await client
          .collections(collectionName)
          .documents()
          .search({
            q: query,
            query_by: "title,categories,category",
            per_page: 6,
            highlight_fields: "title,categories,category",
            highlight_start_tag: "<mark>",
            highlight_end_tag: "</mark>",
          })
        const found = Number(response.found ?? 0)
        const hits = (response.hits ?? []).map((hit) => {
          const castedHit = hit as {
            document: SearchHit
            highlight?: SearchHighlightObject
            highlights?: SearchHighlight[]
          }
          return {
            document: castedHit.document,
            highlight: castedHit.highlight,
            highlights: castedHit.highlights ?? [],
          }
        })
        setResultsFound(found)
        setResults(hits)
      } catch {
        setResults([])
        setResultsFound(0)
      } finally {
        setIsLoading(false)
      }
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [client, collectionName, isDialogOpen, query])

  const getHighlightedField = React.useCallback(
    (item: SearchResultItem, field: "title" | "category"): string | null => {
      const highlightObjectSnippet = item.highlight?.[field]?.snippet
      if (highlightObjectSnippet) return highlightObjectSnippet
      const highlight = item.highlights.find((entry) => entry.field === field)
      return highlight?.snippet ?? null
    },
    [],
  )

  return (
    <>
      <button
        type="button"
        className="inline-flex h-9 items-center gap-2 rounded-md border border-brand-blue/40 bg-brand-blue/10 px-3 text-sm font-medium text-brand-navy transition-colors hover:bg-brand-blue/20"
        onClick={() => setIsDialogOpen(true)}
      >
        <Search className="h-4 w-4" />
        Buscar
      </button>

      {isMounted && isDialogOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-start justify-center bg-brand-navy/35 px-4 pt-20 backdrop-blur-md sm:pt-28"
              role="dialog"
              aria-modal="true"
              aria-label="Búsqueda de artículos"
              onClick={() => setIsDialogOpen(false)}
            >
              <div
                className="w-full max-w-2xl overflow-hidden rounded-2xl border border-brand-blue/20 bg-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="border-b border-brand-blue/10 p-4">
                  <label htmlFor="header-article-search" className="sr-only">
                    Buscar artículos
                  </label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-navy/50" />
                    <input
                      ref={inputRef}
                      id="header-article-search"
                      type="text"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Buscar por título o categoría"
                      className="h-11 w-full rounded-lg border border-brand-blue/30 bg-white pl-9 pr-10 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-brand-navy/60 transition hover:bg-brand-blue/10 hover:text-brand-navy"
                      onClick={() => setIsDialogOpen(false)}
                      aria-label="Cerrar búsqueda"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="max-h-[60vh] min-h-[80px] overflow-y-auto">
                  {isLoading ? (
                    <div className="flex items-center gap-2 px-4 py-3 text-sm text-brand-navy/70">
                      <Loader2 className="h-4 w-4 animate-spin text-brand-blue" />
                      Buscando...
                    </div>
                  ) : null}

                  {!isLoading && query.trim().length > 0 && results.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-brand-navy/70">No encontramos resultados.</p>
                  ) : null}

                  {!isLoading && results.length > 0 ? (
                    <ul className="py-1">
                      {results.map((item, index) => {
                        const hit = item.document
                        const path = getResultPath(hit)
                        const titleHighlight = getHighlightedField(item, "title")
                        const categoryHighlight = getHighlightedField(item, "category")
                        return (
                          <li key={`${path}-${index}`}>
                            <Link
                              to={path}
                              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-brand-blue/5"
                              onClick={() => setIsDialogOpen(false)}
                            >
                              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-brand-blue/10">
                                {hit.cover_image ? (
                                  <img
                                    src={hit.cover_image}
                                    alt={hit.title ?? "Preview"}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="h-full w-full bg-gradient-to-br from-brand-navy to-brand-blue" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-brand-navy [&_mark]:rounded-sm [&_mark]:bg-brand-blue/20 [&_mark]:px-0.5 [&_mark]:text-brand-navy">
                                  {titleHighlight ? (
                                    <span dangerouslySetInnerHTML={{ __html: titleHighlight }} />
                                  ) : (
                                    hit.title ?? "Artículo"
                                  )}
                                </p>
                                {hit.category ? (
                                  <p className="truncate text-xs text-brand-navy/70 [&_mark]:rounded-sm [&_mark]:bg-brand-blue/20 [&_mark]:px-0.5 [&_mark]:text-brand-navy">
                                    {categoryHighlight ? (
                                      <span dangerouslySetInnerHTML={{ __html: categoryHighlight }} />
                                    ) : (
                                      hit.category
                                    )}
                                  </p>
                                ) : null}
                              </div>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  ) : null}

                  {!isLoading && query.trim().length > 0 ? (
                    <div className="border-t border-brand-blue/10 px-4 py-2 text-xs text-brand-navy/70">
                      {resultsFound} resultado{resultsFound === 1 ? "" : "s"} encontrado
                      {resultsFound === 1 ? "" : "s"}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
