const FALLBACK_ROW_HEIGHT = 40

export function useTableCapacity(
  container: MaybeRefOrGetter<HTMLElement | null>,
  rowCount: MaybeRefOrGetter<number>,
) {
  const capacity = ref(0)

  function measure(): void {
    const element = toValue(container)
    if (element === null) return

    const row = element.querySelector('tbody tr[data-row]')
    if (row === null) return

    const rowHeight = row.getBoundingClientRect().height || FALLBACK_ROW_HEIGHT
    const headHeight = element.querySelector('thead')?.getBoundingClientRect().height ?? 0
    const available = element.clientHeight - headHeight

    capacity.value = Math.max(1, Math.floor(available / rowHeight))
  }

  onMounted(() => {
    const element = toValue(container)
    if (element === null) return

    const observer = new ResizeObserver(() => measure())
    observer.observe(element)

    onScopeDispose(() => observer.disconnect())
  })

  watch(() => toValue(rowCount), () => {
    void nextTick(measure)
  })

  return readonly(capacity)
}
