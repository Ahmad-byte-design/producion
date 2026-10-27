import { Link } from 'react-router-dom'
import { ROUTES } from '../constants'
import { useDocumentTitle } from '../hooks'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <article className="max-w-xl py-8">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        This page is not in the index.
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted">
        Nothing lives at this address. The project index has everything that is
        currently in production.
      </p>
      <Link
        to={ROUTES.home}
        className="mt-8 inline-block border-b border-accent pb-0.5 text-sm font-medium text-accent transition-opacity hover:opacity-70"
      >
        Back to the project index
      </Link>
    </article>
  )
}
