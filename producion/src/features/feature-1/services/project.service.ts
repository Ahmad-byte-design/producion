import { delay } from '@/shared/mock'
import { projectsMock } from '../mock'
import { projectListSchema, type Project } from '../schemas'

export const projectKeys = {
  all: ['projects'] as const,
  list: () => [...projectKeys.all, 'list'] as const,
}

/**
 * Mock implementation of the projects endpoint.
 * Replace the body with `http.get<Project[]>('/projects')` when the API exists.
 */
export async function listProjects(): Promise<Project[]> {
  await delay(500)
  return projectListSchema.parse(projectsMock)
}
