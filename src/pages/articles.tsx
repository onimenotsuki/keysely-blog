import * as React from "react"
import { Link, navigate, type HeadFC, type PageProps } from "gatsby"
import Typesense from "typesense"
import { ArrowDown, ArrowRight } from "lucide-react"

import { Layout } from "../components/layout/Layout"
import { Seo } from "../components/seo"

const PER_PAGE = 6
const DEFAULT_SORT = "created_at_ts:desc"
const SORT_OPTIONS = ["created_at_ts:desc", "created_at_ts:asc"] as const

type SortValue = (typeof SORT_OPTIONS)[number]

type TypesenseDoc = {
  id?: string
  title?: string
  slug?: string
  page_path?: string
  cover_image?: string
  excerpt?: string
  read_time?: string
  categories?: string[]
  category?: string
  created_at_ts?: number
}

type FacetItem = {
  value: string
  count: number
}

type SearchState = {
  q: string
  categories: string[]
  sort: SortValue
  createdFrom: number | null
  createdTo: number | null
  page: number
}

function normalizePagePath(path: string | undefined): string {
  if (!path) return "/"
  return path.startsWith("/") ? path : `/${path}`
}

function getArticlePath(doc: TypesenseDoc): string {
  const pagePath = normalizePagePath(doc.page_path)
  if (pagePath !== "/") return pagePath
  if (doc.slug) return `/articles/${doc.slug}/`
  return "/articles/"
}

function parseEpoch(value: string | null): number | null {
  if (!value) return null
  const numeric = Number(value)
  if (Number.isFinite(numeric)) {
    return numeric > 9999999999 ? Math.floor(numeric / 1000) : Math.floor(numeric)
  }

  const parsedDate = Date.parse(value)
  if (Number.isNaN(parsedDate)) return null
  return Math.floor(parsedDate / 1000)
}

function parseSort(value: string | null): SortValue {
  if (value && SORT_OPTIONS.includes(value as SortValue)) {
    return value as SortValue
  }
  return DEFAULT_SORT
}

function formatPublishedDate(createdAtTs: number | undefined): string {
  if (!createdAtTs) return ""
  const date = new Date(createdAtTs * 1000)
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function formatFromNow(createdAtTs: number | undefined): string {
  if (!createdAtTs) return ""
  const diffSeconds = createdAtTs - Math.floor(Date.now() / 1000)
  const absSeconds = Math.abs(diffSeconds)

  const units: Array<{ seconds: number; unit: Intl.RelativeTimeFormatUnit }> = [
    { seconds: 60 * 60 * 24 * 365, unit: "year" },
    { seconds: 60 * 60 * 24 * 30, unit: "month" },
    { seconds: 60 * 60 * 24, unit: "day" },
    { seconds: 60 * 60, unit: "hour" },
    { seconds: 60, unit: "minute" },
    { seconds: 1, unit: "second" },
  ]

  const formatter = new Intl.RelativeTimeFormat("es", { numeric: "auto" })
  for (const item of units) {
    if (absSeconds >= item.seconds || item.unit === "second") {
      const value = Math.round(diffSeconds / item.seconds)
      return formatter.format(value, item.unit)
    }
  }

  return ""
}

function getPrimaryCategory(article: TypesenseDoc): string {
  return (article.categories?.[0] ?? article.category ?? "General").toString()
}

function escapeFilterValue(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll("`", "\\`")
}

function buildFilterBy(
  state: SearchState,
  options: {
    includeCategories?: boolean
  } = {},
): string | undefined {
  const { includeCategories = true } = options
  const filters: string[] = []

  if (includeCategories && state.categories.length > 0) {
    const categories = state.categories
      .map((category) => `\`${escapeFilterValue(category)}\``)
      .join(",")
    filters.push(`categories:=[${categories}]`)
  }

  if (state.createdFrom !== null) {
    filters.push(`created_at_ts:>=${state.createdFrom}`)
  }

  if (state.createdTo !== null) {
    filters.push(`created_at_ts:<=${state.createdTo}`)
  }

  return filters.length > 0 ? filters.join(" && ") : undefined
}

function getInitialState(search: string): SearchState {
  const params = new URLSearchParams(search)
  const page = Math.max(1, Number(params.get("page") ?? "1") || 1)
  const rawCategories = params.get("categories")
  const categories = rawCategories
    ? rawCategories
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : []

  return {
    q: (params.get("q") ?? "").trim(),
    categories,
    sort: parseSort(params.get("sort")),
    createdFrom: parseEpoch(params.get("created_from")),
    createdTo: parseEpoch(params.get("created_to")),
    page,
  }
}

type SearchResponse = {
  docs: TypesenseDoc[]
  found: number
  facets: FacetItem[]
}

function parseFacetCounts(input: unknown): FacetItem[] {
  if (!Array.isArray(input)) return []

  const categoriesFacet = input.find((facet) => {
    if (!facet || typeof facet !== "object") return false
    return (facet as { field_name?: string }).field_name === "categories"
  }) as { counts?: Array<{ value?: string; count?: number }> } | undefined

  if (!categoriesFacet?.counts) return []
  return categoriesFacet.counts
    .filter((item) => Boolean(item.value))
    .map((item) => ({ value: item.value as string, count: item.count ?? 0 }))
    .sort((a, b) => b.count - a.count)
}

export default function ArticlesPage({ location }: PageProps) {
  const [state, setState] = React.useState<SearchState>(() => getInitialState(location.search))
  const [articles, setArticles] = React.useState<TypesenseDoc[]>([])
  const [facets, setFacets] = React.useState<FacetItem[]>([])
  const [found, setFound] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setState(getInitialState(location.search))
  }, [location.search])

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
    let isCancelled = false
    async function runSearch() {
      if (!client) {
        setArticles([])
        setFacets([])
        setFound(0)
        setLoading(false)
        setError("Falta configuración de Typesense en variables públicas.")
        return
      }

      setLoading(true)
      setError(null)

      try {
        const [result, facetResult] = await Promise.all([
          client
            .collections(collectionName)
            .documents()
            .search({
              q: state.q || "*",
              query_by: "title,categories",
              facet_by: "categories",
              filter_by: buildFilterBy(state),
              sort_by: state.sort,
              page: 1,
              per_page: state.page * PER_PAGE,
              highlight_fields: "title,categories",
            }),
          client
            .collections(collectionName)
            .documents()
            .search({
              q: state.q || "*",
              query_by: "title,categories",
              facet_by: "categories",
              filter_by: buildFilterBy(state, { includeCategories: false }),
              page: 1,
              per_page: 1,
            }),
        ])

        if (isCancelled) return

        const searchResult = result as unknown as {
          found?: number
          hits?: Array<{ document?: TypesenseDoc }>
        }
        const facetsSearchResult = facetResult as unknown as {
          facet_counts?: unknown[]
        }

        const docs = (searchResult.hits ?? [])
          .map((hit) => hit.document)
          .filter(Boolean) as TypesenseDoc[]
        setArticles(docs)
        setFound(Number(searchResult.found ?? 0))
        setFacets(parseFacetCounts(facetsSearchResult.facet_counts))
      } catch {
        if (isCancelled) return
        setError("No fue posible cargar artículos. Intenta de nuevo.")
        setArticles([])
        setFound(0)
        setFacets([])
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }

    void runSearch()
    return () => {
      isCancelled = true
    }
  }, [client, collectionName, state])

  const hasMore = articles.length < found
  const featured = articles[0]
  const secondary = articles[1]
  const restArticles = articles.slice(2)

  const updateQuery = React.useCallback(
    (patch: Partial<SearchState>, resetPage = true) => {
      const next: SearchState = {
        ...state,
        ...patch,
        page: resetPage ? 1 : patch.page ?? state.page,
      }

      const params = new URLSearchParams()
      if (next.q) params.set("q", next.q)
      if (next.categories.length > 0) params.set("categories", next.categories.join(","))
      if (next.sort !== DEFAULT_SORT) params.set("sort", next.sort)
      if (next.createdFrom !== null) params.set("created_from", String(next.createdFrom))
      if (next.createdTo !== null) params.set("created_to", String(next.createdTo))
      if (next.page > 1) params.set("page", String(next.page))

      void navigate(`/articles${params.toString() ? `?${params.toString()}` : ""}`, { replace: true })
    },
    [state],
  )

  const selectedCategories = new Set(state.categories)

  const ArticleGridCard = React.useCallback(
    ({
      article,
      titleTag = "h3",
      className = "",
      imageHeightClass = "h-48",
    }: {
      article: TypesenseDoc
      titleTag?: "h2" | "h3"
      className?: string
      imageHeightClass?: string
    }) => {
      const category = getPrimaryCategory(article)
      const summary = article.excerpt?.trim() || "Descubre más en este artículo del blog de Keysely."
      const readTime = article.read_time?.trim() || "Lectura rápida"
      const fromNow = formatFromNow(article.created_at_ts)
      const TitleTag = titleTag

      return (
        <article
          className={`group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}
        >
          <div className={`${imageHeightClass} overflow-hidden bg-gray-100`}>
            {article.cover_image ? (
              <img
                src={article.cover_image}
                alt={article.title ?? "Artículo"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-brand-navy to-brand-blue" />
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-medium text-brand-blue">
                {category}
              </span>
              <span className="text-xs text-gray-400">{readTime}</span>
            </div>
            <TitleTag className="mt-3 line-clamp-2 font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue">
              <Link to={getArticlePath(article)}>
                {article.title}
              </Link>
            </TitleTag>
            {fromNow ? <p className="mt-1 text-xs text-gray-400">{fromNow}</p> : null}
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{summary}</p>
            <Link
              to={getArticlePath(article)}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-blue"
            >
              Leer más <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>
      )
    },
    [],
  )

  return (
    <Layout>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">Blog Keysely</p>
                <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-brand-navy sm:text-6xl">
                  <span className="block">Tu guía para el</span>
                  <span className="block">
                    para el <span className="text-brand-blue">futuro del</span>
                  </span>
                  <span className="block text-brand-blue">trabajo</span>
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                  Explora artículos de productividad, diseño de espacios y bienestar laboral.
                  Filtra por categoría y fecha para encontrar el artículo que necesitas.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={state.q}
                  onChange={(event) => updateQuery({ q: event.target.value })}
                  placeholder="Buscar artículos..."
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-brand-navy outline-none ring-brand-blue transition focus:border-brand-blue focus:ring-2 sm:basis-3/4 sm:grow"
                />
                <select
                  value={state.sort}
                  onChange={(event) => updateQuery({ sort: parseSort(event.target.value) })}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-brand-navy outline-none ring-brand-blue transition focus:border-brand-blue focus:ring-2 sm:basis-1/4 sm:grow-0"
                >
                  <option value="created_at_ts:desc">Ordenar por: Más recientes</option>
                  <option value="created_at_ts:asc">Ordenar por: Más antiguos</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => updateQuery({ categories: [] })}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                    state.categories.length === 0
                      ? "border-brand-blue bg-brand-blue text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-brand-blue/40 hover:text-brand-navy"
                  }`}
                >
                  Todos
                </button>
                {facets.map((facet) => {
                  const selected = selectedCategories.has(facet.value)
                  return (
                    <button
                      key={facet.value}
                      type="button"
                      onClick={() => {
                        const nextCategories = selected
                          ? state.categories.filter((item) => item !== facet.value)
                          : [...state.categories, facet.value]
                        updateQuery({ categories: nextCategories })
                      }}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                        selected
                          ? "border-brand-blue bg-brand-blue text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-brand-blue/40 hover:text-brand-navy"
                      }`}
                    >
                      {facet.value} ({facet.count})
                    </button>
                  )
                })}
              </div>
            </div>
          </section>

          {loading ? (
            <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">
              Cargando artículos...
            </div>
          ) : null}

          {error ? (
            <div className="mt-8 rounded-xl border border-red-100 bg-red-50 p-6 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {!loading && !error && articles.length === 0 ? (
            <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500">
              No hay resultados para los filtros seleccionados.
            </div>
          ) : null}

          {!loading && !error && articles.length > 0 ? (
            <section className="mt-8 space-y-6">
              <div className="grid gap-4 lg:grid-cols-12">
                {featured ? (
                  <ArticleGridCard
                    article={featured}
                    titleTag="h2"
                    className="lg:col-span-8"
                    imageHeightClass="h-64 sm:h-80"
                  />
                ) : null}

                {secondary ? (
                  <ArticleGridCard
                    article={secondary}
                    className="lg:col-span-4"
                    imageHeightClass="h-52"
                  />
                ) : null}
              </div>

              {restArticles.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {restArticles.map((article, index) => {
                    return (
                      <ArticleGridCard
                        key={`${article.id ?? article.slug ?? "article"}-${index}`}
                        article={article}
                        imageHeightClass="h-44"
                      />
                    )
                  })}
                </div>
              ) : null}

              {hasMore ? (
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => updateQuery({ page: state.page + 1 }, false)}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-brand-blue/30 bg-white px-6 text-sm font-medium text-brand-navy transition-colors hover:bg-brand-blue/10"
                  >
                    Cargar más artículos
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
            </section>
          ) : null}
        </div>
      </div>
    </Layout>
  )
}

export const Head: HeadFC = ({ location }) => {
  const siteUrl = "https://blog.keysely.com"
  const siteName = "Keysely Blog"
  return (
    <Seo
      siteUrl={siteUrl}
      siteName={siteName}
      title="Artículos — Keysely Blog"
      description="Explora todos los artículos de Keysely con filtros por categoría y fecha."
      pathname={location.pathname}
      type="website"
    />
  )
}
