export type Account = {
  id: number
  name: string
  currentBalance: number // In minor units of currency (e.g. cents: 150000 = €1,500.00)
  availableBalance: number
  currency: string
  holderName: string
  accountNumber: string
}
