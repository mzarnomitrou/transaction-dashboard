export const TRANSACTION_STATUSES = ['completed', 'pending', 'declined'] as const
export type TransactionStatus = (typeof TRANSACTION_STATUSES)[number]

export const TRANSACTION_TYPES = ['credit', 'debit'] as const
export type TransactionType = (typeof TRANSACTION_TYPES)[number]

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  credit: 'Credit',
  debit: 'Debit',
}
export const TRANSACTION_STATUS_LABELS: Record<TransactionStatus, string> = {
  completed: 'Completed',
  pending: 'Pending',
  declined: 'Declined',
}

export type Transaction = {
  id: number
  amount: number
  merchant: string
  currency: string
  accountAmount: number // amount charged to the account, in the account's currency
  type: TransactionType
  status: TransactionStatus
  description: string
  transactionDate: string
  reference: string
}
