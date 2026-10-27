import { useId } from 'react'
import { search as searchIcon } from '@/assets/icons'

type SearchFieldProps = {
  query: string
  onQueryChange: (value: string) => void
  onClear: () => void
}

/**
 * The Figma field is a 335 × 40 surface with the placeholder sitting 52px in
 * from the right edge and an 18px icon frame a further 20px in. The icon art is
 * 20px wide, so it bleeds 1px past its frame on each side.
 */
export function SearchField({ query, onQueryChange, onClear }: SearchFieldProps) {
  const inputId = useId()

  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className="w-full"
    >
      <label htmlFor={inputId} className="sr-only">
        ابحث عن صالون أو حي
      </label>

      <div className="relative">
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="بحث"
          dir="rtl"
          autoComplete="on"
          enterKeyHint="search"
          className="h-10 w-full rounded-[8px] bg-bookly-field pr-[52px] pl-10 text-right text-[16px] leading-[19px] font-black text-black caret-bookly-teal placeholder:text-black/50 [&::-webkit-search-cancel-button]:appearance-none"
        />

        <img
          src={searchIcon}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[19px] size-5 max-w-none -translate-y-1/2"
        />

        {query ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="مسح البحث"
            className="absolute top-1/2 left-2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-[16px] leading-none font-semibold text-black/55 transition-colors hover:bg-black/10 hover:text-black"
          >
            <span aria-hidden="true">×</span>
          </button>
        ) : null}
      </div>
    </form>
  )
}
