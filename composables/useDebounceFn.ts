export interface DebouncedFunction<Args extends unknown[]> {
  (...args: Args): void
  cancel: () => void
  flush: () => void
}

export function useDebounceFn<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay = 300,
): DebouncedFunction<Args> {
  let timer: ReturnType<typeof setTimeout> | null = null
  let pendingArgs: Args | null = null

  function cancel(): void {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }

    pendingArgs = null
  }

  function flush(): void {
    if (pendingArgs === null) return

    const args = pendingArgs
    cancel()
    callback(...args)
  }

  const debounced = ((...args: Args) => {
    pendingArgs = args

    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(flush, delay)
  }) as DebouncedFunction<Args>

  debounced.cancel = cancel
  debounced.flush = flush

  onScopeDispose(cancel, true)

  return debounced
}
