import type { Transaction } from '@/types/transaction'
import transactionsData from '@/data/transactions.json'

const SHOULD_FAIL = false

//add it as helper function later
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchTransactions(): Promise<Transaction[]> {
  await wait(800)

  if (SHOULD_FAIL) {
    throw new Error('Failed to load Transactions')
  }

  return transactionsData as Transaction[]
}
