import { z } from 'zod'

/** Shape returned by the API when a request fails. */
export const apiErrorSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
})
