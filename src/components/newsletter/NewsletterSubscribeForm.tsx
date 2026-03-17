import * as React from "react"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"

import { subscribeToNewsletter } from "../../api/newsletter"
import { newsletterSchema } from "../../utils/schemas/newsletter"

type NewsletterFormValues = {
  email: string
}

export interface NewsletterSubscribeFormProps {
  placeholder?: string
  buttonLabel?: string
  ariaLabel?: string
  formClassName?: string
  inputClassName?: string
  buttonClassName?: string
  successMessage?: string
  toastSuccessMessage?: string
  errorClassName?: string
  successClassName?: string
  onSuccess?: () => void
}

export function NewsletterSubscribeForm({
  placeholder = "Tu correo electrónico",
  buttonLabel = "Suscribirse",
  ariaLabel = "Correo electrónico para el newsletter",
  formClassName,
  inputClassName,
  buttonClassName,
  successMessage,
  toastSuccessMessage = "Te has suscrito con éxito.",
  errorClassName,
  successClassName,
  onSuccess,
}: NewsletterSubscribeFormProps) {
  const mutation = useMutation({
    mutationFn: (email: string) => subscribeToNewsletter(email),
    onSuccess: () => {
      onSuccess?.()
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
    mode: "onSubmit",
  })

  const onSubmit = handleSubmit(({ email }) => {
    mutation.mutate(email, {
      onSuccess: () => {
        reset({ email: "" })
        toast.success(toastSuccessMessage)
      },
    })
  })

  const isPending = mutation.isPending

  return (
    <div>
      <form onSubmit={onSubmit} className={formClassName} noValidate>
        <input
          type="email"
          placeholder={placeholder}
          aria-label={ariaLabel}
          autoComplete="email"
          disabled={isPending}
          {...register("email")}
          className={inputClassName}
        />
        <button type="submit" disabled={isPending} className={buttonClassName}>
          {isPending ? "Enviando..." : buttonLabel}
        </button>
      </form>

      {errors.email?.message ? (
        <p className={errorClassName ?? "mt-3 text-sm text-red-200"}>{errors.email.message}</p>
      ) : null}

      {mutation.isSuccess && successMessage ? (
        <p className={successClassName ?? "mt-3 text-sm text-white/90"}>{successMessage}</p>
      ) : null}

      {mutation.isError ? (
        <p className={errorClassName ?? "mt-3 text-sm text-red-200"}>
          {(mutation.error as any)?.message ?? "Ocurrió un error. Inténtalo de nuevo."}
        </p>
      ) : null}
    </div>
  )
}

