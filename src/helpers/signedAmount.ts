import type { Transaction } from '@/types/transaction'

export function signedAmount(transaction: Transaction): number {
  return transaction.type === 'credit' ? transaction.accountAmount : -transaction.accountAmount
}
