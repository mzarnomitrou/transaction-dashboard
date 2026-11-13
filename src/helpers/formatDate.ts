export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IE', { dateStyle: 'medium' }).format(new Date(iso))
}
