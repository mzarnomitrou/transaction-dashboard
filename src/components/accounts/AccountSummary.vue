<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/account'
import { onMounted } from 'vue'
import LoadingState from '../shared/LoadingState.vue'
import ErrorState from '../shared/ErrorState.vue'
import MoneyAmount from '../shared/MoneyAmount.vue'

const accountStore = useAccountStore()
const { account, isLoading, error } = storeToRefs(accountStore)

onMounted(() => {
  accountStore.loadAccount()
})
</script>

<template>
  <section
    class="rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 p-4 text-white shadow-sm sm:p-6"
    aria-labelledby="account-name"
  >
    <LoadingState v-if="isLoading" message="Loading Account Information..." />
    <ErrorState v-else-if="error" :error-message="error" />

    <template v-else-if="account">
      <div class="flex flex-col items-center text-center">
        <div class="min-w-0 max-w-full">
          <h1 id="account-name" class="truncate text-lg font-semibold text-white sm:text-xl">
            {{ account.name }}
          </h1>
          <p class="mt-1 text-sm text-emerald-100">
  {{ account.holderName }} · •••• {{ account.accountNumber.slice(-4) }}
</p>
        </div>
        <span class="mt-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
          {{ account.currency }}
        </span>
      </div>

      <dl class="mx-auto mt-6 grid max-w-xl grid-cols-1 gap-6 text-center sm:grid-cols-2">
        <div>
          <dt class="text-sm text-emerald-100">Current balance</dt>
          <dd class="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            <MoneyAmount :amount="account.currentBalance" :currency="account.currency" />
          </dd>
        </div>
        <div>
          <dt class="text-sm text-emerald-100">Available balance</dt>
          <dd class="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            <MoneyAmount :amount="account.availableBalance" :currency="account.currency" />
          </dd>
        </div>
      </dl>
    </template>

    <p v-else class="text-gray-500">No account information available.</p>
  </section>
</template>
