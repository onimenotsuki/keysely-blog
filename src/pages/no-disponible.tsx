import * as React from "react"
import type { HeadFC } from "gatsby"

export default function NoDisponiblePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-16 text-center">
      <div className="max-w-md">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-blue">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-blue" />
          Región
        </div>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-brand-navy sm:text-3xl">
          Mocal no está disponible en tu región
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          <span className="text-brand-blue underline decoration-brand-blue/30 underline-offset-4">
            Mocal
          </span>{" "}
          solo está disponible en México. Si te encuentras en México y ves este mensaje, escríbenos.
        </p>

        <p className="mt-6 text-sm text-gray-600">
          <a
            href="mailto:hola@mocal.com.mx"
            className="font-medium text-brand-blue underline-offset-4 hover:underline"
          >
            hola@mocal.com.mx
          </a>
        </p>
      </div>
    </main>
  )
}

export const Head: HeadFC = () => (
  <title>No disponible en tu región — Mocal</title>
)
