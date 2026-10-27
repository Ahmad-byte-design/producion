import { NavLink, Outlet } from 'react-router-dom'
import { Logo, ThemeToggle } from '../components'
import { APP_NAME, APP_TAGLINE, ROUTES } from '../constants'
import { cn } from '../utils'

type NavItemProps = {
  to: string
  end?: boolean
  children: string
}

function NavItem({ to, end, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex items-center justify-between gap-4 border-rule py-1.5 text-sm transition-colors md:border-t md:py-3 md:first:border-t-0',
          isActive ? 'text-ink' : 'text-muted hover:text-ink',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span>{children}</span>
          <span
            aria-hidden="true"
            className={cn(
              'size-1.5 rounded-full bg-accent transition-opacity',
              isActive ? 'opacity-100' : 'opacity-0',
            )}
          />
        </>
      )}
    </NavLink>
  )
}

export function RootLayout() {
  return (
    <div className="min-h-svh md:grid md:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="border-b border-rule md:border-r md:border-b-0">
        <div className="flex h-full flex-col gap-5 p-6 md:sticky md:top-0 md:h-svh md:gap-0">
          <div className="flex items-center justify-between gap-4">
            <Logo />
            <ThemeToggle className="md:hidden" />
          </div>

          <nav
            aria-label="Main"
            className="flex gap-6 md:mt-12 md:flex-col md:gap-0"
          >
            <NavItem to={ROUTES.home} end>
              Project index
            </NavItem>
            <NavItem to={ROUTES.about}>About</NavItem>
          </nav>

          <div className="mt-auto hidden md:block">
            <p className="mb-5 max-w-52 text-sm leading-relaxed text-muted">
              {APP_TAGLINE}
            </p>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <main className="flex-1 px-6 py-10 md:px-12 md:py-16 xl:px-20">
          <Outlet />
        </main>

        <footer className="border-t border-rule px-6 py-5 font-mono text-[11px] text-muted md:px-12 xl:px-20">
          {APP_NAME} runs on React, TanStack Query, Zustand, and Tailwind.
        </footer>
      </div>
    </div>
  )
}
