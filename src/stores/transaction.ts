import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Transaction } from '@/types/transaction'
import { fetchTransactions } from '@/api/transactions'

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions = ref<Transaction[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadTransactions() {
    isLoading.value = true
    error.value = null

    try {
      transactions.value = await fetchTransactions()
    } catch {
      error.value = 'Could not load transactions.'
    } finally {
      isLoading.value = false
    }
  }

  return { transactions, isLoading, error, loadTransactions }
})
