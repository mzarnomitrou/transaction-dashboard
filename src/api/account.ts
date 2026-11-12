import type { Account } from '@/types/account'
import accountInfo from '@/data/account.json'

const SHOULD_FAIL = false

//add it as helper function later
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchAccount(): Promise<Account> {
  await wait(500)

  if (SHOULD_FAIL) {
    throw new Error('Failed to load Account')
  }

  return accountInfo as Account
}
