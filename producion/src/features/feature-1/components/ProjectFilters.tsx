import { cn } from '@/shared/utils'
import { useProjectFilterStore, type ProjectFilter } from '../store'

const FILTERS: Array<{ value: ProjectFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'review', label: 'In review' },
  { value: 'draft', label: 'Draft' },
  { value: 'complete', label: 'Complete' },
]

type ProjectFiltersProps = {
  counts: Record<ProjectFilter, number>
}

export function ProjectFilters({ counts }: ProjectFiltersProps) {
  const filter = useProjectFilterStore((state) => state.filter)
  const setFilter = useProjectFilterStore((state) => state.setFilter)

  return (
    <div
      role="group"
      aria-label="Filter projects by status"
      className="flex flex-wrap gap-x-6 gap-y-1"
    >
      {FILTERS.map((option) => {
        const isActive = filter === option.value

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => setFilter(option.value)}
            className={cn(
              '-mb-px border-b-2 py-2 text-sm transition-colors',
              isActive
                ? 'border-accent text-ink'
                : 'border-transparent text-muted hover:border-rule hover:text-ink',
            )}
          >
            {option.label}
            <span
              className={cn(
                'ml-1.5 font-mono text-[11px]',
                isActive ? 'text-accent' : 'text-muted',
              )}
            >
              {counts[option.value]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
