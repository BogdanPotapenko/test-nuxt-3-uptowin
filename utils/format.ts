const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export function formatDate(iso: string): string {
  const timestamp = Date.parse(iso)

  return Number.isNaN(timestamp) ? '—' : dateFormatter.format(timestamp)
}
