import { useEffect } from 'react'
import { APP_NAME } from '../constants'

/** Keeps the browser tab title in sync with the current page. */
export function useDocumentTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} — ${APP_NAME}` : APP_NAME
  }, [title])
}
