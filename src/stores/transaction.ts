import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Transaction } from '@/types/transaction'
import { fetchTransactions } from '@/api/transactions'
import type { StatusFilter, TypeFilter, SortDirection, SortField } from '@/types/transactionFilters'
import { signedAmount } from '@/helpers/signedAmount'
import { compareTransactions } from '@/helpers/compareTransactions'

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions = ref<Transaction[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const merchantFilter = ref('')
  const statusFilter = ref<StatusFilter>('all')
  const typeFilter = ref<TypeFilter>('all')
  const sortField = ref<SortField>('date')
  const sortDirection = ref<SortDirection>('desc')

  const filteredTransactions = computed(() => {
    const query = merchantFilter.value.trim().toLowerCase()

    return transactions.value.filter((transaction) => {
      const matchesMerchant = query === '' || transaction.merchant.toLowerCase().includes(query)
      const matchesStatus =
        statusFilter.value === 'all' || transaction.status === statusFilter.value
      const matchesType = typeFilter.value === 'all' || transaction.type === typeFilter.value

      return matchesMerchant && matchesStatus && matchesType
    })
  })

  const sortedTransactions = computed(() => {
    const compare = compareTransactions[sortField.value]
    const direction = sortDirection.value === 'asc' ? 1 : -1
    return [...filteredTransactions.value].sort((a, b) => compare(a, b) * direction)
  })

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

  return {
    transactions,
    isLoading,
    error,
    loadTransactions,
    typeFilter,
    statusFilter,
    merchantFilter,
    sortField,
    sortDirection,
    filteredTransactions,
    sortedTransactions,
  }
})
