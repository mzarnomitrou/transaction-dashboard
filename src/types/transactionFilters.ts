import type { TransactionStatus, TransactionType } from '@/types/transaction'

export type StatusFilter = TransactionStatus | 'all'
export type TypeFilter = TransactionType | 'all'
export type SortField = 'date' | 'amount'
export type SortDirection = 'asc' | 'desc'
