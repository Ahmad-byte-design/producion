import type { Salon } from '../types'

const ARABIC_MARKS = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g

/** Folds the spelling differences people type in Arabic before matching. */
function normalize(value: string): string {
  return value
    .toLocaleLowerCase('ar')
    .replace(ARABIC_MARKS, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim()
}

export function filterSalons(salons: Salon[], query: string): Salon[] {
  const normalizedQuery = normalize(query)

  if (!normalizedQuery) {
    return salons
  }

  return salons.filter((salon) =>
    normalize(`${salon.name} ${salon.area}`).includes(normalizedQuery),
  )
}
