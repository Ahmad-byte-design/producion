import { useMemo } from 'react'
import { useDocumentTitle } from '@/shared/hooks'
import type { Project } from '../schemas'
import { ProjectFilters, ProjectList } from '../components'
import { useProjects } from '../hooks'
import { useProjectFilterStore, type ProjectFilter } from '../store'
import { matchesFilter } from '../utils'

const emptyProjects: Project[] = []

export function Feature1Page() {
  useDocumentTitle('Project index')

  const projectsQuery = useProjects()
  const filter = useProjectFilterStore((state) => state.filter)
  const projects = projectsQuery.data ?? emptyProjects

  const counts = useMemo(() => {
    const result: Record<ProjectFilter, number> = {
      all: projects.length,
      draft: 0,
      'in-progress': 0,
      review: 0,
      complete: 0,
    }

    for (const project of projects) {
      result[project.status] += 1
    }

    return result
  }, [projects])

  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, filter)),
    [projects, filter],
  )

  const totalHours = useMemo(
    () => projects.reduce((sum, project) => sum + project.hoursLogged, 0),
    [projects],
  )

  return (
    <article className="max-w-4xl">
      <header className="border-b border-rule pb-8 sm:flex sm:items-end sm:justify-between sm:gap-10">
        <div className="max-w-xl">
          <h1 className="text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-balance">
            Project index
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            A working list of every job in production, from first draft to final
            invoice.
          </p>
        </div>

        {projectsQuery.data ? (
          <p className="mt-6 shrink-0 font-mono text-xs leading-relaxed text-muted sm:mt-0 sm:text-right">
            {totalHours} hours logged
            <br />
            across {projects.length} projects
          </p>
        ) : null}
      </header>

      <section className="mt-8" aria-label="Projects">
        {projectsQuery.data ? <ProjectFilters counts={counts} /> : null}

        {projectsQuery.isPending ? (
          <IndexSkeleton />
        ) : projectsQuery.isError ? (
          <IndexError
            message={
              projectsQuery.error instanceof Error
                ? projectsQuery.error.message
                : 'Something went wrong.'
            }
            onRetry={() => {
              void projectsQuery.refetch()
            }}
          />
        ) : (
          <ProjectList projects={visibleProjects} />
        )}
      </section>
    </article>
  )
}

function IndexSkeleton() {
  return (
    <div role="status" className="mt-6 border-t border-rule">
      {[0, 1, 2, 3].map((row) => (
        <div
          key={row}
          className="flex items-start justify-between gap-8 border-b border-rule py-5"
        >
          <div className="w-full max-w-sm space-y-2">
            <div className="h-4 w-2/3 animate-pulse bg-rule motion-reduce:animate-none" />
            <div className="h-3 w-1/3 animate-pulse bg-rule motion-reduce:animate-none" />
          </div>
          <div className="h-3 w-16 animate-pulse bg-rule motion-reduce:animate-none" />
        </div>
      ))}
      <span className="sr-only">Loading projects</span>
    </div>
  )
}

type IndexErrorProps = {
  message: string
  onRetry: () => void
}

function IndexError({ message, onRetry }: IndexErrorProps) {
  return (
    <div role="alert" className="mt-6 border border-rule bg-surface p-6">
      <p className="font-medium">The project index could not be loaded.</p>
      <p className="mt-1 text-sm text-muted">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 border-b border-accent pb-0.5 text-sm font-medium text-accent transition-opacity hover:opacity-70"
      >
        Try again
      </button>
    </div>
  )
}
