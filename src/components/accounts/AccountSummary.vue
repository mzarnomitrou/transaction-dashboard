<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/account'
import { onMounted } from 'vue'
import { formatMoney } from '@/helpers/formatMoney'
import LoadingState from '../shared/LoadingState.vue'
import ErrorState from '../shared/ErrorState.vue'

const accountStore = useAccountStore()
const { account, isLoading, error } = storeToRefs(accountStore)

onMounted(() => {
  accountStore.loadAccount()
})
</script>

<template>
  <section
    class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
    aria-labelledby="account-name"
  >
    <p v-if="isLoading">
      <LoadingState message="Loading Account Information..." />
    </p>

    <p v-else-if="error" class="text-red-500">
      <ErrorState/>
    </p>

    <template v-else-if="account">
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <p class="text-sm text-gray-500">Account</p>
          <h1 id="account-name" class="truncate text-lg font-semibold text-gray-900 sm:text-xl">
            {{ account.name }}
          </h1>
        </div>
        <span class="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {{ account.currency }}
        </span>
      </div>

      <dl class="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2">
        <div>
          <dt class="text-sm text-gray-500">Current balance</dt>
          <dd class="mt-1 text-2xl font-semibold tabular-nums text-gray-900 sm:text-3xl">
            {{ formatMoney(account.currentBalance, account.currency) }}
          </dd>
        </div>
        <div>
          <dt class="text-sm text-gray-500">Available balance</dt>
          <dd class="mt-1 text-xl font-medium tabular-nums text-gray-700 sm:text-2xl">
            {{ formatMoney(account.availableBalance, account.currency) }}
          </dd>
          <p class="mt-1 text-xs text-gray-500">Excludes pending payments</p>
        </div>
      </dl>
    </template>

    <p v-else class="text-gray-500">No account information available.</p>
  </section>
</template>
