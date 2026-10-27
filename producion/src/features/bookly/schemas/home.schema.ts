import { z } from 'zod'

export const serviceSchema = z.object({
  id: z.enum(['skincare', 'styling', 'haircut', 'shave']),
  label: z.string().min(1),
  icon: z.string().min(1),
  /** Layout box of the icon, taken from the Figma frame. */
  frame: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  /** The SVG's intrinsic size. The artwork bleeds past its frame. */
  glyph: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  offsetTop: z.number().nonnegative(),
  gap: z.number().nonnegative(),
})

export const salonSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  area: z.string().min(1),
  rating: z.number().min(0).max(5),
  price: z.string().min(1),
  image: z.string().min(1),
})

export const homeSchema = z.object({
  services: z.array(serviceSchema),
  salons: z.array(salonSchema),
})

export type Service = z.infer<typeof serviceSchema>
export type Salon = z.infer<typeof salonSchema>
export type HomeData = z.infer<typeof homeSchema>
