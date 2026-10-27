import { create } from 'zustand'
import type { ProjectStatus } from '../schemas'

export type ProjectFilter = 'all' | ProjectStatus

type ProjectFilterState = {
  filter: ProjectFilter
  setFilter: (filter: ProjectFilter) => void
}

export const useProjectFilterStore = create<ProjectFilterState>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
}))
