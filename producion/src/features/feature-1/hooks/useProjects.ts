import { useQuery } from '@tanstack/react-query'
import { listProjects, projectKeys } from '../services'

export function useProjects() {
  return useQuery({
    queryKey: projectKeys.list(),
    queryFn: listProjects,
  })
}
