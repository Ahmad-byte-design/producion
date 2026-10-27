const SIGNAL_HEIGHTS = [2, 6, 10, 14] as const

export function StatusBar() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[37px] shrink-0 items-center justify-between px-5 text-bookly-body"
    >
      <span className="text-[14px] leading-none font-semibold">9:41</span>

      <div className="flex items-center gap-1.5">
        <span className="flex items-end gap-0.5">
          {SIGNAL_HEIGHTS.map((height) => (
            <span
              key={height}
              className="w-[3px] rounded-[1px] bg-bookly-body"
              style={{ height }}
            />
          ))}
        </span>

        <img src="/bookly/wifi.svg" alt="" className="size-4" />

        <span className="flex items-center">
          <span className="relative flex h-3 w-6 items-center justify-center rounded-[3px] border-[1.5px] border-bookly-body">
            <span className="h-2 w-5 rounded-[1px] bg-bookly-body" />
          </span>
          <span className="ml-px h-1.5 w-0.5 rounded-[1px] bg-bookly-body" />
        </span>
      </div>
    </div>
  )
}
