export type ClassValue = string | false | null | undefined

/** Joins the truthy class names passed in, so conditional classes stay readable. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
