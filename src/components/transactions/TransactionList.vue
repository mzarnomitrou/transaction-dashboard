<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTransactionsStore } from '@/stores/transaction'
import { useAccountStore } from '@/stores/account'
import type { Transaction } from '@/types/transaction'
import TransactionItem from './TransactionItem.vue'
import TransactionDetails from './TransactionDetails.vue'
import LoadingState from '../shared/LoadingState.vue'
import ErrorState from '../shared/ErrorState.vue'
import PaginationControls from '../shared/PaginationControls.vue'
import { usePagination } from '@/composables/usePagination'
import TransactionSort from './TransactionSort.vue'

const transactionsStore = useTransactionsStore()
const { transactions, isLoading, error, sortedTransactions } = storeToRefs(transactionsStore)
const { currentPage, totalPages, paginatedItems, setPage } = usePagination(sortedTransactions)
const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)

const selectedTransaction = ref<Transaction | null>(null)

onMounted(() => {
  transactionsStore.loadTransactions()
})
</script>

<template>
  <section
    class="rounded-xl border border-gray-200 bg-white shadow-md"
    aria-labelledby="transactions-heading"
  >
    <div
      class="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 sm:px-6"
    >
      <h2 id="transactions-heading" class="text-lg font-semibold text-gray-900">
        Recent transactions
      </h2>
      <TransactionSort />
    </div>

    <LoadingState v-if="isLoading" message="Loading transactions..." />

    <ErrorState v-else-if="error" />

    <p v-else-if="transactions.length === 0" class="px-4 py-8 text-center text-gray-500 sm:px-6">
      No transactions yet.
    </p>
    <p
      v-else-if="sortedTransactions.length === 0"
      class="px-4 py-8 text-center text-gray-500 sm:px-6"
    >
      No transactions match your filters.
    </p>

    <ul v-else class="divide-y divide-gray-100">
      <TransactionItem
        v-for="transaction in paginatedItems"
        :key="transaction.id"
        :transaction="transaction"
        :account-currency="account?.currency"
        @select="selectedTransaction = $event"
      />
    </ul>
    <TransactionDetails
      :transaction="selectedTransaction"
      :account-currency="account?.currency"
      @close="selectedTransaction = null"
    />
  </section>
  <PaginationControls
    v-if="totalPages > 1"
    :current-page="currentPage"
    :total-pages="totalPages"
    @change="setPage"
  />
</template>
