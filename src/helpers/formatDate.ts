export function formatDate(iso: string): string | null {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('en-IE', { dateStyle: 'medium' }).format(date)
}
