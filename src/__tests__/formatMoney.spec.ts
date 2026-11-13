import { describe, it, expect } from 'vitest'
import { formatMoney } from '@/helpers/formatMoney'

describe('formatMoney', () => {
  it('formats a 2-decimal currency from minor units', () => {
    expect(formatMoney(1299, 'EUR')).toBe('€12.99')
  })

  it('formats a 0-decimal currency without dividing', () => {
    expect(formatMoney(15000, 'JPY')).toBe('JP¥15,000')
  })

  it('formats a 3-decimal currency', () => {
    expect(formatMoney(12500, 'BHD')).toBe('BHD\u00a012.500')
  })

  it('formats zero and large amounts', () => {
    expect(formatMoney(0, 'EUR')).toBe('€0.00')
    expect(formatMoney(234000000, 'EUR')).toBe('€2,340,000.00')
  })
})
