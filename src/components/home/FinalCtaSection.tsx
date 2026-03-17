import * as React from "react"
import { withKeyselyOriginUtm } from "../../utils/links"

interface FinalCtaSectionProps {
  title?: string
  description?: string
  cta: { label: string; href: string }
}

export function FinalCtaSection({
  title = "¿Listo para reservar?",
  description = "Encuentra tu espacio ideal en minutos y empieza a trabajar donde quieras.",
  cta,
}: FinalCtaSectionProps) {
  return (
    <section className="border-t border-gray-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-brand-navy sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-md text-gray-500">{description}</p>
        <div className="mt-8">
          <a
            href={withKeyselyOriginUtm(cta.href)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-brand-blue px-8 text-sm font-medium text-white transition-colors hover:bg-brand-blue/90"
          >
            {cta.label}
          </a>
        </div>
      </div>
    </section>
  )
}

