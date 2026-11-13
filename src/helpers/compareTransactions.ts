import type { Transaction } from '@/types/transaction'
import type { SortField } from '@/types/transactionFilters'
import { signedAmount } from '@/helpers/signedAmount'

export const compareTransactions: Record<SortField, (a: Transaction, b: Transaction) => number> = {
  date: (a, b) => a.transactionDate.localeCompare(b.transactionDate),
  amount: (a, b) => signedAmount(a) - signedAmount(b),
}
