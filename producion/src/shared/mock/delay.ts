/** Resolves after `ms`, for mock services that should behave like a network call. */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
