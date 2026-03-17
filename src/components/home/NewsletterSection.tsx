import * as React from "react"
import { useMutation } from "@tanstack/react-query"
import { subscribeToNewsletter } from "../../api/newsletter"

interface NewsletterSectionProps {
  title?: string
  description?: string
  placeholder?: string
  buttonLabel?: string
}

export function NewsletterSection({
  title = "Suscríbete a nuestro newsletter",
  description = "Recibe ofertas, novedades y tips para aprovechar al máximo tu espacio de trabajo.",
  placeholder = "Tu correo electrónico",
  buttonLabel = "Suscribirse",
}: NewsletterSectionProps) {
  const [email, setEmail] = React.useState("")

  const mutation = useMutation({
    mutationFn: (nextEmail: string) => subscribeToNewsletter(nextEmail),
  })

  const isPending = mutation.isPending

  return (
    <section className="border-t border-gray-200 bg-brand-navy py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 text-white/90">{description}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              mutation.mutate(email)
            }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <input
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              className="h-11 min-w-0 rounded-full border border-gray-300 bg-white px-4 text-sm text-brand-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue sm:max-w-xs"
              aria-label="Correo electrónico para el newsletter"
              autoComplete="email"
              required
              disabled={isPending}
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-brand-navy transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-80"
              disabled={isPending}
            >
              {isPending ? "Enviando..." : buttonLabel}
            </button>
          </form>

          {mutation.isSuccess ? (
            <p className="mt-4 text-sm text-white/90">Listo, te avisaremos por correo.</p>
          ) : null}

          {mutation.isError ? (
            <p className="mt-4 text-sm text-red-200">
              {(mutation.error as any)?.message ?? "Ocurrió un error. Inténtalo de nuevo."}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

