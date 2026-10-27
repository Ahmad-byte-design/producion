import { rectangle4 } from '@/assets/images'
import { homeSchema } from '../schemas'

/**
 * The measured geometry of each service icon comes from the Figma frame. The
 * artwork itself is drawn a little larger than its layout box, which is why the
 * glyph size is stored separately from the frame size.
 */
const services = [
  {
    id: 'skincare',
    label: 'عناية بالبشرة',
    icon: '/bookly/icon-skincare.svg',
    frame: { width: 23.906, height: 33.75 },
    glyph: { width: 26.406, height: 36.25 },
    offsetTop: 13.125,
    gap: 8,
  },
  {
    id: 'styling',
    label: 'ستايل',
    icon: '/bookly/icon-style.svg',
    frame: { width: 34.453, height: 31.641 },
    glyph: { width: 36.953, height: 34.141 },
    offsetTop: 14.18,
    gap: 8,
  },
  {
    id: 'haircut',
    label: 'قص شعر',
    icon: '/bookly/icon-haircut.svg',
    frame: { width: 32.344, height: 30.938 },
    glyph: { width: 34.844, height: 33.438 },
    offsetTop: 14.531,
    gap: 8,
  },
  {
    id: 'shave',
    label: 'حلاقة',
    icon: '/bookly/icon-shave.svg',
    frame: { width: 29.531, height: 32.344 },
    glyph: { width: 32.031, height: 34.844 },
    offsetTop: 14.328,
    gap: 4,
  },
] as const

const salons = Array.from({ length: 4 }, (_, index) => ({
  id: `cut-care-${index + 1}`,
  name: 'صالون Cut Care',
  area: 'الشعلان',
  rating: 4.3,
  price: '40.000 ل.س',
  image: rectangle4,
}))

export const homeData = homeSchema.parse({ services, salons })
