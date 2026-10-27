import { star as starIcon } from '@/assets/icons'
import type { Salon } from '../types'

function resultLabel(count: number): string {
  if (count === 0) {
    return 'ما في نتائج مطابقة'
  }

  if (count === 1) {
    return 'صالون واحد'
  }

  if (count === 2) {
    return 'صالونان'
  }

  if (count <= 10) {
    return `${count} صالونات`
  }

  return `${count} صالونًا`
}

function SalonCard({ salon }: { salon: Salon }) {
  return (
    <article className="flex w-full items-center justify-center rounded-[8px] bg-white py-[11px] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform">
      <div className="flex w-[233px] max-w-[calc(100%-102px)] shrink-0 flex-col items-start p-[10px] max-[359px]:max-w-[calc(100%-88px)]">
        <div className="flex w-full flex-col items-end gap-[10px]">
          <div className="flex shrink-0 items-start gap-[46px] px-[4px] max-[359px]:gap-4">
            <div className="flex shrink-0 items-center gap-[7px]">
              <p
                dir="auto"
                className="text-[12px] leading-[15px] font-bold whitespace-nowrap text-bookly-rating"
              >
                التقييم : {salon.rating}
              </p>

              <span className="relative block h-3 w-[13px] shrink-0">
                <img
                  src={starIcon}
                  alt=""
                  className="absolute inset-0 m-auto h-[14px] w-[15px] max-w-none"
                />
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-[8px]">
              <p
                dir="auto"
                className="text-[12px] leading-[15px] font-normal whitespace-nowrap text-black"
              >
                {salon.area}
              </p>

              <span className="relative block h-[13.444px] w-[11px] shrink-0">
                <img
                  src="/bookly/pin.svg"
                  alt=""
                  className="absolute inset-0 m-auto h-[14.444px] w-3 max-w-none"
                />
              </span>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center gap-[8px] text-center text-[12px] leading-[15px] font-semibold whitespace-nowrap text-black">
            <p dir="auto" className="shrink-0">
              <span className="font-normal">يبدأ من </span>
              {salon.price}
            </p>
            <p dir="auto" className="shrink-0">
              {salon.name}
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-[65px] w-[90px] shrink-0 overflow-hidden rounded-[9px] max-[359px]:w-[76px]">
        <img
          src={salon.image}
          alt=""
          className="pointer-events-none absolute top-[-6.78%] left-[-24.55%] h-[160%] w-[144.23%] max-w-none select-none"
        />
      </div>
    </article>
  )
}

type PopularSalonsProps = {
  salons: Salon[]
  query: string
  isFiltering: boolean
  onReset: () => void
}

export function PopularSalons({
  salons,
  query,
  isFiltering,
  onReset,
}: PopularSalonsProps) {
  const hasResults = salons.length > 0

  return (
    <section id="popular" aria-labelledby="popular-heading" className="mt-5">
      <h2
        id="popular-heading"
        className="px-5 text-right text-[16px] leading-[19px] font-black text-black"
      >
        الأكثر شهرة حولك
      </h2>

      <p role="status" aria-live="polite" className="sr-only">
        {isFiltering ? resultLabel(salons.length) : ''}
      </p>

      <ul className="mt-4 flex w-full flex-col gap-[10px] px-5">
        {hasResults ? (
          salons.map((salon) => (
            <li key={salon.id}>
              <SalonCard salon={salon} />
            </li>
          ))
        ) : (
          <li className="rounded-[8px] border border-dashed border-bookly-ink/25 bg-white px-5 py-6 text-center">
            <p className="text-[13px] leading-5 font-bold text-bookly-ink">
              ما لقينا صالون يطابق «{query.trim()}»
            </p>
            <p className="mt-1 text-[11px] leading-4 text-bookly-body">
              جرّب اسم صالون أو حي ثاني.
            </p>
            <button
              type="button"
              onClick={onReset}
              className="mt-3 cursor-pointer rounded-full bg-bookly-ink px-4 py-2 text-[11px] leading-4 font-semibold text-bookly-mint transition-opacity hover:opacity-85"
            >
              عرض كل الصالونات
            </button>
          </li>
        )}
      </ul>
    </section>
  )
}
