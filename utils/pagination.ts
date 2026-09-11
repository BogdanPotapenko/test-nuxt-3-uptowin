export const PAGE_ELLIPSIS = 'ellipsis'

export type PageItem = number | typeof PAGE_ELLIPSIS

function range(from: number, to: number): number[] {
  return Array.from({ length: Math.max(0, to - from + 1) }, (_, index) => from + index)
}

export function buildPageItems(currentPage: number, totalPages: number, siblings = 1): PageItem[] {
  const maxSlots = siblings * 2 + 5

  if (totalPages <= maxSlots) return range(1, totalPages)

  const left = Math.max(currentPage - siblings, 2)
  const right = Math.min(currentPage + siblings, totalPages - 1)
  const items: PageItem[] = [1]

  if (left > 2) items.push(PAGE_ELLIPSIS)

  items.push(...range(left, right))

  if (right < totalPages - 1) items.push(PAGE_ELLIPSIS)

  items.push(totalPages)

  return items
}
