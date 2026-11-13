<script setup lang="ts">
import AccountSummary from '@/components/accounts/AccountSummary.vue'
import TransactionList from '@/components/transactions/TransactionList.vue'
</script>

<template>
  <main class="mx-auto max-w-4xl p-4 sm:p-6 space-y-6">
    <AccountSummary />
    <TransactionList />
  </main>
</template>
