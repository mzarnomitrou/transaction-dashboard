export const TRANSACTION_STATUSES = ['completed', 'pending', 'declined'] as const
export type TransactionStatus = (typeof TRANSACTION_STATUSES)[number]

export const TRANSACTION_TYPES = ['credit', 'debit'] as const
export type TransactionType = (typeof TRANSACTION_TYPES)[number]

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
