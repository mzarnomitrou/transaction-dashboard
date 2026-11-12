export type TransactionStatus = 'completed' | 'pending' | 'declined'
export type TransactionType = 'debit' | 'credit'

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
}
