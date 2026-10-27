import { useEffect, useId, useRef, useState } from 'react'
import { logo, menu as menuIcon, user as profileIcon } from '@/assets/icons'

const MENU_LINKS = [
  { href: '#top', label: 'الرئيسية' },
  { href: '#services', label: 'الخدمات' },
  { href: '#popular', label: 'الأكثر شهرة حولك' },
] as const

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (panelRef.current?.contains(target)) {
        return
      }

      if (target instanceof Element && target.closest('[data-bookly-trigger]')) {
        return
      }

      setIsOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') {
        return
      }

      setIsOpen(false)
      triggerRef.current?.focus()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function togglePanel(trigger: HTMLButtonElement) {
    if (isOpen) {
      setIsOpen(false)
      return
    }

    triggerRef.current = trigger
    setIsOpen(true)
  }

  return (
    <header className="relative z-30 flex h-[90px] shrink-0 items-center justify-between px-5">
      <span className="relative block h-3 w-[18px]">
        <button
          type="button"
          data-bookly-trigger
          aria-label="فتح القائمة"
          aria-expanded={isOpen}
          aria-controls={panelId}
          // onClick={(event) => togglePanel(event.currentTarget)}
          className="absolute -inset-4 grid cursor-pointer place-items-center rounded-full"
        >
          <img src={menuIcon} alt="" className="h-[14px] w-5 max-w-none" />
        </button>
      </span>

      <a
        href="#top"
        aria-label="Bookly — الصفحة الرئيسية"
        className="block size-[90px] shrink-0 rounded-full"
      >
        <img src={logo} alt="" className="size-full" />
      </a>

      <span className="relative block size-[30px]">
        <button
          type="button"
          data-bookly-trigger
          aria-label="فتح حساب بكر"
          aria-expanded={isOpen}
          aria-controls={panelId}
          // onClick={(event) => togglePanel(event.currentTarget)}
          className="absolute -inset-[7px] grid cursor-pointer place-items-center rounded-full"
        >
          <img src={profileIcon} alt="" className="size-[30px]" />
        </button>
      </span>

      {isOpen ? (
        <div
          id={panelId}
          ref={panelRef}
          dir="rtl"
          className="bookly-panel absolute inset-x-5 top-[100px] z-40 rounded-[16px] border border-bookly-ink/10 bg-white p-2 text-bookly-ink shadow-[0_22px_50px_-16px_rgba(16,45,50,0.55)]"
        >
          <div className="flex items-center gap-3 rounded-[12px] bg-bookly-mint px-3 py-2.5">
            <img src={profileIcon} alt="" className="size-[30px] shrink-0" />
            <div className="min-w-0">
              <p className="text-[15px] leading-5 font-semibold">بكر</p>
              <p className="truncate text-[11px] leading-4 text-bookly-body">
                أهلاً بعودتك إلى Bookly
              </p>
            </div>
          </div>

          <nav aria-label="أقسام الصفحة" className="mt-1 flex flex-col">
            {MENU_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-[10px] px-3 py-2.5 text-[14px] font-medium transition-colors hover:bg-bookly-mint focus-visible:bg-bookly-mint"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
