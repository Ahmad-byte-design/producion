import type { Project, ProjectStatus } from '../schemas'
import type { ProjectFilter } from '../store/projectFilterStore'

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  draft: 'Draft',
  'in-progress': 'In progress',
  review: 'In review',
  complete: 'Complete',
}

export const STATUS_TONE: Record<ProjectStatus, string> = {
  draft: 'border border-muted bg-transparent',
  'in-progress': 'bg-accent',
  review: 'bg-ochre',
  complete: 'bg-muted',
}

export function matchesFilter(
  project: Project,
  filter: ProjectFilter,
): boolean {
  return filter === 'all' || project.status === filter
}

export function progressPercent(project: Project): number {
  return Math.min(
    100,
    Math.round((project.hoursLogged / project.hoursBudget) * 100),
  )
}

export function formatHours(hours: number): string {
  return `${hours}h`
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
})

export function formatUpdatedAt(value: string): string {
  return dateFormatter.format(new Date(`${value}T00:00:00`))
}
