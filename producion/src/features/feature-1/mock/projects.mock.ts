import type { Project } from '../schemas'

/** Stand-in for the API response. The service parses it against the schema. */
export const projectsMock: Project[] = [
  {
    id: 'northwind-identity',
    name: 'Northwind identity system',
    client: 'Northwind & Co.',
    status: 'in-progress',
    hoursLogged: 26,
    hoursBudget: 42,
    updatedAt: '2026-10-23',
  },
  {
    id: 'atlas-booking-flow',
    name: 'Atlas booking flow',
    client: 'Atlas Travel',
    status: 'review',
    hoursLogged: 18,
    hoursBudget: 30,
    updatedAt: '2026-10-24',
  },
  {
    id: 'meridian-token-library',
    name: 'Meridian token library',
    client: 'Meridian Labs',
    status: 'draft',
    hoursLogged: 6,
    hoursBudget: 20,
    updatedAt: '2026-10-21',
  },
  {
    id: 'harbor-annual-report',
    name: 'Harbor annual report',
    client: 'Harbor Studio',
    status: 'complete',
    hoursLogged: 32,
    hoursBudget: 32,
    updatedAt: '2026-10-18',
  },
]
