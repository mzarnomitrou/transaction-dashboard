import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTransactionsStore } from '@/stores/transaction'
import type { Transaction } from '@/types/transaction'

function makeTransaction(overrides: Partial<Transaction>): Transaction {
  return {
    id: 1,
    reference: 'TXN-TEST0001',
    merchant: 'Test Shop',
    description: 'Test',
    transactionDate: '2026-01-01T10:00:00Z',
    amount: 1000,
    currency: 'EUR',
    accountAmount: 1000,
    type: 'debit',
    status: 'completed',
    ...overrides,
  }
}

describe('transactions store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('filters by status and merchant together', () => {
    const store = useTransactionsStore()
    store.transactions = [
      makeTransaction({ id: 1, merchant: 'Wolt', status: 'pending' }),
      makeTransaction({ id: 2, merchant: 'Wolt', status: 'completed' }),
      makeTransaction({ id: 3, merchant: 'Bolt', status: 'pending' }),
    ]

    store.statusFilter = 'pending'
    store.merchantFilter = 'wolt'

    expect(store.sortedTransactions.map((t) => t.id)).toEqual([1])
  })

  it('sorts by signed amount: credits above debits when descending', () => {
    const store = useTransactionsStore()
    store.transactions = [
      makeTransaction({ id: 1, accountAmount: 5000, type: 'debit' }),
      makeTransaction({ id: 2, accountAmount: 2000, type: 'credit' }),
      makeTransaction({ id: 3, accountAmount: 100, type: 'debit' }),
    ]

    store.sortField = 'amount'
    store.sortDirection = 'desc'

    expect(store.sortedTransactions.map((t) => t.id)).toEqual([2, 3, 1])
  })
})
