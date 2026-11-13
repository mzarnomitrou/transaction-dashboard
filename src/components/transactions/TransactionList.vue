<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTransactionsStore } from '@/stores/transaction'
import { useAccountStore } from '@/stores/account'
import type { Transaction } from '@/types/transaction'
import TransactionItem from './TransactionItem.vue'
import TransactionDetails from './TransactionDetails.vue'

const transactionsStore = useTransactionsStore()
const { transactions, isLoading, error } = storeToRefs(transactionsStore)

const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)

const selectedTransaction = ref<Transaction | null>(null)

onMounted(() => {
  transactionsStore.loadTransactions()
})
</script>

<template>
  <section
    class="rounded-xl border border-gray-200 bg-white shadow-sm"
    aria-labelledby="transactions-heading"
  >
    <h2
      id="transactions-heading"
      class="border-b border-gray-200 px-4 py-3 text-base font-semibold text-gray-900 sm:px-6"
    >
      Recent transactions
    </h2>

    <p v-if="isLoading" class="px-4 py-8 text-center text-gray-500 sm:px-6">
      Loading transactions…
    </p>

    <p v-else-if="error" class="px-4 py-8 text-center text-red-600 sm:px-6">
      {{ error }}
    </p>

    <p v-else-if="transactions.length === 0" class="px-4 py-8 text-center text-gray-500 sm:px-6">
      No transactions yet.
    </p>

    <ul v-else class="divide-y divide-gray-100">
      <TransactionItem
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
        :account-currency="account?.currency"
        @select="selectedTransaction = $event"
      />
      <TransactionDetails
        :transaction="selectedTransaction"
        :account-currency="account?.currency"
        @close="selectedTransaction = null"
      />
    </ul>
  </section>
</template>
