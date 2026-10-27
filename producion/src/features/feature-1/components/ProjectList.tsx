import { cn } from '@/shared/utils'
import type { Project } from '../schemas'
import { useProjectFilterStore } from '../store'
import {
  formatHours,
  formatUpdatedAt,
  progressPercent,
  STATUS_LABEL,
  STATUS_TONE,
} from '../utils'

type ProjectListProps = {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const setFilter = useProjectFilterStore((state) => state.setFilter)

  if (projects.length === 0) {
    return (
      <div className="mt-6 border-y border-rule py-14 text-center">
        <p className="font-medium">No projects match this filter.</p>
        <p className="mt-1 text-sm text-muted">
          The rest of the index is still here.
        </p>
        <button
          type="button"
          onClick={() => setFilter('all')}
          className="mt-5 border-b border-accent pb-0.5 text-sm font-medium text-accent transition-opacity hover:opacity-70"
        >
          Show all projects
        </button>
      </div>
    )
  }

  return (
    <ul className="mt-6 border-t border-rule">
      {projects.map((project) => (
        <li key={project.id} className="relative border-b border-rule">
          <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className="font-medium tracking-tight">{project.name}</h2>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'size-1.5 shrink-0 rounded-full',
                      STATUS_TONE[project.status],
                    )}
                  />
                  {STATUS_LABEL[project.status]}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">{project.client}</p>
            </div>

            <div className="shrink-0 font-mono text-xs text-muted sm:text-right">
              <p className="text-sm tabular-nums text-ink">
                {formatHours(project.hoursLogged)} /{' '}
                {formatHours(project.hoursBudget)}
              </p>
              <p className="mt-1">
                updated {formatUpdatedAt(project.updatedAt)}
              </p>
              <span className="sr-only">
                {progressPercent(project)}% of the budget used
              </span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-px h-px bg-accent transition-[width] duration-500 motion-reduce:transition-none"
            style={{ width: `${progressPercent(project)}%` }}
          />
        </li>
      ))}
    </ul>
  )
}
