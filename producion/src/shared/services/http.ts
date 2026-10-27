import { apiErrorSchema } from '../schemas'
import type { ApiErrorBody } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL ?? ''

export class HttpError extends Error {
  readonly status: number
  readonly body?: ApiErrorBody

  constructor(message: string, status: number, body?: ApiErrorBody) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.body = body
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown }

/** Small typed wrapper around fetch. Swap mock services for this when the API exists. */
export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, headers, ...init } = options
  const requestHeaders = new Headers(headers)

  requestHeaders.set('Accept', 'application/json')

  if (body !== undefined && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => null)
    const parsed = apiErrorSchema.safeParse(payload)

    throw new HttpError(
      parsed.success
        ? parsed.data.message
        : `Request failed with status ${response.status}`,
      response.status,
      parsed.success ? parsed.data : undefined,
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export const http = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PATCH', body }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
