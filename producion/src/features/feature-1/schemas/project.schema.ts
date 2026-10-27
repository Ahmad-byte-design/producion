import { z } from 'zod'

export const projectStatusSchema = z.enum([
  'draft',
  'in-progress',
  'review',
  'complete',
])

export const projectSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    client: z.string().min(1),
    status: projectStatusSchema,
    hoursLogged: z.number().nonnegative(),
    hoursBudget: z.number().positive(),
    updatedAt: z.iso.date(),
  })
  .refine((project) => project.hoursLogged <= project.hoursBudget, {
    message: 'Logged hours cannot exceed the budget',
    path: ['hoursLogged'],
  })

export const projectListSchema = z.array(projectSchema)

export type Project = z.infer<typeof projectSchema>
export type ProjectStatus = z.infer<typeof projectStatusSchema>
