import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Layout } from "../components/layout/Layout"
import { Shield, Calendar, Headphones, BookOpen, Building2, Users, ArrowRight, Search, MapPin } from "lucide-react"
import { FeaturedArticlesSection, type FeaturedArticle } from "../components/home"

const categories = [
  {
    title: "Oficinas Privadas",
    description: "Consejos para elegir la oficina perfecta para tu equipo.",
    icon: Building2,
    color: "bg-brand-blue/10 text-brand-blue",
  },
  {
    title: "Coworking",
    description: "Tendencias y guías sobre espacios de coworking.",
    icon: Users,
    color: "bg-brand-lavender/10 text-brand-lavender",
  },
  {
    title: "Salas de Juntas",
    description: "Tips para organizar reuniones productivas.",
    icon: BookOpen,
    color: "bg-brand-beige/10 text-brand-beige",
  },
]

const whyKeysely = [
  {
    title: "Reservas seguras",
    description: "Pago protegido y cancelación flexible.",
    icon: Shield,
  },
  {
    title: "Flexibilidad",
    description: "Por hora, día o mes según lo que necesites.",
    icon: Calendar,
  },
  {
    title: "Soporte 24/7",
    description: "Estamos aquí cuando nos necesites.",
    icon: Headphones,
  },
]

const featuredArticles: FeaturedArticle[] = [
  {
    title: "Cómo elegir el espacio de trabajo ideal para tu startup",
    excerpt:
      "Descubre los factores clave que debes considerar al elegir un espacio de trabajo para tu equipo en crecimiento.",
    category: "Oficinas Privadas",
    readTime: "5 min",
  },
  {
    title: "Las 5 mejores zonas para coworking en CDMX",
    excerpt:
      "Una guía completa de las mejores zonas de la Ciudad de México para encontrar espacios de coworking con todas las amenidades.",
    category: "Coworking",
    readTime: "7 min",
  },
  {
    title: "Guía para organizar reuniones productivas",
    excerpt:
      "Tips prácticos para aprovechar al máximo tus salas de juntas y hacer reuniones más eficientes.",
    category: "Salas de Juntas",
    readTime: "4 min",
  },
]

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-brand-navy">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[2px] scale-105 opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gray-900/75" aria-hidden="true" />
        <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              El blog de Keysely
            </h1>
            <p className="mt-6 text-lg text-white/90">
              Descubre tendencias, guías y consejos sobre espacios de trabajo flexibles, coworking y oficinas en México.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#articulos"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-blue px-8 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90"
              >
                <BookOpen className="h-4 w-4" />
                Leer artículos
              </a>
              <a
                href="https://keysely.com/search"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <Search className="h-4 w-4" />
                Explorar espacios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="border-t border-gray-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl">
            Cómo funciona
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">
            Tres pasos para reservar tu próximo espacio.
          </p>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {[
              { step: "1", title: "Busca", desc: "Explora espacios por ubicación, precio y disponibilidad." },
              { step: "2", title: "Reserva", desc: "Elige fecha y hora y confirma tu reserva al instante." },
              { step: "3", title: "Disfruta", desc: "Gestiona tus reservas y reseñas desde tu panel." },
            ].map((item) => (
              <div key={item.step} className="rounded-xl border border-gray-100 bg-gray-50/50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                  <span className="text-lg font-bold">{item.step}</span>
                </div>
                <h3 className="mt-4 font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explorar por categoría */}
      <section id="categorias" className="border-t border-gray-200 bg-brand-beige-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-brand-navy sm:text-3xl">
              Explorar por categoría
            </h2>
            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
              Artículos y guías organizados por tipo de espacio.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {categories.map(({ title, description, icon: Icon, color }) => (
              <div
                key={title}
                className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-brand-navy">{title}</h3>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-blue transition-colors group-hover:text-brand-blue/80">
                  Ver artículos <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedArticlesSection articles={featuredArticles} />

      {/* Lista tu espacio (CTA hosts) */}
      <section className="border-t border-gray-200 bg-brand-navy py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            ¿Tienes un espacio? Lista tu espacio en Keysely
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Llega a miles de profesionales que buscan oficinas, salas de juntas y coworkings. Gestiona reservas y cobra de forma segura.
          </p>
          <div className="mt-8">
            <a
              href="https://keysely.com/about/publish-your-space"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-8 text-sm font-medium text-brand-navy transition-colors hover:bg-white/90"
            >
              <MapPin className="h-4 w-4" />
              Lista tu espacio
            </a>
          </div>
        </div>
      </section>

      {/* Por qué Keysely */}
      <section className="border-t border-gray-200 bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-brand-navy sm:text-3xl">
            Por qué Keysely
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">
            Reserva con confianza en la plataforma líder de espacios de todo tipo en México.
          </p>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {whyKeysely.map(({ title, description, icon: Icon }) => (
              <div key={title} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold text-brand-navy">{title}</h3>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-gray-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brand-navy sm:text-3xl">
            ¿Listo para reservar?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-gray-500">
            Encuentra tu espacio ideal en minutos y empieza a trabajar donde quieras.
          </p>
          <div className="mt-8">
            <a
              href="https://keysely.com/search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-brand-blue px-8 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90"
            >
              Explorar espacios
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-gray-200 bg-brand-navy py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Suscríbete a nuestro newsletter
            </h2>
            <p className="mt-3 text-white/90">
              Recibe ofertas, novedades y tips para aprovechar al máximo tu espacio de trabajo.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="h-11 min-w-0 rounded-full border border-gray-300 bg-white px-4 text-sm text-brand-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue sm:max-w-xs"
                aria-label="Correo electrónico para el newsletter"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-brand-navy transition-colors hover:bg-white/90"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Keysely Blog — Guías y consejos sobre espacios de trabajo</title>
    <meta
      name="description"
      content="Descubre tendencias, guías y consejos sobre espacios de trabajo flexibles, coworking y oficinas en México."
    />
  </>
)
