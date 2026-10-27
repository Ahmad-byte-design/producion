import { create } from 'zustand'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'producion.theme'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

type ThemeState = {
  theme: Theme
  toggle: () => void
}

const initialTheme = getInitialTheme()
applyTheme(initialTheme)

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initialTheme,
  toggle: () =>
    set((state) => {
      const theme: Theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem(STORAGE_KEY, theme)
      applyTheme(theme)
      return { theme }
    }),
}))
