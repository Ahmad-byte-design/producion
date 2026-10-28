import { useEffect } from 'react'
import { AppHeader } from '../components/AppHeader'
import { PopularSalons } from '../components/PopularSalons'
import { SearchField } from '../components/SearchField'
import { ServicesSection } from '../components/ServicesSection'
import { useSalonSearch } from '../hooks'
import { homeData } from '../mock'

export function BooklyHomePage() {
  const { query, setQuery, results, isFiltering } = useSalonSearch(
    homeData.salons,
  )

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Bookly — الرئيسية'

    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="bookly-stage grid min-h-svh place-items-center sm:p-8">
      <main
        id="top"
        lang="ar"
        className="bookly-screen p-2.5 relative flex min-h-svh w-full max-w-[375px] flex-col overflow-scroll rounded-[30px] bg-bookly-mint sm:h-[812px] sm:min-h-0 sm:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] sm:ring-1 sm:ring-white/10"
      >
        {/* <StatusBar /> */}
        <AppHeader />

        <div className="flex flex-1 flex-col pt-4 pb-[21px]">
          <section
            aria-labelledby="welcome-heading"
            className="flex flex-col items-center gap-4"
          >
            <h1
              id="welcome-heading"
              dir="auto"
              className="w-full text-center text-[20px] leading-[24px] font-black text-black"
            >
              أهلا بك في <span lang="en">Bookly</span>, بكر
            </h1>

            <SearchField
              query={query}
              onQueryChange={setQuery}
              onClear={() => setQuery('')}
            />
          </section>

          <ServicesSection services={homeData.services} />

          <PopularSalons
            salons={results}
            query={query}
            isFiltering={isFiltering}
            onReset={() => setQuery('')}
          />
        </div>
      </main>
    </div>
  )
}
