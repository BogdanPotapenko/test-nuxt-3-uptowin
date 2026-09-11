export function useTableCapacity(container: MaybeRefOrGetter<HTMLElement | null>) {
  const capacity = ref(0)
  let frame = 0

  function measure(): void {
    const element = toValue(container)
    if (element === null) return

    const styles = getComputedStyle(element)
    const rowHeight = Number.parseFloat(styles.getPropertyValue('--table-row-height'))
    const headHeight = Number.parseFloat(styles.getPropertyValue('--table-head-height'))

    if (!(rowHeight > 0)) return

    const available = element.clientHeight - (headHeight > 0 ? headHeight : 0)
    const next = Math.max(1, Math.floor(available / rowHeight))

    if (next !== capacity.value) capacity.value = next
  }

  function schedule(): void {
    if (frame !== 0) return

    frame = requestAnimationFrame(() => {
      frame = 0
      measure()
    })
  }

  onMounted(() => {
    const element = toValue(container)
    if (element === null) return

    const observer = new ResizeObserver(schedule)
    observer.observe(element)

    onScopeDispose(() => {
      observer.disconnect()
      if (frame !== 0) cancelAnimationFrame(frame)
    })
  })

  return readonly(capacity)
}
