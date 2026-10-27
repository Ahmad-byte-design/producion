import { Link } from 'react-router-dom'
import { APP_NAME, ROUTES } from '../constants'
import { cn } from '../utils'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to={ROUTES.home}
      aria-label={`${APP_NAME} home`}
      className={cn('group inline-flex items-center gap-3', className)}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center bg-accent font-mono text-sm font-medium text-accent-ink transition-transform duration-300 ease-out group-hover:-rotate-6"
      >
        p
      </span>
      <span className="text-base font-semibold tracking-tight">{APP_NAME}</span>
    </Link>
  )
}
