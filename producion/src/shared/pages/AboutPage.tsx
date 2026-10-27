import { Link } from 'react-router-dom'
import { ROUTES } from '../constants'
import { useDocumentTitle } from '../hooks'

const layers = [
  {
    path: 'features/feature-1',
    copy: 'One complete vertical slice: page, components, hooks, service, mock data, schema, store, types, and utils. Copy the folder to begin the next feature.',
  },
  {
    path: 'global',
    copy: 'Everything shared across features: layout, UI pieces, services, hooks, schemas, mock data, store, types, and utils.',
  },
  {
    path: 'app',
    copy: 'Route definitions that connect feature pages to the shell.',
  },
]

export function AboutPage() {
  useDocumentTitle('About')

  return (
    <article className="max-w-2xl">
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        About this starter
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        A feature-first React foundation. Every feature owns its page, data, and
        state, while the global layer holds only what is genuinely shared.
      </p>

      <section className="mt-12 border-t border-rule pt-8">
        <h2 className="text-xl font-semibold tracking-tight">
          Where things live
        </h2>

        <dl className="mt-6 space-y-6">
          {layers.map((layer) => (
            <div
              key={layer.path}
              className="grid gap-1.5 sm:grid-cols-[11rem_1fr] sm:gap-6"
            >
              <dt className="font-mono text-xs text-accent sm:pt-1">
                {layer.path}
              </dt>
              <dd className="max-w-prose text-sm leading-relaxed text-muted">
                {layer.copy}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 border-t border-rule pt-8">
        <h2 className="text-xl font-semibold tracking-tight">
          What is wired up
        </h2>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
          React Router serves the routes, TanStack Query owns server state,
          Zustand handles the small pieces of client state, and Tailwind v4
          provides a token layer that supports light and dark themes. Zod
          validates data at the edge of every service.
        </p>
        <Link
          to={ROUTES.home}
          className="mt-6 inline-block border-b border-accent pb-0.5 text-sm font-medium text-accent transition-opacity hover:opacity-70"
        >
          Back to the project index
        </Link>
      </section>
    </article>
  )
}
