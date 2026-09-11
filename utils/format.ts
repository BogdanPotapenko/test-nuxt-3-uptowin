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

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
