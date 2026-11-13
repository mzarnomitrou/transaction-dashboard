<script setup lang="ts">
import AccountSummary from '@/components/accounts/AccountSummary.vue'
import TransactionList from '@/components/transactions/TransactionList.vue'
import TransactionFilters from '@/components/transactions/TransactionFilters.vue'
</script>

<template>
  <main class="mx-auto max-w-5xl p-4 sm:p-6 space-y-6">
    <AccountSummary />
    <TransactionFilters />
    <TransactionList />
  </main>
</template>
