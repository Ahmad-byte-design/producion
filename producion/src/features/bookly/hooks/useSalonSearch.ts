import { useMemo, useState } from 'react'
import type { Salon } from '../types'
import { filterSalons } from '../utils'

export function useSalonSearch(salons: Salon[]) {
  const [query, setQuery] = useState('')
  const isFiltering = query.trim().length > 0

  const results = useMemo(
    () => filterSalons(salons, query),
    [salons, query],
  )

  return { query, setQuery, results, isFiltering }
}
