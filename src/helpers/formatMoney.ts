export function formatMoney(amountMinor: number, currency: string): string | null {
  try {
    const formatter = new Intl.NumberFormat('en-IE', { style: 'currency', currency })
    const decimals = formatter.resolvedOptions().maximumFractionDigits ?? 2
    return formatter.format(amountMinor / 10 ** decimals)
  } catch {
    return null
  }
}
