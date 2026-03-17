import * as React from "react"
import * as LucideLab from "@lucide/lab"
import * as LucideIcons from "lucide-react"
import { Icon } from "lucide-react"

interface AmenityIconProps {
  iconUrl: string | null
  className?: string
  label?: string
}

const baseIconClassName = "h-4 w-4 shrink-0"

function mergeClassNames(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ")
}

function iconUrlToPascalCase(iconUrl: string): string {
  return iconUrl
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("")
}

function iconUrlToCamelCase(iconUrl: string): string {
  const parts = iconUrl.split("-").filter(Boolean)
  if (parts.length === 0) return ""
  return (
    parts[0].toLowerCase() +
    parts
      .slice(1)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join("")
  )
}

export function AmenityIcon({ iconUrl, className, label }: AmenityIconProps) {
  if (!iconUrl?.trim()) return null

  const trimmed = iconUrl.trim()
  const pascalName = iconUrlToPascalCase(trimmed)

  const iconClassName = mergeClassNames(baseIconClassName, "text-gray-500", className)

  const lucideIcon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    pascalName
  ]

  if (lucideIcon) {
    const IconComponent = lucideIcon
    return (
      <span title={label ?? undefined}>
        <IconComponent className={iconClassName} aria-hidden />
      </span>
    )
  }

  const camelName = iconUrlToCamelCase(trimmed)
  const labIconNode = (LucideLab as unknown as Record<string, unknown>)[camelName]

  if (labIconNode && Array.isArray(labIconNode)) {
    return (
      <span title={label ?? undefined}>
        <Icon iconNode={labIconNode} className={iconClassName} aria-hidden />
      </span>
    )
  }

  return null
}
